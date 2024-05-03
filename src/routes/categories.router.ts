import express, { Router } from "express";
import {
  createCategories,
  deleteCate,
  getListCate,
} from "../controllers/categories/categories.controller";
const categoriesRouter: Router = express.Router();

categoriesRouter.post("/categories", createCategories);
categoriesRouter.get("/categories", getListCate);
categoriesRouter.delete("/categories", deleteCate);

export default categoriesRouter;
