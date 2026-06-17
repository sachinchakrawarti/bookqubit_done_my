// src/shared/user_dashboard/MarkedReadTab/components/StatsCard.jsx

"use client";

import React from "react";
import { useTheme } from "@/themes/useTheme";
import "./StatsCard.css";

const StatsCard = ({ icon, value, label, className = "" }) => {
  const { theme, themeName } = useTheme();

  // Check if current theme is dark mode
  const isDarkMode =
    themeName === "dark" ||
    themeName === "midnight" ||
    themeName === "cyberpunk";

  // Theme helper functions (following Navbar_Desktop_First_Row pattern)
  const getCardBackground = () => {
    return theme.background?.card || (isDarkMode ? "bg-gray-800" : "bg-white");
  };

  const getCardBorder = () => {
    return (
      theme.border?.default || "border border-gray-200 dark:border-gray-700"
    );
  };

  const getTextPrimary = () => {
    return (
      theme.textColors?.primary || (isDarkMode ? "text-white" : "text-gray-900")
    );
  };

  const getTextSecondary = () => {
    return (
      theme.textColors?.secondary ||
      (isDarkMode ? "text-gray-400" : "text-gray-600")
    );
  };

  const getIconPrimary = () => {
    return theme.iconColors?.primary || "text-sky-500";
  };

  const getIconBgColor = () => {
    // Get the color value without the 'text-' prefix for background
    const color = theme.iconColors?.primary || "#3b82f6";
    // If it's a Tailwind class, we need to handle it differently
    // For simplicity, we'll use a generic approach
    return "bg-opacity-10";
  };

  return (
    <div
      className={`mr-stat-card ${getCardBackground()} ${getCardBorder()} ${className}`}
    >
      <div className={`mr-stat-icon ${getIconPrimary()} bg-opacity-10`}>
        {icon}
      </div>
      <div className="mr-stat-info">
        <span className={`mr-stat-value ${getTextPrimary()}`}>{value}</span>
        <span className={`mr-stat-label ${getTextSecondary()}`}>{label}</span>
      </div>
    </div>
  );
};

export default StatsCard;
