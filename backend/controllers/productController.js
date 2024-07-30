import mongoose from "mongoose";
import CatchAsyncError from "../middleware/CatchAsyncError.js";
import productModel from "../models/productModel.js";
import errorHandler from "../utils/errorHandler.js";
import path from "path";
import { fileURLToPath } from "url";
import * as fs from "fs";
import { log } from "console";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const createProduct = CatchAsyncError(async (req, res, next) => {
  const { name, price, description, stock } = req.body;

  let images = [];
  let productImages = req.files;

  productImages.map((file) => {
    images.push({
      path: file.path,
      filename: file.filename,
    });
  });

  const user = req.user._id;
  const sellerName = req.user.name;

  if (!name) {
    return next(new errorHandler("Product name is requried"));
  }
  if (!price) {
    return next(new errorHandler("Product price is requried"));
  }
  if (!description) {
    return next(new errorHandler("Product description is requried"));
  }
  if (!stock) {
    return next(new errorHandler("Product stock is requried"));
  }

  const product = await new productModel({
    name,
    price,
    description,
    stock,
    images,
    user,
    sellerName,
    noOfReview: 0,
    rating: 0,
  });

  if (!product) {
    return next(new errorHandler(message, 404));
  }
  await product.save();
  res.status(200).json({
    message: "Product created successfully",
  });
});

const getProduct = CatchAsyncError(async (req, res, next) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return next(new errorHandler("Please enter vaild product id", 404));
  }
  const product = await productModel.findById(id);

  if (!product) {
    return next(new errorHandler("Product not find with this ID", 404));
  }

  res.status(200).json({
    product,
  });
});

const updateProduct = CatchAsyncError(async (req, res, next) => {
  const _id = req.params.id;

  let { name, price, stock, description, oldImages } = req.body;
  const files = req.files;
  if (!mongoose.Types.ObjectId.isValid(_id)) {
    return next(new errorHandler("Please enter vaild product id", 404));
  }

  let product = await productModel.findById(_id);

  let images = product.images;

  if (typeof oldImages == "string") {
    oldImages = [oldImages];
  }

  if (oldImages?.length == 0 || oldImages == undefined) {
    images.map((img) => {
      fs.unlink(
        path.join(__dirname, `../assets/img/${img.filename}`),
        (err) => {
          if (err) {
            console.log(err);
          }
        }
      );
    });
    images = [];
  } else {
    const filterImages = images.filter((img) => {
      let isImageExists = false;
      oldImages?.map((oldImg) => {
        if (oldImg == img.filename) {
          isImageExists = true;
        }
      });
      if (!isImageExists) {
        fs.unlink(
          path.join(__dirname, `../assets/img/${img.filename}`),
          (err) => {
            if (err) {
              console.log(err);
            }
          }
        );
      }
      return isImageExists;
    });
    images = filterImages;
  }

  files?.map((file) => {
    images.push({
      path: file.path,
      filename: file.filename,
    });
  });

  const updatedProductInfo = {
    name,
    price,
    stock,
    description,
    images,
  };

  const result = await productModel.findByIdAndUpdate(_id, updatedProductInfo);
  if (!result) {
    return next(new errorHandler("Product not found with this id", 404));
  }

  res.status(200).json({
    message: "Product Updated Successfully",
  });
});

const deleteProduct = CatchAsyncError(async (req, res, next) => {
  const id = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return next(new errorHandler("Please enter vaild product id", 404));
  }

  const product = await productModel.findByIdAndDelete(id);
  if (!product) {
    return next(new errorHandler("Can't delete product", 404));
  }

  product?.images.map(async (img) => {
    fs.unlink(path.join(__dirname, `../assets/img/${img.filename}`), (err) => {
      if (err) {
        console.log(err);
      }
    });
  });

  res.status(200).json({
    message: "Product Delete Successfully",
  });
});
const getAllProduct = CatchAsyncError(async (req, res, next) => {
  const product = await productModel.find();

  res.status(200).json({
    product,
  });
});

export {
  createProduct,
  updateProduct,
  deleteProduct,
  getProduct,
  getAllProduct,
};
