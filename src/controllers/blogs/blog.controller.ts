import { Request, Response } from "express";
import BlogModel from "../../models/blog.model";
import { IBlogBody } from "./blog.types";
import ReactModel from "../../models/react.model";

export const getListBlog = async (req: Request, res: Response) => {
  const page = req.query.page;
  const size = req.query.size;
  const id = req.query.id;
  try {
    if (id) {
      const blog = await BlogModel.findOne({
        _id: id,
      });
      const reacts = await ReactModel.findOne({
        blogId: id,
      }).select("-listUserAction");
      const mergeBlog = Object.assign({}, reacts.toObject(), blog.toObject());
      return res.status(200).json(mergeBlog);
    } else {
      const total = await BlogModel.estimatedDocumentCount();

      const startIndex = (page - 1) * size;
      const endIndex = Math.min(startIndex + size, total);

      const paginatedBlogs = await BlogModel.find()
        .skip(startIndex)
        .limit(size);
      return res.status(200).json({
        currentPage: page,
        total,
        totalPages: Math.ceil(total / size),
        data: paginatedBlogs,
      });
    }
  } catch (error) {
    return res.status(500).json(error);
  }
};

export const addBlog = async (req: Request, res: Response) => {
  try {
    const data: IBlogBody = req.body;
    const newBlog = new BlogModel({
      title: data.title,
      description: data.description,
      thumbnail:
        "https://www.marthastewart.com/thmb/1r0K4i4pVGdqQDqZ_bJ36BIg0YI=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/plants-look-beautiful-when-not-blooming-coleus-lead-getty-0623-c6efce0847fc421fab5f394fe02cda51.jpg",
    });
    await newBlog.save();
    return res.status(200).json({
      message: "success",
      status: 200,
    });
  } catch (error) {
    return res.status(500).json(error);
  }
};

export const deleteBlog = async (req: Request, res: Response) => {
  try {
    const id = req.query.id;
    if (!id) {
      return res.status(404).json({
        message: "Không tìm thấy id",
        status: false,
      });
    }
    const deleteBlog = await BlogModel.findByIdAndDelete(id);
    if (!deleteBlog) {
      return res.status(404).json({
        message: "Không tìm thấy id",
        status: false,
      });
    }
    return res.status(200).json({
      message: "success",
      status: 200,
    });
  } catch (error) {
    return res.status(500).json(error);
  }
};
