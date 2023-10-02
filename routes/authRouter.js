const express = require("express");
const usernRouter = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const authController = require("../controllers/authController");

const validator = require("../validations/validate");


usernRouter.post('/signup',validator.createSignUpValidation,authController.signup);

usernRouter.post('/login',validator.createLoginValidation,authController.login);

usernRouter.post('/logout',authMiddleware,authController.logout);



module.exports = usernRouter;

