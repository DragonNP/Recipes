const express = require('express');
const usersController = require('../controllers/usersController');
const passportConfig = require('../../config/passport');

const router = express.Router();

// GET
router.get('/registration', usersController.getRegistration);
router.get('/login', usersController.getLogin);
router.get('/myProfile', passportConfig.isAuthenticated, usersController.getMyProfile);
router.get('/logout', usersController.logout);
router.get('/setLanguage', usersController.setLanguage);

// POST
router.post('/registration', usersController.postRegistration);
router.post('/login', usersController.postLogin);
router.post('/updateProfile', usersController.postUpdateProfile);

module.exports = router;