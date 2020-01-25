const express = require('express');
const usersController = require('../controllers/usersController');
const passportConfig = require('../../config/passport');

const router = express.Router();

router.get('/registration', usersController.getRegistration);
router.get('/login', usersController.getLogin);
router.get('/myProfile', passportConfig.isAuthenticated, usersController.getMyProfile);
router.get('/logout', usersController.logout);
router.get('/setLanguage', usersController.setLanguage);

router.post('/registration', usersController.postRegistration);
router.post('/login', usersController.postLogin);

module.exports = router;