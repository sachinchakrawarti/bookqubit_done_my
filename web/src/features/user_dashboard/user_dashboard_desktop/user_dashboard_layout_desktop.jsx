// src/features/user_dashboard/user_dashboard_desktop/user_dashboard_layout_desktop.jsx

"use client";

import { useState, useCallback } from "react";
import { useTheme } from "@/themes/useTheme";
import { useFont } from "@/contexts/FontContext";
import { useRTL } from "@/contexts/RTLContext";
import UserDashboardHeaderDesktop from "./components/user_dashboard_header_desktop";
import UserDashboardSliderDesktop from "./components/user_dashboard_slider_desktop";
import {
  CommentsTab,
  CurrentlyReadingTab,
  LikesTab,
  MarkedReadTab,
  ReadingStatsTab,
  ReviewsTab,
  WantToReadTab,
} from "@/shared/user_dashboard";
import "./user_dashboard_desktop.css";

export default function UserDashboardLayoutDesktop() {
  const { theme, themeName } = useTheme();
  const { currentFont } = useFont();
  const { direction } = useRTL();
  const [activeMenu, setActiveMenu] = useState("currently_reading");

  const isDarkMode =
    themeName === "dark" ||
    themeName === "midnight" ||
    themeName === "cyberpunk";

  const renderContent = useCallback(() => {
    switch (activeMenu) {
      case "currently_reading":
        return <CurrentlyReadingTab variant="full" />;
      case "marked_read":
        return <MarkedReadTab variant="full" />;
      case "want_to_read":
        return <WantToReadTab variant="full" />;
      case "reading_stats":
        return <ReadingStatsTab variant="full" />;
      case "comments":
        return <CommentsTab variant="full" />;
      case "likes":
        return <LikesTab variant="full" />;
      case "reviews":
        return <ReviewsTab variant="full" />;
      default:
        return <CurrentlyReadingTab variant="full" />;
    }
  }, [activeMenu]);

  const fontStyle = currentFont?.family
    ? { fontFamily: currentFont.family }
    : {};

  return (
    <div
      dir={direction}
      style={fontStyle}
      className={`dashboard-page ${themeName}`}
    >
      <UserDashboardHeaderDesktop />
      <div className="dashboard-main-layout">
        <UserDashboardSliderDesktop
          activeMenu={activeMenu}
          setActiveMenu={setActiveMenu}
        />
        <main
          className={`dashboard-content ${
            theme.background?.page ||
            (isDarkMode ? "bg-gray-900" : "bg-gray-50")
          }`}
        >
          {renderContent()}
        </main>
      </div>
    </div>
  );
}
