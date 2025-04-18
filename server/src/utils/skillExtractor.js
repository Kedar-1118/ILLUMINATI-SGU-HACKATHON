import { GraphQLClient, gql } from "graphql-request";
import dotenv from "dotenv";
import axios from "axios";

dotenv.config();

const GITHUB_API = "https://api.github.com/graphql";
const REST_API_BASE = "https://api.github.com/repos";
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;

const graphqlClient = new GraphQLClient(GITHUB_API, {
  headers: {
    authorization: `Bearer ${GITHUB_TOKEN}`,
  },
});

// GraphQL query to fetch repos and languages
const query = gql`
  query GetUserRepos($login: String!) {
    user(login: $login) {
      repositories(
        first: 10
        privacy: PUBLIC
        orderBy: { field: STARGAZERS, direction: DESC }
      ) {
        nodes {
          name
          description
          url
          languages(first: 5, orderBy: { field: SIZE, direction: DESC }) {
            nodes {
              name
            }
          }
        }
      }
    }
  }
`;

// Get default branch of a repo
async function getDefaultBranch(username, repoName) {
  const url = `${REST_API_BASE}/${username}/${repoName}`;
  try {
    const res = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${GITHUB_TOKEN}`,
      },
    });
    return res.data.default_branch;
  } catch (err) {
    // console.warn(`Failed to get default branch for ${repoName}`);
    return null;
  }
}

// List all package.json file paths in the repo
async function listPackageJsonFiles(username, repoName) {
  const defaultBranch = await getDefaultBranch(username, repoName);
  if (!defaultBranch) return [];

  const url = `${REST_API_BASE}/${username}/${repoName}/git/trees/${defaultBranch}?recursive=1`;

  try {
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${GITHUB_TOKEN}`,
      },
    });

    const allFiles = response.data.tree;
    const packageJsonPaths = allFiles
      .filter(
        (file) => file.path.endsWith("package.json") && file.type === "blob"
      )
      .map((file) => file.path);

    return packageJsonPaths;
  } catch (err) {
    // console.error(`Failed to list files in ${repoName}:`, err.message);
    return [];
  }
}

// Fetch dependencies from each package.json
async function fetchDependencies(username, repoName, filePath) {
  const url = `${REST_API_BASE}/${username}/${repoName}/contents/${filePath}`;

  try {
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${GITHUB_TOKEN}`,
        Accept: "application/vnd.github.v3.raw",
      },
    });

    const json =
      typeof response.data === "string"
        ? JSON.parse(response.data)
        : response.data;

    const dependencies = [
      ...Object.keys(json.dependencies || {}),
      ...Object.keys(json.devDependencies || {}),
    ];

    return dependencies;
  } catch (err) {
    // console.warn(`Cannot fetch or parse ${filePath} in ${repoName}`);
    return [];
  }
}

// Main function
export async function fetchGitHubRepos(username) {
  try {
    const variables = { login: username };
    const data = await graphqlClient.request(query, variables);
    const repos = data.user.repositories.nodes;

    const result = await Promise.all(
      repos.map(async (repo) => {
        const languages = repo.languages.nodes.map((lang) => lang.name);

        const packageJsonPaths = await listPackageJsonFiles(
          username,
          repo.name
        );

        const allSkills = (
          await Promise.all(
            packageJsonPaths.map((path) =>
              fetchDependencies(username, repo.name, path)
            )
          )
        ).flat();

        const uniqueSkills = [...new Set(allSkills)];

        return {
          name: repo.name,
          description: repo.description || "No description",
          url: repo.url,
          languages,
          skills: uniqueSkills,
        };
      })
    );

    return result;
  } catch (error) {
    console.error("GraphQL or REST error:", error.message);
    throw error;
  }
}
