"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useTheme } from "@/themes/useTheme";
import { useFont } from "@/contexts/FontContext";
import { useRTL } from "@/contexts/RTLContext";
import { 
  FiGrid, 
  FiBookOpen, 
  FiCheckCircle, 
  FiStar, 
  FiHeart, 
  FiMessageCircle, 
  FiEdit2, 
  FiBarChart2, 
  FiUser,
  FiChevronDown,
} from "react-icons/fi";
import "./MobileTopNav.css";

export default function MobileTopNav() {
  const router = useRouter();
  const { theme, themeName } = useTheme();
  const { currentFont } = useFont();
  const { direction } = useRTL();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Check if current theme is dark mode
  const isDarkMode =
    themeName === "dark" ||
    themeName === "midnight" ||
    themeName === "cyberpunk";

  const menuItems = [
    { id: "overview", label: "Overview", icon: FiGrid, path: "/user-dashboard" },
    { id: "currently_reading", label: "Currently Reading", icon: FiBookOpen, path: "/user-dashboard?tab=currently_reading" },
    { id: "marked_read", label: "Marked Read", icon: FiCheckCircle, path: "/user-dashboard?tab=marked_read" },
    { id: "want_to_read", label: "Want to Read", icon: FiStar, path: "/user-dashboard?tab=want_to_read" },
    { id: "liked_books", label: "Liked Books", icon: FiHeart, path: "/user-dashboard?tab=liked_books" },
    { id: "comments", label: "Comments", icon: FiMessageCircle, path: "/user-dashboard?tab=comments" },
    { id: "reviews", label: "Reviews", icon: FiEdit2, path: "/user-dashboard?tab=reviews" },
    { id: "reading_stats", label: "Reading Stats", icon: FiBarChart2, path: "/user-dashboard?tab=reading_stats" },
    { id: "profile", label: "Profile", icon: FiUser, path: "/profile" },
  ];

  // Get current page label from URL
  const getCurrentLabel = () => {
    const path = window.location.pathname;
    const tab = new URLSearchParams(window.location.search).get('tab');
    
    if (path === '/profile') return 'Profile';
    if (tab === 'currently_reading') return 'Currently Reading';
    if (tab === 'marked_read') return 'Marked Read';
    if (tab === 'want_to_read') return 'Want to Read';
    if (tab === 'liked_books') return 'Liked Books';
    if (tab === 'comments') return 'Comments';
    if (tab === 'reviews') return 'Reviews';
    if (tab === 'reading_stats') return 'Reading Stats';
    return 'Overview';
  };

  const currentLabel = getCurrentLabel();
  const currentIcon = menuItems.find(item => item.label === currentLabel)?.icon || FiGrid;
  const CurrentIcon = currentIcon;

  const handleMenuClick = (path) => {
    setIsDropdownOpen(false);
    router.push(path);
  };

  // Apply font family inline style
  const fontStyle = currentFont?.family ? {
    fontFamily: currentFont.family
  } : {};

  return (
    <div 
      dir={direction}
      style={fontStyle}
      className={`mobile-top-nav ${themeName}`}
    >
      {/* Dropdown Trigger Button */}
      <button 
        className="mobile-nav-trigger"
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
      >
        <CurrentIcon size={20} />
        <span className={`nav-label ${theme.textColors?.primary || (isDarkMode ? "text-white" : "text-gray-900")}`}>
          {currentLabel}
        </span>
        <FiChevronDown className={`dropdown-arrow ${isDropdownOpen ? "open" : ""}`} />
      </button>

      {/* Dropdown Menu */}
      {isDropdownOpen && (
        <>
          <div className="mobile-dropdown-overlay" onClick={() => setIsDropdownOpen(false)} />
          <div className={`mobile-dropdown ${themeName}`}>
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = item.label === currentLabel;
              
              return (
                <button
                  key={item.id}
                  className={`mobile-dropdown-item ${isActive ? "active" : ""}`}
                  onClick={() => handleMenuClick(item.path)}
                >
                  <Icon size={18} />
                  <span>{item.label}</span>
                  {isActive && <span className="active-check">✓</span>}
                </button>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}