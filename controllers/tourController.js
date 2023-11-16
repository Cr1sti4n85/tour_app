const multer = require('multer');
const sharp = require('sharp');
const Tour = require('../models/tourModels');
//const APIFeatures = require('../utils/apiFeatures');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
const factory = require('./handlerFactory');

const multerStorage = multer.memoryStorage();

const multerFilter = (req, file, callback) => {
  if (file.mimetype.startsWith('image')) {
    callback(null, true);
  } else {
    callback(
      new AppError('Not an image! Please upload images only', 400),
      false
    );
  }
};
const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});

exports.uploadTourImages = upload.fields([
  { name: 'imageCover', maxCount: 1 },
  { name: 'images', maxCount: 3 },
]);

exports.resizeTourImages = catchAsync(async (req, res, next) => {
  if (!req.files.imageCover || !req.files.images) return next();
  //cover image
  req.body.imageCover = `tour-${req.params.id}-${Date.now()}-cover.jpeg`;
  await sharp(req.files.imageCover[0].buffer)
    .resize(2000, 1333)
    .toFormat('jpeg')
    .jpeg({ quality: 90 })
    .toFile(`public/img/tours/${req.body.imageCover}`);

  //images
  req.body.images = [];
  await Promise.all(
    req.files.images.map(async (file, i) => {
      const filename = `tour-${req.params.id}-${Date.now()}-${i + 1}.jpeg`;
      await sharp(file.buffer)
        .resize(2000, 1333)
        .toFormat('jpeg')
        .jpeg({ quality: 90 })
        .toFile(`public/img/tours/${filename}`);

      req.body.images.push(filename);
    })
  );
  next();
});

exports.aliasTopTours = (req, res, next) => {
  req.query.limit = '5';
  req.query.sort = '-raingsAverage,price';
  req.query.fields = 'name,price,ratingsAverage,summary,difficulty';

  next();
};

// exports.getAllTours = catchAsync(async (req, res, next) => {
//   const features = new APIFeatures(Tour.find(), req.query)
//     .filter()
//     .sort()
//     .limitFields()
//     .paginate();
//   const tours = await features.query;

//   res.status(200).json({
//     status: 'success',
//     result: tours.length,
//     data: {
//       tours: tours,
//     },
//   });
//   catch (error) {
//     res.status(404).json({
//       status: 'failed',
//       message: error.message,
//     });
//   }
// });
exports.getAllTours = factory.getAll(Tour);

// exports.getTour = catchAsync(async (req, res, next) => {
//   //Tour.findOne({_id: req.params.id}) seria lo mismo que findById
//   //populate reemplaza las referencias a los guias con los documentos reales
//   const tour = await Tour.findById(req.params.id).populate('reviews');

//   if (!tour) {
//     //si no existe el id retorna error. Se debe usar return para parar la ejecucion
//     return next(new AppError('No tour found with that ID', 404));
//   }
//   res.status(200).json({
//     status: 'success',
//     data: {
//       tour,
//     },
//   });
//   // } catch (error) {
//   //   res.status(404).json({
//   //     status: 'failed',
//   //     message: error,
//   //   });
//   // }
// });
exports.getTour = factory.getOne(Tour, { path: 'reviews' });

// exports.createTour = catchAsync(async (req, res, next) => {
//   const newTour = await Tour.create(req.body);
//   res.status(201).json({
//     status: 'success',
//     data: {
//       tour: newTour,
//     },
//   });
//   // try {
//   //   const newTour = await Tour.create(req.body);
//   //   res.status(201).json({
//   //     status: 'success',
//   //     data: {
//   //       tour: newTour,
//   //     },
//   //   });
//   // } catch (error) {
//   //   res.status(400).json({
//   //     status: 'failed',
//   //     message: error.message,
//   //   });
//   // }
// });
exports.createTour = factory.createOne(Tour);

// exports.updateTour = catchAsync(async (req, res, next) => {
//   const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
//     //new retorna el nuevo objeto
//     new: true,
//     //ejecuta las validaciones del schema nuevamente
//     runValidators: true,
//   });

//   if (!tour) {
//     return next(new AppError('No tour found with that ID', 404));
//   }
//   res.status(200).json({
//     status: 'success',
//     data: {
//       tour,
//     },
//   });
//   // } catch (error) {
//   //   res.status(400).json({
//   //     status: 'failed',
//   //     message: error.message,
//   //   });
//   // }
// });
exports.updateTour = factory.updateOne(Tour);

// exports.deleteTour = catchAsync(async (req, res, next) => {
//   const tour = await Tour.findByIdAndDelete(req.params.id);

//   if (!tour) {
//     //si no existe el id retorna error. Se debe usar return para parar la ejecucion
//     return next(new AppError('No tour found with that ID', 404));
//   }
//   res.status(204).json({
//     status: 'success',
//     data: null,
//   });
// });
exports.deleteTour = factory.deleteOne(Tour);

//funciones para calcular estadisticas
//Uso de Aggregation pipeline, caracteristica de mongodb
exports.getTourStats = catchAsync(async (req, res, next) => {
  const stats = await Tour.aggregate([
    //stages
    {
      $match: { ratingsAverage: { $gte: 4.5 } },
    },
    {
      $group: {
        //los resultados se agrupan por atributo, por ej. por dificultad
        _id: { $toUpper: '$difficulty' },
        numTours: { $sum: 1 },
        numRatings: { $sum: '$ratingsQuantity' },
        avgRating: { $avg: '$ratingsAverage' },
        avgPrice: { $avg: '$price' },
        minPrice: { $min: '$price' },
        maxPrice: { $max: '$price' },
      },
    },
    {
      //en esta etapa se usan las variables del anterior
      $sort: { avgPrice: 1 },
    },
  ]);

  res.status(200).json({
    status: 'success',
    stats,
  });
  // } catch (error) {
  //   res.status(404).json({
  //     status: 'failed',
  //     message: error,
  //   });
  // }
});

exports.getMonthlyPlan = catchAsync(async (req, res, next) => {
  const year = req.params.year * 1;

  const plan = await Tour.aggregate([
    {
      //unwind separa los elementos de un array, en este caso startDates
      $unwind: '$startDates',
    },
    {
      $match: {
        startDates: {
          $gte: new Date(`${year}-01-01`),
          $lte: new Date(`${year}-12-31`),
        },
      },
    },
    {
      $group: {
        //operador $month extrae mes de Date
        _id: { $month: '$startDates' },
        numTourStarts: { $sum: 1 },
        //push crea array
        tours: { $push: '$name' },
      },
    },
    {
      $addFields: { month: '$_id' },
    },
    {
      $project: {
        //el 0 indica que no se va a mostrar esa info en el resultado
        _id: 0,
      },
    },
    {
      $sort: { numTourStarts: -1 },
    },
  ]);
  res.status(200).json({
    status: 'success',
    plan,
  });
  // } catch (error) {
  //   res.status(404).json({
  //     status: 'failed',
  //     message: error,
  //   });
  // }
});

// /tours-within/233/center/34.111745, -118.113491/unit/mi
exports.getToursWithin = catchAsync(async (req, res, next) => {
  const { distance, latlng, unit } = req.params;
  const [lat, lng] = latlng.split(',');
  //mongo db espera el radio en una unidad llamada radians, la distancia dividido
  //por el radio de la Tierra (millas o km)
  const radius = unit === 'mi' ? distance / 3963.2 : distance / 6378.1;
  if (!lat || !lng) {
    return next(
      new AppError('Please provide latitude and longitude in the format ', 400)
    );
  }

  const tours = await Tour.find({
    startLocation: { $geoWithin: { $centerSphere: [[lng, lat], radius] } },
  });

  res.status(200).json({
    status: 'success',
    results: tours.length,
    date: {
      data: tours,
    },
  });
});

exports.getDistances = catchAsync(async (req, res, next) => {
  const { latlng, unit } = req.params;
  const [lat, lng] = latlng.split(',');

  const multiplier = unit === 'mi' ? 0.000621371 : 0.001;

  if (!lat || !lng) {
    return next(
      new AppError('Please provide latitude and longitude in the format ', 400)
    );
  }
  const distances = await Tour.aggregate([
    {
      $geoNear: {
        near: {
          type: 'Point',
          coordinates: [lng * 1, lat * 1],
        },
        //nombre del nuevo campo que sera creado
        distanceField: 'distance',
        distanceMultiplier: multiplier,
      },
    },
    {
      $project: {
        distance: 1,
        name: 1,
      },
    },
  ]);

  res.status(200).json({
    status: 'success',

    date: {
      data: distances,
    },
  });
});
