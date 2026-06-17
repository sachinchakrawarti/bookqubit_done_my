// src/shared/user_dashboard/LikesTab/components/LikedStatsCard.jsx

"use client";

import React from "react";
import { useTheme } from "@/themes/useTheme";
import "./LikedStatsCard.css";

const LikedStatsCard = ({
  icon,
  value,
  label,
  color = "#ef4444",
  className = "",
}) => {
  const { theme, themeName } = useTheme();

  const isDarkMode =
    themeName === "dark" ||
    themeName === "midnight" ||
    themeName === "cyberpunk";

  return (
    <div
      className={`liked-stats-card ${isDarkMode ? "dark" : ""} ${className}`}
      style={{
        backgroundColor: isDarkMode ? "#1e1e2e" : "#ffffff",
        borderColor: isDarkMode ? "#2d2d44" : "#e5e7eb",
      }}
    >
      <div
        className="liked-stats-icon"
        style={{
          color: color,
          backgroundColor: `${color}15`,
        }}
      >
        {icon}
      </div>
      <div className="liked-stats-info">
        <span
          className="liked-stats-value"
          style={{
            color: isDarkMode ? "#ffffff" : "#1f2937",
          }}
        >
          {value}
        </span>
        <span
          className="liked-stats-label"
          style={{
            color: isDarkMode ? "#9ca3af" : "#6b7280",
          }}
        >
          {label}
        </span>
      </div>
    </div>
  );
};

export default LikedStatsCard;
