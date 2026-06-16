"use client";

import React from 'react';
import { useTheme } from '@/themes/useTheme';
import { useFont } from '@/contexts/FontContext';
import { FaInfoCircle } from 'react-icons/fa';
import './buttons.css';

export default function KnowMoreButton({ onClick, label = "Know More", className = "", ...props }) {
  const { theme, themeName } = useTheme();
  const { currentFont } = useFont();

  const isDarkMode = themeName === "dark" || themeName === "midnight" || themeName === "cyberpunk";

  return (
    <button
      onClick={onClick}
      className={`know-more-btn ${className}`}
      style={{ fontFamily: currentFont?.family }}
      {...props}
    >
      <FaInfoCircle className="btn-icon" />
      <span>{label}</span>
    </button>
  );
}