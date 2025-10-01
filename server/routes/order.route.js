import express from "express";
import { authorizeRoles, isAuthenticated } from "../middleware/auth.js";
import { createOrder, getAllOrder, newPayment, sendStripePublishableKey } from "../controllers/order.controller.js";
import { updateAccessToken } from "../controllers/user.controller.js";
const orderRouter = express.Router();

orderRouter.post(
  "/create-order",
  updateAccessToken,
  isAuthenticated,
  createOrder
);
orderRouter.get(
  "/get-all-orders",
  updateAccessToken,
  isAuthenticated,
  authorizeRoles("admin" , "teacher"),
  getAllOrder
);
orderRouter.get('/payment/stripepublishablekey', sendStripePublishableKey);

orderRouter.post("/payment", updateAccessToken,isAuthenticated,newPayment)

export default orderRouter;
