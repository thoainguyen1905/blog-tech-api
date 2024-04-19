import express, { Router } from "express";
import { signIn, signUp } from "../controllers/staffs/staff.controller";
const staffRouter: Router = express.Router();

staffRouter.post("/staff/sign-in", signIn);
staffRouter.post("/staff/sign-up", signUp);

export default staffRouter;
