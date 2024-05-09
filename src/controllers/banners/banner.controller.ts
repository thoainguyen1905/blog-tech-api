import { Request, Response } from "express";
import BannerModel from "../../models/banner.model";
import { bannerValidation } from "./banner.types";
import { RequestApp } from "../../types/constants";

export const createBanner = async (req: Request, res: Response) => {
  const data = req.body;
  try {
    const validation = bannerValidation(data);
    if (validation.error) {
      return res.status(400).json({
        message: validation.error.details[0].message,
        status: 400,
      });
    } else {
      const newBanner = new BannerModel(data);
      await newBanner.save();
      return res.status(200).json({
        message: "success",
        status: 200,
        data: newBanner,
      });
    }
  } catch (error) {
    return res.status(500).json(error);
  }
};

export const getBanners = async (req: RequestApp, res: Response) => {
  const { size, page } = req.query;
  const startIndex = (page - 1) * size;
  const total = await BannerModel.estimatedDocumentCount();
  try {
    const banners = await BannerModel.find().skip(startIndex).limit(size);
    return res.status(200).json({
      message: "success",
      status: 200,
      currentPage: page,
      total,
      totalPages: Math.ceil(total / size),
      data: banners,
    });
  } catch (error) {
    return res.status(500).json(error);
  }
};

export const deleteBanner = async (req: Request, res: Response) => {
  const id = req.query.id;
  if (!id) {
    return res.status(404).json({
      message: "Không tìm thấy id",
      status: false,
    });
  }
  try {
    const deleteBanner = await BannerModel.findByIdAndDelete(id);
    if (!deleteBanner) {
      return res.status(404).json({
        message: "Không tìm thấy id",
        status: false,
      });
    }
    return res.status(200).json({
      message: "success",
      status: 200,
    });
  } catch (error) {
    return res.status(500).json(error);
  }
};
