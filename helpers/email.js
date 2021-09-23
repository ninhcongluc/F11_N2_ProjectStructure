const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'hotmail',
  auth: {
    user: 'ninhconglucit@outlook.com',
    pass: 'ninhcongluc1',
  },
});

// const options = {
//   from : "ninhconglucit@outlook.com"
//   to : "ninhconglucit@gmail.com",
//   subject: ""
// }

// const sendEmail = transporter.sendEmail(options, )

module.exports = transporter;
