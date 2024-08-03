/**
 * Archivo que contiene la función para verificar tokens de autenticación.
 */

const jwt = require('jsonwebtoken');
const { isTokenBlacklisted } = require('../controllers/authController');
require('dotenv').config();
const  s  = require('./sendResponse');




/**
 * Función para verificar un token de autenticación en una solicitud.
 * 
 * @param {Object} req - Objeto de solicitud.
 * @param {Object} res - Objeto de respuesta.
 * @param {Function} next - Función para continuar con la solicitud.
 */
exports.verifyToken = (req, res, next) => {
  // Obtiene el token de autorización de la solicitud.
  const token = req.header('Authorization');
  if (!token) {
    // Retorna un error si no se proporcionó un token de autorización.
      return s.sendResponse(res, 401, { error: 'Acceso denegado' } )
  }

  // Extrae el valor del token de autorización.
  const tokenValue = token.replace('Bearer ', '');

  // Verifica si el token de autorización está en la lista negra.
  if (isTokenBlacklisted(tokenValue)) {
    // Retorna un error si el token de autorización está en la lista negra.
      return s.sendResponse(res, 401, { error: 'Token invalidado' } );
  }

  try {
    // Verifica la validez del token de autorización.
    const verified = jwt.verify(tokenValue, process.env.JWT_SECRET);
    // Asigna la información del usuario verificado a la solicitud.
    req.user = verified;
    // Continúa con la solicitud.
    next();
  } catch (error) {
    // Retorna un error si el token de autorización no es válido.
        s.sendResponse(res, 400, { error: 'Token no válido' } )
  }
};


