const nodemailer = require('nodemailer');
const schedule = require('node-schedule');
const User = require('../Modals/user');
require('dotenv').config();

const transporter = nodemailer.createTransport({
  host: process.env.HOST,
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASS,
  },
  debug: true,
});

const sendEmailToUser = (user) => {
  const mailOptions = {
    from: process.env.EMAIL,
    to: user.emailId,
    subject: 'Check out what\'s new!',
    html: `<p>Hello ${user.userName},</p>
           <p>Something new is there, go and check it out!</p>
           <p><a href="${process.env.CLIENT_URL}">Visit our site</a></p>`
  };

  return transporter.sendMail(mailOptions)
    .then(info => {
      console.log(`Email sent to ${user.emailId}:`, info.response);
    })
    .catch(error => {
      console.error(`Error sending email to ${user.emailId}:`, error);
    });
};

const sendEmailToAllUsers = async () => {
  try {
    const users = await User.find();
    const emailPromises = users.map(user => sendEmailToUser(user));
    await Promise.allSettled(emailPromises);
  } catch (error) {
    console.error('Error retrieving users or sending emails:', error);
  }
};

const scheduleEmailJob = () => {
  schedule.scheduleJob('0 20 * * 0', () => {
    console.log('Running scheduled job to send emails to all users');
    sendEmailToAllUsers();
  });
};

module.exports = scheduleEmailJob;
