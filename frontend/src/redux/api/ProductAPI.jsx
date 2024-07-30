import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const ProductAPI = createApi({
  reducerPath: "ProductAPI",
  baseQuery: fetchBaseQuery({ baseUrl: "/api/v1/product" }),
  tagTypes: ["product"],
  endpoints: (builder) => ({
    getProduct: builder.query({
      query: () => ({
        url: "/",
      }),
      providesTags: ["product"]
    }),
    product: builder.query({
      query: (id) => ({
        url: `/get/${id}`,
      }),
      providesTags: ["product"]
    }),
    createProduct: builder.mutation({
      query: ({ body }) => ({
        url: '/create',
        body,
        method: "POST",
        fromData: true
      }),
      invalidatesTags: ["product"]
    }),
    deleteProduct: builder.mutation({
      query: (id) => ({
        url: `/delete/${id}`,
        method: "DELETE"
      }),
      invalidatesTags: ["product"]
    }),
    updateProduct: builder.mutation({
      query: ({ id, body }) => ({
        url: `/update/${id}`,
        body,
        method: "PUT",
      }),
      invalidatesTags: ["product"]
    })
  }),
});

export const { useGetProductQuery, useProductQuery, useCreateProductMutation, useDeleteProductMutation, useUpdateProductMutation } = ProductAPI;
