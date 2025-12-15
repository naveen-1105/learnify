import express from "express";
import {
  addAnswer,
  addQuestion,
  addReplyToReview,
  addReview,
  coursePreview,
  deleteCourse,
  editCourse,
  generateVideoUrl,
  getAllCourse,
  getCourseContent,
  getCourseDetails,
  uploadCourse,
} from "../controllers/course.controller.js";
import { authorizeRoles, isAuthenticated } from "../middleware/auth.js";
import { updateAccessToken } from "../controllers/user.controller.js";
const courseRouter = express.Router();

courseRouter.post(
  "/create-course",
  updateAccessToken,
  isAuthenticated,
  authorizeRoles("admin","teacher"),
  uploadCourse
);

courseRouter.put(
  "/edit-course/:id",
  updateAccessToken,
  isAuthenticated,
  authorizeRoles("admin" , "teacher"),
  editCourse
);

courseRouter.get("/get-course-preview/:id", coursePreview);
courseRouter.get("/get-courses", getAllCourse);
courseRouter.post("/getVdoCipherOTP", generateVideoUrl);
courseRouter.get(
  "/get-course-content/:id",
  updateAccessToken,
  isAuthenticated,
  getCourseContent
);
courseRouter.put(
  "/add-question",
  updateAccessToken,
  isAuthenticated,
  addQuestion
);
courseRouter.put("/add-answer", 
  updateAccessToken, 
  isAuthenticated, 
  addAnswer
);


courseRouter.put(
  "/add-review/:id",
  updateAccessToken,
  isAuthenticated,
  addReview
);
courseRouter.put(
  "/add-reply",
  updateAccessToken,
  isAuthenticated,
  addReplyToReview
);
courseRouter.delete(
  "/delete-course/:id",
  updateAccessToken,
  isAuthenticated,
  authorizeRoles('admin' , "teacher"),
  deleteCourse
);
courseRouter.get(
  "/get-course-details/:id",
  getCourseDetails
);

export default courseRouter;
