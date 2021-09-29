const Photo = require('./photo');

const addPhoto = (name, link, userId) => {
  const photo = new Photo({ name, link, userId });
  return photo.save();
};

const findAllPhotos = () => Photo.find();

const findPhotoById = id => Photo.findById(id);

const findPhotoAndDelete = id => Photo.findOneAndDelete({ _id: id });

const findPhotoAndUpdate = (id, photos) =>
  Photo.findByIdAndUpdate({ _id: id }, photos);

module.exports = {
  addPhoto,
  findAllPhotos,
  findPhotoAndUpdate,
  findPhotoAndDelete,
  findPhotoById,
};
