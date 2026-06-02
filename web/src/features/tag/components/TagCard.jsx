"use client";

import Link from "next/link";
import { useTheme } from "@/themes/useTheme";

export default function TagCard({ tag, language = "en" }) {
  const { theme, themeName } = useTheme();
  const isDarkMode = themeName === 'dark' || themeName === 'midnight' || themeName === 'cyberpunk';

  // Calculate font size based on count (for visual hierarchy)
  const getFontSize = (count) => {
    if (count > 20) return "text-xl";
    if (count > 10) return "text-lg";
    if (count > 5) return "text-base";
    return "text-sm";
  };

  return (
    <Link href={`/${language}/tag/${encodeURIComponent(tag.name)}`}>
      <div
        className={`group p-4 rounded-xl transition-all duration-300 cursor-pointer hover:scale-105 hover:shadow-xl ${
          theme?.background?.section || (isDarkMode ? 'bg-gray-800' : 'bg-white')
        } border ${theme?.border?.default || (isDarkMode ? 'border-gray-700' : 'border-gray-200')}`}
      >
        <div className="flex items-center justify-between mb-2">
          <span 
            className={`font-semibold ${getFontSize(tag.count)} ${
              theme?.textColors?.primary || (isDarkMode ? 'text-white' : 'text-gray-900')
            } group-hover:text-sky-600 dark:group-hover:text-sky-400 transition-colors`}
          >
            {tag.name}
          </span>
          <span 
            className="text-xs px-2 py-1 rounded-full"
            style={{
              backgroundColor: isDarkMode ? '#374151' : '#f3f4f6',
              color: theme?.textColors?.secondary || (isDarkMode ? '#9ca3af' : '#6b7280')
            }}
          >
            {tag.count} {tag.count === 1 ? 'book' : 'books'}
          </span>
        </div>
        
        {/* Preview first 3 books */}
        <div className="mt-3">
          <div className="flex -space-x-2">
            {tag.books.slice(0, 3).map((book, index) => (
              <div
                key={book.id}
                className="w-8 h-8 rounded-full bg-sky-500 flex items-center justify-center text-white text-xs font-bold border-2 border-white dark:border-gray-800"
                style={{ zIndex: 3 - index }}
              >
                {book.title.charAt(0)}
              </div>
            ))}
            {tag.books.length > 3 && (
              <div className="w-8 h-8 rounded-full bg-gray-400 dark:bg-gray-600 flex items-center justify-center text-white text-xs font-bold border-2 border-white dark:border-gray-800">
                +{tag.books.length - 3}
              </div>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}