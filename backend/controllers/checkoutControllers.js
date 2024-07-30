import mongoose from "mongoose";
import CatchAsyncError from "../middleware/CatchAsyncError.js";
import cartModel from "../models/cartModel.js";
import productModel from "../models/productModel.js";
import errorHandler from "../utils/errorHandler.js";

const createCart = CatchAsyncError(async (req, res, next) => {
  let { productId, name, image, price, quantity } = req.body;
  

  const user = req.user._id;

  const product = await productModel.findById(productId);

  if (!product) {
    return next(new errorHandler("Product not find with this ID", 404));
  }

  const isProductMatched = await cartModel.findOne({ productId, user });

  if (isProductMatched) {
    return next(new errorHandler("Product already exists in your cart", 200));
  }

  const cart = await cartModel.create({
    productId,
    name,
    image,
    price,
    quantity,
    user,
  });

  res.status(200).json({
    message: "Product Added In Cart",
  });
});

const getCart = CatchAsyncError(async (req, res, next) => {
  const user = req.user._id;

  const cart = await cartModel.find({ user });

  res.status(200).json({
    cart,
  });
});

const updateCart = CatchAsyncError(async (req, res, next) => {
  const { quantity } = req.body;
  const user = req.user._id;
  const id = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return next(new errorHandler("Please enter vaild cart id", 404));
  }
  if (!quantity) {
    return next(new errorHandler("Can't update cart", 200));
  }
  const update = await cartModel.findByIdAndUpdate(id, { quantity });

  if (!update) {
    return next(new errorHandler("Can't update cart", 200));
  }

  res.status(200).json({
    message: "Cart update successfully",
  });
});

const deleteCart = CatchAsyncError(async (req, res, next) => {
  const id = req.params.id;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return next(new errorHandler("Please enter vaild cart id", 404));
  }
  const del = await cartModel.findByIdAndDelete(id);

  if (!del) {
    return next(new errorHandler("Can't delete cart items", 404));
  }

  res.status(200).json({
    message: "Product removed in cart",
  });
});
export { createCart, getCart, updateCart, deleteCart };
