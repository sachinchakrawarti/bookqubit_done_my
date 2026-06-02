"use client";

import { useTheme } from "@/themes/useTheme";
import { useUserDashboard } from "../hooks/useUserDashboard";
import BookCard from "../ui/BookCard";

export default function CurrentlyReadingTab() {
  const { theme, themeName } = useTheme();
  const isDarkMode = themeName === 'dark' || themeName === 'midnight' || themeName === 'cyberpunk';
  
  const { 
    currentlyReading, 
    loading, 
    updateBookProgress,
    removeBookFromLibrary 
  } = useUserDashboard();

  const handleProgressUpdate = (bookId, progress) => {
    updateBookProgress(bookId, progress);
  };

  const handleRemove = (bookId) => {
    if (confirm('Remove this book from your reading list?')) {
      removeBookFromLibrary(bookId, 'currently_reading');
    }
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="skeleton h-8 w-64"></div>
        <div className="grid grid-cols-1 gap-6">
          {[1,2,3].map(i => <div key={i} className="skeleton h-48 rounded-xl"></div>)}
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6">
        <h1 className={`text-2xl font-bold ${theme?.textColors?.primary || (isDarkMode ? 'text-white' : 'text-gray-900')}`}>
          Currently Reading
        </h1>
        <p className={`${theme?.textColors?.secondary || (isDarkMode ? 'text-gray-400' : 'text-gray-600')} mt-1`}>
          Continue your reading journey with these books
        </p>
      </div>

      {currentlyReading.length > 0 ? (
        <div className="space-y-4">
          {currentlyReading.map((book) => (
            <BookCard 
              key={book.id} 
              book={book} 
              type="reading"
              onProgressUpdate={handleProgressUpdate}
              onRemove={handleRemove}
            />
          ))}
        </div>
      ) : (
        <div className={`text-center py-12 ${theme?.background?.section || (isDarkMode ? 'bg-gray-800' : 'bg-white')} rounded-xl`}>
          <p className={`text-lg ${theme?.textColors?.secondary || (isDarkMode ? 'text-gray-400' : 'text-gray-600')}`}>
            📖 You're not reading any books right now.
          </p>
          <p className={`mt-2 ${theme?.textColors?.secondary || (isDarkMode ? 'text-gray-400' : 'text-gray-600')}`}>
            Browse the library and add some books to get started!
          </p>
        </div>
      )}
    </div>
  );
}