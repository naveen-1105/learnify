'use client'
import { redirect } from "next/navigation";
import userAuth from "./userAuth";
import React from "react";

export default function Protected({children}){
    const isAuthenticated = userAuth();
    console.log(isAuthenticated);

    return isAuthenticated ? children : redirect("/");
}