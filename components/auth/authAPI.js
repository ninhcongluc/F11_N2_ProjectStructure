const express = require('express');

const authController = require('./authController');

const router = express.Router();

/**
 * @swagger
 * /login:
 *   post:
 *     summary: Login with username and password.
 *     tags:
 *      - Auth
 *     consumes:
 *       - application/x-www-form-urlencoded
 *     parameters:
 *       - name: username
 *         description: Username.
 *         in: formData
 *         required: true
 *         type: string
 *       - name: password
 *         description: Password.
 *         in: formData
 *         required: true
 *     responses:
 *       200:
 *         description: login
 */
router.post('/login', authController.login);

/**
 * @swagger
 * /register:
 *   post:
 *     summary: Register a new user.
 *     tags:
 *       - Auth
 *     consumes:
 *       - application/x-www-form-urlencoded
 *     parameters:
 *       - name: name
 *         description: Name
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
 *       - name: repeatPassword
 *         description: Repeat pass word.
 *         in: formData
 *         required: true
 *         type: string
 *       - name: email
 *         description: Email address.
 *         in: formData
 *         required: true
 *         type: string
 *
 *     responses:
 *       201:
 *         description: Register
 */
router.post('/register', authController.register);

/**
 * @swagger
 * /auth/verify:
 *   post:
 *     summary: Verify Email with Token
 *     tags:
 *       - Auth
 *     parameters:
 *      - in: formData
 *        name: id
 *        required: true
 *        description: The userId want to verify email
 *      - in: formData
 *        name: token
 *        required: true
 *        description: Token is sended to email
 *     responses:
 *       200:
 *         description: Email Verified.
 *       400:
 *         description:  ID or Token not found.
 *
 *
 */
router.post('/auth/verify', authController.verifyEmail);

/**
 * @swagger
 * /auth/forgot_pass:
 *   post:
 *     summary: click forgot pass and get token to the email address
 *     tags:
 *       - Auth
 *     parameters:
 *      - in: formData
 *        name: email
 *        required: true
 *        description: The email want to get token to reset password
 *     responses:
 *       200:
 *         description: Sended reset password link to email.
 *       400:
 *         description:  Can not send link to email.
 *
 *
 */
router.post('/auth/forgot_pass', authController.forgotPassword);

/**
 * @swagger
 * /auth/reset_pass/{token}:
 *   put:
 *     summary: Fill new password to reset password
 *     tags:
 *       - Auth
 *     parameters:
 *      - in: path
 *        name: token
 *        required: true
 *        description: The token is sended to email
 *      - in: formData
 *        name: newPassword
 *        required: true
 *        description: fill new password to reset
 *      - in: formData
 *        name: confirmPassword
 *        required: true
 *        description: fill confirm password
 *     responses:
 *       200:
 *         description: Reset password successfully.
 *       400:
 *         description: Bad request
 */
router.put('/auth/reset_pass/:token', authController.resetPassword);

module.exports = router;
