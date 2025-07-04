import nodemailer from "nodemailer";

const sendMail = async (to, subject, text) => {
  try {
    // You can use Gmail SMTP or other providers
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.SMTP_USER,   // e.g., your@gmail.com
        pass: process.env.SMTP_PASS,   // app password or real password
      },
    });

    const mailOptions = {
      from: process.env.SMTP_USER,
      to,
      subject,
      text,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent:", info.response);
  } catch (error) {
    console.error("Failed to send email:", error.message);
    throw new Error("Email sending failed");
  }
};

export default sendMail;
