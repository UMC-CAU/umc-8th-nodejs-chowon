import express from 'express';
import authRouter from './auth.js';

const router = express.Router();

authRouter.use("/signup", signupRouter);
router.use("/auth", authRouter);
router.use("/regions", regionsRouter);
router.use("/shops", shopsRouter);
router.use("/users", userRouter);

export default router;