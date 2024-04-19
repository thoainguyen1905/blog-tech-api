import express, { Router } from "express";
import {
  changeStatus,
  createDelivery,
  createReceive,
  getDelivery,
  getReceive,
} from "../controllers/transport/transport.controller";
const transportRouter: Router = express.Router();
import auth from "../middleware/auth";

transportRouter.post("/transport/receive", auth, createReceive);
transportRouter.post("/transport/delivery", auth, createDelivery);
transportRouter.post("/transport/status", auth, changeStatus);
transportRouter.get("/transport/receive", auth, getReceive);
transportRouter.get("/transport/delivery", auth, getDelivery);

export default transportRouter;
