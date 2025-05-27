import express from 'express';
import { regionController } from "../controllers/region.controller.js";

const regionsRouter = express.Router();

// "/regions/{regionId}/shops" 경로에 대한 라우터 설정
regionsRouter.post("/:regionId/shops", regionController.createShopByRegionId);

export default regionsRouter;