import { Sell } from "./sellInfo.model.js";
import {
  getAllCustomersFromDB,
  getDailySalesFromDB,
  getMonthlySalesFromDB,
  getOrdersByStatusFromDB,
  getYearlySalesFromDB,
  updateOrderStatusIntoDB,
} from "./sellInfo.services.js";

export const createOrder = async (req, res) => {
  try {
    const sell = await Sell.create(req.body);
    res.status(201).json({
      success: true,
      sell,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const updateOrderStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const result = await updateOrderStatusIntoDB(id, status);

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

export const getOrdersByStatus = async (req, res) => {
  try {
    const { status } = req.params;

    const result = await getOrdersByStatusFromDB(status);

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

// export const getDailySales = async (req, res) => {
//   const { date } = req.query;
//   const result = await getDailySalesFromDB(date);
//   res.json({ success: true, data: result });
// };

// export const getMonthlySales = async (req, res) => {
//   const { year, month } = req.query;
//   const result = await getMonthlySalesFromDB(year, month);
//   res.json({ success: true, data: result });
// };

// export const getYearlySales = async (req, res) => {
//   const { year } = req.query;
//   const result = await getYearlySalesFromDB(year);
//   res.json({ success: true, data: result });
// };

// DAILY
export const getDailySales = async (req, res) => {
  const { date } = req.query;

  const result = await getDailySalesFromDB(date);

  res.json({
    success: true,
    data: result,
  });
};

// MONTHLY
export const getMonthlySales = async (req, res) => {
  const { year, month } = req.query;

  const result = await getMonthlySalesFromDB(year, month);

  res.json({
    success: true,
    data: result,
  });
};

// YEARLY
export const getYearlySales = async (req, res) => {
  const { year } = req.query;

  const result = await getYearlySalesFromDB(year);

  res.json({
    success: true,
    data: result,
  });
};

export const getAllCustomers = async (req, res) => {
  try {
    const result = await getAllCustomersFromDB();

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
