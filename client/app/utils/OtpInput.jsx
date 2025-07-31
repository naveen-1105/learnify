import React, { useEffect, useState } from "react";
import { number } from "yup";

const OtpInput = ({ length,setOtp }) => {
  const [otpInput, setOtpInput] = useState(new Array(length).fill(""));


//   const onChangeOtp = (newOtp) => {
//     setOtpInput(newOtp);
//   }

  const handleChange = (e, index) => {
    const value = e.target.value;
    if (!/^\d*$/.test(value)) return; // Only allow digits

    const newOtp = [...otpInput];
    newOtp[index] = value;
    setOtpInput(newOtp);

    if (index < length - 1 && value) {
      e.target.nextSibling.focus();
    }
    setOtp(newOtp.join(""));
  }

  

  return (
    <div className="flex flex-col gap-2 justify-center items-center">
        <div className="flex gap-2 justify-center items-center">
            {otpInput.map((data, index) => {
        return (
          <input
            type="text"
            value={data}
            key={index}
            maxLength={1}
            className="w-[40px] h-[40px] border-2 border-gray-300 rounded text-center outline-none text-white"
            onChange={(e) => handleChange(e, index)}
            onKeyDown={(e) => {
              if (e.key === "Backspace" && index > 0 && !otpInput[index]) {
                e.target.previousSibling.focus();
                const newOtp = [...otpInput];
                newOtp[index - 1] = "";
                setOtpInput(newOtp);
                setOtp(newOtp.join(""));
              }
            }}
          />
        );
      })}
        </div>
      <br/>
      
     


    </div>
  );
};

export default OtpInput;
