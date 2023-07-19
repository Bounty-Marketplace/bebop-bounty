require('dotenv').config();
const nodemailer = require('nodemailer');
const userModel = require('../models/user.model');

module.exports.createUser = (req, res) => {
  userModel.createUser(req.body, (err) => {
    if (err) {
      console.log(err);
      res.sendStatus(500);
    } else {
      res.status(201).send('User created');
    }
  });
};
module.exports.getUser = (req, res) => {
  userModel.getUser(req.params.id, req.query.auth, (err, result) => {
    if (err) {
      console.log(err);
      res.sendStatus(500);
    } else {
      res.status(200).send(result.rows);
    }
  });
};
module.exports.updateUser = async (req, res) => {
  const userID = req.params.user_id;
  const user = req.body;
  try {
    await userModel.updateUser(userID, user);
    res.status(200).send('User updated');
  } catch (err) {
    console.error('Query failed: update user', err.message);
    res.sendStatus(400);
  }
};
module.exports.sendEmail = (req, res) => {
  const { userEmail, subject, message } = req.body;
  console.log('sendEmail req.body: ', req.body);
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.OUR_EMAIL_ADDRESS,
      pass: process.env.OUR_EMAIL_PASSWORD,
    },
  });
  const mailOptions = {
    from: process.env.OUR_EMAIL_ADDRESS,
    to: userEmail,
    subject,
    html: message,
  };
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log('Err in sending email: ', error);
      res.status(500).send('Failed to send email');
    } else {
      console.log(`Email sent: ${info.response}`);
      res.status(201).send('Email sent successfully');
    }
  });
};
