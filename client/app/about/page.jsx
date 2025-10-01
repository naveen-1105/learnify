import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import img from "../assets/png.png";
import Image from "next/image";

const page = () => {
  return (
    <div className="w-full">
      <Header />
      <div className="w-full sm:flex sm:flex-col items-center p-[20px]">
        
        <p className="w-full sm:w-[50%] sm:text-left text-center">
          <span className="text-[32px] bg-gradient-to-r from-blue-600 to-violet-500 bg-clip-text text-transparent">
            About Learnify
          </span>
          <br />
          <br />
          Learnify is a next-generation e-learning platform engineered with the
          MERN stack (MongoDB, Express.js, React, and Node.js) to deliver a
          fast, secure, and scalable learning experience. Our architecture is
          designed for real-time interaction, seamless content delivery, and
          smooth performance across devices, ensuring accessibility for learners
          anywhere in the world. By leveraging cloud integration, responsive
          design, and optimized APIs, Learnify creates a reliable digital
          classroom that bridges the gap in distance education. Students benefit
          from interactive course modules, instant doubt resolution, and
          progress tracking—all supported by robust backend systems that
          guarantee efficiency and consistency. With technology at its core,
          Learnify empowers learners to engage effectively, collaborate
          remotely, and achieve academic excellence without geographical
          limitations.
        </p>
        <Image src={img} width={600} height={600}/>
      </div>
      <Footer />
    </div>
  );
};

export default page;
