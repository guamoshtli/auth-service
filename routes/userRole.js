const express = require('express');
const router = express.Router();
const { verifyToken } = require('../middlewares/authMiddleware');
const { addUserRole, getUserRoles } = require('../controllers/userRoleController');

// Rutas de UserRole
router.post('/', verifyToken, addUserRole);
router.get('/:userId', verifyToken, getUserRoles);

module.exports = router;
