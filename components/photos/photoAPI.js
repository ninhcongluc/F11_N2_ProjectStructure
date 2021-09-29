const express = require('express');

const router = express.Router();
const upload = require('../../helpers/file');
const photoController = require('./photoController');
const authMiddleware = require('../auth/authMiddleware');

/**
 * @swagger
 * /photos:
 *   post:
 *     summary: Create a photo
 *     tags:
 *       - Photo
 *     consumes:
 *        - multipart/form-data
 *     parameters:
 *      - in: formData
 *        name: myFile
 *        type: file
 *        required: true
 *        description: Choose file to upload
 *     description: return message added photo successfully
 *     responses:
 *       200:
 *         description: Photo added successfully.
 *       400:
 *         description: Bad Request
 *
 */
router.post(
  '/photos',
  authMiddleware,
  upload.single('myFile'),
  photoController.addPhoto
);

/**
 * @swagger
 * /photos:
 *   get:
 *     summary: Get all of photos
 *     tags:
 *       - Photo
 *     description: Return list of photos
 *     responses:
 *       200:
 *         description: Get List of photo successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *       400:
 *           description: Bad request
 *
 */
router.get('/photos', authMiddleware, photoController.getPhotos);

/**
 * @swagger
 * /photos/{photoId}:
 *   get:
 *     summary: Get one photo by id
 *     tags:
 *       - Photo
 *     parameters:
 *      - in: path
 *        name: photoId
 *        required: true
 *        description: The Id of the photo to return
 *     description: Return photo object
 *     responses:
 *       200:
 *         description: Find successful.
 *       400:
 *         description: Invalid ID supplied
 *       404:
 *         description: Photo not found
 *
 *
 */
router.get('/photos/:id', authMiddleware, photoController.getPhotoById);

/**
 * @swagger
 * /photos/{photoId}:
 *   put:
 *     summary: Create a photo
 *     tags:
 *       - Photo
 *     consumes:
 *        - multipart/form-data
 *     parameters:
 *      - in: path
 *        name: photoId
 *        required: true
 *        description: Fill id to find photo
 *      - in: formData
 *        name: myFile
 *        type: file
 *        required: true
 *        description: Choose file to upload
 *     description: return message updated photo successfully
 *     responses:
 *       200:
 *         description: Photo updated successfully.
 *       400:
 *         description: Bad Request
 *
 */
router.put(
  '/photos/:id',
  authMiddleware,
  upload.single('myFile'),
  photoController.updatePhoto
);

/**
 * @swagger
 * /photos/{photoId}:
 *   delete:
 *     summary: Delete a photo by id
 *     tags:
 *       - Photo
 *     parameters:
 *      - in: path
 *        name: photoId
 *        required: true
 *        description: The Id of the photo to delete
 *     description: Return message deleted successfully
 *     responses:
 *       200:
 *         description: DELETE Successfully.
 *       400:
 *         description: Invalid ID supplied
 *       404:
 *         description: Photo not found
 *
 *
 */
router.delete('/photos/:id', authMiddleware, photoController.deletePhoto);

module.exports = router;
