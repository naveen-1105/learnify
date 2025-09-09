import { CatchAsyncError } from "../middleware/catchAsyncError.js";
import courseModel from "../models/course.model.js";
import NotificationModel from "../models/notificationModel.js";
import userModel from "../models/user.model.js";
import { newOrder } from "../service/order.service.js";
import ErrorHandler from "../utils/errorHandler.js";
import sendMail from "../utils/sendMail.js";
import ejs from "ejs"
import path from "path"

const createOrder = CatchAsyncError(async(req,res,next) => {
    try {
        const {courseId,payment_info} = req.body;

        const user = await userModel.findById(req.user?._id);

        const courseExistInUser = user.courses.some((course) => course._id.toString() === courseId.toString());

        if(courseExistInUser){
            return next(new ErrorHandler("You have already purchased this course",400))
        }

        const course = await courseModel.findById(courseId);

        if(!course){
            return next(new ErrorHandler("course not found",400))
        }

        const data = {
            courseId: course._id,
            userId: user?._id,
        }

        

        const mailData = {
            order: {
                _id: course._id.toString().slice(0,6),
                name: course.name,
                price: course.price,
                date: new Date().toLocaleDateString("en-US", {year: 'numeric', month: 'long', day: 'numeric'})
            }
        }

        const html = await ejs.renderFile(
                path.resolve("mails/order-confirmation.ejs"),
                {order:mailData}
              );

              try{
                if(user){
                    await sendMail({
                        email: user.email,
                        subject: "Order Confirmation",
                        template: "order-confirmation.ejs",
                        data: mailData
                    })
                }
              }
              catch (error){
                return next(new ErrorHandler(error.message,500));
              }

              user?.courses.push(course?._id);

              await NotificationModel.create({
                user: user?._id,
                title: "New Order",
                message: `You have a new order from ${course?.name}`
              })
                course.purchased ? course.purchased += 1 : course.purchased;
              
              await course.save();
              newOrder(data,res,next);
              
    } catch (error) {
        return next(new ErrorHandler(error.message,400))
    }
})

const getAllOrder = CatchAsyncError(async (req, res, next) => {
  try {
    const orders = await orderModel.find();
    res.status(200).json({
      success: true,
      orders,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 400));
  }
});

export{
    createOrder,
    getAllOrder
}