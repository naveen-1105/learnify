import { CatchAsyncError } from "./catchAsyncError.js";
import ErrorHandler from "../utils/errorHandler.js";
import jwt from "jsonwebtoken";
import { redis } from "../utils/redis.js";

export const isAuthenticated = CatchAsyncError(async (req, res, next) => {
 
  const access_token = req.cookies.access_token;

  if (!access_token) {
    return next(new ErrorHandler("User is not Authenticated", 400));
  }


  const decoded = jwt.verify(access_token, process.env.ACCESS_TOKEN);

  if (!decoded) {
    return next(new ErrorHandler("token invalid", 400));
  }

  const user = await redis.get(decoded.id);

  if (!user) {
    return next(new ErrorHandler("user not found", 400));
  }

  req.user = JSON.parse(user);
  next();
});

export const authorizeRoles = (...roles)=> {
  return (req,res,next) => {
    if(!roles.includes(req.user?.role) || ''){
      return next(new ErrorHandler(`Role: ${req.user?.role} is not allowed to access this resource`,403))
    }
    next();
  }
}
