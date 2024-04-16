import express, { Router } from "express";
const reactRouter: Router = express.Router();

import auth from "../middleware/auth";
import {
  addReact,
  deleteReact,
  getReactBlog,
} from "../controllers/react/react.controller";

reactRouter.post("/react", auth, addReact);
reactRouter.delete("/react", auth, deleteReact);
reactRouter.get("/react", getReactBlog);

export default reactRouter;
