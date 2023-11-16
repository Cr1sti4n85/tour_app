class APIFeatures {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }

  filter() {
    //Se crea una copia del objeto query
    const queryObj = { ...this.queryString };
    const excludedFields = ['page', 'sort', 'limit', 'fields'];
    excludedFields.forEach((el) => delete queryObj[el]);

    //Advanced filtering. price[gte]=500
    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);

    //Ejecutar query
    this.query = this.query.find(JSON.parse(queryStr));
    // let query = Tour.find(JSON.parse(queryStr));
    return this;
  }

  sort() {
    //Sorting  sort=price
    if (this.queryString.sort) {
      //sort es metodo de query de mongodb. Para hacerlo descendente - sort=-price
      //Si se quiere ordenar por mas de un parametro se coloca coma. sort=price,ratingsAverage
      //En el metodo sort cada filtro se pasa separado de espacio
      const sortBy = this.queryString.sort.split(',').join(' ');
      this.query = this.query.sort(sortBy);
    } else {
      this.query = this.query.sort('price');
    }
    return this;
  }

  limitFields() {
    //Field limiting
    if (this.queryString.fields) {
      const fields = this.queryString.fields.split(',').join(' ');
      this.query = this.query.select(fields);
    } else {
      //el guion excluye resultado del query
      this.query = this.query.select('-__v');
    }
    return this;
  }

  paginate() {
    //PAGINATION page=2&limit=10   Se pide la pagina 2 y Se muestran 10 resultados por pagina
    //Se usa metodo skip y limit. skip hace indica cuantos documentos debe saltarse para llegar a la pagina
    //Por ejemplo, si la pagina es la 2 y el limit es 10, skip debe ser 10 ya que debe saltarse
    //los diex primeros documentos

    //paginacion por defecto
    const page = this.queryString.page * 1 || 1;
    const limit = this.queryString.limit * 1 || 100;
    const skip = (page - 1) * limit;

    this.query = this.query.skip(skip).limit(limit);

    return this;
  }
}

module.exports = APIFeatures;
