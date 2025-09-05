"use client";

import { Description } from "@mui/icons-material";
import React, { useEffect, useState } from "react";
import CourseInformation from "./CourseInformation";
import CreateCourseSteps from "./CreateCourseSteps";
import CourseData from "./CourseData";
import CourseContent from "./CourseContent";
import CoursePreview from "./CoursePreview";
import { useCreateCourseMutation } from "../../../redux/feature/course/CoursesApi";
import toast from "react-hot-toast";
import { redirect } from "next/navigation";

const CreateCourse = () => {
  const [createCourse, { isLoading, isSuccess, error }] =
    useCreateCourseMutation();

  useEffect(() => {
    if (isSuccess) {
      toast.success("Course created successfully");
      redirect("/admin/all-courses");
    }
    if (error) {
      if ("data" in error) {
        const errorMessage = error;
        toast.error(errorMessage.data.message);
      }
    }
  }, [isLoading, isSuccess, error]);

  const [active, setActive] = useState(0);
  const [courseInfo, setCourseInfo] = useState({
    name: "",
    description: "",
    price: "",
    estimatedPrice: "",
    tags: "",
    level: "",
    demoUrl: "",
    thumbnail: "",
  });
  const [courseData, setCourseData] = useState({});

  const [benefit, setBenefit] = useState([{ title: "" }]);
  const [prerequisites, setPrerequisites] = useState([{ title: "" }]);
  const [courseContentData, setCourseContentData] = useState([
    {
      videoUrl: "",
      title: "",
      description: "",
      videoSection: "Untitled Section",
      links: [
        {
          title: "",
          url: "",
        },
      ],
      suggestion: "",
    },
  ]);
  const handleSubmit = async () => {
    const formatedBenefits = benefit.map((benefit) => ({
      title: benefit.title,
    }));
    const formatedPrerequisites = prerequisites.map((prerequisite) => ({
      title: prerequisite.title,
    }));

    const formatedCourseContentData = courseContentData.map(
      (courseContent) => ({
        videoUrl: courseContent.videoUrl,
        title: courseContent.title,
        description: courseContent.description,
        videoSection: courseContent.videoSection,
        links: courseContent.links.map((link) => ({
          title: link.title,
          url: link.url,
        })),
        suggestion: courseContent.suggestion,
      })
    );

    const data = {
      name: courseInfo.name,
      description: courseInfo.description,
      price: courseInfo.price,
      estimatedPrice: courseInfo.estimatedPrice,
      tags: courseInfo.tags,
      thumbnail: courseInfo.thumbnail,
      level: courseInfo.level,
      demoUrl: courseInfo.demoUrl,
      benefits: formatedBenefits,
      prerequisites: formatedPrerequisites,
      courseContent: formatedCourseContentData,
    };

    setCourseData(data);
  };

  const handleCourseCreate = async() => {
    const data = courseData;
    if (!isLoading) { 
      await createCourse(data);
    }
  };

  return (
    <div className="w-full flex min-h-screen">
      <div className="w-[80%]">
        {active === 0 && (
          <CourseInformation
            courseInfo={courseInfo}
            setCourseInfo={setCourseInfo}
            active={active}
            setActive={setActive}
          />
        )}
        {active === 1 && (
          <CourseData
            benefit={benefit}
            setBenefit={setBenefit}
            prerequisites={prerequisites}
            setPrerequisites={setPrerequisites}
            active={active}
            setActive={setActive}
          />
        )}
        {active === 2 && (
          <CourseContent
            active={active}
            setActive={setActive}
            courseContentData={courseContentData}
            setCourseContentData={setCourseContentData}
            handleSubmit={handleSubmit}
          />
        )}
        {active === 3 && (
          <CoursePreview
            courseData={courseData}
            handleCourseCreate={handleCourseCreate}
            setActive={setActive}
            active={active}
          />
        )}
      </div>
      <div className="w-[20%] mt-[100px] ">
        <CreateCourseSteps active={active} set={setActive} />
      </div>
    </div>
  );
};

export default CreateCourse;
