"use client";

import "./user-dashboard-mobile.css";
import { useState, useEffect } from "react";
import { useTheme } from "@/themes/useTheme";
import { useFont } from "@/contexts/FontContext";
import { useRTL } from "@/contexts/RTLContext";
import MobileBottomNav from "./components/MobileBottomNav";
import MobileHeader from "./components/MobileHeader";
import {
  OverviewTab,
  CurrentlyReadingTab,
  MarkedReadTab,
  WantToReadTab,
  LikedBooksTab,
  CommentsTab,
  ReviewsTab,
  ReadingStatsTab,
  BookmarksTab,
  FollowersTab,
  FollowingTab,
  SettingsTab,
} from "./tab";

export default function UserDashboardMobile() {
  const { theme, themeName } = useTheme();
  const { currentFont } = useFont();
  const { direction } = useRTL();
  const [activeMenu, setActiveMenu] = useState("overview");
  const [mounted, setMounted] = useState(false);
  const [showDrawer, setShowDrawer] = useState(false);

  // Check if current theme is dark mode
  const isDarkMode =
    themeName === "dark" ||
    themeName === "midnight" ||
    themeName === "cyberpunk";

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const fontStyle = currentFont?.family ? {
    fontFamily: currentFont.family
  } : {};

  const renderContent = () => {
    switch (activeMenu) {
      case "overview":
        return <OverviewTab />;
      case "currently_reading":
        return <CurrentlyReadingTab />;
      case "marked_read":
        return <MarkedReadTab />;
      case "want_to_read":
        return <WantToReadTab />;
      case "liked_books":
        return <LikedBooksTab />;
      case "comments":
        return <CommentsTab />;
      case "reviews":
        return <ReviewsTab />;
      case "reading_stats":
        return <ReadingStatsTab />;
      case "bookmarks":
        return <BookmarksTab />;
      case "followers":
        return <FollowersTab />;
      case "following":
        return <FollowingTab />;
      case "settings":
        return <SettingsTab />;
      default:
        return <OverviewTab />;
    }
  };

  return (
    <div
      dir={direction}
      style={fontStyle}
      className={`dashboard-mobile ${themeName}`}
    >
      <MobileHeader 
        activeMenu={activeMenu}
        onMenuToggle={() => setShowDrawer(!showDrawer)}
      />

      {showDrawer && (
        <>
          <div 
            className="drawer-overlay" 
            onClick={() => setShowDrawer(false)}
          />
          <div className="drawer-sidebar">
            <div className="drawer-header">
              <h3>Menu</h3>
              <button 
                className="close-drawer"
                onClick={() => setShowDrawer(false)}
              >
                ✕
              </button>
            </div>
            {/* Add your drawer menu items here */}
          </div>
        </>
      )}

      <main className={`mobile-content ${theme.background?.page || (isDarkMode ? "bg-gray-900" : "bg-gray-50")}`}>
        {renderContent()}
      </main>

      <MobileBottomNav 
        activeMenu={activeMenu} 
        setActiveMenu={setActiveMenu} 
      />
    </div>
  );
}