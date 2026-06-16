"use client";

import React from 'react';
import { useTheme } from '@/themes/useTheme';
import { useFont } from '@/contexts/FontContext';
import { FaFileAlt } from 'react-icons/fa';
import './buttons.css';

export default function SummaryButton({ onClick, label = "Summary", className = "", ...props }) {
  const { theme, themeName } = useTheme();
  const { currentFont } = useFont();

  const isDarkMode = themeName === "dark" || themeName === "midnight" || themeName === "cyberpunk";

  return (
    <button
      onClick={onClick}
      className={`summary-btn ${className}`}
      style={{ fontFamily: currentFont?.family }}
      {...props}
    >
      <FaFileAlt className="btn-icon" />
      <span>{label}</span>
    </button>
  );
}