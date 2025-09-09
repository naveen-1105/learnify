import { CatchAsyncError } from "../middleware/catchAsyncError.js";
import courseModel from "../models/course.model.js";
import createCourse from "../service/course.service.js";
import ErrorHandler from "../utils/errorHandler.js";
import cloudinary from "cloudinary";
import { redis } from "../utils/redis.js";
import axios from "axios";
import mongoose from "mongoose";
import sendMail from "../utils/sendMail.js";
import ejs from "ejs";
import path from "path";

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
    const courses = await courseModel
      .find()
      .select(
        "-courseData.videoUrl -courseData.suggestion -courseData.question -courseData.links"
      );

    res.status(200).json({
      success: true,
      courses,
    });
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
          "Content-Type": "application/json",
          Authorization: `Apisecret ${process.env.VDOCIPHER_API_SECRET}`,
        },
      }
    );
    res.json(response.data);
  } catch (error) {
    return next(new ErrorHandler(error.message, 400));
  }
});

const getCourseContent = CatchAsyncError(async (req, res, next) => {
  try {
    const userCourseList = req.user?.courses;
    const courseId = req.params.id;
    console.log(userCourseList);
    const courseExists = userCourseList?.find(
      (course) => course._id.toString() === courseId
    );

    if (!courseExists) {
      return next(
        new ErrorHandler("you are not eligible to access this course", 404)
      );
    }

    const course = await courseModel.findById(courseId);

    const content = course?.courseData;

    res.status(200).json({
      success: true,
      content,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

const addQuestion = CatchAsyncError(async (req, res, next) => {
  try {
    const { question, courseId, contentId } = req.body;
    const course = await courseModel.findById(courseId);

    if (!mongoose.Types.ObjectId.isValid(contentId)) {
      return next(new ErrorHandler("Invalid content id", 400));
    }

    const courseContent = course?.courseData?.find((item) =>
      item._id.equals(contentId)
    );

    if (!courseContent) {
      return next(new ErrorHandler("Invalid content id", 400));
    }

    const newQuestion = {
      user: req.user,
      question,
      questionReplies: [],
    };

    courseContent.questions.push(newQuestion);

    await course?.save();

    res.status(200).json({
      success: true,
      course,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

const addAnswer = CatchAsyncError(async (req, res, next) => {
  try {
    const { answer, courseId, contentId, questionId } = req.body;
    const course = await courseModel.findById(courseId);

    if (!mongoose.Types.ObjectId.isValid(contentId)) {
      return next(new ErrorHandler("Invalid content id", 400));
    }

    const courseContent = course?.courseData?.find((item) =>
      item._id.equals(contentId)
    );

    if (!courseContent) {
      return next(new ErrorHandler("Invalid content id", 400));
    }

    const question = courseContent?.questions?.find((item) =>
      item._id.equals(questionId)
    );

    if (!question) {
      return next(new ErrorHandler("Invalid question id", 400));
    }

    const newAnswer = {
      user: req.user,
      answer,
    };

    question.questionReplies.push(newAnswer);

    await course?.save();

    if (req.user._id === question.user._id) {
    } else {
      const data = {
        name: question.user.name,
        title: courseContent.title,
      };

      const html = await ejs.renderFile(
        path.resolve("mails/question-reply.ejs"),
        data
      );

      try {
        await sendMail({
          email: question.user.email,
          subject: "Question Reply",
          template: "question-reply.ejs",
          data,
        });

        res.status(200).json({
          success: true,
          course,
        })
      } catch (error) {
        return next(new ErrorHandler(error.message, 500));
      }
    }
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

const addReview = CatchAsyncError(async(req,res,next) => {
  try {
    const userCourseList = req.user.courses;
    const courseId = req.params.id;
    const courseExists = userCourseList?.some((course) => course._id.toString() === courseId.toString());

    if(!courseExists){
      return next(new ErrorHandler("You are not eligible to access this course",400))
    }

    const course = await courseModel.findById(courseId);

    const {review,rating} = req.body;
    const reviewData = {
      user: req.user,
      rating,
      comment: review,
    }

    course?.reviews.push(reviewData);

    let avg = 0;

    course?.reviews.forEach((rev) => {
      avg += rev.rating;
    })

    course.ratings = avg / course?.reviews.length;

    await course?.save();

    const notification = {
      title: "New Review Received",
      message: `${req.user?.name} has given a review in ${course?.name}`
    }

    res.status(200).json({
      success: true,
      course, 
    })
  } catch (error) {
      return next(new ErrorHandler(error.message,400));
  }
})

const addReplyToReview = CatchAsyncError(async(req,res,next) => {
  try {
    const {comment,courseId,reviewId} = req.body;

    const course = await courseModel.findById(courseId);

    if(!course){
      return next(new ErrorHandler("course not found",404));
    }

    const review = course?.reviews?.find((rev) => rev._id.toString() === reviewId.toString())

    const replyData = {
      user: req.user,
      comment
    }

    if(!review.commentReplies){
      review.commentReplies = []
    }
    review.commentReplies.push(replyData)

    await course?.save();
    
    res.status(200).json({
      success: true,
      comment,
    })
  } catch (error) {
    return next(new ErrorHandler(error.message,400))
  }
})

const deleteCourse = CatchAsyncError(async(req,res,next) => {
  try {
      const course = await courseModel.findById(req.params.id);

      if(!course){
        return next(new ErrorHandler("Course not found",404));
      }

      await course.deleteOne();

      await redis.del(req.params.id);

      res.status(200).json({
        success: true,
        message: "Course deleted successfully"
      })
  } catch (error) {
      return next(new ErrorHandler(error.message,400));
  }
})


export {
  uploadCourse,
  editCourse,
  coursePreview,
  getAllCourse,
  generateVideoUrl,
  getCourseContent,
  addQuestion,
  addAnswer,
  addReview,
  addReplyToReview,
  deleteCourse
};
