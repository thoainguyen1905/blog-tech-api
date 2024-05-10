import express, { Router } from "express";
const orderRouter: Router = express.Router();
import auth from "../middleware/auth";
import {
  changeStatusOrder,
  chargeOrder,
  createOrder,
  getOrderForAdmin,
  getOrderForUser,
} from "../controllers/orders/order.controller";

orderRouter.post("/order", auth, createOrder);
orderRouter.post("/order/change", changeStatusOrder);
orderRouter.get("/order", auth, getOrderForUser);
orderRouter.get("/order/admin", getOrderForAdmin);
orderRouter.post("/charge", chargeOrder);

export default orderRouter;
