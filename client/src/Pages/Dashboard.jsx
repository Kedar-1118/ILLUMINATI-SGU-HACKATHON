import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import ProjectCard from '../components/ProjectCard';
import ChatbotPopup from '../components/ChatbotPopup';
import ContributionChart from '../components/ContributionCharts';

const Dashboard = () => {
  const [selectedTech, setSelectedTech] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isNavbarExpanded, setIsNavbarExpanded] = useState(false);
  const [projects, setProjects] = useState([]);
  const username = 'jogruber';

  const technologies = [
    'React', 'Python', 'Node.js', 'TypeScript',
    'AI/ML', 'Rust', 'Go', 'GraphQL', 'Django', 'Vue'
  ];

  useEffect(() => {
    fetch('http://localhost:5000/api/v1/match/match-repos', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      },
    })
      .then(res => res.json())
      .then(data => {
        console.log(data.message.matchedRepos);
        setProjects(data.message.matchedRepos);
      })
      .catch(err => console.error('Failed to fetch matched repos:', err));
  }, []);

  const toggleTech = (tech) => {
    setSelectedTech(prev =>
      prev.includes(tech)
        ? prev.filter(t => t !== tech)
        : [...prev, tech]
    );
  };

  // const filteredProjects = projects.filter(project => {
  //   const matchesTech = selectedTech.length === 0 ||
  //     project.tech.some(tech => selectedTech.includes(tech));
  //   const matchesSearch = project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
  //     project.description?.toLowerCase().includes(searchQuery.toLowerCase());
  //   return matchesTech && matchesSearch;
  // });

  useEffect(() => {
    const handleClickOutside = () => setIsDropdownOpen(false);
    if (isDropdownOpen) {
      document.addEventListener('click', handleClickOutside);
    }
    return () => document.removeEventListener('click', handleClickOutside);
  }, [isDropdownOpen]);

  return (
    <div className="flex min-h-screen bg-gray-900 text-gray-100">
      {/* Navbar */}
      {/* <Navbar onHoverChange={setIsNavbarExpanded} /> */}

      {/* Main Content */}
      <div
        className={`flex-1 transition-all duration-300 ease-in-out `}
      >
        {/* <Navbar /> */}

        <main className="max-w-7xl mx-auto px-6 py-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold">Open Source Dashboard</h1>
            <p className="text-gray-400 mt-2">Discover projects matching your skills</p>
          </div>


          {/* Search and Filters */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="relative">
              <input
                type="text"
                placeholder="Search projects..."
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:border-purple-500 focus:outline-none transition-all"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <svg className="absolute right-3 top-3.5 w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>

            {/* Tech Filter Dropdown */}
            <div className="flex flex-col">
              <div className="relative flex-1">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsDropdownOpen(!isDropdownOpen);
                  }}
                  className="w-full flex items-center justify-between px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg hover:border-purple-500 transition-all"
                >
                  <span className="text-gray-400">
                    {selectedTech.length > 0 ? selectedTech.join(', ') : 'Filter by Technology'}
                  </span>
                  <svg className={`w-5 h-5 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {isDropdownOpen && (
                  <div
                    className="absolute z-10 w-full mt-1 bg-gray-800 border border-gray-700 rounded-lg shadow-lg max-h-60 overflow-auto"
                    onClick={(e) => e.stopPropagation()}
                  >
                    {technologies.map((tech) => (
                      <div
                        key={tech}
                        onClick={() => toggleTech(tech)}
                        className={`px-4 py-3 cursor-pointer ${selectedTech.includes(tech)
                          ? 'bg-purple-900/30 text-purple-400'
                          : 'text-gray-300 hover:bg-gray-700'
                          }`}
                      >
                        {tech}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="flex flex-wrap gap-2 mt-2 md:hidden">
                {selectedTech.map((tech) => (
                  <span
                    key={tech}
                    className="flex items-center gap-1 px-2.5 py-1.5 bg-purple-900/30 text-purple-400 rounded-full text-xs"
                  >
                    {tech}
                    <button onClick={() => setSelectedTech(selectedTech.filter(t => t !== tech))} className="hover:text-purple-300">
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="hidden md:flex flex-wrap gap-2 mb-6">
            {selectedTech.map((tech) => (
              <span
                key={tech}
                className="flex items-center gap-2 px-3 py-1.5 bg-purple-900/30 text-purple-400 rounded-full text-sm"
              >
                {tech}
                <button onClick={() => setSelectedTech(selectedTech.filter(t => t !== tech))} className="hover:text-purple-300">
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </span>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.length > 0 ? (
              projects.map((project) => (
                <ProjectCard key={project.id} project={project} selectedTech={selectedTech} />
              ))
            ) : (
              <div className="col-span-full text-center py-12">
                <svg className="w-12 h-12 mx-auto text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <h3 className="mt-4 text-lg font-medium text-gray-300">No projects found</h3>
                <p className="mt-2 text-gray-500">
                  {selectedTech.length > 0
                    ? "Try adjusting your technology filters"
                    : "No projects match your search query"}
                </p>
                {selectedTech.length > 0 && (
                  <button onClick={() => setSelectedTech([])} className="mt-4 px-4 py-2 text-sm text-purple-400 hover:text-purple-300 transition-colors">
                    Clear all filters
                  </button>
                )}
              </div>
            )}
          </div>
        </main>

        <ChatbotPopup />
      </div>
    </div>
  );
};

export default Dashboard;
