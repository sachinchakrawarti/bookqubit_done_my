// src/shared/user_dashboard/CurrentlyReadingTab/components/StatsCard.jsx

"use client";

import React from "react";
import { useTheme } from "@/themes/useTheme";
import "./StatsCard.css";

const StatsCard = ({
  icon,
  value,
  label,
  color = "#3b82f6",
  className = "",
}) => {
  const { theme, themeName } = useTheme();

  const isDarkMode =
    themeName === "dark" ||
    themeName === "midnight" ||
    themeName === "cyberpunk";

  return (
    <div
      className={`cr-stats-card ${isDarkMode ? "dark" : ""} ${className}`}
      style={{
        backgroundColor: isDarkMode ? "#1e1e2e" : "#ffffff",
        borderColor: isDarkMode ? "#2d2d44" : "#e5e7eb",
      }}
    >
      <div
        className="cr-stats-icon"
        style={{
          color: color,
          backgroundColor: `${color}15`,
        }}
      >
        {icon}
      </div>
      <div className="cr-stats-info">
        <span
          className="cr-stats-value"
          style={{
            color: isDarkMode ? "#ffffff" : "#1f2937",
          }}
        >
          {value}
        </span>
        <span
          className="cr-stats-label"
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

export default StatsCard;
