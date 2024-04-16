import UserModel from "../models/user.model";
import "dotenv/config";
const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  //   const token = req.header("Authorization");
  var token = req.headers.authorization;

  if (!token) {
    return res
      .status(401)
      .json({ message: "Authorization token is required." });
  }
  if (token.startsWith("Bearer ")) {
    token = token.slice(7);
  }
  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid token." });
  }
};

export default auth;
