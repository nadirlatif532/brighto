const nodemailer = require('nodemailer');
const keys = require('../config/keys');

module.exports = async (email, subject, body) => {
  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: keys.email,
      pass: keys.password
    }
  });

  let mailOptions = {
    from: keys.email,
    to: email,
    subject: subject,
    html: `${body}`
  };

  await transporter.sendMail(mailOptions);
};
