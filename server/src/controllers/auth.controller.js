import mongoose from "mongoose";
import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { AsyncHandler } from "../utils/wrapAsync.js";
import { logToAnalytics } from "../utils/logToAnalytics.js";

export const login = AsyncHandler(async (req, res) => {
  const { email, login, password } = req.body;

  if (!password || (!email && !login)) {
    throw new ApiError(400, "Email and password are required");
  }

  const user = await User.findOne({
    $or: [{ email }, { login }],
  });

  if (!user) {
    throw new ApiError(401, "Invalid email or password");
  }

  const isMatch = await user.verifyPassword(password);

  if (!isMatch) {
    throw new ApiError(401, "Invalid password");
  }

  const accessToken = user.generateAccessToken();

  const loggedInUser = await User.findById(user._id).select(
    "-password -__v -createdAt -updatedAt"
  );

  await logToAnalytics(
    "LoginSuccess",
    "User logged in successfully",
    user.email || user.login
  );

  const options = {
    httpOnly: true,
    secure: true,
  };

  res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .json(
      new ApiResponse(200, "Login successful", {
        user: loggedInUser,
        accessToken,
      })
    );
});

export const logout = AsyncHandler(async (req, res) => {
  const userId = req.user._id;

  if (!userId) {
    throw new ApiError(401, "Unauthorized access");
  }

  const user = await User.findById(userId);

  if (!user) {
    throw new ApiError(401, "Invalid access Token");
  }

  const options = {
    httpOnly: true,
    secure: true,
  };

  await logToAnalytics("Logout", "User logged out", user.email || user.login);

  res
    .status(200)
    .clearCookie("accessToken", options)
    .json(new ApiResponse(200, "Logout successful"));
});
