import { Request, Response } from "express";
import { deliveryStaffValidation } from "./transport.types";
import { generateCodeTransport } from "../../helpers/react-utils";
import { ReceiveModal, DeliveryModal } from "../../models/transport.model";

export const createReceive = async (req: Request, res: Response) => {
  try {
    const user = req.user;
    const data = req.body;
    const validation = deliveryStaffValidation(data);
    if (validation.error) {
      return res.status(400).json({
        message: validation.error.details[0].message,
        status: 400,
      });
    } else {
      let code = generateCodeTransport();
      const newDelivery = new ReceiveModal({
        ...data,
        code,
        staffInfor: user.id,
      });
      await newDelivery.save();
      return res.status(200).json({
        message: "success",
        status: 200,
      });
    }
  } catch (error) {
    return res.status(500).json(error);
  }
};

export const createDelivery = async (req: Request, res: Response) => {
  try {
    const user = req.user;
    const data = req.body;
    const validation = deliveryStaffValidation(data);
    if (validation.error) {
      return res.status(400).json({
        message: validation.error.details[0].message,
        status: 400,
      });
    } else {
      let code = generateCodeTransport();
      const newDelivery = new DeliveryModal({
        ...data,
        code,
        staffInfor: user.id,
      });
      await newDelivery.save();
      return res.status(200).json({
        message: "success",
        status: 200,
      });
    }
  } catch (error) {
    return res.status(500).json(error);
  }
};

export const changeStatus = async (req: Request, res: Response) => {
  try {
    const { id, status, target } = req.body;
    if (target === "receive") {
      const transport = await ReceiveModal.findByIdAndUpdate(id, {
        status: status,
      });
      return res.status(200).json({
        message: "success",
        status: 200,
      });
    } else if (target === "delivery") {
      const transport = await DeliveryModal.findByIdAndUpdate(id, {
        status: status,
      });
      return res.status(200).json({
        message: "success",
        status: 200,
      });
    }
    return res.status(404).json({
      message: "cannot found target",
      status: 404,
    });
  } catch (error) {
    return res.status(500).json(error);
  }
};

export const getReceive = async (req: Request, res: Response) => {
  const { status } = req.query;
  try {
    const receives = await ReceiveModal.find({
      staffInfor: req.user.id,
      status: status ?? 0,
    });
    return res.status(200).json({
      message: "success",
      status: 200,
      data: receives,
    });
  } catch (error) {
    return res.status(500).json(error);
  }
};

export const getDelivery = async (req: Request, res: Response) => {
  const { status } = req.query;
  try {
    const deliveries = await DeliveryModal.find({
      staffInfor: req.user.id,
      status: status ?? 0,
    });
    return res.status(200).json({
      message: "success",
      status: 200,
      data: deliveries,
    });
  } catch (error) {
    return res.status(500).json(error);
  }
};
