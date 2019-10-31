const express = require('express');
const recipesController = require('../controllers/recipesController');

const router = express.Router();

router.get('/', (req, res) => res.redirect('/newRecipes'));
router.get('/newRecipes', recipesController.newRecipes);

module.exports = router;