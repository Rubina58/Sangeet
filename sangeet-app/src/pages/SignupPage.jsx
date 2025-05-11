import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const SignupPage = () => {
  // States to handle form input values
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [cpassword, setCpassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate(); // For redirecting after successful signup

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    if (password !== cpassword) {
      setErrorMessage("Passwords do not match.");
      return;
    }

    setLoading(true);
    setErrorMessage("");

    // Prepare form data
    const data = {
      name: name,
      email: email,
      phone: phone,
      password: password,
    };

    try {
      const response = await fetch("http://localhost/music-app/sangeet-backend/register.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      console.log("Response from server:", result);

      // Handle response based on the status key
      if (result.status === "success") {
        alert("Registration successful!");
        navigate("/LoginPage"); // Redirect to login page after successful registration
      } else {
        setErrorMessage(result.message); // Show the error message from backend
      }
    } catch (error) {
      setErrorMessage("An error occurred. Please try again.");
      console.error("Fetch error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <h2 className="text-4xl text-center text-[#2C3E50] mb-6">Sign up</h2>

      {/* Error message */}
      {errorMessage && (
        <div className="text-red-500 text-center mb-4">{errorMessage}</div>
      )}

      {/* Signup form */}
      <form className="space-y-4 w-1/5 flex flex-col" onSubmit={handleSubmit}>
        <input
          type="text"
          id="name"
          className="w-full p-3 border border-gray-300 rounded-lg mt-1 focus:outline-none focus:ring-2 focus:ring-[#8E44AD]"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <input
          type="email"
          id="email"
          className="w-full p-3 border border-gray-300 rounded-lg mt-1 focus:outline-none focus:ring-2 focus:ring-[#8E44AD]"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="text"
          id="phone"
          className="w-full p-3 border border-gray-300 rounded-lg mt-1 focus:outline-none focus:ring-2 focus:ring-[#8E44AD]"
          placeholder="Phone Number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
        />

        <input
          type="password"
          id="password"
          className="w-full p-3 border border-gray-300 rounded-lg mt-1 focus:outline-none focus:ring-2 focus:ring-[#8E44AD]"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <input
          type="password"
          id="cpassword"
          className="w-full p-3 border border-gray-300 rounded-lg mt-1 focus:outline-none focus:ring-2 focus:ring-[#8E44AD]"
          placeholder="Confirm Password"
          value={cpassword}
          onChange={(e) => setCpassword(e.target.value)}
          required
        />

        <button
          type="submit"
          className="w-full bg-[#8E44AD] text-white py-3 rounded-lg hover:bg-[#7D3C98] transition duration-300"
          disabled={loading}
        >
          {loading ? "Submitting..." : "Submit"}
        </button>
      </form>

      <hr className="border-gray-400 my-10 w-1/5" />

      <div className="text-center">
        <p className="text-xl text-gray-600">
          Already have an account?{" "}
          <Link to="/LoginPage" className="text-[#8E44AD] hover:underline">
            Log in here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignupPage;
