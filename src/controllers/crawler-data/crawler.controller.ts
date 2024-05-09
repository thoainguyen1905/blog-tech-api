import fs from "fs";
import axios from "axios";
import cheerio from "cheerio";
import { Request, Response } from "express";
import BlogModel from "../../models/blog.model";
import crawlerWeb from "../../helpers/crawler";
import { RequestApp } from "../../types/constants";

export const crawlerBlog = async (req: RequestApp, res: Response) => {
  try {
    const page = req.query.page;
    const data = await crawlerWeb(page);
    data.map(async (item) => {
      let newBlog = new BlogModel(item);
      await newBlog.save();
    });
    return res.status(200).json({
      message: "success",
      status: 200,
      data: data,
    });
  } catch (error) {
    return res.status(500).json(error);
  }
};

export const crawlerDetailBlog = async (req: Request, res: Response) => {
  try {
    const url = `https://thegioiboardgame.vn/blogs/blog/smash-up-va-so-luoc-ve-cac-ban-mo-rong`;
    var data;
    const response = await axios.get(url);
    const $ = cheerio.load(response.data);
    data = $("div.main-product.container-fluid").html();
    data = data.replace(/^\/\//, "");
    return res.status(200).json({
      message: "success",
      status: 200,
      data: data,
    });
  } catch (error) {
    return res.status(500).json(error);
  }
};
