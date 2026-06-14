"use client";

import React from "react";

const StatsChart = ({ data, variant = "full" }) => {
  if (!data || data.length === 0) return null;

  const maxBooks = Math.max(...data.map(d => d.books));
  const maxPages = Math.max(...data.map(d => d.pages));

  if (variant === "mobile") {
    return (
      <div className="stats-chart-mobile">
        {data.map((item, idx) => (
          <div key={idx} className="chart-bar-mobile">
            <div className="chart-label">{item.month}</div>
            <div className="bar-container">
              <div 
                className="bar-books"
                style={{ width: `${(item.books / maxBooks) * 100}%`, height: "4px" }}
              />
            </div>
            <div className="chart-value">{item.books} books</div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="stats-chart">
      <div className="chart-bars">
        {data.map((item, idx) => (
          <div key={idx} className="chart-bar-group">
            <div className="chart-bar-container">
              <div 
                className="chart-bar-books"
                style={{ height: `${(item.books / maxBooks) * 100}%` }}
              >
                <span className="bar-value">{item.books}</span>
              </div>
              <div 
                className="chart-bar-pages"
                style={{ height: `${(item.pages / maxPages) * 100}%` }}
              >
                <span className="bar-value">{item.pages}</span>
              </div>
            </div>
            <div className="chart-label">{item.month}</div>
          </div>
        ))}
      </div>
      <div className="chart-legend">
        <div className="legend-item">
          <div className="legend-color books"></div>
          <span>Books Read</span>
        </div>
        <div className="legend-item">
          <div className="legend-color pages"></div>
          <span>Pages Read</span>
        </div>
      </div>
    </div>
  );
};

export default StatsChart;