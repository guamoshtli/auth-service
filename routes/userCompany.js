//userCompany.js
const express = require('express');
const router = express.Router();
const { verifyToken } = require('../middlewares/authMiddleware');
const { addUserCompany, getUserCompanies, getAllUserCompanies, deleteUserCompanies } = require('../controllers/userCompanyController');

// Rutas de UserCompany
router.post('/', verifyToken, addUserCompany);
router.get('/', verifyToken, getAllUserCompanies);
router.get('/:userId', verifyToken, getUserCompanies);
router.delete('/:userId', verifyToken, deleteUserCompanies);

module.exports = router;
