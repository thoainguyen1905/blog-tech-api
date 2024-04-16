const mongoose = require("mongoose");
import jwt from "jsonwebtoken";
import "dotenv/config";
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  email: { type: String, required: false },
  password: { type: String, required: false },
  birthday: { type: Date, required: false },
  name: { type: String, required: false },
  avatar: { type: String, required: false },
  bio: { type: String, required: false },
  createTime: {
    type: Date,
    default: Date.now,
  },
});

UserSchema.methods.generateAuthToken = function () {
  const token = jwt.sign({ _id: this._id }, process.env.SECRET_KEY);
  return token;
};

const UserModel = mongoose.model("User", UserSchema);

export default UserModel;
