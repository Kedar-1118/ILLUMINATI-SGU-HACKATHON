import axios from "axios";

const GITHUB_API_URL = "https://api.github.com/search/repositories";


const generateQueryFromSkills = (skills) => {
  const keywords = skills
    .toLowerCase()
    .replace(/[^\w\s]/gi, "") 
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

  return [...new Set(keywords)].slice(0, 5); 
};


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


export const getGitHubReposFromSkills = async (
  skillsInput,
  count = 5,
  userSkills = [],
  userLanguages = []
) => {
  try {
    const keywords = generateQueryFromSkills(skillsInput);
    const safeQuery = `${keywords.join(",")} in:readme stars:>100`;

    const response = await axios.get(GITHUB_API_URL, {
      params: {
        q: safeQuery,
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
        // topics: repo.topics,
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
