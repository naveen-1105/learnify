import { apiSlice } from "../api/apiSlice";

export const courseApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        createCourse: builder.mutation({
            query:(data) => ({
                url: "create-course",
                method: "POST",
                body: data,
                credentials: "include",

            })
        })
    })
})

export const {useCreateCourseMutation} = courseApi;