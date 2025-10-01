'use client'
import React, { useEffect, useState } from 'react'
import MetaData from '../../utils/MetaDataGen'
import { useGetCourseDetailsQuery } from '../../../redux/feature/course/CoursesApi'
import { redirect, useParams } from 'next/navigation'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import CourseContentPage from "../../components/Course/CourseContentPage.jsx"
import { useLoadUserQuery } from '../../../redux/feature/api/apiSlice'

const page = () => {
    const id = useParams();

    const { isLoading: userLoading, error, data: userData,refetch: userRefetch } = useLoadUserQuery({});

  useEffect(() => {
    if (userData) {
      const isPurchased = userData.user.courses.find(
        (item) => item.courseId.toString() === id.id.toString()
      );
      if (!isPurchased) {
        redirect("/");
      }
    }
    if (error) {
      redirect("/");
    }
  }, [userData,error]);

    const {data,isLoading,refetch} = useGetCourseDetailsQuery(id.id);
    const [courseData,setCourseData] = useState(); 
    
    
    useEffect(() => {
        if(!isLoading && data){
            setCourseData(data?.courseDetails)
        }
    },[isLoading,data])

  return (
    <div>
        <MetaData title={`${courseData?.name}`} description={`${courseData?.description}`}/>
        <Header/>
        <CourseContentPage courseData={courseData} refetchCourse={refetch} userData={userData}/>
        <Footer/>
    </div>
  )
}

export default page