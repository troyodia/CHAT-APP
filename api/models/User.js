const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "please provide user name"],
    maxLength: 30,
    minLength: 2,
  },
  email: {
    type: String,
    required: [true, "please provide user email"],
    match: [
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      "provide vaild email",
    ],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "please provide user password"],
    minLength: 6,
  },
});

module.exports = mongoose.model("User", UserSchema);