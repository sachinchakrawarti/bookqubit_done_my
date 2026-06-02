"use client";

import { useTheme } from "@/themes/useTheme";
import { useUserDashboard } from "../hooks/useUserDashboard";
import BookCard from "../ui/BookCard";
import { useState } from "react";

export default function MarkedReadTab() {
  const { theme, themeName } = useTheme();
  const isDarkMode = themeName === 'dark' || themeName === 'midnight' || themeName === 'cyberpunk';
  const [filter, setFilter] = useState('all'); // all, this_year, last_year
  
  const { markedRead, loading, userStats } = useUserDashboard();

  const filteredBooks = markedRead.filter(book => {
    if (filter === 'all') return true;
    const year = new Date(book.completedAt).getFullYear();
    const currentYear = new Date().getFullYear();
    if (filter === 'this_year') return year === currentYear;
    if (filter === 'last_year') return year === currentYear - 1;
    return true;
  });

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="skeleton h-8 w-64"></div>
        <div className="grid grid-cols-1 gap-6">
          {[1,2,3].map(i => <div key={i} className="skeleton h-40 rounded-xl"></div>)}
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6">
        <h1 className={`text-2xl font-bold ${theme?.textColors?.primary || (isDarkMode ? 'text-white' : 'text-gray-900')}`}>
          Marked Read
        </h1>
        <p className={`${theme?.textColors?.secondary || (isDarkMode ? 'text-gray-400' : 'text-gray-600')} mt-1`}>
          Books you've completed reading
        </p>
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className={`p-4 rounded-xl ${theme?.background?.section || (isDarkMode ? 'bg-gray-800' : 'bg-white')} text-center`}>
          <p className="text-2xl font-bold">{userStats?.totalBooksRead || 0}</p>
          <p className={`text-sm ${theme?.textColors?.secondary || (isDarkMode ? 'text-gray-400' : 'text-gray-600')}`}>Total Books</p>
        </div>
        <div className={`p-4 rounded-xl ${theme?.background?.section || (isDarkMode ? 'bg-gray-800' : 'bg-white')} text-center`}>
          <p className="text-2xl font-bold">{userStats?.totalPagesRead?.toLocaleString() || 0}</p>
          <p className={`text-sm ${theme?.textColors?.secondary || (isDarkMode ? 'text-gray-400' : 'text-gray-600')}`}>Pages Read</p>
        </div>
        <div className={`p-4 rounded-xl ${theme?.background?.section || (isDarkMode ? 'bg-gray-800' : 'bg-white')} text-center`}>
          <p className="text-2xl font-bold">{userStats?.averageRating || 0}</p>
          <p className={`text-sm ${theme?.textColors?.secondary || (isDarkMode ? 'text-gray-400' : 'text-gray-600')}`}>Avg Rating</p>
        </div>
        <div className={`p-4 rounded-xl ${theme?.background?.section || (isDarkMode ? 'bg-gray-800' : 'bg-white')} text-center`}>
          <p className="text-2xl font-bold">{userStats?.readingStreak || 0}</p>
          <p className={`text-sm ${theme?.textColors?.secondary || (isDarkMode ? 'text-gray-400' : 'text-gray-600')}`}>Day Streak</p>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2 mb-6 border-b border-gray-200 dark:border-gray-700">
        <button
          className={`px-4 py-2 ${filter === 'all' ? 'border-b-2 border-sky-500 text-sky-600 dark:text-sky-400' : ''}`}
          onClick={() => setFilter('all')}
        >
          All Books
        </button>
        <button
          className={`px-4 py-2 ${filter === 'this_year' ? 'border-b-2 border-sky-500 text-sky-600 dark:text-sky-400' : ''}`}
          onClick={() => setFilter('this_year')}
        >
          This Year
        </button>
        <button
          className={`px-4 py-2 ${filter === 'last_year' ? 'border-b-2 border-sky-500 text-sky-600 dark:text-sky-400' : ''}`}
          onClick={() => setFilter('last_year')}
        >
          Last Year
        </button>
      </div>

      {filteredBooks.length > 0 ? (
        <div className="space-y-4">
          {filteredBooks.map((book) => (
            <BookCard key={book.id} book={book} type="completed" />
          ))}
        </div>
      ) : (
        <div className={`text-center py-12 ${theme?.background?.section || (isDarkMode ? 'bg-gray-800' : 'bg-white')} rounded-xl`}>
          <p className={`text-lg ${theme?.textColors?.secondary || (isDarkMode ? 'text-gray-400' : 'text-gray-600')}`}>
            No completed books found.
          </p>
        </div>
      )}
    </div>
  );
}