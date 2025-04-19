// src/components/Sidebar.jsx
import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { FaHome, FaUser,FaTachometerAlt, FaSignOutAlt, FaTimes, FaBars } from 'react-icons/fa';

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const location = useLocation();

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <>
      {/* Mobile Toggle Button */}
      <button 
        onClick={toggleSidebar}
        className="fixed z-60 bottom-4 left-4 md:hidden bg-gray-800 p-3 rounded-full shadow-lg"
      >
        {isCollapsed ? <FaBars className="text-white" /> : <FaTimes className="text-white" />}
      </button>

      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 flex transition-all duration-300 ease-in-out ${isCollapsed ? '-translate-x-full' : 'translate-x-0'}`}>
        {/* Hover Sidebar */}
        <div className="group relative h-full">
          <div className={`bg-gray-900 h-full transition-all duration-300 ease-in-out ${isCollapsed ? 'w-0' : 'w-12 group-hover:w-48'} overflow-hidden`}>
            {/* Logo */}
            <div className="flex items-center justify-center h-16">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-blue-500 rounded-md flex items-center justify-center">
                <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="none">
                  <path d="M12 6V18M8 10L12 6L16 10M8 14L12 18L16 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </div>

            {/* Nav Items */}
            <nav className="mt-4 flex flex-col gap-2 text-sm">
      <SidebarLink 
        to="/" 
        icon={<FaHome />} 
        text="Home" 
        isActive={location.pathname === '/'}
      />
      <SidebarLink 
        to="/profile" 
        icon={<FaUser />} 
        text="Profile" 
        isActive={location.pathname === '/profile'}
      />
      <SidebarLink 
        to="/dashboard" 
        icon={<FaTachometerAlt />} 
        text="Dashboard" 
        isActive={location.pathname === '/dashboard'}
      />
      <SidebarLink 
        to="/logout" 
        icon={<FaSignOutAlt />} 
        text="Logout" 
        isActive={location.pathname === '/logout'}
              />
            </nav>
          </div>
        </div>

        {/* Site name top-right */}
        <div className="fixed top-4 right-8 text-xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
          OSMatch
        </div>
      </div>
    </>
  );
};

const SidebarLink = ({ to, icon, text, isActive }) => (
  <NavLink
    to={to}
    className={`flex items-center px-4 py-3 transition-colors ${
      isActive 
        ? 'bg-gray-800 text-white border-l-4 border-purple-500' 
        : 'text-gray-400 hover:bg-gray-700 hover:text-white'
    }`}
  >
    <span className="text-lg">{icon}</span>
    <span className="ml-3 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300">
      {text}
    </span>
  </NavLink>
);

export default Sidebar;