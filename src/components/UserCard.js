import React, { useState } from 'react';
import { FaCheckCircle } from 'react-icons/fa';

const UserCard = ({ user }) => {
  const [showPopup, setShowPopup] = useState(false);

  const sortedFollowers = [...user.follower_list]
    .sort((a, b) => new Date(b.date_tracked) - new Date(a.date_tracked))
    .slice(0, 6);

  const displayName = user.name || user.username;

  const defaultProfilePic = 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Default_pfp.svg/150px-Default_pfp.svg.png';

  const getStatusText = (follower) => {
    return (follower.date_tracked === '2024-07-08' || follower.first_time_tracked === 'y') ? 'Added to tracker' : 'Started following';
  };

  const getStatusColor = (follower) => {
    return (follower.date_tracked === '2024-07-08' || follower.first_time_tracked === 'y') ? 'text-blue-500' : 'text-green-500';
  };

  return (
    <div>
      <div className="bg-white shadow-lg rounded-3xl p-6 m-4 w-full md:w-96 transform transition duration-500 hover:scale-102 hover:shadow-2xl">
        <div className="flex flex-col items-center">
          <img 
            src={user.profile_pic_url || defaultProfilePic} 
            alt={user.username} 
            className="w-24 h-24 rounded-full mb-4 shadow-md" 
            onError={(e) => e.target.src = defaultProfilePic}
          />
          <a 
            href={`https://www.instagram.com/${user.username}`} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="no-underline"
          >
            <h3 className="text-2xl font-bold text-gray-800">
              {displayName} {user.is_verified && <FaCheckCircle className="inline text-sm text-blue-500 ml-2" />}
            </h3>
            <p className="text-center text-sm text-gray-500 mb-4">@{user.username}</p>
          </a>
          <div className="bg-blue-50 p-4 rounded-xl mb-4 w-full shadow-sm">
            <p className="text-center text-sm text-gray-500">Notable Followers</p>
            <p className="text-3xl text-center font-bold text-blue-700">{user.notable_followers}</p>
          </div>
          <div className="bg-blue-50 p-4 rounded-xl mb-4 w-full shadow-sm">
            <p className="text-center text-sm text-gray-500">Change In Notable Followers (Month)</p>
            <p className="text-3xl text-center font-bold text-blue-700">{user.notable_follower_growth_month}</p>
          </div>
          <div className="bg-blue-50 p-4 rounded-xl mb-4 w-full shadow-sm">
            <p className="text-center text-sm text-gray-500">Change In Notable Followers (Week)</p>
            <p className="text-3xl text-center font-bold text-blue-700">{user.notable_follower_growth_week}</p>
          </div>
          <div className="bg-blue-50 p-4 rounded-xl mb-4 w-full shadow-sm">
            <p className="text-center text-sm text-gray-500">First Date Tracked</p>
            <p className="text-3xl text-center font-bold text-blue-700">{user.first_date_tracked}</p>
          </div>
          <div className="mt-4 w-full">
            <p className="text-center text-sm text-gray-500">Follower List</p>
            <ul className="mt-2 w-full">
              {sortedFollowers.map((follower, index) => (
                <li 
                  key={index} 
                  className="flex justify-between items-center text-gray-600 text-sm border-b border-gray-200 py-2 transform transition duration-300"
                >
                  <div className="flex flex-col items-start">
                    <span className="font-semibold">{follower.full_name}</span>
                    <span className="text-xs text-gray-500">{follower.job}</span>
                    <span className="text-xs text-gray-400">@{follower.username}</span>
                  </div>
                  <div className="flex flex-col items-start">
                    <span className="text-xs text-gray-400">{follower.date_tracked}</span>
                    <span className={`text-xs ${getStatusColor(follower)}`}>
                      {getStatusText(follower)}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
            {user.follower_list.length > 6 && (
              <button
                onClick={() => setShowPopup(true)}
                className="mt-2 text-blue-600 text-sm font-semibold hover:underline"
              >
                and {user.follower_list.length - 6} more
              </button>
            )}
          </div>
        </div>
      </div>
      {showPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-96 max-h-full overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">All Followers for {displayName}</h2>
              <button 
                onClick={() => setShowPopup(false)} 
                className="text-red-500 hover:text-red-700 text-lg font-bold"
              >
                &times;
              </button>
            </div>
            <ul className="w-full">
              {user.follower_list.map((follower, index) => (
                <li 
                  key={index} 
                  className="flex justify-between items-center text-gray-600 text-sm border-b border-gray-200 py-2 transform transition duration-300"
                >
                  <div className="flex flex-col items-start">
                    <span className="font-semibold">{follower.full_name}</span>
                    <span className="text-xs text-gray-500">{follower.job}</span>
                    <span className="text-xs text-gray-400">@{follower.username}</span>
                  </div>
                  <div className="flex flex-col items-start">
                    <span className="text-xs text-gray-400">{follower.date_tracked}</span>
                    <span className={`text-xs ${getStatusColor(follower)}`}>
                      {getStatusText(follower)}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserCard;
