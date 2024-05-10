import express, { Router } from "express";
import { chargePayment } from "../controllers/payment/payment.controller";
const paymentRouter: Router = express.Router();

paymentRouter.post("/payment", chargePayment);

export default paymentRouter;
