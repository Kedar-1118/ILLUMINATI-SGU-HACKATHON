import express from "express";
import {
  getAnalyticsData,
  writeAnalyticsData,
  appendAnalyticsData,
} from "../controllers/analytics.controller.js";

const router = express.Router();

router.get("/analytics", getAnalyticsData);
router.post("/analytics/write", writeAnalyticsData);
router.post("/analytics/append", appendAnalyticsData);

export default router;
