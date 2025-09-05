import React from "react";
import { IoAddCircle } from "react-icons/io5";
import { MdDelete } from "react-icons/md";

const CourseData = ({ benefit, setBenefit, prerequisites, setPrerequisites,active, setActive }) => {
  const handleAddBenefit = () => {
    setBenefit([...benefit, { title: "" }]);
  };
  const handleBenefitChange = (index,value) => {
    const updatedBenefit = [...benefit];
    updatedBenefit[index].title = value;
    setBenefit(updatedBenefit);
  };
  const handleBenefitDelete = (item) => {
  setBenefit(benefit.filter((b) => b !== item));
};


  const handleAddPrerequisite = () => {
    setPrerequisites([...prerequisites, { title: "" }]);
  };
  const handlePrerequisiteChange = (index,value) => {
    const updatedPrerequisite = [...prerequisites];
    updatedPrerequisite[index].title = value;
    setPrerequisites(updatedPrerequisite);
  };
  const handlePrerequisiteDelete = (index) => {
    setPrerequisites(prerequisites.filter((_, i) => i !== index));
  };

  const handlePrev = () => {
    setActive(active - 1);
  }
  const handleNext = () => {
    setActive(active + 1);
  }
  

  return (
    <div className="w-[80%] m-auto mt-24 block">
      <label htmlFor="benefits">
        Benefits: What are the benefits for the students in this course?
      </label>
      <br />

      {benefit.map((benefit, index) => (
        <div className="w-full flex  items-center gap-[10px]">
          <input
            type="text"
            key={index}
            name="benefit"
            placeholder="You will be able to master MERN stack..."
            required
            className=" border p-[2px] w-[100%] my-2"
            value={benefit.title}
            onChange={(e) => handleBenefitChange(index, e.target.value)}
          />
          <MdDelete
            className="text-[25px]"
            onClick={() => handleBenefitDelete(benefit)}
          />
        </div>
      ))}

      <IoAddCircle className="text-[25px]" onClick={handleAddBenefit} />

      <label htmlFor="prerequisites">
        Prerequisites: What are the prerequisites for the students in this
        course?
      </label>
      <br />
      {prerequisites.map((prerequisites, index) => (
        <div className="w-full flex  items-center gap-[10px]">
            <input
          type="text"
          key={index}
          name="prerequisites"
          placeholder="You need to have basic knowledge of ..."
          required
          className=" border p-[2px] w-[100%] my-2"
          value={prerequisites.title}
          onChange={(e) => handlePrerequisiteChange(index, e.target.value)}
        />
        <MdDelete
            className="text-[25px]"
            onClick={(e) => handlePrerequisiteDelete(index)}
          />
        </div>
      ))}
      <IoAddCircle className="text-[25px]" onClick={handleAddPrerequisite} />
      <br />
      
      <button className="w-auto h-auto bg-green-500 px-[10px] py-[2px] text-black rounded-2xl text-[16px] mx-0" onClick={handlePrev}>Prev</button>
      <button className="w-auto h-auto bg-green-500 px-[10px] py-[2px] text-black rounded-2xl text-[16px] flex float-right" onClick={handleNext}>Next</button>
    </div>
    
  );
};



export default CourseData;
