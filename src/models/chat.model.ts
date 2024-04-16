const mongoose = require("mongoose");
import jwt from "jsonwebtoken";
import "dotenv/config";
import { required } from "joi";
const Schema = mongoose.Schema;

const ChatMessageSchema = Schema({
  sender: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  receiver: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  timestamp: { type: Date, default: Date.now },
});

const ChatMessageModel = mongoose.model("ChatMessage", ChatMessageSchema);

export default ChatMessageModel;
