const jwt = require('jsonwebtoken');
const ls = require('local-storage');

const userService = require('../users/userService');
const sc = require('../errors/http-code');

const login = async (req, res, next) => {
  const { username, password } = req.body;
  const users = await userService.findAllUsers();
  const user = users.find(u => username === u.username);
  // check user exist on database
  if (!user) {
    const err = new Error(`User ${username} not found`);
    err.statusCodes = sc.BAD_REQUEST;
    return next(err);
  }
  // compare password
  const isPassword = users.some(u => u.password === password);
  if (!isPassword) {
    const err = new Error(`Incorrect Password`);
    err.statusCodes = sc.BAD_REQUEST;
    return next(err);
  }
  // create token
  const token = jwt.sign({ username }, process.env.SECRET_KEY, {
    expiresIn: 100,
  });
  ls.set('token', token);
  return res.json({ token });
};

module.exports = {
  login,
};
