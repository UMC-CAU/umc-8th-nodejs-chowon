import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { signupController, userController } from "./controllers/user.controller.js";
import { regionController } from "./controllers/region.controller.js";
import { shopController } from "./controllers/shop.controller.js";

import { responseHandler, errorHandler } from "./utils/response.util.js";

dotenv.config();
const app = express();
const port = process.env.PORT || 3000;

// 라우터
const router = express.Router();
const authRouter = express.Router();
const signupRouter = express.Router();
const regionsRouter = express.Router();
const shopsRouter = express.Router();

app.use(cors());
app.use(express.static("public")); // 정적 파일을 제공하는 미들웨어 설정
app.use(express.json()); // JSON 형식의 요청 본문을 파싱하는 미들웨어 설정
app.use(express.urlencoded({ extended: true })); // URL 인코딩 형식의 요청 본문을 파싱하는 미들웨어 설정
app.use(responseHandler);

app.get("/", (req, res) => {
    res.send("Hello World!");
});

router.post("/users/:user_id/missions", userController.addMissionToUser);

// "/auth/signup" 경로에 대한 라우터 설정
signupRouter.post("/", signupController.create);
signupRouter.patch("/info", signupController.updateInfo);
signupRouter.patch("/terms", signupController.updateTerms);
signupRouter.patch("/foods", signupController.updateFoods);
signupRouter.patch("/status", signupController.updateStatus);

// "/regions/{region_id}/shops" 경로에 대한 라우터 설정
regionsRouter.post("/:region_id/shops", regionController.createShopByRegionId);

// "/shops/{shop_id}" 경로에 대한 라우터 설정
shopsRouter.post("/:shop_id/missions", shopController.createMissionByShopId);
shopsRouter.post("/:shop_id/reviews", shopController.createReviewByShopId);
shopsRouter.get("/:shop_id/reviews", shopController.getReviewsByShopId);

authRouter.use("/signup", signupRouter);
router.use("/auth", authRouter);
router.use("/regions", regionsRouter);
router.use("/shops", shopsRouter);
app.use("/api/v1", router);

app.use(errorHandler);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
