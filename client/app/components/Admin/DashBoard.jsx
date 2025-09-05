"use client";
import React, { useState } from "react";
import Badge from "@mui/material/Badge";
import NotificationsIcon from "@mui/icons-material/Notifications";
import ThemeSwitcher from "../../../app/utils/ThemeSwitcher";


const DashBoard = () => {
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(!open);
  };


  return (
    <div className="flex w-full h-1/25 bg-transparent justify-end items-center pr-[20px] pt-[20px] relative">
      <ThemeSwitcher />

      <Badge badgeContent={4} color="success">
        <NotificationsIcon
          color="white"
          className="cursor-pointer"
          onClick={handleClick}
        />
      </Badge>
      {open && (
        <div className="w-[200px] h-[auto] top-[50px] right-[20px] absolute">
          <div className="p-3 border-b border-gray-300">
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Non
              necessitatibus temporibus.
            </p>
          </div>
          <div className="p-3 border-b border-gray-300">
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Non
              necessitatibus temporibus.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default DashBoard;
