import Link from "next/link";
import React, { useState } from "react";
import ThemeSwitcher from "./ThemeSwitcher";
import Loader from "../components/Loader";

const NavItemsData = [
  { name: "Home", link: "/" },
  { name: "About", link: "/about" },
  { name: "Courses", link: "/courses" },
  { name: "Contact", link: "/contact" },
  { name: "FAQs", link: "/FAQs" },
];

const NavItem = ({ activeItem, isMobile,setActiveItem }) => {
  const [isLoading, setLoading] = useState(false)
  return (
    <>
      {
        isLoading ? (
          <div className="w-screen h-screen">
            <Loader/>
          </div>
        ) : (
          <div className="hidden md:flex">
        {NavItemsData &&
          NavItemsData.map((i, index) => (
            <Link href={i.link} key={index}>
              <span
                className={`${
                  activeItem === index
                    ? "text-[#37a39a]"
                    : "text-white"
                } text-[18px] px-6 font-Poppins font-[400]`
              }onClick={() => {
                setActiveItem(index)
                setLoading(true)
              }}
              >
                {i.name}
              </span>
            </Link>
          ))}
      </div>)}
      {isMobile && (
        <div className="md:hidden mt-5 z-9999999999">
          
            {NavItemsData &&
              NavItemsData.map((i, index) => (
                <Link href={i.link} passHref key={index} >
                  <span
                    className={`${
                      activeItem === index
                    } block py-5 text-[18px] px-6 font-Poppins font-[400]`}
                  >
                    {i.name}
                  </span>
                </Link>
              ))}
          </div>
      )}
        
        
      
      
    </>
  );
};

export default NavItem;
