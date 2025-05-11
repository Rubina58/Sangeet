import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext'; // Import the useUser hook from UserContext

const Navbar = () => {
  const { user, logout } = useUser(); // Destructure user and logout from the context
  const navigate = useNavigate();

  const handleLogout = () => {
    logout(); // Use the logout function from context
    navigate('/LoginPage'); // Redirect to login page after logout
  };

  return (
    <div className="fixed top-0 left-0 right-0 z-10">
      <nav className="bg-[#FAFAFA] shadow-md">
        <div className="container ml-auto mr-1 px-4 py-4 flex items-center justify-between">
          {/* Logo on the left */}
          <div className="flex items-center">
            <Link to="/" className="text-[#2C3E50] font-bold text-lg">Sangeet</Link>
          </div>

          {/* Menu in the Left Center */}
          <div className="flex-grow flex justify-center">
            <ul className="flex space-x-8">
              {/* <li><Link to="#" className="text-[#2C3E50] hover:text-[#8E44AD] text-2xl">Now Playing</Link></li> */}
              <li><Link to="/" className="text-[#2C3E50] hover:text-[#8E44AD] text-2xl">Explore</Link></li>
            </ul>
          </div>

          {/* Middle Right: Search Bar */}
          {/* <div className=" flex-grow mx-4 flex justify-center">
            <input type="text" placeholder="Search" className="w-half max-w-md py-3 px-4 rounded-full border border-[#95A5A6] focus:outline-none focus:ring-2 focus:ring-[#8E44AD]"/>
          </div> */}

          {/* Right Side: Login/Signup or Logout Buttons */}
          <div className="flex space-x-4">
            {user ? ( // Check if the user is logged in
              <>
                <div className="text-[#2C3E50] text-2xl flex items-center">
                  Hello, {user.name}
                </div>

                {/* Admin Panel Link (Only visible to admins) */}
                {user.role === 'admin' && (
                  <Link to="/AdminPage" className="bg-[#8E44AD] text-xl text-[#FAFAFA] px-7 py-3 rounded-full hover:bg-[#7D3C98]">
                    Admin Panel
                  </Link>

                )}

                <button
                  onClick={handleLogout}
                  className="bg-[#8E44AD] text-xl text-[#FAFAFA] px-7 py-3 rounded-full hover:bg-[#7D3C98]"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to='/SignupPage' className="bg-[#8E44AD] text-xl text-[#FAFAFA] px-7 py-3 rounded-full hover:bg-[#7D3C98]">Sign Up</Link>
                <Link to='/LoginPage' className="bg-[#8E44AD] text-xl text-[#FAFAFA] px-7 py-3 rounded-full hover:bg-[#7D3C98]">Login</Link>
              </>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
