"use client";

import { useState, useEffect } from 'react';
import { useTheme } from '@/themes/useTheme';
import { useFont } from '@/contexts/FontContext';
import './publication-dashboard.css';

const PublicationDashboard = () => {
  const { theme, themeName } = useTheme();
  const { currentFont } = useFont();
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedYear, setSelectedYear] = useState('2026');
  const [selectedMonth, setSelectedMonth] = useState('march');

  const years = ['2024', '2025', '2026', '2027', '2028'];
  const months = ['january', 'february', 'march', 'april', 'may', 'june', 'july', 'august', 'september', 'october', 'november', 'december'];

  const [publications, setPublications] = useState([]);
  const [stats, setStats] = useState({});
  const [authors, setAuthors] = useState([]);
  const [salesData, setSalesData] = useState([]);

  const publicationData = {
    '2026': {
      march: {
        stats: {
          totalBooksPublished: 24,
          totalSales: 156780,
          totalRevenue: 1245670,
          activeAuthors: 18,
          pendingRoyalties: 345670,
          averageRating: 4.6,
          totalReviews: 8923,
        },
        publications: [
          { id: 1, title: 'The Last Horizon', author: 'Sarah J. Brooks', publishDate: '2026-03-15', sales: 12450, revenue: 124500, rating: 4.8, status: 'published', genre: 'Sci-Fi' },
          { id: 2, title: 'Whispers of the Ancients', author: 'Michael Chen', publishDate: '2026-03-10', sales: 9870, revenue: 98700, rating: 4.7, status: 'published', genre: 'Fantasy' },
          { id: 3, title: 'Digital Dreams', author: 'Emma Watson', publishDate: '2026-03-05', sales: 8765, revenue: 87650, rating: 4.6, status: 'published', genre: 'Cyberpunk' },
        ],
        authors: [
          { id: 1, name: 'Sarah J. Brooks', books: 3, totalSales: 45670, royalties: 45670, rating: 4.8, status: 'active' },
          { id: 2, name: 'Michael Chen', books: 2, totalSales: 28900, royalties: 28900, rating: 4.7, status: 'active' },
          { id: 3, name: 'Emma Watson', books: 1, totalSales: 18700, royalties: 18700, rating: 4.6, status: 'active' },
        ],
        salesData: [
          { week: 'Week 1', sales: 12500, revenue: 125000 },
          { week: 'Week 2', sales: 15800, revenue: 158000 },
          { week: 'Week 3', sales: 14200, revenue: 142000 },
          { week: 'Week 4', sales: 18900, revenue: 189000 },
        ]
      }
    },
    '2027': {
      march: {
        stats: {
          totalBooksPublished: 32,
          totalSales: 234567,
          totalRevenue: 1987650,
          activeAuthors: 25,
          pendingRoyalties: 456789,
          averageRating: 4.7,
          totalReviews: 12345,
        },
        publications: [
          { id: 4, title: 'Neural Nexus', author: 'Dr. Alan Turing', publishDate: '2027-03-01', sales: 15678, revenue: 156780, rating: 4.9, status: 'published', genre: 'Sci-Fi' },
          { id: 5, title: 'Fantasy Realms', author: 'George Martin', publishDate: '2027-03-08', sales: 13456, revenue: 134560, rating: 4.8, status: 'published', genre: 'Fantasy' },
        ],
        authors: [
          { id: 4, name: 'Dr. Alan Turing', books: 1, totalSales: 15678, royalties: 15678, rating: 4.9, status: 'active' },
          { id: 5, name: 'George Martin', books: 1, totalSales: 13456, royalties: 13456, rating: 4.8, status: 'active' },
        ],
        salesData: [
          { week: 'Week 1', sales: 21000, revenue: 210000 },
          { week: 'Week 2', sales: 24500, revenue: 245000 },
          { week: 'Week 3', sales: 22800, revenue: 228000 },
          { week: 'Week 4', sales: 26700, revenue: 267000 },
        ]
      }
    },
    '2028': {
      march: {
        stats: {
          totalBooksPublished: 45,
          totalSales: 345678,
          totalRevenue: 2897650,
          activeAuthors: 32,
          pendingRoyalties: 678901,
          averageRating: 4.8,
          totalReviews: 18765,
        },
        publications: [
          { id: 6, title: 'AI Revolution', author: 'Elon Mask', publishDate: '2028-03-01', sales: 18976, revenue: 189760, rating: 4.9, status: 'published', genre: 'Technology' },
          { id: 7, title: 'Virtual Reality', author: 'Mark Zuck', publishDate: '2028-03-10', sales: 16543, revenue: 165430, rating: 4.8, status: 'published', genre: 'Tech' },
        ],
        authors: [
          { id: 6, name: 'Elon Mask', books: 1, totalSales: 18976, royalties: 18976, rating: 4.9, status: 'active' },
          { id: 7, name: 'Mark Zuck', books: 1, totalSales: 16543, royalties: 16543, rating: 4.8, status: 'active' },
        ],
        salesData: [
          { week: 'Week 1', sales: 32000, revenue: 320000 },
          { week: 'Week 2', sales: 35600, revenue: 356000 },
          { week: 'Week 3', sales: 29800, revenue: 298000 },
          { week: 'Week 4', sales: 41200, revenue: 412000 },
        ]
      }
    }
  };

  useEffect(() => {
    setTimeout(() => {
      const data = publicationData[selectedYear]?.[selectedMonth] || publicationData['2026']['march'];
      setStats(data.stats);
      setPublications(data.publications || []);
      setAuthors(data.authors || []);
      setSalesData(data.salesData || []);
      setLoading(false);
    }, 500);
  }, [selectedYear, selectedMonth]);

  const formatNumber = (num) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
    return num.toString();
  };

  const formatCurrency = (num) => {
    if (num >= 1000000) return '$' + (num / 1000000).toFixed(1) + 'M';
    if (num >= 1000) return '$' + (num / 1000).toFixed(1) + 'K';
    return '$' + num.toString();
  };

  const getMonthName = (month) => month.charAt(0).toUpperCase() + month.slice(1);

  const StatCard = ({ icon, title, value, subtitle }) => (
    <div className={`stat-card ${theme.background?.card || 'bg-white dark:bg-gray-800'} rounded-xl p-6 shadow-lg`}>
      <div className="text-3xl mb-3">{icon}</div>
      <h3 className={`text-sm ${theme.textColors?.secondary || 'text-gray-600 dark:text-gray-400'} mb-1`}>{title}</h3>
      <p className={`text-2xl font-bold ${theme.textColors?.primary || 'text-gray-900 dark:text-white'} mb-2`}>
        {title.includes('$') || title.includes('Revenue') || title.includes('Royalties') 
          ? formatCurrency(value) 
          : formatNumber(value)}
      </p>
      {subtitle && <p className={`text-xs ${theme.textColors?.secondary || 'text-gray-500 dark:text-gray-500'}`}>{subtitle}</p>}
    </div>
  );

  if (loading) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${theme.background?.page || 'bg-gray-50 dark:bg-gray-900'}`}>
        <div className="text-center">
          <div className="spinner w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className={theme.textColors?.secondary || 'text-gray-600 dark:text-gray-400'}>Loading publication dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="publication-dashboard" style={{ fontFamily: currentFont?.family }}>
      {/* Header */}
      <div className="bg-gradient-to-r from-emerald-600 to-teal-600 px-8 py-12">
        <h1 className="text-3xl font-bold text-white mb-2">
          📚 Publication Dashboard
        </h1>
        <p className="text-white/80">
          Manage your publications, track sales, and monitor author performance
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
              <label className={`block text-sm mb-2 ${theme.textColors?.secondary || 'text-gray-600 dark:text-gray-400'}`}>📆 Month</label>
              <select
                value={selectedMonth}
                onChange={(e) => setSelectedMonth(e.target.value)}
                className={`px-4 py-2 rounded-lg border ${theme.background?.input || 'bg-gray-50 dark:bg-gray-900'} ${theme.textColors?.primary || 'text-gray-900 dark:text-white'}`}
              >
                {months.map(month => <option key={month} value={month}>{getMonthName(month)}</option>)}
              </select>
            </div>

            <div>
              <label className={`block text-sm mb-2 ${theme.textColors?.secondary || 'text-gray-600 dark:text-gray-400'}`}>📊 View</label>
              <div className="flex gap-2">
                <button
                  onClick={() => setActiveTab('overview')}
                  className={`px-4 py-2 rounded-lg ${activeTab === 'overview' ? 'bg-emerald-500 text-white' : 'bg-gray-100 dark:bg-gray-700'}`}
                >
                  📈 Overview
                </button>
                <button
                  onClick={() => setActiveTab('publications')}
                  className={`px-4 py-2 rounded-lg ${activeTab === 'publications' ? 'bg-emerald-500 text-white' : 'bg-gray-100 dark:bg-gray-700'}`}
                >
                  📖 Publications
                </button>
                <button
                  onClick={() => setActiveTab('authors')}
                  className={`px-4 py-2 rounded-lg ${activeTab === 'authors' ? 'bg-emerald-500 text-white' : 'bg-gray-100 dark:bg-gray-700'}`}
                >
                  👥 Authors
                </button>
                <button
                  onClick={() => setActiveTab('royalties')}
                  className={`px-4 py-2 rounded-lg ${activeTab === 'royalties' ? 'bg-emerald-500 text-white' : 'bg-gray-100 dark:bg-gray-700'}`}
                >
                  💰 Royalties
                </button>
              </div>
            </div>
          </div>

          <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-emerald-600 to-teal-600 text-white">
            📥 Export Report
          </button>
        </div>
      </div>

      {/* Overview Tab */}
      {activeTab === 'overview' && (
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <StatCard icon="📚" title="Total Books" value={stats.totalBooksPublished || 0} subtitle={`in ${getMonthName(selectedMonth)} ${selectedYear}`} />
            <StatCard icon="💰" title="Total Revenue" value={stats.totalRevenue || 0} subtitle="from sales" />
            <StatCard icon="👥" title="Active Authors" value={stats.activeAuthors || 0} subtitle="contributing" />
            <StatCard icon="⭐" title="Avg Rating" value={stats.averageRating || 0} subtitle="out of 5" />
          </div>

          <div className={`${theme.background?.card || 'bg-white dark:bg-gray-800'} rounded-xl p-6 shadow-lg mb-8`}>
            <h3 className={`text-lg font-semibold mb-4 ${theme.textColors?.primary || 'text-gray-900 dark:text-white'}`}>
              📊 Weekly Sales Performance
            </h3>
            <div className="space-y-4">
              {salesData.map((week, idx) => (
                <div key={idx}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className={theme.textColors?.secondary || 'text-gray-600 dark:text-gray-400'}>{week.week}</span>
                    <span className={theme.textColors?.primary || 'text-gray-900 dark:text-white'}>${formatNumber(week.sales)} sales</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-8 overflow-hidden">
                    <div 
                      className="bg-gradient-to-r from-emerald-500 to-teal-500 h-8 rounded-full flex items-center justify-end px-3 text-white text-sm font-medium"
                      style={{ width: `${(week.sales / Math.max(...salesData.map(w => w.sales))) * 100}%` }}
                    >
                      {formatNumber(week.sales)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Publications Tab */}
      {activeTab === 'publications' && (
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className={`text-2xl font-bold ${theme.textColors?.primary || 'text-gray-900 dark:text-white'}`}>
              📖 Published Books
            </h2>
            <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-emerald-500 text-white hover:bg-emerald-600">
              + Add New Book
            </button>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {publications.map((book) => (
              <div key={book.id} className={`${theme.background?.card || 'bg-white dark:bg-gray-800'} rounded-xl p-6 shadow-lg hover:shadow-xl transition-all`}>
                <div className="flex flex-wrap justify-between items-start gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className={`text-xl font-bold ${theme.textColors?.primary || 'text-gray-900 dark:text-white'}`}>{book.title}</h3>
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        book.status === 'published' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' : 'bg-yellow-100 text-yellow-700'
                      }`}>
                        {book.status}
                      </span>
                    </div>
                    <p className={`text-sm ${theme.textColors?.secondary || 'text-gray-600 dark:text-gray-400'} mb-2`}>by {book.author}</p>
                    <div className="flex flex-wrap gap-4 text-sm mb-3">
                      <span>📖 {book.genre}</span>
                      <span>⭐ {book.rating}</span>
                      <span>📅 {book.publishDate}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className={`text-2xl font-bold ${theme.textColors?.primary || 'text-gray-900 dark:text-white'}`}>{formatNumber(book.sales)}</p>
                    <p className={`text-sm ${theme.textColors?.secondary || 'text-gray-600 dark:text-gray-400'}`}>copies sold</p>
                    <p className={`text-lg font-semibold text-emerald-600 dark:text-emerald-400`}>{formatCurrency(book.revenue)}</p>
                  </div>
                </div>
                <div className="flex gap-3 mt-4 pt-4 border-t">
                  <button className="px-3 py-1.5 rounded-lg border hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">✏️ Edit</button>
                  <button className="px-3 py-1.5 rounded-lg border text-emerald-600 hover:bg-emerald-50 transition-colors">📊 Analytics</button>
                  <button className="px-3 py-1.5 rounded-lg border text-red-600 hover:bg-red-50 transition-colors">🗑️ Delete</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Authors Tab */}
      {activeTab === 'authors' && (
        <div className="p-6">
          <h2 className={`text-2xl font-bold ${theme.textColors?.primary || 'text-gray-900 dark:text-white'} mb-6`}>
            👥 Author Roster
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {authors.map((author) => (
              <div key={author.id} className={`${theme.background?.card || 'bg-white dark:bg-gray-800'} rounded-xl p-6 shadow-lg hover:scale-105 transition-transform`}>
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center text-white text-2xl font-bold">
                    {author.name.charAt(0)}
                  </div>
                  <div>
                    <h3 className={`font-bold text-lg ${theme.textColors?.primary || 'text-gray-900 dark:text-white'}`}>{author.name}</h3>
                    <span className={`text-sm px-2 py-0.5 rounded-full ${
                      author.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                    }`}>
                      {author.status}
                    </span>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className={theme.textColors?.secondary || 'text-gray-600 dark:text-gray-400'}>Books:</span>
                    <span className={`font-semibold ${theme.textColors?.primary || 'text-gray-900 dark:text-white'}`}>{author.books}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className={theme.textColors?.secondary || 'text-gray-600 dark:text-gray-400'}>Total Sales:</span>
                    <span className={`font-semibold ${theme.textColors?.primary || 'text-gray-900 dark:text-white'}`}>{formatNumber(author.totalSales)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className={theme.textColors?.secondary || 'text-gray-600 dark:text-gray-400'}>Royalties:</span>
                    <span className={`font-semibold text-emerald-600 dark:text-emerald-400`}>{formatCurrency(author.royalties)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className={theme.textColors?.secondary || 'text-gray-600 dark:text-gray-400'}>Rating:</span>
                    <span className={`font-semibold ${theme.textColors?.primary || 'text-gray-900 dark:text-white'}`}>⭐ {author.rating}</span>
                  </div>
                </div>
                <div className="flex gap-2 mt-4 pt-4 border-t">
                  <button className="flex-1 px-3 py-1.5 rounded-lg border hover:bg-gray-50 transition-colors">📧 Contact</button>
                  <button className="flex-1 px-3 py-1.5 rounded-lg bg-emerald-500 text-white hover:bg-emerald-600 transition-colors">📊 Report</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Royalties Tab */}
      {activeTab === 'royalties' && (
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className={`${theme.background?.card || 'bg-white dark:bg-gray-800'} rounded-xl p-6 shadow-lg text-center`}>
              <div className="text-4xl mb-3">💰</div>
              <h3 className={`text-sm ${theme.textColors?.secondary || 'text-gray-600 dark:text-gray-400'}`}>Pending Royalties</h3>
              <p className={`text-3xl font-bold text-emerald-600 dark:text-emerald-400`}>{formatCurrency(stats.pendingRoyalties || 0)}</p>
              <button className="mt-4 px-4 py-2 rounded-lg bg-emerald-500 text-white hover:bg-emerald-600">Process Payments</button>
            </div>

            <div className={`${theme.background?.card || 'bg-white dark:bg-gray-800'} rounded-xl p-6 shadow-lg text-center`}>
              <div className="text-4xl mb-3">📊</div>
              <h3 className={`text-sm ${theme.textColors?.secondary || 'text-gray-600 dark:text-gray-400'}`}>Total Royalties Paid</h3>
              <p className={`text-3xl font-bold ${theme.textColors?.primary || 'text-gray-900 dark:text-white'}`}>{formatCurrency((stats.totalRevenue || 0) * 0.7)}</p>
              <p className={`text-xs ${theme.textColors?.secondary || 'text-gray-500 dark:text-gray-500'}`}>70% of total revenue</p>
            </div>
          </div>

          <div className={`${theme.background?.card || 'bg-white dark:bg-gray-800'} rounded-xl shadow-lg overflow-hidden`}>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className={`border-b ${theme.border?.default || 'border-gray-200 dark:border-gray-700'}`}>
                  <tr className="text-left">
                    <th className="p-4">Author</th>
                    <th className="p-4">Book</th>
                    <th className="p-4">Sales</th>
                    <th className="p-4 text-right">Royalty Amount</th>
                    <th className="p-4 text-center">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {authors.map((author) => (
                    <tr key={author.id} className={`border-b ${theme.border?.default || 'border-gray-100 dark:border-gray-700'}`}>
                      <td className="p-4 font-medium">{author.name}</td>
                      <td className="p-4">{author.books} book(s)</td>
                      <td className="p-4">{formatNumber(author.totalSales)}</td>
                      <td className="p-4 text-right font-semibold text-emerald-600">{formatCurrency(author.royalties)}</td>
                      <td className="p-4 text-center">
                        <span className="inline-block px-2 py-1 rounded-full text-xs bg-green-100 text-green-700">Pending</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PublicationDashboard;