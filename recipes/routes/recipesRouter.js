const express = require('express');
const recipesController = require('../controllers/recipesController');
const passportConfig = require('../../config/passport');

const router = express.Router();

// GET
router.get('/', (req, res) => res.redirect('/newRecipes'));
router.get('/newRecipes', recipesController.newRecipes);
router.get('/myRecipes', passportConfig.isAuthenticated, recipesController.myRecipes);
router.get('/recipe', recipesController.getRecipe);
router.get('/addRecipe', passportConfig.isAuthenticated, recipesController.getAddRecipe);
router.get('/favorites', passportConfig.isAuthenticated, recipesController.favorites);

// POST
router.post('/addRecipe', passportConfig.isAuthenticated, recipesController.postCreateRecipe);
router.post('/addFavorites', passportConfig.isAuthenticated, recipesController.postAddFavorites);

module.exports = router;