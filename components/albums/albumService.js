const Album = require('./album');

const createAlbum = (name, description) => {
  const album = new Album({ name, description });
  return album.save();
};

const findAllAlbums = () => Album.find();

const findAlbumById = id => Album.findById(id);

const findAlbumAndDelete = id => Album.findOneAndDelete({ _id: id });

const addUserToAlbum = (albumId, userId) =>
  Album.findByIdAndUpdate(
    albumId,
    { $push: { users: userId } },
    { new: true, useFindAndModify: false }
  );
const findAlbumAndUpdate = (id, newAlbum) =>
  Album.findByIdAndUpdate({ _id: id }, newAlbum);

module.exports = {
  createAlbum,
  findAllAlbums,
  findAlbumById,
  findAlbumAndDelete,
  findAlbumAndUpdate,
  addUserToAlbum,
};
