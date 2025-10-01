"use client";
import React, { useEffect, useState } from "react";
import CoursePlayer from "../../utils/CoursePlayer.jsx";
import CourseContentList from "../../components/Course/CourseContentList.jsx";
import {
  BiDownArrow,
  BiLeftArrow,
  BiRightArrow,
  BiSolidChevronDown,
} from "react-icons/bi";
import Image from "next/image.js";
import {
  useAddAnswerMutation,
  useAddQuestionMutation,
  useAddReviewMutation,
} from "../../../redux/feature/course/CoursesApi.js";
import Reviews from "./CourseContentPage/Review.jsx";
import QuestionAndAnswer from './CourseContentPage/QuestionAndAnswer.jsx'
import { formatDate } from "../../utils/FormatDate.jsx";

const CourseContentPage = ({ courseData, refetchCourse,userData }) => {
  const [activeVideo, setActiveVideo] = useState(null);
  const [activeVideoIndex, setActiveVideoIndex] = useState(0);
  const [activeTab, setActiveTab] = useState(0);
  
  
  

// useEffect(() => {
//   if (activeVideo?.questions) {
//     const initialCollapseState = {};
//     activeVideo.questions.forEach((q) => {
//       initialCollapseState[q._id] = true; // true = collapsed
//     });
//     setCollapsedQuestions(initialCollapseState);
//   }
// }, [activeVideo]);

  useEffect(() => {
  if (courseData) {
    // Only set activeVideo if it's null (first load)
    setActiveVideo((prev) => prev || courseData.courseData[0]);
    setActiveVideoIndex((prevIndex) =>
      prevIndex !== null ? prevIndex : 0
    );
  }
}, [courseData]);


  
  const tabs = ["Overview", "Resources", "Q&A", "Reviews"];

  

  const handleNextLesson = () => {
    if (activeVideoIndex < courseData.courseData.length - 1) {
      const nextIndex = activeVideoIndex + 1;
      setActiveVideoIndex(nextIndex);
      setActiveVideo(courseData.courseData[nextIndex]);
    }
  };

  const handlePrevLesson = () => {
    if (activeVideoIndex > 0) {
      const prevIndex = activeVideoIndex - 1;
      setActiveVideoIndex(prevIndex);
      setActiveVideo(courseData.courseData[prevIndex]);
    }
  };
  

  return (
    <div className="flex sm:flex-row flex-col w-full p-5 gap-5">
      {courseData && (
        <>
          <div className="w-full sm:w-[70%] flex flex-col gap-5">
            <CoursePlayer
              videoUrl={
                activeVideo?.videoUrl || courseData?.courseData[0]?.videoUrl
              }
            />

            <div className="w-full flex flex-col justify-center sm:p-[40px]">
              <p className="my-[10] sm:text-[24px] ">{activeVideo?.title}</p>
              <div className="flex justify-between mb-5">
                <button
                  className="bg-blue-500 rounded-full px-4 py-2 flex items-center gap-2"
                  onClick={() => handlePrevLesson()}
                >
                  <BiLeftArrow />
                  <span>Prev Lesson</span>
                </button>
                <button
                  className="bg-blue-500 rounded-full px-4 py-2 flex items-center gap-2"
                  onClick={handleNextLesson}
                >
                  <span>Next Lesson</span>
                  <BiRightArrow />
                </button>
              </div>

              <div className="flex justify-around sm:gap-10 gap-[5px] bg-gray-700 rounded-3xl sm:px-5 py-2 my-[10px]">
                {tabs?.map((tab, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveTab(index)}
                    className={`sm:px-4 py-2 rounded-xl transition-colors duration-300 cursor-pointer ${
                      activeTab === index ? "text-red-500" : "text-white"
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
              {activeTab === 0 && (
                <div className="w-full">
                  <p className="text-[32px] text-green-500">
                    Course Description
                  </p>
                  <p className="px-5 text-[16px]">{activeVideo?.description}</p>
                </div>
              )}

              {activeTab === 1 && (
                <div className="w-full flex flex-col gap-3">
                  {activeVideo.links?.map((link, index) => (
                    <div key={index}>
                      <p className="text-[24px]">{link.title}</p>
                      <p className="text-[16px] ml-3 text-blue-400">
                        {link.url}
                      </p>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === 2 && (
                <QuestionAndAnswer user={userData.user} courseData={courseData} activeVideo={activeVideo} refetchCourse={refetchCourse} setActiveVideo={setActiveVideo} userData={userData}/>
              )}
              {activeTab === 3 && (
                <Reviews
                  courseData={courseData}
                  refetchCourse={refetchCourse}
                  user = {userData}
                />
              )}
            </div>
          </div>

          <div className="w-full sm:w-[30%]">
            <CourseContentList
              data={courseData?.courseData}
              activeVideo={activeVideo}
              setActiveVideo={setActiveVideo}
              isDemo={false}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default CourseContentPage;
