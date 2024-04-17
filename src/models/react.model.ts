import { required } from "joi";
import mongoose from "mongoose";

const Schema = mongoose.Schema;

const ReactSchema = new Schema({
  idTarget: { type: String },
  like: { type: Number },
  haha: { type: Number },
  love: { type: Number },
  blogId: { type: String },
  commentId: { type: String },
  target: { type: String, required: true },
  createTime: {
    type: Date,
    default: Date.now,
  },
  listUserAction: {
    type: Array,
  },
});

const ReactModel = mongoose.model("React", ReactSchema);

export default ReactModel;
