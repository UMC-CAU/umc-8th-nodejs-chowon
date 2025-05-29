import { PrismaSessionStore } from "@quixo3/prisma-session-store";
import cors from "cors";
import dotenv from "dotenv";
import express, { Application, Request, Response } from "express";
import session from "express-session";
import passport from "passport";

import { githubStrategy, googleStrategy } from "./config/auth.config.js";
import { setupSwagger } from "./config/swagger.config.js";
import { prisma } from "./db.config.js";
import { errorHandler, responseHandler } from "./utils/response.util.js";

import routes from "./routes/index.js";
import oauthRoutes from "./routes/oauth.js";

// 환경 변수 로드
dotenv.config();

// Passport 사용자 타입 확장
declare global {
  namespace Express {
    interface User {
      id: number;
      email: string;
      name?: string;
    }
  }
}

// Passport 설정
passport.use(googleStrategy);
passport.use(githubStrategy);

passport.serializeUser((user: Express.User, done) => {
  done(null, user);
});

passport.deserializeUser((user: Express.User, done) => {
  done(null, user);
});

// Express 앱 생성 및 설정
const app: Application = express();
const port: number = parseInt(process.env.PORT || "3000", 10);

// 기본 미들웨어 설정
app.use(cors());
app.use(express.static("public")); // 정적 파일을 제공하는 미들웨어 설정
app.use(express.json()); // JSON 형식의 요청 본문을 파싱하는 미들웨어 설정
app.use(express.urlencoded({ extended: true })); // URL 인코딩 형식의 요청 본문을 파싱하는 미들웨어 설정
app.use(responseHandler); // 응답 핸들러 미들웨어 설정

// 세션 설정
app.use(
  session({
    cookie: {
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7일, ms
    },
    resave: false,
    saveUninitialized: false,
    secret: process.env.EXPRESS_SESSION_SECRET!,
    store: new PrismaSessionStore(prisma, {
      checkPeriod: 2 * 60 * 1000, // ms
      dbRecordIdFunction: undefined,
      dbRecordIdIsSessionId: true,
    }),
  })
);

// Passport 초기화
app.use(passport.initialize());
app.use(passport.session());

// Swagger 설정 적용
setupSwagger(app);

// 루트 경로 핸들러
app.get("/", (req: Request, res: Response) => {
  console.log(req.user);
  res.send("루트 경로에 오신 것을 환영합니다!");
});

// 라우터 설정
app.use("/oauth2", oauthRoutes);
app.use("/api/v1", routes);

// 에러 핸들러 (마지막에 설정)
app.use(errorHandler);

// 서버 시작
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
