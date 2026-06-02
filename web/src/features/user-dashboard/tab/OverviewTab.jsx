"use client";

import { useTheme } from "@/themes/useTheme";
import { useUserDashboard } from "../hooks/useUserDashboard";
import { useReadingStats } from "../hooks/useReadingStats";
import StatsCard from "../ui/StatsCard";
import ActivityItem from "../ui/ActivityItem";
import BookCard from "../ui/BookCard";
import BookRecommendations from "../components/BookRecommendations";

export default function OverviewTab() {
  const { theme, themeName } = useTheme();
  const isDarkMode = themeName === 'dark' || themeName === 'midnight' || themeName === 'cyberpunk';
  
  const {
    loading,
    userStats,
    currentlyReading,
    markedRead,
    recentActivities,
    userProfile,
  } = useUserDashboard();

  const { stats, getGoalProgress } = useReadingStats(markedRead);

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="skeleton h-8 w-64"></div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[1,2,3,4].map(i => <div key={i} className="skeleton h-32 rounded-xl"></div>)}
        </div>
      </div>
    );
  }

  const goalProgress = getGoalProgress(50);
  const readingStreak = stats.streaks.current || 0;

  const statsData = [
    { title: "Books Read", value: userStats?.totalBooksRead || 0, icon: "📚", color: "from-blue-500 to-blue-600", trend: "up", trendValue: 12 },
    { title: "Pages Read", value: userStats?.totalPagesRead?.toLocaleString() || 0, icon: "📖", color: "from-green-500 to-green-600", trend: "up", trendValue: 8 },
    { title: "Reading Streak", value: `${readingStreak} days`, icon: "🔥", color: "from-orange-500 to-red-500", trend: readingStreak > 0 ? "up" : "down", trendValue: readingStreak },
    { title: "Reviews Written", value: userStats?.totalReviews || 0, icon: "✍️", color: "from-purple-500 to-purple-600", trend: "up", trendValue: 5 },
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="flex justify-between items-start flex-wrap gap-4">
        <div>
          <h1 className={`text-2xl font-bold ${theme?.textColors?.primary || (isDarkMode ? 'text-white' : 'text-gray-900')}`}>
            Welcome back, {userProfile?.name || 'Reader'}! 👋
          </h1>
          <p className={`${theme?.textColors?.secondary || (isDarkMode ? 'text-gray-400' : 'text-gray-600')} mt-1`}>
            Here's what's happening with your reading journey today.
          </p>
        </div>
        
        {/* Reading Goal Progress */}
        <div className={`p-4 rounded-xl ${theme?.background?.section || (isDarkMode ? 'bg-gray-800' : 'bg-white')} shadow-lg min-w-[200px]`}>
          <p className={`text-sm ${theme?.textColors?.secondary || (isDarkMode ? 'text-gray-400' : 'text-gray-600')}`}>
            Annual Reading Goal
          </p>
          <div className="mt-2">
            <div className="flex justify-between text-sm mb-1">
              <span>{goalProgress.current} / {goalProgress.goal} books</span>
              <span>{Math.round(goalProgress.percentage)}%</span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
              <div 
                className="bg-gradient-to-r from-sky-600 to-sky-500 h-2 rounded-full transition-all"
                style={{ width: `${goalProgress.percentage}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {statsData.map((stat, index) => (
          <StatsCard key={index} {...stat} />
        ))}
      </div>

      {/* Currently Reading & Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Currently Reading Section */}
        <div className={`${theme?.background?.section || (isDarkMode ? 'bg-gray-800' : 'bg-white')} rounded-xl shadow-lg p-6`}>
          <div className="flex justify-between items-center mb-4">
            <h2 className={`text-lg font-semibold ${theme?.textColors?.primary || (isDarkMode ? 'text-white' : 'text-gray-900')}`}>
              📖 Currently Reading
            </h2>
            <button className="text-sm text-sky-600 dark:text-sky-400 hover:underline">
              View All
            </button>
          </div>
          
          {currentlyReading.length > 0 ? (
            <div className="space-y-4">
              {currentlyReading.slice(0, 2).map((book) => (
                <BookCard key={book.id} book={book} type="reading" />
              ))}
            </div>
          ) : (
            <p className={`text-center py-8 ${theme?.textColors?.secondary || (isDarkMode ? 'text-gray-400' : 'text-gray-600')}`}>
              No books currently reading. Add some to your library!
            </p>
          )}
        </div>

        {/* Recent Activity Section */}
        <div className={`${theme?.background?.section || (isDarkMode ? 'bg-gray-800' : 'bg-white')} rounded-xl shadow-lg p-6`}>
          <h2 className={`text-lg font-semibold ${theme?.textColors?.primary || (isDarkMode ? 'text-white' : 'text-gray-900')} mb-4`}>
            🕒 Recent Activity
          </h2>
          
          {recentActivities.length > 0 ? (
            <div className="space-y-2">
              {recentActivities.slice(0, 5).map((activity) => (
                <ActivityItem key={activity.id} activity={activity} />
              ))}
            </div>
          ) : (
            <p className={`text-center py-8 ${theme?.textColors?.secondary || (isDarkMode ? 'text-gray-400' : 'text-gray-600')}`}>
              No recent activities yet.
            </p>
          )}
        </div>
      </div>

      {/* Book Recommendations */}
      <BookRecommendations />
    </div>
  );
}