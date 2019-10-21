const express = require("express");
const userController = require("../controllers/userController");

const userRouter = express.Router();
userRouter.get("/logout", userController.logout);
userRouter.get("/register", userController.addUser);
userRouter.get("/login", userController.loginUser);
userRouter.post("/register", userController.postAddUser);
userRouter.post("/login", userController.postLoginUser);

module.exports = userRouter;