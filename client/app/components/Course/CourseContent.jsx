import {
  AddCircle,
  LinkedCameraRounded,
  LinkOutlined,
  LinkRounded,
} from "@mui/icons-material";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { AiOutlineDelete } from "react-icons/ai";
import { BiSolidPencil } from "react-icons/bi";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";

const CourseContent = ({
  courseContentData,
  setCourseContentData,
  active,
  setActive,
  handleSubmit,
}) => {
  const [isCollapsed, setIsCollapsed] = useState(
    Array(courseContentData.length).fill(false)
  );

  const [activeSection, setActiveSection] = useState(1);
  const handleCollapseToggle = (index) => {
    const updatedCollapsed = [...isCollapsed];
    updatedCollapsed[index] = !updatedCollapsed[index];
    setIsCollapsed(updatedCollapsed);
  };
  const handleRemoveLink = ({ index, linkIndex }) => {
    const updatedData = [...courseContentData];
    updatedData[index].links.splice(linkIndex, 1);
    setCourseContentData(updatedData);
  };

  const handleAddLink = (index) => {
    const updatedData = [...courseContentData];
    updatedData[index].links.push({
      title: "",
      url: "",
    });
    setCourseContentData(updatedData);
  };
  const handleNewSection = (item) => {
    if(item.title === "" || item.description === "" || item.links[0].title === "" || item.links[0].url === ""){
      toast.error("please fill all the fields first")
    }
    else{
      let newVideoSection = "";

      if(courseContentData.length > 0){
        const lastVideoSection = courseContentData[courseContentData.length - 1].videoSection;
        if(lastVideoSection){
          newVideoSection = lastVideoSection;
        }
      }
      const newContent = {
        videoUrl: "",
        title: "",
        description: "",
        videoSection: newVideoSection,
        links: [{title:"",url: ""}]
      };
      setCourseContentData([...courseContentData, newContent])
    }
  }

  const addNewSection = () => {
    if(
      courseContentData[courseContentData.length - 1].title === "" ||
      courseContentData[courseContentData.length - 1].description === "" ||
      courseContentData[courseContentData.length - 1].videoUrl === "" ||
      courseContentData[courseContentData.length - 1].url === ""
    ){
      toast.error("please fill all the fields first!")
    }else{
      setActiveSection(activeSection + 1);
      const newContent = {
          videoUrl: "",
        title: "",
        description: "",
        videoSection: `Untitled Section ${activeSection}`,
        links: [{title:"",url: ""}]
      }
      setCourseContentData([...courseContentData, newContent])
    }
  }

  const prevButton = () => {
    setActive(active - 1);
  }

  const nextButton = () => {
    if(
      courseContentData[courseContentData.length - 1].title === "" ||
      courseContentData[courseContentData.length - 1].description === "" ||
      courseContentData[courseContentData.length - 1].videoUrl === "" ||
      courseContentData[courseContentData.length - 1].url === ""
    ){
      toast.error("Sections can't be empty")
    }else{
      handleSubmit();
      setActive(active + 1);
    }
    
  }

  return (
    <div className="w-[80%] m-auto mt-24 p-3">
      <form onSubmit={handleSubmit}>
        {courseContentData?.map((item, index) => {
          const showSectionInput =
            index === 0 ||
            item.videoSection !== courseContentData[index - 1].videoSection;

          return (
            <>
              <div
                className={`w-full bg-[#cdc8c817] p-4 ${
                  showSectionInput ? "mt-10" : "mb-0"
                }`}
              >
                {showSectionInput && (
                  <>
                    <div className="flex w-full items-center">
                      <input
                        type="text"
                        className={`text-[20px] ${
                          item.videoSection === "Untitled Section"
                            ? "w-[170px]"
                            : "w-min"
                        } font-Poppins cursor-pointer dark:text-white text-black bg-transparent outline-none`}
                        value={item.videoSection}
                        onChange={(e) => {
                          const updatedData = [...courseContentData];
                          updatedData[index].videoSection = e.target.value;
                          setCourseContentData(updatedData);
                        }}
                      />
                      <BiSolidPencil className="cursor-pointer dark:text-white text-black" />
                    </div>
                  </>
                )}
                <div className="flex w-full items-center justify-between my-0">
                  {isCollapsed[index] ? (
                    <>
                      {item.title ? (
                        <p className="font-Poppins dark:text-white text black">
                          {index + 1}.{item.title}
                        </p>
                      ) : (
                        <></>
                      )}
                    </>
                  ) : (
                    <div></div>
                  )}
                  <div className="flex items-center">
                    <AiOutlineDelete
                      className={`dark:text-white text-[20px] mr-2 text-black ${
                        index > 0 ? "cursor-pointer" : "cursor-no-drop"
                      }`}
                      onClick={() => {
                        if (index > 0) {
                          const updateData = [...courseContentData];
                          updateData.splice(index, 1);
                          setCourseContentData(updateData);
                        }
                      }}
                    />
                    <MdOutlineKeyboardArrowDown
                      fontSize="large"
                      className="dark:text-white text-black"
                      style={{
                        transform: isCollapsed[index]
                          ? "rotate[180deg]"
                          : "rotate(0deg)",
                      }}
                      onClick={() => handleCollapseToggle(index)}
                    />
                  </div>
                </div>
                {!isCollapsed[index] && (
                  <>
                    <div className="my-3">
                      <label> Video Title</label>
                      <input
                        type="text"
                        placeholder="Project plan..."
                        className="block p-[2px] border w-full border-white"
                        value={item.title}
                        onChange={(e) => {
                          const updatedData = [...courseContentData];
                          updatedData[index].title = e.target.value;
                          setCourseContentData(updatedData);
                        }}
                      />
                    </div>
                    <div className="my-3">
                      <label> Video URL</label>
                      <input
                        type="text"
                        placeholder="Enter url"
                        className="block p-[2px] border w-full border-white"
                        value={item.videoUrl}
                        onChange={(e) => {
                          const updatedData = [...courseContentData];
                          updatedData[index].videoUrl = e.target.value;
                          setCourseContentData(updatedData);
                        }}
                      />
                    </div>
                    <div className="my-3">
                      <label> Description</label>
                      <textarea
                        rows={8}
                        cols={30}
                        type="text"
                        placeholder="Write video description"
                        className=" !h-min block p-[2px] border w-full border-white"
                        value={item.description}
                        onChange={(e) => {
                          const updatedData = [...courseContentData];
                          updatedData[index].description = e.target.value;
                          setCourseContentData(updatedData);
                        }}
                      />
                      <br />
                    </div>
                    {item?.links.map((link, linkIndex) => (
                      <div className="mb-3 block">
                        <div className="w-full">
                          <label className="inline-block">
                            Link {linkIndex + 1}
                          </label>
                          <AiOutlineDelete
                            className={`${
                              linkIndex === 0
                                ? "cursor-no-drop"
                                : "cursor-pointer"
                            } text-black dark:text-white text-[20px] inline align-top`}
                            onClick={(index, linkIndex) =>
                              linkIndex === 0
                                ? null
                                : handleRemoveLink({ index, linkIndex })
                            }
                          />
                          <input
                            type="text"
                            placeholder="Sourse Code... {Link title}"
                            className={`mt-[10px] p-[2px] border w-full border-white`}
                            value={link.title}
                            onChange={(e) => {
                              const updatedData = [...courseContentData];
                              updatedData[index].links[linkIndex].title =
                                e.target.value;
                              setCourseContentData(updatedData);
                            }}
                          />
                          <input
                            type="url"
                            placeholder="Sourse Code Url... {Link URL}"
                            className={`mt-[16px] p-[2px] border block w-full border-white`}
                            value={link.url}
                            onChange={(e) => {
                              const updatedData = [...courseContentData];
                              updatedData[index].links[linkIndex].url =
                                e.target.value;
                              setCourseContentData(updatedData);
                            }}
                          />
                        </div>
                      </div>
                    ))}
                    <div className="inline-block mb-4">
                      <p
                        className="w-auto px-[16px] py-[6px] rounded-2xl text-black bg-green-500 cursor-pointer"
                        onClick={() => handleAddLink(index)}
                      >
                        <p className="flex items-center ">
                          <LinkOutlined />
                          Add Link
                        </p>
                      </p>
                    </div>
                  </>
                )}
                <div className="w-[200px] mt-[10px] mx-auto">
                  <p
                    className="w-auto px-[16px] py-[6px] rounded-2xl text-white bg-blue-500 cursor-pointer"
                    onClick={(e) => handleNewSection(item)}
                  >
                    <p className="align-text-bottom">
                      <AddCircle className="pr-[5px]" />
                      Add New Content
                    </p>
                  </p>
                </div>
                <br />
                
              </div>
            </>
          );
        })}
        <br />
        <div className="w-[200px] mx-auto mb-4">
                  <p
                    className="w-auto px-[16px] py-[6px] rounded-2xl text-white bg-blue-700 cursor-pointer"
                    onClick={() => addNewSection()}
                  >
                    <p className="align-text-bottom">
                      <AddCircle className="pr-[5px]" />
                      Add New Section
                    </p>
                  </p>
                </div>
                <div className="flex justify-between">
                  <button className="bg-green-500 text-black px-[12px] rounded-2xl py-[4px]" onClick={() => prevButton()}>Prev</button>
                  <button className="bg-green-500 text-black px-[12px] rounded-2xl py-[4px]" onClick={() => nextButton()}>Next</button>
                </div>
      </form>
    </div>
  );
};

export default CourseContent;
