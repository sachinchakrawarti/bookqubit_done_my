"use client";

import React from 'react';
import { useTheme } from '@/themes/useTheme';
import { useFont } from '@/contexts/FontContext';
import { FaShare } from 'react-icons/fa';
import './buttons.css';

export default function ShareButton({ onClick, label = "Share", className = "", ...props }) {
  const { theme, themeName } = useTheme();
  const { currentFont } = useFont();

  const isDarkMode = themeName === "dark" || themeName === "midnight" || themeName === "cyberpunk";

  return (
    <button
      onClick={onClick}
      className={`share-btn ${className}`}
      style={{ fontFamily: currentFont?.family }}
      {...props}
    >
      <FaShare className="btn-icon" />
      <span>{label}</span>
    </button>
  );
}