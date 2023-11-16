const { promisify } = require('util');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const Email = require('../utils/email');
const User = require('../models/userModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

const signToken = (id) => {
  //la firma del jwt recibe el payload, en este caso el id del usuario, la clave secreta
  //la cual se recomienda tener al menos 32 caracteres, y si se quiere una opcion
  //en el ejemplo se pasa la fecha de expiracion del token
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

const createSendToken = (user, statusCode, res) => {
  const token = signToken(user._id);
  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    // secure: true, esta parte se usa cuando implementamos https en produccion
    httpOnly: true,
  };

  if (process.env.NODE_ENV === 'production') cookieOptions.secure = true;

  res.cookie('jwt', token, cookieOptions);

  //Borra el password del output final para que no se vea el hash
  user.password = undefined;

  res.status(statusCode).json({
    status: 'success',
    token,
    data: {
      user,
    },
  });
};

exports.signup = catchAsync(async (req, res, next) => {
  const newUser = await User.create(req.body);
  const url = `${req.protocol}://localhost:3000/me`;
  console.log('url del link', url);
  await new Email(newUser, url).sendWelcome();
  createSendToken(newUser, 201, res);
});

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  //1. check if email and pass exist
  if (!email || !password) {
    return next(new AppError('Please provide email and password', 400));
  }
  //2. check if user exists and password is correct. el findOne no devolverá el password ya que
  //en el modelo el retorno del password esta en false. Por eso explicitamente se debe seleccionar
  //con el metodo select()
  const user = await User.findOne({ email }).select('+password');

  if (!user || !(await user.correctPassword(password, user.password))) {
    return next(new AppError('Incorrect email or password', 401));
  }
  //3. send token to user
  createSendToken(user, 200, res);
});

exports.logout = (req, res) => {
  res.cookie('jwt', 'loggedout', {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true,
  });
  res.status(200).json({
    status: 'success',
  });
};

exports.protect = catchAsync(async (req, res, next) => {
  //get token and check if it exists. Se envia en el header del request
  //el campoes authorization y el valor comienza con Bearer y luego el token
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  } else if (req.cookies.jwt) {
    token = req.cookies.jwt;
  }

  if (!token) {
    return next(new AppError('You are not logged in', 401));
  }

  //Verify token. Se crea como promesa con la funcion builtin promisify
  // const promise = promisify(jwt.verify);
  // const decode = await promise(token, process.env.JWT_SECRET);
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  //Check if user still exists
  const currentUser = await User.findById(decoded.id);
  if (!currentUser) {
    return next(new AppError('The user of this token no longer exists', 401));
  }
  //Check if user changed password after token was issued
  if (currentUser.changedPasswordAfter(decoded.iat)) {
    return next(
      new AppError('User recently changed password! Please log in again.', 401)
    );
  }
  //Grant access to protected route. Se pasa el request con el usuario al proximo middleware
  req.user = currentUser;
  res.locals.user = currentUser;
  next();
});

//Only for rendered pages, there will be no errors
exports.isLoggedIn = async (req, res, next) => {
  if (req.cookies.jwt) {
    try {
      const decoded = await promisify(jwt.verify)(
        req.cookies.jwt,
        process.env.JWT_SECRET
      );

      //Check if user still exists
      const currentUser = await User.findById(decoded.id);
      if (!currentUser) {
        return next();
      }
      //Check if user changed password after token was issued
      if (currentUser.changedPasswordAfter(decoded.iat)) {
        return next();
      }
      //There is a logged in user
      res.locals.user = currentUser;
      return next();
    } catch (error) {
      return next();
    }
  }
  next();
};

//Para pasarle argumentos al middleware se debe hacer una funcion wrapper que retorne el middleware
//roles en un array
exports.restrictTo = (...roles) => {
  return (req, res, next) => {
    //el role se obtiene del middleware anterior. Se asignó el currentUser al req.user
    //Y como la ruta al delete tiene primero el middleware protect, entonces le llega la info  a este middleware
    if (!roles.includes(req.user.role)) {
      return next(
        new AppError('You do not have permission to perform this action', 403)
      );
    }
    next();
  };
};

exports.forgotPassword = catchAsync(async (req, res, next) => {
  //get user based on posted email
  console.log(req.body.email);
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return next(new AppError('There is no user with that email address', 404));
  }
  //generate random token
  const resetToken = user.createPasswordResetToken();
  //validateBeforeSave false permite que se pueda guardar la pass temporal y saltarse los validadores de la bd
  await user.save({ validateBeforeSave: false });

  //send it back as an email
  const resetURL = `${req.protocol}://${req.get(
    'host'
  )}/api/v1/users/resetPassword/${resetToken}`;

  try {
    await new Email(user, resetURL).sendPasswordReset();

    res.status(200).json({
      status: 'success',
      message: 'Token sent to email',
    });
  } catch (error) {
    console.log(error);
    //en caso de error se resetea el token temporal y su expiracion
    user.passwordResetToken = undefined;
    user.PasswordResetExpires = undefined;
    await user.save({ validateBeforeSave: false });
    return next(
      new AppError(
        'There was an error while sending the email. Try again later.',
        500
      )
    );
  }
});

exports.resetPassword = catchAsync(async (req, res, next) => {
  //Get user based on token

  const hashedToken = crypto
    .createHash('sha256')
    .update(req.params.token)
    .digest('hex');
  //console.log('hashed token al hacer reset', hashedToken);
  const user = await User.findOne({
    passwordResetToken: hashedToken,
    //se verifica que la fecha sea mayor que la actual y que no ha expirado el token
    passwordResetExpires: { $gt: Date.now() },
  });

  // console.log(user);
  //if token not expired and user exists, set new password
  if (!user) {
    return next(new AppError('Invalid or expired token', 400));
  }
  user.password = req.body.password;
  user.passwordConfirm = req.body.passwordConfirm;
  user.passwordResetToken = undefined;
  user.passwordResetExpires = undefined;

  await user.save();
  //update changedPasswordAt property
  //log the user in, send JWT
  createSendToken(user, 200, res);
});

exports.updatePassword = catchAsync(async (req, res, next) => {
  //Get user from collection. Se pide explicitamente el password ya que no lo devuelve por defecto
  //el ID del user viene del middleware protect
  const user = await User.findById(req.user.id).select('+password');

  //Check if posted current password is correct
  if (!(await user.correctPassword(req.body.passwordCurrent, user.password))) {
    return next(new AppError('Wrong password. Try again', 401));
  }
  //Update password
  user.password = req.body.password;
  user.passwordConfirm = req.body.passwordConfirm;
  await user.save();
  //Log user in, send JWT
  createSendToken(user, 200, res);
});
