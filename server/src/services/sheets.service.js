import { google } from "googleapis";
import credentials from "../config/credentials.json" assert { type: "json" };
import dotenv from "dotenv";

dotenv.config();

const SCOPES = ["https://www.googleapis.com/auth/spreadsheets"];
const spreadsheetId = process.env.SHEET_ID;

// 🔐 Create an authenticated client using service account credentials
const authClient = new google.auth.JWT({
  email: credentials.client_email,
  key: credentials.private_key,
  scopes: SCOPES,
});

const sheets = google.sheets({ version: "v4", auth: authClient });

/**
 * Get data from the specified range in the Google Sheet.
 */
const getDataFromSheet = async (range) => {
  const response = await sheets.spreadsheets.values.get({
    spreadsheetId,
    range,
  });
  return response.data.values;
};

/**
 * Write data to the specified range in the Google Sheet.
 */
const writeDataToSheet = async (range, values) => {
  const response = await sheets.spreadsheets.values.update({
    spreadsheetId,
    range,
    valueInputOption: "RAW",
    requestBody: {
      values,
    },
  });
  return response.data;
};

/**
 * Append data to the specified range in the Google Sheet.
 */
const appendDataToSheet = async (range, values) => {
  const response = await sheets.spreadsheets.values.append({
    spreadsheetId,
    range,
    valueInputOption: "RAW",
    requestBody: {
      values,
    },
  });
  return response.data;
};

export { getDataFromSheet, writeDataToSheet, appendDataToSheet };
