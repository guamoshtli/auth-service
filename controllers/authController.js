const { User } = require('../models');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const tokenBlacklist = new Set();
require('dotenv').config();
const validateUser = require('../services/validationService');
const { z } = require('zod'); // Importar el servicio de validación
const  s  = require('../middlewares/sendResponse');


// Función de ayuda para crear un token
const createToken = (user) => {
  return jwt.sign({ id: user.id, username: user.username }, process.env.JWT_SECRET, { expiresIn: '1h' });
};


// Middleware para manejar errores
const handleError = (error, res) => {
  if (error instanceof z.ZodError) {
    return s.sendResponse(res, 400, { error: error.errors });
  }
  console.error(error);
  return s.sendResponse(res, 500, { error: 'Error en el servidor' });
};

// Función para registrar un nuevo usuario
exports.register = async (req, res) => {
  try {
    const validatedData = validateUser(req.body);
    const hashedPassword = await bcrypt.hash(validatedData.password, 10);
    const newUser = await User.create({
      ...validatedData,
      password: hashedPassword,
    });
    s.sendResponse(res, 201, newUser);
  } catch (error) {
    handleError(error, res);
  }
};

// Función para iniciar sesión de un usuario
exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return s.sendResponse(res, 400, { error: 'Usuario no encontrado' });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return s.sendResponse(res, 400, { error: 'Contraseña incorrecta' });
    }
    const token = createToken(user);
    s.sendResponse(res, 200, { token });
  } catch (error) {
    handleError(error, res);
  }
};

// Función para verificar un token de autenticación
exports.verify = (req, res) => {
  const { token } = req.body;
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    s.sendResponse(res, 200, decoded);
  } catch (error) {
    s.sendResponse(res, 401, { error: 'Token no válido' });
  }
};

// Función para refrescar un token de autenticación
exports.refresh = (req, res) => {
  const { token } = req.body;
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET, { ignoreExpiration: true });
    const newToken = createToken(decoded);
    s.sendResponse(res, 200, { token: newToken });
  } catch (error) {
    s.sendResponse(res, 401, { error: 'Token no válido' });
  }
};

// Función para cerrar sesión de un usuario
exports.logout = (req, res) => {
  const token = req.header('Authorization').replace('Bearer ', '');
  tokenBlacklist.add(token);
  s.sendResponse(res, 200, { message: 'Logout successful' });
};

// Función para verificar si un token está en la lista negra
exports.isTokenBlacklisted = (token) => {
  return tokenBlacklist.has(token);
};
