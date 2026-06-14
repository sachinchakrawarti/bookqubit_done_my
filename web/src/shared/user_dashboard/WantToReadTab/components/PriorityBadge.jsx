"use client";

import React from "react";

const PriorityBadge = ({ priority, size = "medium", className = "" }) => {
  const getPriorityConfig = () => {
    switch (priority) {
      case "high":
        return { label: "High Priority", color: "#ef4444", bg: "rgba(239, 68, 68, 0.1)" };
      case "medium":
        return { label: "Medium Priority", color: "#f59e0b", bg: "rgba(245, 158, 11, 0.1)" };
      case "low":
        return { label: "Low Priority", color: "#10b981", bg: "rgba(16, 185, 129, 0.1)" };
      default:
        return { label: "No Priority", color: "#6b7280", bg: "rgba(107, 114, 128, 0.1)" };
    }
  };

  const config = getPriorityConfig();
  const sizeStyles = size === "small" 
    ? { padding: "0.125rem 0.5rem", fontSize: "0.6rem" }
    : { padding: "0.25rem 0.75rem", fontSize: "0.7rem" };

  return (
    <span 
      className={`priority-badge ${className}`}
      style={{
        backgroundColor: config.bg,
        color: config.color,
        borderRadius: "9999px",
        fontWeight: "500",
        display: "inline-flex",
        alignItems: "center",
        gap: "0.25rem",
        ...sizeStyles,
      }}
    >
      <span className="priority-dot" style={{
        width: size === "small" ? "6px" : "8px",
        height: size === "small" ? "6px" : "8px",
        borderRadius: "50%",
        backgroundColor: config.color,
        display: "inline-block",
      }} />
      {config.label}
    </span>
  );
};

export default PriorityBadge;