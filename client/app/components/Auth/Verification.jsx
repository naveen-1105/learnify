'use client'
import React, { useState } from 'react'
import { VscWorkspaceTrusted } from "react-icons/vsc";
import OtpInput from '@/app/utils/OtpInput';

const Verification = ({setRoute}) => {
      const [otp, setOtp] = useState("");
return (
    <div className='flex flex-col items-center justify-center gap-4'>
        <h1 className='text-center text-2xl font-bold p-[24px]'>Verify your Account</h1>
        <div className='flex justify-center items-center bg-blue-500 rounded-full w-[60px] h-[60px] m'>
            <VscWorkspaceTrusted size={30}/>
        </div>

        <OtpInput length={6} setOtp={setOtp} otp={otp} />

        <p className='text-[12px]'>We have sent a verification OTP to your email.</p>
        <button
            className="w-full bg-blue-500 h-[30px] rounded-3xl"
            onClick={() => {
                console.log(otp);
                setRoute("Login");
                setOtp("");

            }}
        >
            Submit
        </button>
    </div>
)
}

export default Verification