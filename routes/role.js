const express = require('express');
const router = express.Router();
const roleController = require('../controllers/roleController');
const authMiddleware = require('../middlewares/authMiddleware');

router.get('/', authMiddleware.verifyToken, roleController.getAllRoles);
router.get('/:id', authMiddleware.verifyToken, roleController.getRoleById);
router.post('/', authMiddleware.verifyToken, roleController.createRole);
router.put('/:id', authMiddleware.verifyToken, roleController.updateRole);
router.delete('/:id', authMiddleware.verifyToken, roleController.deleteRole);

module.exports = router;
