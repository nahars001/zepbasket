import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export const AdminAPI = createApi({
    reducerPath: "createAPI",
    baseQuery: fetchBaseQuery({ baseUrl: "/api/v1/admin" }),
    endpoints: (bulider) => ({
        adminDashboard: bulider.query({
            query: () => ({
                url: "/dashboard"
            })
        })
    })
})

export const { useAdminDashboardQuery} = AdminAPI;