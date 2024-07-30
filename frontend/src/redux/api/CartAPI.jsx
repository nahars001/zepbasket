import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const CartAPI = createApi({
    reducerPath: "CartAPI",
    baseQuery: fetchBaseQuery({ baseUrl: "/api/v1/cart" }),
    tagTypes: ["cart"],
    endpoints: (builder) => ({
        getCart: builder.query({
            query: () => ({
                url: "/get"
            }),
            providesTags: ["cart"]
        }),
        createCart: builder.mutation({
            query: ({ body }) => ({
                url: `/create`,
                method: "POST",
                body
            }),
            invalidatesTags: ["cart"]
        }),
        updateCart: builder.mutation({
            query: ({ id, body }) => ({
                url: `/update/${id}`,
                method: "PUT",
                body
            }),
            invalidatesTags: ["cart"]
        }),
        delateCart: builder.mutation({
            query: (id) => ({
                url: `/delete/${id}`,
                method: "DELETE",

            }),
            invalidatesTags: ["cart"]
        })
    })
}
)

export const { useGetCartQuery, useUpdateCartMutation, useDelateCartMutation, useCreateCartMutation,useLazyGetCartQuery } = CartAPI