import express from "express";
import { extractGithubSkills } from "../controllers/match.controller.js";

const router = express.Router();

router.get("/extract-skills", extractGithubSkills);

export default router;
