const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { logout } = require('../controllers/authController');

router.post('/register', authController.register);
router.post('/login', authController.login);
router.post('/verify', authController.verify);
router.post('/refresh', authController.refresh);
router.post('/logout', logout);

module.exports = router;
