import mongoose from "mongoose";

const Schema = mongoose.Schema;

const itemProduct = new Schema({
  name: { type: String, required: true },
  thumbnail: { type: String, required: true },
  quantity: { type: String, required: true },
  price: { type: String, required: true },
  sizes: { type: String, required: true },
});

const OrderSchema = new Schema({
  userInfo: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  listProduct: [itemProduct],
  status: { type: String, required: true },
  thumbnail: { type: String },
  price: { type: Number, required: true },
  note: { type: String },
  address: {
    type: String,
    required: true,
  },
  createTime: {
    type: Date,
    default: Date.now,
  },
});

const OrderModel = mongoose.model("Order", OrderSchema);

export default OrderModel;
