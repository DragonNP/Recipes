const express = require('express');
const authorizationController = require('../controllers/authorizationController');
const usersController = require('../controllers/usersController');

const router = express.Router();

router.use(authorizationController.auth);

router.get('/registration', usersController.getRegistration);
router.post('/registration', usersController.postRegistration);
router.get('/login', usersController.getLogin);
router.post('/login', usersController.postLogin);

module.exports = router;