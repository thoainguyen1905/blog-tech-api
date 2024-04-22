import { Request, Response } from "express";
import { cartValidation } from "./cart.types";
import CartModel from "../../models/cart.model";

export const addCart = async (req: Request, res: Response) => {
  try {
    const validation = cartValidation(req.body);
    if (validation.error) {
      return res.status(400).json({
        message: validation.error.details[0].message,
        status: 400,
      });
    } else {
      const data = new CartModel(req.body);
      await data.save();
      return res.status(200).json({
        message: "success",
        status: 200,
        data: data,
      });
    }
  } catch (error) {
    return res.status(500).json(error);
  }
};

export const getlistCart = async (req: Request, res: Response) => {
  const { page, size } = req.query;
  const user = req.user;
  const startIndex = (page - 1) * size;
  const total = await CartModel.findOne({
    userId: user.id,
  }).countDocuments();
  try {
    const carts = await CartModel.findOne({
      userId: user.id,
    })
      .skip(startIndex)
      .limit(size);
    return res.status(200).json({
      message: "success",
      status: 200,
      currentPage: page,
      total,
      totalPages: Math.ceil(total / size),
      data: carts,
    });
  } catch (error) {
    return res.status(500).json(error);
  }
};

export const deleteCart = async (req: Request, res: Response) => {
  const { id } = req.query.id;
  const user = req.user;
  try {
    if (!id) {
      return res.status(404).json({
        message: "not found cart",
        status: 404,
      });
    }
    const removeCart = await CartModel.findByIdAndDelete(id);
    return res.status(200).json({
      message: "success",
      status: 200,
    });
  } catch (error) {
    return res.status(500).json(error);
  }
};
