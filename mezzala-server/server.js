const controller = require("./controllers/db");
const db = controller.db;
require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
var bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

//LOGIN TO THE APP
app.post("/login", (req, res) => {
  const credential = req.body;
  const email = credential.email;
  const name = credential.name;
  controller.CreateUser(name, email);
});

//CREATE A NEW ROOM
app.get("/createRoom/:name", (req, res) => {
  var name = req.params.name;
  const response = (val) => {
    res.send(val);
  };
  controller.CreateRoom(name, response);
});

//SENDING A MESSAGE TO THE GROUP
app.post("/addMsg", (req, res) => {
  console.log("called");
  var { msg, sender, roomName } = req.body;
  const response = (val) => {
    res.send(val);
  };
  controller.sendMsg(roomName, msg, sender, response);
});

//ADDING THE USER TO THE ROOM
app.get("/addUser/:email/:roomName", (req, res) => {
  var { email, roomName } = req.params;
  const response = (val) => {
    res.send(val);
  };
  controller.enrollUser(email, roomName, response);
});

app.get("/removeUser/:email/:roomName", (req, res) => {
  var { email, roomName } = req.params;
  const response = (val) => {
    res.send(val);
  };
  controller.removeUser(email, roomName, response);
});
app.listen(process.env.PORT, () => {
  console.log("the app has started in: " + process.env.PORT);
});
