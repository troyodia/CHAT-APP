const mongoose = require("mongoose");

const MessageSchema = new mongoose.Schema({
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    requied: true,
  },
  recipient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    requied: false,
  },
  messageType: {
    type: String,
    enum: ["text", "file", "combined"],
    required: true,
  },
  content: {
    type: String,
    required: function () {
      return this.messageType === "text";
    },
  },
  fileUrl: [
    {
      type: String,
      required: function () {
        return this.messageType === "file";
      },
    },
  ],
  contentAndFile: {
    text: {
      type: String,
      required: function () {
        return this.messageType === "combined";
      },
    },
    files: [
      {
        type: String,
        required: function () {
          return this.messageType === "combined";
        },
      },
    ],
  },
  timeStamps: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Message", MessageSchema);
