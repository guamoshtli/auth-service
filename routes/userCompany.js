const express = require('express');
const router = express.Router();
const { verifyToken } = require('../middlewares/authMiddleware');
const { addUserCompany, getUserCompanies } = require('../controllers/userCompanyController');

// Rutas de UserCompany
router.post('/', verifyToken, addUserCompany);
router.get('/:userId', verifyToken, getUserCompanies);

module.exports = router;
