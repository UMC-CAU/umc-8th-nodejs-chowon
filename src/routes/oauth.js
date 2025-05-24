import express from 'express';
import passport from 'passport';

const router = express.Router();

// Google OAuth 로그인 라우트
router.get("/login/google", passport.authenticate("google"));

// Google OAuth 콜백 라우트
router.get(
    "/callback/google",
    passport.authenticate("google", {
        failureRedirect: "/oauth2/login/google",
        failureMessage: true,
    }),
    (req, res) => res.redirect("/")
);

export default router;