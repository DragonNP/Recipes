const express = require('express');
const recipesController = require('../controllers/recipesController');

const router = express.Router();

router.get('/newRecipes', recipesController.newRecipes);
router.get('/myRecipes', recipesController.myRecipes);
router.get('/recipe', recipesController.getRecipe);
router.get('/addRecipe', recipesController.getAddRecipe);
router.get('/favorites', recipesController.favorites);

router.post('/addRecipe', recipesController.postCreateRecipe);

router.get('/', (req, res) => res.redirect('/newRecipes'));

module.exports = router;