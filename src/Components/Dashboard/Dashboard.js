import { jwtDecode } from "jwt-decode"; // Named import for jwtDecode
import React, { useEffect, useState } from "react";
import { Link, Outlet } from "react-router-dom";

const Dashboard = () => {
  const [decodedToken, setDecodedToken] = useState(null);

  // Safely access role with optional chaining (?.)
  const role = decodedToken?.role;

  useEffect(() => {
    const token = localStorage.getItem('token'); // Fetch token inside useEffect

    if (token) {  // Ensure token exists before decoding
      try {
        const decoded = jwtDecode(token);
        setDecodedToken(decoded);
      } catch (error) {
        console.error('Invalid token:', error);
        setDecodedToken(null);
      }
    } else {
      console.warn('No token found');
    }
  }, []);

  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="flex flex-col items-center justify-center drawer-content">
        {/* Page content here */}

        <Outlet></Outlet>
        <label
          htmlFor="my-drawer-2"
          className="mt-20 mb-16 border border-gray-300 btn btn-white drawer-button lg:hidden"
        >
          Open drawer
        </label>
      </div>
      <div className="mt-8 drawer-side">
        <label
          htmlFor="my-drawer-2"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <ul className="min-h-full p-4 menu w-80 bg-base-200 text-base-content py-20">
          {/* Sidebar content here */}

          {/* Ensure role exists before checking if it's "admin" */}
          <li>
            <Link to="/room">RoomDetails</Link>
          </li>
          <li>
            <Link to="/booking">BookingDetails</Link>
          </li>

          {role === "admin" && (
            <li>
              <Link to="/admin">Admin</Link>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;
