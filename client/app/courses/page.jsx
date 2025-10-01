import React from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import CoursesPage from '../components/Course/CoursesPage'

const page = () => {
  return (
    <div>
        <Header />
        <CoursesPage/>
        <Footer/>
    </div>
  )
}

export default page