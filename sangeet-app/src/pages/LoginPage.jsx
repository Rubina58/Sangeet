import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import { Link } from 'react-router-dom'; 


const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useUser(); // Get login function from context
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setErrorMessage(""); // Clear any previous error message

    try {
      const response = await fetch("http://localhost/music-app/sangeet-backend/login.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // "Content-Type": "application/x-www-form-urlencoded",
        },
        body: JSON.stringify({ email, password }),
      });

      const contentType = response.headers.get("content-type");
      if (contentType && contentType.includes("application/json")) {
        const data = await response.json();

        if (data.status === "success") {
          alert("Login successful!");

          // Store user info using context
          const userData = {
            id: data.user.id,
            name: data.user.name,
            email: data.user.email,
            role: data.user.role,
          };
          login(userData); // Set user in context
        
          if(userData.role === 'admin'){
            navigate('/AdminPage');
          }
          else{
          navigate('/');
          }
        } else {
          setErrorMessage(data.message || "Invalid login credentials");
        }
      } else {
        setErrorMessage("Invalid server response");
      }
    } catch (error) {
      setErrorMessage("Network error or server unreachable");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl text-center text-[#2C3E50] mb-6">Login</h2>

        {/* Error Message */}
        {errorMessage && (
          <div className="text-red-500 text-center mb-4">{errorMessage}</div>
        )}

        {/* Form */}
        <form className="space-y-4" onSubmit={handleSubmit}>
          {/* Email Input */}
          <div>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setErrorMessage(''); // Clear error message when user types
              }}
              className="w-full p-2 border border-gray-300 rounded-lg mt-1 focus:outline-none focus:ring-2 focus:ring-[#8E44AD]"
              required
              placeholder="Email"
            />
          </div>

          {/* Password Input */}
          <div>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setErrorMessage(''); // Clear error message when user types
              }}
              className="w-full p-2 border border-gray-300 rounded-lg mt-1 focus:outline-none focus:ring-2 focus:ring-[#8E44AD]"
              required
              placeholder="Password"
            />
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className="w-full bg-[#8E44AD] text-white py-2 rounded-lg hover:bg-[#7D3C98] transition duration-300"
              disabled={loading}
            >
              {loading ? 'Logging in...' : 'Submit'}
            </button>
          </div>
        </form>

        {/* Footer Links */}
        <div className="mt-6 text-center">
          <p className="text-m text-gray-600">
            Don't have an account?{' '}
            <Link to="/SignupPage" className="text-[#8E44AD] hover:underline">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
