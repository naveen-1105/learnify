import express from "express";
import { coursePreview, editCourse, getAllCourse, uploadCourse } from "../controllers/course.controller.js";
import { authorizeRoles, isAuthenticated } from "../middleware/auth.js";
const courseRouter = express.Router();

courseRouter.post(
  "/create-course",
  isAuthenticated,
  authorizeRoles("admin"),
  uploadCourse
);

courseRouter.put(
  "/edit-course/:id",
  isAuthenticated,
  authorizeRoles("admin"),
  editCourse
);


courseRouter.get("/get-course-preview/:id", coursePreview);
courseRouter.get("/get-courses", getAllCourse);



export default courseRouter;
