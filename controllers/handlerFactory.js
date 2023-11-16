const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const APIFeatures = require('../utils/apiFeatures');

//este es el modelo para borrar cualquier tipo de documento
exports.deleteOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const document = await Model.findByIdAndDelete(req.params.id);

    if (!document) {
      //si no existe el id retorna error. Se debe usar return para parar la ejecucion
      return next(new AppError('No document found with that ID', 404));
    }
    res.status(204).json({
      status: 'success',
      data: null,
    });
  });

exports.updateOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const document = await Model.findByIdAndUpdate(req.params.id, req.body, {
      //new retorna el nuevo objeto
      new: true,
      //ejecuta las validaciones del schema nuevamente
      runValidators: true,
    });

    if (!document) {
      return next(new AppError('No document found with that ID', 404));
    }
    res.status(200).json({
      status: 'success',
      data: {
        data: document,
      },
    });
  });

exports.createOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const newDoc = await Model.create(req.body);
    res.status(201).json({
      status: 'success',
      data: {
        data: newDoc,
      },
    });
  });

exports.getOne = (Model, populateOptions) =>
  //el get del tour puede recibir un populateOptions
  catchAsync(async (req, res, next) => {
    let query = Model.findById(req.params.id);
    if (populateOptions) query = query.populate(populateOptions);
    const document = await query;

    if (!document) {
      return next(new AppError('No document found with that ID', 404));
    }
    res.status(200).json({
      status: 'success',
      data: document,
    });
  });

exports.getAll = (Model) =>
  catchAsync(async (req, res, next) => {
    //se filtra en caso de que llegue un tour id, para que se retornen
    //solo las reviews de ese tour. Si no viene el tour id, se pasa el
    //objeto vacio al find y devuelve todas las reviews. Esto funciona solo
    //para las nested GET reviews en los tours
    let filter = {};
    if (req.params.tourId) filter = { tour: req.params.tourId };
    const features = new APIFeatures(Model.find(filter), req.query)
      .filter()
      .sort()
      .limitFields()
      .paginate();
    const document = await features.query;

    res.status(200).json({
      status: 'success',
      result: document.length,
      data: {
        data: document,
      },
    });
  });
