import express from 'express';
import { authController } from '../controllers/auth.controller.js';

const authRouter = express.Router();
const signupRouter = express.Router();

// 회원가입 관련 라우터 설정
signupRouter.post("/", authController.signup.create);
signupRouter.patch("/info", authController.signup.updateInfo);
signupRouter.patch("/terms", authController.signup.updateTerms);
signupRouter.patch("/foods", authController.signup.updateFoods);
signupRouter.patch("/status", authController.signup.updateStatus);

// 회원가입 라우터를 인증 라우터에 연결
authRouter.use("/signup", signupRouter);

export default authRouter;