/**
 * Archivo que contiene las rutas para el manejo de usuarios.
 */

const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authMiddleware = require('../middlewares/authMiddleware');
const profileController = require('../controllers/profileController'); // Importa profileController

/**
 * Ruta para obtener todos los usuarios.
 * * @method GET
 * @param {String} '/' - Ruta para obtener todos los usuarios.
 * @middleware authMiddleware.verifyToken - Verifica el token de autorización.
 * @controller userController.getAllUsers - Controlador para obtener todos los usuarios.
 */
router.get('/', authMiddleware.verifyToken, userController.getAllUsers);

/**
 * Ruta para obtener el perfil del usuario autenticado.
 * * @method GET
 * @param {String} '/profile' - Ruta para obtener el perfil del usuario.
 * @middleware authMiddleware.verifyToken - Verifica el token de autorización.
 * @controller profileController.getProfile - Controlador para obtener el perfil del usuario.
 */
router.get('/profile', authMiddleware.verifyToken, profileController.getProfile); // Agrega la ruta /profile


/**
 * Ruta para obtener un usuario por ID.
 * * @method GET
 * @param {String} '/:id' - Ruta para obtener un usuario por ID.
 * @param {Number} ':id' - ID del usuario.
 * @middleware authMiddleware.verifyToken - Verifica el token de autorización.
 * @controller userController.getUserById - Controlador para obtener un usuario por ID.
 */
router.get('/:id', authMiddleware.verifyToken, userController.getUserById);

/**
 * Ruta para actualizar un usuario.
 * * @method PUT
 * @param {String} '/:id' - Ruta para actualizar un usuario.
 * @param {Number} ':id' - ID del usuario.
 * @middleware authMiddleware.verifyToken - Verifica el token de autorización.
 * @controller userController.updateUser - Controlador para actualizar un usuario.
 */
router.put('/:id', authMiddleware.verifyToken, userController.updateUser);

/**
 * Ruta para eliminar un usuario.
 * * @method DELETE
 * @param {String} '/:id' - Ruta para eliminar un usuario.
 * @param {Number} ':id' - ID del usuario.
 * @middleware authMiddleware.verifyToken - Verifica el token de autorización.
 * @controller userController.deleteUser - Controlador para eliminar un usuario.
 */
router.delete('/:id', authMiddleware.verifyToken, userController.deleteUser);

/**
 * Ruta para crear un usuario.
 * **/

router.post('/', userController.createUser);


/**
 * Exporta el router de usuarios.
 */
module.exports = router;