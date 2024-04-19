import express, { Router } from "express";
import {
  createShipping,
  deleteShipping,
  getShippings,
} from "../controllers/shipping/shipping.controller";
const shippingRouter: Router = express.Router();

shippingRouter.post("/shipping", createShipping);
shippingRouter.get("/shipping", getShippings);
shippingRouter.delete("/shipping", deleteShipping);

export default shippingRouter;
