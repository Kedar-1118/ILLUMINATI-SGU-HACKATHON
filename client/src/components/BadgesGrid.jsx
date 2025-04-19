import React, { useState } from 'react';
import PropTypes from 'prop-types';

// Social Media Icon Components
const LinkedInIcon = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
  </svg>
);

const TwitterIcon = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
  </svg>
);

const FacebookIcon = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
    <path d="M22.675 0H1.325C.593 0 0 .593 0 1.325v21.351C0 23.407.593 24 1.325 24H12.82v-9.294H9.692v-3.622h3.128V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12V24h6.116c.73 0 1.323-.593 1.323-1.325V1.325C24 .593 23.407 0 22.675 0z"/>
  </svg>
);

const BadgesGrid = ({ achievements, badges }) => {
  const [selectedBadge, setSelectedBadge] = useState(null);

  const handleShare = (platform) => {
    if (!selectedBadge) return;
    
    const shareUrl = encodeURIComponent(window.location.href);
    const badgeName = encodeURIComponent(selectedBadge.name);
    const dateEarned = selectedBadge.earned 
      ? encodeURIComponent(new Date(selectedBadge.earnedDate).toLocaleDateString())
      : '';

    const platforms = {
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${shareUrl}&title=${badgeName}&summary=Earned+on+${dateEarned}`,
      twitter: `https://twitter.com/intent/tweet?text=I+earned+the+${badgeName}+badge%21&url=${shareUrl}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`
    };

    window.open(platforms[platform], '_blank');
  };

  return (
    <>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6">
        {achievements.map((badge) => {
          const badgeImage = badges[badge.name];
          const isEarned = badge.earned;
          
          return (
            <div 
              key={badge.name}
              onClick={() => setSelectedBadge(badge)}
              className={`relative bg-gray-800 rounded-xl p-4 border ${
                isEarned 
                  ? 'border-purple-500 hover:border-purple-400' 
                  : 'border-gray-700 opacity-50'
              } transition-all text-center min-h-[200px] flex flex-col cursor-pointer`}
            >
              <div className="flex-1 flex flex-col items-center">
                <img 
                  src={badgeImage}
                  alt={badge.name}
                  className={`w-20 h-20 mb-4 ${!isEarned && 'grayscale'}`}
                />
                <h3 className="font-bold mb-1">{badge.name}</h3>
                
                {isEarned ? (
                  <div className="mt-auto">
                    <p className="text-sm text-purple-400">Earned</p>
                    <p className="text-xs text-gray-400">
                      {new Date(badge.earnedDate).toLocaleDateString()}
                    </p>
                  </div>
                ) : (
                  <div className="mt-auto">
                    <p className="text-sm text-gray-500">Locked</p>
                  </div>
                )}
              </div>

              {!isEarned && (
                <div className="absolute inset-0 bg-gray-900/80 rounded-xl flex items-center justify-center">
                  <p className="text-gray-400 text-sm">
                    Complete 5 more issues to unlock
                  </p>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Popup Modal */}
      {selectedBadge && (
        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedBadge(null)}>
          
          <div className="bg-gray-800 rounded-xl p-8 max-w-2xl w-full relative border border-purple-500"
            onClick={(e) => e.stopPropagation()}>
            
            {/* Close Button */}
            <button 
              className="absolute top-4 right-4 text-gray-400 hover:text-white"
              onClick={() => setSelectedBadge(null)}>
              ✕
            </button>

            <div className="flex flex-col md:flex-row gap-8 items-center">
              {/* Badge Image */}
              <div className="flex-shrink-0">
                <img
                  src={badges[selectedBadge.name]}
                  alt={selectedBadge.name}
                  className="w-48 h-48 rounded-xl animate-popIn"
                />
              </div>

              {/* Badge Details */}
              <div className="flex-1">
                <h2 className="text-2xl font-bold mb-2">{selectedBadge.name}</h2>
                
                {selectedBadge.earned ? (
                  <>
                    <p className="text-purple-400 mb-4">
                      Earned on {new Date(selectedBadge.earnedDate).toLocaleDateString()}
                    </p>
                    
                    {/* Share Buttons */}
                    <div className="flex flex-wrap gap-4 mt-6">
                      <button
                        onClick={() => handleShare('linkedin')}
                        className="px-4 py-2 bg-[#0A66C2] hover:bg-[#004182] text-white rounded-lg flex items-center gap-2">
                        <LinkedInIcon /> Share on LinkedIn
                      </button>
                      <button
                        onClick={() => handleShare('twitter')}
                        className="px-4 py-2 bg-[#1DA1F2] hover:bg-[#1991DB] text-white rounded-lg flex items-center gap-2">
                        <TwitterIcon /> Share on Twitter
                      </button>
                      <button
                        onClick={() => handleShare('facebook')}
                        className="px-4 py-2 bg-[#1877F2] hover:bg-[#166FE5] text-white rounded-lg flex items-center gap-2">
                        <FacebookIcon /> Share on Facebook
                      </button>
                    </div>
                  </>
                ) : (
                  <div className="mt-4">
                    <p className="text-gray-400 text-lg mb-4">
                      Complete 5 more issues to unlock this badge
                    </p>
                    {/* Progress Bar */}
                    <div className="w-full bg-gray-700 rounded-full h-2.5">
                      <div className="bg-purple-500 h-2.5 rounded-full" style={{ width: '30%' }} />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

BadgesGrid.propTypes = {
  achievements: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      earned: PropTypes.bool.isRequired,
      earnedDate: PropTypes.string
    })
  ).isRequired,
  badges: PropTypes.objectOf(PropTypes.string).isRequired
};

export default BadgesGrid;