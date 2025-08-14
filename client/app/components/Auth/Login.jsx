"use client";
import { useLoginMutation } from "@/redux/feature/auth/authApi";
import { useFormik } from "formik";
import React, { useEffect } from "react";
import { useState } from "react";
import { FaEye, FaEyeSlash, FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import * as Yup from "yup";
import toast from "react-hot-toast";
import { signIn } from "next-auth/react";

const Login = ({ setOpen, setRoute }) => {
  const [show, setShow] = useState(false);
  const [Login, { data, isSuccess, error }] = useLoginMutation();

  useEffect(() => {
    if (isSuccess) {
      const message = data?.message || "Login Successful";
      toast.success(message);
      setOpen(false);
    }
    if (error) {
      if ("data" in error) {
        const errorData = error;
        toast.error(errorData.data.message);
      }
    }
  }, [isSuccess, error]);

  const schema = Yup.object().shape({
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    password: Yup.string()
      .required("Password is required")
      .min(6, "Password must be at least 6 characters long"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: schema,
    onSubmit: async ({ email, password }) => {
      const data = { email, password };
      await Login(data);
    },
  });

  const { errors, touched, values, handleChange, handleBlur, handleSubmit } =
    formik;

  return (
    <>
      <h1 className="text-[32px] flex justify-center py-[12px]">
        Login To Learnify
      </h1>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col w-[400px] mx-auto relative"
      >
        <label className="block mb-1 text-blue-500 font-medium">
          Enter your email
        </label>
        <input
          type="text"
          name="email"
          value={values.email}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="Email"
          className={` ${
            errors.email && touched.email ? "border-red-500" : "border-blue-600"
          } p-2 mb-[32px] rounded w-full border`}
        />

        {errors.email && touched.email && (
          <p className="text-red-500 text-sm absolute top-[75px]">
            {errors.email}
          </p>
        )}

        <label className="block mb-1 text-blue-500 font-medium">
          Enter your password
        </label>
        <div className="relative">
          <input
            type={show ? "text" : "password"}
            name="password"
            value={values.password}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="Password"
            className={` ${
              errors.password && touched.password && "border-red-500"
            } p-2 rounded w-full mb-[32px] border border-blue-600 pr-10`}
          />
          <span
            className="absolute right-[12px] top-[12px] cursor-pointer text-blue-600"
            onClick={() => setShow((prev) => !prev)}
          >
            {show ? <FaEyeSlash /> : <FaEye />}
          </span>
        </div>
        {errors.password && touched.password && (
          <p className="text-red-500 text-sm absolute top-[175px]">
            {errors.password}
          </p>
        )}
        <button
          className=" w-full bg-blue-500 text-white p-2 rounded-4xl border border-blue-600 cursor-pointer"
          onClick={() => handleSubmit()}
        >
          Login
        </button>
        <br />
        <br />

        <p className="text-center text-[20px]">Or login with</p>
        <div className="flex justify-center mt-4 gap-[16px] p-[16px]">
          <FcGoogle
            size={30}
            className="cursor-pointer"
            onClick={() => signIn("google")}
          />
          <FaGithub size={30} className="cursor-pointer" 
          onClick={() => signIn("github")}
          />
        </div>

        <p className="text-center">
          Don't have an account?{" "}
          <span
            className="text-blue-500 cursor-pointer"
            onClick={() => setRoute("SignUp")}
          >
            Sign up
          </span>
        </p>
      </form>
    </>
  );
};

export default Login;
