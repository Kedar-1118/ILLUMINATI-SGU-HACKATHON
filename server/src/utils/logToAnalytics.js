import { appendDataToSheet } from "../services/sheets.service.js";

/**
 * Logs a specific event to the Google Sheet.
 * @param {string} eventType - The type of event (e.g., "Login", "RepoMatch", "Error").
 * @param {string} message - Description or additional context.
 * @param {string} user - Optional user info (e.g., username or email).
 */
export const logToAnalytics = async (eventType, message, user = "-") => {
  const timestamp = new Date().toISOString();
  const values = [[eventType, message, timestamp, user]];

  try {
    await appendDataToSheet("Analytics!A:D", values);
    console.log(`✅ Logged to analytics: [${eventType}] ${message}`);
  } catch (error) {
    console.error("❌ Failed to log to Google Sheets:", error.message);
  }
};
