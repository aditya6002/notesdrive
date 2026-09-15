require("dotenv").config();
const nodeMailer = require("nodemailer");

// const transporter = nodeMailer.createTransport({
//     service : 'gmail',
//     auth :{
//         type: 'OAuth2',
//         user: process.env.EMAIL_USER,
//         clientId: process.env.CLIENT_ID,
//         clientSecret: process.env.CLIENT_SECRET,
//         refreshToken: process.env.REFRESH_TOKEN,
//     }
// });

/**
 * Working nodemailer
 */
const transporter = nodeMailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  secure: process.env.EMAIL_SECURE === "true",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

transporter.verify((error, success) => {
  if (error) {
    console.error("Error in email transporter: ", error);
  } else {
    console.log("Email transporter is ready to send emails!");
  }
});

const otpStore = new Map();

const generateOtp = ()=>{
  const otp = Math.floor(100000 + Math.random() * 900000);
  return otp;
}


/**
 * Generic email sender
 */

const sendEmail = async (to, subject, text, html) => {
  try {
    const info = await transporter.sendMail({
      from: `"BACKEND LEDGER" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      text,
      html,
    });
    console.log("Email sent: ", info.MessageId);
  } catch (err) {
    console.error("Error in sending email :", err);
  }
};

async function sendRegistrationEmail(userEmail, name) {
  const subject = "Welcome to NoteDrive! 🎉";

  const text = `Hello ${name},

Thank you for registering at NoteDrive.
We're excited to have you on board!

Best Regards,
NoteDrive Team
`;

  const html = `
  <div style="font-family: Arial, sans-serif; padding:20px; background:#f4f4f4;">
    <div style="max-width:600px; margin:auto; background:white; padding:20px; border-radius:10px;">
      
      <h2 style="color:#333;">Welcome to NoteDrive 🚀</h2>
      
      <p>Hello <b>${name}</b>,</p>
      
      <p>
        Thank you for registering with <b>NoteDrive</b>. 
        We are excited to have you as part of our community.
      </p>
      
      <p>
        You can now start using our platform to manage and track your backend operations efficiently.
      </p>

      <hr>

      <p style="color:gray; font-size:14px;">
        Best Regards,<br>
        <b>The NoteDrive Team</b>
      </p>

    </div>
  </div>
  `;

  await sendEmail(userEmail, subject, text, html);
}

/**
 * @description Send password reset email
 */
async function sendPasswordResetEmail(userEmail,name){
  const otp = generateOtp();
  otpStore.set(userEmail, otp); 
  console.log("Generated OTP:", otp);

  const subject = "Password Reset Request";
  const text = `Hello ${name},
  This is your otp for password reset: ${otp}
  We received a request to reset your password. If you did not make this request, please ignore this email.
  `;
  const html = `
    <div style="font-family: Arial, sans-serif; padding:20px; background:#f4f4f4;">
      <div style="max-width:600px; margin:auto; background:white; padding:20px; border-radius:10px;">
        <h2 style="color:#333;">Password Reset Request</h2>
        <p>Hello <b>${name}</b>,</p>
        <p>This is your OTP for password reset: <b>${otp}</b></p>
        <p>We received a request to reset your password. If you did not make this request, please ignore this email.</p>
        <p>Best Regards,<br><b>The NoteDrive Team</b></p>
      </div>
    </div>
  `;

  await sendEmail(userEmail, subject, text, html);
  return otp;
}

module.exports = {
  sendEmail,
  sendRegistrationEmail,
  sendPasswordResetEmail, 
  otpStore
};
