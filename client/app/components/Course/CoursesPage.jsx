"use client";
import React, { useEffect, useState, useMemo } from "react";
import { useGetAllCoursesQuery } from "../../../redux/feature/course/CoursesApi";
import Loader from "../Loader";
import CourseCard from "./CourseCard.jsx";
import { useSearchParams } from "next/navigation";
import { CleanHands } from "@mui/icons-material";
import Link from "next/link";

const CoursesPage = () => {
  const { isLoading, data, error } = useGetAllCoursesQuery();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  useState(() => {
    if(data){
      console.log(data);
    }
  },[])

  console.log(data?.courses);

  const categoryMap = {
    Marketing: [
      "marketing",
      "seo",
      "brand",
      "advertising",
      "digital",
      "social media",
    ],
    Programming: [
      "python",
      "java",
      "c++",
      "programming",
      "algorithm",
      "coding",
      "software",
      "development",
    ],
    "Web Development": [
      "react",
      "javascript",
      "html",
      "css",
      "web",
      "frontend",
      "backend",
      "fullstack",
      "node",
      "angular",
      "vue",
    ],
    "Data Science": [
      "data",
      "statistics",
      "analytics",
      "python",
      "visualization",
      "deep learning",
    ],
    Business: [
      "business",
      "management",
      "entrepreneurship",
      "startup",
      "finance",
      "accounting",
      "strategy",
    ],
    Design: [
      "design",
      "ui",
      "ux",
      "graphic",
      "illustration",
      "photoshop",
      "figma",
      "sketch",
    ],
    AIML:[
      "aiml",
      "AI",
      "ML",
      "Artificial Intelligence",
      "GenAI"
    ]
  };

  const getCategoryFromTitle = useMemo(() => {
    return (name) => {
      if (!name) return "Other";
      const lowerTitle = name.toLowerCase();

      for (const [category, keywords] of Object.entries(categoryMap)) {
        if (keywords.some((kw) => lowerTitle.includes(kw.toLowerCase()))) {
          return category;
        }
      }
      return "Other";
    };
  }, [categoryMap]);



  const coursesWithCategory = useMemo(() => {
    if (!data?.courses || !Array.isArray(data.courses)) {
      return [];
    }
    
    return data.courses.map((course) => ({
      ...course,
      category: getCategoryFromTitle(course?.name || ""),
    }));
  }, [data?.courses, getCategoryFromTitle]);

  const categories = useMemo(() => {
    const uniqueCategories = new Set(coursesWithCategory.map((c) => c.category));
    return ["All", ...Array.from(uniqueCategories).sort()];
  }, [coursesWithCategory]);

  const filteredCourses = useMemo(() => {
    if (!coursesWithCategory || coursesWithCategory.length === 0) {
      return [];
    }

    return coursesWithCategory.filter((course) => {
      const matchesSearch = !searchTerm || 
        (course?.name || "").toLowerCase().includes(searchTerm.toLowerCase().trim()) ||
        (course?.description || "").toLowerCase().includes(searchTerm.toLowerCase().trim());

      const matchesCategory = selectedCategory === "All" || course?.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [coursesWithCategory, searchTerm, selectedCategory]);

  if (isLoading) {
    return (
      <div className="w-full min-h-screen flex items-center justify-center bg-gradient-to-tl from-blue-950 to-black">
        <Loader />
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full min-h-screen flex flex-col items-center justify-center bg-gradient-to-tl from-blue-950 to-black">
        <div className="text-red-400 text-xl mb-4">Error loading courses</div>
        <div className="text-gray-300">{error?.message || "Something went wrong"}</div>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen flex flex-col items-center bg-gradient-to-tl from-blue-950 to-black">
      <h1 className="sm:text-[32px] text-[20px] font-bold mt-[20px]">
        Expand Your Career{" "}
        <span className="bg-gradient-to-r from-blue-600 to-violet-500 bg-clip-text text-transparent">
          Opportunity
        </span>
      </h1>
      <h1 className="sm:text-[32px] text-[20px] font-bold mb-6">
        With Our Courses
      </h1>

      <div className="p-6 w-full max-w-6xl">
        <div className="max-w-4xl mx-auto mb-8">
          <div className="relative">
            <input
              type="text"
              placeholder="Search courses by name or description..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-3 pl-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white/10 backdrop-blur-sm text-white placeholder-gray-400"
            />
            <svg
              className="absolute left-3 top-3.5 h-5 w-5 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            {searchTerm && (
              <button
                onClick={() => setSearchTerm("")}
                className="absolute right-3 top-3.5 h-5 w-5 text-gray-400 hover:text-white"
              >
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            )}
          </div>

          {/* Category Filter */}
          <div className="mt-6 flex gap-3 flex-wrap justify-center">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-6 py-2.5 rounded-full transition-all duration-200 ${
                  selectedCategory === cat
                    ? "bg-gradient-to-r from-blue-600 to-violet-500 text-white shadow-lg transform scale-105"
                    : "bg-white/10 backdrop-blur-sm text-white hover:bg-white/20"
                }`}
              >
                {cat}
                {cat !== "All" && (
                  <span className="ml-2 text-sm opacity-75">
                    ({coursesWithCategory.filter(c => c.category === cat).length})
                  </span>
                )}
              </button>
              
            ))}
            <Link href='/enrolled-courses'>Enrolled Courses</Link>
          </div>
        </div>

        {/* Results Summary */}
        <div className="text-center mb-6">
          <p className="text-gray-300">
            {filteredCourses.length === 0 
              ? "No courses found matching your criteria" 
              : `Showing ${filteredCourses.length} of ${coursesWithCategory.length} courses`
            }
            {searchTerm && (
              <span className="ml-2">
                for "{searchTerm}"
              </span>
            )}
            {selectedCategory !== "All" && (
              <span className="ml-2">
                in {selectedCategory}
              </span>
            )}
          </p>
        </div>

        {/* Course Cards Grid */}
        {filteredCourses.length > 0 ? (
          <div className="sm:grid sm:grid-cols-1 lg:grid-cols-3 xl:grid-cols-3 gap-6">
            {filteredCourses.map((course, index) => (
              <CourseCard
                key={course._id || `course-${index}`}
                course={course}
                index={index}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-gray-300 mb-2">
              No courses found
            </h3>
            <p className="text-gray-400 mb-6">
              Try adjusting your search terms or category filter
            </p>
            <div className="flex gap-4 justify-center">
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm("")}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Clear search
                </button>
              )}
              {selectedCategory !== "All" && (
                <button
                  onClick={() => setSelectedCategory("All")}
                  className="px-4 py-2 bg-violet-600 text-white rounded-lg hover:bg-violet-700 transition-colors"
                >
                  Show all categories
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CoursesPage;