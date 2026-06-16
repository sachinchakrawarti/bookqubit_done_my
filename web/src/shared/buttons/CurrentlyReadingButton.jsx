"use client";

import React, { useState } from 'react';
import { useTheme } from '@/themes/useTheme';
import { useFont } from '@/contexts/FontContext';
import { FaBookOpen } from 'react-icons/fa';
import './buttons.css';

export default function CurrentlyReadingButton({ onClick, isReading = false, label = "Currently Reading", className = "", ...props }) {
  const { theme, themeName } = useTheme();
  const { currentFont } = useFont();

  const isDarkMode = themeName === "dark" || themeName === "midnight" || themeName === "cyberpunk";

  return (
    <button
      onClick={onClick}
      className={`currently-reading-btn ${isReading ? 'active' : ''} ${className}`}
      style={{ fontFamily: currentFont?.family }}
      {...props}
    >
      <FaBookOpen className="btn-icon" />
      <span>{isReading ? "Reading Now" : label}</span>
    </button>
  );
}