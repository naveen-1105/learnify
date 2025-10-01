import { apiSlice } from "../api/apiSlice";

export const courseApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createCourse: builder.mutation({
      query: (data) => ({
        url: "create-course",
        method: "POST",
        body: data,
        credentials: "include",
      }),
    }),
    getAllCourses: builder.query({
      query: () => ({
        url: "get-courses",
        method: "GET",
        credentials: "include",
      }),
    }),
    deleteCourse: builder.mutation({
      query: (id) => ({
        url: `delete-course/${id}`,
        method: "DELETE",
        credentials: "include",
      }),
    }),
    editCourse: builder.mutation({
      query: ({id,data}) => ({
        url: `edit-course/${id}`,
        method: "PUT",
        body: data,
        credentials: "include",
      }),
    }),
    getCourseDetails: builder.query({
      query: (id) => ({
        url: `get-course-details/${id}`,
        method: "GET",
        credentials: "include",
      }),
    }),
    addQuestion: builder.mutation({
      query: ({question,courseId,contentId}) => ({
        url: `add-question`,
        method: "PUT",
        body: {question,courseId,contentId},
        credentials: "include",
      }),
    }),
    addAnswer: builder.mutation({
      query: ({answer,courseId,contentId,questionId}) => ({
        url: `add-answer`,
        method: "PUT",
        body: {answer,courseId,contentId,questionId},
        credentials: "include",
      }),
    }),
    addReview: builder.mutation({
      query: ({review,courseId,rating}) => ({
        url: `add-review/${courseId}`,
        method: "PUT",
        body: {review,rating},
        credentials: "include",
      }),
    }),
    addCommentToReview: builder.mutation({
      query: ({comment, courseId, reviewId}) => ({
        url: `add-reply`,
        method: "PUT",
        body: {comment, courseId, reviewId},
        credentials: "include",
      }),
    }),
  }),
});

export const {
  useCreateCourseMutation,
  useGetAllCoursesQuery,
  useDeleteCourseMutation,
  useEditCourseMutation,
  useGetCourseDetailsQuery,
  useAddQuestionMutation,
  useAddAnswerMutation,
  useAddReviewMutation,
  useAddCommentToReviewMutation
} = courseApi;
