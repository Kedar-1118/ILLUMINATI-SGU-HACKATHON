// src/components/Navbar.jsx
import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { FaHome, FaUser, FaTachometerAlt, FaSignOutAlt, FaBars, FaTimes } from 'react-icons/fa';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => setIsOpen(!isOpen);

  // Pages where Navbar should be hidden
  const hiddenPaths = ['/', '/login', '/github-signup'];
  if (hiddenPaths.includes(location.pathname)) {
    return null;
  }

  const navLinks = [
    { to: '/', icon: <FaHome />, text: 'Home' },
    { to: '/profile', icon: <FaUser />, text: 'Profile' },
    { to: '/dashboard', icon: <FaTachometerAlt />, text: 'Dashboard' },
  ];





  return (
    <header className="bg-gray-900 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-2 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* SVG LOGO */}


          {/* Logo / Site Name */}
          <div className="flex-shrink-0 text-4xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
            OpenNest
          </div>

          {/* Desktop Menu */}
          <nav className="hidden md:flex gap-6 items-center">
            {navLinks.map(({ to, icon, text }) => (
              <NavLink
                key={to}
                to={to}
                className={({ isActive }) =>
                  `flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${isActive
                    ? 'bg-gray-800 text-white'
                    : 'text-gray-400 hover:text-white hover:bg-gray-700'
                  }`
                }
              >
                {icon}
                {text}
              </NavLink>
            ))}
          </nav>

          {/* Mobile Toggle Button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="p-2 rounded-md bg-gray-800 hover:bg-gray-700 focus:outline-none"
            >
              {isOpen ? <FaTimes className="h-5 w-5" /> : <FaBars className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <nav className="md:hidden px-4 pb-4 space-y-2">
          {navLinks.map(({ to, icon, text }) => (
            <NavLink
              key={to}
              to={to}
              onClick={() => setIsOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors ${isActive
                  ? 'bg-gray-800 text-white'
                  : 'text-gray-400 hover:text-white hover:bg-gray-700'
                }`
              }
            >
              {icon}
              {text}
            </NavLink>
          ))}
          {/* <button className="flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors text-gray-400 hover:text-white hover:bg-gray-700" onClick={handleLogoutUser}>
            <FaSignOutAlt /> Logout
          </button> */}
        </nav>
      )}

    </header>
  );
};

export default Navbar;
