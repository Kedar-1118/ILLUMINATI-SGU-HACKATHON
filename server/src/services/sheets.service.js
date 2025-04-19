import { google } from "googleapis";
import credentials from "../config/credentials.json" assert { type: "json" };

/**
 * Get data from the specified range in the Google Sheet.
 * @param {string} range The range in the sheet to fetch data from.
 * @returns {Promise} The data from the sheet.
 */
const getDataFromSheet = async (range) => {
  const sheets = google.sheets({ version: "v4", auth: credentials });
  const response = await sheets.spreadsheets.values.get({
    spreadsheetId: "YOUR_SHEET_ID", // Replace with your Sheet ID
    range: range,
  });
  return response.data.values;
};

/**
 * Write data to the specified range in the Google Sheet.
 * @param {string} range The range in the sheet to write data to.
 * @param {Array} values The data to write.
 * @returns {Promise} The response from the Google Sheets API.
 */
const writeDataToSheet = async (range, values) => {
  const sheets = google.sheets({ version: "v4", auth: credentials });
  const response = await sheets.spreadsheets.values.update({
    spreadsheetId: "YOUR_SHEET_ID", // Replace with your Sheet ID
    range: range,
    valueInputOption: "RAW",
    requestBody: {
      values: values,
    },
  });
  return response.data;
};

/**
 * Append data to the specified range in the Google Sheet.
 * @param {string} range The range in the sheet to append data to.
 * @param {Array} values The data to append.
 * @returns {Promise} The response from the Google Sheets API.
 */
const appendDataToSheet = async (range, values) => {
  const sheets = google.sheets({ version: "v4", auth: credentials });
  const response = await sheets.spreadsheets.values.append({
    spreadsheetId: "YOUR_SHEET_ID", // Replace with your Sheet ID
    range: range,
    valueInputOption: "RAW",
    requestBody: {
      values: values,
    },
  });
  return response.data;
};

export { getDataFromSheet, writeDataToSheet, appendDataToSheet };
