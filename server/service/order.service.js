
import { CatchAsyncError } from "../middleware/catchAsyncError.js";
import orderModel from "../models/orderModel.js";

export const newOrder = CatchAsyncError(async (data,res, next) => {
  const order = await orderModel.create(data);

  res.status(201).json({
    success: true,
    order,
  });
});
