const express = require("express");
const invitationRouter = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const invitationController = require("../controllers/invitationController");
const validateMiddleware = require("../validations/validate");



invitationRouter.post('/create',
  [validateMiddleware.createInvitationValidation,authMiddleware],
  invitationController.create
);




module.exports = invitationRouter;

