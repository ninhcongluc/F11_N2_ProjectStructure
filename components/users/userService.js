const User = require('./user');

// get all users
const findAllUsers = () => User.find();
// find user by id
const findUserById = id => User.findById(id);
// find User by Username
const findUserByUsername = username => User.findOne({ username });
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
const updateUserByUsername = (username, userUpdate) =>
  User.findOneAndUpdate({ username }, userUpdate);
// update user by id
const updateUserById = (id, userUpdate) =>
  User.findOneAndUpdate({ _id: id }, userUpdate);

// find user by props
const findUser = (props, value) => User.findOne({ props: value });

const addPhotoToUser = (userId, photo) =>
  User.findByIdAndUpdate(
    userId,
    { $push: { photos: photo.id } },
    { new: true, useFindAndModify: false }
  );

const addAlbumToUser = (userId, album) =>
  User.findByIdAndUpdate(
    userId,
    { $push: { albums: album.id } },
    { new: true, useFindAndModify: false }
  );
module.exports = {
  findAllUsers,
  findUserById,
  findUserByUsername,
  addUser,
  updateUserByUsername,
  updateUserById,
  findUser,
  addPhotoToUser,
  addAlbumToUser,
};
