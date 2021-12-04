const nodemailer = require("nodemailer");

module.exports = async (email, subject, text) => {
  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      requireTLS: true,
      auth: {
        user: "akhmadsyaifudin2508@gmail.com",
        pass: "andinn25",
      },
    });

    await transporter.sendMail({
      from: "akhmadsyaifudin2508@gmail.com",
      to: email,
      subject: subject,
      text: text,
    });
    console.log("email send successfully");
  } catch (error) {
    console.log(error);
  }
};
