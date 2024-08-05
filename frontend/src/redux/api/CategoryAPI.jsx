import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const CategoryAPI = createApi({
    reducerPath: "CategoryAPI",
    baseQuery: fetchBaseQuery({ baseUrl: "/api/v1/category" }),
    tagTypes: ["category"],
    endpoints: (builder) => ({
        getAllCategory: builder.query({
            query: () => ({
                url: "/",
            }),
            providesTags: ["category"]
        }),
        getCategory: builder.query({
            query: (id) => ({
                url: `/get/${id}`,
            }),
            providesTags: ["category"]
        }),
        createCategory: builder.mutation({
            query: ({ body }) => ({
                url: '/create',
                body,
                method: "POST",
                fromData: true
            }),
            invalidatesTags: ["category"]
        }),
        deleteCategory: builder.mutation({
            query: (id) => ({
                url: `/delete/${id}`,
                method: "DELETE"
            }),
            invalidatesTags: ["category"]
        }),
        updateCategory: builder.mutation({
            query: ({ id, body }) => ({
                url: `/update/${id}`,
                body,
                method: "PUT",
            }),
            invalidatesTags: ["category"]
        }),
        getSubCategory: builder.query({
            query: (id) => ({
                url: `/subcategory/${id}`,
            }),
            providesTags: ["category"]
        }),
    }),
});

export const { useCreateCategoryMutation, useGetAllCategoryQuery, useGetCategoryQuery, useDeleteCategoryMutation, useUpdateCategoryMutation, useLazyGetSubCategoryQuery } = CategoryAPI