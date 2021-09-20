const { User } = require('./user');

// get all users
const findAllUsers = () => User.find();
// find user by id
const findUserById = id => User.findById(id);
// add user
const addUser = (name, username, password, email, status) => {
  const user = new User({
    name,
    username,
    password,
    email,
    status,
  });
  return user.save();
};

module.exports = {
  findAllUsers,
  findUserById,
  addUser,
};
