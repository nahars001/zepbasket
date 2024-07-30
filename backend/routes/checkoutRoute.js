import express from "express";
import { isAuthorized } from "../middleware/isAuthorized.js";
import {
  createCart,
  deleteCart,
  getCart,
  updateCart,
} from "../controllers/checkoutControllers.js";

const router = express.Router();

router.post("/create", isAuthorized, createCart);
router.get("/get", isAuthorized, getCart);
router.put("/update/:id", isAuthorized, updateCart);
router.delete("/delete/:id", isAuthorized, deleteCart);

export default router;
