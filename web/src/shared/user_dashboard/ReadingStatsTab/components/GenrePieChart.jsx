"use client";

import React, { useState } from "react";

const GenrePieChart = ({ data, variant = "full" }) => {
  const [hoveredGenre, setHoveredGenre] = useState(null);

  if (variant === "mobile") {
    return (
      <div className="genre-list-mobile">
        {data.map((genre, idx) => (
          <div key={idx} className="genre-item-mobile">
            <div className="genre-color" style={{ backgroundColor: genre.color }} />
            <div className="genre-info">
              <span className="genre-name">{genre.name}</span>
              <span className="genre-percentage">{genre.value}%</span>
            </div>
            <div className="genre-bar">
              <div 
                className="genre-bar-fill"
                style={{ width: `${genre.value}%`, backgroundColor: genre.color }}
              />
            </div>
          </div>
        ))}
      </div>
    );
  }

  // Calculate cumulative percentage for pie chart segments
  let cumulativeAngle = 0;
  const segments = data.map(genre => {
    const angle = (genre.value / 100) * 360;
    const startAngle = cumulativeAngle;
    cumulativeAngle += angle;
    return { ...genre, startAngle, angle };
  });

  const getCoordinates = (angle, radius = 100) => {
    const radian = (angle - 90) * Math.PI / 180;
    return {
      x: 150 + radius * Math.cos(radian),
      y: 150 + radius * Math.sin(radian),
    };
  };

  const describeArc = (startAngle, endAngle, radius = 100) => {
    const start = getCoordinates(startAngle, radius);
    const end = getCoordinates(endAngle, radius);
    const largeArcFlag = endAngle - startAngle > 180 ? 1 : 0;
    return `M ${start.x} ${start.y} A ${radius} ${radius} 0 ${largeArcFlag} 1 ${end.x} ${end.y}`;
  };

  return (
    <div className="genre-chart">
      <svg width="300" height="300" viewBox="0 0 300 300">
        {segments.map((segment, idx) => {
          const endAngle = segment.startAngle + segment.angle;
          const pathData = describeArc(segment.startAngle, endAngle);
          return (
            <g key={idx}>
              <path
                d={`${pathData} L 150 150 Z`}
                fill={segment.color}
                opacity={hoveredGenre === segment.name ? 0.8 : 1}
                onMouseEnter={() => setHoveredGenre(segment.name)}
                onMouseLeave={() => setHoveredGenre(null)}
                style={{ cursor: "pointer", transition: "opacity 0.2s" }}
              />
            </g>
          );
        })}
        <circle cx="150" cy="150" r="50" fill="white" />
      </svg>
      <div className="pie-legend">
        {data.map((genre, idx) => (
          <div 
            key={idx} 
            className="legend-item"
            onMouseEnter={() => setHoveredGenre(genre.name)}
            onMouseLeave={() => setHoveredGenre(null)}
          >
            <div className="legend-color" style={{ backgroundColor: genre.color }} />
            <div className="legend-info">
              <span className="legend-name">{genre.name}</span>
              <span className="legend-percentage">{genre.value}%</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GenrePieChart;