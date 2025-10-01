import express from "express";
import { updateAccessToken } from "../controllers/user.controller.js";
import { authorizeRoles, isAuthenticated } from "../middleware/auth.js";
import  { uploadFAQs,getAllFAQ } from "../controllers/FAQs.controller.js";
import courseRouter from "./course.route.js";
const FAQSRouter = express.Router();

FAQSRouter.post(
  "/upload-faq",
  updateAccessToken,
  isAuthenticated,
  authorizeRoles("admin"),
  uploadFAQs
);

FAQSRouter.get(
  "/get-all-faq",
  getAllFAQ
);


export default FAQSRouter