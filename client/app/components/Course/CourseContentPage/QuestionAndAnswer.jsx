"use client";
import React, { useEffect, useState } from "react";
import {
  useAddAnswerMutation,
  useAddQuestionMutation,
} from "../../../../redux/feature/course/CoursesApi";
import { formatDate } from "../../../utils/FormatDate";
import { BiSolidChevronDown } from "react-icons/bi";
import Image from "next/image";
import toast from "react-hot-toast";
import socketIO from "socket.io-client";

const ENDPOINT = process.env.NEXT_PUBLIC_SOCKET_SERVER_URI;
const socketId = socketIO(ENDPOINT, { transports: ["websocket"] });

const QuestionAndAnswer = ({
  courseData,
  refetchCourse,
  activeVideo,
  setActiveVideo,
  user,
}) => {
  console.log(user);
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState({});
  const [collapsedQuestions, setCollapsedQuestions] = useState({});
  const [addQuestion, { isSuccess }] = useAddQuestionMutation();
  const [activeQuestionId, setActiveQuestionId] = useState(null);
  const [addAnswer, { isSuccess: addAnswerSuccess }] = useAddAnswerMutation();
  useEffect(() => {
    if (isSuccess || addAnswerSuccess) {
      refetchCourse();
    }
  }, [isSuccess, addAnswerSuccess]);

  useEffect(() => {
    if (isSuccess || addAnswerSuccess) {
      setActiveVideo((prev) => {
        const updatedVideo = courseData.courseData.find(
          (v) => v._id === prev._id
        );
        if (updatedVideo) {
          return updatedVideo;
        }
        return prev;
      });
    }
  }, [isSuccess, addAnswerSuccess]);

  useEffect(() => {
    if (activeVideo?.questions) {
      const initialCollapseState = {};
      activeVideo.questions.forEach((q) => {
        // Maintain the current collapse state or default to true (collapsed)
        initialCollapseState[q._id] = true;
      });
      setCollapsedQuestions(initialCollapseState);
    }
  }, [activeVideo, courseData]);

  const toggleQuestionCollapse = (questionId) => {
    setCollapsedQuestions((prev) => ({
      ...prev,
      [questionId]: !prev[questionId],
    }));
  };

  const handleAddAnswer = async (questionId) => {
    const courseId = courseData._id;
    const contentId = activeVideo._id;
    const answerText = answer[questionId];

    if (answerText && answerText.trim() !== "") {
      await addAnswer({ answer: answerText, courseId, contentId, questionId });
      setAnswer((prev) => ({
        ...prev,
        [questionId]: "",
      }));
      toast.success("Answer added successfully");
      if (user.role !== "admin") {
        socketId.emit("notification", {
          title: `New Answer Recieved`,
          message: `You have a new answer in ${activeVideo.title}`,
          userId: user._id,
        });
      }
    }
  };

  const handleAddQuestion = async () => {
    const courseId = courseData._id;
    const contentId = activeVideo._id;
    if (question.trim() !== "") {
      const newQuestion = await addQuestion({
        question,
        courseId,
        contentId,
      }).unwrap();

      // Optimistically update activeVideo
      setActiveVideo((prev) => ({
        ...prev,
        questions: [...prev.questions, newQuestion],
      }));

      // Reset question input
      setQuestion("");
      toast.success("Question added successfully");
      // Send notification to admin when a question is asked

      if (user.role !== "admin") {
        socketId.emit("notification", {
          title: `New Question Received`,
          message: `You have a new question in ${activeVideo.title} from ${user.name}`,
          userId: user._id,
        });
      }

      // Update collapse state for the new question
      setCollapsedQuestions((prev) => ({
        ...prev,
        [newQuestion._id]: true,
      }));
    }
  };

  const renderAnswer = (answer, index) => (
    <div key={index} className="flex flex-col gap-1">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Image
            width={30}
            height={30}
            className="rounded-full"
            src={answer.user?.avatar?.url}
            alt={answer.user?.name || "User Avatar"}
          />
          <span>{answer.user?.name}</span>
        </div>
        <p>{formatDate(answer.createdAt)}</p>
      </div>
      <p className="ml-10">{answer.answer}</p>
    </div>
  );

  const renderQuestion = (item, index) => (
    <div key={item._id} className="mb-4 border-b border-gray-700 pb-4">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Image
            width={30}
            height={30}
            className="rounded-full"
            src={item.user?.avatar?.url}
            alt={item.user?.name || "User Avatar"}
          />
          <span>{item.user?.name}</span>
        </div>
        <p>{formatDate(item.createdAt)}</p>
      </div>
      <p className="text-[20px] mt-2">{item.question}</p>

      <div className="cursor-pointer mt-2">
        <p
          className="w-[100px] flex items-center gap-2 px-3 py-1 rounded-2xl bg-gray-800"
          onClick={() => setActiveQuestionId(item._id)}
        >
          <span>Replies</span>
          <BiSolidChevronDown
            className={`transition-transform duration-300 ${
              collapsedQuestions[item._id] ? "" : "rotate-180"
            }`}
            onClick={() => toggleQuestionCollapse(item._id)}
          />
        </p>
        {!collapsedQuestions[item._id] && item.questionReplies?.length >= 0 && (
          <div className="flex flex-col text-[16px] mt-2 ml-10 gap-2">
            {item.questionReplies.map((answer, rIndex) =>
              renderAnswer(answer, rIndex)
            )}
            <div className="flex flex-col items-end">
              <textarea
                rows={3}
                className="w-full border rounded-2xl p-[5px]"
                value={answer[item._id] || ""}
                placeholder="Add an answer to the question..."
                onChange={(e) =>
                  setAnswer((prev) => ({ ...prev, [item._id]: e.target.value }))
                }
              />
              <button
                className="w-[100px] bg-blue-500 rounded-full px-[8px] py-[3px] mt-[10px] flex items-center gap-2 cursor-pointer"
                onClick={() => handleAddAnswer(item._id)}
              >
                <span>Add Reply</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
  return (
    <>
      <div className="w-full flex flex-col items-end">
        <textarea
          rows={5}
          className="w-full sm:w-[80%] md:w-[80%] lg:w-[100%] border text-[16px] p-3 rounded-2xl 
               placeholder:text-[16px] placeholder:text-gray-400 resize-y"
          placeholder="Have a doubt, ask here..."
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
        />

        <button
          className="w-[70px] bg-blue-500 rounded-full px-[8px] py-[3px] mt-[10px] flex items-center gap-2"
          onClick={() => (question !== "" ? handleAddQuestion() : null)}
        >
          <span>Submit</span>
        </button>
      </div>

      <div className="w-full flex flex-col gap-3">
        {activeVideo.questions
          ?.slice()
          .reverse()
          .map((question, index) => renderQuestion(question, index))}
      </div>
    </>
  );
};

export default QuestionAndAnswer;
