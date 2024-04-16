import express, { Router } from "express";
import {
  crawlerBlog,
  crawlerDetailBlog,
} from "../controllers/crawler-data/crawler.controller";
const crawlerRouter: Router = express.Router();

crawlerRouter.post("/crawler-blog", crawlerBlog);
crawlerRouter.post("/crawler-detail", crawlerDetailBlog);

export default crawlerRouter;
