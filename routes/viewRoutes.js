const express = require('express');
const viewController = require('../controllers/viewController');
const authcontroller = require('../controllers/authController');
const bookingcontroller = require('../controllers/bookingController');

const router = express.Router();

router.get(
  '/',
  //bookingcontroller.createBookingCheckout,
  authcontroller.isLoggedIn,
  viewController.getOverview
);

router.get('/tour/:slug', authcontroller.isLoggedIn, viewController.getTour);

router.get('/login', authcontroller.isLoggedIn, viewController.getLoginForm);

router.get('/me', authcontroller.protect, viewController.getAccount);

router.get('/my-tours', authcontroller.protect, viewController.getMyTours);

router.post(
  '/submit-user-data',
  authcontroller.protect,
  viewController.updateUserData
);

module.exports = router;
