import { CatchAsyncError } from "../middleware/catchAsyncError.js";
import courseModel from "../models/course.model.js";

const createCourse = CatchAsyncError(async(data,res) => {
    const course = await courseModel.create(data);
    res.status(201).json({
        success: true,
        course
    })
})

export default createCourse