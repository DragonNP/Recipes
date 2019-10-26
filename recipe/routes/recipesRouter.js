const express = require("express");
const recipesController = require("../controllers/recipesController");

const recipesRouter = express.Router();

// Route get /newRecipes
recipesRouter.get("/newRecipes", recipesController.newRecipes);

// Route get /myRecipes
recipesRouter.get("/myRecipes", recipesController.myRecipes);

// Route get /recipe
recipesRouter.get("/recipe", recipesController.recipe);

// Route get /addRecipe
recipesRouter.get("/addRecipe", recipesController.addRecipe);
// Route post /addRecipe
recipesRouter.post("/addRecipe", recipesController.postAddRecipe);

// Route get /editRecipe
recipesRouter.get("/editRecipe", recipesController.editRecipe);
// Route post /editRecipe
recipesRouter.post("/editRecipe", recipesController.postEditRecipe);
// Route get /deleteRecipe
recipesRouter.post("/deleteRecipe", recipesController.deleteRecipe);

module.exports = recipesRouter;