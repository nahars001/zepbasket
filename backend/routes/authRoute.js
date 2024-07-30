import express from "express";
import {
  deleteUser,
  forgotPass,
  getAllUser,
  getUserAdmin,
  getUserProfile,
  loginUser,
  registerUser,
  resetPassword,
  resetTokenVerify,
  updatePassword,
  updateUser,
  updateUserAdmin,
  userLogout,
} from "../controllers/authController.js";
import { isAuthorized } from "../middleware/isAuthorized.js";
import isAdmin from "../middleware/isAdmin.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/logout", isAuthorized, userLogout);
router.get("/profile", isAuthorized, getUserProfile);
router.put("/profile", isAuthorized, updateUser);
router.post("/update/password", isAuthorized, updatePassword);
router.get("/admin/users", isAuthorized, isAdmin, getAllUser);
router.get("/admin/:id", isAuthorized, isAdmin, getUserAdmin);
router.put("/admin/:id", isAuthorized, isAdmin, updateUserAdmin);
router.delete("/delete/:id", isAuthorized, isAdmin, deleteUser);
router.post("/password/forgot", forgotPass);
router.get("/password/verify/:token", resetTokenVerify);
router.put("/password/reset/:token", resetPassword);

export default router;
