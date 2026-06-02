"use client";

import "./BookRecommendations.css";
import { useTheme } from "@/themes/useTheme";
import Link from "next/link";

export default function BookRecommendations() {
  const { theme, themeName } = useTheme();
  const isDarkMode = themeName === 'dark' || themeName === 'midnight' || themeName === 'cyberpunk';

  const recommendations = [
    { id: 1, title: "Project Hail Mary", author: "Andy Weir", rating: 4.8, reason: "Based on your love for Sci-Fi" },
    { id: 2, title: "The Silent Patient", author: "Alex Michaelides", rating: 4.5, reason: "Popular in Mystery" },
    { id: 3, title: "Atomic Habits", author: "James Clear", rating: 4.7, reason: "Recommended for you" },
  ];

  return (
    <div 
      className="book-recommendations"
      style={{
        backgroundColor: theme?.background?.section || (isDarkMode ? '#1f2937' : '#ffffff'),
        borderRadius: theme?.border?.radius || '12px'
      }}
    >
      <div className="recommendations-header">
        <h3 style={{ color: theme?.textColors?.primary || (isDarkMode ? '#ffffff' : '#111827') }}>
          📚 Recommended for You
        </h3>
        <Link href="/recommendations" className="view-all">
          View All →
        </Link>
      </div>

      <div className="recommendations-list">
        {recommendations.map((book) => (
          <div key={book.id} className="recommendation-item">
            <div className="book-info">
              <h4 style={{ color: theme?.textColors?.primary || (isDarkMode ? '#ffffff' : '#111827') }}>
                {book.title}
              </h4>
              <p style={{ color: theme?.textColors?.secondary || (isDarkMode ? '#9ca3af' : '#6b7280') }}>
                by {book.author}
              </p>
              <div className="book-rating">
                <span className="stars">⭐</span>
                <span>{book.rating}</span>
              </div>
              <small className="recommendation-reason" style={{ color: theme?.textColors?.secondary || (isDarkMode ? '#9ca3af' : '#6b7280') }}>
                {book.reason}
              </small>
            </div>
            <button 
              className="add-btn"
              style={{
                backgroundColor: theme?.buttonColors?.primaryButton?.background || '#0284c7',
                color: '#ffffff'
              }}
            >
              Add to Library
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}