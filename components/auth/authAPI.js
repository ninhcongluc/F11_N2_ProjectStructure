const express = require('express');

const authController = require('./authController');
const authMiddleware = require('./authMiddleware');

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

router.post('/auth/verify', authController.verifyEmail);

router.post('/auth/forgot_pass', authController.forgotPassword);

router.put('/auth/reset_pass/:token', authController.resetPassword);

router.patch(
  '/auth/update_profile',
  authMiddleware,
  authController.updateProfile
);

module.exports = router;
