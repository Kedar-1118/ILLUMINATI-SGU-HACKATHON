import axios from "axios";

const GROQ_API_KEY = process.env.GROQ_API_KEY;
const GROQ_API_URL =
  process.env.GROQ_API_URL || "https://api.groq.com/v1/chat/completions";

// Function to generate GitHub query from skills
export const getGitHubQueryFromSkills = async (skills) => {
  try {
    const response = await axios.post(
      GROQ_API_URL,
      {
        model: "llama3-8b-8192",
        messages: [
          {
            role: "user",
            content: `Only return a GitHub repository search query (no explanation, no formatting) for a developer skilled in ${skills}. The query should be short and valid for GitHub's API.`,
          },
        ],
        temperature: 0.3,
        max_tokens: 100,
      },
      {
        headers: {
          Authorization: `Bearer ${GROQ_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    let query = response.data.choices[0].message.content.trim();

    // Remove backticks or any non-query text
    query = query.replace(/`/g, "").split("\n")[0].trim();

    // Cut to 256 characters max (GitHub's q param limit)
    if (query.length > 256) {
      query = query.slice(0, 256);
    }

    return query;
  } catch (error) {
    console.error("Groq API error:", error.response?.data || error.message);
    return null;
  }
};
