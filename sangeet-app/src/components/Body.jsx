import React from 'react';
import HomeLeft from './HomeLeft';
import { Link } from 'react-router-dom';

const Body = () => {
  return (
    <>
    {/* // body section */}
    <div className="min-h-screen flex pt-16">
    {/* <!-- Left Section: Sidebar (30% width) --> */}
    <div className="w-1/4 bg-[#FAFAFA] p-4 sticky top-16 h-screen">
    <ul className="space-y-4 m-4">
        <li><Link to="/" className="text-[#2C3E50] hover:text-[#8E44AD] text-2xl">Home</Link></li>
        <li><Link to="/AddNewPage" className="text-[#2C3E50] hover:text-[#8E44AD] text-2xl">Add New</Link></li>
        {/* <li><Link to="/UploadsPage" className="text-[#2C3E50] hover:text-[#8E44AD] text-2xl">Uploads</Link></li> */}
    </ul>
</div>
    {/* <!-- Right Section: Main Content (70% width) --> */}
   <HomeLeft />
        
</div>

</>
  )
};

export default Body;