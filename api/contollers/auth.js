const register = (req, res) => {
  res.send("regsiter");
};
const login = (req, res) => {
  res.send("login buddy");
};
module.exports = {
  register,
  login,
};
