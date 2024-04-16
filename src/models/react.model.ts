import mongoose from "mongoose";

const Schema = mongoose.Schema;

const ReactSchema = new Schema({
  like: { type: Number },
  haha: { type: Number },
  love: { type: Number },
  blogId: { type: String },
  commentId: { type: String },
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
