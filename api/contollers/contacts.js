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
  //   console.log(searchRegex);
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
module.exports = { searchContact, blockContact, unBlockContact };
