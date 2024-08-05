import mongoose from "mongoose";
import CatchAsyncError from "../middleware/CatchAsyncError.js";
import CategoryModel from "../models/CategoryModel.js";
import errorHandler from "../utils/errorHandler.js";

const createCategory = CatchAsyncError(async (req, res, next) => {
  const { name, url, parentCategory, parentCategoryID } = req.body;

  const isUrlExist = await CategoryModel.find({ url });

  if (isUrlExist.length == 1) {
    return res.status(409).json({
      message: "Url already exists",
    });
  }

  const category = new CategoryModel({
    name,
    url,
    parentCategory,
    parentCategoryID,
  });

  if (!name) {
    return next(new errorHandler("Category name is requried"));
  }
  if (!url) {
    return next(new errorHandler("Category url is requried"));
  }

  if (!category) {
    return next(new errorHandler(message, 404));
  }

  await category.save();
  res.status(200).json({
    message: "Category created successfully",
  });
});

const getCategory = CatchAsyncError(async (req, res, next) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return next(new errorHandler("Category enter vaild product id", 404));
  }
  const category = await CategoryModel.findById(id);

  if (!category) {
    return next(new errorHandler("Category not find with this ID", 404));
  }

  res.status(200).json({
    category,
  });
});

const getAllCategory = CatchAsyncError(async (req, res, next) => {
  const categories = await CategoryModel.find();

  console.log(categories);
  
  res.status(200).json({
    categories,
  });
});

const updateCategory = CatchAsyncError(async (req, res, next) => {
  const _id = req.params.id;

  const { name, url, parentCategory, parentCategoryID } = req.body;

  const isUrlExist = await CategoryModel.find({ url });

  if (!mongoose.Types.ObjectId.isValid(_id)) {
    return next(new errorHandler("Please enter vaild product id", 404));
  }

  let category = await CategoryModel.findOne({ _id });

  if (!category) {
    return next(new errorHandler("Category not found with this id", 404));
  }

  if (url != category.url) {
    if (isUrlExist.length == 1) {
      return res.status(409).json({
        message: "Url already exists",
      });
    }
  }

  category.name = name;
  category.url = url;
  if (parentCategory != undefined) {
    category.parentCategory = parentCategory;
    category.parentCategoryID = parentCategoryID?.toString();
  }

  await CategoryModel.updateMany(
    { parentCategoryID: category._id },
    { parentCategory: category.name }
  );
  await category.save();

  res.status(200).json({
    message: "Category Updated Successfully",
  });
});

const deleteCategory = CatchAsyncError(async (req, res, next) => {
  const id = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return next(new errorHandler("Please enter vaild category id", 404));
  }

  const category = await CategoryModel.findByIdAndDelete(id);
  if (!category) {
    return next(new errorHandler("Can't delete category", 404));
  }

  const result = await CategoryModel.deleteMany({
    parentCategoryID: category._id,
  });

  res.status(200).json({
    message: "Category Delete Successfully",
  });
});

const getSubCategories = CatchAsyncError(async (req, res, next) => {
  const id = req.params.id;

  const subCategories = await CategoryModel.find({ parentCategoryID: id });

  res.status(200).json({
    subCategories,
  });
});

export {
  createCategory,
  getCategory,
  getAllCategory,
  updateCategory,
  deleteCategory,
  getSubCategories,
};
