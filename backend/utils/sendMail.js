import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: 465,
  secure: true,
  auth: {
    user: process.env.SMTP_USERNAME,
    pass: process.env.SMTP_PASSWORD,
  },
});

const sendMail = async (email, subject, message, plainText) => {
  await transporter.sendMail({
    from: `"Zep Basket" <${process.env.SMTP_USERNAME}>`,
    to: email,
    subject,
    text: "",
    html: message,
  });
};

export default sendMail;
