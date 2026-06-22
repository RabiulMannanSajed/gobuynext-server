import { getDashboardStatsFromDB } from "./dashboardAnalytices.service.js";

export const getDashboardStats = async (req, res) => {
  try {
    const result = await getDashboardStatsFromDB();

    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
