import ProductModel from "../../models/product.model";
import { Request, Response } from "express";
import { generateProductCode } from "../../helpers/react-utils";
import { productValidation } from "./product.types";
import ReactModel from "../../models/react.model";
import { RequestApp } from "../../types/constants";

export const getListProduct = async (req: RequestApp, res: Response) => {
  const { sort, size, page, id } = req.query;
  const startIndex = (page - 1) * size;
  const total = await ProductModel.estimatedDocumentCount();
  try {
    if (id) {
      const reacts = await ReactModel.findOne({
        idTarget: id,
      }).select("-listUserAction");
      const product = await ProductModel.findById(id);
      if (reacts) {
        const mergeBlog = Object.assign(
          {},
          {
            reaction: reacts.toObject(),
          },
          product.toObject()
        );
        return res.status(200).json({
          message: "success",
          status: 200,
          data: mergeBlog,
        });
      }
      return res.status(200).json({
        message: "success",
        status: 200,
        data: product,
      });
    }
    const products = await ProductModel.find()
      .sort({ price: sort === "dec" ? -1 : 1 })
      .skip(startIndex)
      .limit(size);
    return res.status(200).json({
      message: "success",
      status: 200,
      currentPage: page,
      total,
      totalPages: Math.ceil(total / size),
      data: products,
    });
  } catch (error) {
    return res.status(500).json(error);
  }
};

export const addProduct = async (req: Request, res: Response) => {
  try {
    const product = req.body;
    const validation = productValidation(product);
    if (validation.error) {
      return res.status(400).json({
        message: validation.error.details[0].message,
        status: 400,
      });
    } else {
      const newProductgenerateCode = {
        ...product,
        produceCode: generateProductCode(),
      };
      const data = new ProductModel(newProductgenerateCode);
      await data.save();
      return res.status(200).json({
        message: "success",
        status: 200,
        data: newProductgenerateCode,
      });
    }
  } catch (error) {
    return res.status(500).json(error);
  }
};

export const getDetail = async (req: RequestApp, res: Response) => {
  const id = req.query.id;
  try {
    if (id) {
      const reacts = await ReactModel.findOne({
        idTarget: id,
      }).select("-listUserAction");
      const product = await ProductModel.findById(id);
      const mergeBlog = Object.assign(
        {},
        reacts.toObject(),
        product.toObject()
      );
      return res.status(200).json({
        message: "success",
        status: 200,
        data: mergeBlog,
      });
    }
    return res.status(404).json({
      message: "not found product",
      status: 404,
    });
  } catch (error) {
    return res.status(500).json(error);
  }
};

export const relateProduct = async (req: Request, res: Response) => {
  const id = req.query.id;
  try {
    if (!id) {
      return res.status(400).json({
        message: "id not found",
        status: 400,
      });
    } else {
      const product = await ProductModel.findById(id);
      if (!product) {
        return res.status(404).json({
          message: "Product not found",
          status: 404,
        });
      }
      const price = product.price;
      let query = {
        productType: product.productType,
        price: { $gt: price - 10000, $lt: price + 10000 },
        _id: { $ne: id },
      };
      const relatedProducts = await ProductModel.find(query);
      return res.status(200).json({
        message: "success",
        status: 200,
        data: relatedProducts,
      });
    }
  } catch (error) {
    return res.status(500).json(error);
  }
};

export const getNew = async (req: Request, res: Response) => {};

export const updateProduct = async (req: Request, res: Response) => {
  try {
    const product = req.body;
    await ProductModel.findByIdAndUpdate(product._id, product);
    return res.status(200).json(product);
  } catch (error) {
    return res.status(500).json(error);
  }
};

export const deleteProduct = async (req: Request, res: Response) => {
  const id = req.query.id;
  try {
    if (id) {
      const product = await ProductModel.findByIdAndDelete(id);
      return res.status(200).json({
        message: "success",
        status: 200,
      });
    }
    return res.status(404).json({
      message: "not found product",
      status: 404,
    });
  } catch (error) {
    return res.status(500).json(error);
  }
};
