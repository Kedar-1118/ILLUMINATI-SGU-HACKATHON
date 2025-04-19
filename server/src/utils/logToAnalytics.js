import { appendDataToSheet } from "../services/sheets.service.js";

/**
 * Logs a specific event to the Google Sheet.
 * @param {string} eventType - The type of event (e.g., "Login", "RepoMatch", "Error").
 * @param {string} message - Description or additional context.
 * @param {string} user - Optional user info (e.g., username or email).
 * @param {string|Array} extraData - Optional additional data (e.g., repo names, error messages).
 * @returns {Promise<void>} - Resolves when the data is logged successfully.
 */
export const logToAnalytics = async (
  eventType,
  message,
  user = "-",
  extraData = "-"
) => {
  const timestamp = new Date().toISOString();

  const cleanedExtra = Array.isArray(extraData)
    ? extraData.join(" | ")
    : `${extraData}`;

  const values = [[eventType, message, timestamp, user, cleanedExtra]];

  try {
    await appendDataToSheet("Analytics!A:D", values);
  } catch (error) {
    console.error("Failed to log to Google Sheets:", error.message);
  }
};
