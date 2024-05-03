import { Request, Response } from "express";
import CategoriesModel from "../../models/categories.model";
import { categoriesValidation } from "./categories.types";

export const createCategories = async (req: Request, res: Response) => {
  try {
    const data = req.body;
    const validation = categoriesValidation(data);
    if (validation.error) {
      return res.status(400).json({
        message: validation.error.details[0].message,
        status: 400,
      });
    } else {
      const newCate = new CategoriesModel(data);
      await newCate.save();
      return res.status(200).json({
        message: "success",
        status: 200,
        data: newCate,
      });
    }
  } catch (error) {
    return res.status(500).json(error);
  }
};

export const getListCate = async (req: Request, res: Response) => {
  try {
    const listCategories = await CategoriesModel.find();
    return res.status(200).json({
      message: "success",
      status: 200,
      data: listCategories,
    });
  } catch (error) {
    return res.status(500).json(error);
  }
};

export const deleteCate = async (req: Request, res: Response) => {
  const id = req.query.id;
  try {
    if (!id) {
      return res.status(404).json({
        message: "Vui lòng thêm id vào",
        status: 404,
      });
    }
  } catch (error) {
    return res.status(500).json(error);
  }
};
