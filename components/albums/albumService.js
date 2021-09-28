const Album = require('./album');

const createAlbum = (name, description) => {
  const album = new Album({ name, description });
  return album.save();
};

const findAllAlbums = () => Album.find();

const findAlbumById = id => Album.findById(id);

const findAlbumAndDelete = id => Album.findOneAndDelete({ _id: id });

const findAlbumAndUpdate = (id, newAlbum) =>
  Album.findByIdAndUpdate({ _id: id }, newAlbum);

module.exports = {
  createAlbum,
  findAllAlbums,
  findAlbumById,
  findAlbumAndDelete,
  findAlbumAndUpdate,
};
