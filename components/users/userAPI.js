const express = require('express');

const router = express.Router();
const userController = require('./userController');

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Retrieve a list of JSONPlaceholder users
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

router.get('/users', userController.getAllUsers);

/**
 * @swagger
 * /users/:id:
 *   get:
 *     summary: Retrieve a  user by search with id
 *     description: Get a user by userID.
 *     responses:
 *       200:
 *         description: Get A User By ID.
 *         content:
 *           application/json:
 */
router.get('/users/:id', userController.getUser);

/**
 * @swagger
 * /users:
 *   post:
 *     summary: Create a JSONPlaceholder user.
 *     responses:
 *       201:
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:

*/
router.post('/users', userController.createUser);

module.exports = router;
