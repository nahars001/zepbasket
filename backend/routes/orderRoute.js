import express from "express";
import { isAuthorized } from "../middleware/isAuthorized.js";
import isAdmin from "../middleware/isAdmin.js";
import {
  createOrder,
  getAdminAllOrder,
  getAllOrder,
  getOrder,
  updateOrder,
} from "../controllers/orderController.js";

const router = express.Router();

router.post("/create", isAuthorized, createOrder);
router.put("/update/:id", isAuthorized, updateOrder);
router.get("/get/:id", isAuthorized, getOrder);
router.get("/getall", isAuthorized, getAllOrder);
router.get("/admin/getall", isAuthorized, isAdmin, getAdminAllOrder);

export default router;
