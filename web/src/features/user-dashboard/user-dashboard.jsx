"use client";

import "./user-dashboard.css";
import { useState, useEffect } from "react";
import { useTheme } from "@/themes/useTheme";
import { useFont } from "@/contexts/FontContext";
import { useRTL } from "@/contexts/RTLContext";
import DashboardSidebar from "./components/DashboardSidebar";
import MobileTopNav from "./components/MobileTopNav";
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

export default function UserDashboard() {
  const { theme, themeName } = useTheme();
  const { currentFont } = useFont();
  const { direction } = useRTL();
  const [activeMenu, setActiveMenu] = useState("overview");
  const [isMobile, setIsMobile] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Check if current theme is dark mode
  const isDarkMode =
    themeName === "dark" ||
    themeName === "midnight" ||
    themeName === "cyberpunk";

  useEffect(() => {
    setMounted(true);
  }, []);

  // Check screen size for mobile view
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
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
      default:
        return <OverviewTab />;
    }
  };

  return (
    <div
      dir={direction}
      style={fontStyle}
      className={`dashboard-page ${themeName}`}
    >
      {/* Mobile Top Navigation - Only on mobile */}
      {isMobile && (
        <MobileTopNav 
          activeMenu={activeMenu} 
          setActiveMenu={setActiveMenu} 
        />
      )}

      <div className="dashboard-layout">
        {/* Desktop Sidebar - Only on desktop */}
        {!isMobile && (
          <DashboardSidebar 
            activeMenu={activeMenu} 
            setActiveMenu={setActiveMenu} 
          />
        )}
        
        <main className={`dashboard-content ${theme.background?.page || (isDarkMode ? "bg-gray-900" : "bg-gray-50")}`}>
          {renderContent()}
        </main>
      </div>
    </div>
  );
}