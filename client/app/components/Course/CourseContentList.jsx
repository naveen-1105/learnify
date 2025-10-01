import React, { useState } from "react";
import { BiSolidChevronDown, BiSolidChevronUp } from "react-icons/bi";
import { MdOutlineOndemandVideo } from "react-icons/md";

const CourseContentList = ({ data, activeVideo, setActiveVideo, isDemo }) => {
  // console.log(data);
  const [visibleSections, setVisibleSections] = useState(new Set());
  const [chapter,setChapter] = useState(1);

  const videoSections = [...new Set(data?.map((item) => item.videoSection))];

  let totalCount = 0;

  const toggleSection = (section) => {
    const newVisibleSections = new Set(visibleSections);
    if (newVisibleSections.has(section)) {
      newVisibleSections.delete(section);
    } else {
      newVisibleSections.add(section);
    }
    setVisibleSections(newVisibleSections);
  };

  // helper function to format time
  const formatDuration = (seconds) => {
    if (!seconds || isNaN(seconds)) return "0 minutes";

    if (seconds < 60) {
      return `${seconds} seconds`;
    }

    const minutes = seconds / 60;

    if (minutes < 60) {
      return `${minutes.toFixed(0)} minutes`;
    }

    const hours = minutes / 60;
    return `${hours.toFixed(2)} hours`;
  };

  return (
    <div
      className={`mt-[15px] w-full ${
        !isDemo ? "ml-[-30px] sticky top-24 left-0 z-30" : ""
      }`}
    >
      {videoSections.map((section) => {
        const isSectionVisible = visibleSections.has(section);

        const sectionVideos = data.filter(
          (item) => item.videoSection === section
        );
        const sectionVideoCount = sectionVideos.length;

        // sum durations (assuming item.videoLength is in seconds)
        const sectionVideoLengthSeconds = sectionVideos.reduce(
          (totalLength, item) => totalLength + Number(item.videoLength || 0),
          0
        );

        const sectionStartIndex = totalCount;
        totalCount += sectionVideoCount;

        return (
          <div
            className={`${!isDemo ? " w-full border-b border-[#ffffff8e] pb-2" : ""} m-[10px]`}
            key={section}
          >
            <div className="w-full flex ">
              <div className="w-full flex justify-between items-center">
                <h2 className="sm:text-[18px] text-black dark:text-white">
                  <span className="text-blue-500">Chapter {videoSections.indexOf(section) + 1}{": "}</span>{section}
                </h2>
                <button
                  className="sm:mr-4 cursor-pointer text-black dark:text-white"
                  onClick={() => toggleSection(section)}
                >
                  {isSectionVisible ? (
                    <BiSolidChevronUp size={20} />
                  ) : (
                    <BiSolidChevronDown size={20} />
                  )}
                </button>
              </div>
            </div>

            {/* Section duration */}
            <h5 className="text-black dark:text-white">
              {sectionVideoCount} Lessons · {formatDuration(sectionVideoLengthSeconds)}
            </h5>

            <br />
            {isSectionVisible && (
              <div className="w-full">
                {sectionVideos.map((item, index) => {
                  const videoIndex = sectionStartIndex + index;

                  const videoLengthSeconds = Number(item.videoLength || 0);

                  return (
                    <div
                      className={`w-full sm:text-[24px] text-[16px] ${
                        videoIndex === activeVideo ? "bg-slate-800" : ""
                      } cursor-pointer transition-all p-2`}
                      key={item._id}
                      onClick={() => !isDemo && setActiveVideo(item)}
                    >
                      <div className="flex items-start">
                        <div>
                          <MdOutlineOndemandVideo
                            size={25}
                            className="mr-2"
                            color="#1cdada"
                          />
                        </div>
                        <h1 className="sm:text-[18px] inline-block break-words text-black dark:text-white">
                          {item.title}
                        </h1>
                      </div>

                      {/* Video duration */}
                      <h5 className="pl-8 text-black dark:text-white">
                        {formatDuration(videoLengthSeconds)}
                      </h5>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default CourseContentList;
