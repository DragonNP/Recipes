const express = require("express");
const userController = require("../controllers/userController");

const userRouter = express.Router();

// Route get /register
userRouter.get("/register", userController.addUser);
// Route post /register
userRouter.post("/register", userController.postAddUser);

// Route get /login
userRouter.get("/login", userController.loginUser);
// Route post /login
userRouter.post("/login", userController.postLoginUser);

// Route get /logout
userRouter.get("/logout", userController.logout);

// other route
userRouter.use(userController.auth);

module.exports = userRouter;