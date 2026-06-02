"use client";

import { useTheme } from "@/themes/useTheme";
import { useUserDashboard } from "../hooks/useUserDashboard";

export default function FollowingTab() {
  const { theme, themeName } = useTheme();
  const isDarkMode = themeName === 'dark' || themeName === 'midnight' || themeName === 'cyberpunk';
  const { following, loading, userStats, unfollowUser } = useUserDashboard();

  const handleUnfollow = (userId) => {
    if (confirm('Unfollow this user?')) {
      unfollowUser(userId);
    }
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="skeleton h-8 w-64"></div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[1,2,3,4].map(i => <div key={i} className="skeleton h-24 rounded-xl"></div>)}
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6">
        <h1 className={`text-2xl font-bold ${theme?.textColors?.primary || (isDarkMode ? 'text-white' : 'text-gray-900')}`}>
          Following
        </h1>
        <p className={`${theme?.textColors?.secondary || (isDarkMode ? 'text-gray-400' : 'text-gray-600')} mt-1`}>
          Following {userStats?.following || 0} people
        </p>
      </div>

      {following.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {following.map((user) => (
            <div key={user.id} className={`p-4 rounded-xl ${theme?.background?.section || (isDarkMode ? 'bg-gray-800' : 'bg-white')} shadow-lg`}>
              <div className="flex items-center gap-3">
                <div className="text-4xl">{user.avatar || '👤'}</div>
                <div className="flex-1">
                  <h3 className={`font-semibold ${theme?.textColors?.primary || (isDarkMode ? 'text-white' : 'text-gray-900')}`}>
                    {user.name}
                  </h3>
                  {user.bio && (
                    <p className={`text-sm ${theme?.textColors?.secondary || (isDarkMode ? 'text-gray-400' : 'text-gray-600')}`}>
                      {user.bio}
                    </p>
                  )}
                  <p className={`text-xs ${theme?.textColors?.secondary || (isDarkMode ? 'text-gray-400' : 'text-gray-600')} mt-1`}>
                    Following since {new Date(user.followedSince).toLocaleDateString()}
                  </p>
                </div>
                <button 
                  onClick={() => handleUnfollow(user.id)}
                  className="px-3 py-1 text-sm bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
                >
                  Unfollow
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className={`text-center py-12 ${theme?.background?.section || (isDarkMode ? 'bg-gray-800' : 'bg-white')} rounded-xl`}>
          <p className={`text-lg ${theme?.textColors?.secondary || (isDarkMode ? 'text-gray-400' : 'text-gray-600')}`}>
            Not following anyone yet.
          </p>
        </div>
      )}
    </div>
  );
}