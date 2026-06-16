"use client";

import React, { useState } from 'react';
import { useTheme } from '@/themes/useTheme';
import { useFont } from '@/contexts/FontContext';
import { FaCheckCircle } from 'react-icons/fa';
import './buttons.css';

export default function MarkedReadButton({ onClick, isRead = false, label = "Mark as Read", className = "", ...props }) {
  const { theme, themeName } = useTheme();
  const { currentFont } = useFont();

  const isDarkMode = themeName === "dark" || themeName === "midnight" || themeName === "cyberpunk";

  return (
    <button
      onClick={onClick}
      className={`marked-read-btn ${isRead ? 'read' : ''} ${className}`}
      style={{ fontFamily: currentFont?.family }}
      {...props}
    >
      <FaCheckCircle className="btn-icon" />
      <span>{isRead ? "Read ✓" : label}</span>
    </button>
  );
}