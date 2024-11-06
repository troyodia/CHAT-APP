const { StatusCodes } = require("http-status-codes");
const { BadRequestError } = require("../errors");
const Contacts = require("../models/Contacts");
const createContactList = async (req, res) => {
  if (!req.body) {
    throw new BadRequestError("please provide contact details");
  }
  const contactList = await Contacts.create({ ...req.body });
  res.status(StatusCodes.OK).json({ contactList });
};
const getContactList = async (req, res) => {
  const contactList = await Contacts.find({});
  res.status(StatusCodes.OK).json({ contactList });
};
module.exports = { createContactList, getContactList };
