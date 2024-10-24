import React from "react";
import { Provider } from "react-redux";
import store from "./app/store";
import { Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Header from "./Components/Header/Header";
import Dashboard from "./Components/Dashboard/Dashboard";
import Admin from "./Components/Dashboard/Admin";
import Login from "./Components/Auth/Login";
import Register from "./Components/Auth/Register";
import RoomDetails from "./Components/Dashboard/RoomDetails";
import BookingDetails from "./Components/Dashboard/BookingDetails";
import RequireAuth from "./Components/Auth/RequireAuth";

const App = () => {
  return (
    <div>
      <Provider store={store}>
        <Header />
        <Routes>
          <Route
            path="/"
            element={
          
                <Dashboard></Dashboard>
        
            }
          >
            <Route
              path="room"
              element={
                <RequireAuth>
                  <RoomDetails></RoomDetails>
                 </RequireAuth>
              }
            ></Route>
            <Route
              path="booking"
              element={
                 <RequireAuth>
                  <BookingDetails></BookingDetails>
               </RequireAuth>
              }
            ></Route>
            <Route
              path="admin"
              element={
               <RequireAuth>
                  <Admin></Admin>
             </RequireAuth>
              }
            ></Route>
        
          </Route>
          <Route path="/login" element={<Login/>}>

          </Route>
          <Route path="/register" element={<Register/>}>

          </Route>
        </Routes>
      </Provider>
      <Toaster />
    </div>
  );
};

export default App;
