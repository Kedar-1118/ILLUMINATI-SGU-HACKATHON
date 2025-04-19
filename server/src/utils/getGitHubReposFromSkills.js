import axios from "axios";

export const getGitHubReposFromSkills = async (
  query,
  count,
  skills,
  languages
) => {
  try {
    const searchURL = `https://api.github.com/search/repositories?q=${encodeURIComponent(query)}&sort=stars&order=desc&per_page=${count}`;

    const response = await axios.get(searchURL, {
      headers: {
        Accept: "application/vnd.github+json",
        Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
      },
    });

    const repos = response.data.items || [];

    return repos.map((repo) => ({
      name: repo.name,
      full_name: repo.full_name,
      html_url: repo.html_url,
      description: repo.description,
      stars: repo.stargazers_count,
      language: repo.language,
      owner: {
        login: repo.owner.login,
        avatar_url: repo.owner.avatar_url,
        html_url: repo.owner.html_url,
      },
    }));
  } catch (error) {
    console.error(
      "GitHub Repo Fetch Error:",
      error.response?.data || error.message
    );
    return [];
  }
};
