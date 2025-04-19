import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import ProjectCard from '../components/ProjectCard';
import ChatbotPopup from '../components/ChatbotPopup'; // Import the new chatbot component

const Dashboard = () => {
  const [selectedTech, setSelectedTech] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const technologies = [
    'React', 'Python', 'Node.js', 'TypeScript', 
    'AI/ML', 'Rust', 'Go', 'GraphQL', 'Django', 'Vue'
  ];

  const projects = [
    {
      id: 1,
      title: "AI Documentation Assistant",
      problemStatement: "Automated documentation generation for better OSS maintainability",
      description: "GPT-4 powered documentation generator for open source projects",
      tech: ['AI/ML', 'Python', 'TypeScript'],
      stars: 1428,
      difficulty: 'Intermediate',
      lastUpdated: '2 days ago',
      repoUrl: "#",
      issues: 12,
      contributors: 28
    },
    {
      id: 2,
      title: "React Component Library",
      problemStatement: "Standardizing UI components across open source projects",
      description: "Accessible UI components with TypeScript support",
      tech: ['React', 'TypeScript'],
      stars: 892,
      difficulty: 'Beginner',
      lastUpdated: '1 week ago',
      repoUrl: "#",
      issues: 5,
      contributors: 15
    },
    {
      id: 3,
      title: "Database Optimization Tool",
      problemStatement: "Improving performance of legacy database systems",
      description: "Performance analyzer for PostgreSQL databases",
      tech: ['Python', 'Go', 'Rust'],
      stars: 567,
      difficulty: 'Advanced',
      lastUpdated: '3 days ago',
      repoUrl: "#",
      issues: 8,
      contributors: 12
    },
    {
      id: 4,
      title: "Real-Time Chat Application",
      problemStatement: "Secure communication for developer communities",
      description: "WebSocket-based chat with E2E encryption",
      tech: ['Node.js', 'React', 'TypeScript'],
      stars: 329,
      difficulty: 'Intermediate',
      lastUpdated: '5 days ago',
      repoUrl: "#",
      issues: 3,
      contributors: 9
    },
    {
      id: 5,
      title: "E-commerce Platform",
      problemStatement: "Open source alternative to proprietary commerce solutions",
      description: "Headless commerce solution with Django backend",
      tech: ['Django', 'Python', 'GraphQL'],
      stars: 784,
      difficulty: 'Advanced',
      lastUpdated: '1 day ago',
      repoUrl: "#",
      issues: 15,
      contributors: 23
    },
    {
      id: 6,
      title: "Data Visualization Toolkit",
      problemStatement: "Making complex data accessible through visualization",
      description: "Interactive charts and dashboards builder",
      tech: ['React', 'TypeScript', 'D3.js'],
      stars: 1203,
      difficulty: 'Intermediate',
      lastUpdated: '4 hours ago',
      repoUrl: "#",
      issues: 7,
      contributors: 18
    },
    {
      id: 7,
      title: "ML Model Deployment",
      problemStatement: "Simplifying production deployment of machine learning models",
      description: "Kubernetes-based deployment pipeline for ML models",
      tech: ['Python', 'AI/ML', 'Go'],
      stars: 458,
      difficulty: 'Advanced',
      lastUpdated: '6 days ago',
      repoUrl: "#",
      issues: 11,
      contributors: 14
    },
    {
      id: 8,
      title: "GraphQL API Boilerplate",
      problemStatement: "Accelerating GraphQL API development",
      description: "Production-ready GraphQL server template",
      tech: ['Node.js', 'GraphQL', 'TypeScript'],
      stars: 932,
      difficulty: 'Intermediate',
      lastUpdated: '2 weeks ago',
      repoUrl: "#",
      issues: 2,
      contributors: 7
    },
    {
      id: 9,
      title: "UI Testing Framework",
      problemStatement: "Ensuring visual consistency across UI updates",
      description: "Visual regression testing for component libraries",
      tech: ['Vue', 'TypeScript', 'Node.js'],
      stars: 672,
      difficulty: 'Intermediate',
      lastUpdated: '3 days ago',
      repoUrl: "#",
      issues: 6,
      contributors: 11
    }
  ];

  // Filter logic
  const toggleTech = (tech) => {
    setSelectedTech(prev =>
      prev.includes(tech) 
        ? prev.filter(t => t !== tech) 
        : [...prev, tech]
    );
  };

  const filteredProjects = projects.filter(project => {
    const matchesTech = selectedTech.length === 0 || 
      project.tech.some(tech => selectedTech.includes(tech));
    const matchesSearch = project.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      project.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTech && matchesSearch;
  });

  useEffect(() => {
    const handleClickOutside = () => setIsDropdownOpen(false);
    if (isDropdownOpen) {
      document.addEventListener('click', handleClickOutside);
    }
    return () => document.removeEventListener('click', handleClickOutside);
  }, [isDropdownOpen]);

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      <Navbar />

      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Open Source Dashboard</h1>
          <p className="text-gray-400 mt-2">
            Discover projects matching your skills
          </p>
        </div>

        {/* Search and Filter Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* Search Input */}
          <div className="relative">
            <input
              type="text"
              placeholder="Search projects..."
              className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:border-purple-500 focus:outline-none transition-all"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <svg 
              className="absolute right-3 top-3.5 w-5 h-5 text-gray-500" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>

          {/* Tech Filter */}
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
                      className={`px-4 py-3 cursor-pointer ${
                        selectedTech.includes(tech) 
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

            {/* Mobile Selected Tags */}
            <div className="flex flex-wrap gap-2 mt-2 md:hidden">
              {selectedTech.map((tech) => (
                <span 
                  key={tech}
                  className="flex items-center gap-1 px-2.5 py-1.5 bg-purple-900/30 text-purple-400 rounded-full text-xs"
                >
                  {tech}
                  <button 
                    onClick={() => setSelectedTech(selectedTech.filter(t => t !== tech))}
                    className="hover:text-purple-300"
                  >
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Desktop Selected Tags */}
        <div className="hidden md:flex flex-wrap gap-2 mb-6">
          {selectedTech.map((tech) => (
            <span 
              key={tech}
              className="flex items-center gap-2 px-3 py-1.5 bg-purple-900/30 text-purple-400 rounded-full text-sm"
            >
              {tech}
              <button 
                onClick={() => setSelectedTech(selectedTech.filter(t => t !== tech))}
                className="hover:text-purple-300"
              >
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </span>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.length > 0 ? (
            filteredProjects.map((project) => (
              <ProjectCard 
                key={project.id}
                project={project}
                selectedTech={selectedTech}
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
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h3 className="mt-4 text-lg font-medium text-gray-300">No projects found</h3>
              <p className="mt-2 text-gray-500">
                {selectedTech.length > 0 
                  ? "Try adjusting your technology filters" 
                  : "No projects match your search query"}
              </p>
              {selectedTech.length > 0 && (
                <button 
                  onClick={() => setSelectedTech([])}
                  className="mt-4 px-4 py-2 text-sm text-purple-400 hover:text-purple-300 transition-colors"
                >
                  Clear all filters
                </button>
              )}
            </div>
          )}
        </div>
      </main>
      
      {/* Add the ChatbotPopup component here */}
      <ChatbotPopup />
    </div>
  );
};

export default Dashboard;
