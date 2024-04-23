import express, { Router } from "express";
import {
  getDistrict,
  getProvinces,
  getTowers,
} from "../controllers/address/address.controller";
const addressRouter: Router = express.Router();

addressRouter.get("/address/district", getDistrict);
addressRouter.get("/address/provinces", getProvinces);
addressRouter.get("/address/towers", getTowers);

export default addressRouter;
