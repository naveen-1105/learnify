import express from "express"
import { authorizeRoles, isAuthenticated } from "../middleware/auth.js";
import { updateAccessToken } from "../controllers/user.controller.js";
import { getCourseAnalytics, getOrderAnalytics, getUserAnalytics } from "../controllers/analytics.controller.js";
const courseRouter = express.Router();

const analyticsRouter = express.Router()

analyticsRouter.get("/get-user-analytics",updateAccessToken,isAuthenticated,authorizeRoles("admin", "teacher"),getUserAnalytics)
analyticsRouter.get("/get-course-analytics",updateAccessToken,isAuthenticated,authorizeRoles("admin", "teacher"),getCourseAnalytics)
analyticsRouter.get("/get-order-analytics",updateAccessToken,isAuthenticated,authorizeRoles("admin", "teacher"),getOrderAnalytics)

export default analyticsRouter