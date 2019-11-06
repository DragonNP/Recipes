const express = require('express');
const recipesController = require('../controllers/recipesController');

const router = express.Router();

router.get('/', (req, res) => res.redirect('/newRecipes'));
router.get('/newRecipes', recipesController.newRecipes);
router.get('/myRecipes', recipesController.myRecipes);
router.get('/recipe', recipesController.recipe);

module.exports = router;