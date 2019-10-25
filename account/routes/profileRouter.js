const express = require("express");
const profileController = require("../controllers/profileController");

const profileRouter = express.Router();

profileRouter.get("/myProfile", profileController.myProfile);

module.exports = profileRouter;