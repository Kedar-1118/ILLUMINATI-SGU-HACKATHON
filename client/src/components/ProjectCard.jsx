import React from 'react';

const ProjectCard = ({ project, selectedTech }) => {
  return (
    <div className="relative bg-gray-800 rounded-xl p-6 border border-gray-700 hover:border-purple-500 transition-all group hover:scale-[1.02]">
      <div className="flex flex-col h-full">
        {/* Hover Overlay */}
        <div className="absolute inset-0 rounded-xl bg-gray-900/95 p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-center">
          <div className="mb-4">
            <h3 className="text-lg font-bold mb-2">Problem Statement:</h3>
            <p className="text-gray-300 text-sm">{project.problemStatement}</p>
          </div>
          
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <p className="text-sm text-gray-400">Open Issues</p>
              <p className="text-purple-400">{project.issues}</p>
            </div>
            <div>
              <p className="text-sm text-gray-400">Contributors</p>
              <p className="text-purple-400">{project.contributors}</p>
            </div>
          </div>

          <a
            href={project.repoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-auto w-full py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
          >
            View Repository
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
        </div>

        {/* Regular Content */}
        <div className="opacity-100 group-hover:opacity-0 transition-opacity">
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-xl font-bold group-hover:text-purple-400 transition-colors">
              {project.title}
            </h3>
            <span className={`px-2 py-1 text-xs rounded-full ${
              project.difficulty === 'Beginner' ? 'bg-green-900/30 text-green-400' :
              project.difficulty === 'Intermediate' ? 'bg-yellow-900/30 text-yellow-400' :
              'bg-red-900/30 text-red-400'
            }`}>
              {project.difficulty}
            </span>
          </div>

          <p className="text-gray-400 text-sm mt-2">{project.description}</p>
          
          <div className="flex flex-wrap gap-2 my-4">
            {project.tech.map((tech) => (
              <span 
                key={tech}
                className={`px-2 py-1 text-xs rounded-full ${
                  selectedTech.includes(tech) 
                    ? 'bg-purple-900/30 text-purple-400 border border-purple-500' 
                    : 'bg-gray-700/50 text-gray-300'
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
      </div>
    </div>
  );
};

export default ProjectCard;