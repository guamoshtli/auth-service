/**
 * Archivo que contiene las rutas para la autenticación de usuarios.
 */

const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { logout } = require('../controllers/authController');

/**
 * Ruta para registrar un nuevo usuario.
 * 
 * @method POST
 * @param {String} '/register' - Ruta para registrar un nuevo usuario.
 * @controller authController.register - Controlador para registrar un nuevo usuario.
 */
router.post('/register', authController.register);

/**
 * Ruta para iniciar sesión de un usuario.
 * 
 * @method POST
 * @param {String} '/login' - Ruta para iniciar sesión de un usuario.
 * @controller authController.login - Controlador para iniciar sesión de un usuario.
 */
router.post('/login', authController.login);

/**
 * Ruta para verificar un token de autenticación.
 * 
 * @method POST
 * @param {String} '/verify' - Ruta para verificar un token de autenticación.
 * @controller authController.verify - Controlador para verificar un token de autenticación.
 */
router.post('/verify', authController.verify);

/**
 * Ruta para refrescar un token de autenticación.
 * 
 * @method POST
 * @param {String} '/refresh' - Ruta para refrescar un token de autenticación.
 * @controller authController.refresh - Controlador para refrescar un token de autenticación.
 */
router.post('/refresh', authController.refresh);

/**
 * Ruta para cerrar sesión de un usuario.
 * 
 * @method POST
 * @param {String} '/logout' - Ruta para cerrar sesión de un usuario.
 * @controller logout - Controlador para cerrar sesión de un usuario.
 */
router.post('/logout', logout);

/**
 * Exporta el router de autenticación.
 */
module.exports = router;