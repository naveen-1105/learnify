import React, { useState } from "react";

const CourseInformation = ({
  courseInfo,
  setCourseInfo,
  active,
  setActive,
}) => {
  const [dragging, setDragging] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setActive(active + 1);
  }

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if(file){
      const reader = new FileReader();
      reader.onload = (e) => {
        if(reader.readyState === 2){
          setCourseInfo({...courseInfo,thumbnail:reader.result})
        }
      }
      reader.readAsDataURL(file)
    }
  }

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragging(true);
  }

  const handleDragLeave = (e) => {
    e.preventDefault();
    setDragging(false);
  }
  const handleDrop = (e) => {
    e.preventDefault();
    setDragging(false);

    const file = e.dataTransfer.files?.[0];

    if(file){
      const reader = new FileReader();

      reader.onload = () => {
        setCourseInfo({...courseInfo, thumbnail: reader.result})
      }
      reader.readAsDataURL(file)
    }
  }


  return (
    <div className="w-[80%] m-auto mt-24">
      <form
        onSubmit={handleSubmit}
        className=" block mb-2 font-medium text-gray-700 dark:text-white"
      >
        <div>
          <label htmlFor="">Course Name</label>
          <input
            type="text"
            name=""
            required
            value={courseInfo.name}
            onChange={(e) =>
              setCourseInfo({ ...courseInfo, name: e.target.value })
            }
            id="name"
            placeholder="MERN stack LMS platform with next 13"
            className=" border w-[100%] block mb-2 p-[2px] font-medium text-gray-700 dark:text-white"
          />
        </div>
        <br />
        <div>
          <label htmlFor="">Course Description</label>
          <textarea
            type="text"
            name=""
            rows={5}
            required
            value={courseInfo.description}
            onChange={(e) =>
              setCourseInfo({ ...courseInfo, description: e.target.value })
            }
            id="name"
            placeholder="Write an amazing description for your course..."
            className=" border overflow-hidden w-[100%] block mb-2 p-[2px] font-medium text-gray-700 dark:text-white"
          />
        </div>
        <br />
        <div className="flex justify-between">
          <div className="w-[45%]">
          <label htmlFor="">Price</label>
          <input
            type="text"
            name=""
            required
            value={courseInfo.price}
            onChange={(e) =>
              setCourseInfo({ ...courseInfo, price: e.target.value })
            }
            id="name"
            placeholder="In Rupees"
            className=" border overflow-hidden block w-[100%] mb-2 p-[2px] font-medium text-gray-700 dark:text-white"
          />
        </div>
        <div className="w-[50%]">
          <label htmlFor="">Estimated Price</label>
          <input
            type="text"
            name=""
            required
            value={courseInfo.estimatedPrice}
            onChange={(e) =>
              setCourseInfo({ ...courseInfo, estimatedPrice: e.target.value })
            }
            id="name"
            placeholder="In Rupees"
            className=" border overflow-hidden block w-[100%] mb-2 p-[2px] font-medium text-gray-700 dark:text-white"
          />
        </div>
        </div>
        <br />
        <div className="flex justify-between">
          <div className="w-[45%]">
          <label htmlFor="">Course Level</label>
          <select id="courseLevel"
      className="border block w-full mb-2 p-[5px] "
      value={courseInfo.level} 
      onChange={(e) =>
        setCourseInfo({ ...courseInfo, level: e.target.value })
      }>
            <option className="text-gray-600 hidden">Select the course level</option>
            <option className="text-white bg-black">Beginner</option>
            <option className="text-white bg-black">Intermediate</option>
            <option className="text-white bg-black">Expert</option>
          </select>
        </div>
        <div className="w-[50%]">
          <label htmlFor="">Demo URL</label>
          <input
            type=""
            name=""
            required
            value={courseInfo.demoUrl}
            onChange={(e) =>
              setCourseInfo({ ...courseInfo, demoUrl: e.target.value })
            }
            id="name"
            placeholder=""
            className=" border overflow-hidden block w-[100%] mb-2 p-[2px] font-medium text-gray-700 dark:text-white"
          />
        </div>
        </div>
        <br />
        <label htmlFor="">Thumbnail</label>
        <input type="file" 
        accept="image"
        id="file"
        className="hidden"
        onChange={handleFileChange}/>
        <label htmlFor="file" className={`w-full min-h-[10vh] dark:border-white border-[#00000026] p-3 border flex items-center justify-center ${
          dragging ? 'bg-blue-500' : 'bg-transparent'
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}>
          {
            courseInfo.thumbnail ? (
              <img src={courseInfo.thumbnail} className ="max-h-full w-full object-cover" alt=""/>
            ) : (
              <span className="text-black dark:text-white">
                Drag and drop your thumbnail here or click to browse
              </span>
            )
          }
        </label>
        <br />
        <div className="w-full flex items-center justify-end">
          <input type="submit" value="Next" className="w-full 800px:w-[180px] h-[40px] bg-green-500 text-center text-white rounded-2xl mt-8 cursor-pointer" />

        </div>
      </form>
    </div>
  );
};

export default CourseInformation;
