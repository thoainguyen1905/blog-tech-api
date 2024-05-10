import { Request, Response } from "express";
import OrderModel from "../../models/order.model";
import { IStatusOrder, orderValidation } from "./order.types";
import { RequestApp } from "../../types/constants";
import "dotenv/config";
const stripe = require("stripe")(process.env.SECRET_KEY_STRIPE);

export const createOrder = async (req: RequestApp, res: Response) => {
  try {
    const order = orderValidation(req.body);
    if (order.error) {
      return res.status(400).json({
        message: order.error.details[0].message,
        status: 400,
      });
    } else {
      let status: IStatusOrder = "prepare";
      const data = new OrderModel({
        ...order.value,
        status: status,
        userInfo: req.user.id,
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

export const getOrderForUser = async (req: RequestApp, res: Response) => {
  const status = req.query.status;
  try {
    if (!status) {
      return res.status(404).json({
        message: "Vui lòng chọn trạng thái đơn hàng",
        status: 404,
      });
    }
    const listOrder = await OrderModel.find({
      userInfo: req.user.id,
      status: status,
    });
    return res.status(200).json({
      message: "success",
      status: 200,
      data: listOrder,
    });
  } catch (error) {
    return res.status(500).json(error);
  }
};

export const getOrderForAdmin = async (req: Request, res: Response) => {
  const page: any = req.query.page;
  const size: any = req.query.size;

  const total = await OrderModel.estimatedDocumentCount();
  try {
    const startIndex = (page - 1) * size;
    const orders = await OrderModel.find()
      .skip(startIndex)
      .limit(size)
      .populate("userInfo", "-password");
    return res.status(200).json({
      currentPage: page,
      total,
      totalPages: Math.ceil(total / size),
      data: orders,
    });
  } catch (error) {
    return res.status(500).json(error);
  }
};

export const changeStatusOrder = async (req: RequestApp, res: Response) => {
  try {
    const data = req.body;
    if (!data.id) {
      return res.status(404).json({
        message: "Không tìm thấy id nào",
        status: 404,
      });
    }
    const orderDetail = await OrderModel.findById(data.id);
    const updateOrder = await OrderModel.findByIdAndUpdate(
      data.id,
      {
        status: data.status,
      },
      { new: true }
    );

    return res.status(200).json({
      message: "success",
      status: 200,
      data: updateOrder,
    });
  } catch (error) {
    return res.status(500).json(error);
  }
};

export const chargeOrder = async (req: RequestApp, res: Response) => {
  try {
    const { amount, currency, source, description } = req.body;

    const paymentIntent = await stripe.paymentIntents.create({
      amount: 2500, // 25
      currency: "usd",
      description: "test customer",
    });

    res.json({ client_secret: paymentIntent.client_secret });
  } catch (error) {
    return res.status(500).json(error);
  }
};
