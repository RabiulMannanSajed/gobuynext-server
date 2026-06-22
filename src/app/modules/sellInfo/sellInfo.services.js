import { Product } from "../product/product.model.js";
import { Sell } from "./sellInfo.model.js";

export const createOrderIntoDB = async (payload) => {
  const { name, email, phone, address, insideDhaka, products } = payload;

  // Basic Validation
  if (!name || !email || !phone || !address) {
    throw new Error("Name, email, phone and address are required");
  }

  if (!products || products.length === 0) {
    throw new Error("At least one product is required");
  }

  let productsTotal = 0;
  const formattedProducts = [];

  for (const item of products) {
    if (!item._id || !item.quantity) {
      throw new Error("Product id and quantity are required");
    }

    if (item.quantity < 1) {
      throw new Error("Quantity must be at least 1");
    }

    // 🔎 Check product exists in DB
    const product = await Product.findById(item._id);

    if (!product) {
      throw new Error(`Product not found with id ${item._id}`);
    }

    const price = Number(product.price);
    const total = price * item.quantity;

    productsTotal += total;

    formattedProducts.push({
      productId: product._id,
      productName: product.productName,
      productImage: product.productImage,
      quantity: item.quantity,
      price,
      totalPrice: total,
    });
  }

  // 🚚 Delivery charge logic
  const deliveryPrice = insideDhaka ? 70 : 120;

  const grandTotal = productsTotal + deliveryPrice;

  const orderData = {
    name,
    email,
    phone,
    address,
    insideDhaka,
    deliveryPrice,
    totalPrice: grandTotal,
    products: formattedProducts,
  };

  const result = await Sell.create(orderData);

  return result;
};

// this is for the update the order states
export const updateOrderStatusIntoDB = async (id, status) => {
  const allowedStatus = [
    "pending",
    "confirmed",
    "shipped",
    "delivered",
    "cancelled",
  ];

  if (!allowedStatus.includes(status)) {
    throw new Error("Invalid status");
  }

  const result = await Sell.findByIdAndUpdate(id, { status }, { new: true });

  if (!result) {
    throw new Error("Order not found");
  }

  return result;
};

export const getOrdersByStatusFromDB = async (status) => {
  const result = await Sell.find({ status }).sort({ createdAt: -1 });

  return result;
};
// export const getDailySalesFromDB = async (date) => {
//   const selectedDate = new Date(date);

//   const start = new Date(selectedDate.setHours(0, 0, 0, 0));
//   const end = new Date(selectedDate.setHours(23, 59, 59, 999));

//   const result = await Sell.aggregate([
//     {
//       $match: {
//         createdAt: { $gte: start, $lte: end },
//         status: "confirmed", // ✅ changed
//       },
//     },
//     {
//       $group: {
//         _id: null,
//         totalSales: { $sum: "$totalPrice" },
//         totalOrders: { $sum: 1 },
//       },
//     },
//   ]);

//   return result[0] || { totalSales: 0, totalOrders: 0 };
// };
// export const getMonthlySalesFromDB = async (year, month) => {
//   const start = new Date(year, month - 1, 1);
//   const end = new Date(year, month, 1);

//   const result = await Sell.aggregate([
//     {
//       $match: {
//         createdAt: { $gte: start, $lt: end },
//         status: "confirmed",
//       },
//     },

//     // 🔥 break products array
//     { $unwind: "$products" },

//     // 🔥 group by product
//     {
//       $group: {
//         _id: "$products.productId",
//         productName: { $first: "$products.productName" },
//         productImage: { $first: "$products.productImage" },
//         price: { $first: "$products.price" },
//         totalQuantity: { $sum: "$products.quantity" },
//         totalSales: { $sum: "$products.totalPrice" },
//       },
//     },

//     { $sort: { totalSales: -1 } },
//   ]);

//   return result;
// };

// // export const getYearlySalesFromDB = async (year) => {
// //   const start = new Date(year, 0, 1);
// //   const end = new Date(year + 1, 0, 1);

// //   const result = await Sell.aggregate([
// //     {
// //       $match: {
// //         createdAt: { $gte: start, $lt: end },
// //         status: "confirmed", // ✅ changed
// //       },
// //     },
// //     {
// //       $group: {
// //         _id: null,
// //         totalSales: { $sum: "$totalPrice" },
// //         totalOrders: { $sum: 1 },
// //       },
// //     },
// //   ]);

// //   return result[0] || { totalSales: 0, totalOrders: 0 };
// // };

// export const getYearlySalesFromDB = async (year) => {
//   const start = new Date(year, 0, 1);
//   const end = new Date(year + 1, 0, 1);

//   // ✅ 1. SUMMARY
//   const summary = await Sell.aggregate([
//     {
//       $match: {
//         createdAt: { $gte: start, $lt: end },
//         status: "confirmed",
//       },
//     },
//     {
//       $group: {
//         _id: null,
//         totalSales: { $sum: "$totalPrice" },
//         totalOrders: { $sum: 1 },
//       },
//     },
//   ]);

//   // ✅ 2. PRODUCT WISE
//   const products = await Sell.aggregate([
//     {
//       $match: {
//         createdAt: { $gte: start, $lt: end },
//         status: "confirmed",
//       },
//     },
//     { $unwind: "$products" },
//     {
//       $group: {
//         _id: "$products.productId",
//         productName: { $first: "$products.productName" },
//         productImage: { $first: "$products.productImage" },
//         price: { $first: "$products.price" },
//         totalQuantity: { $sum: "$products.quantity" },
//         totalSales: { $sum: "$products.totalPrice" },
//       },
//     },
//     { $sort: { totalSales: -1 } },
//   ]);

//   return {
//     summary: summary[0] || { totalSales: 0, totalOrders: 0 },
//     products,
//   };
// };

const getSalesData = async (matchFilter) => {
  // ✅ SUMMARY
  const summary = await Sell.aggregate([
    { $match: matchFilter },
    {
      $group: {
        _id: null,
        totalSales: { $sum: "$totalPrice" },
        totalOrders: { $sum: 1 },
      },
    },
  ]);

  // ✅ PRODUCT WISE
  const products = await Sell.aggregate([
    { $match: matchFilter },
    { $unwind: "$products" },
    {
      $group: {
        _id: "$products.productId",
        productName: { $first: "$products.productName" },
        productImage: { $first: "$products.productImage" },
        price: { $first: "$products.price" },
        totalQuantity: { $sum: "$products.quantity" },
        totalSales: { $sum: "$products.totalPrice" },
      },
    },
    { $sort: { totalSales: -1 } },
  ]);

  return {
    summary: summary[0] || { totalSales: 0, totalOrders: 0 },
    products,
  };
};

// ✅ DAILY
export const getDailySalesFromDB = async (date) => {
  const selected = new Date(date);

  const start = new Date(selected.setHours(0, 0, 0, 0));
  const end = new Date(selected.setHours(23, 59, 59, 999));

  return await getSalesData({
    createdAt: { $gte: start, $lte: end },
    status: "confirmed",
  });
};

// ✅ MONTHLY
export const getMonthlySalesFromDB = async (year, month) => {
  const start = new Date(year, month - 1, 1);
  const end = new Date(year, month, 1);

  return await getSalesData({
    createdAt: { $gte: start, $lt: end },
    status: "confirmed",
  });
};

// ✅ YEARLY
export const getYearlySalesFromDB = async (year) => {
  const start = new Date(year, 0, 1);
  const end = new Date(year + 1, 0, 1);

  return await getSalesData({
    createdAt: { $gte: start, $lt: end },
    status: "confirmed",
  });
};

export const getAllCustomersFromDB = async () => {
  const result = await Sell.aggregate([
    {
      $group: {
        _id: "$phone",
        name: { $first: "$name" },
        email: { $first: "$email" },
        phone: { $first: "$phone" },
        address: { $first: "$address" },
        totalOrders: { $sum: 1 },
        totalSpent: { $sum: "$totalPrice" },
      },
    },
  ]);

  return result;
};
