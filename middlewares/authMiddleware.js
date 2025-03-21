/**
 * Archivo que contiene la función para verificar tokens de autenticación y autorizar el acceso.
 */
// authMiddleware.js
const jwt = require('jsonwebtoken');
const { isTokenBlacklisted } = require('../controllers/authController');
const { Role, UserRole, UserCompany, User, Company } = require('../models'); // Importa el modelo Company
const s = require('./sendResponse');
require('dotenv').config();

/**
 * Función para verificar un token de autenticación y adjuntar la información del usuario a la solicitud.
 */
exports.verifyToken = async (req, res, next) => {
  //console.log('Middleware verifyToken ejecutándose...');

  const token = req.header('Authorization');

  if (!token) {
    return s.sendResponse(res, 401, { error: 'Acceso denegado' });
  }

  const tokenValue = token.replace('Bearer ', '');

  if (isTokenBlacklisted(tokenValue)) {
    return s.sendResponse(res, 401, { error: 'Token invalidado' });
  }

  try {
    const decoded = jwt.verify(tokenValue, process.env.JWT_SECRET);
    req.user = decoded; // Adjuntamos la información decodificada del token

    // Buscar información adicional del usuario (roles y empresa)
    const user = await User.findByPk(req.user.id, {
      include: [
        {
          model: UserRole,
          include: [{ model: Role, attributes: ['name'] }],
        },
        {
          model: UserCompany,
          include: [{ model: Company, attributes: ['name'] }],
        },
      ],
    });

    console.log('Usuario encontrado:', user); // Log para depuración

    if (!user) {
      return s.sendResponse(res, 401, { error: 'Usuario no encontrado' });
    }

    if (!user.UserRoles || user.UserRoles.length === 0) {
      return s.sendResponse(res, 401, { error: 'El usuario no tiene roles asignados' });
    }

    if (!user.UserCompanies || user.UserCompanies.length === 0) {
      return s.sendResponse(res, 401, { error: 'El usuario no tiene empresas asignadas' });
    }

    req.user.roles = user.UserRoles.map(ur => ur.Role.name.toUpperCase());
    req.user.company_id = user.UserCompanies[0].companyId;
    req.user.company_name = user.UserCompanies[0].Company.name;

    //console.log('Roles del usuario (verifyToken):', req.user.roles);
    //console.log('Empresa del usuario (verifyToken):', req.user.company_name);

    next();
  } catch (error) {
    //console.error('Error al verificar el token:', error);
    s.sendResponse(res, 400, { error: 'Token no válido' });
  }
};

/**
 * Función middleware para autorizar el acceso basado en roles permitidos.
 * @param {string[]} rolesPermitted - Un array de roles permitidos (en mayúsculas).
 * @returns {function} - El middleware de autorización.
 */
exports.authorize = (rolesPermitted) => {
  return (req, res, next) => {
    console.log('Middleware authorize ejecutándose...');
    console.log('Roles permitidos:', rolesPermitted);
    console.log('Roles del usuario:', req.user.roles);

    if (!req.user || !req.user.roles) {
      console.log('Usuario no autenticado o sin roles definidos.');
      return s.sendResponse(res, 401, { error: 'Usuario no autenticado o sin roles definidos.' });
    }

    const hasPermission = rolesPermitted.some(role => req.user.roles.includes(role.toUpperCase()));

    console.log('Tiene permisos:', hasPermission);

    if (!hasPermission) {
      console.log('No tiene permisos para acceder a este recurso.');
      return s.sendResponse(res, 403, { error: 'No tienes permisos para acceder a este recurso.' });
    }

    // Si es un usuario normal (no administrador), verificar la pertenencia a la empresa
    if (!req.user.roles.includes('ADMIN') && req.user.company_id === null) {
      return s.sendResponse(res, 400, { error: 'No se encontró la información de la empresa del usuario.' });
    }

    next();
  };
};