const express = require('express');
const router = express.Router();
const { verifyToken } = require('../middlewares/authMiddleware');
const { addUserRole, getUserRoles, getAllUserRoles, deleteUserRoles } = require('../controllers/userRoleController');

// Rutas de UserRole
router.get('/', verifyToken, getAllUserRoles);
router.post('/', verifyToken, addUserRole);
router.get('/:userId', verifyToken, getUserRoles);
router.delete('/:userId', verifyToken, deleteUserRoles);

module.exports = router;
