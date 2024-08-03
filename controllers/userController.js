/**
 * Archivo que contiene las funciones para el manejo de usuarios.
 */

const { User } = require('../models');
const  s  = require('../middlewares/sendResponse');

/**
 * Función para obtener todos los usuarios.
 * 
 * @param {Object} req - Objeto de solicitud.
 * @param {Object} res - Objeto de respuesta.
 */
exports.getAllUsers = async (req, res) => {
  try {
    // Busca todos los usuarios en la base de datos.
    const users = await User.findAll();
    // Retorna la lista de usuarios.
    res.json(users);
  } catch (error) {
    // Retorna un error si ocurre algo durante la búsqueda de usuarios.
    s.sendResponse(res,500, { error: 'Error al obtener usuarios' })
  }
};

/**
 * Función para obtener un usuario por ID.
 * 
 * @param {Object} req - Objeto de solicitud.
 * @param {Object} res - Objeto de respuesta.
 */
exports.getUserById = async (req, res) => {
  const { id } = req.params;
  try {
    // Busca el usuario en la base de datos según el ID proporcionado.
    const user = await User.findByPk(id);
    if (!user) {
      // Retorna un error si el usuario no existe.
      return s.sendResponse(res,404, { error: 'Usuario no encontrado' })
    }
    // Retorna el usuario encontrado.
    res.json(user);
  } catch (error) {
    // Retorna un error si ocurre algo durante la búsqueda del usuario.
    s.sendResponse(res, 500, { error: 'Error al obtener usuario' })
  }
};

/**
 * Función para actualizar un usuario.
 * 
 * @param {Object} req - Objeto de solicitud.
 * @param {Object} res - Objeto de respuesta.
 */
exports.updateUser = async (req, res) => {
  const { id } = req.params;
  const { username, email, password } = req.body;
  try {
    // Busca el usuario en la base de datos según el ID proporcionado.
    const user = await User.findByPk(id);
    if (!user) {
      // Retorna un error si el usuario no existe.
     return s.sendResponse(res, 404, { error: 'Usuario no encontrado' })
    }
    // Actualiza los campos del usuario según los valores proporcionados.
    user.username = username || user.username;
    user.email = email || user.email;
    if (password) {
      // Encripta la contraseña proporcionada.
      user.password = await bcrypt.hash(password, 10);
    }
    // Guarda los cambios en la base de datos.
    await user.save();
    // Retorna el usuario actualizado.
    res.json(user);
  } catch (error) {
    // Retorna un error si ocurre algo durante la actualización del usuario.
    s.sendResponse(res, 500, { error: 'Error al actualizar usuario' } )
  }
};

/**
 * Función para eliminar un usuario.
 * 
 * @param {Object} req - Objeto de solicitud.
 * @param {Object} res - Objeto de respuesta.
 */
exports.deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    // Busca el usuario en la base de datos según el ID proporcionado.
    const user = await User.findByPk(id);
    if (!user) {
      // Retorna un error si el usuario no existe.
      s.sendResponse(res, 404, { error: 'Usuario no encontrado' })
    }
    // Elimina el usuario de la base de datos.
    await user.destroy();
    // Retorna un mensaje de confirmación.
    res.json({ message: 'Usuario eliminado' });
  } catch (error) {
    // Retorna un error si ocurre algo durante la eliminación del usuario.
    s.sendResponse(res, 500, { error: 'Error al eliminar usuario' })
  }
};