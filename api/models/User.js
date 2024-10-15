require("dotenv").config();
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const UserSchema = mongoose.Schema(
  {
    firstname: {
      type: String,
      required: [true, "please provide user first name"],
      maxLength: 30,
      minLength: 2,
    },
    lastname: {
      type: String,
      required: [true, "please provide user last name"],
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
    image: {
      filename: {
        type: String,
        required: [true, "please provide user profile photo"],
      },
    },
  },
  { timestamps: true }
);

UserSchema.pre("save", async function () {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

UserSchema.methods.comparePassword = async function (password) {
  const isMatch = await bcrypt.compare(password, this.password);
  return isMatch;
};
UserSchema.methods.generateToken = function (secret, expiresIn) {
  const token = jwt.sign(
    {
      userId: this._id,
      firstname: this.firstname,
      lastname: this.lastname,
      email: this.email,
    },
    secret,
    { expiresIn: expiresIn }
  );
  return token;
};
UserSchema.methods.verifyToken = function (token, secret) {
  const decoded = jwt.verify(token, secret);
  return decoded;
};
module.exports = mongoose.model("User", UserSchema);
