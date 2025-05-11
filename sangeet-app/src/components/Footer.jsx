import React from 'react'

const Footer = () => {
  return (
    <footer className="bg-[#FAFAFA] py-6">
    <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
        {/* Left Section: Logo and Description */}
        <div className="mb-4 md:mb-0">
            <a href="#" className="text-[#2C3E50] font-bold text-lg">Sangeet</a>
            <p className="text-[#95A5A6] mt-2">Bringing you the best music experience.</p>
        </div>

        {/* Middle Section: Quick Links */}
        {/* <div className="mb-4 md:mb-0">
            <ul className="flex space-x-4">
                <li><a href="#" className="text-[#2C3E50] hover:text-[#8E44AD]">About Us</a></li>
                <li><a href="#" className="text-[#2C3E50] hover:text-[#8E44AD]">Contact</a></li>
                <li><a href="#" className="text-[#2C3E50] hover:text-[#8E44AD]">Privacy Policy</a></li>
            </ul>
        </div> */}

        {/* Right Section: Social Media Icons */}
        <div className="flex space-x-4">
            <a href="#" className="text-[#3498DB] hover:text-[#2980B9]">
                {/* Replace with actual icons */}
                <i className="fab fa-facebook-f"></i>
            </a>
            <a href="#" className="text-[#3498DB] hover:text-[#2980B9]">
                <i className="fab fa-twitter"></i>
            </a>
            <a href="#" className="text-[#3498DB] hover:text-[#2980B9]">
                <i className="fab fa-instagram"></i>
            </a>
        </div>
    </div>
</footer>

  )
};

export default Footer;