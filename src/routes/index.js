import express from 'express';
import authRouter from './auth.js';
import regionsRouter from './region.js';
import shopsRouter from './shop.js';
import userRouter from './user.js';

const router = express.Router();

router.use("/auth", authRouter);
router.use("/regions", regionsRouter);
router.use("/shops", shopsRouter);
router.use("/users", userRouter);

export default router;