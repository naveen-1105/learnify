import { apiSlice } from "../api/apiSlice";

export const FAQsAPI = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    uploadFAQ: builder.mutation({
      query: (data) => ({
        url: "upload-faq",
        method: "POST",
        body: data,
        credentials: "include",
      }),
    }),
    getAllFAQs: builder.query({
      query: () => ({
        url: "get-all-faq",
        method: "GET",
        credentials: "include",
      }),
    }),
  }),
});

export const { useUploadFAQMutation,useGetAllFAQsQuery } = FAQsAPI;
