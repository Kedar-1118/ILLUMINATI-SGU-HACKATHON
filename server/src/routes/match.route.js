import express from "express";
import {
  extractGithubSkills,
  getMatchRepos,
} from "../controllers/match.controller.js";

const router = express.Router();

router.get("/extract-skills", extractGithubSkills);
router.get("/match-repos", getMatchRepos);

export default router;
