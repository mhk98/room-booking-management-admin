import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000/api/v1/",
  }),
  tagTypes: ["auth"], 
  endpoints: (build) => ({
    userLogin: build.mutation({
      query: (loginData) => ({
        url: "/user/login",
        method: "POST",
        body: loginData,
      }),
  invalidatesTags: ["auth"], 

    }),
    userRegister: build.mutation({
      query: (registerData) => ({
        url: "/user/register",
        method: "POST",
        body: registerData,
      }),
  invalidatesTags: ["auth"], 

    }),

    userDelete: build.mutation({
      query: (id) => ({
        url: `/user/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["auth"], 
    }),

    userUpdate: build.mutation({
      query: ({ id, data }) => ({
        url: `/user/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["auth"], 
    }),

    getAllUser: build.query({
      query: () => ({
        url: "/user",
      }),
      providesTags: ["auth"],

      refetchOnMountOrArgChange: true,
      pollingInterval: 1000,
    }),

  
  }),
});

export const { useUserLoginMutation, useUserRegisterMutation, useUserDeleteMutation, useUserUpdateMutation, useGetAllUserQuery } = authApi;
