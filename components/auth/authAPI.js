const express = require('express');

const authController = require('./authController');

const router = express.Router();

/**
 * @swagger
 * /login:
 *   post:
 *     description: Create a user for application.
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

router.post('/register', (req, res) => {
  res.send('User register here');
});

module.exports = router;
