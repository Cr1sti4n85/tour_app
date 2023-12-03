const mongoose = require('mongoose');
const dotenv = require('dotenv');

//uncaught exceptions: bugs que ocurren en el codigo sincrono pero que no
//son manejados en ninguna parte. tiene que ir antes de todo el codigo
process.on('uncaughtException', (err) => {
  console.log('UNCAUGHT EXCEPTION! Shutting Down...');
  console.log(err.name, err.message);
  process.exit(1);
});

//el archivo de config debe ser llamado antes de llamar app.js
//si el archivo solo se llamara .env esta linea no seria necesaria
//y en la linea de arriba iria require("dotenv").config
dotenv.config({ path: './config.env' });
const app = require('./app');

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);
mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then((conn) => {
    console.log(`Succesfully connected to DB on port ${conn.connection.port}`);
  });

//START SERVER
const port = process.env.PORT || 8080;

//guardar la ejecucion del server en una constante para poder usarla en caso de error
const server = app.listen(port, '0.0.0.0', () => {
  console.log(`Running on port ${port}`);
});

//Creacion de event listener para manejar errores en la conexion de la BD
//el evento es un unhandled rejection
process.on('unhandledRejection', (err) => {
  console.log(err.name, err.message);
  console.log('UNHANDLED REJECTION! Shutting Down...');
  //permite cerrar el servidor y salir del proceso, el 0 es succesfuly el 1 es error
  server.close(() => {
    process.exit(1);
  });
});
