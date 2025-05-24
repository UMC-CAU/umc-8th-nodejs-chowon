import express from "express";
import { userController } from "./controllers/user.controller.js";

const userRouter = express.Router();

userRouter.post("/:user_id/missions", userController.addMissionToUser);

export default userRouter;