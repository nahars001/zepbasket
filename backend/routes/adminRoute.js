import express from "express"
import isAdmin from "../middleware/isAdmin.js"
import { isAuthorized } from "../middleware/isAuthorized.js"
import { adminDashboard } from "../controllers/adminController.js"

const router = express.Router()

router.get("/dashboard" ,isAuthorized, isAdmin, adminDashboard)

export default router