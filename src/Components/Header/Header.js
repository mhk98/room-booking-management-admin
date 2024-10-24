import React, { useEffect, useState } from "react";
import "./Header.css";
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation

const Header = () => {
  const token = localStorage.getItem('token')
  const navigate = useNavigate(); // Hook to navigate programmatically

 

  // Logout handler
  const handleLogout = () => {
    localStorage.removeItem('token'); // Remove token from localStorage
    localStorage.clear()
    navigate('/login'); // Redirect to the login page
  };

  return (
    <div className="navbar bg-base-100">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16" />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
            {/* Dropdown menu items can go here */}
          </ul>
        </div>
        <a className="btn btn-ghost text-xl">Room Booking</a>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          {/* Main menu items can go here */}
        </ul>
      </div>
      <div className="navbar-end">
        {token ? (
          <button onClick={handleLogout} className="btn">LogOut</button> // Use button for logout
        ) : (
          <a href="/login" className="btn">Login</a>
        )}
      </div>
    </div>
  );
};

export default Header;
