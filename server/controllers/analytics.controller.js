import { CatchAsyncError } from "../middleware/catchAsyncError.js";
import courseModel from "../models/course.model.js";
import orderModel from "../models/orderModel.js";
import userModel from "../models/user.model.js";
import { generateLast12MonthsData } from "../utils/analytics.generator.js";
import ErrorHandler from "../utils/errorHandler.js";


export const getUserAnalytics = CatchAsyncError(async(req,res,next) => {
    try {
        const users = await generateLast12MonthsData(userModel);

        res.status(200).json({
            success: true,
            users,
        })
    } catch (error) {
        return next(new ErrorHandler(error.message,500))
    }
})

export const getCourseAnalytics = CatchAsyncError(async(req,res,next) => {
    try {
        const courses = await generateLast12MonthsData(courseModel);

        res.status(200).json({
            success: true,
            courses,
        })
    } catch (error) {
        return next(new ErrorHandler(error.message,500))
    }
})

export const getOrderAnalytics = CatchAsyncError(async(req,res,next) => {
    try {
        const orders = await generateLast12MonthsData(orderModel);

        res.status(200).json({
            success: true,
            orders,
        })
    } catch (error) {
        return next(new ErrorHandler(error.message,500))
    }
})