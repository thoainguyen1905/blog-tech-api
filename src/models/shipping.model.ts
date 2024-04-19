import { required } from "joi";
import mongoose from "mongoose";

const Schema = mongoose.Schema;

const ShippingSchema = new Schema({
  name: { type: String, required: true },
  code: { type: Number, required: true },
  address: {
    type: String,
    required: true,
  },
});

const ShippingModel = mongoose.model("Shipping", ShippingSchema);

export default ShippingModel;
