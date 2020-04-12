const mongoose = require("mongoose");
const CHAT = require("../models/chatModel.js");

const chat = async (app, io) => {
  app.get("/chats", async (req, res) => {
    const chatList = await CHAT.getChats();
    if (chatList) {
      return res.json({ success: true, msg: chatList });
    }
    return res.json({ success: false, msg: "no chats found" });
  });

  //socket Part
  io.of("/").on("connect", async (socket) => {
    console.log("connected");
    socket.on("typing", async (msg) => {
      console.log(msg);
      socket.broadcast.emit("typing", { msg: msg.name });
    });
    try {
      socket.on("msg", async (msg) => {
        const chatList = await CHAT.getChats();
        io.emit("msg", { chats: chatList });
        console.log("msg : ", msg);
        const chat = {
          email: msg.email,
          message: msg.message,
        };
        console.log("before saving");
        await CHAT.saveMessage(chat);
        console.log("after saving");
        const chats = await CHAT.getChats();
        console.log(`chats : ${chats.length}`);
        io.emit("msg", { chats });
      });
    } catch (err) {
      console.log("error : ", err.msg);
    }
    socket.on("typing", async (name) => {
      io.emit("typing", { name: name.name });
    });
    socket.on("disconnect", () => {
      console.log("disconnected");
    });
  });
};
module.exports = chat;
