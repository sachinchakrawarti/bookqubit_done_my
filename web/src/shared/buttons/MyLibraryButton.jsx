"use client";

import React from 'react';
import { useTheme } from '@/themes/useTheme';
import { useFont } from '@/contexts/FontContext';
import { FaBooks } from 'react-icons/fa';
import './buttons.css';

export default function MyLibraryButton({ onClick, label = "My Library", className = "", ...props }) {
  const { theme, themeName } = useTheme();
  const { currentFont } = useFont();

  const isDarkMode = themeName === "dark" || themeName === "midnight" || themeName === "cyberpunk";

  return (
    <button
      onClick={onClick}
      className={`my-library-btn ${className}`}
      style={{ fontFamily: currentFont?.family }}
      {...props}
    >
      <FaBooks className="btn-icon" />
      <span>{label}</span>
    </button>
  );
}