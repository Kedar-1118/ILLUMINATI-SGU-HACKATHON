import mongoose from "mongoose";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { AsyncHandler } from "../utils/wrapAsync.js";
import { fetchGitHubRepos } from "../utils/skillExtractor.js";

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
