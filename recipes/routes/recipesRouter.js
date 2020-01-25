const express = require('express');
const recipesController = require('../controllers/recipesController');
const passportConfig = require('../../config/passport');

const router = express.Router();

router.get('/', (req, res) => res.redirect('/newRecipes'));
router.get('/newRecipes', recipesController.newRecipes);
router.get('/myRecipes', passportConfig.isAuthenticated, recipesController.myRecipes);
router.get('/recipe', recipesController.getRecipe);
router.get('/addRecipe', passportConfig.isAuthenticated, recipesController.getAddRecipe);
router.get('/favorites', passportConfig.isAuthenticated, recipesController.favorites);

router.post('/addRecipe', passportConfig.isAuthenticated, recipesController.postCreateRecipe);

module.exports = router;