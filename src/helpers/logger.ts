import { Request, Response } from "express";

const successCommon = () => {
  var res: Response;
  return res.status(200).json({
    message: "success",
    status: 200,
  });
};
const errorCommon = () => {
  var res: Response;
  return res.status(500).json({
    message: "maybe error!",
    status: 500,
  });
};

export { successCommon, errorCommon };
