import {
    getDataFromSheet,
    writeDataToSheet,
    appendDataToSheet,
  } from "../services/sheets.service.js";
  import { AsyncHandler } from "../utils/wrapAsync.js";
  
  /**
   * Controller to fetch analytics data from the sheet.
   * @param {Object} req The request object.
   * @param {Object} res The response object.
   */
  const getAnalyticsData = AsyncHandler(async (req, res) => {
    const range = "Analytics!A1:D10"; // Adjust range as needed
    const data = await getDataFromSheet(range);
    res.status(200).json({ success: true, data });
  });
  
  /**
   * Controller to write analytics data to the sheet.
   * @param {Object} req The request object containing data to be written.
   * @param {Object} res The response object.
   */
  const writeAnalyticsData = AsyncHandler(async (req, res) => {
    const { range, values } = req.body; // Expecting range and values in request body
    const response = await writeDataToSheet(range, values);
    res
      .status(200)
      .json({ success: true, message: "Data written successfully", response });
  });
  
  /**
   * Controller to append analytics data to the sheet.
   * @param {Object} req The request object containing data to be appended.
   * @param {Object} res The response object.
   */
  const appendAnalyticsData = AsyncHandler(async (req, res) => {
    const { range, values } = req.body; // Expecting range and values in request body
    const response = await appendDataToSheet(range, values);
    res
      .status(200)
      .json({ success: true, message: "Data appended successfully", response });
  });
  
  export { getAnalyticsData, writeAnalyticsData, appendAnalyticsData };
  