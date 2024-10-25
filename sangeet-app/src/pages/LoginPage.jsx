import React from 'react';
import { Link } from 'react-router-dom';

const LoginPage = () => {
  return (
    <>
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl  text-center text-[#2C3E50] mb-6">Login</h2>
        
        {/* Form */}
        <form className="space-y-4">
          {/* Email Input */}
          <div>
            {/* <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username</label> */}
            <input 
              type="name" 
              id="username" 
              className="w-full p-2 border border-gray-300 rounded-lg mt-1 focus:outline-none focus:ring-2 focus:ring-[#8E44AD]" 
              required 
              placeholder='Username'
            />
          </div>
          
          {/* Password Input */}
          <div>
            {/* <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label> */}
            <input 
              type="password" 
              id="password" 
              className="w-full p-2 border border-gray-300 rounded-lg mt-1 focus:outline-none focus:ring-2 focus:ring-[#8E44AD]" 
              required 
              placeholder='password'
            />
          </div>
          
          {/* Submit Button */}
          <div>
            <button type="submit" className="w-full bg-[#8E44AD] text-white py-2 rounded-lg hover:bg-[#7D3C98] transition duration-300">
              Submit
            </button>
          </div>
        </form>
        
        {/* Footer Links */}
        <div className="mt-6 text-center">
          <p className="text-m text-gray-600">
            Don't have an account? <Link to="/SignupPage" className="text-[#8E44AD] hover:underline">Sign up</Link>
          </p>
        </div>
      </div>
    </div>
    </>
  )
}

export default LoginPage;