import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { setIsAuthorized, setLoading, setUser } from "../slice/UserSlice";

export const UserAPI = createApi({
  reducerPath: "UserAPI",
  baseQuery: fetchBaseQuery({ baseUrl: "/api/v1/auth" }),
  tagTypes: ["user"],
  endpoints: (builder) => ({
    getProfile: builder.query({
      query: () => ({
        url: "/profile",
      }),
      providesTags: ["user"],
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setIsAuthorized(true));
          dispatch(setUser(data.user));
          dispatch(setLoading(false));
        } catch (error) {
          dispatch(setIsAuthorized(false));
          dispatch(setLoading(false));
          console.log(error);
        }
      },
    }),
    updatePassword: builder.mutation({
      query: ({ body }) => ({
        url: "/update/password",
        method: "POST",
        body
      })
    }),
    getAllUsers: builder.query({
      query: () => ({
        url: "/admin/users",
      }),
      providesTags: ["user"],

    }),
  }),
});

export const { useGetProfileQuery, useUpdatePasswordMutation, useLazyGetProfileQuery, useGetAllUsersQuery } = UserAPI;
