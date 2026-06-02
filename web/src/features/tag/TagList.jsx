"use client";

import { useState } from "react";
import { useTheme } from "@/themes/useTheme";
import { useLanguage } from "@/contexts/LanguageContext";
import { useTagData } from "./hooks/useTagData";
import TagCard from "./components/TagCard";
import TagCloud from "./components/TagCloud";

export default function TagList() {
  const { theme, themeName } = useTheme();
  const { language } = useLanguage();
  const { allTags, loading, error, searchTags, getTagStats } = useTagData(language);
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState("grid"); // grid, cloud

  const isDarkMode = themeName === 'dark' || themeName === 'midnight' || themeName === 'cyberpunk';
  
  const filteredTags = searchTags(searchQuery);
  const tagStats = getTagStats();

  if (loading) {
    return (
      <div className={`min-h-screen ${theme?.background?.section || (isDarkMode ? 'bg-gray-900' : 'bg-gray-50')} py-12 px-4`}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-sky-600"></div>
            <p className={`mt-4 ${theme?.textColors?.secondary || (isDarkMode ? 'text-gray-400' : 'text-gray-600')}`}>
              Loading tags...
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`min-h-screen ${theme?.background?.section || (isDarkMode ? 'bg-gray-900' : 'bg-gray-50')} py-12 px-4`}>
        <div className="max-w-7xl mx-auto text-center">
          <div className="text-red-600 mb-4">⚠️ Error loading tags</div>
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
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className={`text-4xl font-bold ${theme?.textColors?.primary || (isDarkMode ? 'text-white' : 'text-gray-900')} mb-4`}>
            Book Tags
          </h1>
          <p className={`text-lg ${theme?.textColors?.secondary || (isDarkMode ? 'text-gray-400' : 'text-gray-600')} max-w-2xl mx-auto`}>
            Discover books by tags and topics. Find your next favorite read based on themes that interest you.
          </p>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className={`${theme?.background?.section || (isDarkMode ? 'bg-gray-800' : 'bg-white')} rounded-xl p-4 text-center shadow-lg`}>
            <div className="text-2xl font-bold text-sky-600">{tagStats.totalTags}</div>
            <div className={`text-sm ${theme?.textColors?.secondary || (isDarkMode ? 'text-gray-400' : 'text-gray-600')}`}>Total Tags</div>
          </div>
          <div className={`${theme?.background?.section || (isDarkMode ? 'bg-gray-800' : 'bg-white')} rounded-xl p-4 text-center shadow-lg`}>
            <div className="text-2xl font-bold text-sky-600">{tagStats.totalTaggedBooks}</div>
            <div className={`text-sm ${theme?.textColors?.secondary || (isDarkMode ? 'text-gray-400' : 'text-gray-600')}`}>Tagged Books</div>
          </div>
          <div className={`${theme?.background?.section || (isDarkMode ? 'bg-gray-800' : 'bg-white')} rounded-xl p-4 text-center shadow-lg`}>
            <div className="text-2xl font-bold text-sky-600">{tagStats.avgTagsPerBook}</div>
            <div className={`text-sm ${theme?.textColors?.secondary || (isDarkMode ? 'text-gray-400' : 'text-gray-600')}`}>Avg Tags/Book</div>
          </div>
          <div className={`${theme?.background?.section || (isDarkMode ? 'bg-gray-800' : 'bg-white')} rounded-xl p-4 text-center shadow-lg`}>
            <div className="text-2xl font-bold text-sky-600">{tagStats.mostPopularTag || 'N/A'}</div>
            <div className={`text-sm ${theme?.textColors?.secondary || (isDarkMode ? 'text-gray-400' : 'text-gray-600')}`}>Most Popular</div>
          </div>
        </div>

        {/* Search and Filter Bar */}
        <div className={`mb-8 p-6 ${theme?.background?.section || (isDarkMode ? 'bg-gray-800' : 'bg-white')} rounded-xl shadow-lg`}>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <input
                type="text"
                placeholder="Search tags..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={`w-full px-4 py-3 rounded-lg ${theme?.background?.input || (isDarkMode ? 'bg-gray-700' : 'bg-gray-100')} ${theme?.textColors?.primary || (isDarkMode ? 'text-white' : 'text-gray-900')} border ${theme?.border?.default || (isDarkMode ? 'border-gray-600' : 'border-gray-300')} focus:outline-none focus:ring-2 focus:ring-sky-500`}
                placeholder="e.g., Fiction, Mystery, AI..."
              />
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setViewMode("grid")}
                className={`px-4 py-2 rounded-lg transition-all ${viewMode === "grid" ? (theme?.buttonColors?.primaryButton?.background || 'bg-sky-600') + ' text-white' : (theme?.buttonColors?.secondaryButton?.background || 'border-2 border-sky-500') + ' ' + (theme?.buttonColors?.secondaryButton?.textColor || 'text-sky-600')}`}
              >
                Grid View
              </button>
              <button
                onClick={() => setViewMode("cloud")}
                className={`px-4 py-2 rounded-lg transition-all ${viewMode === "cloud" ? (theme?.buttonColors?.primaryButton?.background || 'bg-sky-600') + ' text-white' : (theme?.buttonColors?.secondaryButton?.background || 'border-2 border-sky-500') + ' ' + (theme?.buttonColors?.secondaryButton?.textColor || 'text-sky-600')}`}
              >
                Tag Cloud
              </button>
            </div>
          </div>
          
          {searchQuery && (
            <div className="mt-4">
              <p className={`text-sm ${theme?.textColors?.secondary || (isDarkMode ? 'text-gray-400' : 'text-gray-600')}`}>
                Found {filteredTags.length} tag{filteredTags.length !== 1 ? 's' : ''} matching "{searchQuery}"
              </p>
            </div>
          )}
        </div>

        {/* Tags Display */}
        {filteredTags.length === 0 ? (
          <div className={`text-center py-12 ${theme?.background?.section || (isDarkMode ? 'bg-gray-800' : 'bg-white')} rounded-xl`}>
            <p className={`text-lg ${theme?.textColors?.secondary || (isDarkMode ? 'text-gray-400' : 'text-gray-600')}`}>
              No tags found matching your search.
            </p>
          </div>
        ) : viewMode === "grid" ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredTags.map((tag) => (
              <TagCard key={tag.name} tag={tag} language={language} />
            ))}
          </div>
        ) : (
          <div className={`${theme?.background?.section || (isDarkMode ? 'bg-gray-800' : 'bg-white')} rounded-xl shadow-lg`}>
            <TagCloud tags={filteredTags} language={language} />
          </div>
        )}
      </div>
    </div>
  );
}