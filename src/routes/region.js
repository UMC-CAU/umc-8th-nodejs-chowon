import express from 'express';
import { regionController } from "../controllers/region.controller.js";

const regionsRouter = express.Router();

// "/regions/{region_id}/shops" 경로에 대한 라우터 설정
regionsRouter.post("/:region_id/shops", regionController.createShopByRegionId);

export default regionsRouter;