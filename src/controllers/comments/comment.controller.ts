import { Request, Response } from "express";
import CommentModel from "../../models/comment.model";
import { ICommentBody } from "./comment.types";
import ReactModel from "../../models/react.model";
import { RequestApp } from "../../types/constants";

export const addComment = async (req: RequestApp, res: Response) => {
  try {
    const user = await req.user;
    const data: ICommentBody = await req.body;
    const newComment = new CommentModel({
      targetId: data.targetId,
      target: data.target,
      text: data.text,
      userInfo: user.id,
    });
    newComment.save();
    return res.status(200).json({
      message: "success",
      status: 200,
    });
  } catch (error) {
    return res.status(500).json(error);
  }
};

export const getListComment = async (req: RequestApp, res: Response) => {
  try {
    const page = req.query.page;
    const size = req.query.size;
    const id = req.query.id;
    const total = await CommentModel.estimatedDocumentCount();

    const startIndex = (page - 1) * size;
    const endIndex = Math.min(startIndex + size, total);
    const paginatedComment: any = await CommentModel.find({
      targetId: id,
    })
      .skip(startIndex)
      .limit(size)
      .populate("userInfo", "-password")
      .populate("reaction", "-listUserAction");
    for (let i = 0; i < paginatedComment.length; i++) {
      const reaction = await ReactModel.findOne({
        idTarget: paginatedComment[i].id,
      });
      if (reaction !== null) {
        const { listUserAction } = reaction;
        const checkIsLike = listUserAction.some(
          (val) => val.email === req.user.email
        );
        if (checkIsLike) {
          paginatedComment[i] = {
            ...paginatedComment[i].toObject(),
            isLike: true,
            like: reaction.like ?? 0,
            haha: reaction.haha ?? 0,
            love: reaction.love ?? 0,
          };
        }
      }
    }
    return res.status(200).json({
      currentPage: page,
      total,
      totalPages: Math.ceil(total / size),
      data: paginatedComment,
    });
  } catch (error) {
    return res.status(500).json(error);
  }
};

export const deleteComment = async (req: RequestApp, res: Response) => {
  try {
    const id = req.query.id;
    const user = await req.user;
    const comment: ICommentBody = await CommentModel.findById(id);
    if (comment.userInfo.toString() === user.id) {
      await CommentModel.findByIdAndDelete(id);
      return res.status(200).json({
        message: "success",
        status: 200,
      });
    } else {
      return res.status(403).json({
        message: "Bạn không có quyền xoá comment này",
        status: 403,
      });
    }
  } catch (error) {
    return res.status(500).json(error);
  }
};
