import express from "express";
import {
  extractGithubSkills,
  getMatchRepos,
} from "../controllers/match.controller.js";
import { verifyJWT } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.use(verifyJWT);

router.get("/extract-skills", extractGithubSkills);
router.get("/match-repos", getMatchRepos);

export default router;
