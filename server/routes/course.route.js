import express from "express";
import {
  coursePreview,
  editCourse,
  generateVideoUrl,
  getAllCourse,
  uploadCourse,
} from "../controllers/course.controller.js";
import { authorizeRoles, isAuthenticated } from "../middleware/auth.js";
import { updateAccessToken } from "../controllers/user.controller.js";
const courseRouter = express.Router();

courseRouter.post(
  "/create-course",
  updateAccessToken,
  isAuthenticated,
  authorizeRoles("admin"),
  uploadCourse
);

courseRouter.put(
  "/edit-course/:id",
  updateAccessToken,
  isAuthenticated,
  authorizeRoles("admin"),
  editCourse
);

courseRouter.get("/get-course-preview/:id", coursePreview);
courseRouter.get("/get-courses", getAllCourse);
courseRouter.post("/getVdoCipherOTP",generateVideoUrl);

export default courseRouter;
