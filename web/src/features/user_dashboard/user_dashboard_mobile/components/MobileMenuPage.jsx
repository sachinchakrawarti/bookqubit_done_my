"use client";

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
  FiLogOut,
} from "react-icons/fi";
import "./MobileMenuPage.css";

export default function MobileMenuPage() {
  const router = useRouter();
  const { theme, themeName } = useTheme();
  const { currentFont } = useFont();
  const { direction } = useRTL();

  // Check if current theme is dark mode
  const isDarkMode =
    themeName === "dark" ||
    themeName === "midnight" ||
    themeName === "cyberpunk";

  const menuItems = [
    { id: "overview", label: "Overview", icon: FiGrid, count: null, path: "/user-dashboard" },
    { id: "currently_reading", label: "Currently Reading", icon: FiBookOpen, count: 3, path: "/user-dashboard?tab=currently_reading" },
    { id: "marked_read", label: "Marked Read", icon: FiCheckCircle, count: 24, path: "/user-dashboard?tab=marked_read" },
    { id: "want_to_read", label: "Want to Read", icon: FiStar, count: 12, path: "/user-dashboard?tab=want_to_read" },
    { id: "liked_books", label: "Liked Books", icon: FiHeart, count: 45, path: "/user-dashboard?tab=liked_books" },
    { id: "comments", label: "Comments", icon: FiMessageCircle, count: 8, path: "/user-dashboard?tab=comments" },
    { id: "reviews", label: "Reviews", icon: FiEdit2, count: 15, path: "/user-dashboard?tab=reviews" },
    { id: "reading_stats", label: "Reading Stats", icon: FiBarChart2, count: null, path: "/user-dashboard?tab=reading_stats" },
  ];

  const handleMenuClick = (path) => {
    router.push(path);
  };

  const handleLogout = () => {
    router.push("/");
  };

  // Apply font family inline style
  const fontStyle = currentFont?.family ? {
    fontFamily: currentFont.family
  } : {};

  return (
    <div 
      dir={direction}
      style={fontStyle}
      className={`mobile-menu-page ${themeName}`}
    >
      {/* Header */}
      <div className="mobile-menu-header">
        <h1 className={`menu-title ${theme.textColors?.primary || (isDarkMode ? "text-white" : "text-gray-900")}`}>
          My Library
        </h1>
      </div>

      {/* Menu List */}
      <div className="mobile-menu-list">
        {menuItems.map((item) => {
          const Icon = item.icon;
          
          return (
            <button
              key={item.id}
              className={`mobile-menu-item ${themeName}`}
              onClick={() => handleMenuClick(item.path)}
            >
              <div className="menu-item-left">
                <span className={`menu-icon ${theme.iconColors?.primary || "text-sky-500"}`}>
                  <Icon size={22} />
                </span>
                <span className={`menu-label ${theme.textColors?.primary || (isDarkMode ? "text-white" : "text-gray-900")}`}>
                  {item.label}
                </span>
              </div>
              {item.count !== null && item.count > 0 && (
                <span className={`menu-count ${theme.background?.badge || (isDarkMode ? "bg-gray-700" : "bg-gray-100")} 
                  ${theme.textColors?.secondary || (isDarkMode ? "text-gray-300" : "text-gray-600")}`}>
                  {item.count}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Logout Button */}
      <div className="mobile-menu-footer">
        <button 
          className={`logout-button ${themeName}`}
          onClick={handleLogout}
        >
          <FiLogOut size={20} />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
}