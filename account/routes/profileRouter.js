const express = require("express");
const profileController = require("../controllers/profileController");

const profileRouter = express.Router();

// Route get /myProfile
profileRouter.get("/myProfile", profileController.myProfile);

module.exports = profileRouter;