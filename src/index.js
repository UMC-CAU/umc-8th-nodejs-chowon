import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import { responseHandler, errorHandler } from "./utils/response.util.js";
import { setupSwagger } from "./config/swagger.config.js";
import session from "express-session";
import passport from "passport";
import { PrismaSessionStore } from "@quixo3/prisma-session-store";
import { prisma } from "./db.config.js";
import { googleStrategy } from "./config/auth.config.js";

import routes from "./routes/index.js";
import oauthRoutes from "./routes/oauth.js";

dotenv.config();

// Passport 설정
passport.use(googleStrategy);
passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((user, done) => done(null, user));

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.static("public")); // 정적 파일을 제공하는 미들웨어 설정
app.use(express.json()); // JSON 형식의 요청 본문을 파싱하는 미들웨어 설정
app.use(express.urlencoded({ extended: true })); // URL 인코딩 형식의 요청 본문을 파싱하는 미들웨어 설정
app.use(responseHandler); // 응답 핸들러 미들웨어 설정

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

app.use("/oauth2", oauthRoutes);
app.use("/api/v1", routes);

app.use(errorHandler);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
