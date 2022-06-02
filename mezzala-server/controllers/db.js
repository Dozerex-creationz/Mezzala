require("dotenv").config();
var mongoose = require("mongoose");
mongoose.connect(process.env.MONGOURI, { useNewUrlParser: true });

function arrayRemove(arr, value) {
  return arr.filter(function (ele) {
    return ele != value;
  });
}

const Chat = require("./../Schema/chatSchema").chatModel;
const User = require("./../Schema/userSchema").userModel;
const msgSchema = require("./../Schema/messageSchema").messageSchema;
var MsgModel = new mongoose.model("msg", msgSchema);
const CreateUser = (name, email) => {
  User.findOne({ emailId: email }, (err, data) => {
    if (err) console.log(err);
    if (data) {
      console.log("user exists");
    } else {
      var user = new User({ userName: name, emailId: email, rooms: [] });
      user.save((err, data) => {
        console.log("User created: " + data);
      });
    }
  });
};
var CreateRoom = (roomName, res) => {
  Chat.findOne({ roomName: roomName }, (err, data) => {
    if (err) console.log(err);
    if (data) {
      res("room already exists");
    } else {
      var room = new Chat({ roomName: roomName, chats: [] });
      room.save((err, data) => {
        console.log("Room created: " + data);
        res(data);
      });
    }
  });
};
var enrollUser = (email, roomId, res) => {
  User.findOne({ emailId: email }, (err, data) => {
    if (err) console.log(err);
    if (data) {
      data.rooms = [...data.rooms, roomId];
      data.save((err, data) => {
        res(data);
      });
    } else {
      res("no such user exists that room");
    }
  });
};

var removeUser = (email, roomId, res) => {
  User.findOne({ emailId: email }, (err, data) => {
    if (err) console.log(err);
    if (data) {
      data.rooms = arrayRemove(data.rooms, roomId);
      data.save((err, data) => {
        res(data);
      });
    } else {
      res("user doesnt belong to that room");
    }
  });
};

var sendMsg = (roomName, message, sender, res) => {
  var msg = new MsgModel({ message: message, sender: sender });
  Chat.findOne({ roomName: roomName }, (err, data) => {
    if (err) console.log(err);
    if (data) {
      data.chats = [...data.chats, msg];
      data.save((er, data) => {
        console.log("this is the updated data" + data);
      });
      res(data);
    } else {
      res("no such room");
    }
  });
};

var msgHistory = (roomId) => {
  Chat.findOne({ roomName: roomName }, (err, data) => {
    if (err) console.log(err);
    if (data) {
      res(data);
    } else {
      res("no such room");
    }
  });
};

exports.CreateUser = CreateUser;
exports.CreateRoom = CreateRoom;
exports.enrollUser = enrollUser;
exports.removeUser = removeUser;
exports.sendMsg = sendMsg;
exports.msgHistory = msgHistory;
