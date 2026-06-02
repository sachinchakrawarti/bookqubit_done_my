"use client";

import { useTheme } from "@/themes/useTheme";
import { useUserDashboard } from "../hooks/useUserDashboard";

export default function FollowersTab() {
  const { theme, themeName } = useTheme();
  const isDarkMode = themeName === 'dark' || themeName === 'midnight' || themeName === 'cyberpunk';
  const { followers, loading, userStats } = useUserDashboard();

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
          Followers
        </h1>
        <p className={`${theme?.textColors?.secondary || (isDarkMode ? 'text-gray-400' : 'text-gray-600')} mt-1`}>
          {userStats?.followers || 0} people follow you
        </p>
      </div>

      {followers.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {followers.map((follower) => (
            <div key={follower.id} className={`p-4 rounded-xl ${theme?.background?.section || (isDarkMode ? 'bg-gray-800' : 'bg-white')} shadow-lg`}>
              <div className="flex items-center gap-3">
                <div className="text-4xl">{follower.avatar || '👤'}</div>
                <div className="flex-1">
                  <h3 className={`font-semibold ${theme?.textColors?.primary || (isDarkMode ? 'text-white' : 'text-gray-900')}`}>
                    {follower.name}
                  </h3>
                  {follower.bio && (
                    <p className={`text-sm ${theme?.textColors?.secondary || (isDarkMode ? 'text-gray-400' : 'text-gray-600')}`}>
                      {follower.bio}
                    </p>
                  )}
                  <p className={`text-xs ${theme?.textColors?.secondary || (isDarkMode ? 'text-gray-400' : 'text-gray-600')} mt-1`}>
                    Following since {new Date(follower.followedSince).toLocaleDateString()}
                  </p>
                </div>
                <button className="px-3 py-1 text-sm bg-sky-600 text-white rounded-lg hover:bg-sky-700 transition">
                  Follow Back
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className={`text-center py-12 ${theme?.background?.section || (isDarkMode ? 'bg-gray-800' : 'bg-white')} rounded-xl`}>
          <p className={`text-lg ${theme?.textColors?.secondary || (isDarkMode ? 'text-gray-400' : 'text-gray-600')}`}>
            No followers yet.
          </p>
        </div>
      )}
    </div>
  );
}