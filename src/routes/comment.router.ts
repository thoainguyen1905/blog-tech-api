import express, { Router } from "express";
const commentRouter: Router = express.Router();
import {
  addComment,
  getListComment,
  deleteComment,
} from "../controllers/comments/comment.controller";
import auth from "../middleware/auth";

commentRouter.get("/comment", auth, getListComment);
commentRouter.post("/comment", auth, addComment);
commentRouter.delete("/comment", auth, deleteComment);

export default commentRouter;
