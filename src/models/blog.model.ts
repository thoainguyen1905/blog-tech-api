import mongoose from "mongoose";

const Schema = mongoose.Schema;

const BlogSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  thumbnail: { type: String, required: true },
  reaction: {
    type: Schema.Types.ObjectId,
    ref: "React",
  },
  createTime: {
    type: Date,
    default: Date.now,
  },
});

const BlogModel = mongoose.model("Blog", BlogSchema);

export default BlogModel;
