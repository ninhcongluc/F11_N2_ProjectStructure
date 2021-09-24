const jwt = require('jsonwebtoken');
const ls = require('local-storage');
const bcrypt = require('bcryptjs');
const { StatusCodes } = require('http-status-codes');

const userService = require('../users/userService');
const registerValidation = require('./authValidation');
const transporter = require('../../helpers/email');

const saltRounds = 10;

const login = async (req, res, next) => {
  const { username, password } = req.body;
  const users = await userService.findAllUsers();
  const user = users.find(
    u =>
      username === u.username || (username === u.email && u.status === 'active')
  );
  // check user exist on database
  if (!user) {
    const err = new Error(`Username or email not found`);
    err.statusCodes = StatusCodes.BAD_REQUEST;
    return next(err);
  }
  // compare password <Hash password later>
  const isPassword = await bcrypt.compare(password, user.password);
  if (!isPassword) {
    const err = new Error(`Incorrect Password`);
    err.statusCodes = StatusCodes.BAD_REQUEST;
    return next(err);
  }
  // create token
  const token = jwt.sign({ username }, process.env.SECRET_KEY, {
    expiresIn: '20min',
  });
  ls.set('token', token);
  return res.json({ token });
};

const register = async (req, res, next) => {
  const users = await userService.findAllUsers();
  const { name, username, password, repeatPassword, email } = req.body;
  const isValidUser = await registerValidation.validate({
    name,
    username,
    password,
    repeatPassword,
    email,
  });
  if (isValidUser.error) return res.send({ error: isValidUser.error.message });
  const isUsernameExisted = users.some(u => u.username === username);
  const isEmailExisted = users.some(u => u.email === email);
  if (isUsernameExisted) {
    const error = new Error(`User ${username} has already been registered`);
    error.statusCodes = StatusCodes.BAD_REQUEST;
    return next(error);
  }
  if (isEmailExisted) {
    const error = new Error(`Email ${email} has already been registered`);
    error.statusCodes = StatusCodes.BAD_REQUEST;
    return next(error);
  }
  try {
    const salt = await bcrypt.genSalt(saltRounds);
    const hashPassword = await bcrypt.hash(password, salt);
    const user = await userService.addUser(name, username, hashPassword, email);
    const token = jwt.sign(
      {
        id: user.id,
        name: user.name,
        username: user.username,
        email: user.email,
      },
      process.env.SECRET_KEY,
      {
        expiresIn: '20min',
      }
    );
    console.log(`${process.env.USER}`);
    ls.set('token', token);
    const options = {
      from: `${process.env.USER}`,
      to: `ninhconglucit@gmail.com, ${email}`,
      subject: 'Validate Email Account',
      html: `<b>http://localhost:${process.env.PORT}/verify/${user.id}/${token}</b>`,
    };
    try {
      await transporter.sendMail(options);
      console.log('SENTED');
    } catch (error) {
      console.log(error);
    }
    return res.status(StatusCodes.OK).json({
      content: 'Please check mail to verify',
      Token: token,
    });
  } catch (error) {
    return res.send(error.message);
  }
};

const verifyEmail = async (req, res, next) => {
  const { id, token } = req.body;
  try {
    const user = await userService.findUserById(id);
    if (!user || !token) {
      const error = new Error('User not found, invalid link');
      error.statusCodes = StatusCodes.BAD_REQUEST;
      return next(error);
    }
    const userUpdate = {
      name: user.name,
      username: user.username,
      password: user.password,
      email: user.email,
      status: 'active',
    };
    await userService.updateUser(id, userUpdate);

    return res.status(StatusCodes.OK).send('Email has been active');
  } catch (err) {
    const error = new Error('User not found, invalid link');
    error.statusCodes = StatusCodes.BAD_REQUEST;
    return next(error);
  }
};

module.exports = {
  login,
  register,
  verifyEmail,
};
