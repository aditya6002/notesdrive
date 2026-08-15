const { Resend } = require("resend");
require("dotenv").config();

const resend = new Resend(process.env.RESEND_API_KEY);
const from = process.env.EMAIL_FROM;

const sendEmail = async (email, subject, html, text) => {
  const { data, error } = await resend.emails.send({
    from,
    to: email,
    subject: subject,
    html: html,
    text: text,
  });

  if (error) {
    console.error("Error sending email:", error);
    process.exit(1);
  }

  return data;
};

module.exports = { sendEmail };
