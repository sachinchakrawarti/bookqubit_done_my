// src/features/public_profile/components/ProfileStats.jsx
"use client";

import React from "react";
import { FiBookOpen, FiStar, FiUsers, FiHeart } from "react-icons/fi";

export default function ProfileStats({ stats }) {
  const statItems = [
    { icon: <FiBookOpen size={28} />, value: stats.booksRead, label: "Books Read", color: "#8b5cf6" },
    { icon: <FiStar size={28} />, value: stats.reviews, label: "Reviews", color: "#f59e0b" },
    { icon: <FiUsers size={28} />, value: stats.followers, label: "Followers", color: "#3b82f6" },
    { icon: <FiHeart size={28} />, value: stats.following, label: "Following", color: "#ef4444" },
  ];

  return (
    <div className="profile-stats-grid">
      {statItems.map((item, idx) => (
        <div key={idx} className="profile-stat-card">
          <div className="stat-icon" style={{ color: item.color }}>{item.icon}</div>
          <div className="stat-info">
            <strong>{item.value}</strong>
            <span>{item.label}</span>
          </div>
        </div>
      ))}
    </div>
  );
}