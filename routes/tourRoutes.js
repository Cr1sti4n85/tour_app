const express = require('express');
const tourController = require('../controllers/tourController');
const authController = require('../controllers/authController');
const reviewRouter = require('./reviewRoutes');
const router = express.Router();

/*param middleware es un tipo especial de middleware que se ejecuta para cierto tipo de parametros
en nuestra URL. El primer argumento es el nombre del parametro. Luego viene el callback*/

//router.param('id', tourController.checkID);

//nested routing
//middleware para que La tour route use la ruta review
//se necesita merged parameters en la reviewroute
router.use('/:tourId/reviews', reviewRouter);

//Routes
router
  .route('/top-5-cheap')
  //middleware aliasTopTours
  .get(tourController.aliasTopTours, tourController.getAllTours);

//rutas de los pipelines
router.route('/tour-stats').get(tourController.getTourStats);
router
  .route('/monthly-plan/:year')
  .get(
    authController.protect,
    authController.restrictTo('admin', 'lead-guide', 'guide'),
    tourController.getMonthlyPlan
  );

//routes for geospatial queries, finding tours within radius
router
  .route('/tours-within/:distance/center/:latlng/unit/:unit')
  .get(tourController.getToursWithin);

//ruta para calcular las distancias de todos los tours desde un punto especifico
router.route('/distances/:latlng/unit/:unit').get(tourController.getDistances);

router
  .route('/')
  .get(tourController.getAllTours)
  //middleware checkBody solo para el post, cada middleware se separa por comas
  .post(
    authController.protect,
    authController.restrictTo('admin', 'lead-guide'),
    tourController.createTour
  );
router
  .route('/:id')
  .get(tourController.getTour)
  .patch(
    authController.protect,
    authController.restrictTo('admin', 'lead-guide'),
    tourController.uploadTourImages,
    tourController.resizeTourImages,
    tourController.updateTour
  )
  .delete(
    //aplicacion de dos middlewares a la ruta de delete tours
    authController.protect,
    authController.restrictTo('admin', 'lead-guide'),
    tourController.deleteTour
  );

module.exports = router;
