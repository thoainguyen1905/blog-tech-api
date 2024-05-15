import express, { Router } from "express";
import {
  changePassword,
  forgotPassword,
  getDetailsUser,
  getMe,
  signIn,
  signUp,
  updateUser,
} from "../controllers/users/user.controller";
import auth from "../middleware/auth";
require("dotenv").config({
  path:
    process.env.NODE_ENV === "production"
      ? ".env.production"
      : ".env.development",
});
import passport from "passport";
import passportOauth20 from "passport-google-oauth20";
const GoogleStrategy = passportOauth20.Strategy;
const userRouter: Router = express.Router();

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "/auth/google/callback",
    },
    (accessToken, refreshToken, profile, done) => {
      console.log(profile);
      return done(null, profile);
    }
  )
);

userRouter.post("/sign-in", signIn);
userRouter.post("/sign-up", signUp);
userRouter.put("/user", auth, updateUser);
userRouter.get("/user", getDetailsUser);
userRouter.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);
userRouter.get(
  "/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/login" }),
  (req, res) => {
    console.log("đăng nhập google thành công");
    res.redirect("/");
  }
);
userRouter.post("/forgot-password", forgotPassword);
userRouter.post("/change-password", auth, changePassword);
userRouter.get("/me", auth, getMe);

/**
 * @swagger
 * /me:
 *  get:
 *     tags:
 *     - User
 *     description: Returns API operational status
 *     responses:
 *       200:
 *         description: API is  running
 */
/**
 * @swagger
 * /sign-in:
 *  post:
 *     tags:
 *     - User
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *            type: object
 *            required:
 *              - email
 *              - password
 *            properties:
 *              email:
 *                type: string
 *                default: thoainv@volio.vn
 *              password:
 *                type: string
 *                default: thoai
 *     description: Returns API operational status
 *     responses:
 *      200:
 *        description: Modified
 *      400:
 *        description: Bad Request
 *      404:
 *        description: Not Found
 */

export default userRouter;
