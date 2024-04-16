import express, { Router } from "express";
import { getListMessages } from "../controllers/socket/socket-io";
import auth from "../middleware/auth";
const chatRouter: Router = express.Router();

chatRouter.get("/message", auth, getListMessages);

export default chatRouter;
