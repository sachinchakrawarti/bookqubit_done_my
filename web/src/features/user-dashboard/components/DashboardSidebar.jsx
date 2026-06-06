"use client";

import React from "react";
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
  FiLogOut,
} from "react-icons/fi";
import "./DashboardSidebar.css";

export default function DashboardSidebar({ activeMenu, setActiveMenu }) {
  const { theme, themeName } = useTheme();
  const { currentFont } = useFont();
  const { direction } = useRTL();

  // Check if current theme is dark mode
  const isDarkMode =
    themeName === "dark" ||
    themeName === "midnight" ||
    themeName === "cyberpunk";

  const primaryMenus = [
    { id: "overview", label: "Overview", icon: FiGrid, count: null },
    { id: "currently_reading", label: "Currently Reading", icon: FiBookOpen, count: 3 },
    { id: "marked_read", label: "Marked Read", icon: FiCheckCircle, count: 24 },
    { id: "want_to_read", label: "Want to Read", icon: FiStar, count: 12 },
    { id: "liked_books", label: "Liked Books", icon: FiHeart, count: 45 },
    { id: "comments", label: "Comments", icon: FiMessageCircle, count: 8 },
    { id: "reviews", label: "Reviews", icon: FiEdit2, count: 15 },
    { id: "reading_stats", label: "Reading Stats", icon: FiBarChart2, count: null },
  ];

  // Determine if the menu item is active
  const isActive = (menuId) => activeMenu === menuId;

  // Handle menu click
  const handleMenuClick = (menuId) => {
    setActiveMenu(menuId);
  };

  // Apply font family inline style
  const fontStyle = currentFont?.family ? {
    fontFamily: currentFont.family
  } : {};

  return (
    <aside
      dir={direction}
      style={fontStyle}
      className={`dashboard-sidebar desktop
        ${theme.background?.section || (isDarkMode ? "bg-gray-800" : "bg-white")}
        ${theme.border?.default || "border-r border-gray-200 dark:border-gray-700"}
        ${direction === 'rtl' ? 'rtl' : ''}
      `}
    >
      {/* Sidebar Header */}
      <div className="sidebar-header">
        <h3 className={`sidebar-title ${theme.textColors?.primary || (isDarkMode ? "text-white" : "text-gray-900")}`}>
          My Library
        </h3>
      </div>

      {/* Primary Menu */}
      <ul className="sidebar-menu">
        {primaryMenus.map((menu) => {
          const IconComponent = menu.icon;
          const active = isActive(menu.id);
          
          return (
            <li
              key={menu.id}
              className={`sidebar-menu-item ${active ? "active" : ""}`}
              onClick={() => handleMenuClick(menu.id)}
            >
              <span className={`menu-icon ${active ? "text-white" : (isDarkMode ? "text-gray-400" : "text-gray-500")}`}>
                <IconComponent size={20} />
              </span>
              <span className={`menu-label ${active ? "text-white" : (isDarkMode ? "text-white" : "text-gray-900")}`}>
                {menu.label}
              </span>
              {menu.count !== null && menu.count > 0 && (
                <span className={`menu-count ${active ? "bg-white/20 text-white" : (isDarkMode ? "bg-gray-700 text-gray-300" : "bg-gray-100 text-gray-600")}`}>
                  {menu.count}
                </span>
              )}
            </li>
          );
        })}
      </ul>

      {/* Sidebar Footer */}
      <div className={`sidebar-footer ${theme.border?.default || "border-t border-gray-200 dark:border-gray-700"}`}>
        <div className="user-info">
          <div className={`user-avatar ${theme.buttonColors?.primaryButton?.background || "bg-gradient-to-r from-sky-600 to-sky-500"} text-white`}>
            JD
          </div>
          <div className="user-details">
            <p className={`user-name ${theme.textColors?.primary || (isDarkMode ? "text-white" : "text-gray-900")}`}>
              John Doe
            </p>
            <small className={`user-email ${theme.textColors?.secondary || (isDarkMode ? "text-gray-400" : "text-gray-500")}`}>
              john@example.com
            </small>
          </div>
          <button className={`logout-btn ${theme.textColors?.secondary || (isDarkMode ? "text-gray-400 hover:text-red-400" : "text-gray-500 hover:text-red-500")}`}>
            <FiLogOut size={18} />
          </button>
        </div>
      </div>
    </aside>
  );
}