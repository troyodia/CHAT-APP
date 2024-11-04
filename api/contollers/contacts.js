const { StatusCodes } = require("http-status-codes");
const { BadRequestError } = require("../errors");
const User = require("../models/User");

const searchContact = async (req, res) => {
  const { search } = req.body;
  if (!search) {
    throw new BadRequestError("search term required");
  }
  const regex = /[`~!#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi;
  const searchTerm = search.replace(regex, "");
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
module.exports = searchContact;
