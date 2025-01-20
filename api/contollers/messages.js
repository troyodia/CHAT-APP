const { StatusCodes } = require("http-status-codes");
const Message = require("../models/Message");
const { default: mongoose } = require("mongoose");
const { s3Upload, s3Delete, s3GetSignedUrl } = require("../aws/s3Service");
const uuid = require("uuid").v4;

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
  const { originalname } = req.file;
  const uniqueFileID = uuid();
  const result = await s3Upload(req.file, "messagefiles", uniqueFileID);
  console.log(result);
  console.log(req.file);
  res
    .status(StatusCodes.OK)
    .json({ filePath: `${uniqueFileID}-${originalname}` });
};
const deleteFile = async (req, res) => {
  if (!req.body) throw new BadRequestError("file name not provided");
  const result = await s3Delete(req.body.filename, "messagefiles");
  console.log(result);
  res.status(StatusCodes.OK).json({ msg: "success" });
};
const updatedMessageReadStatus = async (req, res) => {
  const { isUnread, messageId, markAllAsRead, contactId } = req.body;

  if (markAllAsRead && contactId !== undefined) {
    await Message.updateMany(
      { sender: contactId, recipient: req.user.userId, isUnread: true },
      { $set: { isUnread: isUnread } }
    );
    return res.status(StatusCodes.OK).json({ msg: "updated read status" });
  }
  const message = await Message.findByIdAndUpdate(
    { _id: messageId },
    { $set: { isUnread: isUnread } },
    { new: true }
  );
  res
    .status(StatusCodes.OK)
    .json({ msg: "updated read status", firstUnreadMessage: message._id });
};

const getUnreadMessages = async (req, res) => {
  const unreadMessages = await Message.find({
    isUnread: true,
    recipient: req.user.userId,
  }).sort({ timeStamps: 1 });
  console.log(unreadMessages);
  const firstAgregate = await Message.aggregate([
    {
      $match: {
        isUnread: true,
        recipient: new mongoose.Types.ObjectId(req.user.userId),
      },
    },
    { $sort: { timeStamps: 1 } },
    { $group: { _id: "$sender", messages: { $first: "$$ROOT" } } },
    { $project: { _id: "$messages._id", sender: "$messages.sender" } },
  ]);

  res.status(StatusCodes.OK).json({
    unreadMessages,
    firstUnreadMessage: firstAgregate,
  });
};
const getLastMessage = async (req, res) => {
  if (!req.body) {
    throw new BadRequestError("cannot get messages");
  }
  const { contactId } = req.body;
  const { userId } = req.user;
  const aggregateContactId = new mongoose.Types.ObjectId(contactId);
  const aggregateUserId = new mongoose.Types.ObjectId(userId);
  const lastMessage = await Message.aggregate([
    {
      $match: {
        $or: [
          { sender: aggregateUserId, recipient: aggregateContactId },
          { sender: aggregateContactId, recipient: aggregateUserId },
        ],
      },
    },
    { $sort: { timeStamps: 1 } },
    { $group: { _id: null, messages: { $last: "$$ROOT" } } },
  ]);
  console.log(contactId, lastMessage);
  res.status(StatusCodes.OK).json({ lastMessage });
};
const getSignedUrl = async (req, res) => {
  if (!req.body) throw new BadRequestError("file not provided");
  const url = await s3GetSignedUrl(req.body.filename, "messagefiles");
  console.log(url);
  res.status(StatusCodes.OK).json({ url });
};
module.exports = {
  getMessages,
  uploadFile,
  getUnreadMessages,
  updatedMessageReadStatus,
  getLastMessage,
  deleteFile,
  getSignedUrl,
};
