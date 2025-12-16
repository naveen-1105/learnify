'use client'
import React from 'react'
import Image from "next/image";
import Ratings from "../../utils/Ratings";
import { AiOutlineUnorderedList } from "react-icons/ai";
import Link from "next/link";

const CourseCard = ({course,index}) => {
  return (
    <Link
                  href={`/course/${course._id}`}
                  key={index}
                  className="sm:w-[350px] sm:h-[350px] w-full h-auto  bg-white/10 backdrop-blur-lg border border-white/20 shadow-lg sm:rounded-2xl rounded-[5px] 
               text-white flex flex-row sm:flex-col items-center justify-center sm:m-2 relative object-cover sm:mt-10 mt-[20px] sm:p-[15px] p-[5px]"
                >
                  <div className="sm:w-full w-[30%] sm:pt-[15px] p-[0px]">
                    <Image
                      src={course.thumbnail?.url}
                      width={320}
                      height={150}
                      contain={true}
                      className="object-fill sm:rounded-2xl rounded-[5px]"
                    />
                  </div>
                  <div className='flex flex-col w-full'>
                    <p className="font-medium sm:text-[20px] text-white text-[14px]">{course.name}</p>
                    <div className="flex justify-between text-[14px]">
                      <Ratings rating={course.ratings} starSize={18} />
                      <p>{course.purchased} Students</p>
                    </div>
                    <div className="w-full flex items-center justify-between pt-3">
                      <div className="flex">
                        <h3 className="text-black dark:text-[#fff] sm:text-[20px] text-[14px]">Rs.
                          {course.price === 0 ? "Free" : course.price}
                        </h3>
                        <h5 className="pl-3 text-[14px] mt-[-5px] line-through opacity-80 text-black dark:text-[#fff]">
                          Rs.{course.estimatedPrice}
                        </h5>
                      </div>
                      <div className="flex items-center pb-3 sm:text-[20px] text-[14px]">
                        <AiOutlineUnorderedList size={20} fill="#fff" />
                        <h5 className="pl-2 text-black dark:text-[#fff]">
                          {course.courseData?.length} Lectures
                        </h5>
                      </div>
                    </div>
                  </div>
                </Link>
  )
}

export default CourseCard