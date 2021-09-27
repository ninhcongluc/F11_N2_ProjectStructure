const { StatusCodes } = require('http-status-codes');
const bcrypt = require('bcryptjs');
const userService = require('./userService');
const userValid = require('./userValidation');

const saltRounds = 10;

// POST: /users
const createUser = async (req, res, next) => {
  const users = await userService.findAllUsers();
  const { name, username, password, email } = req.body;
  const isValidUser = await userValid.validate({
    name,
    username,
    password,
    email,
  });
  if (isValidUser.error) {
    return res.send(isValidUser.error);
  }
  const isUser = users.some(u => u.username === username);
  if (isUser) {
    const error = new Error(`User ${username} has already been registered`);
    error.statusCode = StatusCodes.BAD_REQUEST;
    return next(error);
  }
  try {
    const salt = await bcrypt.genSalt(saltRounds);
    const hashPassword = await bcrypt.hash(password, salt);
    const user = await userService.addUser(name, username, hashPassword, email);

    return res.status(StatusCodes.OK).send(user);
  } catch (error) {
    return res.status(StatusCodes.BAD_REQUEST).send({ error });
  }
};
// GET /users
const getAllUsers = async (req, res) => {
  try {
    const users = await userService.findAllUsers();
    res.status(StatusCodes.OK).send(users);
  } catch (err) {
    res.status(StatusCodes.BAD_REQUEST).send({ error: err });
  }
};

// GET /users/:id
const getUser = async (req, res, next) => {
  const { id } = req.params;
  const users = await userService.findAllUsers();
  const isCorrectId = users.some(user => id === user.id);
  if (!isCorrectId) {
    const error = new Error(`Can not find user with id ${id}`);
    error.statusCode = StatusCodes.BAD_REQUEST;
    return next(error);
  }
  try {
    const user = await userService.findUserById(id);
    return res.status(StatusCodes.OK).send(user);
  } catch (error) {
    return res.status(StatusCodes.BAD_REQUEST).send({ error });
  }
};

module.exports = {
  getAllUsers,
  getUser,
  createUser,
};
