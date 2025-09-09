import express from "express";
import { authorizeRoles, isAuthenticated } from "../middleware/auth.js";
import { createOrder, getAllOrder } from "../controllers/order.controller.js";
import { updateAccessToken } from "../controllers/user.controller.js";
const orderRouter = express.Router();

orderRouter.post(
  "/create-order",
  updateAccessToken,
  isAuthenticated,
  createOrder
);
orderRouter.get(
  "/get-all-order",
  updateAccessToken,
  isAuthenticated,
  authorizeRoles("admin", getAllOrder)
);

export default orderRouter;
