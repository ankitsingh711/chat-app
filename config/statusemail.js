const nodemailer = require("nodemailer");

const statusemail = (usermail, status) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "chat-app@gmail.com",
      pass: "efcjdepnofhkyydp",
    },
  });

  transporter
    .sendMail({
      to: usermail,
      from: "chat-app@gmail.com",
      subject: "Verify your email",
      text: "also this ?",
      html: `<h1>Your Email Status is :- ${status}</h1>`,
    })
    .then((info) => {
      console.log(info.response);
      console.log("mail send");
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports = statusemail;
