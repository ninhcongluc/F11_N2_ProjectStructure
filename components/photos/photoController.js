const { StatusCodes } = require('http-status-codes');
const photoService = require('./photoService');
const userService = require('../users/userService');

const addPhoto = async (req, res, next) => {
  if (!req.file) {
    const error = new Error('Upload File Error');
    error.statusCode = StatusCodes.BAD_REQUEST;
    return next(error);
  }
  const name = req.file.filename;
  const link = req.file.path;
  const userId = req.user.id;
  try {
    const photo = await photoService.addPhoto(name, link, userId);
    await userService.addPhotoToUser(userId, photo);

    return res
      .status(StatusCodes.OK)
      .send(`Photo with name: ${name} is added successfully`);
  } catch (error) {
    return res.status(StatusCodes.BAD_REQUEST).send(error);
  }
};

const getPhotos = async (req, res) => {
  try {
    const photos = await photoService.findAllPhotos();
    res.status(StatusCodes.OK).send(photos);
  } catch (error) {
    res.status(StatusCodes.BAD_REQUEST).send(error);
  }
};

const getPhotoById = async (req, res) => {
  const { id } = req.params;
  try {
    const photo = await photoService.findPhotoById(id);
    res.status(StatusCodes.OK).send(photo);
  } catch (error) {
    res.status(StatusCodes.BAD_REQUEST).send(error);
  }
};

const updatePhoto = async (req, res, next) => {
  if (!req.file) {
    const error = new Error('Upload File Error');
    error.statusCode = StatusCodes.BAD_REQUEST;
    return next(error);
  }
  const name = req.file.filename;
  const link = req.file.path;
  const { id } = req.params;
  try {
    await photoService.findPhotoAndUpdate(id, { name, link });
    return res.status(StatusCodes.OK).send(`Photo Updated Successfully`);
  } catch (error) {
    return res.status(StatusCodes.BAD_REQUEST).send(`Updated Fail
    Error Message: ${error.message}`);
  }
};

const deletePhoto = async (req, res) => {
  const { id } = req.params;
  try {
    const photo = await photoService.findPhotoAndDelete(id);
    return res
      .status(StatusCodes.OK)
      .send(`Photo ${photo.name} deleted successfully`);
  } catch (error) {
    return res.status(StatusCodes.BAD_REQUEST).send(`Deleted Fail
    Error Message: ${error.message}`);
  }
};

module.exports = {
  addPhoto,
  getPhotos,
  getPhotoById,
  updatePhoto,
  deletePhoto,
};
