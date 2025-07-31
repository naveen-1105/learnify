import Link from "next/link";
import React from "react";
import ThemeSwitcher from "./ThemeSwitcher";

const NavItemsData = [
  { name: "Home", link: "/" },
  { name: "About", link: "/about" },
  { name: "Courses", link: "/courses" },
  { name: "Contact", link: "/contact" },
  { name: "FAQs", link: "/FAQs" },
];

const NavItem = ({ activeItem, isMobile }) => {
  return (
    <>
      <div className="hidden md:flex">
        {NavItemsData &&
          NavItemsData.map((i, index) => (
            <Link href={i.link} key={index}>
              <span
                className={`${
                  activeItem === index
                    ? "dark:text-[#37a39a] text-[crimson]"
                    : "dark:text-white text-black"
                } text-[18px] px-6 font-Poppins font-[400]`}
              >
                {i.name}
              </span>
            </Link>
          ))}
      </div>
      {isMobile && (
        <div className="md:hidden mt-5">
          
            {NavItemsData &&
              NavItemsData.map((i, index) => (
                <Link href={i.link} passHref key={index}>
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
