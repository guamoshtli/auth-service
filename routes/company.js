const express = require('express');
const router = express.Router();
const { verifyToken } = require('../middlewares/authMiddleware');
const { getAllCompanies, getCompanyById, createCompany, updateCompany, deleteCompany } = require('../controllers/companyController');

// Rutas de empresa
router.get('/', verifyToken, getAllCompanies);
router.get('/:id', verifyToken, getCompanyById);
router.post('/', verifyToken, createCompany);
router.put('/:id', verifyToken, updateCompany);
router.delete('/:id', verifyToken, deleteCompany);

module.exports = router;

