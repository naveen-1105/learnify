"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import NavItem from "../utils/NavItem";
import ThemeSwitcher from "../utils/ThemeSwitcher";
import { HiOutlineMenuAlt3, HiOutlineUserCircle } from "react-icons/hi";
import CustomModal from "../utils/CustomModal"
import Login from "../components/Auth/Login";
import SignUp from "../components/Auth/SignUp";
import Verification from "../components/Auth/Verification";
import { useSelector } from "react-redux";
import Image from "next/image";
import img from "../assets/img.png"
import { useSession } from "next-auth/react";
import { useLoginMutation, useLogoutMutation, useSocialAuthMutation } from "@/redux/feature/auth/authApi";
import toast from "react-hot-toast";
import Loader from "./Loader";
import { useLoadUserQuery } from "@/redux/feature/api/apiSlice";

const Header = ({ open, setOpen, activeItem,setRoute,route}) => {
  const [active, setActive] = useState(false);
  const [openSidebar, setOpenSidebar] = useState(false);
  const {userData,isLoading,refetch} = useLoadUserQuery();
  const [login,{}] = useLoginMutation();
  const {user} = useSelector((state) => state.auth);
  const {data} = useSession();
  console.log("jai:", JSON.stringify(data));
  
  const[socialAuth,{isSuccess}] = useSocialAuthMutation();
  const [logout,{}] = useLogoutMutation();



 useEffect(() => {
    if(!isLoading){
      if (!userData) {
        if (data) {
          socialAuth({
            email: data?.user?.email,
            name: data?.user?.name,
            avatar: data.user?.image,
          });
          refetch();
        }
      }
      if(userData){async() => {
        await login({
          email: userData?.user?.email,
            name: userData?.user?.name,
            avatar: userData?.user?.image,
        });
      } 
      }
      if(data === null){
        if(isSuccess){
          toast.success("Login Successfully");
        }
      }
      
    }
  }, [data, userData,isLoading]);


  useEffect(() => {
    const handleScroll = () => {
      setActive(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleClose = (e) => {
    if (e.target.id === "screen") {
      setOpenSidebar(false);
    }
  };

  return (
    <div className="w-full">
      <div className={`top-0 left-0 w-full h-[80px] z-[80] transition duration-500 ${
  active
    ? "dark:bg-gradient-to-b/50 dark:from-gray-900 dark:to-black shadow-xl dark:border-[#ffffff1c]"
    : "border-b dark:border-[#ffffff1c] dark:shadow bg-white dark:bg-[#111827]"
        }`}
      >
        <div className="w-[95%] 800px:w-[92%] m-auto py-2 h-full">
          <div className="w-full h-[80px] flex items-center justify-between p-3">
            <div>
              <Link
                href={"/"}
                className={
                  "text-[25px] font-Poppins font-[500] text-black dark:text-white"
                }
              >
                Learnify
              </Link>
            </div>
            <div className="flex items-center">
              <NavItem activeItem={activeItem} isMobile={false} />
              <ThemeSwitcher />
              <div className="md:hidden">
                <HiOutlineMenuAlt3
                  size={25}
                  className="cursor-pointer dark:text-white text text-black "
                  onClick={() => setOpenSidebar(true)}
                />
              </div>
              { user ? 
              <Link href={"/profile"}>
                <Image 
                src={user.avatar ? user.avatar.url : img}
                alt="profile picture"
                width={30}
                height={30}
                className="w-[30px] h-[30px] object-cover rounded-full"
                />
              </Link> : <HiOutlineUserCircle
                size={25}
                className="hidden md:block cursor-pointer dark:text-white text text-black "
                onClick={() => setOpen(true)}
              />}
              
            </div>
          </div>
        </div>
        {openSidebar && (
          <div
            className="fixed w-full h-screen top-0 left-0 z-[99999] dark:bg-[unset] bg-[#00000024]"
            onClick={handleClose}
            id="screen"
          >
            <div className="w-[70%] fixed z-[999999999] h-screen bg-white dark:bg-slate-900/90 top-0 right-0">
              <NavItem activeItem={activeItem} isMobile={true} />
              <HiOutlineUserCircle
                size={25}
                className="cursor-pointer ml-5 my-2 text-black dark:text-white"
                onClick={() => setOpen(true)}
              />
              <br />
              <br />
              <p className="ml-5 my-2 text-black dark:text-white">
                Copyright © 2025 Learnify
              </p>
            </div>
          </div>
        )}
      </div>
        {
          route === 'Login' && (
            <>
            {
              open && (
                <CustomModal
                  open={open}
                  setOpen={setOpen}
                  activeItem={activeItem}
                  setRoute={setRoute}
                  component={Login}

                />
              )
            }
            </>
          )
        }
          {
            route === 'SignUp' && (
            <>
            {
              open && (
                <CustomModal
                  open={open}
                  setOpen={setOpen}
                  activeItem={activeItem}
                  setRoute={setRoute}
                  component={SignUp}
                />
              )
            }
            </>
          )
          }

          {
            route === 'Verification' && (
            <>
            {
              open && (
                <CustomModal
                  open={open}
                  setOpen={setOpen}
                  activeItem={activeItem}
                  setRoute={setRoute}
                  component={Verification} 
                />
              )
            }
            </>
          )
          } 

    </div>
  );
};

export default Header;
