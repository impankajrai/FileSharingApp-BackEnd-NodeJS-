const nodemailer = require('nodemailer');

const sendEmail = async({ from, to, subject, text, html }) => {

  let transport = nodemailer.createTransport({
    host: "host",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: "email",
      pass: "pass",
    }

    });

  let info = await transport.sendMail({
    from: `ShareByLink <${from}>`, // sender address
    to: to,
    subject: subject,
    text: text,
    html: html,
  });



}

module.exports = sendEmail;
