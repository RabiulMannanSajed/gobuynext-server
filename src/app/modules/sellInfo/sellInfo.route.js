import { Router } from "express";

import {
  createOrder,
  getAllCustomers,
  getDailySales,
  getMonthlySales,
  getOrdersByStatus,
  getYearlySales,
  updateOrderStatus,
} from "./sellInfo.controller.js";

const route = Router();

route.post("/create-sell-info", createOrder);

route.patch("/update-order-status/:id", updateOrderStatus);

route.get("/orders/status/:status", getOrdersByStatus);

route.get("/sales/daily", getDailySales);

route.get("/sales/monthly", getMonthlySales);

route.get("/sales/yearly", getYearlySales);

route.get("/customers", getAllCustomers);

export const SellInfoRoute = route;
