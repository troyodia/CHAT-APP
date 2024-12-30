const { StatusCodes } = require("http-status-codes");
const Message = require("../models/Message");
const { default: mongoose } = require("mongoose");
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
  const { isUnread, messageId, markAllAsRead, contactId } = req.body;

  if (markAllAsRead && contactId !== undefined) {
    // console.log("all messages marked as read", contactId);
    await Message.updateMany(
      { sender: contactId, recipient: req.user.userId, isUnread: true },
      { $set: { isUnread: isUnread } }
    );
    return res.status(StatusCodes.OK).json({ msg: "updated read status" });
  }
  // console.log("message updated ", messageId);
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

  // console.log("aggregate", firstAgregate);
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
  //from mongo worked incase
  // {
  //   $match:
  //     /**
  //      * query: The query in MQL.
  //      */
  //     {
  //       $or: [
  //         {
  //           recipient: ObjectId(
  //             "673e52eb150905b52ce95403"
  //           ),
  //           sender: ObjectId(
  //             "673e568f150905b52ce954db"
  //           ),
  //         },
  //         {
  //           recipient: ObjectId(
  //             "673e568f150905b52ce954db"
  //           ),
  //           sender: ObjectId(
  //             "673e52eb150905b52ce95403"
  //           ),
  //         },
  //       ],
  //     },
  // },
  // {
  //   $sort:
  //     /**
  //      * Provide any number of field/order pairs.
  //      */
  //     {
  //       timeStamps: 1,
  //     },
  // },
  // {
  //   $group:
  //     /**
  //      * _id: The id of the group.
  //      * fieldN: The first field name.
  //      */
  //     {
  //       _id: null,
  //       message: {
  //         $last: "$$ROOT",
  //       },
  //     },
  // },
};
module.exports = {
  getMessages,
  uploadFile,
  getUnreadMessages,
  updatedMessageReadStatus,
  getLastMessage,
};
