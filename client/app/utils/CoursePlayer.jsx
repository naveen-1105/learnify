"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";

const CoursePlayer = ({ videoUrl }) => {
  const [videoData, setVideoData] = useState({ otp: "", playbackInfo: "" });

  useEffect(() => {
    if(videoUrl) {
      axios
        .post(`https://learnify-zao8.onrender.com/api/v1/getVdoCipherOTP`, {
          videoId: videoUrl,
        })
        .then((res) => {
          setVideoData(res.data);
        })
        .catch((error) => {
          console.error("Error fetching video data:", error);
        });
    }
  }, [videoUrl]);
  return (
    <div style={{ paddingTop: "41%", position: "relative" }}>
      {videoData.otp && videoData.playbackInfo !== "" && (
        <iframe
          src={`https://player.vdocipher.com/v2/?otp=${videoData.otp}&playbackInfo=${videoData.playbackInfo}&player=UjpuYzd9SCtoVedv`}
          style={{
            border: 0,
            width: "90%",
            height: "100%",
            position: "absolute",
            top: 0,
            left: 0,
          }}
          allowFullScreen={true}
          allow="encrypted-media"
        ></iframe>
      )}
      
    </div>
  );
};

export default CoursePlayer;
