"use client";

import { useTheme } from "@/themes/useTheme";
import { useUserDashboard } from "../hooks/useUserDashboard";
import BookCard from "../ui/BookCard";

export default function WantToReadTab() {
  const { theme, themeName } = useTheme();
  const isDarkMode = themeName === 'dark' || themeName === 'midnight' || themeName === 'cyberpunk';
  
  const { wantToRead, loading, addBookToLibrary, removeBookFromLibrary } = useUserDashboard();

  const handleStartReading = (bookId) => {
    addBookToLibrary(bookId, 'currently_reading');
    removeBookFromLibrary(bookId, 'want_to_read');
  };

  const handleRemove = (bookId) => {
    if (confirm('Remove this book from your wishlist?')) {
      removeBookFromLibrary(bookId, 'want_to_read');
    }
  };

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
          Want to Read
        </h1>
        <p className={`${theme?.textColors?.secondary || (isDarkMode ? 'text-gray-400' : 'text-gray-600')} mt-1`}>
          Your reading wishlist
        </p>
      </div>

      {wantToRead.length > 0 ? (
        <div className="space-y-4">
          {wantToRead.map((book) => (
            <BookCard 
              key={book.id} 
              book={book} 
              type="want_to_read"
              onAddToLibrary={handleStartReading}
              onRemove={handleRemove}
            />
          ))}
        </div>
      ) : (
        <div className={`text-center py-12 ${theme?.background?.section || (isDarkMode ? 'bg-gray-800' : 'bg-white')} rounded-xl`}>
          <p className={`text-lg ${theme?.textColors?.secondary || (isDarkMode ? 'text-gray-400' : 'text-gray-600')}`}>
            ⭐ Your wishlist is empty.
          </p>
          <p className={`mt-2 ${theme?.textColors?.secondary || (isDarkMode ? 'text-gray-400' : 'text-gray-600')}`}>
            Browse books and add them to your Want to Read list!
          </p>
        </div>
      )}
    </div>
  );
}