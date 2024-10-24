import { authApi } from "../features/auth/auth";
import { bookingApi } from "../features/bookings/bookings";
import { roomApi } from "../features/rooms/rooms";


const { configureStore } = require("@reduxjs/toolkit");

const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [roomApi.reducerPath]: roomApi.reducer,
    [bookingApi.reducerPath]: bookingApi.reducer,
   
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      authApi.middleware,
      roomApi.middleware,
      bookingApi.middleware,
     
    ),
});

export default store;
