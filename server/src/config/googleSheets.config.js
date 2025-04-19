import { google } from "googleapis";
import credentials from "./credentials.js";

const auth = new google.auth.GoogleAuth({
  credentials: credentials,
  scopes: ["https://www.googleapis.com/auth/spreadsheets"],
});

export { auth };
