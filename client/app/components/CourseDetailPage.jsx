"use client";
import React, { useEffect, useState } from "react";
import { useGetCourseDetailsQuery } from "../../redux/feature/course/CoursesApi";
import Loader from "./Loader";
import Ratings from "../utils/Ratings";
import { VscActivateBreakpoints } from "react-icons/vsc";
import CourseReviews from "../utils/CourseReviews";
import CoursePlayer from "../utils/CoursePlayer";
import { useLoadUserQuery } from "../../redux/feature/api/apiSlice";
import CourseContentList from "./Course/CourseContentList.jsx";
import {
  useCreatePaymentIntentMutation,
  useGetStripePublishableKeyQuery,
} from "../../redux/feature/orders/orderApi";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckOutForm from "./Course/CheckOutForm";
import Link from "next/link";

const CourseDetailPage = ({ id }) => {
  const [open, setOpen] = useState(false);
  const { data, isLoading } = useGetCourseDetailsQuery(id.id);

  const [activeVideo, setActiveVideo] = useState();
  const { data: StripePublishableKey } = useGetStripePublishableKeyQuery();
  const [createPaymentIntent, { data: paymentIntentData }] =
    useCreatePaymentIntentMutation();
  const [stripePromise, setStripePromise] = useState(null);
  const [clientSecret, setClientSecret] = useState("");

  useEffect(() => {
    if (StripePublishableKey?.publishablekey) {
      console.log("Setting up Stripe with key:", StripePublishableKey.publishablekey);
      setStripePromise(loadStripe(StripePublishableKey.publishablekey));
    }
  }, [StripePublishableKey]);

  useEffect(() => {
    if (data && data.courseDetails) {
      const amount = Math.round(data.courseDetails.price);
      console.log("Creating payment intent for amount:", amount);
      createPaymentIntent(amount);
    }
  }, [data, createPaymentIntent]);

  useEffect(() => {
    if (paymentIntentData) {
      setClientSecret(paymentIntentData?.client_secret);
    }
  }, [paymentIntentData]);

  const {
    data: userData,
    isLoading: userLoading,
  } = useLoadUserQuery();
  console.log(userData);
  
  const user = userData?.user;

  const isPurchased = !!(userData && userData?.user.courses && userData?.user.courses.some((item) => item.courseId === id.id));
  console.log(userData);


  const handleOrder = (e) => {
    console.log("hiii");
    if (user) {
      console.log("Checkout values:", {
        stripePromise: !!stripePromise,
        clientSecret: clientSecret,
        open: open,
        user: !!user
      });
      setOpen(true);
    } else {
      // Redirect to login or show login modal
      window.location.href = "/sign-in";
    }
  };

  return (
    <div>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="flex sm:flex-row flex-col p-[24px]">
          <div className="sm:w-[50%] order-2">
            <h1 className="sm:text-[32px] text-[20px] text-blue-400">
              {data?.courseDetails.name}
            </h1>
            <div className="flex gap-[50px] sm:text-[24px] text-[16px]">
              <Ratings rating={data?.courseDetails.ratings} starSize={18} />
              <p>{data?.courseDetails.purchased} Students</p>
            </div>
            <br />
            <br />
            <div>
              <p className="sm:text-[24px] text-[16px] text-green-500">
                What you will learn from this course ?
              </p>
              {data?.courseDetails.benefits.map((benefit, index) => (
                <p key={index}>
                  <VscActivateBreakpoints className="inline" /> {benefit.title}
                </p>
              ))}
            </div>
            <br />
            <br />
            <div>
              <p className="text-[24px] text-green-500">
                Prerequisites
              </p>
              {data?.courseDetails.prerequisites.map((prerequisite, index) => (
                <p key={index}>
                  <VscActivateBreakpoints className="inline" /> {prerequisite.title}
                </p>
              ))}
            </div>
            <br />
            <br />
            <div>
              <p className="text-[24px] text-green-500">Course Overview</p>
              <div>
                <CourseContentList
                  data={data?.courseDetails.courseData}
                  activeVideo={activeVideo}
                  setActiveVideo={setActiveVideo}
                  isDemo={true}
                />
              </div>
            </div>
            <br />
            <br />
            <div>
              <p className="sm:text-[32px] text-[20px] text-green-500">Course Detail</p>
              <p className="sm:text-[21px] text-[14px]">{data?.courseDetails.description}</p>
            </div>
            <br />
            <br />
            <div>
              <p className="text-[24px] text-green-500">Course Review</p>
              {data?.courseDetails.reviews.length > 0 ? (
                <div className="w-[90%] grid grid-cols-1 md:grid-cols-2 gap-4 justify-items-center mt-[50px]">
                  {data?.courseDetails.reviews.map((review, index) => (
                    <CourseReviews isDynamic={true} key={index} review={review} />
                  ))}
                </div>
              ) : (
                <p className="text-[16px] text-gray-600">No reviews yet</p>
              )}
            </div>
          </div>
          <div className="sm:w-[50%] w-full order-1">
            <CoursePlayer videoUrl={data?.courseDetails.demoUrl} />
            <div>
              <div className="flex gap-[10px] m-[16px]">
                <p className="sm:text-[28px] ">
                  ${data?.courseDetails.estimatedPrice}
                </p>
                <p className="line-through">${data?.courseDetails.price}</p>
                <p className="sm:text-[24px] text-red-500">
                  {`${(100 - (data?.courseDetails.estimatedPrice / data?.courseDetails.price) * 100).toFixed(0)}% OFF`}
                </p>
              </div>
              <button className="bg-green-500 sm:text-[16px] text-[16px] text-black sm:px-[12px] rounded-[20px] sm:py-[8px] mt-[12px] py-[5px] cursor-pointer w-[180px] font-Poppins">
                {isPurchased ? (
                  <Link
                    className="w-[180px] font-Poppins cursor-pointer"
                    href={`/course-access/${data.courseDetails._id}`}
                  >
                    Enter to Course
                  </Link>
                ) : (
                  <div
                    className="w-[180px] font-Poppins cursor-pointer"
                    onClick={handleOrder}
                  >
                    Buy Now
                  </div>
                )}
              </button>
              <br />
              <ul className="m-[20px] list-disc sm:text-[20px] text-[14px]">
                <li>Source Code included</li>
                <li>Lifetime Access</li>
                <li>Certificate of completion</li>
                <li>Premium Support</li>
              </ul>
            </div>
          </div>
        </div>
      )}
      {/* Modal for Checkout Form */}
      {open && stripePromise && clientSecret && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full mx-4 relative">
            <button
              onClick={() => setOpen(false)}
              className="absolute top-4 right-4 text-gray-600 hover:text-gray-800 text-xl"
            >
              ×
            </button>
            <h3 className="text-xl font-semibold mb-4 text-gray-800">
              Complete Payment
            </h3>
            <Elements stripe={stripePromise} options={{ clientSecret }}>
              <CheckOutForm setOpen={setOpen} data={data} />
            </Elements>
          </div>
        </div>
      )}
    </div>
  );
};

export default CourseDetailPage;