const mongoose = require('mongoose');
const Tour = require('./tourModels');

//este esquema tendra parent referencing, las reviews referenciaran al tour y al usuario
const reviewSchema = new mongoose.Schema(
  {
    review: {
      type: String,
      required: [true, 'Review cannot be empty'],
    },
    rating: {
      type: Number,
      min: 1,
      max: 5,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    tour: {
      type: mongoose.Schema.ObjectId,
      ref: 'Tour',
      required: [true, 'Review must belong to a tour'],
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: [true, 'Review must belong to a user'],
    },
  },
  {
    //schema options. Estas opciones permiten trabajar con virtual properties
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

//creacion deindex para que usuario no postear mas de un review por tour
reviewSchema.index({ tour: 1, user: 1 }, { unique: true });

//middleware para poblar las id de referencia con los documentos
//de los tours y de los users
reviewSchema.pre(/^find/, function (next) {
  // this.populate({
  //   path: 'tour',
  //   select: 'name',
  // }).populate({
  //   path: 'user',
  //   select: 'name photo',
  // });
  this.populate({
    path: 'user',
    select: 'name photo',
  });
  next();
});

//static class method, para calcular la cantidad de reviews y el promedio de rating
reviewSchema.statics.calcAverageRating = async function (tourId) {
  //el this apunta al modelo y no a las instancias
  const stats = await this.aggregate([
    {
      $match: { tour: tourId },
    },
    {
      $group: {
        _id: '$tour',
        nRating: { $sum: 1 },
        avRating: { $avg: '$rating' },
      },
    },
  ]);
  console.log(stats);
  if (stats.length > 0) {
    //find the current tour and update it
    await Tour.findByIdAndUpdate(tourId, {
      ratingsQuantity: stats[0].nRating,
      ratingsAverage: stats[0].avRating,
    });
  } else {
    await Tour.findByIdAndUpdate(tourId, {
      ratingsQuantity: 0,
      ratingsAverage: 4.5,
    });
  }
};

//we call this method after the review is created
reviewSchema.post('save', function () {
  //this points to the current review
  this.constructor.calcAverageRating(this.tour);
});

//query middleware para actualizar y borrar reviews
reviewSchema.pre(/^findOneAnd/, async function (next) {
  //getting the document from the database
  this.review = await this.findOne();
  next();
});

reviewSchema.post(/^findOneAnd/, async function () {
  //await this.findOne(); does not work here as query has already executed
  //call function calcAverageRatings
  await this.review.constructor.calcAverageRating(this.review.tour);
});
const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;
