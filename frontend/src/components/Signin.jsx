import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";

const Signin = () => {
  const [username , setUsername] = useState("")
  const [password , setPassword] = useState("")
  const navigate = useNavigate()
  const handelSubmit = async (e) => {
    e.preventDefault()
    const formData = {
      'username' : username,
      'password' : password
    }
    console.log(formData)
    try {
      const res = await axios.post("http://localhost:3000/api/v1/user/signin" , formData ,  {withCredentials : true} )
      toast.success(res.data.message)
      navigate('/dashboard')
      
    } catch (error) {
      console.log(error)
      toast.error(error.response.data.message)
    }

  }
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-8">
        <div className="mb-6">
          <h2 className="text-2xl font-bold mb-2">Sign In</h2>
          <p className="text-gray-600">
            Logged in your account to get started.
          </p>
        </div>
        <form onSubmit={handelSubmit}>
          <div className="space-y-4">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Email
              </label>
              <input
                onChange={e => setUsername(e.target.value)}
                id="email"
                name="email"
                type="email"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Password
              </label>
              <input
                onChange={e => setPassword(e.target.value)}
                id="password"
                name="password"
                type="password"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          <button
            type="submit"
            className="w-full mt-6 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signin;
