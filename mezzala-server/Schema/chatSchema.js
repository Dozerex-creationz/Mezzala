const messageSchema = require("./messageSchema");
let mongoose = require("mongoose");

var chatSchema = new mongoose.Schema({
  roomName: String,
  chats: [
    {
      messageSchema,
      type: mongoose.Schema.Types.Mixed,
    },
  ],
});

var Chat = new mongoose.model("chat", chatSchema);
exports.chatModel = Chat;
