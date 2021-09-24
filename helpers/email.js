const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'hotmail',
  auth: {
    user: 'ninhconglucit@outlook.com',
    pass: 'ninhcongluc1',
  },
});

module.exports = transporter;
