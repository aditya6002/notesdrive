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

/**
 * Generic email sender
 */

const sendEmail = async (to, subject, text, html) => {
  try {
    const info = await transporter.sendMail({
      from: `"NotesDrive Team" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      text,
      html,
    });
    console.log("Email sent: ", info.messageId);
  } catch (err) {
    console.error("Error in sending email :", err);
  }
};


/**
 * Send registration email to new users
 * @param {string} userEmail - The email address of the user
 * @param {string} name - The name of the user
 */
async function sendRegistrationEmail(userEmail, name) {
  const subject = "Welcome to NotesDrive! 🎉";

  const text = `Hello ${name},

        Thank you for registering at NotesDrive.
        We're excited to have you on board!

        Best Regards,
        NotesDrive Team
        `;

  const html = `
  <div style="font-family: Arial, sans-serif; padding:20px; background:#f4f4f4;">
    <div style="max-width:600px; margin:auto; background:white; padding:20px; border-radius:10px;">
      
      <h2 style="color:#333;">Welcome to NotesDrive 🚀</h2>
      
      <p>Hello <b>${name}</b>,</p>
      
      <p>
        Thank you for registering with <b>NotesDrive</b>. 
        We are excited to have you as part of our community.
      </p>
      
      <p>
        You can now start using our platform to manage and track your backend operations efficiently.
      </p>

      <hr>

      <p style="color:gray; font-size:14px;">
        Best Regards,<br>
        <b>The NotesDrive Team</b>
      </p>

    </div>
  </div>
  `;

  await sendEmail(userEmail, subject, text, html);
}

async function sendPasswordResetEmail(userEmail, name, resetLink) {
  const subject = "Password Reset Request for NotesDrive";

  const text = `Hello ${name},

We received a request to reset your password for your NotesDrive account.
If you did not make this request, please ignore this email.

To reset your password, please click the link below:
${resetLink}

Best Regards,
NotesDrive Team
`;

  const html = `
  <div style="font-family: Arial, sans-serif; padding:20px; background:#f4f4f4;">
    <div style="max-width:600px; margin:auto; background:white; padding:20px; border-radius:10px;">
      
      <h2 style="color:#333;">Password Reset Request</h2>
      
      <p>Hello <b>${name}</b>,</p>
      
      <p>
        We received a request to reset your password for your <b>NotesDrive</b> account.
        If you did not make this request, please ignore this email.
      </p>
      
      <p>
        To reset your password, please click the link below:
      </p>

      <a href="${resetLink}" style="display:inline-block; padding:10px 20px; background:#007BFF; color:white; text-decoration:none; border-radius:5px;">Reset Password</a>

      <hr>

      <p style="color:gray; font-size:14px;">
        Best Regards,<br>
        <b>The NotesDrive Team</b>
      </p>

    </div>
  </div>
  `;

  await sendEmail(userEmail, subject, text, html);
}

module.exports = {
  sendEmail,
  sendRegistrationEmail,
  sendPasswordResetEmail,
};
