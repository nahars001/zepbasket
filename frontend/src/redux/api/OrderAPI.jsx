import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { CartAPI } from "./CartAPI";


export const OrderAPI = createApi({
    reducerPath: "OrderAPI",
    baseQuery: fetchBaseQuery({ baseUrl: "/api/v1/order" }),
    tagTypes: ["order"],
    endpoints: (builder) => ({
        getAllOrder: builder.query({
            query: () => ({
                url: `/getall`
            }),
            providesTags: ["order"]
        }),
        getOrder: builder.query({
            query: (id) => ({
                url: `/get/${id}`
            }),
            providesTags: ["order"]

        }),
        createOrder: builder.mutation({
            query: ({ body }) => ({
                url: "/create",
                method: "POST",
                body
            }),
            invalidatesTags: ["order"],
            async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                try {
                    await queryFulfilled
                    dispatch(CartAPI.util.invalidateTags(['cart']))
                } catch (error) {
                    console.log(error);
                }
            }
        }),
        getAllAdminOrder: builder.query({
            query: () => ({
                url: `/admin/getall`
            }),
            providesTags: ["order"]
        }),
        updateOrder: builder.mutation({
            query: ({ body, id }) => ({
                url: `/update/${id}`,
                body,
                method: "PUT"
            }),
            invalidatesTags : ["order"]
        })
    })
})

export const { useGetAllOrderQuery, useGetOrderQuery, useCreateOrderMutation,useUpdateOrderMutation, useGetAllAdminOrderQuery } = OrderAPI