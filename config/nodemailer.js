const nodemailer = require("nodemailer");

const verifyEmail = (usermail) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      // user: 'forsmmpanel@gmail.com',
      // pass: 'noymjrhbxjwiclin'
      user: "chatapp799@gmail.com",
      pass: "tayuimoyxyvqntgi",
    },
  });

  transporter
    .sendMail({
      to: usermail,
      from: "chatapp799@gmail.com",
      subject: "Verify your email",
      text: "also this ?",
      html: `<p>Click the following link to verify your email: <a href="http://localhost:8800/verify">Verify Email</a></p>`,
    })
    .then((info) => {
      console.log(info.response);
      console.log("mail send");
    })
    .catch((err) => {
      console.log(err);
    });
  return usermail;
};

module.exports = verifyEmail;
