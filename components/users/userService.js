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
// update user
const updateUser = (id, userUpdate) =>
  User.findOneAndUpdate({ _id: id }, userUpdate);

// find user by props
const findUser = (props, value) => User.findOne({ props: value });
module.exports = {
  findAllUsers,
  findUserById,
  addUser,
  updateUser,
  findUser,
};
