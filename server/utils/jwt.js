import dotenv from "dotenv";
dotenv.config();
import { redis } from "./redis.js";

const accessTokenExpire =
  parseInt(process.env.ACCESS_TOKEN_EXPIRE || "300", 10) * 1000;
const refreshTokenExpire =
  parseInt(process.env.REFRESH_TOKEN_EXPIRE || "259200", 10) * 1000;

// In development we use SameSite 'Lax' so browsers accept cookies over localhost without HTTPS.
// In production we set SameSite='None' and secure=true so cross-site cookies work over HTTPS.
const sameSiteForEnv = process.env.NODE_ENV === "production" ? "None" : "Lax";
const secureForEnv = process.env.NODE_ENV === "production";

export const accessTokenOptions = {
  expires: new Date(Date.now() + accessTokenExpire),
  maxAge: accessTokenExpire,
  httpOnly: true,
  sameSite: sameSiteForEnv,
  secure: secureForEnv,
};

export const refreshTokenOptions = {
  expires: new Date(Date.now() + refreshTokenExpire),
  maxAge: refreshTokenExpire,
  httpOnly: true,
  sameSite: sameSiteForEnv,
  secure: secureForEnv,
};

export const sendToken = (user, statusCode, res) => {
  const accessToken = user.SignAccessToken();
  const refreshToken = user.SignRefreshToken();

  // Set the user data in Redis with an expiration time
  redis.set(String(user._id), JSON.stringify(user), "EX", refreshTokenExpire / 1000);

  if (process.env.NODE_ENV === "production") {
    accessTokenOptions.secure = true;
    refreshTokenOptions.secure = true;
  }

  res.cookie("access_token", accessToken, accessTokenOptions);
  res.cookie("refresh_token", refreshToken, refreshTokenOptions);

  res.status(statusCode).json({
    success: true,
    user,
    accessToken,
  });
};
