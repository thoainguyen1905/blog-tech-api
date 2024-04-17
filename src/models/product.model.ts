import { required } from "joi";
import mongoose from "mongoose";

const Schema = mongoose.Schema;

const ProductSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  thumbnail: { type: String },
  images: { type: Array },
  quantity: { type: Number, required: true },
  reaction: {
    type: Schema.Types.ObjectId,
    ref: "React",
  },
  productType: { type: String },
  produceCode: { type: String },
  price: { type: Number, required: true },
  sizes: { type: Array, required: true },
  createTime: {
    type: Date,
    default: Date.now,
  },
});

const ProductModel = mongoose.model("Product", ProductSchema);

export default ProductModel;
