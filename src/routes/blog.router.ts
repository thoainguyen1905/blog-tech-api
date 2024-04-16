import express, { Router } from "express";
const blogRouter: Router = express.Router();
import {
  getListBlog,
  addBlog,
  deleteBlog,
} from "../controllers/blogs/blog.controller";

// blogRouter.get("/blog?id=:id", getDetailBlog);
blogRouter.get("/blog", getListBlog);
blogRouter.post("/blog", addBlog);
blogRouter.delete("/blog", deleteBlog);

export default blogRouter;
