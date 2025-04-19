// ProjectCard.jsx
import React, { useState } from 'react';

const ProjectCard = ({ project, selectedTech }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      {/* Main Card */}
      <div
        className="bg-gray-800 rounded-xl border border-gray-700 p-6 cursor-pointer hover:border-purple-500 transition-all duration-300"
        onClick={() => setIsModalOpen(true)}
      >
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-xl font-bold text-white">{project.title}</h3>
          <span className={`px-2 py-1 text-xs rounded-full ${
            project.difficulty === 'Beginner' ? 'bg-green-900/30 text-green-400' :
            project.difficulty === 'Intermediate' ? 'bg-yellow-900/30 text-yellow-400' :
            'bg-red-900/30 text-red-400'
          }`}>
            {project.difficulty}
          </span>
        </div>

        <p className="text-gray-400 text-sm mb-4">{project.description}</p>

        <div className="flex flex-wrap gap-2 mb-4">
          {project.tech.map((tech) => (
            <span
              key={tech}
              className={`px-2 py-1 text-xs rounded-full ${
                selectedTech.includes(tech) ?
                  'bg-purple-900/30 text-purple-400 border border-purple-500' :
                  'bg-gray-700/50 text-gray-300'
              }`}
            >
              {tech}
            </span>
          ))}
        </div>

        <div className="flex items-center justify-between text-sm text-gray-400">
          <div className="flex items-center gap-1">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {project.lastUpdated}
          </div>
          <div className="flex items-center gap-1 text-yellow-400">
            ⭐ {project.stars.toLocaleString()}
          </div>
        </div>
      </div>

      {/* Modal Overlay */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-gray-800 rounded-xl border border-gray-700 p-6 w-11/12 md:w-3/4 lg:w-1/2 shadow-lg">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-2xl font-bold text-white">{project.title}</h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-400 hover:text-gray-200"
              >
                ✕
              </button>
            </div>

            <p className="text-gray-300 text-sm mb-4">{project.description}</p>

            <div className="flex flex-wrap gap-2 mb-4">
              {project.tech.map((tech) => (
                <span
                  key={tech}
                  className="px-2 py-1 text-xs rounded-full bg-gray-700 text-gray-300"
                >
                  {tech}
                </span>
              ))}
            </div>

            <div className="flex items-center justify-between text-sm text-gray-400 mb-4">
              <div className="flex items-center gap-1">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {project.lastUpdated}
              </div>
              <div className="flex items-center gap-1 text-yellow-400">
                ⭐ {project.stars.toLocaleString()}
              </div>
            </div>

            <div className="flex gap-4">
              <a
                href={project.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-2 px-4 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors text-center text-sm"
              >
                Visit Repository
              </a>
              <button
                onClick={() => alert('Analyze logic goes here')}
                className="flex-1 py-2 px-4 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors text-sm"
              >
                View More Info
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProjectCard;
