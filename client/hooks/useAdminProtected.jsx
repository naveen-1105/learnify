'use client'
import { redirect } from 'next/navigation';
import React from 'react'
import { useSelector } from 'react-redux'

export default function AdminProtected({children}){
    const role = useSelector((state) => state.auth.user.role);
  return role === 'admin' ? children : redirect('/')
}