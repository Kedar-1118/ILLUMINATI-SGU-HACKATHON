import React, { useState, useEffect } from 'react';
import ProjectCard from '../components/ProjectCard';
import ChatbotPopup from '../components/ChatbotPopup';

const Dashboard = () => {
  const [selectedTech, setSelectedTech] = useState([]);
  const [selectedLanguages, setSelectedLanguages] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isLanguageDropdownOpen, setIsLanguageDropdownOpen] = useState(false);
  const [projects, setProjects] = useState([]);
  const [technologies, setTechnologies] = useState([]);
  const [languages, setLanguages] = useState([]);
  const [loading, setLoading] = useState(false); // ✅ Added loading state

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const res = await fetch(`${process.env.REACT_APP_API_URL}/match/extract-skills`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
          },
        });
        const data = await res.json();
        setTechnologies(data.message.skills);
        setLanguages(data.message.languages);
      } catch (err) {
        console.error('Failed to fetch skills:', err);
      }
    };

    fetchSkills();
    fetchProjects(); // Fetch all repos on load
  }, []);

  const fetchProjects = async (skills = []) => {
    try {
      setLoading(true); // ✅ Start loading
      const options = {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
        ...(skills.length > 0 && { body: JSON.stringify({ skills }) }),
      };

      const res = await fetch(`${process.env.REACT_APP_API_URL}/match/match-repos`, options);
      const data = await res.json();
      setProjects(data.message.matchedRepos);
    } catch (err) {
      console.error('Failed to fetch matched repos:', err);
    } finally {
      setLoading(false); // ✅ Stop loading
    }
  };

  const handleApplyFilters = () => {
    const skills = [...selectedTech, ...selectedLanguages];
    fetchProjects(skills);
  };

  const toggleTech = (tech) => {
    setSelectedTech((prev) =>
      prev.includes(tech) ? prev.filter((t) => t !== tech) : [...prev, tech]
    );
  };

  const toggleLanguage = (language) => {
    setSelectedLanguages((prev) =>
      prev.includes(language) ? prev.filter((l) => l !== language) : [...prev, language]
    );
  };

  useEffect(() => {
    const handleClickOutside = () => setIsDropdownOpen(false);
    if (isDropdownOpen) {
      document.addEventListener('click', handleClickOutside);
    }
    return () => document.removeEventListener('click', handleClickOutside);
  }, [isDropdownOpen]);

  useEffect(() => {
    const handleClickOutsideLanguage = () => setIsLanguageDropdownOpen(false);
    if (isLanguageDropdownOpen) {
      document.addEventListener('click', handleClickOutsideLanguage);
    }
    return () => document.removeEventListener('click', handleClickOutsideLanguage);
  }, [isLanguageDropdownOpen]);

  return (
    <div className="flex min-h-screen bg-gray-900 text-gray-100">
      <div className="flex-1 transition-all duration-300 ease-in-out">
        <main className="max-w-7xl mx-auto px-6 py-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold">Open Source Dashboard</h1>
            <p className="text-gray-400 mt-2">Discover projects matching your skills</p>
          </div>

          {/* Filters */}
          <div className="mb-6">
            <div className="flex flex-wrap gap-2 mb-4">
              {selectedTech.map((tech, index) => (
                <span
                  key={index}
                  className="px-4 py-2 bg-purple-600 text-white rounded-full text-sm cursor-pointer hover:bg-purple-700"
                  onClick={() => toggleTech(tech)}
                >
                  {tech} <span className="ml-2 text-xs">×</span>
                </span>
              ))}
              {selectedLanguages.map((language, index) => (
                <span
                  key={index}
                  className="px-4 py-2 bg-blue-600 text-white rounded-full text-sm cursor-pointer hover:bg-blue-700"
                  onClick={() => toggleLanguage(language)}
                >
                  {language} <span className="ml-2 text-xs">×</span>
                </span>
              ))}
            </div>

            {/* Technology Dropdown */}
            <div className="flex flex-col mb-4">
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
                  <svg
                    className={`w-5 h-5 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
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
            </div>

            {/* Language Dropdown */}
            <div className="flex flex-col">
              <div className="relative flex-1">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsLanguageDropdownOpen(!isLanguageDropdownOpen);
                  }}
                  className="w-full flex items-center justify-between px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg hover:border-purple-500 transition-all"
                >
                  <span className="text-gray-400">
                    {selectedLanguages.length > 0 ? selectedLanguages.join(', ') : 'Filter by Language'}
                  </span>
                  <svg
                    className={`w-5 h-5 transition-transform ${isLanguageDropdownOpen ? 'rotate-180' : ''}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {isLanguageDropdownOpen && (
                  <div
                    className="absolute z-10 w-full mt-1 bg-gray-800 border border-gray-700 rounded-lg shadow-lg max-h-60 overflow-auto"
                    onClick={(e) => e.stopPropagation()}
                  >
                    {languages.map((language) => (
                      <div
                        key={language}
                        onClick={() => toggleLanguage(language)}
                        className={`px-4 py-3 cursor-pointer ${selectedLanguages.includes(language)
                          ? 'bg-blue-900/30 text-blue-400'
                          : 'text-gray-300 hover:bg-gray-700'
                          }`}
                      >
                        {language}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Apply Filters Button */}
          <div className="mb-8">
            <button
              onClick={handleApplyFilters}
              className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-all"
            >
              Apply Filters
            </button>
          </div>

          {/* Project Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {loading ? (
              <div className="col-span-full text-center py-12">
                <svg className="animate-spin h-10 w-10 text-purple-500 mx-auto" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
                </svg>
                <p className="mt-2 text-purple-400">Loading projects...</p>
              </div>
            ) : projects.length > 0 ? (
              projects.map((project) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  selectedTech={selectedTech}
                  selectedLanguages={selectedLanguages}
                />
              ))
            ) : (
              <div className="col-span-full text-center py-12">
                <svg
                  className="w-12 h-12 mx-auto text-gray-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                    d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <h3 className="mt-4 text-lg font-medium text-gray-300">No projects found</h3>
                <p className="mt-2 text-gray-500">
                  {selectedTech.length > 0 || selectedLanguages.length > 0
                    ? "Try adjusting your filters"
                    : "No projects match your search query"}
                </p>
                {(selectedTech.length > 0 || selectedLanguages.length > 0) && (
                  <button
                    onClick={() => {
                      setSelectedTech([]);
                      setSelectedLanguages([]);
                      fetchProjects();
                    }}
                    className="mt-4 px-4 py-2 text-sm text-purple-400 hover:text-purple-300 transition-colors"
                  >
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
