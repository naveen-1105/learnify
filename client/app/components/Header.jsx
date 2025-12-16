"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import NavItem from "../utils/NavItem";
import { HiOutlineMenuAlt3, HiOutlineUserCircle } from "react-icons/hi";
import CustomModal from "../utils/CustomModal";
import Login from "../components/Auth/Login";
import SignUp from "../components/Auth/SignUp";
import Verification from "../components/Auth/Verification";
import { useSelector,useDispatch } from "react-redux";
import Image from "next/image";
import profile from "../assets/profile.jpg";
import { useSession } from "next-auth/react";
import {
  useLoginMutation,
  useSocialAuthMutation,
} from "../../redux/feature/auth/authApi";
import toast from "react-hot-toast";

import { useLoadUserQuery } from "../../redux/feature/api/apiSlice";
import { redirect,useRouter } from "next/navigation";
import { setOpen, setActiveItem, setRoute } from "../../redux/feature/ui/uiSlice.js";
import ThemeSwitcher from "../utils/ThemeSwitcher";
import Loader from "./Loader";

const Header = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleProfileClick = () => {
    setLoading(true);
    router.push("/profile");
  };

  const { open, activeItem, route } = useSelector((state) => state.ui);
  const dispatch = useDispatch();

  const [active, setActive] = useState(false);
  const [openSidebar, setOpenSidebar] = useState(false);
  const { userData, isLoading, refetch } = useLoadUserQuery();
  const [login, {}] = useLoginMutation();
  const { user } = useSelector((state) => state.auth);
  const { data } = useSession();

  const [socialAuth, { isSuccess }] = useSocialAuthMutation();

  useEffect(() => {
    if (!isLoading) {
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
      if (userData) {
        async () => {
          await login({
            email: userData?.user?.email,
            name: userData?.user?.name,
            avatar: userData?.user?.image,
          });
        };
      }
      if (data === null) {
        if (isSuccess) {
          toast.success("Login Successfully");
        }
      }
    }
  }, [data, userData, isLoading]);

  const handleClose = (e) => {
    if (e.target.id === "screen") {
      setOpenSidebar(false);
    }
  };

  return (
    
    <div className="w-full z-999999999">
      {loading && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-[999999]">
          <Loader />
        </div>
      )}
      {
        !loading && (
          <div
        className={`top-0 left-0 w-full h-[80px] z-[80] transition duration-500 ${
          active
            ? "bg-gradient-to-b from-gray-900 to-black shadow-xl dark:border-[#ffffff1c]"
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
                onClick={() => dispatch(setActive(0))}
              >
                Learnify
                
              </Link>
            </div>
            <div className="flex items-center gap-3">
              <NavItem
                activeItem={activeItem}
                setActiveItem={(item) => dispatch(setActiveItem(item))}
                isMobile={false}
              />
              {isMounted && <ThemeSwitcher />}
              <div className="md:hidden">
                <HiOutlineMenuAlt3
                  size={25}
                  className="cursor-pointer dark:text-white text text-black "
                  onClick={() => setOpenSidebar(true)}
                />
              </div>
              {user ? (
                <div>
                  <Image
                    src={user.avatar ? user.avatar.url : profile}
                    alt="profile picture"
                    width={30}
                    height={30}
                    className="w-[30px] h-[30px] object-cover rounded-full"
                    onClick={handleProfileClick}
                  />
                </div>
              ) : (
                <HiOutlineUserCircle
                  size={25}
                  className=" md:block cursor-pointer dark:text-white text text-black "
                  onClick={() => dispatch(setOpen(true))}
                />
              )}
            </div>
          </div>
        </div>
        {openSidebar && (
          <div
            className="fixed w-full h-screen top-0 left-0  dark:bg-[unset] bg-[#00000024] z-999999999"
            onClick={handleClose}
            id="screen"
          >
            <div className="w-[70%] fixed  h-screen bg-white dark:bg-slate-900/90 top-0 right-0">
              <NavItem
                activeItem={activeItem}
                setActiveItem={(item) => dispatch(setActiveItem(item))}
                isMobile={true}
              />
              {user ? (
                <div onClick={handleProfileClick} className="cursor-pointer">
                  <Image
                    src={user.avatar ? user.avatar.url : img}
                    alt="profile picture"
                    width={30}
                    height={30}
                    className="w-[30px] h-[30px] object-cover rounded-full absolute left-[20px] inline"
                    
                  />
                  <p className="text-[20px] pl-[60px]">Profile</p>
                </div>
              ) : (
                <HiOutlineUserCircle
                  size={25}
                  className="left-[20px] md:block cursor-pointer dark:text-white text text-black "
                  onClick={() => dispatch(setOpen(true))}
                />
              )}
              <br />
              <br />
              <p className="ml-5 my-2 text-black dark:text-white">
                Copyright © 2025 Learnify
              </p>
            </div>
          </div>
        )}
      </div>
        )
      }
      {route === "Login" && (
        <>
          {open && (
            <CustomModal
              open={open}
              setOpen={(val) => dispatch(setOpen(val))}
              activeItem={activeItem}
              setRoute={(r) => dispatch(setRoute(r))}
              component={Login}
              
            />
          )}
        </>
      )}
      {route === "SignUp" && (
        <>
          {open && (
            <CustomModal
              open={open}
              setOpen={(val) => dispatch(setOpen(val))}
              activeItem={activeItem}
              setRoute={(r) => dispatch(setRoute(r))}
              component={SignUp}
            />
          )}
        </>
      )}

      {route === "Verification" && (
        <>
          {open && (
            <CustomModal
              open={open}
              setOpen={(val) => dispatch(setOpen(val))}
              activeItem={activeItem}
              setRoute={(r) => dispatch(setRoute(r))}
              component={Verification}
            />
          )}
        </>
      )}
    </div>
  );
};

export default Header;
