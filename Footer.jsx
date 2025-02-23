import React from 'react';
import { FaTwitter, FaInstagram, FaLinkedin, FaEnvelope, FaMapMarkerAlt, FaPhoneAlt } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="relative bg-gradient-to-br from-green-900 via-emerald-800 to-teal-900 text-white py-16 overflow-hidden">
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>

      {/* Animated background shapes */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute w-64 h-64 bg-green-700 rounded-full opacity-20 blur-3xl -top-32 -left-32 animate-float"></div>
        <div className="absolute w-64 h-64 bg-emerald-700 rounded-full opacity-20 blur-3xl -bottom-32 -right-32 animate-float-delay"></div>
      </div>

      <div className="container mx-auto px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-6">
            <h2 className="text-3xl font-bold bg-gradient-to-r from-green-400 to-emerald-600 bg-clip-text text-transparent">
              École Innovante
            </h2>
            <p className="text-gray-200 leading-relaxed">
              Shaping the future of education through innovative learning approaches and cutting-edge technology.
            </p>
            <div className="flex space-x-6">
              <a
                href="#"
                className="text-gray-300 hover:text-green-400 transition duration-300 transform hover:scale-110"
              >
                <FaTwitter size={24} />
              </a>
              <a
                href="#"
                className="text-gray-300 hover:text-emerald-500 transition duration-300 transform hover:scale-110"
              >
                <FaInstagram size={24} />
              </a>
              <a
                href="#"
                className="text-gray-300 hover:text-teal-400 transition duration-300 transform hover:scale-110"
              >
                <FaLinkedin size={24} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <h3 className="text-xl font-semibold bg-gradient-to-r from-green-400 to-emerald-600 bg-clip-text text-transparent">
              Navigation Rapide
            </h3>
            <ul className="space-y-3">
              <li>
                <a href="/" className="text-gray-200 hover:text-green-400 transition duration-300 flex items-center gap-2">
                  Accueil
                </a>
              </li>
              <li>
                <a href="/about" className="text-gray-200 hover:text-emerald-500 transition duration-300 flex items-center gap-2">
                  À Propos
                </a>
              </li>
              <li>
                <a href="/programs" className="text-gray-200 hover:text-teal-400 transition duration-300 flex items-center gap-2">
                  Programmes
                </a>
              </li>
              <li>
                <a href="/contact" className="text-gray-200 hover:text-green-400 transition duration-300 flex items-center gap-2">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-6">
            <h3 className="text-xl font-semibold bg-gradient-to-r from-green-400 to-emerald-600 bg-clip-text text-transparent">
              Contactez-Nous
            </h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-3 text-gray-200 hover:text-green-400 transition duration-300">
                <FaMapMarkerAlt />
                123 Rue de l'Innovation, Ville
              </li>
              <li className="flex items-center gap-3 text-gray-200 hover:text-emerald-500 transition duration-300">
                <FaEnvelope />
                info@ecoleinnovante.com
              </li>
              <li className="flex items-center gap-3 text-gray-200 hover:text-teal-400 transition duration-300">
                <FaPhoneAlt />
                +213 (0) 123 456 789
              </li>
            </ul>
          </div>

          
        </div>

        {/* Divider */}
        <div className="border-t border-green-800 mt-12 pt-8 text-center">
          <p className="text-gray-300">
            &copy; {new Date().getFullYear()} École Innovante. Tous droits réservés.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;