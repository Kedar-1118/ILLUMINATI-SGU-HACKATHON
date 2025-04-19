import mongoose, { Schema } from "mongoose";

const otpSchema = new Schema(
  {
    identifier: {
      type: String,
      required: true,
      lowercase: true,
    },
    otp: {
      type: String,
      required: true,
    },
    expiresAt: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const OTP = mongoose.model("OTP", otpSchema);
