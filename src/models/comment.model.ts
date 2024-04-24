import mongoose from "mongoose";

const Schema = mongoose.Schema;

const CommentSchema = new Schema({
  text: {
    type: String,
    required: true,
  },
  userInfo: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  targetId: { type: String, required: true },
  target: { type: String, required: true },
  // blogId: { type: String, required: true },
  likes: { type: Number },
  reaction: {
    type: Schema.Types.ObjectId,
    ref: "React",
  },
  createTime: {
    type: Date,
    default: Date.now,
  },
});

const CommentModel = mongoose.model("Comment", CommentSchema);

export default CommentModel;
