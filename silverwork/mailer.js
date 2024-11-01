const nodeMailer = require("nodemailer");

module.exports = async (name, email, subject, message) => {
  const transporter = await nodeMailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: process.env.REACT_APP_GMAIL_ADDRESS,
      pass: process.env.REACT_APP_GMAIL_PASSWORD,
    },
  });

  const mailOption = {
    from: `${name} <${email}>`, // Display name with email
    to: process.env.REACT_APP_GMAIL_ADDRESS,
    subject: subject,
    html: `
      <pre>${message}</pre> <!-- Use <pre> for formatted multiline text -->
    `,
  };

  try {
    await transporter.sendMail(mailOption);
    return "success";
  } catch (error) {
    console.error("Error sending email:", error);
    return error;
  }
};
