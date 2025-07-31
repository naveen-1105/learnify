import {Redis} from "ioredis"
import dotenv from "dotenv"
dotenv.config()

const redisClient = () => {
    if(process.env.REDIS_URL){
        console.log('Redis connnected');
        return process.env.REDIS_URL
    }
    throw new Error('redis connection failed')
}

export const redis = new Redis(redisClient())