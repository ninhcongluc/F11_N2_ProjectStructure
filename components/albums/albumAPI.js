const express = require('express');

const router = express.Router();
const albumController = require('./albumController');
const authMiddleware = require('../auth/authMiddleware');

/**
 * @swagger
 * /albums:
 *   post:
 *     summary: Create new album
 *     tags:
 *       - Album
 *     parameters:
 *      - in: formData
 *        name: name
 *        required: true
 *        description: The name of the album to create
 *      - in: formData
 *        name: description
 *        required: true
 *        description: The description of the album to create
 *     description: return message added successfully
 *     responses:
 *       200:
 *         description: Album Added Successfully.
 *       400:
 *         description: Bad Request
 */
router.post('/albums', authMiddleware, albumController.createAlbum);

/**
 * @swagger
 * /albums:
 *   get:
 *     summary: Get all of albums
 *     tags:
 *       - Album
 *     description: Return list of albums
 *     responses:
 *       200:
 *         description: Get List of user successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *       400:
 *           description: Bad request
 *
 */
router.get('/albums', authMiddleware, albumController.getAllAlbum);

/**
 * @swagger
 * /albums/{albumId}:
 *   get:
 *     summary: Get one album by id
 *     tags:
 *       - Album
 *     parameters:
 *      - in: path
 *        name: albumId
 *        required: true
 *        description: The Id of the album to return
 *     description: Return album object
 *     responses:
 *       200:
 *         description: Successfully.
 *       400:
 *         description: Invalid ID supplied
 *       404:
 *         description: Album not found
 *
 *
 */
router.get('/albums/:id', authMiddleware, albumController.getAlbumById);

/**
 * @swagger
 * /albums/{albumId}:
 *   delete:
 *     summary: Delete a album by id
 *     tags:
 *       - Album
 *     parameters:
 *      - in: path
 *        name: albumId
 *        required: true
 *        description: The Id of the album to delete
 *     description: Return album object
 *     responses:
 *       200:
 *         description: DELETE Successfully.
 *       400:
 *         description: Invalid ID supplied
 *       404:
 *         description: Album not found
 *
 *
 */
router.delete('/albums/:id', authMiddleware, albumController.deleteAlbumById);

/**
 * @swagger
 * /albums/{albumId}:
 *   put:
 *     summary: Update Album by Id
 *     tags:
 *       - Album
 *     parameters:
 *      - in: path
 *        name: albumId
 *        required: true
 *        description: The Id of the album to update
 *      - in: formData
 *        name: name
 *        required: true
 *        description: The name of the album to update
 *      - in: formData
 *        name: description
 *        required: true
 *        description: The description of the album to update
 *      - in: formData
 *        name: status
 *        required: true
 *        description: The status of the album to update
 *     description: return updated successfully
 *     responses:
 *       200:
 *         description: UPDATED Successfully.
 *       400:
 *         description: Invalid ID supplied
 *       404:
 *         description: Album not found
 *
 *
 */
router.put('/albums/:id', authMiddleware, albumController.updateAlbum);

module.exports = router;
