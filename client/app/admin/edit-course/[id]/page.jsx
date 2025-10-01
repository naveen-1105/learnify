'use client'
import EditCourse from '../../Course/EditCourse'
import Sidebar from '../../../../app/components/Admin/Sidebar'
import React from 'react'
import DashBoard from '../../../../app/components/Admin/DashBoard'
import { useParams } from 'next/navigation'

const page = () => {
    const id = useParams().id;
    return (
    <div>
      <div className='flex'>
        <div className='1500px:w-[16%] w-1/5'>
          <Sidebar/>
        </div>
        <div className='w-[85%] min-h-screen'>
          <DashBoard/>
          <EditCourse id = {id}/>
        </div>
      </div>
    </div>
  )
}

export default page