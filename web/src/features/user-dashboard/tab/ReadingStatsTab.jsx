"use client";

import { useTheme } from "@/themes/useTheme";
import { useUserDashboard } from "../hooks/useUserDashboard";
import { useReadingStats } from "../hooks/useReadingStats";

export default function ReadingStatsTab() {
  const { theme, themeName } = useTheme();
  const isDarkMode = themeName === 'dark' || themeName === 'midnight' || themeName === 'cyberpunk';
  const { markedRead, userStats } = useUserDashboard();
  const { stats, getGoalProgress } = useReadingStats(markedRead);

  const goalProgress = getGoalProgress(50);

  return (
    <div>
      <div className="mb-6">
        <h1 className={`text-2xl font-bold ${theme?.textColors?.primary || (isDarkMode ? 'text-white' : 'text-gray-900')}`}>
          Reading Statistics
        </h1>
        <p className={`${theme?.textColors?.secondary || (isDarkMode ? 'text-gray-400' : 'text-gray-600')} mt-1`}>
          Your reading habits and progress
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Reading Streak */}
        <div className={`p-6 rounded-xl ${theme?.background?.section || (isDarkMode ? 'bg-gray-800' : 'bg-white')} shadow-lg`}>
          <h2 className={`text-lg font-semibold mb-4 ${theme?.textColors?.primary || (isDarkMode ? 'text-white' : 'text-gray-900')}`}>
            🔥 Reading Streak
          </h2>
          <div className="text-center">
            <p className="text-5xl font-bold text-sky-600">{stats.streaks.current}</p>
            <p className={`mt-2 ${theme?.textColors?.secondary || (isDarkMode ? 'text-gray-400' : 'text-gray-600')}`}>
              Current Streak (days)
            </p>
            <p className={`mt-4 text-sm ${theme?.textColors?.secondary || (isDarkMode ? 'text-gray-400' : 'text-gray-600')}`}>
              Longest Streak: {stats.streaks.longest} days
            </p>
          </div>
        </div>

        {/* Reading Goal */}
        <div className={`p-6 rounded-xl ${theme?.background?.section || (isDarkMode ? 'bg-gray-800' : 'bg-white')} shadow-lg`}>
          <h2 className={`text-lg font-semibold mb-4 ${theme?.textColors?.primary || (isDarkMode ? 'text-white' : 'text-gray-900')}`}>
            🎯 Annual Goal Progress
          </h2>
          <div className="text-center mb-4">
            <p className="text-3xl font-bold">{goalProgress.current} / {goalProgress.goal}</p>
            <p className={`${theme?.textColors?.secondary || (isDarkMode ? 'text-gray-400' : 'text-gray-600')}`}>books read</p>
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
            <div 
              className="bg-gradient-to-r from-sky-600 to-sky-500 h-3 rounded-full transition-all"
              style={{ width: `${goalProgress.percentage}%` }}
            />
          </div>
          <p className={`text-center mt-2 text-sm ${theme?.textColors?.secondary || (isDarkMode ? 'text-gray-400' : 'text-gray-600')}`}>
            {goalProgress.remaining} books left to reach your goal
          </p>
        </div>

        {/* Reading Summary */}
        <div className={`p-6 rounded-xl ${theme?.background?.section || (isDarkMode ? 'bg-gray-800' : 'bg-white')} shadow-lg`}>
          <h2 className={`text-lg font-semibold mb-4 ${theme?.textColors?.primary || (isDarkMode ? 'text-white' : 'text-gray-900')}`}>
            📊 Reading Summary
          </h2>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span>Total Books Read</span>
              <span className="font-semibold">{userStats?.totalBooksRead || 0}</span>
            </div>
            <div className="flex justify-between">
              <span>Total Pages Read</span>
              <span className="font-semibold">{userStats?.totalPagesRead?.toLocaleString() || 0}</span>
            </div>
            <div className="flex justify-between">
              <span>Average Rating</span>
              <span className="font-semibold">{userStats?.averageRating || 0}/5</span>
            </div>
            <div className="flex justify-between">
              <span>Favorite Genre</span>
              <span className="font-semibold">{stats.genres[0]?.name || 'N/A'}</span>
            </div>
            <div className="flex justify-between">
              <span>Favorite Author</span>
              <span className="font-semibold">{stats.authors[0]?.name || userStats?.favoriteAuthor || 'N/A'}</span>
            </div>
          </div>
        </div>

        {/* Top Genres */}
        <div className={`p-6 rounded-xl ${theme?.background?.section || (isDarkMode ? 'bg-gray-800' : 'bg-white')} shadow-lg`}>
          <h2 className={`text-lg font-semibold mb-4 ${theme?.textColors?.primary || (isDarkMode ? 'text-white' : 'text-gray-900')}`}>
            📚 Top Genres
          </h2>
          {stats.genres.length > 0 ? (
            <div className="space-y-3">
              {stats.genres.map((genre) => (
                <div key={genre.name}>
                  <div className="flex justify-between mb-1">
                    <span>{genre.name}</span>
                    <span>{genre.count} books</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div 
                      className="bg-sky-600 h-2 rounded-full"
                      style={{ width: `${(genre.count / stats.totals.booksRead) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className={`text-center ${theme?.textColors?.secondary || (isDarkMode ? 'text-gray-400' : 'text-gray-600')}`}>
              No genre data available
            </p>
          )}
        </div>
      </div>
    </div>
  );
}