import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { AsyncHandler } from "../utils/wrapAsync.js";
import { fetchGitHubRepos } from "../utils/skillExtractor.js";
import { getGitHubQueryFromSkills } from "../utils/getGitHubQueryFromGroq.js";
import { getGitHubReposFromSkills } from "../utils/getGitHubReposFromSkills.js";
import { KNOWN_SKILLS } from "../utils/knownSkills.js";
import { logToAnalytics } from "../utils/logToAnalytics.js";

// Controller to get user skills
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

  await logToAnalytics(
    "User skills fetched successfully",
    "Skills fetched",
    userId
  );

  return res.status(200).json(
    new ApiResponse(200, "Skills fetched", {
      skills: matchedSkills,
      languages: [...new Set(languages)],
    })
  );
});

// Controller to get matched GitHub repositories based on user's skills
export const getMatchRepos = AsyncHandler(async (req, res) => {
  const { count = 15 } = req.query; // Default count is 10
  console.log("hello");
  const userId = req.user._id; // Get the user ID from the request
  console.log(userId);
  const user = await User.findById(userId).select("login").lean(); // Fetch user by ID
  console.log(user);
  if (!user) {
    return res.status(400).json(new ApiError(400, "Username is required"));
  }

  const userSkills = req.body.skills;

  // console.log("User skills:", userSkills);

  try {
    let skillsInput = [];
    let distinctLanguages = [];
    let distinctSkills = [];
    if (!userSkills || userSkills.length === 0) {
      const repos = await fetchGitHubRepos(user.login); // Fetch GitHub repositories for the user
      const languages = repos.flatMap((repo) => repo.languages || []); // Extract languages from repos
      const skills = repos.flatMap((repo) => repo.skills || []); // Extract skills from repos

      distinctLanguages = [...new Set(languages)]; // Remove duplicates
      distinctSkills = [...new Set(skills)]; // Remove duplicates

      skillsInput = [...distinctLanguages, ...distinctSkills]
        .filter(Boolean) // Filter out any falsy values
        .slice(0, 10); // Limit the number of skills
    } else {
      skillsInput = userSkills; // Use provided skills if available
    }

    // console.log("Extracted skills:", skillsInput); // Log the extracted skills

    // Generate the GitHub query based on skills
    const generatedQuery = getGitHubQueryFromSkills(skillsInput);

    // Fetch matched repositories using the generated query
    const matchedRepos = await getGitHubReposFromSkills(
      generatedQuery,
      count,
      distinctSkills,
      distinctLanguages
    );

    await logToAnalytics(
      "RepoMatch",
      "Matched Repos for User",
      user.login,
      matchedRepos.map((repo) => `${repo.full_name} - ${repo.html_url}`)
    );

    // Respond with the matched repositories
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
