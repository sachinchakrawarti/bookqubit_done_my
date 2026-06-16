"use client";

import { useTheme } from "@/themes/useTheme";
import { useFont } from "@/contexts/FontContext";
import "./MiddleContent.css";

export default function MiddleContent({ children }) {
  const { theme, themeName } = useTheme();
  const { currentFont } = useFont();

  // Check if current theme is dark mode
  const isDarkMode =
    themeName === "dark" ||
    themeName === "midnight" ||
    themeName === "cyberpunk";

  // Get theme-aware styles
  const primaryText = theme.textColors?.primary || (isDarkMode ? "text-white" : "text-gray-900");
  const secondaryText = theme.textColors?.secondary || (isDarkMode ? "text-gray-400" : "text-gray-600");
  const sectionBg = theme.background?.section || (isDarkMode ? "bg-gray-900" : "bg-gray-50");

  return (
    <main className={`drift-middle-content ${sectionBg} ${themeName}`} style={{ fontFamily: currentFont?.family }}>
      <div className="middle-content-container">
        {children}
      </div>
    </main>
  );
}