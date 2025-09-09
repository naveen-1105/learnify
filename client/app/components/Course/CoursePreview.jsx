'use client'
import CoursePlayer from '../../../app/utils/CoursePlayer'
import React from 'react'

const CoursePreview = ({ courseData, handleCourseCreate, setActive, active }) => {
  const prevButton = () => {
    setActive(active - 1);
  }
  const nextButton = () => {
    handleCourseCreate();
  }
  return (
    <div className='w-[90%] m-auto py-5 mb-5'>
      {courseData.courseContent?.[0]?.videoUrl && (
        <CoursePlayer videoUrl={courseData.courseContent[0].videoUrl} />
      )}
      <h1 className='text-[32px] py-[16px]'>{courseData.name}</h1>
      <div className='flex gap-[10px]'>
        <p className='text-[28px]'>${courseData.estimatedPrice}</p>
        <p className='line-through'>${courseData.price}</p>
        <p className='text-[24px] text-green-500'>
          {`${(100 - (courseData.estimatedPrice / courseData.price) * 100).toFixed(0)}% OFF`}
        </p>
      </div>
      
      <div className='flex justify-center bg-red-500 w-[150px] py-[6px] rounded-2xl mb-[20px]'>
        Buy Now ${courseData.estimatedPrice}
      </div>

      <div className='flex gap-[20px]'>
        <div className='w-[60%] border border-gray-500 rounded-[4px] p-[5px]'>
          Coupon Code
        </div>
        <div className='flex justify-center w-[20%] bg-blue-500 rounded-[15px] p-[5px] cursor-pointer'>
          Apply Coupon
        </div>
      </div>

      <ul className='mt-[20px] list-disc'>
        <li>Source Code included</li>
        <li>Lifetime Access</li>
        <li>Certificate of completion</li>
        <li>Premium Support</li>
      </ul>

      
      <p className='text-[24px] text-blue-500 py-[16px]'>What you will learn from this course?</p>

      {courseData.benefits?.length > 0 && (
        <ul className='mb-[10px] list-disc'>
          {courseData.benefits.map((benefit, index) => (
            <li key={index}>{benefit.title}</li>
          ))}
        </ul>
      )}
      <p className='text-[24px] text-blue-500 py-[16px]'>Prerequisites for this course</p>
      {courseData.prerequisites?.length > 0 && (
        <ul className='mt-[10px] list-disc'>
          {courseData.prerequisites.map((prerequisite, index) => (
            <li key={index}>{prerequisite.title}</li>
          ))}
        </ul>
      )}
      <p className='text-[24px] text-blue-500 py-[16px]'>Course Description</p>
      <p>{courseData.courseContent[0].description}</p>
      <div className="flex justify-between">
                  <button className="bg-green-500 text-black px-[12px] rounded-2xl py-[4px]" onClick={() => prevButton()}>Prev</button>
                  <button className="bg-green-500 text-black px-[12px] rounded-2xl py-[4px]" onClick={() => nextButton()}>Create Course</button>
                </div>
    </div>
  )
}

export default CoursePreview
