// routes/operacionesRoutes.js
const express = require('express');
const router = express.Router();
const { verifyToken, authorize } = require('../middlewares/authMiddleware');
const operacionesController = require('../controllers/operacionesController');

// Rutas protegidas con autenticación
router.use(verifyToken);

// Ruta para obtener todas las operaciones (solo para administradores)
router.get('/operaciones', authorize(['USER', 'ADMIN']), operacionesController.getAllOperaciones);

// Ruta para obtener operaciones por empresa (para usuarios de empresa)
router.get('/operaciones/empresa', authorize(['USER', 'ADMIN']), operacionesController.getOperacionesByEmpresa);

// Ruta para obtener operaciones con filtros (para administradores y usuarios de empresa)
router.get('/operaciones/filtrado', authorize(['USER', 'ADMIN']), operacionesController.getOperacionesFiltradas);

// Ruta para obtener una operación por ID
router.get('/operaciones/:id', authorize(['USER', 'ADMIN']), operacionesController.getOperacionById);

// Ruta para obtener datos del dashboard
router.get('/capitalgenero', authorize(['USER', 'ADMIN']), operacionesController.getCapitalGenero);

module.exports = router;