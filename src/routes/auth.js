import express from 'express';
import { signupController } from '../controllers/user.controller.js';

const authRouter = express.Router();
const signupRouter = express.Router();

// 회원가입 관련 라우터 설정
signupRouter.post("/", signupController.create);
signupRouter.patch("/info", signupController.updateInfo);
signupRouter.patch("/terms", signupController.updateTerms);
signupRouter.patch("/foods", signupController.updateFoods);
signupRouter.patch("/status", signupController.updateStatus);

// 회원가입 라우터를 인증 라우터에 연결
authRouter.use("/signup", signupRouter);

export default authRouter;