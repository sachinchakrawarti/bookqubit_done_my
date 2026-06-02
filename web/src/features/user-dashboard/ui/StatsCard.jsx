"use client";

import { useTheme } from "@/themes/useTheme";

export default function StatsCard({ title, value, icon, color, trend, trendValue, onClick }) {
  const { theme, themeName } = useTheme();
  const isDarkMode = themeName === 'dark' || themeName === 'midnight' || themeName === 'cyberpunk';

  return (
    <div 
      className={`stats-card ${onClick ? 'cursor-pointer' : ''}`}
      onClick={onClick}
      style={{
        backgroundColor: theme?.background?.section || (isDarkMode ? '#1f2937' : '#ffffff'),
        border: `1px solid ${theme?.border?.default || (isDarkMode ? '#374151' : '#e5e7eb')}`,
        borderRadius: theme?.border?.radius || '12px',
        transition: 'all 0.3s ease'
      }}
    >
      <div className="stats-card-content">
        <div className="stats-info">
          <p className="stats-title" style={{
            color: theme?.textColors?.secondary || (isDarkMode ? '#9ca3af' : '#6b7280')
          }}>
            {title}
          </p>
          <p className="stats-value" style={{
            color: theme?.textColors?.primary || (isDarkMode ? '#ffffff' : '#111827')
          }}>
            {value}
          </p>
          {trend && (
            <div className="stats-trend">
              <span className={`trend-icon ${trend === 'up' ? 'trend-up' : 'trend-down'}`}>
                {trend === 'up' ? '↑' : '↓'}
              </span>
              <span className="trend-value" style={{
                color: trend === 'up' ? '#10b981' : '#ef4444'
              }}>
                {trendValue}%
              </span>
              <span className="trend-label" style={{
                color: theme?.textColors?.secondary || (isDarkMode ? '#9ca3af' : '#6b7280')
              }}>
                vs last month
              </span>
            </div>
          )}
        </div>
        <div className={`stats-icon bg-gradient-to-br ${color}`}>
          <span className="icon-emoji">{icon}</span>
        </div>
      </div>
    </div>
  );
}