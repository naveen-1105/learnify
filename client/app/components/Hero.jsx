import Image from "next/image";
import React from "react";

import { FaSearch } from "react-icons/fa";
import img from "../assets/img.png";
import img2 from "../assets/img2.png";
import img3 from "../assets/img3.png";
import img4 from "../assets/img4.png";
import Link from "next/link";

const Hero = () => {
  // Import your image from assets

return (
    <>
        <div className="w-full md:flex bg-white items-center dark:bg-gradient-to-b dark:from-gray-900 dark:to-black min-h-screen overflow-hidden">
            <div className="w-full flex justify-center relative">
                <div className="w-[500px] h-[500px] rounded-full hero_animation absolute top-[-60px] z-10">      
                </div>
                <Image src = {img}
                        width= {400}
                        height = {400}
                        className="z-20"/>
            </div>
            <div className="flex flex-col  w-full">
                <h1 className="text-[56px] font-bold">
                    Improve Your Online <br />
                    Learnig Experience <br /> Better Instantly{" "}
                </h1>
                <p className="text-[12px] py-[20px]">
                    We have 40k+ Online courses & 500k+ Online registered student.Find
                    your <br /> desired Courses from them.
                </p>
                <div className="flex rounded-[20px]">
                    <input
                        type="text"
                        className="w-[370px] rounded-l-[5px] bg-gray-400 h-[35px] outline-none p-[10px]"
                        placeholder="Search courses..."
                    />
                    <div className="w-[35px] h-[35px] bg-blue-400 rounded-r-[5px] flex justify-center items-center">
                        <FaSearch />
                    </div>
                </div>
                <div >
                    <div className="flex relative float-left">
                    <div className="rounded-full w-[30px] h-[30px] overflow-hidden absolute top-[30px] left-[1px] z-10">
                        <Image src={img2} width={30} height={30} alt="Hero Image" />
                    </div>
                    <div className="rounded-full w-[30px] h-[30px] overflow-hidden absolute top-[30px] left-[18px] z-20">
                        <Image src={img4} width={30} height={40} alt="Hero Image" />
                    </div>
                    <div className="rounded-full w-[30px] h-[30px] overflow-hidden absolute top-[30px] left-[35px] z-30">
                        <Image src={img3} width={30} height={40} alt="Hero Image" />
                    </div>
                </div>
                <p className="font-josefin relative left-[70px] top-[32px]">500k+ people already trusted us! <Link href={"/"} className="dark:text-green-600 text-blue-700" >View Courses</Link></p>

                </div>
            </div>
        </div>
    </>
);
};

export default Hero;
