const jwt = require('jsonwebtoken');
const ls = require('local-storage');
const bcrypt = require('bcryptjs');
const { StatusCodes } = require('http-status-codes');

const userService = require('../users/userService');
const authValidation = require('./authValidation');
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
    err.statusCode = StatusCodes.BAD_REQUEST;
    return next(err);
  }
  // compare password <Hash password later>
  const isPassword = await bcrypt.compare(password, user.password);
  if (!isPassword) {
    const err = new Error(`Incorrect Password`);
    err.statusCode = StatusCodes.BAD_REQUEST;
    return next(err);
  }
  // create token
  const token = jwt.sign({ username }, process.env.SECRET_KEY, {
    expiresIn: '1h',
  });
  ls.set('token', token);
  return res.json({ token });
};

const register = async (req, res, next) => {
  const users = await userService.findAllUsers();
  const { name, username, password, repeatPassword, email } = req.body;
  const isValidUser = await authValidation.registerSchema.validate({
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
    error.statusCode = StatusCodes.BAD_REQUEST;
    return next(error);
  }
  if (isEmailExisted) {
    const error = new Error(`Email ${email} has already been registered`);
    error.statusCode = StatusCodes.BAD_REQUEST;
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
        expiresIn: '1h',
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
    } catch (error) {
      return res.status(StatusCodes.BAD_REQUEST).send(error);
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
      error.statusCode = StatusCodes.BAD_REQUEST;
      return next(error);
    }
    const userUpdate = {
      name: user.name,
      username: user.username,
      password: user.password,
      email: user.email,
      status: 'active',
    };
    await userService.updateUserById(id, userUpdate);

    return res.status(StatusCodes.OK).send('Email has been active');
  } catch (err) {
    const error = new Error('User not found, invalid link');
    error.statusCode = StatusCodes.BAD_REQUEST;
    return next(error);
  }
};

const forgotPassword = async (req, res) => {
  const { email } = req.body;
  const users = await userService.findAllUsers();
  const user = users.find(u => u.email === email);

  const token = jwt.sign(
    {
      id: user.id,
      name: user.name,
      username: user.username,
      email: user.email,
    },
    process.env.SECRET_KEY,
    {
      expiresIn: '1h',
    }
  );
  ls.set('token', token);
  const options = {
    from: `${process.env.USER}`,
    to: `ninhconglucit@gmail.com, ${email}`,
    subject: 'Reset Password',
    html: `<b>http://localhost:${process.env.PORT}/auth/reset_pass/${token}</b>`,
  };
  try {
    await transporter.sendMail(options);
  } catch (error) {
    return res.status(StatusCodes.BAD_REQUEST).send(error);
  }
  return res.status(StatusCodes.OK).json({
    content: 'Please check mail to reset password',
    Token: token,
  });
};

const resetPassword = async (req, res) => {
  const { token } = req.params;
  const { newPassword, confirmPassword } = req.body;
  const isValidPass = await authValidation.resetPassSchema.validate({
    newPassword,
    confirmPassword,
  });
  if (isValidPass.error) {
    return res.status(StatusCodes.BAD_REQUEST).send(isValidPass.error.message);
  }
  const salt = await bcrypt.genSalt(saltRounds);
  const hashPassword = await bcrypt.hash(newPassword, salt);
  try {
    const decoded = await jwt.verify(token, process.env.SECRET_KEY);
    const user = {
      name: decoded.name,
      username: decoded.username,
      password: hashPassword,
      email: decoded.email,
    };
    await userService.updateUserById(decoded.id, user);
    return res.status(StatusCodes.OK).send('Updated password successfully');
  } catch (error) {
    return res.status(StatusCodes.BAD_REQUEST).send(error);
  }
};

const updateProfile = async (req, res) => {
  const { username } = req.user;
  // const { name } = req.body;
  try {
    await userService.updateUserByUsername(username, req.body);
    res.status(StatusCodes.OK).send('Your profile will be updated');
  } catch (error) {
    res.send(error);
  }
};

const changePassword = async (req, res, next) => {
  const { username } = req.user;
  const { oldPassword, newPassword, confirmPassword } = req.body;
  try {
    const user = await userService.findUserByUsername(username);
    const isCorrect = await bcrypt.compare(oldPassword, user.password);
    if (!isCorrect) {
      const err = new Error(`Password Wrong !`);
      err.statusCode = StatusCodes.BAD_REQUEST;
      return next(err);
    }
    const isValidatePass = authValidation.resetPassSchema.validate({
      newPassword,
      confirmPassword,
    });
    if (isValidatePass.error) {
      return res.send({ error: isValidatePass.error.message });
    }
    // hash password
    const salt = await bcrypt.genSalt(saltRounds);
    const hashPassword = await bcrypt.hash(newPassword, salt);
    await userService.updateUserByUsername(username, {
      password: hashPassword,
    });
    res.status(StatusCodes.OK).send('Password has been changed');
  } catch (error) {
    res.send(error);
  }
};

module.exports = {
  login,
  register,
  verifyEmail,
  forgotPassword,
  resetPassword,
  updateProfile,
  changePassword,
};
