const { StatusCodes } = require("http-status-codes");
const { BadRequestError } = require("../errors");
const User = require("../models/User");

const searchContact = async (req, res) => {
  const { contact } = req.body;
  if (!contact) {
    throw new BadRequestError("contact term required");
  }
  const regex = /[`~!#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi;
  const searchTerm = contact.replace(regex, "");
  const searchRegex = new RegExp(searchTerm, "i");
  const users = await User.find(
    {
      $and: [
        {
          $or: [
            { firstname: searchRegex },
            { lastname: searchRegex },
            { email: searchRegex },
          ],
        },
        { _id: { $ne: req.user.userId } },
      ],
    },
    "firstname lastname image email"
  );

  res.status(StatusCodes.OK).json({ users });
};
const getBlockedContacts = async (req, res) => {
  const blockedContacts = await User.findOne({ _id: req.user.userId }).select(
    "blockedContacts"
  );
  res.status(StatusCodes.OK).json({ blockedContacts });
};
const blockContact = async (req, res) => {
  const { contact } = req.body;
  if (!contact) {
    throw new BadRequestError("contact term required");
  }
  const blockedContactsArr = await User.findOneAndUpdate(
    { _id: req.user.userId },
    { $addToSet: { blockedContacts: contact } },
    { new: true }
  ).select("blockedContacts");
  res.status(StatusCodes.OK).json({ blockedContactsArr });
};
const unBlockContact = async (req, res) => {
  const { contact } = req.body;
  if (!contact) {
    throw new BadRequestError("contact term required");
  }
  const blockedContactsArr = await User.findOneAndUpdate(
    { _id: req.user.userId },
    { $pull: { blockedContacts: contact } },
    { new: true }
  ).select("blockedContacts");
  res.status(StatusCodes.OK).json({ blockedContactsArr });
};
const checkifBlocked = async (req, res) => {
  const { contact } = req.body;
  if (!contact) {
    throw new BadRequestError("contact term required");
  }
  const blockedContactsArr = await User.find({ _id: contact }).select(
    "blockedContacts"
  );
  const userBlockContactArr = await User.find({ _id: req.user.userId }).select(
    "blockedContacts"
  );
  const isBlocked = blockedContactsArr[0].blockedContacts.includes(
    req.user.userId
  );
  const isBlockedByYou =
    userBlockContactArr[0].blockedContacts.includes(contact);
  res.status(StatusCodes.OK).json({ isBlocked, isBlockedByYou });
};
module.exports = {
  searchContact,
  blockContact,
  unBlockContact,
  checkifBlocked,
  getBlockedContacts,
};
