import express from "express";
import { isAuthorized } from "../middleware/isAuthorized.js";
import isAdmin from "../middleware/isAdmin.js";
import {
  createCategory,
  deleteCategory,
  getAllCategory,
  getCategory,
  getSubCategories,
  updateCategory,
} from "../controllers/categoryController.js";

const router = express.Router();
router.post("/create", isAuthorized, createCategory);
router.get("/", isAuthorized, isAdmin, getAllCategory);
router.get("/get/:id", isAuthorized, isAdmin, getCategory);
router.get("/subcategory/:id", isAuthorized, isAdmin, getSubCategories);
router.put("/update/:id", isAuthorized, isAdmin, updateCategory);
router.delete("/delete/:id", isAuthorized, isAdmin, deleteCategory);

export default router;
