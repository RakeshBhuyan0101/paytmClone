import { useState } from "react";
import axios from 'axios'
import toast from "react-hot-toast";
export default function SignUpPage() {
  const [firstName , setFirstName] = useState("")
  const [lastName , setLastName] = useState("")
  const [username , setUsername] = useState("")
  const [password , setPassword] = useState("")

  const handelSubmit = async (e) => {
    e.preventDefault()
    const formData = {
      'firstName' : firstName,
      'lastName' : lastName,
      'username' : username,
      'password' : password
    }
    console.log(formData)

    try {
      const res = await axios.post("http://localhost:3000/api/v1/user/signup" , formData ,  {withCredentials : true} )
      toast.success(res.data.message)
      
    } catch (error) {
      toast.error(error.response.data.message)
    }

  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-8">
        <div className="mb-6">
          <h2 className="text-2xl font-bold mb-2">Sign Up</h2>
          <p className="text-gray-600">Create your account to get started.</p>
        </div>
        <form onSubmit={handelSubmit} >
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="firstName"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  First Name
                </label>
                <input
                  onChange={e => setFirstName(e.target.value)}
                  id="firstName"
                  name="firstName"
                  type="text"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label
                  htmlFor="lastName"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Last Name
                </label>
                <input
                  onChange={e => setLastName(e.target.value)}
                  id="lastName"
                  name="lastName"
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Email
              </label>
              <input
                onChange={ e => setUsername(e.target.value)}
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
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
}
