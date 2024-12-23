const { StatusCodes } = require("http-status-codes");
const Message = require("../models/Message");
const getMessages = async (req, res) => {
  if (!req.body) {
    throw new BadRequestError("cannot get messages");
  }
  const { contactId } = req.body;
  const { userId } = req.user;
  const messages = await Message.find({
    $or: [
      { sender: userId, recipient: contactId },
      { sender: contactId, recipient: userId },
    ],
  }).sort({ timeStamps: 1 });

  res.status(StatusCodes.OK).json(messages);
};
const uploadFile = async (req, res) => {
  if (!req.file) throw new BadRequestError("file not uploaded");
  const { filename } = req.file;
  console.log(req.file, filename);
  res.status(StatusCodes.OK).json({ filePath: filename });
};
const updatedMessageReadStatus = async (req, res) => {
  const { isUnread, messageId } = req.body;
  // console.log(isUnread, messageId);
  console.log("message updated ", messageId);
  await Message.updateOne({ _id: messageId }, { $set: { isUnread: isUnread } });
  res.status(StatusCodes.OK).json({ msg: "updated read status" });
};

const getUnreadMessages = async (req, res) => {
  const unreadMessages = await Message.find({
    isUnread: true,
    recipient: req.user.userId,
  });
  // console.log(unreadMessages);
  res.status(StatusCodes.OK).json({ unreadMessages });
};
module.exports = {
  getMessages,
  uploadFile,
  getUnreadMessages,
  updatedMessageReadStatus,
};
