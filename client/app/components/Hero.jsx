import Image from "next/image";
import React, { useState } from "react";

import { FaSearch } from "react-icons/fa";
import img from "../assets/img.png";
import img2 from "../assets/img2.png";
import img3 from "../assets/img3.png";
import img4 from "../assets/img4.png";
import Link from "next/link";
import { useRouter } from "next/navigation";

const Hero = () => {

return (
    <>
        <div className="w-full min-h-[90vh] flex flex-col sm:flex-row items-center  px-4 sm:px-6 lg:px-8 py-8 sm:py-12 overflow-hidden">
            <div className="w-full sm:w-1/2 flex justify-center relative mb-8 sm:mb-0">
                <div className="sm:w-[500px] sm:h-[500px] w-[350px] h-[350px] rounded-full hero_animation absolute sm:top-[-60px] sm:mt-0 mt-[100px] z-10">  
                      
                </div>
                <Image 
                    src={img}
                    width={400}
                    height={400}
                    alt="Hero Image"
                    className=" w-[280px] sm:w-[400px] h-auto object-contain z-99 sm:mt-[0px] mt-[150px]"
                />  
                
            </div>
            <div className="flex flex-col w-full sm:gap-0 gap-[20px] sm:mt-0 mt-[20px] sm:w-1/2 text-center sm:text-left">
                <h1 className="text-3xl sm:text-4xl lg:text-[56px] font-bold leading-tight text-white">
                    Improve Your Online <br className="hidden sm:block" />
                    Learning Experience <br className="hidden sm:block" /> 
                    Better Instantly{" "}
                </h1>
                <p className="text-sm sm:text-base py-4 sm:py-[20px] max-w-[600px] text-white">
                    We have 40k+ Online courses & 500k+ Online registered student. Find
                    your desired Courses from them.
                </p>
               
                <div className="mt-6 sm:mt-8">
                    <div className="flex relative">
                        <div className="flex relative">
                            <div className="rounded-full w-[30px] h-[30px] overflow-hidden absolute left-[1px] z-10">
                                <Image src={img2} width={30} height={30} alt="User Avatar 1" className="object-cover" />
                            </div>
                            <div className="rounded-full w-[30px] h-[30px] overflow-hidden absolute left-[18px] z-20">
                                <Image src={img4} width={30} height={30} alt="User Avatar 2" className="object-cover" />
                            </div>
                            <div className="rounded-full w-[30px] h-[30px] overflow-hidden absolute left-[35px] z-30">
                                <Image src={img3} width={30} height={30} alt="User Avatar 3" className="object-cover" />
                            </div>
                        </div>
                        <p className="font-josefin ml-[70px] text-sm sm:text-base text-white">
                            500k+ people already trusted us!{" "}
                            <Link href={"/"} className="dark:text-green-600 text-blue-700 hover:underline">
                                View Courses
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </>
);
};

export default Hero;
