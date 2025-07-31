 import mongoose from 'mongoose'
import dotenv from "dotenv"
dotenv.config()

 const dbUrl = process.env.DB_URI || ''

 const connectDB = async () => {
    try {
        await mongoose.connect(dbUrl).then((data) => {
            console.log(`Database connected with ${data.connection.host}`);
        })
    } catch (error) {
        if (error) {
            console.log(error.message);
        } else {
            console.log('Unknown error', error);
        }
        setTimeout(connectDB, 5000);
    }
 }

 export default connectDB