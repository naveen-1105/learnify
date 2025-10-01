"use client";

import { Description } from "@mui/icons-material";
import React, { useEffect, useState } from "react";
import CourseInformation from "./CourseInformation";
import CreateCourseSteps from "./CreateCourseSteps";
import CourseData from "./CourseData";
import CourseContent from "./CourseContent";
import CoursePreview from "./CoursePreview";
import {
  useCreateCourseMutation,
  useEditCourseMutation,
  useGetAllCoursesQuery,
  useGetCourseDetailsQuery,
} from "../../../redux/feature/course/CoursesApi";
import toast from "react-hot-toast";
import { redirect } from "next/navigation";
import Loader from "../../components/Loader";

const EditCourse = ({ id }) => {
  const { isLoading, data, refetch } = useGetCourseDetailsQuery(
    id,
    { refetchOnMountOrArgChange: true }
  );
  
  const editCourse = data?.courseDetails;
  if(editCourse){
    console.log(editCourse);
  }
  

  const [editCourseAPI, { isSuccess, isLoading: editLoading }] =
    useEditCourseMutation();
    

    const [courseContentData, setCourseContentData] = useState([
    {
      videoUrl: "",
      title: "",
      description: "",
      videoSection: "Untitled Section",
      videoLength: 5,
      links: [
        {
          title: "",
          url: "",
        },
      ],
      suggestion: "",
    },
  ]);
  useEffect(() => {
    if (isLoading) {
      <Loader />;
    }
    if (!isLoading && isSuccess) {
      toast.success("course updated successfully");
      redirect("/admin/courses");
    }
  }, [isSuccess]);

  useEffect(() => {
    if (editCourse) {
      setCourseInfo({
        name: editCourse.name || "",
        description: editCourse.description || "",
        price: editCourse.price || "",
        estimatedPrice: editCourse.estimatedPrice || "",
        tags: "",
        level: editCourse.level || "",
        demoUrl: editCourse.demoUrl || "",
        thumbnail: editCourse.thumbnail?.url || "",
      });

      setBenefit(editCourse.benefits || [{ title: "" }]);
      setPrerequisites(editCourse.prerequisites || [{ title: "" }]);
      console.log(editCourse);
      setCourseContentData(
        editCourse.courseData?.length
          ? editCourse.courseData.map((item) => ({
              videoUrl: item.videoUrl || "",
              title: item.title || "",
              description: item.description || "hello",
              videoLength: item.videoLength || '0',
              videoSection: item.videoSection || "Untitled Section",
              links: item.links?.length
                ? item.links.map((link) => ({
                    title: link.title || "",
                    url: link.url || ""
                  }))
                : [{ title: "", url: "" }],
              suggestion: item.suggestion || "",
            }))
          : [
              {
                videoUrl: "",
                title: "",
                description: "",
                videoSection: "Untitled Section",
                links: [{ title: "", url: "" }],
                suggestion: "",
              },
            ]
      );
    }
  }, [editCourse]);

  const [active, setActive] = useState(0);
  const [courseData, setCourseData] = useState({});

  const [benefit, setBenefit] = useState([{ title: "" }]);
  const [prerequisites, setPrerequisites] = useState([{ title: "" }]);

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
      courseData: formatedCourseContentData,
    };

    setCourseData(data);
  };

  const handleCourseCreate = async () => {
    const data = courseData;
    if (!isLoading) {
      await createCourse(data);
    }
  };

  const handleEditCourse = async () => {
    if (!isLoading && courseData) {
      console.log(courseData);
      console.log(id);
      await editCourseAPI({ id, data: courseData });
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
            isEdit={true}
            handleEditCourse={handleEditCourse}
          />
        )}
      </div>
      <div className="w-[20%] mt-[100px] ">
        <CreateCourseSteps active={active} set={setActive} />
      </div>
    </div>
  );
};

export default EditCourse;
