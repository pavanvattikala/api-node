const express = require("express");

const apiRouter = express.Router();

const invitaionRouter = require("./invitaionRouter");

const userRouter = require("./userRouter");

const authRouter = require("./authRouter");

apiRouter.use('/invite',invitaionRouter)

apiRouter.use('/user',userRouter)

apiRouter.use('/auth',authRouter)


module.exports = apiRouter;