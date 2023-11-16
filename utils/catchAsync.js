//Esta funcion permite eliminar el codigo try catch de todas las funciones
//de esta forma recibira todos los errores en el catch y el next lo mandara
//al global error handler
module.exports = (fn) => {
  return (req, res, next) => {
    fn(req, res, next).catch(next); //error => next(error)
  };
};
