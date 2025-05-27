import express from "express";
import { userController } from "../controllers/user.controller.js";

const userRouter = express.Router();

userRouter.post("/:userId/missions", userController.addMissionToUser);

export default userRouter;