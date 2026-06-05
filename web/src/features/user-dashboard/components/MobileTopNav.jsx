"use client";

import { useState, useEffect } from "react";
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
import { useTheme } from "@/themes/useTheme";
import "./MobileTopNav.css";

export default function MobileTopNav({ activeMenu, setActiveMenu }) {
  const { theme, themeName } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isDarkMode = themeName === "dark" || themeName === "midnight" || themeName === "cyberpunk";

  const menuItems = [
    { id: "overview", label: "Overview", icon: FiGrid },
    { id: "currently_reading", label: "Currently Reading", icon: FiBookOpen },
    { id: "marked_read", label: "Marked Read", icon: FiCheckCircle },
    { id: "want_to_read", label: "Want to Read", icon: FiStar },
    { id: "liked_books", label: "Liked Books", icon: FiHeart },
    { id: "comments", label: "Comments", icon: FiMessageCircle },
    { id: "reviews", label: "Reviews", icon: FiEdit2 },
    { id: "reading_stats", label: "Reading Stats", icon: FiBarChart2 },
    { id: "profile", label: "Profile", icon: FiUser },
  ];

  const currentMenuItem = menuItems.find(item => item.id === activeMenu) || menuItems[0];
  const CurrentIcon = currentMenuItem.icon;

  const handleMenuClick = (menuId) => {
    setActiveMenu(menuId);
    setIsMenuOpen(false);
  };

  // Don't render until mounted to avoid hydration issues
  if (!mounted) {
    return null;
  }

  return (
    <>
      {/* Top Navigation Bar */}
      <div className={`mobile-top-nav ${themeName || "light"}`}>
        <div className="mobile-top-nav-container">
          <button 
            className="mobile-menu-trigger"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <CurrentIcon size={22} />
            <span className="mobile-current-label">
              {currentMenuItem.label}
            </span>
            <FiChevronDown size={16} className={`menu-arrow ${isMenuOpen ? "open" : ""}`} />
          </button>
        </div>
      </div>

      {/* Dropdown Menu */}
      {isMenuOpen && (
        <>
          <div className="mobile-menu-overlay" onClick={() => setIsMenuOpen(false)} />
          <div className={`mobile-dropdown-menu ${themeName || "light"}`}>
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeMenu === item.id;
              
              return (
                <button
                  key={item.id}
                  className={`mobile-menu-item ${isActive ? "active" : ""}`}
                  onClick={() => handleMenuClick(item.id)}
                >
                  <Icon size={20} />
                  <span>{item.label}</span>
                  {isActive && <span className="active-indicator"></span>}
                </button>
              );
            })}
          </div>
        </>
      )}
    </>
  );
}