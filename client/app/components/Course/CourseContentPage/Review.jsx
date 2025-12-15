"use client";
import React, { useEffect, useState } from "react";
import { formatDate } from "../../../utils/FormatDate";
import Image from "next/image";
import { BiSolidChevronDown } from "react-icons/bi";
import {
  useAddCommentToReviewMutation,
  useAddReviewMutation,
} from "../../../../redux/feature/course/CoursesApi";
import Ratings from "../../../utils/Ratings";

const Review = ({ courseData, refetchCourse }) => {
  const [review, setReview] = useState("");
  const [comment, setComment] = useState({});
  const [collapsedReviews, setCollapsedReviews] = useState({});
  const [rating, setRating] = useState(0);
  const [addReview, { isSuccess }] = useAddReviewMutation();
  const [addCommentToReview, { isSuccess: addCommentSuccess }] =
    useAddCommentToReviewMutation();

  const toggleReviewCollapse = (reviewId) => {
    setCollapsedReviews((prev) => ({
      ...prev,
      [reviewId]: !prev[reviewId],
    }));
  };
  useEffect(() => {
    if (isSuccess || addCommentSuccess) {
      refetchCourse();
    }
  }, [isSuccess, courseData,addCommentSuccess]);

  useEffect(() => {
    if (courseData?.reviews) {
      const initialCollapseState = {};
      courseData.reviews.forEach((reviewItem) => {
        initialCollapseState[reviewItem._id] = true; // true = collapsed
      });
      setCollapsedReviews(initialCollapseState);
    }
  }, [courseData]);

  const renderReview = (item, index) => (
    <div key={item._id} className="mb-4 border-b border-gray-700 pb-4">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Image
            width={30}
            height={30}
            className="rounded-full"
            src={item.user?.avatar}
            alt={item.user?.name || "User Avatar"}
          />
          <span>{item.user?.name}</span>
        </div>
        <p>{formatDate(item.createdAt)}</p>
      </div>
      <p className="text-[20px] mt-2">{item.comment}</p>

      <div className="cursor-pointer mt-2">
        <p className="w-[120px] flex items-center gap-2 px-3 py-1 rounded-2xl bg-gray-800">
          <span>Comments</span>
          <BiSolidChevronDown
            className={`transition-transform duration-300 ${
              collapsedReviews[item._id] ? "" : "rotate-180"
            }`}
            onClick={() => {
              toggleReviewCollapse(item._id);
            }}
          />
        </p>
        {!collapsedReviews[item._id] && (
          <div className="flex flex-col text-[16px] mt-2 ml-10 gap-2">
            {item.commentReplies?.map((reply, rIndex) =>
              renderReviewReply(reply, rIndex)
            )}
            <div className="flex flex-col items-end">
              <textarea
                rows={3}
                className="w-full border rounded-2xl p-[5px]"
                value={comment[item._id] || ""}
                placeholder="Add an answer to the question..."
                onChange={(e) =>
                  setComment((prev) => ({
                    ...prev,
                    [item._id]: e.target.value,
                  }))
                }
              />
              <button
                className="w-[120px] bg-blue-500 rounded-full px-[8px] py-[3px] mt-[10px] flex items-center gap-2 cursor-pointer"
                onClick={() => handleAddComment(item._id)}
              >
                <span>Add comment</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );

  const renderReviewReply = (reply, index) => (
    <div key={index} className="flex flex-col gap-1">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Image
            width={30}
            height={30}
            className="rounded-full"
            src={reply.user?.avatar}
            alt={reply.user?.name || "User Avatar"}
          />
          <span>{reply.user?.name}</span>
        </div>
        <p>{formatDate(reply.createdAt)}</p>
      </div>
      <p className="ml-10">{reply.comment}</p>
    </div>
  );

  const handleAddReview = async () => {
    const courseId = courseData._id;
    if (review.trim() && rating > 0) {
      await addReview({ review, rating, courseId });
      setReview("");
      setRating(0);
      toast.success("Review added successfully")
    socketId.emit("notification",{
      title: `New Review Recieved`,
      message: `You have a new review in ${courseData?.title}`,
      userId: user._id
    })
    }
  };

  const handleAddComment = async(reviewId) => {
    const commentText = comment[reviewId]
    const courseId = courseData._id;
    if(comment[reviewId].trim() != ""){
      await addCommentToReview({  comment : commentText, courseId, reviewId})
    }
  }
  return (
    <>
      <div className="w-full flex flex-col items-end">
        <textarea
          rows={5}
          className="w-full sm:w-[80%] md:w-[80%] lg:w-[100%] border text-[16px] p-3 rounded-2xl 
               placeholder:text-[16px] placeholder:text-gray-400 resize-y"
          placeholder="Add a review to the course..."
          onChange={(e) => setReview(e.target.value)}
        />
        <div className="w-full flex justify-center m-[5px]">
          <Ratings rating={rating} setRating={setRating} isReading={false} />
        </div>

        <button
          className="w-[70px] bg-blue-500 rounded-full px-[8px] py-[3px] mt-[10px] flex items-center gap-2"
          onClick={() => handleAddReview()}
        >
          <span>Submit</span>
        </button>
      </div>
      <div className="w-full flex flex-col gap-3">
        {courseData.reviews
          .slice()
          .reverse()
          .map((review, index) => renderReview(review, index))}
      </div>
    </>
  );
};

export default Review;
