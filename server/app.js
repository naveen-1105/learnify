
import express from "express"
export const app = express()
import cors from "cors"
import cookieParser from "cookie-parser"
import { ErrorMiddleware } from "./middleware/error.js";
import userRouter from "./routes/user.routes.js";
import courseRouter from "./routes/course.route.js";
import orderRouter from "./routes/order.route.js";
import notificationRouter from "./routes/notification.route.js";
import dotenv from "dotenv"
import FAQSRouter from "./routes/FAQs.route.js";
import analyticsRouter from "./routes/analytics.route.js";
import { rateLimit } from 'express-rate-limit'
dotenv.config()


app.use(express.json({limit:"50mb"}))

app.use(cookieParser())

app.use(cors({
    origin: process.env.ORIGIN || "http://localhost:3000",
  credentials: true
}));



const limiter = rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutes
	limit: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
	standardHeaders: 'draft-8', // draft-6: `RateLimit-*` headers; draft-7 & draft-8: combined `RateLimit` header
	legacyHeaders: false,
	
})

// Apply the rate limiting middleware to all requests.
app.use(limiter)


app.use("/api/v1",userRouter,orderRouter,notificationRouter,FAQSRouter,analyticsRouter)

app.use("/api/v1",courseRouter)


app.get("/test", (req, res, next) => {
    res.status(200).json({
        success: true,
        message: "API is working"
    });
});


// app.all("*",(req: Request, res: Response, next: NextFunction) => {
//     const err = new Error(`Route ${req.originalUrl} not found`) as any;
//     err.statusCode = 404;
//     next(err)
// })

app.use(limiter)

app.use(ErrorMiddleware);