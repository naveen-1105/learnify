import userModel from "../models/user.model.js";
import ErrorHandler from "../utils/errorHandler.js";
import { CatchAsyncError } from "../middleware/catchAsyncError.js";
import jwt from "jsonwebtoken";
import sendMail from "../utils/sendMail.js";
import {
  accessTokenOptions,
  refreshTokenOptions,
  sendToken,
} from "../utils/jwt.js";
import { redis } from "../utils/redis.js";
import dotenv from "dotenv";
import { getUserById } from "../service/user.service.js";
dotenv.config();
import cloudinary from "cloudinary";

const createActivationToken = (user) => {
  const activationCode = Math.floor(100000 + Math.random() * 900000).toString();

  const activationToken = jwt.sign(
    {
      user,
      activationCode,
    },
    process.env.ACTIVATION_KEY,
    {
      expiresIn: "5h",
    }
  );
  return { activationToken, activationCode };
};
const registrationUser = CatchAsyncError(async (req, res, next) => {
  try {
    console.log('Registration attempt for:', req.body.email);
    const { name, email, password, role } = req.body;

    const isEmailExist = await userModel.findOne({ email });
    if (isEmailExist) {
      console.log('Email exists:', email);
      return next(new ErrorHandler("Email already exist", 400));
    }

    const user = {
      name,
      email,
      password,
      role,
    };

    console.log('Creating activation token for:', email);
    const activationToken = createActivationToken(user);
    const activationCode = activationToken.activationCode;

    const data = { user: { name: user.name }, activationCode };

    try {
      console.log('Attempting to send mail to:', user.email);
      
      // Set a timeout for the entire mail sending process
      const mailTimeout = new Promise((_, reject) => {
        setTimeout(() => {
          reject(new Error('Mail sending timed out after 15 seconds'));
        }, 15000);
      });

      try {
        // Race between mail sending and timeout
        await Promise.race([
          sendMail({
            email: user.email,
            subject: "Activate your account",
            template: "activation-mail.ejs",
            data,
          }),
          mailTimeout
        ]);
        
        console.log('Mail sent successfully to:', user.email);
      } catch (mailError) {
        console.error('Mail sending error:', mailError);
        // Continue with registration even if mail fails
        console.log('Proceeding with registration despite mail failure');
      }

      res.cookie("activation_token", activationToken.activationToken, {
        httpOnly: true,
        maxAge: 5 * 60 * 60 * 1000, // 5 hours
        sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
        secure: process.env.NODE_ENV === "production",
      });

      res.status(201).json({
        success: true,
        message: `Registration successful! Your activation code is: ${activationToken.activationCode}. If you don't receive an email, use this code to activate your account.`,
        activationToken: activationToken.activationToken,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 400));
    }
  } catch (error) {
    return next(new ErrorHandler(error.message, 400));
  }
});

const activateUser = CatchAsyncError(async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return next(new ErrorHandler("No token provided", 401));
    }

    const activationToken = authHeader.split(" ")[1];
    const { activationCode } = req.body;

    const newUser = jwt.verify(activationToken, process.env.ACTIVATION_KEY);

    if (newUser.activationCode !== activationCode) {
      return next(new ErrorHandler("Invalid activation code", 400));
    }

    const { name, email, password, role } = newUser.user;

    const existedUser = await userModel.findOne({ email });

    if (existedUser) {
      return next(new ErrorHandler("User already exist", 400));
    }

    await userModel.create({
      name,
      email,
      password,
      role,
    });
    res.status(201).json({
      success: true,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 400));
  }
});

const loginUser = CatchAsyncError(async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return next(new ErrorHandler("please enter email and password", 400));
    }

    const user = await userModel.findOne({ email }).select("+password");

    if (!user) {
      return next(new ErrorHandler("Invalid email or password", 400));
    }

    const isPasswordMatch = await user.comparePassword(password);
    if (!isPasswordMatch) {
      return next(new ErrorHandler("Invalid password", 400));
    }
    sendToken(user, 200, res);
  } catch (error) {
    return next(new ErrorHandler(error.message, 400));
  }
});

const logoutUser = CatchAsyncError(async (req, res, next) => {
  try {
    res.clearCookie("access_token", {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
    });

    res.clearCookie("refresh_token", {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
    });

    const userId = String(req.user?._id) || "";

    await redis.del(userId);
    res.status(200).json({
      success: true,
      message: "Logged out successfully",
    });
  } catch (error) {
    throw next(new ErrorHandler(error.message, 400));
  }
});

const updateAccessToken = CatchAsyncError(async (req, res, next) => {
  try {
    const refresh_token = req.cookies.refresh_token;

    const decoded = jwt.verify(refresh_token, process.env.REFRESH_TOKEN);
    if (!decoded) {
      return next(new ErrorHandler("could not refresh token", 400));
    }

    const session = await redis.get(decoded.id);
    if (!session) {
      return next(new ErrorHandler("could not refresh tokens", 400));
    }

    const user = JSON.parse(session);

    const accessToken = jwt.sign({ id: user._id }, process.env.ACCESS_TOKEN, {
      expiresIn: "5m",
    });

    const refreshToken = jwt.sign({ id: user._id }, process.env.REFRESH_TOKEN, {
      expiresIn: "3d",
    });

    req.user = user;

    res.cookie("access_token", accessToken, accessTokenOptions);
    res.cookie("refresh_token", refreshToken, refreshTokenOptions);

    return next();
  } catch (error) {
    return next(new ErrorHandler(error.message, 400));
  }
});

const getUserInfo = CatchAsyncError(async (req, res, next) => {
  try {
    const userId = req.user?._id;
    getUserById(userId, res);
  } catch (error) {
    return next(new ErrorHandler(error.message, 400));
  }
});

const socialAuth = CatchAsyncError(async (req, res, next) => {
  try {
    const { email, name, avatar } = req.body;
    const user = await userModel.findOne({ email });
    if (!user) {
      const newUser = await userModel.create({ email, name, avatar });
      sendToken(newUser, 200, res);
    } else {
      sendToken(user, 200, res);
    }
  } catch (error) {
    return next(new ErrorHandler(error.message, 400));
  }
});

const updateUserInfo = CatchAsyncError(async (req, res, next) => {
  try {
    const { name } = req.body;
    const userId = req.user?._id;
    const user = await userModel.findById(userId);
    if (name && user) {
      user.name = name;
    }

    await user.save();

    await redis.set(userId, JSON.stringify(user));

    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 400));
  }
});

const updatePassword = CatchAsyncError(async (req, res, next) => {
  try {
    const { oldPassword, newPassword } = req.body;
    const user = await userModel.findById(req.user?._id).select("+password");

    if (!user) {
      return next(ErrorHandler(error.message, 400));
    }
    const isPasswordMatch = await user.comparePassword(oldPassword);
    if (!isPasswordMatch) {
      return next(new ErrorHandler("Invalid current password", 400));
    }

    user.password = newPassword;
    await user.save();
    redis.set(req.user?._id, JSON.stringify(user));

    return res.status(200).json({
      success: true,
      message: "password updated",
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 400));
  }
});

const updateProfilePicture = CatchAsyncError(async (req, res, next) => {
  try {
    const { avatar } = req.body;

    const userId = req.user?._id;

    const user = await userModel.findById(userId);
    if (avatar && user) {
      if (user?.avatar?.public_id) {
        await cloudinary.v2.uploader.destroy(user?.avatar?.public_id);

        const myCloud = await cloudinary.v2.uploader.upload(avatar, {
          folder: "avatars",
          width: 150,
        });
        user.avatar = {
          public_id: myCloud.public_id,
          url: myCloud.secure_url,
        };
      } else {
        const myCloud = await cloudinary.v2.uploader.upload(avatar, {
          folder: "avatars",
          width: 150,
        });
        user.avatar = {
          public_id: myCloud.public_id,
          url: myCloud.secure_url,
        };
      }
    }

    await user?.save();
    await redis.set(userId, JSON.stringify(user));

    res.status(200).json({
      success: true,
      message: "Profile picture updated",
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 400));
  }
});

const getAllUser = CatchAsyncError(async (req, res, next) => {
  try {
    const users = await userModel.find();
    res.status(200).json({
      success: true,
      users,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 400));
  }
});
const updateUserRole = CatchAsyncError(async (req, res, next) => {
  try {
    const { email } = req.body;
    const user = await userModel.findOne({ email });
    if (!user) {
      return next(new ErrorHandler("User not found", 404));
    }
    user.role === "admin" ? (user.role = "user") : (user.role = "admin");
    await user.save();
    res.status(200).json({
      success: true,
      message: "user's role has been promoted to admin",
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 400));
  }
});

const deleteUser = CatchAsyncError(async (req, res, next) => {
  try {
    const user = await userModel.findById(req.params.id);

    if (!user) {
      return next(new ErrorHandler("User not found", 404));
    }

    await user.deleteOne();

    await redis.del(req.params.id);

    res.status(200).json({
      success: true,
      message: "User deleted successfully",
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 400));
  }
});

export {
  registrationUser,
  loginUser,
  activateUser,
  logoutUser,
  updateAccessToken,
  getUserInfo,
  socialAuth,
  updateUserInfo,
  updatePassword,
  updateProfilePicture,
  getAllUser,
  updateUserRole,
  deleteUser,
};
