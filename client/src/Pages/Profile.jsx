import React, { useEffect, useState } from 'react';
import ChatbotPopup from '../components/ChatbotPopup';
import BadgesGrid from '../components/BadgesGrid';
import ContributionChart from '../components/ContributionCharts';

const BADGES = {
  '30th Contribution': '/streaks/30th_Contributrion.svg',
  '15th Contribution': '/streaks/15th Contributrion.svg',
  '5th Contribution': '/streaks/5th Contributrion.svg',
  '1st Contribution': '/streaks/1st Contribution.svg'
};

const Profile = () => {
  const [activeTab, setActiveTab] = useState('badges');
  const [repos, setRepos] = useState([]);
  const [loadingRepos, setLoadingRepos] = useState(false);
  const username = localStorage.getItem('username') || '';
  const githubUsername = localStorage.getItem('username') || '';
  const [userInfo, setUserInfo] = useState(null);

  const fetchUserInfo = async () => {
    setUserInfo(null);
    try {
      const response = await fetch(`https://api.github.com/users/${username}`);
      if (!response.ok) {
        throw new Error('User not found');
      }
      const data = await response.json();
      setUserInfo(data);
    } catch (err) {
      console.error(err);
    }
  };

  const user_achievements = {
    achievements: [
      { name: '1st Contribution', earned: true, earnedDate: '2024-01-10' },
      { name: '5th Contribution', earned: true, earnedDate: '2024-04-01' },
      { name: '15th Contribution', earned: false },
      { name: '30th Contribution', earned: false }
    ],
    activity: [
      { id: 1, project: "UI Wizard", action: "Merged PR #42", time: "2h ago" },
      { id: 2, project: "Design System", action: "Opened issue #15", time: "5h ago" }
    ]
  };

  useEffect(() => {
    fetchUserInfo();

    const fetchRepos = async () => {
      setLoadingRepos(true);
      try {
        const response = await fetch(`https://api.github.com/users/${githubUsername}/repos`);
        const data = await response.json();
        const sorted = data.sort((a, b) => b.stargazers_count - a.stargazers_count);
        setRepos(sorted);
      } catch (error) {
        console.error("Failed to fetch GitHub repos:", error);
      }
      setLoadingRepos(false);
    };

    fetchRepos();
  }, [githubUsername]);

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 flex">
      <div className="flex-1 ml-12 transition-all duration-300">
        <main className="max-w-7xl mx-auto px-6 py-8 pt-16">
          {/* Profile Header */}
          <div className="flex flex-col md:flex-row gap-8 items-start mb-8">
            <div className="relative group">
              <img
                src={userInfo?.avatar_url}
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
                  <h1 className="text-3xl font-bold">{userInfo?.name}</h1>
                  <p className="text-purple-400 mt-1">{userInfo?.login}</p>
                  <p className="text-gray-400 mt-4 max-w-2xl">{userInfo?.bio}</p>
                </div>
                {/* <div className="flex gap-4">
                  <button className="px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg border border-gray-700">
                    Follow
                  </button>
                  <button className="px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg">
                    Sponsor
                  </button>
                </div> */}
              </div>

              {userInfo && (
                <div className="flex gap-6 mt-8">
                  <div className="text-center">
                    <p className="text-2xl font-bold">{userInfo.public_repos}</p>
                    <p className="text-gray-400 text-sm capitalize">Repos</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold">{userInfo.followers}</p>
                    <p className="text-gray-400 text-sm capitalize">Followers</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold">{userInfo.following}</p>
                    <p className="text-gray-400 text-sm capitalize">Following</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold">{userInfo.public_gists}</p>
                    <p className="text-gray-400 text-sm capitalize">Gists</p>
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="mb-8">
            <ContributionChart username={username} />
          </div>

          {/* Tabs */}
          <div className="border-b border-gray-800 mb-6">
            <div className="flex space-x-8">
              {['projects', 'activity', 'badges'].map(tab => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`pb-4 px-1 border-b-2 font-medium ${activeTab === tab
                    ? 'border-purple-500 text-purple-400'
                    : 'border-transparent text-gray-400 hover:text-gray-300'
                    }`}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {/* Tab Content */}
          {activeTab === 'projects' && (
            loadingRepos ? (
              <p className="text-gray-400">Loading repositories...</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {repos.map((repo) => (
                  <div
                    key={repo.id}
                    className="bg-gray-800 rounded-xl p-6 border border-gray-700 hover:border-purple-500 transition-all"
                  >
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-xl font-bold text-purple-300">{repo.name}</h3>
                        <p className="text-gray-400 text-sm mt-2">{repo.description}</p>
                      </div>
                      {repo.fork && (
                        <span className="px-2 py-1 bg-purple-900/30 text-purple-400 text-xs rounded-full">
                          Forked
                        </span>
                      )}
                    </div>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {repo.language && (
                        <span className="px-2 py-1 bg-gray-700/50 text-purple-400 text-xs rounded-full">
                          {repo.language}
                        </span>
                      )}
                    </div>

                    <div className="flex items-center justify-between text-sm text-gray-400">
                      <a href={repo.html_url} target="_blank" rel="noopener noreferrer" className="no-underline hover:text-purple-300">
                        View on GitHub
                      </a>
                      <span className="text-yellow-400">⭐ {repo.stargazers_count}</span>
                    </div>
                  </div>
                ))}
              </div>
            )
          )}

          {activeTab === 'badges' && (
            <BadgesGrid achievements={user_achievements.achievements} badges={BADGES} />
          )}

          {activeTab === 'activity' && (
            <div className="space-y-6">
              {user_achievements.activity.map(activity => (
                <div
                  key={activity.id}
                  className="bg-gray-800 rounded-xl p-5 border border-gray-700 hover:border-purple-500"
                >
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-10 h-10 bg-purple-900/30 rounded-full flex items-center justify-center text-purple-400">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5" />
                      </svg>
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
        <ChatbotPopup />
      </div>
    </div>
  );
};

export default Profile;
