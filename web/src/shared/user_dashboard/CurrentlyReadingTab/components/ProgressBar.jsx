"use client";

import React from "react";

const ProgressBar = ({ progress, size = "medium", showPercentage = false }) => {
  const getHeight = () => {
    switch (size) {
      case "small":
        return "4px";
      case "large":
        return "12px";
      default:
        return "8px";
    }
  };

  const getFontSize = () => {
    switch (size) {
      case "small":
        return "10px";
      case "large":
        return "14px";
      default:
        return "12px";
    }
  };

  return (
    <div className="progress-bar-container">
      <div className="progress-bar-wrapper">
        <div
          className="progress-bar-fill"
          style={{
            width: `${progress}%`,
            height: getHeight(),
          }}
        />
      </div>
      {showPercentage && (
        <span className="progress-percentage" style={{ fontSize: getFontSize() }}>
          {progress}% Complete
        </span>
      )}
    </div>
  );
};

export default ProgressBar;