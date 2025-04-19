import express from "express";
import passport from "passport";
import { login, logout } from "../controllers/auth.controller.js";
import { verifyJWT } from "../middlewares/authMiddleware.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const router = express.Router();

router.get(
  "/github",
  passport.authenticate("github", { scope: ["user:email"] })
);

router.get(
  "/github/callback",
  passport.authenticate("github", { failureRedirect: "/" }),
  (req, res) => {
    res.status(200).json(new ApiResponse(200, "Login successful", req.user));
  }
);

router.post("/login", login);

// Secure routes
router.post("/logout", verifyJWT, logout);

export default router;
