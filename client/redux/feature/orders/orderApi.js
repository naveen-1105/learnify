import { apiSlice } from "../api/apiSlice";

export const orderApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getAllOrders: builder.query({
            query: () => ({
                url: 'get-all-orders',
                method: "GET",
                credentials: "include",
            })
        }),
        getStripePublishableKey: builder.query ({
            query: () => ({
                url: 'payment/stripepublishablekey',
                method: "GET",
                credentials: "include",
            })
        }),
        createPaymentIntent: builder.mutation ({
            query: (amount) => ({
                url: 'payment',
                method: "POST",
                body: {amount},
                credentials: "include",
            })
        }),
        createOrder: builder.mutation ({
            query: ({courseId,payment_info}) => ({
                url: 'create-order',
                method: "POST",
                body: {courseId, payment_info},
                credentials: "include",
            })
        }),

    })
})

export const {useGetAllOrdersQuery,useGetStripePublishableKeyQuery,useCreatePaymentIntentMutation,useCreateOrderMutation} = orderApi;