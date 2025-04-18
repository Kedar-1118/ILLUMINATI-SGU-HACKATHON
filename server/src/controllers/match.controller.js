import mongoose from "mongoose";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { AsyncHandler } from "../utils/wrapAsync.js";
import { fetchGitHubRepos } from "../utils/skillExtractor.js";
import { getGitHubQueryFromSkills } from "../utils/getGitHubQueryFromGroq.js";
import { getGitHubReposFromSkills } from "../utils/getGitHubReposFromSkills.js";

export const extractGithubSkills = AsyncHandler(async (req, res) => {
  const { username } = req.query;

  if (!username) {
    return res.status(400).json(new ApiError(400, "Username is required"));
  }

  console.log("Fetching GitHub repos for user:", username);

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
  const { username } = req.query;

  if (!username) {
    return res.status(400).json(new ApiError(400, "Username is required"));
  }

  console.log("📥 Fetching GitHub repos for user:", username);

  try {
    const repos = await fetchGitHubRepos(username);

    // Extract languages & skills from user’s GitHub profile data
    const languages = repos.flatMap((repo) => repo.languages || []);
    const skills = repos.flatMap((repo) => repo.skills || []);

    // Remove duplicates
    const distinctLanguages = [...new Set(languages)];
    const distinctSkills = [...new Set(skills)];

    // Merge into a skillsInput string for Groq
    const skillsInput = [...distinctLanguages, ...distinctSkills].join(", ");

    // 🧠 Step 1: Use Groq to generate a smarter GitHub query string
    const generatedQuery = await getGitHubQueryFromSkills(skillsInput);

    if (!generatedQuery) {
      return res
        .status(500)
        .json(new ApiError(500, "Failed to generate query from Groq"));
    }

    // 🧠 Step 2: Use our match logic on GitHub repos from that Groq-generated query
    const matchedRepos = await getGitHubReposFromSkills(
      generatedQuery, // feed the Groq output directly
      5,
      distinctSkills,
      distinctLanguages
    );

    return res.status(200).json({
      userSkills: distinctSkills,
      userLanguages: distinctLanguages,
      matchedRepos,
    });
  } catch (error) {
    console.error("❌ Error matching repos:", error.message);
    return res
      .status(500)
      .json(new ApiError(500, "Error extracting or matching skills", error));
  }
});
