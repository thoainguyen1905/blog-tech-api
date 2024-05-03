import { required } from "joi";
import mongoose from "mongoose";

const Schema = mongoose.Schema;

const CategoriesSchema = new Schema({
  name: { type: String, required: true },
  createTime: {
    type: Date,
    default: Date.now,
  },
  description: { type: String },
  thumbnail: { type: String },
  isActive: { type: Boolean, required: true },
});

const CategoriesModel = mongoose.model("Categories", CategoriesSchema);

export default CategoriesModel;
