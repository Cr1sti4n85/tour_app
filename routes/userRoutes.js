const express = require('express');
const multer = require('multer');
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');

const upload = multer({ dest: 'public/img/users' });

const router = express.Router();

//ruta para signup, login, logout
router.post('/signup', authController.signup);
router.post('/login', authController.login);
router.get('/logout', authController.logout);
router.post('/forgotPassword', authController.forgotPassword);
router.patch('/resetPassword/:token', authController.resetPassword);

//usando el protect como middleware a nivel global para las rutas de mas abajo
//y asi no repetir el mismo codigo. Las de arriba no necesitan este middleware.
router.use(authController.protect);

//actualizar password
router.patch('/updateMyPassword', authController.updatePassword);

//actualizar datos y borrar usuario (borrado logico, se cambia estado active)
router.get('/me', userController.getMe, userController.getUser);
router.patch(
  '/updateMe',
  userController.uploadUserPhoto,
  userController.resizeUserPhoto,
  userController.updateMe
);
router.delete('/deleteMe', userController.deleteMe);

//middleware para restringir acceso a las rutas de abajo
router.use(authController.restrictTo('admin'));
//Rutas del usuario
router
  .route('/')
  .get(userController.getAllUsers)
  .post(userController.createUser);
router
  .route('/:id')
  .get(userController.getUser)
  .patch(userController.updateUser)
  .delete(userController.deleteUser);

module.exports = router;
