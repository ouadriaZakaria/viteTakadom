import React from 'react';

const Footer = () => {
  return (
    <footer className="relative bg-gradient-to-br from-purple-900 via-indigo-900 to-gray-900 text-white py-16 overflow-hidden">
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>

      {/* Animated background shapes */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute w-64 h-64 bg-purple-700 rounded-full opacity-20 blur-3xl -top-32 -left-32 animate-float"></div>
        <div className="absolute w-64 h-64 bg-indigo-700 rounded-full opacity-20 blur-3xl -bottom-32 -right-32 animate-float-delay"></div>
      </div>

      <div className="container mx-auto px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-6">
            <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent">
              My Awesome Company
            </h2>
            <p className="text-gray-300 leading-relaxed">
              Building the future with innovative solutions. Join us on our journey to make the world a better place.
            </p>
            <div className="flex space-x-6">
              <a
                href="#"
                className="text-gray-300 hover:text-purple-400 transition duration-300 transform hover:scale-110"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                </svg>
              </a>
              <a
                href="#"
                className="text-gray-300 hover:text-pink-500 transition duration-300 transform hover:scale-110"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M22.23 5.924c-.807.358-1.67.6-2.577.709a4.526 4.526 0 001.985-2.495 9.037 9.037 0 01-2.865 1.095 4.513 4.513 0 00-7.69 4.114 12.81 12.81 0 01-9.3-4.715 4.513 4.513 0 001.395 6.022 4.49 4.49 0 01-2.043-.564v.057a4.513 4.513 0 003.62 4.425 4.52 4.52 0 01-2.037.077 4.513 4.513 0 004.216 3.134 9.05 9.05 0 01-5.606 1.93c-.365 0-.726-.021-1.084-.063a12.773 12.773 0 006.92 2.029c8.3 0 12.84-6.876 12.84-12.84 0-.195-.004-.39-.013-.583a9.172 9.172 0 002.252-2.336z" />
                </svg>
              </a>
              <a
                href="#"
                className="text-gray-300 hover:text-indigo-400 transition duration-300 transform hover:scale-110"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <h3 className="text-xl font-semibold bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent">
              Quick Links
            </h3>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-gray-300 hover:text-purple-400 transition duration-300">
                  Home
                </a>
              </li>
              <li>
                <a href="./About" className="text-gray-300 hover:text-pink-500 transition duration-300">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-indigo-400 transition duration-300">
                  Services
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-purple-400 transition duration-300">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-6">
            <h3 className="text-xl font-semibold bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent">
              Contact Us
            </h3>
            <ul className="space-y-3">
              <li className="text-gray-300 hover:text-purple-400 transition duration-300">
                123 Awesome Street, City
              </li>
              <li className="text-gray-300 hover:text-pink-500 transition duration-300">
                Email: info@myawesomecompany.com
              </li>
              <li className="text-gray-300 hover:text-indigo-400 transition duration-300">
                Phone: +1 (123) 456-7890
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-800 mt-12 pt-8 text-center">
          <p className="text-gray-300">
            &copy; {new Date().getFullYear()} My Awesome Company. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;