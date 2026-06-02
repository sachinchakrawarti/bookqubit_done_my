"use client";

import { useTheme } from "@/themes/useTheme";
import { formatDistanceToNow } from "date-fns";

export default function ActivityItem({ activity, onClick }) {
  const { theme, themeName } = useTheme();
  const isDarkMode = themeName === 'dark' || themeName === 'midnight' || themeName === 'cyberpunk';

  const getActivityIcon = (type) => {
    const icons = {
      read: { emoji: "✅", color: "#10b981", label: "Completed Reading" },
      review: { emoji: "✍️", color: "#f59e0b", label: "Added a Review" },
      want_to_read: { emoji: "⭐", color: "#0284c7", label: "Added to Wishlist" },
      like: { emoji: "❤️", color: "#ef4444", label: "Liked a Book" },
      comment: { emoji: "💬", color: "#8b5cf6", label: "Commented" },
      follow: { emoji: "👥", color: "#06b6d4", label: "Followed" },
      bookmark: { emoji: "🔖", color: "#ec4899", label: "Bookmarked" },
      share: { emoji: "🔄", color: "#14b8a6", label: "Shared" },
    };
    return icons[type] || { emoji: "📚", color: "#6b7280", label: "Activity" };
  };

  const icon = getActivityIcon(activity.type);
  const timeAgo = activity.timestamp 
    ? formatDistanceToNow(new Date(activity.timestamp), { addSuffix: true })
    : activity.time || "Just now";

  return (
    <div 
      className={`activity-item ${onClick ? 'cursor-pointer' : ''}`}
      onClick={() => onClick && onClick(activity)}
      style={{
        borderBottom: `1px solid ${theme?.border?.default || (isDarkMode ? '#374151' : '#f3f4f6')}`,
        transition: 'background-color 0.2s ease'
      }}
    >
      <div className="activity-icon" style={{ backgroundColor: `${icon.color}15` }}>
        <span className="icon-emoji">{icon.emoji}</span>
      </div>
      
      <div className="activity-content">
        <div className="activity-header">
          <p className="activity-action" style={{
            color: theme?.textColors?.primary || (isDarkMode ? '#ffffff' : '#111827')
          }}>
            {activity.action}
          </p>
          <span className="activity-time" style={{
            color: theme?.textColors?.secondary || (isDarkMode ? '#9ca3af' : '#6b7280')
          }}>
            {timeAgo}
          </span>
        </div>
        
        {activity.book && (
          <p className="activity-book" style={{
            color: theme?.textColors?.secondary || (isDarkMode ? '#9ca3af' : '#6b7280')
          }}>
            📖 {activity.book}
          </p>
        )}
        
        {activity.review && (
          <p className="activity-review" style={{
            color: theme?.textColors?.secondary || (isDarkMode ? '#9ca3af' : '#6b7280')
          }}>
            "{activity.review.substring(0, 100)}..."
          </p>
        )}
        
        {activity.rating && (
          <div className="activity-rating">
            {[...Array(5)].map((_, i) => (
              <span key={i} className={`star ${i < activity.rating ? 'filled' : 'empty'}`}>
                {i < activity.rating ? '★' : '☆'}
              </span>
            ))}
          </div>
        )}
      </div>

      <style jsx>{`
        .activity-item {
          display: flex;
          gap: 12px;
          padding: 16px;
          transition: background-color 0.2s;
        }
        
        .activity-item:hover {
          background-color: ${isDarkMode ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.02)'};
        }
        
        .activity-icon {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
        
        .icon-emoji {
          font-size: 20px;
        }
        
        .activity-content {
          flex: 1;
        }
        
        .activity-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 8px;
          margin-bottom: 4px;
        }
        
        .activity-action {
          font-size: 0.875rem;
          font-weight: 500;
          margin: 0;
        }
        
        .activity-time {
          font-size: 0.75rem;
        }
        
        .activity-book {
          font-size: 0.813rem;
          margin: 4px 0 0 0;
        }
        
        .activity-review {
          font-size: 0.813rem;
          margin: 4px 0 0 0;
          font-style: italic;
        }
        
        .activity-rating {
          display: flex;
          gap: 2px;
          margin-top: 6px;
        }
        
        .star {
          font-size: 12px;
        }
        
        .star.filled {
          color: #fbbf24;
        }
        
        .star.empty {
          color: #d1d5db;
        }
        
        @media (max-width: 640px) {
          .activity-header {
            flex-direction: column;
            align-items: flex-start;
          }
        }
      `}</style>
    </div>
  );
}