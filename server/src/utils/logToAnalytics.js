import { appendDataToSheet } from "../services/sheets.service.js";

/**
 * Logs a specific event to the Google Sheet.
 * @param {string} eventType - The type of event (e.g., "Login", "RepoMatch", "Error").
 * @param {string} message - Description or additional context.
 * @param {string} user - Optional user info (e.g., username or email).
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
    // console.log(`✅ Logged to analytics: [${eventType}] ${message}`);
  } catch (error) {
    console.error("❌ Failed to log to Google Sheets:", error.message);
  }
};
