'use client'
import React from 'react'
import Header from '../../components/Header.jsx'
import Footer from '../../components/Footer.jsx'
import CourseDetailPage from '../../components/CourseDetailPage.jsx'
import { useParams } from 'next/navigation'
import FAQs from '../../components/FAQs.jsx'

const page = () => {
    const id = useParams();
    

  return (
    <div className='w-screen min-h-screen'>
        <Header/>
        <CourseDetailPage id={id}/>
        <Footer/>
        
    </div>
  )
}

export default page