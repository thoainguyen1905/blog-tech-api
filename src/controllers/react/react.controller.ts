import { Request, Response } from "express";
import ReactModel from "../../models/react.model";
import { ITargetType, ITypesReact } from "./react.types";
import { switchReactObj } from "../../helpers/react-utils";
import CommentModel from "../../models/comment.model";

export const addReact = async (req: Request, res: Response) => {
  try {
    const data = req.body;
    const { type, target, blogId, commentId } = data;
    if (blogId) {
      const blogReact: any = await ReactModel.findOne({
        blogId: blogId,
      });
      if (blogReact) {
        if (type === "like" || type === "haha" || type === "love") {
          const checkUser = blogReact.listUserAction.some(
            (item) => item.email === req.user.email
          );
          if (!checkUser) {
            let newReact = {
              ...blogReact.toObject(),
              [type]: blogReact[type] ? blogReact[type] + 1 : 1,
              listUserAction: [
                ...blogReact.listUserAction,
                {
                  ...req.user,
                  react: type,
                },
              ],
            };
            let doc = await ReactModel.findOneAndUpdate(
              {
                blogId: blogReact.blogId,
              },
              newReact,
              { new: true, upsert: true }
            );
            return res.json(doc);
          } else {
            const userAction = blogReact.listUserAction.filter(
              (item) => item.email === req.user.email
            );
            const newReactCheck = switchReactObj(
              blogReact,
              type,
              userAction[0]
            );
            let doc = await ReactModel.findOneAndUpdate(
              {
                blogId: blogReact.blogId,
              },
              newReactCheck,
              { new: true, upsert: true }
            );
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
          blogId: blogId,
          commentId: commentId,
          listUserAction: [
            {
              ...req.user,
              react: type,
            },
          ],
        });
        await newReact.save();
      }
    } else if (commentId) {
      const blogReact: any = await ReactModel.findOne({
        commentId: commentId,
      });
      if (blogReact) {
        if (type === "like" || type === "haha" || type === "love") {
          const checkUser = blogReact.listUserAction.some(
            (item) => item.email === req.user.email
          );
          if (!checkUser) {
            let newReact = {
              ...blogReact.toObject(),
              [type]: blogReact[type] ? blogReact[type] + 1 : 1,
              listUserAction: [
                ...blogReact.listUserAction,
                {
                  ...req.user,
                  react: type,
                },
              ],
            };
            let doc = await ReactModel.findOneAndUpdate(
              {
                blogId: blogReact.blogId,
              },
              newReact,
              { new: true, upsert: true }
            );
            return res.json(doc);
          } else {
            const userAction = blogReact.listUserAction.filter(
              (item) => item.email === req.user.email
            );
            const newReactCheck = switchReactObj(
              blogReact,
              type,
              userAction[0]
            );
            let doc = await ReactModel.findOneAndUpdate(
              {
                commentId: blogReact.commentId,
              },
              newReactCheck,
              { new: true, upsert: true }
            );
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
          blogId: blogId,
          commentId: commentId,
          listUserAction: [
            {
              ...req.user,
              react: type,
            },
          ],
        });
        await CommentModel.findByIdAndUpdate(commentId, {
          reaction: newReact._id.toString(),
        });
        await newReact.save();
      }
    }
    return res.status(200).json({
      message: "success",
      status: 200,
    });
  } catch (error) {
    return res.status(500).json(error);
  }
};

export const getReactBlog = async (req: Request, res: Response) => {};

export const deleteReact = async (req: Request, res: Response) => {};
