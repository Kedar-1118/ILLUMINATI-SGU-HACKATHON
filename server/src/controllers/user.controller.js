import mongoose from "mongoose";
import { User } from "../models/user.model.js";
import { OTP } from "../models/otp.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { AsyncHandler } from "../utils/wrapAsync.js";
import { sendMail } from "../utils/sendMail.js";
import { generateOTP } from "../utils/generateOTP.js";
import { logToAnalytics } from "../utils/logToAnalytics.js";

export const sendOTP = AsyncHandler(async (req, res) => {
  const { email, login } = req.body;

  if (!(email || login)) {
    throw new ApiError(400, "Email or username is required");
  }

  const user = await User.findOne({
    $or: [{ email }, { login }],
  });

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  const otp = generateOTP(6);
  const expiresAt = new Date(Date.now() + 5 * 60 * 1000); // OTP valid for 5 minutes

  const otpEntry = await OTP.create({
    identifier: email || login,
    otp,
    expiresAt,
  });

  const subject = "🔐 Your One-Time Password (OTP) - Action Required";

  const messageText = `Hello ${user.name || user.login},

You requested a one-time password (OTP) to proceed with your account.

✅ OTP: ${otp}
⏳ Valid for: 5 minutes

If you did not request this, please ignore this email or contact support.

Stay secure,
Team`;

  const messageHTML = `
  <div style="font-family: Arial, sans-serif; color: #333;">
    <h2>🔐 Your OTP Code</h2>
    <p>Hello <strong>${user.name || user.login}</strong>,</p>
    <p>You requested a one-time password (OTP) to proceed with your account.</p>
    <p><strong style="font-size: 18px;">OTP: ${otp}</strong></p>
    <p><em>⏳ This code is valid for 5 minutes only.</em></p>
    <br />
    <p>If you did not request this, please ignore this email or reach out to our support team.</p>
    <p>Stay secure,<br/>Team</p>
  </div>
`;

  await sendMail(user.email, subject, messageText, messageHTML);

  await logToAnalytics(
    "OTPRequest",
    "OTP sent successfully",
    user.login,
    `OTP sent to ${email || login}`
  );

  res.status(200).json(
    new ApiResponse(200, "OTP sent successfully", {
      identifier: email || login,
      expiresAt,
    })
  );
});

export const verifyOTP = AsyncHandler(async (req, res) => {
  const { email, login, otp, password } = req.body;

  if (!(email || login)) {
    throw new ApiError(400, "Email or username is required");
  }

  if (!otp) {
    throw new ApiError(400, "OTP is required");
  }

  const user = await User.findOne({
    $or: [{ email }, { login }],
  });

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  const otpEntry = await OTP.findOne({
    identifier: email || login,
    otp,
  });

  if (!otpEntry) {
    throw new ApiError(400, "Invalid OTP");
  }

  if (otpEntry.expiresAt < new Date()) {
    throw new ApiError(400, "OTP expired");
  }

  await OTP.deleteOne({ _id: otpEntry._id });

  if (password) {
    user.password = password;
    await user.save();
  }

  const accessToken = user.generateAccessToken();

  await logToAnalytics(
    "OTPVerify",
    "OTP verified successfully",
    user.login,
    `Password reset for ${user.login}`
  );

  res.status(200).json(
    new ApiResponse(200, "OTP verified successfully", {
      accessToken,
      user: {
        _id: user._id,
        email: user.email,
        login: user.login,
        avatar_url: user.avatar_url,
        bio: user.bio,
        location: user.location,
      },
    })
  );
});
