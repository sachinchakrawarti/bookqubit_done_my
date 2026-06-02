"use client";

import { useTheme } from "@/themes/useTheme";
import { useLanguage } from "@/contexts/LanguageContext";
import { useTagData } from "./hooks/useTagData";
import BookListByTag from "./components/BookListByTag";
import Link from "next/link";

export default function TagDetails({ tagName }) {
  const { theme, themeName } = useTheme();
  const { language } = useLanguage();
  const { allTags, getBooksByTag, getRelatedTags, loading, error } = useTagData(language);
  
  const isDarkMode = themeName === 'dark' || themeName === 'midnight' || themeName === 'cyberpunk';
  
  const books = getBooksByTag(tagName);
  const currentTag = allTags.find(t => t.name === tagName);
  const relatedTags = getRelatedTags(tagName, 10);

  if (loading) {
    return (
      <div className={`min-h-screen ${theme?.background?.section || (isDarkMode ? 'bg-gray-900' : 'bg-gray-50')} py-12 px-4`}>
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-sky-600"></div>
          <p className={`mt-4 ${theme?.textColors?.secondary || (isDarkMode ? 'text-gray-400' : 'text-gray-600')}`}>
            Loading tag details...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`min-h-screen ${theme?.background?.section || (isDarkMode ? 'bg-gray-900' : 'bg-gray-50')} py-12 px-4`}>
        <div className="max-w-7xl mx-auto text-center">
          <div className="text-red-600 mb-4">⚠️ Error loading tag</div>
          <p className={theme?.textColors?.secondary || (isDarkMode ? 'text-gray-400' : 'text-gray-600')}>
            {error}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${theme?.background?.section || (isDarkMode ? 'bg-gray-900' : 'bg-gray-50')} py-12 px-4 sm:px-6 lg:px-8`}>
      <div className="max-w-7xl mx-auto">
        {/* Breadcrumb */}
        <div className="mb-6">
          <Link href={`/${language}/tag`} className={`text-sm ${theme?.textColors?.secondary || (isDarkMode ? 'text-gray-400' : 'text-gray-600')} hover:text-sky-600 transition-colors`}>
            ← Back to Tags
          </Link>
        </div>

        {/* Tag Header */}
        <div className={`mb-8 p-8 ${theme?.background?.section || (isDarkMode ? 'bg-gray-800' : 'bg-white')} rounded-xl shadow-lg text-center`}>
          <div className="inline-block p-4 bg-sky-100 dark:bg-sky-900/30 rounded-full mb-4">
            <span className="text-4xl">🏷️</span>
          </div>
          <h1 className={`text-4xl font-bold ${theme?.textColors?.primary || (isDarkMode ? 'text-white' : 'text-gray-900')} mb-4`}>
            {tagName}
          </h1>
          <p className={`text-lg ${theme?.textColors?.secondary || (isDarkMode ? 'text-gray-400' : 'text-gray-600')} max-w-2xl mx-auto`}>
            {books.length} {books.length === 1 ? 'book' : 'books'} tagged with "{tagName}"
          </p>
        </div>

        {/* Related Tags */}
        {relatedTags.length > 0 && (
          <div className={`mb-8 p-6 ${theme?.background?.section || (isDarkMode ? 'bg-gray-800' : 'bg-white')} rounded-xl shadow-lg`}>
            <h2 className={`text-xl font-semibold ${theme?.textColors?.primary || (isDarkMode ? 'text-white' : 'text-gray-900')} mb-4`}>
              Related Tags
            </h2>
            <div className="flex flex-wrap gap-2">
              {relatedTags.map((tag) => (
                <Link
                  key={tag.name}
                  href={`/${language}/tag/${encodeURIComponent(tag.name)}`}
                  className={`px-3 py-1.5 rounded-full text-sm ${isDarkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200'} ${theme?.textColors?.secondary || (isDarkMode ? 'text-gray-300' : 'text-gray-700')} transition-colors`}
                >
                  {tag.name}
                  <span className="text-xs ml-1 opacity-60">({tag.count})</span>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Books List */}
        <BookListByTag books={books} tagName={tagName} language={language} />
      </div>
    </div>
  );
}