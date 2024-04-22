import express, { Router } from "express";
import {
  createBanner,
  deleteBanner,
  getBanners,
} from "../controllers/banners/banner.controller";
const bannerRouter: Router = express.Router();

bannerRouter.post("/banner", createBanner);
bannerRouter.get("/banner", getBanners);
bannerRouter.delete("/banner", deleteBanner);

export default bannerRouter;
