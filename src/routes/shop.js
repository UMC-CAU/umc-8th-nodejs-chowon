import express from 'express';
import { shopController } from "../controllers/shop.controller.js";

const shopsRouter = express.Router();

// "/shops/{shopId}" 경로에 대한 라우터 설정
shopsRouter.post("/:shopId/missions", shopController.createMissionByShopId);
shopsRouter.post("/:shopId/reviews", shopController.createReviewByShopId);
shopsRouter.get("/:shopId/reviews", shopController.getReviewsByShopId);

export default shopsRouter;