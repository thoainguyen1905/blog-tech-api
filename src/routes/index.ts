import express, { Router } from "express";
const routes: Router = express.Router();
import blogRouter from "./blog.router";
import aboutRouter from "./about.router";
import userRouter from "./user.router";
import commentRouter from "./comment.router";
import reactRouter from "./react.router";
import uploadRouter from "./upload.router";
import crawlerRouter from "./crawler.router";

const api = routes
  .use(blogRouter)
  .use(aboutRouter)
  .use(userRouter)
  .use(commentRouter)
  .use(reactRouter)
  .use(uploadRouter)
  .use(crawlerRouter);

export default routes.use("/api", api);
