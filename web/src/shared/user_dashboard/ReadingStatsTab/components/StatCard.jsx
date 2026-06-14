"use client";

import React from "react";

const StatCard = ({ icon, value, label, trend, subValue, color = "#3b82f6" }) => {
  return (
    <div className="stat-card">
      <div className="stat-card-icon" style={{ color }}>
        {icon}
      </div>
      <div className="stat-card-content">
        <div className="stat-value">{value}</div>
        <div className="stat-label">{label}</div>
        {trend && (
          <div className={`stat-trend ${trend.startsWith("+") ? "positive" : "negative"}`}>
            {trend}
          </div>
        )}
        {subValue && <div className="stat-subvalue">{subValue}</div>}
      </div>
    </div>
  );
};

export default StatCard;