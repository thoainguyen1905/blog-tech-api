import express, { Router } from "express";
const routes: Router = express.Router();
import blogRouter from "./blog.router";
import aboutRouter from "./about.router";
import userRouter from "./user.router";
import commentRouter from "./comment.router";
import reactRouter from "./react.router";
import uploadRouter from "./upload.router";
import crawlerRouter from "./crawler.router";
import productRouter from "./product.router";
import transportRouter from "./transport.router";
import shippingRouter from "./shipping.router";
import staffRouter from "./staff.router";
import bannerRouter from "./banner.router";
import orderRouter from "./order.router";
import cartRouter from "./cart.router";
import addressRouter from "./address.router";

const api = routes
  .use(blogRouter)
  .use(aboutRouter)
  .use(bannerRouter)
  .use(userRouter)
  .use(commentRouter)
  .use(reactRouter)
  .use(uploadRouter)
  .use(cartRouter)
  .use(crawlerRouter)
  .use(productRouter)
  .use(transportRouter)
  .use(shippingRouter)
  .use(orderRouter)
  .use(addressRouter)
  .use(staffRouter);

export default routes.use("/api", api);
