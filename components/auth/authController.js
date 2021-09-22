const jwt = require('jsonwebtoken');
const ls = require('local-storage');
const { StatusCodes } = require('http-status-codes');

const userService = require('../users/userService');
const userValidation = require('../users/userValidation');

const login = async (req, res, next) => {
  const { username, password } = req.body;
  const users = await userService.findAllUsers();
  const user = users.find(u => username === u.username);
  // check user exist on database
  if (!user) {
    const err = new Error(`User ${username} not found`);
    err.statusCodes = StatusCodes.BAD_REQUEST;
    return next(err);
  }
  // compare password <Hash password later>
  const isPassword = users.some(u => u.password === password);
  if (!isPassword) {
    const err = new Error(`Incorrect Password`);
    err.statusCodes = StatusCodes.BAD_REQUEST;
    return next(err);
  }
  // create token
  const token = jwt.sign({ username }, process.env.SECRET_KEY, {
    expiresIn: 1000,
  });
  ls.set('token', token);
  return res.json({ token });
};

const register = async (req, res, next) => {
  const users = await userService.findAllUsers();
  const { name, username, password, email, status } = req.body;
  const isValidUser = await userValidation.validate({
    name,
    username,
    password,
    email,
    status,
  });
  if (isValidUser.error) {
    return res.send({ error: isValidUser.error.message });
  }
  const isUser = users.some(u => u.username === username);
  if (isUser) {
    const error = new Error(`User ${username} has already been registered`);
    error.statusCodes = StatusCodes.BAD_REQUEST;
    return next(error);
  }
  const user = userService.addUser(name, username, password, email, status);
  const token = jwt.sign({ username: user.username }, process.env.SECRET_KEY, {
    expiresIn: 1000,
  });
  ls.set('token', token);
  return res.json({ token });
};

module.exports = {
  login,
  register,
};
