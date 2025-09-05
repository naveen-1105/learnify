import { CatchAsyncError } from "../middleware/catchAsyncError.js";
import courseModel from "../models/course.model.js";
import createCourse from "../service/course.service.js";
import ErrorHandler from "../utils/errorHandler.js";
import cloudinary from "cloudinary";
import { redis } from "../utils/redis.js";
import axios from "axios"

const uploadCourse = CatchAsyncError(async (req, res, next) => {
  const data = req.body;
  const thumbnail = data.thumbnail;
  try {
    if (thumbnail) {
      const myCloud = await cloudinary.v2.uploader.upload(thumbnail, {
        folder: "courses",
      });

      data.thumbnail = {
        public_id: myCloud.public_id,
        url: myCloud.secure_url,
      };
    }

    createCourse(data, res, next);
  } catch (error) {
    return next(new ErrorHandler(error.message, 400));
  }
});

const editCourse = CatchAsyncError(async (req, res, next) => {
  try {
    const data = req.body;
    const thumbnail = data.thumbnail;
    if (thumbnail) {
      await cloudinary.v2.uploader.destroy(thumbnail.public_id);

      const myCloud = await cloudinary.v2.uploader.upload(thumbnail, {
        folder: "courses",
      });

      data.thumbnail = {
        public_id: myCloud.public_id,
        url: myCloud.secure_url,
      };
    }

    const courseId = req.params.id;
    const course = await courseModel.findByIdAndUpdate(
      courseId,
      {
        $set: data,
      },
      { new: true }
    );

    res.status(200).json({
      success: true,
      course,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 400));
  }
});

const coursePreview = CatchAsyncError(async (req, res, next) => {
  try {
    const courseId = req.params.id;

    const isCacheExist = await redis.get(courseId);
    if (isCacheExist) {
      const course = JSON.parse(isCacheExist);
      res.status(200).json({
        success: true,
        course,
      });
    } else {
      const course = await courseModel
        .findById(courseId)
        .select(
          "-courseData.videoUrl -courseData.suggestion -courseData.question -courseData.links"
        );

      await redis.set(courseId, JSON.stringify(course));

      res.status(200).json({
        success: true,
        course,
      });
    }
  } catch (error) {
    return next(new ErrorHandler(error.message, 400));
  }
});

const getAllCourse = CatchAsyncError(async (req, res, next) => {
  try {
    const isCacheExist = await redis.get("allCourses");
    if (isCacheExist) {
      const courses = JSON.parse(isCacheExist);
      res.status(200).json({
        success: true,
        courses,
      });
    } else {
      const courses = await courseModel
        .find()
        .select(
          "-courseData.videoUrl -courseData.suggestion -courseData.question -courseData.links"
        );
      await redis.set("allCourses", JSON.stringify(courses));
      res.status(200).json({
        success: true,
        courses,
      });
    }
  } catch (error) {
    return next(new ErrorHandler(error.message, 400));
  }
});

const generateVideoUrl = CatchAsyncError(async (req, res, next) => {
  try {
    const { videoId } = req.body;
    const response = await axios.post(
      `https://dev.vdocipher.com/api/videos/${videoId}/otp`,
      { ttl: 300 },
      {
        headers: {
          Accept: "application/json",
          'Content-Type': 'application/json',
          Authorization: `Apisecret ${process.env.VDOCIPHER_API_SECRET}`,
        },
      }
    );
    res.json(response.data);
  } catch (error) {
    return next(new ErrorHandler(error.message, 400));
  }
});

export { uploadCourse, editCourse, coursePreview, getAllCourse,generateVideoUrl };
