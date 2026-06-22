import { Sell } from "../sellInfo/sellInfo.model.js";

export const getDashboardStatsFromDB = async () => {
  const today = new Date();

  const startOfDay = new Date(today.setHours(0, 0, 0, 0));
  const endOfDay = new Date(today.setHours(23, 59, 59, 999));

  const startOfMonth = new Date(
    new Date().getFullYear(),
    new Date().getMonth(),
    1,
  );

  const startOfYear = new Date(new Date().getFullYear(), 0, 1);

  // TOTAL ORDERS
  const totalOrders = await Sell.countDocuments();

  // STATUS COUNTS
  const pendingOrders = await Sell.countDocuments({ status: "pending" });
  const deliveredOrders = await Sell.countDocuments({ status: "delivered" });
  const cancelledOrders = await Sell.countDocuments({ status: "cancelled" });

  // TOTAL REVENUE
  const revenueData = await Sell.aggregate([
    {
      $match: { status: "delivered" },
    },
    {
      $group: {
        _id: null,
        totalRevenue: { $sum: "$totalPrice" },
      },
    },
  ]);

  const totalRevenue = revenueData[0]?.totalRevenue || 0;

  // TODAY REVENUE
  const todayRevenueData = await Sell.aggregate([
    {
      $match: {
        createdAt: { $gte: startOfDay, $lte: endOfDay },
        status: "delivered",
      },
    },
    {
      $group: {
        _id: null,
        total: { $sum: "$totalPrice" },
      },
    },
  ]);

  const todayRevenue = todayRevenueData[0]?.total || 0;

  // MONTH REVENUE
  const monthRevenueData = await Sell.aggregate([
    {
      $match: {
        createdAt: { $gte: startOfMonth },
        status: "delivered",
      },
    },
    {
      $group: {
        _id: null,
        total: { $sum: "$totalPrice" },
      },
    },
  ]);

  const monthRevenue = monthRevenueData[0]?.total || 0;

  // YEAR REVENUE
  const yearRevenueData = await Sell.aggregate([
    {
      $match: {
        createdAt: { $gte: startOfYear },
        status: "delivered",
      },
    },
    {
      $group: {
        _id: null,
        total: { $sum: "$totalPrice" },
      },
    },
  ]);

  const yearRevenue = yearRevenueData[0]?.total || 0;

  // TOTAL CUSTOMERS (unique phone)
  const customers = await Sell.aggregate([
    {
      $group: {
        _id: "$phone",
      },
    },
  ]);

  const totalCustomers = customers.length;

  // TOP SELLING PRODUCTS
  const topProducts = await Sell.aggregate([
    { $unwind: "$products" },

    {
      $group: {
        _id: "$products.productId",
        productName: { $first: "$products.productName" },
        productImage: { $first: "$products.productImage" },
        totalSold: { $sum: "$products.quantity" },
      },
    },

    { $sort: { totalSold: -1 } },

    { $limit: 5 },
  ]);

  return {
    totalOrders,
    pendingOrders,
    deliveredOrders,
    cancelledOrders,
    totalRevenue,
    todayRevenue,
    monthRevenue,
    yearRevenue,
    totalCustomers,
    topProducts,
  };
};
