import mongoose from "mongoose";

const FAQSchema = new mongoose.Schema(
  {
    question: { type: String, required: true },
    answer: { type: String, required: true },
  },
  { timestamps: true }
);

const FAQsModel = mongoose.model("FAQs", FAQSchema);

export default FAQsModel;
