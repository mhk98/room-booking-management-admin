import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const bookingApi = createApi({
  reducerPath: "bookingApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://room-booking-management-backend.onrender.com/api/v1/",
  }),
  tagTypes: ["booking"], 
  endpoints: (build) => ({

    createBooking: build.mutation({
      query: ({data, userId, roomId}) => ({
        url: `/booking/create/${userId}/${roomId}`,
        method: "POST",
        body: data,
      }),
  invalidatesTags: ["auth"], 

    }),
    getAllBooking: build.query({
      query: () => ({
        url: "/booking",
      }),
      providesTags: ["booking"],

      refetchOnMountOrArgChange: true,
      pollingInterval: 1000,
    }),

    getSingleBooking: build.query({
      query: (id) => ({
        url: `/booking/${id}`,
      }),
      providesTags: ["booking"],

      refetchOnMountOrArgChange: true,
      pollingInterval: 1000,
    }),

    // deleteBooking: build.mutation({
    //   query: (id) => ({
    //     url: `/booking/${id}`,
    //     method: "DELETE",
    //   }),
    //   invalidatesTags: ["booking"], 
    // }),


    deleteBooking: build.mutation({
      query: (id) => {
        const token = localStorage.getItem('token'); // Or however you manage tokens
        return {
          url: `/booking/${id}`,
          method: "DELETE", // Use DELETE for deletion
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
      },
      invalidatesTags: ["booking"],
    }),
    

    updateBooking: build.mutation({
      query: ({ id, data }) => ({
        url: `/booking/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["booking"], 
    }),

  
  }),
});

export const { useCreateBookingMutation, useGetAllBookingQuery, useGetSingleBookingQuery, useDeleteBookingMutation, useUpdateBookingMutation } = bookingApi;
