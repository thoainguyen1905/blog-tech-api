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
const userRouter: Router = express.Router();

userRouter.post("/sign-in", signIn);
userRouter.post("/sign-up", signUp);
userRouter.put("/user", auth, updateUser);
userRouter.get("/user", getDetailsUser);
userRouter.post("/forgot-password", forgotPassword);
userRouter.post("/change-password", auth, changePassword);
userRouter.get("/me", auth, getMe);

export default userRouter;
