import axios from "axios";

const GROQ_API_KEY = process.env.GROQ_API_KEY;
const GROQ_API_URL = process.env.GROQ_API_URL || "https://api.groq.com/v1/chat/completions";

export const getGitHubQueryFromSkills = async (skills) => {
  try {
    const response = await axios.post(
      GROQ_API_URL,
      {
        model: "llama3-8b-8192",
        messages: [
          {
            role: "user",
            content: `Generate a GitHub search query for a developer skilled in ${skills}. Only return the search query string.`,
          },
        ],
        temperature: 0.5,
        max_tokens: 100,
      },
      {
        headers: {
          Authorization: `Bearer ${GROQ_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    const result = response.data.choices[0].message.content.trim();
    console.log("Generated GitHub query:", result);
    return result;
  } catch (error) {
    console.error("Groq API error:", error.response?.data || error.message);
    return null;
  }
};
