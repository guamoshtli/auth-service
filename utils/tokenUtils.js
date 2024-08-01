/**
 * Archivo que contiene las funciones para la generación y verificación de tokens de autenticación.
 */

const jwt = require('jsonwebtoken');
require('dotenv').config();

/**
 * Función para generar un token de autenticación.
 * 
 * @param {Object} payload - Información del usuario a incluir en el token.
 * @returns {String} Token de autenticación generado.
 */
exports.generateToken = (payload) => {
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
};

/**
 * Función para verificar un token de autenticación.
 * 
 * @param {String} token - Token de autenticación a verificar.
 * @returns {Object|null} Información del usuario incluida en el token si es válido, null en caso contrario.
 */
exports.verifyToken = (token) => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    return null;
  }
};
