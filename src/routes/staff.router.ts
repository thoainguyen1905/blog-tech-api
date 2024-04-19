import express, { Router } from "express";
import { getMe, signIn, signUp } from "../controllers/staffs/staff.controller";
import auth from "../middleware/auth";
const staffRouter: Router = express.Router();

staffRouter.post("/staff/sign-in", signIn);
staffRouter.post("/staff/sign-up", signUp);
staffRouter.get("/staff/me", auth, getMe);

export default staffRouter;
