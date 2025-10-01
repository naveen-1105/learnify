import {app} from "./app.js"
import cloudinary from "cloudinary"
import dotenv from "dotenv";
import http from "http"
dotenv.config();
import connectDB from "./utils/db.js"
import { initSocketServer } from "./socketServer.js";

const server = http.createServer(app)
initSocketServer(server);

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_SECRET_KEY,
})

// app.listen(process.env.PORT, () => {
//     console.log(`Server is connected on port ${process.env.PORT}`);
//     connectDB()
// })
server.listen(process.env.PORT, () => {
  console.log(`🚀 Server running on port ${process.env.PORT}`);
  connectDB();
});