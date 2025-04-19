import axios from "axios";

// Add your GitHub token here
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;

const axiosInstance = axios.create({
  headers: {
    Authorization: `token ${GITHUB_TOKEN}`,
  },
});

export default async function getRepoInfo(req, res) {
  const { repo } = req.body; // format: owner/repo

  try {
    const [owner, name] = repo.split("/");
    if (!owner || !name) {
      return res
        .status(400)
        .json({ error: "Invalid repo format. Use owner/repo." });
    }

    const urls = [
      `https://api.github.com/repos/${repo}`,
      `https://api.github.com/repos/${repo}/contributors`,
      `https://api.github.com/repos/${repo}/languages`,
      `https://api.github.com/repos/${repo}/issues?state=open`,
      `https://api.github.com/repos/${repo}/pulls?state=open`,
      `https://api.github.com/repos/${repo}/branches`,
      `https://api.github.com/repos/${repo}/tags`,
      `https://api.github.com/repos/${repo}/commits`,
    ];

    const responses = await Promise.all(
      urls.map((url) =>
        axiosInstance.get(url).catch((err) => {
          console.error(
            `Error fetching ${url}:`,
            err.response?.status,
            err.response?.data?.message || err.message
          );
          return { data: [] };
        })
      )
    );

    const [
      repoData,
      contributors,
      languages,
      issues,
      pulls,
      branches,
      tags,
      commits,
    ] = responses;

    const result = {
      name: repoData.data.full_name || repo,
      description: repoData.data.description || "",
      stars: repoData.data.stargazers_count || 0,
      forks: repoData.data.forks_count || 0,
      openIssues: Array.isArray(issues.data) ? issues.data.length : 0,
      openPRs: Array.isArray(pulls.data) ? pulls.data.length : 0,
      contributors: Array.isArray(contributors.data)
        ? contributors.data.map((c) => ({
            login: c.login,
            contributions: c.contributions,
          }))
        : [],
      languages: languages.data || {},
      branches: Array.isArray(branches.data)
        ? branches.data.map((branch) => branch.name)
        : [],
      tags: Array.isArray(tags.data) ? tags.data.map((tag) => tag.name) : [],
      recentCommits: Array.isArray(commits.data)
        ? commits.data.slice(0, 5).map((commit) => ({
            message: commit.commit.message,
            author: commit.commit.author.name,
            date: commit.commit.author.date,
          }))
        : [],
    };

    res.json(result);
  } catch (error) {
    console.error("Unexpected error:", error.message);
    res.status(500).json({
      error:
        "Failed to fetch repository data. Ensure the repository format is correct (e.g., owner/repo).",
    });
  }
}
