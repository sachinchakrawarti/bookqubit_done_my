// src/shared/user_dashboard/WantToReadTab/components/WantToReadStatsCard.jsx

"use client";

import React from "react";
import { useTheme } from "@/themes/useTheme";
import "./WantToReadStatsCard.css";

const WantToReadStatsCard = ({
  icon,
  value,
  label,
  color = "#f59e0b",
  className = "",
}) => {
  const { theme, themeName } = useTheme();

  const isDarkMode =
    themeName === "dark" ||
    themeName === "midnight" ||
    themeName === "cyberpunk";

  return (
    <div
      className={`want-to-read-stats-card ${isDarkMode ? "dark" : ""} ${className}`}
      style={{
        backgroundColor: isDarkMode ? "#1e1e2e" : "#ffffff",
        borderColor: isDarkMode ? "#2d2d44" : "#e5e7eb",
      }}
    >
      <div
        className="stats-icon"
        style={{
          color: color,
          backgroundColor: `${color}15`,
        }}
      >
        {icon}
      </div>
      <div className="stats-info">
        <span
          className="stats-value"
          style={{
            color: isDarkMode ? "#ffffff" : "#1f2937",
          }}
        >
          {value}
        </span>
        <span
          className="stats-label"
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

export default WantToReadStatsCard;
