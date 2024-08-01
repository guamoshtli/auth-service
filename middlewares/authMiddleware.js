const jwt = require('jsonwebtoken');
const { isTokenBlacklisted } = require('../controllers/authController');
require('dotenv').config();

exports.verifyToken = (req, res, next) => {
  const token = req.header('Authorization');
  if (!token) return res.status(401).json({ error: 'Acceso denegado' });

  const tokenValue = token.replace('Bearer ', '');

  if (isTokenBlacklisted(tokenValue)) {
    return res.status(401).json({ error: 'Token invalidado' });
  }

  try {
    const verified = jwt.verify(tokenValue, process.env.JWT_SECRET);
    req.user = verified;
    next();
  } catch (error) {
    res.status(400).json({ error: 'Token no válido' });
  }
};
