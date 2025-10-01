import { CatchAsyncError } from "../middleware/catchAsyncError.js";
import FAQsModel from "../models/FAQs.model.js";
import ErrorHandler from "../utils/errorHandler.js";



const uploadFAQs = CatchAsyncError(async(req,res,next) => {
    try {
        const data = req.body;
        const FAQ = await FAQsModel.create(data)
    
        if(!FAQ){
            return next(new ErrorHandler("FAQ not created",400))
        }
        res.status(200).json({
            success: true,
            FAQ,
        })
    } catch (error) {
        return next(new ErrorHandler(error.message,400));
    }
})

const getAllFAQ = CatchAsyncError(async(req,res,next) => {
    try {
    const FAQs = await FAQsModel
      .find()
      

    res.status(200).json({
      success: true,
      FAQs,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 400));
  }
})

export {uploadFAQs,getAllFAQ}