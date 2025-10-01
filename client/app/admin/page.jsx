'use client'
import AdminProtected from '../../hooks/useAdminProtected'
import React, { useState } from 'react'
import Header from '../components/Header'
import Sidebar from '../components/Admin/Sidebar'
import DashBoard from '../components/Admin/DashBoard'
import DashBoardHero from '../components/Admin/DashBoardHero'

const Page = () => {
 

  return (
    <AdminProtected>
      <div className='flex h-[200vh]'>
        <div className='1500px:w-[16%] w-1/5'>
          <Sidebar/>
        </div>
        <div className='w-[85%]'>
          <DashBoard/>
          <DashBoardHero/>
        </div>
        
      </div>
    </AdminProtected>
  )
}

export default Page
