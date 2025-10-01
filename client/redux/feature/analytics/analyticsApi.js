import { apiSlice } from "../api/apiSlice";

export const analyticsApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getCourseAnalytics: builder.query({
            query: () => ({
                url: 'get-course-analytics',
                method: 'GET',
                credentials: 'include'
            })
        }),
        getOrderAnalytics: builder.query({
            query: () => ({
                url: 'get-order-analytics',
                method: 'GET',
                credentials: 'include'
            })
        }),
        getUserAnalytics: builder.query({
            query: () => ({
                url: 'get-user-analytics',
                method: 'GET',
                credentials: 'include'
            })
        }),
    })
})

export const {useGetCourseAnalyticsQuery,useGetUserAnalyticsQuery,useGetOrderAnalyticsQuery} = analyticsApi