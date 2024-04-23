import { Request, Response } from "express";
import addressUtils from "../../helpers/data-address";
import path from "path";
import fs from "fs";

export const getDistrict = async (req: Request, res: Response) => {
  const code = req.query.code;
  try {
    const projectDir = process.cwd();
    const dataDir = path.join(projectDir, "data");
    const pathDistrict = path.join(dataDir, "district.json");
    fs.readFile(pathDistrict, "utf-8", (err, data) => {
      if (err) {
        console.error("Error reading JSON file:", err);
        return;
      }
      try {
        const jsonData = JSON.parse(data);
        const districts = jsonData.filter((val) => val.codeProvince === code);
        return res.status(200).json(districts);
      } catch (error) {
        return res.status(500).json(error);
      }
    });
  } catch (error) {
    return res.status(500).json(error);
  }
};

export const getProvinces = async (req: Request, res: Response) => {
  try {
    const projectDir = process.cwd();
    const dataDir = path.join(projectDir, "data");
    const pathProvince = path.join(dataDir, "province.json");
    fs.readFile(pathProvince, "utf-8", (err, data) => {
      if (err) {
        console.error("Error reading JSON file:", err);
        return;
      }
      try {
        const jsonData = JSON.parse(data);
        return res.status(200).json(jsonData);
      } catch (error) {
        return res.status(500).json(error);
      }
    });
  } catch (error) {
    return res.status(500).json(error);
  }
};

export const getTowers = async (req: Request, res: Response) => {
  const code = req.query.code;
  try {
    const projectDir = process.cwd();
    const dataDir = path.join(projectDir, "data");
    const pathTower = path.join(dataDir, "tower.json");
    fs.readFile(pathTower, "utf-8", (err, data) => {
      if (err) {
        console.error("Error reading JSON file:", err);
        return;
      }
      try {
        const jsonData = JSON.parse(data);
        const towers = jsonData.filter((val) => val.codeDistrict === code);
        return res.status(200).json(towers);
      } catch (error) {
        return res.status(500).json(error);
      }
    });
  } catch (error) {
    return res.status(500).json(error);
  }
};
