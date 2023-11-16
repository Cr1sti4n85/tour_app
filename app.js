const path = require('path');
const express = require('express');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const hpp = require('hpp');
const cookieParser = require('cookie-parser');

const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');

const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');
const reviewRouter = require('./routes/reviewRoutes');
const bookingRouter = require('./routes/bookingRoutes');
const viewRouter = require('./routes/viewroutes');

const app = express();

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

//GLOBAL MIDDLEWARES
//middleware para servir paginas estaticas. En el navegador no es necesario colocar /public
app.use(express.static(`${__dirname}/public`));
//helmet configura headers http de seguridad
app.use(helmet({ contentSecurityPolicy: false }));
//se usa el middleware morgan solo cuando NOD_ENV sea development
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

//limiter limita las peticiones de la misma IP de una api
const limiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 60 minutes
  max: 100, // Limit each IP to 100 requests per `window` (here, per 60 minutes)
  message: 'Too may requests from this IP. Try again in an hour',
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

//aplicamos el rate limiter a las rutas que comienzan con /api
app.use('/api', limiter);

app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));
//cookies
app.use(cookieParser());

//middleware para sanitizar los datos que vienen en el request.
//Se debe hacer despues de parsear el req.body
//sanitizacion de NoSQL injection
app.use(mongoSanitize());
//sanitizacion contra XSS (cross-site scripting)

//hpp prevents parameter pollution. Dentro se especifica una lista
//con valores que se permiten duplicados en la query. Ej. api/v1/tours/duration=5&duration=9
app.use(
  hpp({
    whiteList: [
      'duration',
      'ratingsAverage, ratingsQuantity',
      'maxGroupSize',
      'difficulty',
      'price',
    ],
  })
);
//middleware para colocar la fecha y hora en cada request
app.use((req, res, next) => {
  req.requestTime = new Date().toString();
  next();
});

//ROUTES
app.use('/', viewRouter);
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/reviews', reviewRouter);
app.use('/api/v1/bookings', bookingRouter);

//middleware para manejar errores en caso de ruta no encontrada.
//Uso del metodo all. Por ejemplo,  si el usuario ingresa un get a localhost:3000/api/tours
app.all('*', (req, res, next) => {
  const error = new AppError(
    `Can't find ${req.originalUrl}. Make sure it is a valid url`,
    404
  );
  next(error);
});

app.use(globalErrorHandler);
module.exports = app;
