import { required } from "joi";
import mongoose from "mongoose";

const Schema = mongoose.Schema;

const CartSchema = new Schema({
  name: { type: String, required: true },
  price: {
    type: Number,
    required: true,
  },
  thumbnail: { type: String, required: true },
  quantity: {
    type: Number,
    required: true,
  },
  totalPrice: { type: Number, required: true },
  productId: { type: String, required: true },
  size: { type: String, required: true },
  userId: {
    type: String,
    required: true,
  },
  createTime: {
    type: Date,
    default: Date.now,
  },
});

const CartModel = mongoose.model("Cart", CartSchema);

export default CartModel;
