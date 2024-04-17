import { Request, Response } from "express";
import ReactModel from "../../models/react.model";
import { ITargetType, ITypesReact } from "./react.types";
import { switchReactObj } from "../../helpers/react-utils";
import CommentModel from "../../models/comment.model";

export const addReact = async (req: Request, res: Response) => {
  try {
    const data = req.body;
    const { type, target, idTarget } = data;
    if (target !== "blog" && target !== "comment" && target !== "product") {
      return res.status(404).json({
        message: "target not found",
        status: 404,
      });
    } else {
      const react = await ReactModel.findOne({
        idTarget: idTarget,
      });
      if (react) {
        if (type === "like" || type === "haha" || type === "love") {
          const checkUser = react.listUserAction.some(
            (item) => item.email === req.user.email
          );
          if (!checkUser) {
            let newReact = {
              ...react.toObject(),
              [type]: react[type] ? react[type] + 1 : 1,
              listUserAction: [
                ...react.listUserAction,
                {
                  ...req.user,
                  react: type,
                },
              ],
            };
            let doc = await ReactModel.findOneAndUpdate(
              {
                idTarget: react.idTarget,
              },
              newReact,
              { new: true, upsert: true }
            ).select("-listUserAction");
            return res.json(doc);
          } else {
            const userAction = react.listUserAction.filter(
              (item) => item.email === req.user.email
            );
            const newReactCheck = switchReactObj(react, type, userAction[0]);
            let doc = await ReactModel.findOneAndUpdate(
              {
                idTarget: react.idTarget,
              },
              newReactCheck,
              { new: true, upsert: true }
            ).select("-listUserAction");
            return res.json(doc);
          }
        } else {
          return res.status(400).json({
            message: "type is required",
            status: 400,
          });
        }
      } else {
        const newReact = new ReactModel({
          [type]: 1,
          idTarget: idTarget,
          target: target,
          listUserAction: [
            {
              ...req.user,
              react: type,
            },
          ],
        });
        await newReact.save();
        return res.status(200).json({
          message: "success",
          status: 200,
        });
      }
    }
  } catch (error) {
    return res.status(500).json(error);
  }
};

export const getReactBlog = async (req: Request, res: Response) => {
  const page = req.query.page;
  const size = req.query.size;
  const startIndex = (page - 1) * size;
  const total = await ReactModel.estimatedDocumentCount();
  try {
    const reacts = await ReactModel.find().skip(startIndex).limit(size);
    return res.status(200).json({
      message: "success",
      status: 200,
      currentPage: page,
      total,
      totalPages: Math.ceil(total / size),
      data: reacts,
    });
  } catch (error) {
    return res.status(500).json(error);
  }
};

export const deleteReact = async (req: Request, res: Response) => {};
