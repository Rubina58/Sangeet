import React from 'react';
import {Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <div className='fixed top-0 left-0 right-0 z-10 '>
    <nav className="bg-[#FAFAFA] shadow-md">
        <div className="container ml-auto mr-1 px-4 py-4 flex items-center justify-between">
            {/* <!-- Logo on the left --> */}
            <div className="flex items-center">
                <Link to="/" className="text-[#2C3E50] font-bold text-lg">YourLogo</Link>
            </div>
            {/* <!-- Menu in the Left Center --> */}
            <div className="flex-grow flex justify-center">
                <ul className="flex space-x-8">
                    <li><Link to="#" className="text-[#2C3E50] hover:text-[#8E44AD] text-2xl">Now Playing</Link></li>
                    <li><Link to="/ExplorePage" className="text-[#2C3E50] hover:text-[#8E44AD] text-2xl">Explore</Link></li>
                </ul>
            </div>

           

            {/* <!-- Middle Right: Search Bar --> */}
            <div className=" flex-grow mx-4 flex justify-center">
                <input type="text" placeholder="Search" className="w-half max-w-md py-3 px-4 rounded-full border border-[#95A5A6] focus:outline-none focus:ring-2 focus:ring-[#8E44AD]"/>
            </div>

            {/* <!-- Right Side: Signup and Login Buttons --> */}
            <div className="flex space-x-4">
                <Link to='/SignupPage' className="bg-[#8E44AD] text-xl text-[#FAFAFA] px-7 py-3 rounded-full hover:bg-[#7D3C98]">Sign Up</Link>
                <Link to='/LoginPage' className="bg-[#8E44AD] text-xl text-[#FAFAFA] px-7 py-3 rounded-full hover:bg-[#7D3C98]">Login</Link>
            </div>
        </div>
    </nav>
    </div>
  )
};

export default Navbar;