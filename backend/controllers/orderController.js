import mongoose from "mongoose";
import CatchAsyncError from "../middleware/CatchAsyncError.js";
import orderModel from "../models/orderModel.js";
import productModel from "../models/productModel.js";
import errorHandler from "../utils/errorHandler.js";
import cartModel from "../models/cartModel.js";

const createOrder = CatchAsyncError(async (req, res, next) => {
  const userId = req.user._id;
  const userName = req.user.name;

  let {
    shippingInfo,
    orderItems,
    priceInfo,
    paymentInfo,
    orderInfo,
    userInfo,
  } = req.body;

  const orderDetail = {
    shippingInfo,
    orderItems,
    priceInfo,
    paymentInfo,
    orderInfo,
    userInfo,
  };

  const order = await orderModel.create(orderDetail);

  if (!order) {
    return next(new errorHandler("Can't Create Order", 404));
  }
  if (order) {
    await cartModel.deleteMany({ user: userId });
  }

  res.status(200).json({
    message: "Order Created Successfully",
  });
});

const updateOrder = CatchAsyncError(async (req, res, next) => {
  const { id } = req.params;
  const { orderStatus } = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return next(new errorHandler("Please enter vaild order id", 404));
  }

  const order = await orderModel.findById(id);

  if (order.orderInfo.orderStatus == "Delivered") {
    res.status(202).json({
      message: "Order Is Already Delivered",
    });
    return 
  }

  const result = await orderModel.findByIdAndUpdate(id, {
    "orderInfo.orderStatus": orderStatus,
  });

  if (!result) {
    return next(new errorHandler("Order not find with this ID", 404));
  }

  res.status(200).json({
    message: "Order Upadted Successfully",
  });
});

const getOrder = CatchAsyncError(async (req, res, next) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return next(new errorHandler("Please enter vaild order id", 404));
  }
  const order = await orderModel.findById(id);

  if (!order) {
    return next(new errorHandler("Order not find with this ID", 404));
  }

  res.status(200).json(order);
});

const getAllOrder = CatchAsyncError(async (req, res, next) => {
  const userId = req.user._id;

  const orders = await orderModel.find({ "userInfo.userId": userId });

  res.status(200).json({
    orders,
  });
});

const getAdminAllOrder = CatchAsyncError(async (req, res, next) => {
  const orders = await orderModel.find();

  res.status(200).json({
    orders,
  });
});

const deleteOrder = CatchAsyncError(async (req, res, next) => {
  const id = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return next(new errorHandler("Please enter vaild order id", 404));
  }

  const del = await orderModel.findByIdAndDelete(id);
  if (!del) {
    return next(new errorHandler("Can't order product", 404));
  }

  res.status(200).json({
    message: "Product Order Successfully",
  });
});

export { createOrder, updateOrder, getOrder, getAllOrder, getAdminAllOrder };
