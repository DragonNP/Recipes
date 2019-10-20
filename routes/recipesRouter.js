const express = require("express");
const recipesController = require("../controllers/recipesController");

const recipesRouter = express.Router();

recipesRouter.get("/newRecipes", recipesController.newRecipes);
recipesRouter.get("/myRecipes", recipesController.myRecipes);

module.exports = recipesRouter;