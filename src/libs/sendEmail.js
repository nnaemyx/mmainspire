// sendEmail.js
const nodemailer = require("nodemailer");

// Create a Nodemailer transporter
const transporter = nodemailer.createTransport({
  host: "sandbox.smtp.mailtrap.io",
  port: 2525,
  secure: false,
  auth: {
    user: "3dfbcba61f765d",
    pass: "86cfdd8106b7b1",
  },
  tls: {
    rejectUnauthorized: false, // Allow self-signed certificates
  },
});

// Function to send a password reset email
const sendPasswordResetEmail = async (email, resetToken) => {
  // Create a URL for the reset password link
  const resetPasswordLink = `http://localhost:3000/authentication/ResetPassword?token=${resetToken}`;

  // Email content
  const mailOptions = {
    from: "edehjohnpaul@example.com",
    to: email,
    subject: "Password Reset",
    html: `<p>You have requested to reset your password. Click the following link to reset it:</p>
           <a href="${resetPasswordLink}">Reset Password</a>`,
  };

  try {
    // Send the email
    const info = await transporter.sendMail(mailOptions);
    console.log(`Password reset email sent to: ${email}`);
    return info;
  } catch (error) {
    console.error("Error sending password reset email:", error);
    throw error;
  }
};

module.exports = sendPasswordResetEmail;
