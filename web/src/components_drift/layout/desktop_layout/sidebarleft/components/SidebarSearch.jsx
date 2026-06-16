"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FaSearch, FaTimes, FaUser, FaBook, FaHashtag } from "react-icons/fa";
import { useTheme } from "@/themes/useTheme";
import { useLanguage } from "@/contexts/LanguageContext";
import "./SidebarSearch.css";

export default function SidebarSearch({ isCollapsed, onClose, placeholder }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const searchRef = useRef(null);
  const inputRef = useRef(null);
  const router = useRouter();
  const { theme, themeName } = useTheme();
  const { td } = useLanguage(); // Drift translations

  // Check if current theme is dark mode
  const isDarkMode = themeName === "dark" || themeName === "midnight" || themeName === "cyberpunk";

  // Get theme-aware styles
  const primaryText = theme.textColors?.primary || (isDarkMode ? "text-white" : "text-gray-900");
  const secondaryText = theme.textColors?.secondary || (isDarkMode ? "text-gray-400" : "text-gray-600");
  const highlightText = theme.textColors?.highlight || (isDarkMode ? "text-sky-400" : "text-sky-600");
  const hoverBg = theme.background?.hover || (isDarkMode ? "bg-gray-700/50" : "bg-gray-100");
  const inputBg = theme.background?.input || (isDarkMode ? "bg-gray-700/50" : "bg-gray-100");
  const cardBg = theme.background?.card || (isDarkMode ? "bg-gray-800" : "bg-white");
  const primaryButtonBg = theme.buttonColors?.primaryButton?.background || "bg-gradient-to-r from-sky-600 to-sky-500";

  // Mock search data - Replace with actual API call
  const searchData = [
    // Users
    { id: 1, type: "user", name: "Priyal Shrivatava", username: "priyal._.shrivatava", avatar: "https://ui-avatars.com/api/?name=Priyal+Shrivatava&background=8b5cf6&color=fff" },
    { id: 2, type: "user", name: "Sachin Chakrawarti", username: "sachin._.chakrawarti", avatar: "https://ui-avatars.com/api/?name=Sachin+Chakrawarti&background=3b82f6&color=fff" },
    { id: 3, type: "user", name: "Shraddha Kapoor", username: "shraddha._.kapoor", avatar: "https://ui-avatars.com/api/?name=Shraddha+Kapoor&background=10b981&color=fff" },
    { id: 4, type: "user", name: "Ishani Krishna", username: "ishani._.krishna", avatar: "https://ui-avatars.com/api/?name=Ishani+Krishna&background=ef4444&color=fff" },
    { id: 5, type: "user", name: "Hania Amir", username: "hania._.amir", avatar: "https://ui-avatars.com/api/?name=Hania+Amir&background=ec4899&color=fff" },
    { id: 6, type: "user", name: "Aarav Sharma", username: "aarav._.sharma", avatar: "https://ui-avatars.com/api/?name=Aarav+Sharma&background=1e293b&color=fff" },
    { id: 7, type: "user", name: "Ananya Reddy", username: "ananya._.reddy", avatar: "https://ui-avatars.com/api/?name=Ananya+Reddy&background=dc2626&color=fff" },
    { id: 8, type: "user", name: "Vikram Singh", username: "vikram._.singh", avatar: "https://ui-avatars.com/api/?name=Vikram+Singh&background=7c3aed&color=fff" },
    { id: 9, type: "user", name: "Kavya Nair", username: "kavya._.nair", avatar: "https://ui-avatars.com/api/?name=Kavya+Nair&background=0891b2&color=fff" },
    { id: 10, type: "user", name: "Rohan Gupta", username: "rohan._.gupta", avatar: "https://ui-avatars.com/api/?name=Rohan+Gupta&background=0f766e&color=fff" },
    // Books
    { id: 11, type: "book", name: "The Silent Patient", author: "Alex Michaelides", cover: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=50" },
    { id: 12, type: "book", name: "Atomic Habits", author: "James Clear", cover: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=50" },
    { id: 13, type: "book", name: "Dune", author: "Frank Herbert", cover: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=50" },
    { id: 14, type: "book", name: "It Ends with Us", author: "Colleen Hoover", cover: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=50" },
    { id: 15, type: "book", name: "The Great Gatsby", author: "F. Scott Fitzgerald", cover: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=50" },
    { id: 16, type: "book", name: "1984", author: "George Orwell", cover: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=50" },
    // Tags
    { id: 17, type: "tag", name: "#BookLovers" },
    { id: 18, type: "tag", name: "#DriftCommunity" },
    { id: 19, type: "tag", name: "#NewReleases" },
    { id: 20, type: "tag", name: "#ReadingList" },
    { id: 21, type: "tag", name: "#BookRecommendations" },
    { id: 22, type: "tag", name: "#ReadingChallenge" },
  ];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowResults(false);
        setIsFocused(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (isCollapsed && showResults) {
      setShowResults(false);
    }
  }, [isCollapsed]);

  const handleSearch = (query) => {
    setSearchQuery(query);
    if (query.trim().length > 0) {
      setIsSearching(true);
      setShowResults(true);
      const results = searchData.filter(item => {
        const searchTerm = query.toLowerCase();
        return (
          item.name.toLowerCase().includes(searchTerm) ||
          (item.author && item.author.toLowerCase().includes(searchTerm)) ||
          (item.username && item.username.toLowerCase().includes(searchTerm))
        );
      });
      setSearchResults(results.slice(0, 8));
    } else {
      setIsSearching(false);
      setShowResults(false);
      setSearchResults([]);
    }
  };

  const handleClearSearch = () => {
    setSearchQuery("");
    setSearchResults([]);
    setShowResults(false);
    setIsSearching(false);
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const handleResultClick = (result) => {
    setShowResults(false);
    setSearchQuery("");
    setSearchResults([]);
    if (result.type === "user") {
      router.push(`/${result.username}`);
    } else if (result.type === "book") {
      router.push(`/books/${result.name.toLowerCase().replace(/\s+/g, '-')}`);
    } else if (result.type === "tag") {
      router.push(`/drift/tag/${result.name.slice(1)}`);
    }
    if (onClose) onClose();
  };

  const getIcon = (type) => {
    switch (type) {
      case "user": return <FaUser className="result-icon" />;
      case "book": return <FaBook className="result-icon" />;
      case "tag": return <FaHashtag className="result-icon" />;
      default: return null;
    }
  };

  // Collapsed state - shows search icon only
  if (isCollapsed) {
    return (
      <div className="sidebar-search-collapsed">
        <Link 
          href="/drift/search" 
          className={`search-icon-btn ${primaryButtonBg} text-white hover:scale-110 transition-transform`}
        >
          <FaSearch />
        </Link>
      </div>
    );
  }

  return (
    <div className="sidebar-search-container" ref={searchRef}>
      <div className={`search-input-wrapper ${isFocused ? "focused" : ""} ${inputBg}`}>
        <FaSearch className={`search-icon ${secondaryText}`} />
        <input
          ref={inputRef}
          type="text"
          placeholder={placeholder || td("searchPlaceholder")}
          value={searchQuery}
          onChange={(e) => handleSearch(e.target.value)}
          onFocus={() => {
            setIsFocused(true);
            if (searchQuery.trim().length > 0) {
              setShowResults(true);
            }
          }}
          className={`search-input ${primaryText}`}
        />
        {searchQuery && (
          <button 
            className="clear-search-btn" 
            onClick={handleClearSearch}
            aria-label={td("clearSearch") || "Clear search"}
          >
            <FaTimes />
          </button>
        )}
      </div>

      {showResults && (
        <div className={`search-results-dropdown ${cardBg} ${theme.border?.default || "border border-gray-200 dark:border-gray-700"}`}>
          {isSearching && searchResults.length === 0 ? (
            <div className="search-no-results">
              <p className={primaryText}>{td("noResults") || `No results found for "{searchQuery}"`}</p>
              <span className={secondaryText}>{td("trySearching") || "Try searching for people, books, or tags"}</span>
            </div>
          ) : (
            <>
              {searchResults.map((result) => (
                <div
                  key={result.id}
                  className={`search-result-item hover:${hoverBg}`}
                  onClick={() => handleResultClick(result)}
                >
                  <div className="result-icon-wrapper">
                    {result.type === "user" ? (
                      <img src={result.avatar} alt={result.name} className="result-avatar" />
                    ) : result.type === "book" ? (
                      <img src={result.cover} alt={result.name} className="result-cover" />
                    ) : (
                      <span className={`result-icon ${highlightText}`}>
                        {getIcon(result.type)}
                      </span>
                    )}
                  </div>
                  <div className="result-info">
                    <div className={`result-name ${primaryText}`}>{result.name}</div>
                    <div className={`result-details ${secondaryText}`}>
                      {result.type === "user" && result.username && (
                        <span className="result-username">@{result.username}</span>
                      )}
                      {result.type === "book" && result.author && (
                        <span className="result-author">by {result.author}</span>
                      )}
                      {result.type === "tag" && (
                        <span className="result-tag">{td("trendingTag") || "Trending tag"}</span>
                      )}
                    </div>
                  </div>
                  <span className={`result-type-badge ${primaryButtonBg} text-white`}>
                    {td(result.type) || result.type}
                  </span>
                </div>
              ))}
              {searchResults.length > 0 && (
                <div className={`search-view-all ${isDarkMode ? "border-gray-700" : "border-gray-200"} border-t`}>
                  <Link 
                    href={`/drift/search?q=${encodeURIComponent(searchQuery)}`}
                    className={`${highlightText} hover:underline`}
                  >
                    {td("viewAllResults") || "View all results"} →
                  </Link>
                </div>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
}
