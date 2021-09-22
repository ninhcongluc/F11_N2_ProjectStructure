const express = require('express');

const router = express.Router();
const userController = require('./userController');
const authMiddleware = require('../auth/authMiddleware');

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Retrieve a list of JSONPlaceholder users
 *     tags:
 *       - users
 *     description: Retrieve a list of users from JSONPlaceholder. Can be used to populate a list of fake users when prototyping or testing an API.
 *     responses:
 *       200:
 *         description: A list of users.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *
 */

router.get('/users', authMiddleware, userController.getAllUsers);

/**
 * @swagger
 * /users:
 *   post:
 *     summary: Create a user for application.
 *     tags:
 *       - users
 *     consumes:
 *       - application/x-www-form-urlencoded
 *     parameters:
 *       - name: name
 *         description: Name.
 *         in: formData
 *         required: true
 *         type: string
 *       - name: username
 *         description: Username.
 *         in: formData
 *         required: true
 *         type: string
 *       - name: password
 *         description: Password.
 *         in: formData
 *         required: true
 *         type: string
 *       - name: email
 *         description: Email address.
 *         in: formData
 *         required: true
 *         type: string
 *       - name: status
 *         description: Status
 *         in: formData
 *         required: true
 *         type: string
 *     responses:
 *       201:
 *         description: created
 */
router.post('/users', authMiddleware, userController.createUser);

router.get('/users/:id', authMiddleware, userController.getUser);

// For testing purposes
router.get('/test/users', userController.getAllUsers);
router.post('/test/users', userController.createUser);

module.exports = router;
