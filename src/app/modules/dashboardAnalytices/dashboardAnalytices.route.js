import { Router } from "express";
import { getDashboardStats } from "./dashboardAnalytices.controller.js";

const router = Router();

router.get("/admin/dashboard-stats", getDashboardStats);

export const DashboardAnalyticsRoute = router;
