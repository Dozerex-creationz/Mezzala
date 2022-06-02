let mongoose = require("mongoose");

var messageSchema = new mongoose.Schema({
  message: String,
  sender: String,
  timeStamp: { type: Date, required: true, default: Date.now },
});

exports.messageSchema = messageSchema;
