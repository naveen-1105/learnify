import React from "react";
import Ratings from "./Ratings";


const CourseReviews = ({ review,isDynamic }) => {
  return (
    <div className="bg-white/10 backdrop-blur-lg border border-white/20 text-white rounded-2xl shadow-lg p-6 w-full ">
      {/* Profile section */}
      <div className="flex items-center gap-4 mb-4">
        <img
          src={isDynamic ? review.user.avatar.url : review.avatar}
          alt={isDynamic ? review.user.name : review.name}
          className="w-12 h-12 rounded-full object-cover border-2 border-gray-700"
        />
        <div>
          <h3 className="font-semibold">{isDynamic ? review.user.name : review.name}</h3>
          <p className="text-sm text-gray-400">{review.profession}</p>
        </div>
      </div>

      {/* Review text */}
      <p className="text-gray-300 mb-4 sm:text-[16px] text-[12px]">{review.comment}</p>

      {/* Star rating */}
      <div className="flex gap-1 justify-between">
        <Ratings rating={review.rating}/>
        <p>{new Date(review.updatedAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric"
  })}</p>
      </div>
    </div>
  );
};

export default CourseReviews;
