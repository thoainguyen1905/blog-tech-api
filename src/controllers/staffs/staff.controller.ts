import { Request, Response } from "express";
import "dotenv/config";
import StaffModel from "../../models/staff.model";
import * as bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const signIn = async (req: Request, res: Response) => {
  try {
    const data = req.body;
    const staff = await StaffModel.findOne({
      phone: data.phone,
    });
    bcrypt.compare(data.password, staff.password, function (err, result) {
      if (result) {
        const token = jwt.sign(
          {
            name: staff.name,
            phone: staff.phone,
            code: staff.code,
            avatar: staff.avatar,
            post: staff.post,
            createTime: staff.createTime,
            id: staff.id,
          },
          process.env.SECRET_KEY
        );
        return res.status(200).json({
          token,
          message: "success",
          status: 200,
        });
      } else {
        return res.status(401).json({
          message: "mật khẩu không đúng",
          status: 401,
        });
      }
    });
  } catch (error) {
    return res.status(500).json(error);
  }
};

export const signUp = async (req: Request, res: Response) => {
  try {
    const data = req.body;
    const user = await StaffModel.findOne({ phone: data.phone });
    if (user) {
      return res.status(200).json({
        message: "Tài khoản đã tồn tại",
      });
    } else {
      bcrypt.hash(data.password, 10, async (err, hash) => {
        if (err) {
          console.error("Error occurred while hashing password:", err);
          return;
        }
        const newUser = new StaffModel({
          phone: data.phone,
          password: hash,
          name: data.name,
          code: data.code,
          post: data.post,
          avatar:
            "https://vcdn-kinhdoanh.vnecdn.net/2023/08/31/image2-2439-1693476735.jpg",
        });
        await newUser.save();
        return res.status(200).json({
          message: "success",
          status: 200,
        });
      });
    }
  } catch (error) {
    return res.status(500).json(error);
  }
};

export const getMe = async (req: Request, res: Response) => {
  try {
    const user = req.user;
    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json(error);
  }
};
