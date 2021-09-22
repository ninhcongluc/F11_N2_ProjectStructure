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
 *       - name: email
 *         description: Email address.
 *         in: formData
 *         required: true
 *         type: string
 *       - name: status
 *         description: Status.
 *         in: formData
 *         required: true
 *         type: string
 *
 *     responses:
 *       201:
 *         description: Register
 */
router.post('/register', authController.register);

module.exports = router;
