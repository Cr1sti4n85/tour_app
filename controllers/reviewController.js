const Review = require('../models/reviewModel');
//const catchAsync = require('../utils/catchAsync');
const factory = require('./handlerFactory');

// exports.getAllReviews = catchAsync(async (req, res, next) => {
//   let filter = {};
//   if (req.params.tourId) filter = { tour: req.params.tourId };
//   const reviews = await Review.find(filter);

//   res.status(200).json({
//     status: 'success',
//     result: reviews.length,
//     data: {
//       tours: reviews,
//     },
//   });
// });
exports.getAllReviews = factory.getAll(Review);

exports.getReview = factory.getOne(Review);

// exports.createReview = catchAsync(async (req, res, next) => {
//   //si el tour id o el user id no vienen en el body, obtenerlos de los parametros y del protect middleware
//   if (!req.body.tour) {
//     req.body.tour = req.params.tourId;
//   }
//   if (!req.body.user) {
//     //recordar que el user.id viene del middleware protect
//     req.body.user = req.user.id;
//   }
//   const newReview = await Review.create(req.body);
//   res.status(201).json({
//     status: 'success',
//     data: {
//       revew: newReview,
//     },
//   });
// });

/*middleware para create */
exports.setTourUserIds = (req, res, next) => {
  //si el tour id o el user id no vienen en el body, obtenerlos de los parametros y del protect middleware
  if (!req.body.tour) {
    req.body.tour = req.params.tourId;
  }
  if (!req.body.user) {
    //recordar que el user.id viene del middleware protect
    req.body.user = req.user.id;
  }
  next();
};
exports.createReview = factory.createOne(Review);

exports.deleteReview = factory.deleteOne(Review);

exports.updateReview = factory.updateOne(Review);
