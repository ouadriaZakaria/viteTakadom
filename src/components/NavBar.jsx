import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-indigo-600">
          E-Learning
        </Link>

        {/* Navigation Links */}
        <div className="flex space-x-6">
          <Link to="/" className="text-gray-700 hover:text-indigo-600">
            Home
          </Link>
          <Link to="/login" className="text-gray-700 hover:text-indigo-600">
            Login
          </Link>
          <Link to="/signup" className="text-gray-700 hover:text-indigo-600">
            Signup
          </Link>
          <Link to="/profile" className="text-gray-700 hover:text-indigo-600">
            Profile
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;