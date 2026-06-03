"use client";

import { useState, useEffect } from 'react';
import { useTheme } from '@/themes/useTheme';
import { useFont } from '@/contexts/FontContext';
import './bookqubit-data.css';

const BookQubitData = () => {
  const { theme, themeName } = useTheme();
  const { currentFont } = useFont();
  const [loading, setLoading] = useState(true);
  const [selectedYear, setSelectedYear] = useState('2026');
  const [selectedMonth, setSelectedMonth] = useState('march');
  const [trendingBooks, setTrendingBooks] = useState([]);
  const [historicalData, setHistoricalData] = useState({});
  const [viewMode, setViewMode] = useState('trending');

  const isDarkMode = themeName === 'dark' || themeName === 'midnight' || themeName === 'cyberpunk';

  const years = ['2023', '2024', '2025', '2026', '2027', '2028'];
  const months = ['january', 'february', 'march', 'april', 'may', 'june', 'july', 'august', 'september', 'october', 'november', 'december'];

  const historicalDataMap = {
    '2026': {
      march: {
        trending: [
          { id: 1, title: 'The Last Horizon', author: 'Sarah J. Brooks', rank: 1, trend: 'up', growth: 45, cover: '/covers/last-horizon.jpg', genre: 'Sci-Fi', readers: 12450, rating: 4.8, views: 45600, likes: 8234, comments: 2341, shares: 1234 },
          { id: 2, title: 'Whispers of the Ancients', author: 'Michael Chen', rank: 2, trend: 'up', growth: 32, cover: '/covers/whispers-ancients.jpg', genre: 'Fantasy', readers: 9870, rating: 4.7, views: 34200, likes: 6789, comments: 1876, shares: 987 },
          { id: 3, title: 'Digital Dreams', author: 'Emma Watson', rank: 3, trend: 'down', growth: -12, cover: '/covers/digital-dreams.jpg', genre: 'Cyberpunk', readers: 8765, rating: 4.6, views: 29800, likes: 5432, comments: 1456, shares: 765 },
          { id: 4, title: 'The Silent Forest', author: 'David Kim', rank: 4, trend: 'up', growth: 28, cover: '/covers/silent-forest.jpg', genre: 'Mystery', readers: 7654, rating: 4.9, views: 26700, likes: 4987, comments: 1234, shares: 654 },
          { id: 5, title: 'Beyond the Stars', author: 'Lisa Anderson', rank: 5, trend: 'stable', growth: 5, cover: '/covers/beyond-stars.jpg', genre: 'Sci-Fi', readers: 6987, rating: 4.5, views: 23400, likes: 4567, comments: 1098, shares: 543 },
        ],
        topRated: [
          { id: 6, title: "The Philosopher's Stone", author: 'J.K. Rowling', rating: 4.9, reviews: 15234, readers: 45678 },
          { id: 7, title: 'Project Hail Mary', author: 'Andy Weir', rating: 4.8, reviews: 12345, readers: 34567 },
          { id: 8, title: 'The Name of the Wind', author: 'Patrick Rothfuss', rating: 4.8, reviews: 11234, readers: 29876 },
        ],
        mostRead: [
          { id: 9, title: 'Atomic Habits', author: 'James Clear', readers: 67890, timeSpent: '245 hrs', completion: 78 },
          { id: 10, title: 'Dune', author: 'Frank Herbert', readers: 56789, timeSpent: '189 hrs', completion: 65 },
          { id: 11, title: 'The Midnight Library', author: 'Matt Haig', readers: 45678, timeSpent: '156 hrs', completion: 82 },
        ],
        stats: {
          totalBooksRead: 89234,
          totalHoursSpent: 12456,
          totalReviews: 23456,
          averageRating: 4.6,
          mostActiveGenre: 'Fantasy',
          topReader: 'Emma Watson',
        }
      },
      february: {
        trending: [
          { id: 12, title: "Winter's Tale", author: 'Robert Frost', rank: 1, trend: 'up', growth: 56, cover: '/covers/winters-tale.jpg', genre: 'Poetry', readers: 11234, rating: 4.9, views: 38900, likes: 7234, comments: 2145, shares: 1123 },
        ],
        stats: { totalBooksRead: 78456, totalHoursSpent: 10987, totalReviews: 19876, averageRating: 4.5, mostActiveGenre: 'Romance', topReader: 'James Chen' }
      }
    },
    '2027': {
      march: {
        trending: [
          { id: 13, title: 'Neural Nexus', author: 'Dr. Alan Turing', rank: 1, trend: 'up', growth: 67, cover: '/covers/neural-nexus.jpg', genre: 'Sci-Fi', readers: 15678, rating: 4.9, views: 56700, likes: 10234, comments: 3456, shares: 1876 },
          { id: 14, title: 'Fantasy Realms', author: 'George Martin', rank: 2, trend: 'up', growth: 43, cover: '/covers/fantasy-realms.jpg', genre: 'Fantasy', readers: 13456, rating: 4.8, views: 48900, likes: 8765, comments: 2987, shares: 1543 },
        ],
        stats: { totalBooksRead: 102345, totalHoursSpent: 14567, totalReviews: 28976, averageRating: 4.7, mostActiveGenre: 'Sci-Fi', topReader: 'Sarah Johnson' }
      }
    },
    '2028': {
      march: {
        trending: [
          { id: 15, title: 'AI Revolution', author: 'Elon Mask', rank: 1, trend: 'up', growth: 89, cover: '/covers/ai-revolution.jpg', genre: 'Technology', readers: 18976, rating: 4.9, views: 67890, likes: 14567, comments: 4567, shares: 2345 },
          { id: 16, title: 'Virtual Reality', author: 'Mark Zuck', rank: 2, trend: 'up', growth: 56, cover: '/covers/virtual-reality.jpg', genre: 'Tech', readers: 16543, rating: 4.8, views: 58900, likes: 12345, comments: 3890, shares: 1987 },
          { id: 17, title: 'Time Travel Chronicles', author: 'Stephen Hawking', rank: 3, trend: 'up', growth: 34, cover: '/covers/time-travel.jpg', genre: 'Sci-Fi', readers: 14321, rating: 4.9, views: 49800, likes: 10987, comments: 3245, shares: 1654 },
        ],
        stats: { totalBooksRead: 123456, totalHoursSpent: 17890, totalReviews: 34567, averageRating: 4.8, mostActiveGenre: 'Technology', topReader: 'Alex Thompson' }
      }
    }
  };

  useEffect(() => {
    setTimeout(() => {
      const data = historicalDataMap[selectedYear]?.[selectedMonth] || historicalDataMap['2026']['march'];
      setHistoricalData(data);
      setTrendingBooks(data.trending || []);
      setLoading(false);
    }, 500);
  }, [selectedYear, selectedMonth]);

  const formatNumber = (num) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
    return num.toString();
  };

  const getMonthName = (month) => month.charAt(0).toUpperCase() + month.slice(1);

  const StatCard = ({ icon, title, value, subtitle }) => (
    <div className={`stat-card ${theme.background?.card || 'bg-white dark:bg-gray-800'} rounded-xl p-6`}>
      <div className="text-3xl mb-3">{icon}</div>
      <h3 className={`text-sm ${theme.textColors?.secondary || 'text-gray-600 dark:text-gray-400'} mb-1`}>{title}</h3>
      <p className={`text-2xl font-bold ${theme.textColors?.primary || 'text-gray-900 dark:text-white'} mb-2`}>
        {typeof value === 'number' ? formatNumber(value) : value}
      </p>
      {subtitle && <p className={`text-xs ${theme.textColors?.secondary || 'text-gray-500 dark:text-gray-500'}`}>{subtitle}</p>}
    </div>
  );

  if (loading) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${theme.background?.page || 'bg-gray-50 dark:bg-gray-900'}`}>
        <div className="text-center">
          <div className="spinner w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className={theme.textColors?.secondary || 'text-gray-600 dark:text-gray-400'}>Loading historical data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bookqubit-data" style={{ fontFamily: currentFont?.family }}>
      {/* Header */}
      <div className={`bg-gradient-to-r from-blue-600 to-purple-600 px-8 py-12`}>
        <h1 className={`text-3xl font-bold text-white mb-2`}>
          📊 BookQubit Analytics
        </h1>
        <p className={`text-white/80`}>
          Discover historical trends, top books, and reading patterns across different time periods
        </p>
      </div>

      {/* Filters */}
      <div className={`${theme.background?.card || 'bg-white dark:bg-gray-800'} border-b sticky top-0 z-20 p-6`}>
        <div className="flex flex-wrap gap-4 items-center justify-between">
          <div className="flex flex-wrap gap-4">
            <div>
              <label className={`block text-sm mb-2 ${theme.textColors?.secondary || 'text-gray-600 dark:text-gray-400'}`}>📅 Year</label>
              <select
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value)}
                className={`px-4 py-2 rounded-lg border ${theme.background?.input || 'bg-gray-50 dark:bg-gray-900'} ${theme.textColors?.primary || 'text-gray-900 dark:text-white'}`}
              >
                {years.map(year => <option key={year} value={year}>{year}</option>)}
              </select>
            </div>

            <div>
              <label className={`block text-sm mb-2 ${theme.textColors?.secondary || 'text-gray-600 dark:text-gray-400'}`}>🕐 Month</label>
              <select
                value={selectedMonth}
                onChange={(e) => setSelectedMonth(e.target.value)}
                className={`px-4 py-2 rounded-lg border ${theme.background?.input || 'bg-gray-50 dark:bg-gray-900'} ${theme.textColors?.primary || 'text-gray-900 dark:text-white'}`}
              >
                {months.map(month => <option key={month} value={month}>{getMonthName(month)}</option>)}
              </select>
            </div>

            <div>
              <label className={`block text-sm mb-2 ${theme.textColors?.secondary || 'text-gray-600 dark:text-gray-400'}`}>🔍 View</label>
              <div className="flex gap-2">
                <button
                  onClick={() => setViewMode('trending')}
                  className={`px-4 py-2 rounded-lg ${viewMode === 'trending' ? 'bg-blue-500 text-white' : 'bg-gray-100 dark:bg-gray-700'}`}
                >
                  🔥 Trending
                </button>
                <button
                  onClick={() => setViewMode('top-rated')}
                  className={`px-4 py-2 rounded-lg ${viewMode === 'top-rated' ? 'bg-blue-500 text-white' : 'bg-gray-100 dark:bg-gray-700'}`}
                >
                  ⭐ Top Rated
                </button>
                <button
                  onClick={() => setViewMode('most-read')}
                  className={`px-4 py-2 rounded-lg ${viewMode === 'most-read' ? 'bg-blue-500 text-white' : 'bg-gray-100 dark:bg-gray-700'}`}
                >
                  👥 Most Read
                </button>
              </div>
            </div>
          </div>

          <button className={`flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 text-white`}>
            📥 Export Report
          </button>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
          <StatCard icon="📚" title="Total Books Read" value={historicalData.stats?.totalBooksRead || 0} subtitle={`in ${getMonthName(selectedMonth)} ${selectedYear}`} />
          <StatCard icon="⏱️" title="Hours Spent" value={historicalData.stats?.totalHoursSpent || 0} subtitle="Reading time" />
          <StatCard icon="⭐" title="Avg Rating" value={historicalData.stats?.averageRating || 0} subtitle="out of 5" />
          <StatCard icon="💬" title="Total Reviews" value={historicalData.stats?.totalReviews || 0} subtitle="user reviews" />
          <StatCard icon="🏆" title="Top Genre" value={historicalData.stats?.mostActiveGenre || 'N/A'} subtitle="most popular" />
        </div>
      </div>

      {/* Main Content */}
      <div className="p-6 pt-0">
        {/* Trending Books Section */}
        {viewMode === 'trending' && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className={`text-2xl font-bold ${theme.textColors?.primary || 'text-gray-900 dark:text-white'}`}>
                📈 Trending Books - {getMonthName(selectedMonth)} {selectedYear}
              </h2>
              <span className={`text-sm ${theme.textColors?.secondary || 'text-gray-500 dark:text-gray-500'}`}>Based on views, likes, and shares</span>
            </div>

            <div className="space-y-4">
              {trendingBooks.map((book) => (
                <div key={book.id} className={`${theme.background?.card || 'bg-white dark:bg-gray-800'} rounded-xl overflow-hidden shadow-lg`}>
                  <div className="flex flex-col md:flex-row">
                    <div className="bg-gradient-to-br from-orange-500 to-red-500 text-white p-6 flex items-center justify-center md:w-24">
                      <div className="text-center">
                        <div className="text-3xl font-bold">#{book.rank}</div>
                        <div className="text-sm mt-1">
                          {book.trend === 'up' && '↑'} {Math.abs(book.growth)}%
                        </div>
                      </div>
                    </div>

                    <div className="p-6 flex-1">
                      <h3 className={`text-xl font-bold ${theme.textColors?.primary || 'text-gray-900 dark:text-white'} mb-1`}>{book.title}</h3>
                      <p className={`text-sm ${theme.textColors?.secondary || 'text-gray-600 dark:text-gray-400'} mb-3`}>by {book.author}</p>
                      <div className="flex flex-wrap gap-4 text-sm mb-3">
                        <span>📖 {book.genre}</span>
                        <span>⭐ {book.rating}</span>
                        <span>👥 {formatNumber(book.readers)} readers</span>
                      </div>
                      <div className="grid grid-cols-3 gap-4">
                        <div><p className="text-xs text-gray-500">Views</p><p className="font-semibold">{formatNumber(book.views)}</p></div>
                        <div><p className="text-xs text-gray-500">Likes</p><p className="font-semibold">{formatNumber(book.likes)}</p></div>
                        <div><p className="text-xs text-gray-500">Shares</p><p className="font-semibold">{formatNumber(book.shares)}</p></div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Top Rated Books */}
        {viewMode === 'top-rated' && (
          <div>
            <h2 className={`text-2xl font-bold ${theme.textColors?.primary || 'text-gray-900 dark:text-white'} mb-6`}>
              ⭐ Top Rated Books - {getMonthName(selectedMonth)} {selectedYear}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {historicalData.topRated?.map((book) => (
                <div key={book.id} className={`${theme.background?.card || 'bg-white dark:bg-gray-800'} rounded-xl p-6 text-center hover:scale-105 transition-transform shadow-lg`}>
                  <div className="text-amber-500 text-4xl mb-4">⭐</div>
                  <h3 className={`font-bold text-lg ${theme.textColors?.primary || 'text-gray-900 dark:text-white'} mb-1`}>{book.title}</h3>
                  <p className={`text-sm ${theme.textColors?.secondary || 'text-gray-600 dark:text-gray-400'} mb-3`}>{book.author}</p>
                  <div className="mb-3">
                    <span className="text-3xl font-bold text-amber-500">{book.rating}</span>
                    <span className={`${theme.textColors?.secondary || 'text-gray-500'}`}>/5</span>
                  </div>
                  <div>
                    <p className={`text-sm ${theme.textColors?.secondary || 'text-gray-500'}`}>{formatNumber(book.reviews)} reviews</p>
                    <p className={`text-sm ${theme.textColors?.secondary || 'text-gray-500'}`}>{formatNumber(book.readers)} readers</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Most Read Books */}
        {viewMode === 'most-read' && (
          <div>
            <h2 className={`text-2xl font-bold ${theme.textColors?.primary || 'text-gray-900 dark:text-white'} mb-6`}>
              👥 Most Read Books - {getMonthName(selectedMonth)} {selectedYear}
            </h2>
            <div className="space-y-4">
              {historicalData.mostRead?.map((book) => (
                <div key={book.id} className={`${theme.background?.card || 'bg-white dark:bg-gray-800'} rounded-xl p-6 shadow-lg`}>
                  <div className="flex justify-between items-center flex-wrap gap-4">
                    <div className="flex-1">
                      <h3 className={`text-lg font-bold ${theme.textColors?.primary || 'text-gray-900 dark:text-white'} mb-1`}>{book.title}</h3>
                      <p className={`text-sm ${theme.textColors?.secondary || 'text-gray-600 dark:text-gray-400'}`}>{book.author}</p>
                    </div>
                    <div className="grid grid-cols-3 gap-6">
                      <div className="text-center">
                        <p className={`text-2xl font-bold ${theme.textColors?.primary || 'text-gray-900 dark:text-white'}`}>{formatNumber(book.readers)}</p>
                        <p className={`text-xs ${theme.textColors?.secondary || 'text-gray-500'}`}>Readers</p>
                      </div>
                      <div className="text-center">
                        <p className={`text-2xl font-bold ${theme.textColors?.primary || 'text-gray-900 dark:text-white'}`}>{book.timeSpent}</p>
                        <p className={`text-xs ${theme.textColors?.secondary || 'text-gray-500'}`}>Time Spent</p>
                      </div>
                      <div className="text-center">
                        <div className="w-full bg-gray-200 rounded-full h-2 mb-1">
                          <div className="bg-green-500 h-2 rounded-full" style={{ width: `${book.completion}%` }}></div>
                        </div>
                        <p className={`text-xs ${theme.textColors?.secondary || 'text-gray-500'}`}>{book.completion}% completed</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BookQubitData;