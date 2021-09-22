const { StatusCodes } = require('http-status-codes');
const userService = require('./userService');
const userValid = require('./userValidation');

// POST: /users
const createUser = async (req, res, next) => {
  const users = await userService.findAllUsers();
  const { name, username, password, email, status } = req.body;
  const isValidUser = await userValid.validate({
    name,
    username,
    password,
    email,
    status,
  });
  if (isValidUser.error) {
    return res.send(isValidUser.error);
  }
  const isUser = users.some(u => u.username === username);
  if (isUser) {
    const error = new Error(`User ${username} has already been registered`);
    error.statusCodes = StatusCodes.BAD_REQUEST;
    return next(error);
  }
  try {
    const user = await userService.addUser(
      name,
      username,
      password,
      email,
      status
    );

    return res.status(StatusCodes.OK).send(user);
  } catch (error) {
    return res.status(StatusCodes.BAD_REQUEST).send({ error });
  }
};
// GET /users
const getAllUsers = async (req, res) => {
  try {
    const users = await userService.findAllUsers();
    res.status(200).send(users);
  } catch (err) {
    res.status(400).send({ error: err });
  }
};

// GET /users/:id
const getUser = async (req, res, next) => {
  const { id } = req.params;
  console.log(id);
  const users = await userService.findAllUsers();
  const isCorrectId = users.some(user => id === user.id);
  if (!isCorrectId) {
    const error = new Error(`Can not find user with id ${id}`);
    error.statusCodes = StatusCodes.BAD_REQUEST;
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
