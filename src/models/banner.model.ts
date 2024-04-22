import mongoose from "mongoose";

const Schema = mongoose.Schema;

const BannerSchema = new Schema({
  name: { type: String },
  description: { type: String },
  imageUrl: { type: String, required: true },
  redirect: { type: String },
  createTime: {
    type: Date,
    default: Date.now,
  },
});

const BannerModel = mongoose.model("Banner", BannerSchema);

export default BannerModel;
