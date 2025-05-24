import express from 'express';
import { shopController } from "./controllers/shop.controller.js";

const shopsRouter = express.Router();

// "/shops/{shop_id}" 경로에 대한 라우터 설정
shopsRouter.post("/:shop_id/missions", shopController.createMissionByShopId);
shopsRouter.post("/:shop_id/reviews", shopController.createReviewByShopId);
shopsRouter.get("/:shop_id/reviews", shopController.getReviewsByShopId);

export default shopsRouter;