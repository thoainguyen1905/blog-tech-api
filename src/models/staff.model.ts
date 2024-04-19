import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import "dotenv/config";
import { required } from "joi";

const Schema = mongoose.Schema;

const StaffSchema = new Schema({
  phone: { type: Number, required: true },
  password: { type: String, required: true },
  name: { type: String, required: false },
  avatar: { type: String, required: false },
  code: { type: String, required: false },
  post: { type: Array, required: true },
  createTime: {
    type: Date,
    default: Date.now,
  },
});

StaffSchema.methods.generateAuthToken = function () {
  const token = jwt.sign({ _id: this._id }, process.env.SECRET_KEY);
  return token;
};

const StaffModel = mongoose.model("Staff", StaffSchema);

export default StaffModel;
