import { Request, Response } from "express";
import ShippingModel from "../../models/shipping.model";

export const getShippings = async (req: Request, res: Response) => {
  try {
    const shippings = await ShippingModel.find();
    return res.status(200).json({
      message: "success",
      status: 200,
      data: shippings,
    });
  } catch (error) {
    return res.status(500).json(error);
  }
};

export const createShipping = async (req: Request, res: Response) => {
  try {
    const { name, address, code } = req.body;
    const newShipping = new ShippingModel({
      name,
      address,
      code,
    });
    await newShipping.save();
    return res.status(200).json({
      message: "success",
      status: 200,
      data: newShipping,
    });
  } catch (error) {
    return res.status(500).json(error);
  }
};

export const deleteShipping = async (req: Request, res: Response) => {};
