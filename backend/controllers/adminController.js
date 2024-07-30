import CatchAsyncError from "../middleware/CatchAsyncError.js";
import orderModel from "../models/orderModel.js";
import productModel from "../models/productModel.js";
import userModel from "../models/userModel.js";

const adminDashboard = CatchAsyncError(async (req, res, next) => {
  const products = await productModel.find();
  const orders = await orderModel.find();
  const users = await userModel.find();

  const totalSales = orders.reduce((total, order) => {
    return total + order.priceInfo.totalAmount;
  }, 0);

  const noOfOrders = orders.length;
  const noOfProducts = products.length;
  const noOfUsers = users.length;

  res.status(200).json({
    noOfOrders,
    noOfProducts,
    noOfUsers,
    totalSales: totalSales.toFixed(2),
  });
});

export { adminDashboard };
