import express from "express";
import { isAuthorized } from "../middleware/isAuthorized.js";
import {
  createProduct,
  deleteProduct,
  getAllProduct,
  getProduct,
  updateProduct,
} from "../controllers/productController.js";
import isAdmin from "../middleware/isAdmin.js";
import upload from "../utils/Multer.js";

const router = express.Router();

router.post(
  "/create",
  isAuthorized,
  isAdmin,
  upload.array("productImage", 10),
  createProduct
);
router.get("/get/:id", getProduct);
router.delete("/delete/:id", isAuthorized, isAdmin, deleteProduct);
router.put(
  "/update/:id",
  isAuthorized,
  isAdmin,
  upload.array("productImage", 10),
  updateProduct
);
router.get("/", getAllProduct);

export default router;
