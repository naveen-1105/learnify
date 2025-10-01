import { CatchAsyncError } from "../middleware/catchAsyncError.js";
import courseModel from "../models/course.model.js";
import NotificationModel from "../models/notificationModel.js";
import userModel from "../models/user.model.js";
import orderModel from "../models/orderModel.js";
import { newOrder } from "../service/order.service.js";
import ErrorHandler from "../utils/errorHandler.js";
import sendMail from "../utils/sendMail.js";
import ejs from "ejs";
import path from "path";
import { redis } from "../utils/redis.js";

import Stripe from "stripe";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const createOrder = CatchAsyncError(async (req, res, next) => {
  try {
    const { courseId, payment_info } = req.body;

    if (payment_info) {
      if ("id" in payment_info) {
        const paymentIntentId = payment_info.id;
        const paymentIntent = await stripe.paymentIntents.retrieve(
          paymentIntentId
        );

        if (paymentIntent.status !== "succeeded") {
          return next(new ErrorHandler("Payment not authorized!", 400));
        }
      }
    }

    const user = await userModel.findById(req.user?._id);

    const courseExistInUser = user.courses.some(
      (course) => course._id.toString() === courseId.toString()
    );

    if (courseExistInUser) {
      return next(
        new ErrorHandler("You have already purchased this course", 400)
      );
    }

    const course = await courseModel.findById(courseId);

    if (!course) {
      return next(new ErrorHandler("course not found", 400));
    }

    const data = {
      courseId: course._id,
      userId: user?._id,
    };

    const mailData = {
      order: {
        _id: course._id.toString().slice(0, 6),
        name: course.name,
        price: course.price,
        date: new Date().toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        }),
      },
    };

    const html = await ejs.renderFile(
      path.resolve("mails/order-confirmation.ejs"),
      { order: mailData }
    );

    try {
      if (user) {
        await sendMail({
          email: user.email,
          subject: "Order Confirmation",
          template: "order-confirmation.ejs",
          data: mailData,
        });
      }
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }

    user.courses.push({ courseId: course._id.toString() });
    await user.save();

    await user.save();

    await redis.set(req.user?.id, JSON.stringify(user));

    // Increment the purchased count, if undefined initialize to 1
    course.purchased = (course.purchased || 0) + 1;

    await course.save();
    newOrder(data, res, next);
  } catch (error) {
    return next(new ErrorHandler(error.message, 400));
  }
});

const getAllOrder = CatchAsyncError(async (req, res, next) => {
  try {
    console.log('Getting all orders...');
    const orders = await orderModel.find();
    console.log('Orders found:', orders);
    res.status(200).json({
      success: true,
      orders,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 400));
  }
});

const sendStripePublishableKey = CatchAsyncError(async (req, res, next) => {
  res.status(200).json({
    publishablekey: process.env.STRIPE_PUBLISHABLE_KEY,
  });
});

const newPayment = CatchAsyncError(async (req, res, next) => {
  try {
    const myPayment = await stripe.paymentIntents.create({
      amount: req.body.amount,
      currency: "USD",
      metadata: { company: "Learnify" },
      automatic_payment_methods: { enabled: true },
    });

    res.status(201).json({
      success: true,
      client_secret: myPayment.client_secret,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

export { createOrder, getAllOrder, sendStripePublishableKey, newPayment };
