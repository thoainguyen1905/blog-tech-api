import { Request, Response } from "express";
import { cartValidation } from "./cart.types";
import CartModel from "../../models/cart.model";
import { RequestApp } from "../../types/constants";

export const addCart = async (req: RequestApp, res: Response) => {
  try {
    const validation = cartValidation(req.body);
    if (validation.error) {
      return res.status(400).json({
        message: validation.error.details[0].message,
        status: 400,
      });
    } else {
      const checkCart = await CartModel.findOne({
        productId: req.body.productId,
      });
      if (checkCart) {
        const duplicateCart = await CartModel.findOneAndUpdate(
          {
            productId: req.body.productId,
          },
          {
            quantity: checkCart.toObject().quantity + req.body.quantity,
            totalPrice:
              (checkCart.toObject().quantity + req.body.quantity) *
              req.body.price,
          },
          { new: true }
        );
        return res.status(200).json({
          message: "success",
          status: 200,
          data: duplicateCart,
        });
      }
      const data = new CartModel({
        ...req.body,
        userId: req.user.id,
        totalPrice: req.body.price * req.body.quantity,
      });
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

export const getlistCart = async (req: RequestApp, res: Response) => {
  const { page, size } = req.query;
  const user = req.user;
  const startIndex = (page - 1) * size;
  const total = await CartModel.find({
    userId: user.id,
  }).countDocuments();
  try {
    const carts = await CartModel.find(
      {
        userId: user.id,
      },
      { userId: 0 }
    )
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

export const deleteCart = async (req: RequestApp, res: Response) => {
  const id = req.query.id;
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
