import nodemailer from "nodemailer";
import { ApiError } from "../utils/ApiError.js";
import dotenv from "dotenv";

dotenv.config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

/**
 * Sends an email using the configured transporter
 * @param {string} to - Recipient email address
 * @param {string} subject - Email subject line
 * @param {string} text - Plain text fallback content
 * @param {string} html - Optional HTML formatted content
 */
export const sendMail = async (to, subject, text, html = "") => {
  const mailOptions = {
    from: `"App Support" <${process.env.EMAIL_USER}>`,
    to,
    subject,
    text,
    ...(html && { html }), 
  };

  try {
    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error("Error sending email:", error);
    throw new ApiError(500, "Failed to send email");
  }
};
