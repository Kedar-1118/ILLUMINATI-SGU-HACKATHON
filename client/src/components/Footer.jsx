// components/Footer.jsx
import { FaGithub, FaTwitter, FaLinkedin, FaSignOutAlt } from "react-icons/fa";

const handleLogoutUser = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("username");
  window.location.href = "/";
};

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-10 border-t border-gray-800 relative">
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">

        {/* Left Section */}
        <div className="text-center md:text-left">
          <h2 className="text-xl font-bold text-purple-400">OpenNest</h2>
          <p className="text-sm text-gray-400">
            Empowering Open Source Collaboration.
          </p>
        </div>

        {/* Social Icons */}
        <div className="flex space-x-5">
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-purple-400 transition"
          >
            <FaGithub size={20} />
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-purple-400 transition"
          >
            <FaTwitter size={20} />
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-purple-400 transition"
          >
            <FaLinkedin size={20} />
          </a>
        </div>

        {/* Logout Button */}
        <button
          onClick={handleLogoutUser}
          className="flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition bg-red-600 text-gray-100 hover:text-white hover:bg-red-800"
        >
          <FaSignOutAlt /> Logout
        </button>
      </div>

      {/* Bottom Text */}
      <div className="mt-6 text-center text-xs text-gray-500">
        © {new Date().getFullYear()} OpenNest. All rights reserved.
      </div>
    </footer>
  );
}
