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
  });
  res.status(StatusCodes.OK).json(messages);
};
module.exports = getMessages;
