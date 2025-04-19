import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-gray-300 py-6 ">
  <div className="container mx-auto px-6 text-sm">
    <div className="flex flex-col md:flex-row justify-between items-center">
      <p>&copy; {new Date().getFullYear()} OpenSource Matchmaker. All rights reserved.</p>
      <div className="mt-2 md:mt-0">
        <span className="block md:inline">Contact: team.opensource@email.com</span>
        <span className="hidden md:inline mx-2">|</span>
        <span className="block md:inline">GitHub: github.com/team-open-source</span>
      </div>
    </div>
  </div>
</footer>

  );
};

export default Footer;
