const express = require("express");
const profileController = require("../controllers/recipesController");

const recipesRouter = express.Router();

recipesRouter.get("/newRecipes", profileController.newRecipes);
recipesRouter.get("/myRecipes", profileController.myRecipes);

module.exports = recipesRouter;