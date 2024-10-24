 

import React, { useState } from 'react';
import { useUserLoginMutation } from '../../features/auth/auth';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [userLogin, { isLoading, isError, error }] = useUserLoginMutation(); // Access loading and error states
  
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await userLogin(formData).unwrap(); // Unwrap response to handle success or error
      console.log(res.status);
      localStorage.setItem('token', res.data.accessToken)
      localStorage.setItem('userId', res.data.user._id)


      if(res.status==='Success'){
        navigate('/')
      }
    } catch (err) {
      console.error("Login failed", err); // Handle the error properly (e.g., show error messages)
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white shadow-md rounded-lg p-8">
        <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          
          {/* Email Field */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Your email"
              required
            />
          </div>

          {/* Password Field */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Your password"
              required
            />
          </div>

          {/* Error message */}
          {isError && <p className="text-red-500 text-sm">{error?.data?.message || "Failed to login"}</p>}

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className={`w-full py-2 px-4 bg-blue-600 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 ${
                isLoading ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-700"
              }`}
              disabled={isLoading} // Disable button when loading
            >
              {isLoading ? "Logging in..." : "Login"}
            </button>
          </div>
          <p class="mt-2 text-center"><span>Don't have account?</span><span><a class="text-primary" href="/register"> Sign Up</a></span></p>

        </form>
      </div>
    </div>
  );
};

export default Login;