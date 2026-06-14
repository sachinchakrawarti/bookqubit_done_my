"use client";

import React from "react";

const StatsCard = ({ icon, value, label }) => {
  return (
    <div className="mr-stat-card">
      <div className="mr-stat-icon">{icon}</div>
      <div className="mr-stat-info">
        <span className="mr-stat-value">{value}</span>
        <span className="mr-stat-label">{label}</span>
      </div>
    </div>
  );
};

export default StatsCard;