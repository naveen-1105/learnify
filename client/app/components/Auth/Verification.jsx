'use client'
import React, { use, useEffect, useState } from "react";
import { VscWorkspaceTrusted } from "react-icons/vsc";
import OtpInput from "@/app/utils/OtpInput";
import { useActivationMutation } from "@/redux/feature/auth/authApi";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";

const Verification = ({ setRoute }) => {
  const [otp, setOtp] = useState("");
  const token  = useSelector((state) => state.auth.token);
  const [ activation, { data, error, isSuccess } ] = useActivationMutation();
  const [InvalidError,setInvalidError] = useState(false);

  const handleSubmit = async () => {
    if(otp.length !== 6){
        toast.error("Please enter full OTP")
        return;
    }

    try {
        await activation({activationToken: token, activationCode: otp});
    } catch (error) {
        console.error("Activation request failed",error);
    }
  }

  useEffect(()=> {
    if(isSuccess){
        toast.success("Account activated successfully");
        setRoute("Login");
    }
    if(error){
        if("data" in error){
            const errorData = error;
            toast.error(errorData.data.message);
        }else{
            console.log('An error occured',error);
        }
    }
  },[isSuccess,error])

  


  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <h1 className="text-center text-2xl font-bold p-[24px]">
        Verify your Account
      </h1>
      <div className="flex justify-center items-center bg-blue-500 rounded-full w-[60px] h-[60px] m">
        <VscWorkspaceTrusted size={30} />
      </div>

      <OtpInput length={6} setOtp={setOtp} otp={otp} />

      <p className="text-[12px]">
        We have sent a verification OTP to your email.
      </p>
      <button
        className="w-full bg-blue-500 h-[30px] rounded-3xl"
        onClick={handleSubmit}
      >
        Submit
      </button>
    </div>
  );
};

export default Verification;
