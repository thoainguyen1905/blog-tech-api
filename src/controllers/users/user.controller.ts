import { Request, Response } from "express";
import {
  IAuthUser,
  ISignUp,
  userSignInSchema,
  passwordSchema,
} from "./user.types";
import Joi from "joi";
import nodemailer from "nodemailer";
import * as bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import "dotenv/config";
import UserModel from "../../models/user.model";
import { RequestApp } from "../../types/constants";

export const signIn = async (req: Request, res: Response) => {
  try {
    const data: ISignUp = req.body;
    const result = userSignInSchema(data);
    const user: IAuthUser = await UserModel.findOne({
      email: data.email,
    });
    if (result.error) {
      return res.status(400).json({
        message: result.error.details[0].message,
        status: 400,
      });
    } else {
      bcrypt.compare(data.password, user.password, function (err, result) {
        if (result) {
          const token = jwt.sign(
            {
              name: user.name,
              email: user.email,
              avatar: user.avatar,
              createTime: user.createTime,
              id: user.id,
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
    }
  } catch (error) {
    return res.status(500).json(error);
  }
};

export const signUp = async (req: Request, res: Response) => {
  try {
    const data: ISignUp = req.body;
    const user = await UserModel.findOne({ email: data.email });
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
        const newUser = new UserModel({
          email: data.email,
          password: hash,
          avatar:
            "https://bizweb.dktcdn.net/100/438/408/files/anh-nen-naruto-yody-vn-15.jpg?v=1688527527983",
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

export const getMe = async (req: RequestApp, res: Response) => {
  try {
    const user = await UserModel.findOne({ _id: req.user.id }).select(
      "-password"
    );
    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json(error);
  }
};

export const updateUser = async (req: RequestApp, res: Response) => {
  try {
    const data = req.body;
    const updateUser = await UserModel.findByIdAndUpdate(req.user.id, data, {
      new: true,
    });
    if (!updateUser) {
      return res.status(404).json({ message: "Không tìm thấy người dùng" });
    }
    return res.status(200).json(updateUser);
  } catch (error) {
    return res.status(500).json(error);
  }
};

export const deleteUser = async (req: RequestApp, res: Response) => {};

export const getDetailsUser = async (req: RequestApp, res: Response) => {
  try {
    const { sort, size, page, id } = req.query;
    const startIndex = (page - 1) * size;
    const total = await UserModel.estimatedDocumentCount();
    if (id) {
      const user = await UserModel.findOne({
        _id: id,
      }).select("-password");
      if (!user) {
        return res.status(404).json({ message: "Không tìm thấy người dùng" });
      }
    }
    const users = await UserModel.find()
      .skip(startIndex)
      .limit(size)
      .select("-password");
    return res.status(200).json({
      message: "success",
      status: 200,
      data: users,
      currentPage: page,
      total,
      totalPages: Math.ceil(total / size),
    });
  } catch (error) {
    return res.status(500).json(error);
  }
};

export const changePassword = async (req: RequestApp, res: Response) => {
  try {
    const { currentPassword, newPassword } = req.body;
    const user: IAuthUser = await UserModel.findOne({
      email: req.user.email,
    });
    bcrypt.compare(
      currentPassword,
      user.password,
      async function (err, result) {
        if (result) {
          const validationPassword = passwordSchema({
            currentPassword,
            newPassword,
          });
          if (validationPassword.error) {
            return res.status(400).json({
              message: result.error.details[0].message,
              status: 400,
            });
          } else {
            bcrypt.hash(newPassword, 10, async (err, hash) => {
              if (err) {
                console.error("Error occurred while hashing password:", err);
                return;
              }
              await UserModel.findByIdAndUpdate(req.user.id, {
                password: hash,
              });
              return res.status(200).json({
                message: "thay đổi mật khẩu thành công",
                status: 200,
              });
            });
          }
        } else {
          return res.status(401).json({
            message: "mật khẩu không đúng",
            status: 401,
          });
        }
      }
    );
  } catch (error) {
    return res.status(500).json(error);
  }
};

export const forgotPassword = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(404).json({
        message: "Vui lòng nhập email!",
        status: 401,
      });
    }
    const emailSchema = Joi.object({
      email: Joi.string().email().required(),
    }).validate({ email });
    if (emailSchema.error) {
      return res.status(400).json({
        message: "Vui lòng nhập đúng định dạng email",
        status: 400,
      });
    } else {
      const user = await UserModel.findOne({
        email: email,
      });
      const newPassword = Math.random().toString(36).slice(-8);
      const hashPass = await bcrypt.hash(newPassword, 10);
      await UserModel.findByIdAndUpdate(user._id, { password: hashPass });
      const transporter = nodemailer.createTransport({
        host: process.env.EMAIL_SERVICE_PROVIDER,
        port: 465,
        secure: true,
        auth: {
          user: process.env.EMAIL_USERNAME,
          pass: process.env.EMAIL_PASSWORD,
        },
        tls: {
          rejectUnauthorized: false,
        },
      });

      const mailOptions = {
        from: '"Maddison Foo Koch 👻" <maddison53@ethereal.email>',
        to: email,
        subject: "Hello ✔",
        text: "Hello world?",
        html: `<b>Your new password is: ${newPassword}</b>`,
      };
      await transporter.sendMail(mailOptions);
      return res.status(200).json({
        message: "New password sent to your email",
        status: 200,
      });
    }
  } catch (error) {
    return res.status(500).json(error);
  }
};
