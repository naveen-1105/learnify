import Image from "next/image";
import React from "react";
import reviewsImg from "../assets/online-tutorials-concept.png";
import CourseReview from '../utils/CourseReviews.jsx'

const Reviews = () => {
  const reviews = [
    {
      name: "Gene Bates",
      avatar: "https://randomuser.me/api/portraits/men/1.jpg",
      rating: '4',
      profession: "Student | Cambridge university",
      comment:
        "I had the pleasure of exploring E-learning, a website that provides an extensive range of courses on various tech-related topics. I was thoroughly impressed with my experience, as the website offers a comprehensive selection of courses that cater to different skill levels and interests. If you're looking to enhance your knowledge and skills in the tech industry, I highly recommend checking out E-learning!",
        updatedAt: "24-08-2025"
    },
    {
      name: "Verna Santos",
      avatar: "https://randomuser.me/api/portraits/women/1.jpg",
      rating: '3',
      profession: "Full stack developer | Quarter ltd.",
      comment:
        "Thanks for your amazing programming tutorial channel! Your teaching style is outstanding, and the quality of your tutorials is top-notch. Your ability to break down complex topics into manageable parts, and cover diverse programming languages and topics is truly impressive. The practical applications and real-world examples you incorporate reinforce the theoretical knowledge and provide valuable insights. Your engagement with the audience fosters a supportive learning environment. Thank you for your dedication, expertise, and passion for teaching programming, and keep up the fantastic work!",
    },
    {
      name: "Jay Gibbs",
      avatar: "https://randomuser.me/api/portraits/men/2.jpg",
      rating: '5',
      profession: "computer systems engineering student | Zimbabwe",
      comment:
        "Thanks for your amazing programming tutorial channel! Your teaching style is outstanding, and the quality of your tutorials is top-notch. Your ability to break down complex topics into manageable parts, and cover diverse programming languages and topics is truly impressive. The practical applications and real-world examples you incorporate reinforce the theoretical knowledge and provide valuable insights. Your engagement with the audience fosters a supportive learning environment. Thank you for your dedication, expertise, and passion for teaching programming, and keep up the fantastic work!",
    },
    {
      name: "Mina Davidson",
      avatar: "https://randomuser.me/api/portraits/women/2.jpg",
      rating: '4.5',
      profession: "Junior Web Developer | Indonesia",
      comment:
        "I had the pleasure of exploring E-learning, a website that provides an extensive range of courses on various tech-related topics. I was thoroughly impressed with my experience",
    },
    {
      name: "Rosemary Smith",
      avatar: "https://randomuser.me/api/portraits/women/3.jpg",
      rating: '3.5',
      profession: "Full stack web developer | Algeria",
      comment:
        "Your content is very special. The thing I liked the most is that the videos are so long, which means they cover everything in details. for that any person had beginner-level can complete an integrated project when he watches the videos. Thank you very much. Im very excited for the next videos Keep doing this amazing work",
    },
    {
      name: "Laura Mckenzie",
      avatar: "https://randomuser.me/api/portraits/women/4.jpg",
      rating: 4,
      profession: "Full stack web developer | Canada",
      comment:
        "Join E-learning! E-learning focuses on practical applications rather than just teaching the theory behind programming languages or frameworks. I took a lesson on creating a web marketplace using React JS, and it was very helpful in teaching me the different stages involved in creating a project from start to finish. Overall, I highly recommend E-learning to anyone looking to improve their programming skills and build practical projects. E-learning is a great resource that will help you take your skills to the next level.",
    },
  ];
  return (
    <>
      <div className="w-full min-h-screen flex flex-col items-center justify-between bg-gradient-to-bl from-blue-950 to-black">
        <div className="flex sm:flex-row flex-col sm:w-full w-[400px]">
          <Image src={reviewsImg} width={800} height={800} />
          <div className="flex flex-col items-center justify-center">
            <h1 className="sm:text-[32px] text-[24px] font-bold text-white">
              Our Students Are{" "}
              <span className="bg-gradient-to-r from-blue-600 to-violet-500 bg-clip-text text-transparent">
                Our Strength
              </span>
            </h1>
            <h1 className="sm:text-[32px] text-[24px] font-bold text-white">
              See what they Say About Us
            </h1>
            <br />
            <br />
            <br />
            <p className="sm:text-[20px] text-[16px] sm:text-left text-center sm:p-0 p-[20px] text-white">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sint,
              facere impedit. Explicabo dignissimos eius est voluptatibus optio
              labore libero voluptatum necessitatibus sint laboriosam, at
              numquam, alias itaque assumenda debitis! Reiciendis nulla,
              distinctio, quam quia autem odio ipsam vel aperiam nihil
              necessitatibus ad pariatur atque minus odit voluptatibus. Dolor,
              debitis nobis?
            </p>
          </div>
        </div>
        <div className="w-[90%] grid grid-cols-1 md:grid-cols-2 gap-4 justify-items-center mt-[50px]">
        {reviews.map((review, index) => (
          <CourseReview key={index} review={review} />
        ))}
      </div>
      </div>
    </>
  );
};

export default Reviews;
