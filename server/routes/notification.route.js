import express from "express";
import { getAllNotifications, updateNotification } from "../controllers/notification.controller.js";
import { updateAccessToken } from "../controllers/user.controller.js";
import { authorizeRoles, isAuthenticated } from "../middleware/auth.js";
const notificationRouter = express.Router();

notificationRouter.get(
  "/get-all-notifications",
  updateAccessToken,
  isAuthenticated,
  authorizeRoles("admin", "teacher"),
  getAllNotifications
);

notificationRouter.put(
  "/update-notification/:id",
  updateAccessToken,
  isAuthenticated,
  authorizeRoles("admin"),
  updateNotification
);

export default notificationRouter;
