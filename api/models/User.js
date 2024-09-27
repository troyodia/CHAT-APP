require("dotenv").config();
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
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

UserSchema.pre("save", async function () {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

UserSchema.methods.comparePassword = async function (password) {
  const isMatch = await bcrypt.compare(password, this.password);
  return isMatch;
};
UserSchema.methods.generateToken = function () {
  const token = jwt.sign(
    { userId: this._id, name: this.name, email: this.email },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_LIFETIME }
  );
  return token;
};
UserSchema.methods.verifyToken = function (token) {
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  return decoded;
};
module.exports = mongoose.model("User", UserSchema);
