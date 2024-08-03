/**
 * Archivo que contiene las funciones para el manejo de usuarios.
 */

const { User } = require('../models');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const tokenBlacklist = new Set();
require('dotenv').config();
const validateUser  = require('../services/validationService');
const { z } = require("zod");  // Importar el servicio de validación

/**
 * Función para registrar un nuevo usuario.
 * 
 * @param {Object} req - Objeto de solicitud.
 * @param {Object} res - Objeto de respuesta.
 */
exports.register = async (req, res) => {
  try {
    // Validar los datos de entrada con Zod
    const validatedData = validateUser(req.body);

    // Encriptar la contraseña
    const hashedPassword = await bcrypt.hash(validatedData.password, 10);

    // Crear un nuevo usuario
    const newUser = await User.create({
      ...validatedData,
      password: hashedPassword,
    });

    res.status(201).json(newUser);
  } catch (error) {
    if (error instanceof z.ZodError) {
      // Manejar errores de validación de Zod
      return res.status(400).json({ error: error.errors });
    }
    console.error(error);
    res.status(500).json({ error: 'Error al registrar el usuario' });
  }
};

/**
 * Función para iniciar sesión de un usuario.
 * 
 * @param {Object} req - Objeto de solicitud.
 * @param {Object} res - Objeto de respuesta.
 */
exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    // Busca el usuario en la base de datos según el correo electrónico.
    const user = await User.findOne({ where: { email } });
    if (!user) {
      // Retorna un error si el usuario no existe.
      return res.status(400).json({ error: 'Usuario no encontrado' });
    }
    // Compara la contraseña proporcionada con la almacenada en la base de datos.
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      // Retorna un error si la contraseña es incorrecta.
      return res.status(400).json({ error: 'Contraseña incorrecta' });
    }
    // Crea un token de autenticación para el usuario.
    const token = jwt.sign({ id: user.id, username: user.username }, process.env.JWT_SECRET, { expiresIn: '1h' });
    // Retorna el token de autenticación.
    res.json({ token });
  } catch (error) {
    // Retorna un error si ocurre algo durante el inicio de sesión.
    res.status(500).json({ error: 'Error al iniciar sesión' });
  }
};

/**
 * Función para verificar un token de autenticación.
 * 
 * @param {Object} req - Objeto de solicitud.
 * @param {Object} res - Objeto de respuesta.
 */
exports.verify = (req, res) => {
  const { token } = req.body;
  try {
    // Verifica la validez del token de autenticación.
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // Retorna la información del usuario asociada al token.
    res.json(decoded);
  } catch (error) {
    // Retorna un error si el token no es válido.
    res.status(401).json({ error: 'Token no válido' });
  }
};

/**
 * Función para refrescar un token de autenticación.
 * 
 * @param {Object} req - Objeto de solicitud.
 * @param {Object} res - Objeto de respuesta.
 */
exports.refresh = (req, res) => {
  const { token } = req.body;
  try {
    // Verifica la validez del token de autenticación, ignorando la fecha de expiración.
    const decoded = jwt.verify(token, process.env.JWT_SECRET, { ignoreExpiration: true });
    // Crea un nuevo token de autenticación con la información del usuario.
    const newToken = jwt.sign({ id: decoded.id, username: decoded.username }, process.env.JWT_SECRET, { expiresIn: '1h' });
    // Retorna el nuevo token de autenticación.
    res.json({ token: newToken });
  } catch (error) {
    // Retorna un error si el token no es válido.
    res.status(401).json({ error: 'Token no válido' });
  }
};

/**
 * Función para cerrar sesión de un usuario.
 * 
 * @param {Object} req - Objeto de solicitud.
 * @param {Object} res - Objeto de respuesta.
 */
exports.logout = (req, res) => {
  const token = req.header('Authorization').replace('Bearer ', '');
  // Agrega el token a la lista negra para evitar su uso posterior.
  tokenBlacklist.add(token);
  // Retorna un mensaje de confirmación.
  res.status(200).json({ message: 'Logout successful' });
};

/**
 * Función para verificar si un token está en la lista negra.
 * 
 * @param {String} token - Token de autenticación.
 * @returns {Boolean} Verdadero si el token está en la lista negra, falso de lo contrario.
 */
exports.isTokenBlacklisted = (token) => {
  return tokenBlacklist.has(token);
};