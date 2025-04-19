import express from "express";
import {
  getAnalyticsData,
  writeAnalyticsData,
  appendAnalyticsData,
} from "../controllers/analytics.controller.js";

const router = express.Router();

// Route to fetch analytics data
router.get("/analytics", getAnalyticsData);

// Route to write analytics data
router.post("/analytics/write", writeAnalyticsData);

// Route to append analytics data
router.post("/analytics/append", appendAnalyticsData);

export default router;
