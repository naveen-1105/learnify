"use client";
import Header from "../../components/Header";
import React, { useEffect, useState } from "react";
import { useUploadFAQMutation } from "../../../../client/redux/feature/FAQs/FAQsAPI";
import { useGetAllFAQsQuery } from "../../../../client/redux/feature/FAQs/FAQsAPI";
import toast from "react-hot-toast";
import Loader from "../../components/Loader";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import FAQs from "../../components/FAQs";

const page = () => {
  const [active, setActive] = useState(false);
  

  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault(); // ⛔️ stop the default refresh
    try {
      await uploadFAQ({ question, answer }).unwrap();

      toast.success("FAQ uploaded successfully ✅");
      setQuestion("");
      setAnswer("");
      setActive(false);
    } catch (err) {
      toast.error("Error uploading FAQ:");
    }
  };

  return (
    <div className="w-full min-h-screen">
      <Header />
      

      {/* Upload FAQ Button */}
      <div className="flex justify-end p-4 bg-gradient-to-br from-violet-950 to-black">
        <button
          className="px-6 py-2 bg-green-500 rounded-full hover:bg-green-600"
          onClick={() => setActive(true)}
        >
          Upload New FAQ
        </button>
      </div>

      {/* Modal Popup */}
      {active && (
        <div className="fixed inset-0 flex items-center justify-center bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-2xl shadow-lg w-[90%] md:w-[500px]">
            <h2 className="text-xl font-semibold mb-4 text-center text-black">
              Upload New FAQ
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-black">
                  Question
                </label>
                <input
                  type="text"
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 text-black border-gray-500 placeholder:text-gray-300"
                  placeholder="Enter FAQ question"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-black">
                  Answer
                </label>
                <textarea
                  value={answer}
                  onChange={(e) => setAnswer(e.target.value)}
                  className="w-full p-2 border rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-green-400  border-gray-500 placeholder:text-gray-300"
                  placeholder="Enter FAQ answer"
                  rows="4"
                ></textarea>
              </div>

              {/* Buttons */}
              <div className="flex justify-between">
                <button
                  type="button"
                  onClick={() => setActive(false)}
                  className="px-4 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <FAQs/>
      
    </div>
  );
};

export default page;
