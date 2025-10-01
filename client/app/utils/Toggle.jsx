import React, { useState } from "react";

const RoleToggle = ({ onChange,setRole,role }) => {
  

  const handleToggle = () => {
    const newRole = role === "student" ? "teacher" : "student";
    setRole(newRole);
    if (onChange) onChange(newRole); // optional callback to parent
  };

  return (
    <div
      className={`w-[120px] h-10 flex items-center rounded-full p-[2px] cursor-pointer ${
        role === "student" ? "bg-blue-500" : "bg-green-500"
      }`}
      onClick={handleToggle}
    >
      <div
        className={`w-1/2 h-full flex items-center justify-center text-white font-medium rounded-full transition-transform duration-300 ${
          role === "teacher" ? "translate-x-full bg-white text-green-500" : "bg-white text-blue-500"
        }`}
      >
        {role === "student" ? "Student" : "Teacher"}
      </div>
    </div>
  );
};

export default RoleToggle;
