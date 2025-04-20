import express from "express";
import {
  getUserSkills,
  getMatchRepos,
} from "../controllers/match.controller.js";
import { verifyJWT } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.use(verifyJWT);

router.get("/extract-skills", getUserSkills);
router.post("/match-repos", getMatchRepos);

export default router;
