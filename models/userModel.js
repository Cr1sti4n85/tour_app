const crypto = require('crypto');
const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A user must have a name'],
    trim: true,
  },
  //slug: String,
  email: {
    type: String,
    required: [true, 'Please provide an email address'],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, 'Email is not valid'],
  },
  photo: {
    type: String,
    default: 'default.jpg',
  },
  role: {
    type: String,
    enum: ['user', 'guide', 'lead-guide', 'admin'],
    default: 'user',
  },
  password: {
    type: String,
    required: [true, 'A user must have a password'],
    minLength: 8,
    select: false,
  },
  passwordConfirm: {
    type: String,
    required: [true, 'Please confirm your password'],
    //Custom validator function para verificar que
    //al confirmar el password este sea igual que el que se escribio primero
    validate: {
      //Esto solo funciona con CREATE Y SAVE, no para UPDATE
      validator: function (pass) {
        return pass === this.password;
      },
      message: 'Passwords do not match',
    },
  },
  //solo usuarios que cambien su password tendran este campo
  passwordChangedAt: Date,
  passwordResetToken: String,
  passwordResetExpires: Date,
  active: {
    type: Boolean,
    default: true,
    select: false,
  },
});

/*middleware para cifrar las contraseñas antes de guardarlas en las DB */
userSchema.pre('save', async function (next) {
  //only run this function if password is actually modified
  if (!this.isModified('password')) return next();
  //el 12  se llama cost.
  this.password = await bcrypt.hash(this.password, 12);
  //en este punto ya no se necesita el valor en passwordConfirm asi que se asigna undefined
  this.passwordConfirm = undefined;
  next();
});

//middleware para guardar la propiedad passwordChangedAt cuando usuario resetea pass
userSchema.pre('save', function (next) {
  //metodos de mongo isModified y isNew
  if (!this.isModified('password') || this.isNew) return next();
  //se resta un segundo porque a veces el token se crea antes de que se guarde el timestamp
  //lo que no le permitiria loguearse. Revisar instance methos changedPasswordAfter
  this.passwordChangedAt = Date.now() - 1000;
  next();
});

//middleware para filtrar ususarios que tengan el estado active en true
userSchema.pre(/^find/, function (next) {
  //this points to the current query
  this.find({ active: { $ne: false } });
  next();
});

//instance method: metodo que estara disponible en todos los documentos de cierta coleccion
//este va a permitir evaluar si la contraseña ingresada es la misma que la almacenada en la DB
userSchema.methods.correctPassword = async function (inputPass, dbPass) {
  return await bcrypt.compare(inputPass, dbPass);
};

//instance method para verificar si usuario cambió su pass luego de que recibiera su token
userSchema.methods.changedPasswordAfter = function (JWTTimestamp) {
  if (this.passwordChangedAt) {
    const changedTimestamp = parseInt(
      this.passwordChangedAt.getTime() / 1000,
      10
    );
    console.log(changedTimestamp, JWTTimestamp);
    return JWTTimestamp < changedTimestamp; //si se hizo un cambio despues del token retorna true
  }

  return false;
};

userSchema.methods.createPasswordResetToken = function () {
  //se crea un password temporal con el modulo built-in crypto
  const resetToken = crypto.randomBytes(32).toString('hex');

  this.passwordResetToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');

  console.log({ resetToken }, this.passwordResetToken);
  this.passwordResetExpires = Date.now() + 10 * 60 * 1000;

  return resetToken;
};

const User = mongoose.model('User', userSchema);

module.exports = User;
