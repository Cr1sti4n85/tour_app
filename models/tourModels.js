const mongoose = require('mongoose');
const slugify = require('slugify');
//const User = require('./userModel'); necesario si el tour va a tener embedded docs de los usuarios

//Schema: Es como una plantilla que describe la estructura de los documentos de la bd
//built-in validators: ejs: required, maxlength, minlength, enum, min, max
const tourSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'A tour must have a name'],
      unique: true,
      trim: true,
      maxlength: [
        40,
        'A tour name must be less than or equal to 40 characters',
      ],
      minlength: [
        10,
        'A tour name must be greater than or equal to 10 characters',
      ],
      //validate: [validator.isAlpha, 'Tour name must only contain letters'],
    },
    slug: String,
    duration: {
      type: Number,
      required: [true, 'A tour must have a duration'],
    },
    maxGroupSize: {
      type: Number,
      required: [true, 'A tour must have a group size'],
    },
    difficulty: {
      type: String,
      required: [true, 'A tour must have a difficulty'],
      enum: {
        values: ['easy', 'medium', 'difficult'],
        message: 'Values allowed are easy, medium or difficult',
      },
    },
    ratingsAverage: {
      type: Number,
      default: 4.5,
      min: [1, 'The rating must be greater than or equal to 1'],
      max: [5, 'The rating must be less than or equal to 5'],
      //setter para dejar el rating con un solo decimal
      set: (value) => value.toFixed(1),
    },
    ratingsQuantity: {
      type: Number,
      default: 0,
    },
    price: {
      type: Number,
      required: [true, 'A tour must have a price'],
    },
    priceDiscount: {
      type: Number,
      //custom validator. Valida que el descuento sea menor que el precio
      validate: {
        //this only points to current doc on NEW document creation
        validator: function (value) {
          return value < this.price;
        },
        message: 'Doscount price ({VALUE}) should be below regular price',
      },
    },

    summary: {
      type: String,
      trim: [true, 'A tour must have a description'],
    },
    description: {
      type: String,
      trim: true,
    },
    imageCover: {
      type: String,
      required: [true, 'A tour must have a cover image'],
    },
    //[Strings] hace referencia a un array compuesto de strings
    images: [String],
    createdAt: {
      type: Date,
      default: Date.now(),
      //select false no muestra este campo al hacer un query select
      select: false,
    },
    startDates: [Date],
    secretTour: {
      type: Boolean,
      default: false,
    },
    startLocation: {
      type: {
        type: String,
        default: 'Point',
        enum: ['Point'],
      }, //array que recive longitud y latitud
      coordinates: [Number],
      address: String,
      description: String,
    },
    //embedded documents
    locations: [
      {
        type: {
          type: String,
          enum: ['Point'],
        }, //array que recive longitud y latitud
        coordinates: [Number],
        address: String,
        description: String,
        day: Number,
      },
    ],
    //embedding documents de guides
    //guides: Array
    //child referencing aplicado a los guides
    guides: [
      {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
      },
    ],
  },
  {
    //schema options. Estas opciones permiten trabajar con virtual properties
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

/*creacion de un index en los precios para hacer consulta eficiente
1 hace referencia a orden ascendente*/
tourSchema.index({ price: 1, ratingsAverage: -1 });
tourSchema.index({ slug: 1 });
//en este caso se usan indices 2D sphere, ya que se trata de ubicacion espacial
tourSchema.index({ startLocation: '2dsphere' });
//Virtual property: no se guardan de forma permanente. Se pueden crear a partir de otras propiedades
tourSchema.virtual('durationWeeks').get(function () {
  return this.duration / 7;
});

//Virtual populate, permite obtener la info de las reviews
//sin almacenarlas en la tabla tours
tourSchema.virtual('reviews', {
  ref: 'Review',
  //se vinculan ambos modelos con el campo en comun
  foreignField: 'tour',
  localField: '_id',
});

//Document middleware. "Pre" se ejecuta antes de .save() y create()
tourSchema.pre('save', function (next) {
  //this apunta al documento procesado
  this.slug = slugify(this.name, { lower: true });
  next();
});

//middleware que guarda los documentos de cada usuario segun los id en el array pasado al tour
//serian embbeding documents de users como guides o admins dentro del documento tour
// tourSchema.pre('save', async function (next) {
//   const guidesPromises = this.guides.map(async (id) => await User.findById(id));
//   this.guides = await Promise.all(guidesPromises);
//   next();
// });

//POST MiDDLEWARE: Se ejecutan despues de que terminan los pre middleware
tourSchema.post('save', function (doc, next) {
  console.log(doc);
  next();
});

//Query pre Middleware: se ejecuta antes de cualquier query que comience con find
//este query limita los resultados a los que tienen la propiedad secret en false
tourSchema.pre(/^find/, function (next) {
  this.find({ secretTour: { $ne: true } });

  this.start = Date.now();
  next();
});

//middleware para poblar las id de referencia de los guides con los documentos
tourSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'guides',
    select: '-__v -passwordChangedAt',
  });
  next();
});

//Query post middleware
tourSchema.post(/^find/, function (docs, next) {
  console.log(`Query took ${Date.now() - this.start} miliseconds`);
  //console.log(docs);
  next();
});

//Aggregation middleware. Este va a remover los secret tours del query aggregation
// tourSchema.pre('aggregate', function (next) {
//   //this hace referenca al objeto aggregation
//   this.pipeline().unshift({ $match: { secretTour: { $ne: true } } });
//   next();
// });

//Se debe crear un model a partir del schema
const Tour = mongoose.model('Tour', tourSchema);

module.exports = Tour;
