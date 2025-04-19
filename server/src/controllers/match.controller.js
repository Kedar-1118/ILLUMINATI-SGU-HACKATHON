import mongoose from "mongoose";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { AsyncHandler } from "../utils/wrapAsync.js";
import { fetchGitHubRepos } from "../utils/skillExtractor.js";
import { getGitHubQueryFromSkills } from "../utils/getGitHubQueryFromGroq.js";
import { getGitHubReposFromSkills } from "../utils/getGitHubReposFromSkills.js";
import { KNOWN_SKILLS } from "../utils/knownSkills.js";

export const getUserSkills = AsyncHandler(async (req, res) => {
  const userId = req.user._id;
  const user = await User.findById(userId).select("login").lean();

  if (!user) {
    return res
      .status(400)
      .json(new ApiError(400, "GitHub username is required"));
  }

  const repos = await fetchGitHubRepos(user.login);

  const languages = repos.flatMap((repo) => repo.languages || []);
  const dependencies = repos.flatMap((repo) => repo.skills || []);

  const combined = [...languages, ...dependencies];
  const unique = [...new Set(combined.map((skill) => skill.toLowerCase()))];

  const matchedSkills = unique.filter((skill) =>
    KNOWN_SKILLS.map((s) => s.toLowerCase()).includes(skill)
  );

  return res.status(200).json(
    new ApiResponse(200, "Skills fetched", {
      skills: matchedSkills,
      languages: [...new Set(languages)],
    })
  );
});

export const getMatchRepos = AsyncHandler(async (req, res) => {
  const { count = 10 } = req.query;
  const userId = req.user._id;

  const user = await User.findById(userId).select("login").lean();
  if (!user) {
    return res.status(400).json(new ApiError(400, "Username is required"));
  }

  try {
    const repos = await fetchGitHubRepos(user.login);

    const languages = repos.flatMap((repo) => repo.languages || []);
    const skills = repos.flatMap((repo) => repo.skills || []);

    const distinctLanguages = [...new Set(languages)];
    const distinctSkills = [...new Set(skills)];

    const skillsInput = [...distinctLanguages, ...distinctSkills]
      .filter(Boolean)
      .slice(0, 10)
      .join(", ");

    // console.log("Skills Input:", skillsInput);

    let generatedQuery = await getGitHubQueryFromSkills(skillsInput);
    // console.log("Generated GitHub Query:", generatedQuery);

    if (!generatedQuery) {
      console.warn("Using fallback query.");
      generatedQuery = "stars:>100 pushed:>2023-01-01";
    }

    const matchedRepos = await getGitHubReposFromSkills(
      generatedQuery,
      count,
      distinctSkills,
      distinctLanguages
    );

    return res.status(200).json(
      new ApiResponse(200, "Repos matched successfully", {
        userSkills: distinctSkills,
        userLanguages: distinctLanguages,
        matchedRepos,
      })
    );
  } catch (error) {
    console.error("Error matching repos:", error);
    return res
      .status(500)
      .json(new ApiError(500, "Error extracting or matching skills", error));
  }
});
