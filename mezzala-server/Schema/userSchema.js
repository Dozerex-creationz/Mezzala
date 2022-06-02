let mongoose = require("mongoose");

var userSchema = new mongoose.Schema({
  userName: String,
  emailId: String,
  rooms: [String],
});

var User = new mongoose.model("User", userSchema);
exports.userModel = User;
