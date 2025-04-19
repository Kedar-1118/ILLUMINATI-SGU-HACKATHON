import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import BadgesGrid from '../components/BadgesGrid';

// Badge images configuration
const BADGES = {
  'Golden Contributor': '/public/streaks/30th_Contributrion.svg',
  'Bug Hunter': '/badges/bug-hunter.png',
  'Documentation Hero': '/badges/documentation-hero.png',
  'Community Leader': '/badges/community-leader.png',
  'First PR': '/badges/first-pr.png'
};

const Profile = () => {
  const [activeTab, setActiveTab] = useState('badges');
  
  const user = {
    name: "Alex Chen",
    username: "@uizard_fan",
    avatar: "https://i.pravatar.cc/150?img=5",
    bio: "Design Systems Engineer | Open Source Advocate | Creating tools for better UI development",
    stats: {
      projects: 12,
      contributions: 84,
      followers: "1.2k",
      following: 562
    },
    achievements: [
      { name: 'Golden Contributor', earned: true, earnedDate: '2024-03-15' },
      { name: 'Bug Hunter', earned: true, earnedDate: '2024-02-28' },
      { name: 'Documentation Hero', earned: false },
      { name: 'Community Leader', earned: true, earnedDate: '2024-04-01' },
      { name: 'First PR', earned: true, earnedDate: '2024-01-10' }
    ],
    projects: [
      {
        id: 1,
        title: "Design Token Generator",
        description: "Automated tool for creating consistent design tokens",
        tech: ['React', 'Figma API', 'Tailwind'],
        stars: 428,
        link: "#",
        isFeatured: true
      },
      {
        id: 2,
        title: "AI Component Builder",
        description: "GPT-powered UI component generator",
        tech: ['Next.js', 'OpenAI', 'Radix UI'],
        stars: 892,
        link: "#",
        isFeatured: false
      }
    ],
    activity: [
      { id: 1, project: "UI Wizard", action: "Merged PR #42", time: "2h ago" },
      { id: 2, project: "Design System", action: "Opened issue #15", time: "5h ago" }
    ]
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 flex">
      <Navbar />
      
      {/* Main content with adjusted margin to account for Navbar */}
      <div className="flex-1 ml-12 transition-all duration-300">
        <main className="max-w-7xl mx-auto px-6 py-8 pt-16">
          {/* Profile Header */}
          <div className="flex flex-col md:flex-row gap-8 items-start mb-8">
            <div className="relative group">
              <img 
                src={user.avatar} 
                alt="Profile" 
                className="w-32 h-32 rounded-full border-4 border-gray-800 group-hover:border-purple-500 transition-all shadow-lg"
              />
              <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-purple-600 text-white px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap shadow-md">
                Pro Member
              </div>
            </div>

            <div className="flex-1">
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                  <h1 className="text-3xl font-bold">{user.name}</h1>
                  <p className="text-purple-400 mt-1">{user.username}</p>
                  <p className="text-gray-400 mt-4 max-w-2xl">{user.bio}</p>
                </div>
                
                <div className="flex gap-4">
                  <button className="px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg border border-gray-700 transition-colors">
                    Follow
                  </button>
                  <button className="px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white rounded-lg transition-all">
                    Sponsor
                  </button>
                </div>
              </div>
              
              <div className="flex gap-6 mt-8">
                {Object.entries(user.stats).map(([key, value]) => (
                  <div key={key} className="text-center">
                    <p className="text-2xl font-bold">{value}</p>
                    <p className="text-gray-400 text-sm capitalize">{key}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Content Tabs */}
          <div className="border-b border-gray-800 mb-6">
            <div className="flex space-x-8">
              <button
                onClick={() => setActiveTab('projects')}
                className={`pb-4 px-1 border-b-2 font-medium ${
                  activeTab === 'projects' 
                    ? 'border-purple-500 text-purple-400' 
                    : 'border-transparent text-gray-400 hover:text-gray-300'
                }`}
              >
                Projects
              </button>
              <button
                onClick={() => setActiveTab('activity')}
                className={`pb-4 px-1 border-b-2 font-medium ${
                  activeTab === 'activity' 
                    ? 'border-purple-500 text-purple-400' 
                    : 'border-transparent text-gray-400 hover:text-gray-300'
                }`}
              >
                Activity
              </button>
              <button
                onClick={() => setActiveTab('badges')}
                className={`pb-4 px-1 border-b-2 font-medium ${
                  activeTab === 'badges' 
                    ? 'border-purple-500 text-purple-400' 
                    : 'border-transparent text-gray-400 hover:text-gray-300'
                }`}
              >
                Badges
              </button>
            </div>
          </div>

          {/* Tab Content */}
          {activeTab === 'projects' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {user.projects.map(project => (
                <div 
                  key={project.id} 
                  className="bg-gray-800 rounded-xl p-6 border border-gray-700 hover:border-purple-500 transition-all group hover:shadow-lg hover:shadow-purple-900/10"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-xl font-bold group-hover:text-purple-400 transition-colors">
                        {project.title}
                      </h3>
                      <p className="text-gray-400 text-sm mt-2">{project.description}</p>
                    </div>
                    {project.isFeatured && (
                      <span className="px-2 py-1 bg-purple-900/30 text-purple-400 text-xs rounded-full">
                        Featured
                      </span>
                    )}
                  </div>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tech.map((tech, i) => (
                      <span 
                        key={i} 
                        className="px-2 py-1 bg-gray-700/50 text-purple-400 text-xs rounded-full"
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
                      2 days ago
                    </div>
                    <div className="flex items-center gap-1 text-yellow-400">
                      ⭐ {project.stars}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'badges' && (
            <BadgesGrid 
              achievements={user.achievements}
              badges={BADGES}
            />
          )}

          {activeTab === 'activity' && (
            <div className="space-y-6">
              {user.activity.map(activity => (
                <div 
                  key={activity.id} 
                  className="bg-gray-800 rounded-xl p-5 border border-gray-700 hover:border-purple-500 transition-all"
                >
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0">
                      <div className="w-10 h-10 bg-purple-900/30 rounded-full flex items-center justify-center text-purple-400">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                      </div>
                    </div>
                    <div>
                      <p className="font-medium">
                        <span className="text-purple-400">{activity.action}</span> on {activity.project}
                      </p>
                      <p className="text-gray-400 text-sm mt-1">{activity.time}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Profile;
