"use client";

import "./user-dashboard.css";

import { useState } from "react";
import DashboardHeader from "./components/DashboardHeader";
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

export default function UserDashboard() {
  const [activeMenu, setActiveMenu] = useState("overview");

  // Render the appropriate tab component based on active menu
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
    <div className="dashboard-page">
      <DashboardHeader />
      <div className="dashboard-layout">
        <DashboardSidebar
          activeMenu={activeMenu}
          setActiveMenu={setActiveMenu}
        />
        <div className="dashboard-content">{renderContent()}</div>
      </div>
    </div>
  );
}
