import { Request, Response } from "express";
import { RequestApp } from "../../types/constants";

export const uploadImg = async (req: RequestApp, res: Response) => {
  try {
    const file = req.file;
    if (!file) {
      return res.status(500).json({
        message: "No file upload",
        status: 500,
      });
    }
    return res.status(200).json({
      message: "success",
      status: 200,
      data: {
        urlPath: req.file.path,
      },
    });
  } catch (error) {
    return res.status(500).json(error);
  }
};
