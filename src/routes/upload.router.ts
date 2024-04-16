import express, { Router } from "express";
const uploadRouter: Router = express.Router();
import auth from "../middleware/auth";
import uploadCloud from "../configs/cloudinary.config";
import { uploadImg } from "../controllers/uploads/upload.controller";

uploadRouter.post("/upload", uploadCloud.single("file"), uploadImg);

export default uploadRouter;
