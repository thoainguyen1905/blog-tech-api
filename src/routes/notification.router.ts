import express, { Router } from "express";
import { pushNotification } from "../controllers/notification/notification.controller";
const notificationRouter: Router = express.Router();

notificationRouter.post("/notification", pushNotification);

export default notificationRouter;
