"use client"
import { useGetUserAnalyticsQuery } from '../../../redux/feature/analytics/analyticsApi'
import React from 'react'
import { BarChart, Bar, ResponsiveContainer, XAxis, Label, YAxis, LabelList } from 'recharts'
import Loader from '../Loader'

const UserAnalytics = ( isDashBoardHero ) => {
    const { data, isLoading } = useGetUserAnalyticsQuery();
    
    console.log("Raw analytics data:", data);
    const analyticsData = [];

    if (data?.users?.last12Months) {
        data.users.last12Months.forEach((item) => {
            analyticsData.push({ name: item.month, uv: item.count });
        });
    }

    const minValue = 0;

    return (
        <>
            {isLoading ? (
                <Loader />
            ) : (
                <div className='h-screen p-5'>
                    <div className={`${isDashBoardHero? 'mt-[0px]' : 'mt-[50px]'}`}>
                        <h1 className='text-[32px] text-white'>User Analytics</h1>
                        <p className='text-[20px] text-white'>Last 12 months</p>
                    </div>

                    <div className={`w-full flex items-center justify-center ${isDashBoardHero? 'mt-[0px]' : 'mt-[10px]'}`}>
                        <ResponsiveContainer width="90%" height={isDashBoardHero ? 200 : 400}>
                            <BarChart data={analyticsData}>
                                <XAxis dataKey="name">
                                    <Label offset={0} position="insideBottom" />
                                </XAxis>
                                <YAxis domain={[minValue, "auto"]} />
                                <Bar dataKey="uv" fill="#48BB78">
                                    <LabelList dataKey="uv" position="top" />
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            )}
        </>
    )
}

export default UserAnalytics;
