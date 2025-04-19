import mongoose from "mongoose";
import { User } from "../models/user.model.js";
import { OTP } from "../models/otp.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { AsyncHandler } from "../utils/wrapAsync.js";
import { sendMail } from "../utils/sendMail.js";
import { generateOTP } from "../utils/generateOTP.js";

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

  const subject = "Your OTP Code";
  const message = `Your OTP code is ${otp}. It is valid for 5 minutes.`;

  await sendMail(email, subject, message);

  res.status(200).json(
    new ApiResponse(200, "OTP sent successfully", {
      identifier: email || username,
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
