import express, { Router } from "express";
import {
  addCart,
  deleteCart,
  getlistCart,
} from "../controllers/carts/cart.controller";
import auth from "../middleware/auth";
const cartRouter: Router = express.Router();

cartRouter.post("/cart", auth, addCart);
cartRouter.get("/cart", auth, getlistCart);
cartRouter.delete("/cart", auth, deleteCart);

export default cartRouter;
