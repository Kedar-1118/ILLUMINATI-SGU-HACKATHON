import {
  getDataFromSheet,
  writeDataToSheet,
  appendDataToSheet,
} from "../services/sheets.service.js";
import { AsyncHandler } from "../utils/wrapAsync.js";

const getAnalyticsData = AsyncHandler(async (req, res) => {
  const range = "Analytics!A1:D10"; // Adjust range as needed
  const data = await getDataFromSheet(range);
  res.status(200).json({ success: true, data });
});

const writeAnalyticsData = AsyncHandler(async (req, res) => {
  const { range, values } = req.body;
  const response = await writeDataToSheet(range, values);
  res
    .status(200)
    .json({ success: true, message: "Data written successfully", response });
});

const appendAnalyticsData = AsyncHandler(async (req, res) => {
  const { range, values } = req.body;
  const response = await appendDataToSheet(range, values);
  res
    .status(200)
    .json({ success: true, message: "Data appended successfully", response });
});

export { getAnalyticsData, writeAnalyticsData, appendAnalyticsData };
