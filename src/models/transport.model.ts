import mongoose from "mongoose";

const Schema = mongoose.Schema;

const TransportSchema = new Schema({
  phoneShop: { type: String, required: true },
  phoneReceiver: { type: String, required: true },
  address: { type: String, required: true },
  description: { type: String, required: true },
  receiver: { type: String, required: true },
  shopName: { type: String, required: true },
  price: { type: Number, required: true },
  code: { type: Number, required: true },
  status: { type: Number },
  type: { type: String },
  weight: { type: Number },
  staffInfor: { type: Schema.Types.ObjectId, ref: "Staff" },
  createTime: {
    type: Date,
    default: Date.now,
  },
});

const TransportModel = mongoose.model("Receive", TransportSchema);
const ReceiveModal = mongoose.model("Receive", TransportSchema);
const DeliveryModal = mongoose.model("Delivery", TransportSchema);

export { DeliveryModal, ReceiveModal };
// export default TransportModel;
