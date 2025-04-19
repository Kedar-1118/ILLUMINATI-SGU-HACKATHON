import mongoose from "mongoose";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { AsyncHandler } from "../utils/wrapAsync.js";
import { fetchGitHubRepos } from "../utils/skillExtractor.js";
import { getGitHubQueryFromSkills } from "../utils/getGitHubQueryFromGroq.js";
import { getGitHubReposFromSkills } from "../utils/getGitHubReposFromSkills.js";

export const extractGithubSkills = AsyncHandler(async (req, res) => {
  const userId = req.user._id;

  const username = await User.findById(userId).select("login").lean();

  if (!username) {
    return res.status(400).json(new ApiError(400, "Username is required"));
  }

  try {
    const repos = await fetchGitHubRepos(username);

    // Flattening and combining languages and skills from all repos
    const languages = repos.flatMap((repo) => repo.languages);
    const skills = repos.flatMap((repo) => repo.skills);

    // Remove duplicates using Set
    const distinctLanguages = [...new Set(languages)];
    const distinctSkills = [...new Set(skills)];

    return res.status(200).json(
      new ApiResponse(200, "Skills extracted successfully", {
        languages: distinctLanguages,
        skills: distinctSkills,
      })
    );
  } catch (error) {
    return res
      .status(500)
      .json(new ApiError(500, "Error extracting skills", error));
  }
});

export const getMatchRepos = AsyncHandler(async (req, res) => {
  const { count = 10 } = req.query;

  const userId = req.user._id;
  const username = await User.findById(userId).select("login").lean();

  if (!username) {
    return res.status(400).json(new ApiError(400, "Username is required"));
  }

  try {
    const repos = await fetchGitHubRepos(username);

    const languages = repos.flatMap((repo) => repo.languages || []);
    const skills = repos.flatMap((repo) => repo.skills || []);

    const distinctLanguages = [...new Set(languages)];
    const distinctSkills = [...new Set(skills)];

    const skillsInput = [...distinctLanguages, ...distinctSkills].join(", ");

    const generatedQuery = await getGitHubQueryFromSkills(skillsInput);

    if (!generatedQuery) {
      return res
        .status(500)
        .json(new ApiError(500, "Failed to generate query from Groq"));
    }

    const matchedRepos = await getGitHubReposFromSkills(
      generatedQuery,
      count,
      distinctSkills,
      distinctLanguages
    );

    const data = {
      userSkills: distinctSkills,
      userLanguages: distinctLanguages,
      matchedRepos,
    };

    return res
      .status(200)
      .json(new ApiResponse(200, "Repos matched successfully", data));
  } catch (error) {
    console.error("Error matching repos:", error.message);
    return res
      .status(500)
      .json(new ApiError(500, "Error extracting or matching skills", error));
  }
});
