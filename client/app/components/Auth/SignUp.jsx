"use client";
import { useEffect, useState } from "react";
import { useFormik } from "formik";
import { FaEye, FaEyeSlash, FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import * as Yup from "yup";
import { useRegisterMutation } from "../../../redux/feature/auth/authApi";
import toast from "react-hot-toast";
import Loader from "../Loader";
import RoleToggle from "../../utils/Toggle"

const SignUp = ({ setRoute, setOpen }) => {
  const [role, setRole] = useState("student");
  const [show, setShow] = useState(false);
  const [registration,{data,error,isSuccess,isLoading}] = useRegisterMutation();

  

  useEffect(() => {
    if(isSuccess){
      const message ="Registeration Successful";
      toast.success(message)
      setRoute("Login");
    }
    if(error){
      if("data" in error){
        const errorData = error;
        toast.error(errorData.data.message);
      }
    }
  },[isSuccess,error]);

  const schema = Yup.object().shape({
    name: Yup.string()
      .required("Name is required")
      .min(2, "Name must be at least 2 characters long"),
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    password: Yup.string()
      .required("Password is required")
      .min(6, "Password must be at least 6 characters long"),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
    },
    validationSchema: schema,
    onSubmit: async({name,email,password}) => {
      const data = {
        name,
        email,
        password,
        role: role // using the role from component state
      };
      console.log(data);
      await registration(data);

    },
  });

  const { errors, touched, values, handleChange, handleBlur, handleSubmit } =
    formik;

    if(isLoading){
    return <Loader/>
  }

  return (
    <>
      <h1 className="sm:text-[32px] text-[20px] flex justify-center pt-[12px]">
        Welcome To Learnify
      </h1>
      <p className="text-center sm:text-[24px] text-[20px] text-blue-500 font-semibold pb-[12px]">
        Sign Up
      </p>
      <form onSubmit={handleSubmit} className="flex flex-col sm:w-[400px] mx-auto relative">
        <label className="block sm:mb-1 mb-[0px] text-blue-500 sm:font-medium">
          Enter your name
        </label>
        <input
          type="text"
          name="name"
          value={values.name}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="Name"
          className={` ${errors.name && touched.name ? "border-red-500" : "border-blue-600"} sm:p-2 p-1 sm:mb-[32px] mb-[10px] rounded w-full border`}
        />

          {errors.name && touched.name && (
          <p className="text-red-500 text-sm absolute top-[75px]">{errors.name}</p>
        )}
        

        <label className="block mb-1 text-blue-500 font-medium">
          Enter your email
        </label>
        <input
          type="text"
          placeholder="Email"
          name="email"
          value={values.email}
          onChange={handleChange}
          onBlur={handleBlur}
          className={` ${errors.email && touched.email ? "border-red-500" : "border-blue-600"} sm:p-2 p-1 sm:mb-[32px] mb-[10px] rounded w-full border`}
        />

        {errors.email && touched.email && (
          <p className="text-red-500 text-sm absolute top-[175px]">{errors.email}</p>
        )}

        <label className="block mb-1 text-blue-500 font-medium">
          Enter your password
        </label>

        <div className="relative">
          <input
            type={show ? "text" : "password"}
            placeholder="Password"
            name="password"
            value={values.password}
            onChange={handleChange}
            onBlur={handleBlur}
            className={` ${errors.password && touched.password ? "border-red-500" : "border-blue-600"} sm:p-2 p-1 sm:mb-[32px] mb-[10px] rounded w-full border`}
          />
          <span
            className="absolute sm:right-[12px] sm:top-[12px] right-[12px] top-[8px] cursor-pointer text-blue-600"
            onClick={() => setShow((prev) => !prev)}
          >
            {show ? <FaEyeSlash /> : <FaEye />}
          </span>
          
        </div>
        {errors.password && touched.password && (
          <p className="text-red-500 text-sm absolute top-[275px]">{errors.password}</p>
        )}
        <div className="w-full flex justify-center items-center p-[10px]">
          <p className={`px-[5px] ${role === 'student' ? 'text-blue-500' : 'text-gray-500' }`}>Student</p>
          <RoleToggle role={role} setRole={setRole}/>
          <p className={`px-[5px] ${role === 'teacher' ? 'text-green-500' : 'text-gray-500' }`}>Teacher</p>
        </div>
        <button className=" w-full bg-blue-500 text-white p-2 rounded-4xl border border-blue-600 cursor-pointer"
        onClick={handleSubmit}>
          Sign Up
        </button>
        
      </form>
      <br />

      

      <p className="text-center sm:text-[20px] ">Or join with</p>
      <div className="flex justify-center sm:mt-4 gap-[16px] sm:p-[16px]">
        <FcGoogle size={30} className="cursor-pointer" />
        <FaGithub size={30} className="cursor-pointer" />
      </div>

      <p className="text-center">
        Already have an account?{" "}
        <span
          className="text-blue-500 cursor-pointer"
          onClick={() => setRoute("Login")}
        >
          Login
        </span>
      </p>
    </>
  );
};

export default SignUp;
