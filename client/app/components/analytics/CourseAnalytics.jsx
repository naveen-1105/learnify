"use client"
import { useGetCourseAnalyticsQuery } from '../../../redux/feature/analytics/analyticsApi'
import React from 'react'
import {
  AreaChart,
  Area,
  ResponsiveContainer,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from 'recharts'
import Loader from '../Loader'

const CourseAnalytics = () => {
  const { data, isLoading } = useGetCourseAnalyticsQuery()
  
  // Prepare chart data
  const analyticsData = []
  if (data?.courses?.last12Months) {
    data.courses.last12Months.forEach((item) => {
      analyticsData.push({ name: item.month, courses: item.count })
    })
  }

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className='h-screen p-5'>
          <div className='mt-[50px]'>
            <h1 className='text-[32px] text-white'>Course Analytics</h1>
            <p className='text-[20px] text-white'>Last 12 months</p>
          </div>

          <div className='w-full flex items-center justify-center mt-10'>
            <ResponsiveContainer width="90%" height={400}>
              <AreaChart
                data={analyticsData}
                margin={{ top: 20, right: 30, left: 0, bottom: 0 }}
              >
                <defs>
                  <linearGradient id="colorCourses" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#63b3ed" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#63b3ed" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="name" stroke="#ffffff"/>
                <YAxis stroke="#ffffff" />
                <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                <Tooltip contentStyle={{ backgroundColor: '#1a202c', borderRadius: '8px', border: 'none' }} />
                <Legend wrapperStyle={{ color: 'white' }} />
                <Area
                  type="monotone"
                  dataKey="courses"
                  stroke="#63b3ed"
                  fillOpacity={1}
                  fill="url(#colorCourses)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}
    </>
  )
}

export default CourseAnalytics
