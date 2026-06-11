"use client";

import "./user-dashboard-desktop.css";
import { useState, useEffect, useCallback } from "react";
import { useTheme } from "@/themes/useTheme";
import { useFont } from "@/contexts/FontContext";
import { useRTL } from "@/contexts/RTLContext";
import DashboardSidebar from "./components/DashboardSidebar";
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

export default function UserDashboardDesktop() {
  const { theme, themeName } = useTheme();
  const { currentFont } = useFont();
  const { direction } = useRTL();
  const [activeMenu, setActiveMenu] = useState("overview");
  const [mounted, setMounted] = useState(false);

  // Check if current theme is dark mode
  const isDarkMode =
    themeName === "dark" ||
    themeName === "midnight" ||
    themeName === "cyberpunk";

  useEffect(() => {
    setMounted(true);
  }, []);

  const renderContent = useCallback(() => {
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
  }, [activeMenu]);

  if (!mounted) return null;

  const fontStyle = currentFont?.family ? {
    fontFamily: currentFont.family
  } : {};

  return (
    <div
      dir={direction}
      style={fontStyle}
      className={`dashboard-page ${themeName}`}
    >
      <div className="dashboard-layout">
        <DashboardSidebar 
          activeMenu={activeMenu} 
          setActiveMenu={setActiveMenu} 
        />
        
        <main className={`dashboard-content ${theme.background?.page || (isDarkMode ? "bg-gray-900" : "bg-gray-50")}`}>
          {renderContent()}
        </main>
      </div>
    </div>
  );
}