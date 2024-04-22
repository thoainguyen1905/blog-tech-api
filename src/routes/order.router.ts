import express, { Router } from "express";
const orderRouter: Router = express.Router();
import auth from "../middleware/auth";

export default orderRouter;
