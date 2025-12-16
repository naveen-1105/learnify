import React from 'react'
import EnrolledCourses from '../components/Course/EnrolledCourses'
import Footer from '../components/Footer'
import Header from '../components/Header'

const page = () => {
  return (
    <div className='w-screen min-h-screen'>
        <Header/>
        <EnrolledCourses/>
        <Footer/>

    </div>
  )
}

export default page