const express = require("express");
const usernRouter = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const userController = require("../controllers/userController");

const validator = require("../validations/validate");


usernRouter.post('/edit',[validator.createUserEditValidation,authMiddleware],userController.edit);


module.exports = usernRouter;

