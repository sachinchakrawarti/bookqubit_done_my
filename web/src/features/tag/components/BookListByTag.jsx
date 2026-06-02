"use client";

import Link from "next/link";
import { useTheme } from "@/themes/useTheme";

export default function BookListByTag({ books, tagName, language = "en" }) {
  const { theme, themeName } = useTheme();
  const isDarkMode = themeName === 'dark' || themeName === 'midnight' || themeName === 'cyberpunk';

  if (books.length === 0) {
    return (
      <div className={`text-center py-12 ${theme?.background?.section || (isDarkMode ? 'bg-gray-800' : 'bg-white')} rounded-xl`}>
        <p className={`text-lg ${theme?.textColors?.secondary || (isDarkMode ? 'text-gray-400' : 'text-gray-600')}`}>
          No books found with tag "{tagName}"
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {books.map((book) => (
        <div
          key={book.id}
          className={`group ${theme?.background?.section || (isDarkMode ? 'bg-gray-800' : 'bg-white')} rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] border ${theme?.border?.default || (isDarkMode ? 'border-gray-700' : 'border-gray-200')}`}
        >
          <div className="p-6">
            <div className="flex gap-4">
              {/* Book Cover */}
              <div className="flex-shrink-0">
                <img
                  src={book.imageUrl}
                  alt={book.title}
                  className="w-24 h-32 object-cover rounded-lg shadow-md"
                  onError={(e) => {
                    e.target.src = "/placeholder-book.jpg";
                  }}
                />
              </div>
              
              {/* Book Info */}
              <div className="flex-1">
                <Link href={`/${language}/books/${book.slug || book.id}`}>
                  <h3 
                    className={`text-lg font-bold ${theme?.textColors?.primary || (isDarkMode ? 'text-white' : 'text-gray-900')} mb-1 line-clamp-2 group-hover:text-sky-600 dark:group-hover:text-sky-400 transition-colors cursor-pointer`}
                  >
                    {book.title}
                  </h3>
                </Link>
                
                <p className={`text-sm ${theme?.textColors?.secondary || (isDarkMode ? 'text-gray-400' : 'text-gray-600')} mb-2`}>
                  by {book.author}
                </p>
                
                {/* Rating */}
                <div className="flex items-center mb-2">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className={`w-4 h-4 ${i < Math.floor(book.rating || 0) ? 'text-amber-400' : 'text-gray-300 dark:text-gray-600'}`}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                  <span className={`ml-2 text-xs ${theme?.textColors?.secondary || (isDarkMode ? 'text-gray-400' : 'text-gray-600')}`}>
                    ({book.rating || 0})
                  </span>
                </div>
                
                {/* Tags */}
                <div className="flex flex-wrap gap-1 mb-3">
                  {book.tags?.slice(0, 3).map((tag) => (
                    <Link
                      key={tag}
                      href={`/${language}/tag/${encodeURIComponent(tag)}`}
                      className={`text-xs px-2 py-1 rounded-full ${isDarkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200'} ${theme?.textColors?.secondary || (isDarkMode ? 'text-gray-300' : 'text-gray-700')} transition-colors`}
                    >
                      {tag}
                    </Link>
                  ))}
                </div>
                
                <Link
                  href={`/${language}/books/${book.slug || book.id}`}
                  className={`inline-block w-full text-center px-4 py-2 text-sm font-medium ${theme?.buttonColors?.primaryButton?.background || 'bg-gradient-to-r from-sky-600 to-sky-500'} text-white rounded-lg transition-all hover:shadow-lg`}
                >
                  View Details
                </Link>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}