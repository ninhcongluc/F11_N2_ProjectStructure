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
 *       - User
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
 *       - User
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

/**
 * @swagger
 * /users/{userId}:
 *   get:
 *     summary: Get one user by id
 *     tags:
 *       - User
 *     parameters:
 *      - in: path
 *        name: userId
 *        required: true
 *        description: The Id of the user to return
 *     description: Return user object
 *     responses:
 *       200:
 *         description: Successfully.
 *       400:
 *         description: Invalid ID supplied
 *       404:
 *         description: User not found
 *
 *
 */
router.get('/users/:id', authMiddleware, userController.getUser);

/**
 * @swagger
 * /auth/update_profile:
 *   patch:
 *     summary: Update user profile
 *     tags:
 *       - User
 *     parameters:
 *      - in: formData
 *        name: name
 *        required: true
 *        description: The name want to edit
 *     description: Return message successful
 *     responses:
 *       200:
 *         description: Profile will be updated.
 *       400:
 *         description: Bad request
 */
router.patch(
  '/auth/update_profile',
  authMiddleware,
  userController.updateProfile
);

/**
 * @swagger
 * /auth/change_pass:
 *   patch:
 *     summary: Change password
 *     tags:
 *       - User
 *     parameters:
 *      - in: formData
 *        name: oldPassword
 *        required: true
 *        description: The old password
 *      - in: formData
 *        name: newPassword
 *        required: true
 *        description: The new password
 *      - in: formData
 *        name: confirmPassword
 *        required: true
 *        description: The confirm password
 *     description: Return message successful
 *     responses:
 *       200:
 *         description: Password has been changed successfully.
 *       400:
 *         description: Bad request
 */
router.patch(
  '/auth/change_pass',
  authMiddleware,
  userController.changePassword
);

// For testing purposes
router.get('/test/users', userController.getAllUsers);
router.post('/test/users', userController.createUser);

module.exports = router;
