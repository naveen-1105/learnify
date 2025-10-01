'use client'
import Protected from "../../hooks/useProtected";
import React, { useState } from "react";
import MetaData from "../utils/MetaDataGen";
import Header from "../components/Header";
import Profile from "../../Profile/Profile";
import { useSelector } from "react-redux";

const page = () => {
  const {user} = useSelector((state) => state.auth)


  return (
    <div>
      <MetaData
          title = {`${user?.name} Profile`}
          description="Learnify is a comprehensive learning platform."
        />
        <Header/>
      <Protected>
        <Profile/>
      </Protected>
    </div>
  );
};

export default page;
