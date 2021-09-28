const express = require('express');

const router = express.Router();
const albumController = require('./albumController');

// create album
router.post('/album', albumController.createAlbum);

// get album
router.get('/album', albumController.getAllAlbum);

// get album by id
router.get('/album/:id', albumController.getAlbumById);

// delete album by id
router.delete('/album/:id', albumController.deleteAlbumById);

// update album
router.put('/album/:id', albumController.updateAlbum);

module.exports = router;
