const userService = require('./userService');
const userValid = require('./userValidation');
const sc = require('../errors/http-code');

const getAllUsers = async (req, res) => {
  try {
    const users = await userService.findAllUsers();
    res.status(200).send(users);
  } catch (err) {
    res.status(400).send({ error: err });
  }
};

const getUser = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await userService.findUserById(id);
    res.status(sc.OK).send(user);
  } catch (error) {
    res.status(sc.BAD_REQUEST).send({ error });
  }
};

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
    error.statusCodes = sc.BAD_REQUEST;
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

    return res.status(sc.OK).send(user);
  } catch (error) {
    return res.status(sc.BAD_REQUEST).send({ error });
  }
};

module.exports = {
  getAllUsers,
  getUser,
  createUser,
};
