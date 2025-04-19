// src/components/Sidebar.jsx
import React from 'react';
import { NavLink } from 'react-router-dom';
import { FaHome, FaUser, FaTrophy, FaSignOutAlt } from 'react-icons/fa';

const Sidebar = () => {
  return (
    <div className="fixed inset-y-0 left-0 z-50 flex">
      {/* Hover Sidebar */}
      <div className="group relative h-full">
        <div className="bg-gray-900 h-full transition-all duration-300 ease-in-out w-12 group-hover:w-48 overflow-hidden">
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
            <SidebarLink to="/dashboard" icon={<FaHome />} text="Dashboard" />
            <SidebarLink to="/profile" icon={<FaUser />} text="Profile" />
            <SidebarLink to="/achievements" icon={<FaTrophy />} text="Achievements" />
            <SidebarLink to="/logout" icon={<FaSignOutAlt />} text="Logout" />
          </nav>
        </div>
      </div>

      {/* Site name top-right */}
      <div className="fixed top-4 right-8 text-xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
        OSMatch
      </div>
    </div>
  );
};

const SidebarLink = ({ to, icon, text }) => (
  <NavLink
    to={to}
    className="flex items-center px-4 py-2 text-gray-300 hover:bg-gray-700 hover:text-white transition-colors"
  >
    <span className="text-lg">{icon}</span>
    <span className="ml-3 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300">
      {text}
    </span>
  </NavLink>
);

export default Sidebar;
