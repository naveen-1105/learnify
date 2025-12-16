"use client";
import React, { useState } from "react";
import MetaData from "./utils/MetaDataGen.jsx";
import Header from "./components/Header.jsx";
import Hero from "./components/Hero.jsx";
import CoursesPages from "./components/Course/CoursesPage.jsx";
import Reviews from './components/Reviews.jsx'
import Footer from './components/Footer.jsx'
import FAQs from './components/FAQs.jsx'


const Page = () => {
  

  return (
    <div className="w-full min-h-screen bg-gradient-to-b from-gray-900 to-black overflow-x-hidden">
      <MetaData
        title="Learnify"
        description="Learnify is a comprehensive learning platform."
      />
      <div className="relative w-full">
        <div className="fixed w-full z-10000000">
          <Header/>
        </div>
      </div>
      <Hero />
      <CoursesPages />
      <Reviews/>
      <FAQs/>
      <Footer/>
    </div>
  );
};

export default Page;
