import express from "express";
import dotenv, { populate } from "dotenv";
import cors from "cors";
import {
    signupController,
    userController,
} from "./controllers/user.controller.js";
import { regionController } from "./controllers/region.controller.js";
import { shopController } from "./controllers/shop.controller.js";

import { responseHandler, errorHandler } from "./utils/response.util.js";
import { setupSwagger } from "./config/swagger.config.js";
import session from "express-session";
import passport from "passport";
import { PrismaSessionStore } from "@quixo3/prisma-session-store";
import { prisma } from "./db.config.js";
import { googleStrategy } from "./config/auth.config.js";

dotenv.config();

passport.use(googleStrategy);
passport.serializeUser((user, done) => done(null, user))
passport.deserializeUser((user, done) => done(null, user))

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

app.use(
    session({
        cookie: {
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7일, ms
        },
        resave: false,
        saveUninitialized: false,
        secret: process.env.EXPRESS_SESSION_SECRET,
        store: new PrismaSessionStore(prisma, {
            checkPeriod: 2 * 60 * 1000, // ms
            dbRecordIdFunction: undefined,
            dbRecordIdIsSessionId: true,
        }),
    })
);
app.use(passport.session());

// Swagger 설정 적용
setupSwagger(app);

app.use(passport.initialize());
app.use(passport.session());

app.get("/", (req, res) => {
    console.log(req.user);
    res.send("Hello World!");
});

app.get("/oauth2/login/google", passport.authenticate("google"))
app.get(
    "/oauth2/callback/google",
    passport.authenticate("google", {
        failureRedirect: "/oauth2/login/google",
        failureMessage: true,
    }),
    (req, res) => res.redirect("/"),
)

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
