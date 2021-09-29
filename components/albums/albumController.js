const { StatusCodes } = require('http-status-codes');

const albumService = require('./albumService');
const albumValidation = require('./albumValidation');
const userService = require('../users/userService');

const createAlbum = async (req, res) => {
  const { name, description } = req.body;
  const userId = req.user.id;
  const isValid = await albumValidation.validate({
    name,
    description,
  });
  if (isValid.error) {
    return res.status(StatusCodes.BAD_REQUEST).send(isValid.error.message);
  }
  try {
    const album = await albumService.createAlbum(name, description);
    await userService.addAlbumToUser(userId, album);
    return res
      .status(StatusCodes.OK)
      .send(`Album with name: ${name} is added successfully`);
  } catch (error) {
    return res.status(StatusCodes.BAD_REQUEST).send(error);
  }
};

const getAllAlbum = async (req, res) => {
  try {
    const albums = await albumService.findAllAlbums();
    res.status(StatusCodes.OK).send(albums);
  } catch (error) {
    res.status(StatusCodes.BAD_REQUEST).send(error);
  }
};

const getAlbumById = async (req, res) => {
  const { id } = req.params;
  try {
    const album = await albumService.findAlbumById(id);
    res.status(StatusCodes.OK).send(album);
  } catch (error) {
    res.status(StatusCodes.BAD_REQUEST).send(`Album Not Found
    Error Message: ${error.message}`);
  }
};

const deleteAlbumById = async (req, res) => {
  const { id } = req.params;
  try {
    const album = await albumService.findAlbumAndDelete(id);
    res.status(StatusCodes.OK).send(`Album ${album.name} deleted`);
  } catch (error) {
    res.status(StatusCodes.BAD_REQUEST).send(`Remove Fail
    Error Message: ${error.message}`);
  }
};

const updateAlbum = async (req, res) => {
  const { id } = req.params;
  const { name, description, status } = req.body;
  const isValid = await albumValidation.validate({ name, description, status });
  if (isValid.error) {
    return res.status(StatusCodes.BAD_REQUEST).send(isValid.error.message);
  }

  try {
    await albumService.findAlbumAndUpdate(id, {
      name,
      description,
      status,
    });
    return res.status(StatusCodes.OK).send(`Updated Successfully`);
  } catch (error) {
    return res.status(StatusCodes.BAD_REQUEST).send(`Updated Fail
    Error Message: ${error.message}`);
  }
};

module.exports = {
  createAlbum,
  getAllAlbum,
  getAlbumById,
  deleteAlbumById,
  updateAlbum,
};
