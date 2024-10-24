import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Assuming the token is stored in local storage
const token = localStorage.getItem('token');

export const roomApi = createApi({
  reducerPath: "roomApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000/api/v1/",
  }),
  tagTypes: ["room"],
  endpoints: (build) => ({

    createRoom: build.mutation({
      query: (data) => {
        const token = localStorage.getItem('token'); // Or however you manage tokens
        return {
          url: "/room/create",
          method: "POST",
          body: data,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
      },
      invalidatesTags: ["room"],
    }),

    getAllRoom: build.query({
      query: () => ({
        url: "/room",
      }),
      providesTags: ["room"],
      refetchOnMountOrArgChange: true,
      pollingInterval: 1000,
    }),

    getSingleRoom: build.query({
      query: (id) => ({
        url: `/room/${id}`,
      }),
      providesTags: ["room"],
      refetchOnMountOrArgChange: true,
      pollingInterval: 1000,
    }),

    deleteRoom: build.mutation({
      query: (id) => {
        const token = localStorage.getItem('token'); // Or however you manage tokens
        return {
          url: `/room/${id}`,
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`, // Add the token here
          },
        };
      },
      invalidatesTags: ["room"],
    }),
    
    updateRoom: build.mutation({
      query: ({ id, data }) => {
        const token = localStorage.getItem('token'); // Or however you manage tokens
        return {
          url: `/room/${id}`,
          method: "PATCH",
          body: data,
          headers: {
            Authorization: `Bearer ${token}`, // Add the token here
          },
        };
      },
      invalidatesTags: ["room"],
    }),
    
    
  }),
});

export const {
  useGetAllRoomQuery,
  useGetSingleRoomQuery,
  useDeleteRoomMutation,
  useUpdateRoomMutation,
  useCreateRoomMutation
} = roomApi;
