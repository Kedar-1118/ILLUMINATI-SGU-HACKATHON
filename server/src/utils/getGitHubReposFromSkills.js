import axios from "axios";

const GITHUB_API_URL = "https://api.github.com/search/repositories";

// Generate cleaned keyword list from input string
const generateQueryFromSkills = (skills) => {
  const keywords = skills
    .toLowerCase()
    .replace(/[^\w\s]/gi, "") // remove special characters
    .split(/\s+/)
    .filter(
      (word) =>
        word.length > 2 &&
        ![
          "and",
          "or",
          "not",
          "with",
          "for",
          "the",
          "a",
          "an",
          "using",
        ].includes(word)
    );

  return [...new Set(keywords)].slice(0, 20); // initially allow more to trim later
};

// Calculate how well a repo matches user skills
const calculateMatchPercentage = (repo, userSkills, userLanguages) => {
  const keywords = new Set(
    [
      ...(repo.topics || []),
      repo.language || "",
      ...(repo.description?.split(/\W+/) || []),
    ].map((word) => word.toLowerCase())
  );

  let matchCount = 0;
  let total = userSkills.length + userLanguages.length;

  [...userSkills, ...userLanguages].forEach((skill) => {
    if (keywords.has(skill.toLowerCase())) {
      matchCount++;
    }
  });

  return Math.round((matchCount / total) * 100);
};

// Fetch repos from GitHub based on skill keywords
export const getGitHubReposFromSkills = async (
  skillsInput,
  count = 5,
  userSkills = [],
  userLanguages = []
) => {
  try {
    const keywords = generateQueryFromSkills(skillsInput);
    let baseQuery = "in:readme stars:>100";
    let safeKeywords = [];
    let currentQuery = baseQuery;

    // Add keywords one by one while staying under 250 characters
    for (const keyword of keywords) {
      const testQuery = `${[...safeKeywords, keyword].join(",")},${baseQuery}`;
      if (testQuery.length <= 250) {
        safeKeywords.push(keyword);
        currentQuery = testQuery;
      } else {
        break;
      }
    }

    const response = await axios.get(GITHUB_API_URL, {
      params: {
        q: currentQuery,
        sort: "stars",
        order: "desc",
        per_page: count,
      },
      headers: {
        Accept: "application/vnd.github+json",
        "User-Agent": "skill-match-app",
      },
    });

    const repos = response.data.items.map((repo) => {
      const matchPercentage = calculateMatchPercentage(
        repo,
        userSkills,
        userLanguages
      );
      return {
        name: repo.full_name,
        description: repo.description,
        url: repo.html_url,
        stars: repo.stargazers_count,
        language: repo.language,
        matchPercentage,
      };
    });

    return repos.sort((a, b) => b.matchPercentage - a.matchPercentage);
  } catch (error) {
    console.error(
      "GitHub Fetch Error:",
      error.response?.data || error.message
    );
    return [];
  }
};
