import express, { Router } from "express";
import {
  addProduct,
  deleteProduct,
  getListProduct,
  getNew,
  relateProduct,
  updateProduct,
} from "../controllers/products/product.controller";
const productRouter: Router = express.Router();

productRouter.post("/product", addProduct);
productRouter.put("/product", updateProduct);
productRouter.delete("/product", deleteProduct);
productRouter.get("/product", getListProduct);
productRouter.get("/product/relate", relateProduct);
productRouter.get("/product/new", getNew);

export default productRouter;
