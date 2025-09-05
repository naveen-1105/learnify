import CreateCourse from '@/app/components/Course/CreateCourse'
import Sidebar from '../../../app/components/Admin/Sidebar'
import React from 'react'
import DashBoard from '@/app/components/Admin/DashBoard'

const page = () => {
  return (
    <div>
      <div className='flex'>
        <div className='1500px:w-[16%] w-1/5'>
          <Sidebar/>
        </div>
        <div className='w-[85%] min-h-screen'>
          <DashBoard/>
          <CreateCourse/>
        </div>
      </div>
    </div>
  )
}

export default page