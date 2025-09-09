
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
dotenv.config()


app.use(express.json({limit:"50mb"}))

app.use(cookieParser())

app.use(cors({
    origin: process.env.ORIGIN || "http://localhost:3000",
  credentials: true
}));


app.use("/api/v1",userRouter,orderRouter,notificationRouter)

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

app.use(ErrorMiddleware);