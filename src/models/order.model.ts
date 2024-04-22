import mongoose from "mongoose";

const Schema = mongoose.Schema;

const OrderSchema = new Schema({});

const OrderModel = mongoose.model("Order", OrderSchema);

export default OrderModel;
