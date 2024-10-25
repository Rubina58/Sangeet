import React from "react";
import { Link } from "react-router-dom";



const SignupPage = () => {
  return (
    <>
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
           <h2 className="text-4xl text-center text-[#2C3E50] mb-6">Sign up</h2>
            <form className="space-y-4 w-1/5 flex flex-col">
              <input
                type="name" 
                id="username" 
                className="w-full p-3 border border-gray-300 rounded-lg mt-1 focus:outline-none focus:ring-2 focus:ring-[#8E44AD]" 
                placeholder="Userame"
                required />

              <input
                type="email" 
                id="email" 
                className="w-full p-3 border border-gray-300 rounded-lg mt-1 focus:outline-none focus:ring-2 focus:ring-[#8E44AD]" 
                placeholder="Email"
                required 
              />

              <input
                type="number"
                id="number"
                placeholder="Phone Number"
                className="w-full p-3 border border-gray-300 rounded-lg mt-1 focus:outline-none focus:ring-2  focus:ring-[#8E44AD] "
              />

              <input
                type="password"
                id="passowrd"
                placeholder="Password"
                className="w-full p-3 border border-gray-300 rounded-lg mt-1 focus:outline-none focus:ring-2  focus:ring-[#8E44AD] "
              />

              <input
                type="password"
                id="cpassword"
                placeholder="Confirm Password"
                className="w-full p-3 border border-gray-300 rounded-lg mt-1 focus:outline-none focus:ring-2  focus:ring-[#8E44AD] "
              />
              <button type="submit" className="w-full bg-[#8E44AD] text-white py-3 rounded-lg hover:bg-[#7D3C98] transition duration-300">
              Submit
              </button>
             
            </form>
            <hr className="border-gray-400 my-10 w-1/5"/>

            <div className="text-center">
            <p className="text-xl text-gray-600">
            Already have an account? <Link to="/LoginPage" className="text-[#8E44AD] hover:underline">Log in here</Link>
          </p>
        </div>
      </div>
    </>
  )
}

export default SignupPage;