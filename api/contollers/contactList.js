const { StatusCodes } = require("http-status-codes");
const { BadRequestError } = require("../errors");
const Contacts = require("../models/Contacts");
const User = require("../models/User");

const createContactList = async (req, res) => {
  if (!req.body) {
    throw new BadRequestError("please provide contact details");
  }
  const currentUserContactList = await User.find({
    _id: req.user.userId,
  }).select("contactList");

  if (!currentUserContactList[0].contactList.includes(req.body.contactId)) {
    const contact = await User.find({ _id: req.body.contactId }).select(
      "email image firstname lastname _id"
    );
    console.log(contact);
    await User.findOneAndUpdate(
      { _id: req.user.userId },
      { $addToSet: { contactList: req.body.contactId } },
      { new: true }
    ).select("contactList");
    return res.status(StatusCodes.OK).json({ contact });
  }

  res.status(StatusCodes.OK).json({ msg: "user already in contact list" });
};

const getContactList = async (req, res) => {
  const contactList = await User.find({ _id: req.user.userId }).select(
    "contactList"
  );
  const contactDetailList = await Promise.all(
    contactList[0].contactList.map(async (contact) => {
      const contactDetail = await User.find({ _id: contact }).select(
        "email image firstname lastname _id"
      );
      // console.log(contactDetail[0]);
      return contactDetail[0];
    })
  );
  res.status(StatusCodes.OK).json(contactDetailList);
};
module.exports = { createContactList, getContactList };
