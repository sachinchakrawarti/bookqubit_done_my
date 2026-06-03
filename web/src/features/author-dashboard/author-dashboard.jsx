"use client";

import { useState, useEffect } from 'react';
import {
  FaBook,
  FaUsers,
  FaStar,
  FaChartLine,
  FaEye,
  FaHeart,
  FaComment,
  FaShare,
  FaPlus,
  FaEdit,
  FaTrash,
  FaDownload,
  FaCalendarAlt,
  FaTags,
  FaMoneyBillWave,
  FaTrophy,
  FaTrendingUp,
  FaUserPlus,
  FaClock,
} from 'react-icons/fa';
import { useTheme } from '@/themes/useTheme';
import { useFont } from '@/contexts/FontContext';
import './author-dashboard.css';

const AuthorDashboard = () => {
  const { theme, themeName } = useTheme();
  const { currentFont } = useFont();
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');
  const [books, setBooks] = useState([]);
  const [stats, setStats] = useState({});

  // Check if dark mode
  const isDarkMode = themeName === 'dark' || themeName === 'midnight' || themeName === 'cyberpunk';

  // Mock author data
  const authorData = {
    name: 'Sarah J. Brooks',
    username: '@sarahjbrooks',
    avatar: '/avatars/author.jpg',
    bio: 'Bestselling fantasy author. Writing stories that transport readers to magical worlds.',
    joinedDate: 'January 2024',
    totalBooks: 4,
    totalReaders: 15234,
    totalReviews: 2891,
    averageRating: 4.7,
    totalEarnings: 12450,
  };

  const mockBooks = [
    {
      id: 1,
      title: 'The Crystal Kingdom',
      cover: '/covers/crystal-kingdom.jpg',
      genre: 'Fantasy',
      publishedDate: '2024-01-15',
      readers: 5234,
      rating: 4.8,
      reviews: 1234,
      earnings: 8450,
      status: 'published',
    },
    {
      id: 2,
      title: 'Shadows of the Past',
      cover: '/covers/shadows-past.jpg',
      genre: 'Mystery',
      publishedDate: '2024-03-20',
      readers: 3456,
      rating: 4.6,
      reviews: 876,
      earnings: 4200,
      status: 'published',
    },
    {
      id: 3,
      title: 'Dawn of Magic',
      cover: '/covers/dawn-magic.jpg',
      genre: 'Fantasy',
      publishedDate: '2024-06-10',
      readers: 1234,
      rating: 4.9,
      reviews: 234,
      earnings: 0,
      status: 'draft',
    },
    {
      id: 4,
      title: 'Whispers in the Wind',
      cover: '/covers/whispers-wind.jpg',
      genre: 'Romance',
      publishedDate: '2024-08-05',
      readers: 789,
      rating: 4.5,
      reviews: 98,
      earnings: 0,
      status: 'draft',
    },
  ];

  const recentActivities = [
    { id: 1, action: 'New review on "The Crystal Kingdom"', user: 'Emma Watson', rating: 5, time: '2 hours ago', type: 'review' },
    { id: 2, action: 'Book added to shelf', user: 'James Chen', book: 'Shadows of the Past', time: '5 hours ago', type: 'shelf' },
    { id: 3, action: 'New follower', user: 'Sarah Johnson', time: '1 day ago', type: 'follow' },
    { id: 4, action: 'Royalty payment received', amount: '$1,250', time: '2 days ago', type: 'payment' },
  ];

  useEffect(() => {
    setTimeout(() => {
      setBooks(mockBooks);
      setStats(authorData);
      setLoading(false);
    }, 1000);
  }, []);

  const formatNumber = (num) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
    return num.toString();
  };

  const StatCard = ({ icon, title, value, trend, color }) => (
    <div className={`stat-card ${theme.background?.card || 'bg-white dark:bg-gray-800'} ${theme.shadow?.container || 'shadow-lg'} rounded-xl p-6`}>
      <div className="flex items-center justify-between mb-4">
        <div className={`stat-icon ${color} p-3 rounded-lg`}>
          {icon}
        </div>
        {trend && (
          <span className={`trend-badge ${trend > 0 ? 'positive' : 'negative'} ${theme.textColors?.secondary || 'text-gray-600 dark:text-gray-400'}`}>
            {trend > 0 ? '+' : ''}{trend}%
          </span>
        )}
      </div>
      <h3 className={`stat-title ${theme.textColors?.secondary || 'text-gray-600 dark:text-gray-400'} text-sm mb-1`}>{title}</h3>
      <p className={`stat-value ${theme.textColors?.primary || 'text-gray-900 dark:text-white'} text-2xl font-bold mb-2`}>
        {typeof value === 'number' && title.includes('$') ? `$${formatNumber(value)}` : formatNumber(value)}
      </p>
      <p className={`stat-subtitle ${theme.textColors?.secondary || 'text-gray-500 dark:text-gray-500'} text-xs`}>
        {title === 'Readers' ? 'Total unique readers' : title === 'Earnings' ? 'This month' : 'Last 30 days'}
      </p>
    </div>
  );

  if (loading) {
    return (
      <div className={`author-dashboard-loading ${theme.background?.page || 'bg-gray-50 dark:bg-gray-900'}`}>
        <div className={`spinner ${theme.buttonColors?.primaryButton?.background || 'bg-gradient-to-r from-sky-600 to-sky-500'}`}></div>
        <p className={theme.textColors?.secondary || 'text-gray-600 dark:text-gray-400'}>Loading dashboard...</p>
      </div>
    );
  }

  return (
    <div className="author-dashboard" style={{ fontFamily: currentFont?.family }}>
      {/* Hero Section */}
      <div className={`dashboard-hero ${theme.background?.section || 'bg-gradient-to-r from-purple-600 to-pink-600'} relative overflow-hidden`}>
        <div className="hero-content relative z-10 px-8 py-12">
          <div className="flex items-center gap-6 flex-wrap">
            <img src={authorData.avatar} alt={authorData.name} className="hero-avatar w-24 h-24 rounded-full border-4 border-white shadow-lg" />
            <div className="hero-info">
              <h1 className={`hero-name text-3xl font-bold text-white mb-2`}>{authorData.name}</h1>
              <p className={`hero-username text-white/80 mb-2`}>{authorData.username}</p>
              <p className={`hero-bio text-white/90 max-w-xl`}>{authorData.bio}</p>
              <div className="hero-meta flex gap-4 mt-3 text-white/70 text-sm">
                <span><FaCalendarAlt className="inline mr-1" /> Joined {authorData.joinedDate}</span>
                <span><FaBook className="inline mr-1" /> {authorData.totalBooks} Books</span>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute inset-0 bg-black/20"></div>
      </div>

      {/* Navigation Tabs */}
      <div className={`dashboard-tabs ${theme.background?.card || 'bg-white dark:bg-gray-800'} border-b ${theme.border?.default || 'border-gray-200 dark:border-gray-700'} sticky top-0 z-20`}>
        <div className="tabs-container px-8 flex gap-6 overflow-x-auto">
          {['overview', 'books', 'analytics', 'earnings', 'reviews'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`tab-btn py-4 px-2 font-medium transition-all relative ${
                activeTab === tab
                  ? `${theme.textColors?.highlight || 'text-purple-600 dark:text-purple-400'}`
                  : `${theme.textColors?.secondary || 'text-gray-600 dark:text-gray-400'}`
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
              {activeTab === tab && (
                <div className={`absolute bottom-0 left-0 right-0 h-0.5 ${theme.buttonColors?.primaryButton?.background || 'bg-gradient-to-r from-purple-600 to-pink-600'}`}></div>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="dashboard-content p-8">
        {activeTab === 'overview' && (
          <>
            {/* Stats Grid */}
            <div className="stats-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <StatCard icon={<FaBook size={24} />} title="Total Books" value={stats.totalBooks} trend={12} color="bg-blue-500" />
              <StatCard icon={<FaUsers size={24} />} title="Total Readers" value={stats.totalReaders} trend={8} color="bg-green-500" />
              <StatCard icon={<FaStar size={24} />} title="Avg Rating" value={stats.averageRating} trend={5} color="bg-amber-500" />
              <StatCard icon={<FaMoneyBillWave size={24} />} title="Total Earnings" value={stats.totalEarnings} trend={15} color="bg-emerald-500" />
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
              {/* Readers Growth */}
              <div className={`chart-card ${theme.background?.card || 'bg-white dark:bg-gray-800'} ${theme.shadow?.container || 'shadow-lg'} rounded-xl p-6`}>
                <div className="flex items-center justify-between mb-6">
                  <h3 className={`text-lg font-semibold ${theme.textColors?.primary || 'text-gray-900 dark:text-white'}`}>
                    <FaChartLine className="inline mr-2" /> Readers Growth
                  </h3>
                  <button className={`text-sm ${theme.textColors?.highlight || 'text-purple-600 dark:text-purple-400'}`}>View Details →</button>
                </div>
                <div className="chart-placeholder h-64 flex items-center justify-center border-2 border-dashed rounded-lg">
                  <p className={theme.textColors?.secondary || 'text-gray-500 dark:text-gray-500'}>Chart: Monthly readers growth</p>
                </div>
              </div>

              {/* Top Performing Books */}
              <div className={`chart-card ${theme.background?.card || 'bg-white dark:bg-gray-800'} ${theme.shadow?.container || 'shadow-lg'} rounded-xl p-6`}>
                <h3 className={`text-lg font-semibold ${theme.textColors?.primary || 'text-gray-900 dark:text-white'} mb-6`}>
                  <FaTrophy className="inline mr-2" /> Top Performing Books
                </h3>
                <div className="space-y-4">
                  {books.filter(b => b.status === 'published').map((book, idx) => (
                    <div key={book.id} className="flex items-center gap-4">
                      <div className={`rank-badge w-8 h-8 rounded-full flex items-center justify-center font-bold ${idx === 0 ? 'bg-amber-500 text-white' : idx === 1 ? 'bg-gray-400 text-white' : idx === 2 ? 'bg-amber-700 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400'}`}>
                        {idx + 1}
                      </div>
                      <div className="flex-1">
                        <p className={`font-medium ${theme.textColors?.primary || 'text-gray-900 dark:text-white'}`}>{book.title}</p>
                        <p className={`text-sm ${theme.textColors?.secondary || 'text-gray-500 dark:text-gray-500'}`}>{formatNumber(book.readers)} readers • ⭐ {book.rating}</p>
                      </div>
                      <div className={`earnings ${theme.textColors?.primary || 'text-gray-900 dark:text-white'} font-semibold`}>
                        ${formatNumber(book.earnings)}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Recent Activity */}
            <div className={`activity-card ${theme.background?.card || 'bg-white dark:bg-gray-800'} ${theme.shadow?.container || 'shadow-lg'} rounded-xl p-6`}>
              <h3 className={`text-lg font-semibold ${theme.textColors?.primary || 'text-gray-900 dark:text-white'} mb-6`}>
                <FaClock className="inline mr-2" /> Recent Activity
              </h3>
              <div className="space-y-4">
                {recentActivities.map((activity) => (
                  <div key={activity.id} className="flex items-center gap-4 p-4 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                    <div className={`activity-icon w-10 h-10 rounded-full flex items-center justify-center ${
                      activity.type === 'review' ? 'bg-amber-100 dark:bg-amber-900/20 text-amber-600' :
                      activity.type === 'shelf' ? 'bg-blue-100 dark:bg-blue-900/20 text-blue-600' :
                      activity.type === 'follow' ? 'bg-green-100 dark:bg-green-900/20 text-green-600' :
                      'bg-purple-100 dark:bg-purple-900/20 text-purple-600'
                    }`}>
                      {activity.type === 'review' && <FaStar />}
                      {activity.type === 'shelf' && <FaBook />}
                      {activity.type === 'follow' && <FaUserPlus />}
                      {activity.type === 'payment' && <FaMoneyBillWave />}
                    </div>
                    <div className="flex-1">
                      <p className={`${theme.textColors?.primary || 'text-gray-900 dark:text-white'}`}>{activity.action}</p>
                      {activity.user && <p className={`text-sm ${theme.textColors?.secondary || 'text-gray-500 dark:text-gray-500'}`}>{activity.user} • {activity.time}</p>}
                      {activity.rating && <div className="flex gap-0.5 mt-1">{[...Array(5)].map((_, i) => <FaStar key={i} className={`w-3 h-3 ${i < activity.rating ? 'text-amber-400' : 'text-gray-300'}`} />)}</div>}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        {activeTab === 'books' && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className={`text-2xl font-bold ${theme.textColors?.primary || 'text-gray-900 dark:text-white'}`}>My Books</h2>
              <button className={`add-book-btn flex items-center gap-2 px-4 py-2 rounded-lg ${theme.buttonColors?.primaryButton?.background || 'bg-gradient-to-r from-purple-600 to-pink-600'} text-white hover:opacity-90 transition-all`}>
                <FaPlus /> Add New Book
              </button>
            </div>
            <div className="books-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {books.map((book) => (
                <div key={book.id} className={`book-card ${theme.background?.card || 'bg-white dark:bg-gray-800'} ${theme.shadow?.container || 'shadow-lg'} rounded-xl overflow-hidden transition-transform hover:scale-105`}>
                  <div className="book-cover h-48 bg-cover bg-center" style={{ backgroundImage: `url(${book.cover})` }}>
                    <div className="book-status px-3 py-1 bg-black/70 text-white text-xs inline-block m-3 rounded">
                      {book.status === 'published' ? 'Published' : 'Draft'}
                    </div>
                  </div>
                  <div className="book-info p-4">
                    <h3 className={`font-semibold text-lg ${theme.textColors?.primary || 'text-gray-900 dark:text-white'} mb-1`}>{book.title}</h3>
                    <p className={`text-sm ${theme.textColors?.secondary || 'text-gray-600 dark:text-gray-400'} mb-2`}>{book.genre}</p>
                    <div className="flex justify-between items-center mb-3 text-sm">
                      <span className={theme.textColors?.secondary || 'text-gray-500 dark:text-gray-500'}><FaUsers className="inline mr-1" /> {formatNumber(book.readers)} readers</span>
                      <span className={theme.textColors?.secondary || 'text-gray-500 dark:text-gray-500'}><FaStar className="inline mr-1 text-amber-400" /> {book.rating}</span>
                    </div>
                    <div className="flex gap-2">
                      <button className="flex-1 px-3 py-1.5 rounded-lg border hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                        <FaEdit className="inline mr-1" /> Edit
                      </button>
                      <button className="flex-1 px-3 py-1.5 rounded-lg border hover:bg-red-50 dark:hover:bg-red-900/20 text-red-600 transition-colors">
                        <FaTrash className="inline mr-1" /> Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'analytics' && (
          <div className="analytics-section space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className={`analytics-card ${theme.background?.card || 'bg-white dark:bg-gray-800'} rounded-xl p-6 text-center`}>
                <FaEye className="text-3xl mb-3 mx-auto" />
                <p className={`text-3xl font-bold ${theme.textColors?.primary || 'text-gray-900 dark:text-white'}`}>45.2K</p>
                <p className={theme.textColors?.secondary || 'text-gray-600 dark:text-gray-400'}>Total Views</p>
              </div>
              <div className={`analytics-card ${theme.background?.card || 'bg-white dark:bg-gray-800'} rounded-xl p-6 text-center`}>
                <FaHeart className="text-3xl mb-3 mx-auto text-rose-500" />
                <p className={`text-3xl font-bold ${theme.textColors?.primary || 'text-gray-900 dark:text-white'}`}>2.8K</p>
                <p className={theme.textColors?.secondary || 'text-gray-600 dark:text-gray-400'}>Total Likes</p>
              </div>
              <div className={`analytics-card ${theme.background?.card || 'bg-white dark:bg-gray-800'} rounded-xl p-6 text-center`}>
                <FaComment className="text-3xl mb-3 mx-auto text-sky-500" />
                <p className={`text-3xl font-bold ${theme.textColors?.primary || 'text-gray-900 dark:text-white'}`}>1.2K</p>
                <p className={theme.textColors?.secondary || 'text-gray-600 dark:text-gray-400'}>Comments</p>
              </div>
            </div>
            <div className={`chart-large ${theme.background?.card || 'bg-white dark:bg-gray-800'} rounded-xl p-6`}>
              <h3 className={`text-lg font-semibold mb-4 ${theme.textColors?.primary || 'text-gray-900 dark:text-white'}`}>Engagement Over Time</h3>
              <div className="chart-placeholder h-96 flex items-center justify-center border-2 border-dashed rounded-lg">
                <p className={theme.textColors?.secondary || 'text-gray-500 dark:text-gray-500'}>Chart: Weekly engagement metrics</p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'earnings' && (
          <div className="earnings-section">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className={`earning-summary ${theme.background?.card || 'bg-white dark:bg-gray-800'} rounded-xl p-6 text-center`}>
                <p className={`text-sm ${theme.textColors?.secondary || 'text-gray-600 dark:text-gray-400'}`}>This Month</p>
                <p className={`text-3xl font-bold ${theme.textColors?.primary || 'text-gray-900 dark:text-white'}`}>$1,850</p>
                <p className={`text-sm ${theme.textColors?.secondary || 'text-gray-500 dark:text-gray-500'}`}>↑ 12% from last month</p>
              </div>
              <div className={`earning-summary ${theme.background?.card || 'bg-white dark:bg-gray-800'} rounded-xl p-6 text-center`}>
                <p className={`text-sm ${theme.textColors?.secondary || 'text-gray-600 dark:text-gray-400'}`}>Last Month</p>
                <p className={`text-3xl font-bold ${theme.textColors?.primary || 'text-gray-900 dark:text-white'}`}>$1,650</p>
              </div>
              <div className={`earning-summary ${theme.background?.card || 'bg-white dark:bg-gray-800'} rounded-xl p-6 text-center`}>
                <p className={`text-sm ${theme.textColors?.secondary || 'text-gray-600 dark:text-gray-400'}`}>Total Pending</p>
                <p className={`text-3xl font-bold ${theme.textColors?.primary || 'text-gray-900 dark:text-white'}`}>$2,450</p>
                <button className={`mt-3 px-4 py-1.5 rounded-lg text-sm ${theme.buttonColors?.primaryButton?.background || 'bg-gradient-to-r from-purple-600 to-pink-600'} text-white`}>
                  Request Withdrawal
                </button>
              </div>
            </div>
            <div className={`earnings-table ${theme.background?.card || 'bg-white dark:bg-gray-800'} rounded-xl overflow-hidden`}>
              <table className="w-full">
                <thead className={`border-b ${theme.border?.default || 'border-gray-200 dark:border-gray-700'}`}>
                  <tr className="text-left">
                    <th className="p-4">Date</th>
                    <th className="p-4">Book</th>
                    <th className="p-4">Type</th>
                    <th className="p-4 text-right">Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { date: '2024-03-01', book: 'The Crystal Kingdom', type: 'Royalty', amount: 450 },
                    { date: '2024-03-15', book: 'Shadows of the Past', type: 'Royalty', amount: 320 },
                    { date: '2024-03-20', book: 'The Crystal Kingdom', type: 'Bonus', amount: 100 },
                  ].map((earning, idx) => (
                    <tr key={idx} className={`border-b ${theme.border?.default || 'border-gray-100 dark:border-gray-700'}`}>
                      <td className="p-4">{earning.date}</td>
                      <td className="p-4">{earning.book}</td>
                      <td className="p-4">{earning.type}</td>
                      <td className="p-4 text-right font-semibold text-green-600">${earning.amount}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AuthorDashboard;