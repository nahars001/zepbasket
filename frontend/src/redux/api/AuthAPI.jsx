import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { UserAPI } from "./UserAPI";
import { setIsAuthorized, setLoading, setUser } from "../slice/UserSlice";

export const AuthAPI = createApi({
  reducerPath: "AuthAPI",
  baseQuery: fetchBaseQuery({ baseUrl: "/api/v1/auth" }),
  tagTypes: ["user"],
  endpoints: (bulider) => ({
    login: bulider.mutation({
      query: ({ body }) => ({
        url: "/login",
        method: "POST",
        body,
      }),
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          await dispatch(UserAPI.endpoints.getProfile.initiate(null));
        } catch (error) {
          console.log(error);
        }
      },
    }),
    register: bulider.mutation({
      query: ({ body }) => ({
        url: "/register",
        method: "POST",
        body,
      }),
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          await dispatch(UserAPI.endpoints.getProfile.initiate(null));
        } catch (error) {
          console.log(error);
        }
      },
    }),
    logout: bulider.query({
      query: () => ({
        url: "/logout",
      }),
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          dispatch(setIsAuthorized(false));
          dispatch(setUser(null));
          dispatch(setLoading(false));
        } catch (error) {
          console.log(error);
        }
      },
    }),
    forgotPassword: bulider.mutation({
      query: ({ body }) => ({
        url: `/password/forgot`,
        body,
        method: "POST"
      })
    }),
    resetVerifyToken: bulider.query({
      query: (token) => ({
        url: `/password/verify/${token}`
      })
    }),
    resetPassword: bulider.mutation({
      query: (body) => ({
        url: `/password/reset`,
        body,
        method: "POST"
      })
    }),
    deleteUser: bulider.mutation({
      query: (id) => ({
        url: `/delete/${id}`,
        method: "DELETE"
      }),
      invalidatesTags: ["user"]
    })

  }),
});

export const { useLoginMutation, useRegisterMutation, useLazyLogoutQuery, useForgotPasswordMutation, useResetVerifyTokenQuery, useResetPasswordMutation, useDeleteUserMutation } =
  AuthAPI;
