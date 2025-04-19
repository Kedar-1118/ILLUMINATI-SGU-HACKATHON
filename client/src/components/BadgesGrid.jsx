import React from 'react';
import PropTypes from 'prop-types';

const BadgesGrid = ({ achievements, badges }) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6">
      {achievements.map((badge) => {
        const badgeImage = badges[badge.name];
        const isEarned = badge.earned;
        
        return (
          <div 
            key={badge.name}
            className={`relative bg-gray-800 rounded-xl p-4 border ${
              isEarned 
                ? 'border-purple-500 hover:border-purple-400' 
                : 'border-gray-700 opacity-50'
            } transition-all text-center min-h-[200px] flex flex-col`}
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
                  {/* Add progress bar if needed */}
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