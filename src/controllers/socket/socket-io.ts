import ChatMessageModel from "../../models/chat.model";
import { Request, Response } from "express";
const express = require("express");
const app = express();
const server = require("http").createServer();
const io = require("socket.io")(server);

const connectSocket = async () => {
  try {
    io.on("connection", (socket) => {
      console.log("A user connected");

      socket.on("send-message", async (data) => {
        try {
          const newMessage = new ChatMessageModel({
            sender: data.senderId,
            receiver: data.receiverId,
            message: data.message,
          });
          await newMessage.save();

          io.to(data.senderId)
            .to(data.receiverId)
            .emit("new-message", newMessage);
        } catch (error) {
          console.error("Error sending message:", error);
        }
      });

      socket.on("disconnect", () => {
        console.log("A user disconnected");
      });
    });

    server.listen(8888, () => console.log(`Socket io on port 8888`));
  } catch (error) {
    console.log("run socket fail");
  }
};

export const getListMessages = async (req: Request, res: Response) => {
  try {
    const id = req.query.id;
    const messages = await ChatMessageModel.find({
      $or: [
        { sender: id, receiver: req.user.id },
        { sender: req.user.id, receiver: id },
      ],
    });
    return res.status(200).json({
      message: "success",
      status: 200,
      data: messages,
    });
  } catch (error) {
    return res.status(500).json(error);
  }
};

export default connectSocket;
