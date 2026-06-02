"use client";

import { useTheme } from "@/themes/useTheme";
import Link from "next/link";
import { useState } from "react";

export default function BookCard({ 
  book, 
  type = "reading", 
  onProgressUpdate, 
  onRemove, 
  onAddToLibrary 
}) {
  const { theme, themeName } = useTheme();
  const isDarkMode = themeName === 'dark' || themeName === 'midnight' || themeName === 'cyberpunk';
  const [showActions, setShowActions] = useState(false);
  const [progress, setProgress] = useState(book?.progress || 0);

  const handleProgressChange = (e) => {
    const newProgress = parseInt(e.target.value);
    setProgress(newProgress);
    if (onProgressUpdate) {
      onProgressUpdate(book.id, newProgress);
    }
  };

  const getStatusBadge = () => {
    switch (type) {
      case 'reading':
        return { label: 'Currently Reading', color: '#0284c7' };
      case 'completed':
        return { label: 'Completed', color: '#10b981' };
      case 'want_to_read':
        return { label: 'Want to Read', color: '#f59e0b' };
      case 'liked':
        return { label: 'Liked', color: '#ef4444' };
      default:
        return { label: type, color: '#6b7280' };
    }
  };

  const status = getStatusBadge();

  return (
    <div 
      className="book-card"
      onMouseEnter={() => setShowActions(true)}
      onMouseLeave={() => setShowActions(false)}
      style={{
        backgroundColor: theme?.background?.section || (isDarkMode ? '#1f2937' : '#ffffff'),
        border: `1px solid ${theme?.border?.default || (isDarkMode ? '#374151' : '#e5e7eb')}`,
        borderRadius: theme?.border?.radius || '12px',
        transition: 'all 0.3s ease'
      }}
    >
      <div className="book-card-content">
        {/* Book Cover */}
        <div className="book-cover">
          {book.imageUrl ? (
            <img 
              src={book.imageUrl} 
              alt={book.title}
              className="cover-image"
              onError={(e) => {
                e.target.src = '/placeholder-book.jpg';
              }}
            />
          ) : (
            <div className="cover-placeholder" style={{
              backgroundColor: isDarkMode ? '#374151' : '#e5e7eb'
            }}>
              <span className="placeholder-icon">📚</span>
            </div>
          )}
        </div>

        {/* Book Info */}
        <div className="book-info">
          <div className="book-header">
            <h3 className="book-title" style={{
              color: theme?.textColors?.primary || (isDarkMode ? '#ffffff' : '#111827')
            }}>
              {book.title}
            </h3>
            <span className="status-badge" style={{
              backgroundColor: status.color,
              color: '#ffffff'
            }}>
              {status.label}
            </span>
          </div>

          <p className="book-author" style={{
            color: theme?.textColors?.secondary || (isDarkMode ? '#9ca3af' : '#6b7280')
          }}>
            by {book.author}
          </p>

          {/* Rating Stars */}
          {book.rating && (
            <div className="book-rating">
              {[...Array(5)].map((_, i) => (
                <span key={i} className={`star ${i < Math.floor(book.rating) ? 'filled' : 'empty'}`}>
                  {i < Math.floor(book.rating) ? '★' : '☆'}
                </span>
              ))}
              <span className="rating-value" style={{
                color: theme?.textColors?.secondary || (isDarkMode ? '#9ca3af' : '#6b7280')
              }}>
                ({book.rating})
              </span>
            </div>
          )}

          {/* Progress Bar for Currently Reading */}
          {type === 'reading' && (
            <div className="progress-section">
              <div className="progress-header">
                <span className="progress-label" style={{
                  color: theme?.textColors?.secondary || (isDarkMode ? '#9ca3af' : '#6b7280')
                }}>
                  Progress
                </span>
                <span className="progress-value" style={{
                  color: theme?.textColors?.primary || (isDarkMode ? '#ffffff' : '#111827')
                }}>
                  {progress}%
                </span>
              </div>
              <div className="progress-bar">
                <div 
                  className="progress-fill" 
                  style={{ 
                    width: `${progress}%`,
                    backgroundColor: theme?.buttonColors?.primaryButton?.background || '#0284c7'
                  }}
                />
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={progress}
                onChange={handleProgressChange}
                className="progress-slider"
                style={{
                  accentColor: theme?.buttonColors?.primaryButton?.background || '#0284c7'
                }}
              />
            </div>
          )}

          {/* Book Metadata */}
          <div className="book-metadata">
            {book.pages && (
              <span className="metadata-item" style={{
                color: theme?.textColors?.secondary || (isDarkMode ? '#9ca3af' : '#6b7280')
              }}>
                📄 {book.pages} pages
              </span>
            )}
            {book.genre && (
              <span className="metadata-item" style={{
                color: theme?.textColors?.secondary || (isDarkMode ? '#9ca3af' : '#6b7280')
              }}>
                🏷️ {book.genre}
              </span>
            )}
            {book.completedAt && (
              <span className="metadata-item" style={{
                color: theme?.textColors?.secondary || (isDarkMode ? '#9ca3af' : '#6b7280')
              }}>
                ✅ Completed: {new Date(book.completedAt).toLocaleDateString()}
              </span>
            )}
          </div>

          {/* Action Buttons */}
          {showActions && (
            <div className="book-actions">
              <Link href={`/books/${book.slug || book.id}`}>
                <button className="action-btn view-btn" style={{
                  backgroundColor: theme?.buttonColors?.secondaryButton?.background || 'transparent',
                  border: `1px solid ${theme?.border?.default || (isDarkMode ? '#374151' : '#e5e7eb')}`,
                  color: theme?.buttonColors?.secondaryButton?.textColor || (isDarkMode ? '#ffffff' : '#111827')
                }}>
                  View Details
                </button>
              </Link>
              {onRemove && (
                <button 
                  className="action-btn remove-btn"
                  onClick={() => onRemove(book.id)}
                  style={{
                    backgroundColor: '#ef4444',
                    color: '#ffffff'
                  }}
                >
                  Remove
                </button>
              )}
              {type === 'want_to_read' && onAddToLibrary && (
                <button 
                  className="action-btn add-btn"
                  onClick={() => onAddToLibrary(book.id)}
                  style={{
                    backgroundColor: '#10b981',
                    color: '#ffffff'
                  }}
                >
                  Start Reading
                </button>
              )}
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        .book-card {
          transition: transform 0.2s, box-shadow 0.2s;
        }
        
        .book-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1);
        }
        
        .book-card-content {
          display: flex;
          gap: 16px;
          padding: 20px;
        }
        
        .book-cover {
          flex-shrink: 0;
        }
        
        .cover-image {
          width: 120px;
          height: 180px;
          object-fit: cover;
          border-radius: 8px;
        }
        
        .cover-placeholder {
          width: 120px;
          height: 180px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 8px;
        }
        
        .placeholder-icon {
          font-size: 48px;
        }
        
        .book-info {
          flex: 1;
        }
        
        .book-header {
          display: flex;
          justify-content: space-between;
          align-items: start;
          margin-bottom: 8px;
        }
        
        .book-title {
          font-size: 1.125rem;
          font-weight: 600;
          margin: 0;
        }
        
        .status-badge {
          font-size: 0.75rem;
          padding: 2px 8px;
          border-radius: 12px;
          white-space: nowrap;
        }
        
        .book-author {
          font-size: 0.875rem;
          margin-bottom: 12px;
        }
        
        .book-rating {
          display: flex;
          align-items: center;
          gap: 2px;
          margin-bottom: 12px;
        }
        
        .star {
          font-size: 16px;
        }
        
        .star.filled {
          color: #fbbf24;
        }
        
        .star.empty {
          color: #d1d5db;
        }
        
        .rating-value {
          font-size: 0.75rem;
          margin-left: 4px;
        }
        
        .progress-section {
          margin: 12px 0;
        }
        
        .progress-header {
          display: flex;
          justify-content: space-between;
          margin-bottom: 6px;
          font-size: 0.75rem;
        }
        
        .progress-bar {
          width: 100%;
          height: 6px;
          background-color: #e5e7eb;
          border-radius: 3px;
          overflow: hidden;
          margin-bottom: 8px;
        }
        
        .dark .progress-bar {
          background-color: #374151;
        }
        
        .progress-fill {
          height: 100%;
          transition: width 0.3s ease;
        }
        
        .progress-slider {
          width: 100%;
          margin-top: 8px;
        }
        
        .book-metadata {
          display: flex;
          flex-wrap: wrap;
          gap: 12px;
          margin-top: 12px;
          font-size: 0.75rem;
        }
        
        .book-actions {
          display: flex;
          gap: 8px;
          margin-top: 16px;
        }
        
        .action-btn {
          padding: 6px 12px;
          border-radius: 6px;
          font-size: 0.75rem;
          cursor: pointer;
          transition: all 0.2s;
        }
        
        .action-btn:hover {
          opacity: 0.9;
        }
        
        @media (max-width: 640px) {
          .book-card-content {
            flex-direction: column;
          }
          
          .book-cover {
            align-self: center;
          }
          
          .book-header {
            flex-direction: column;
            gap: 8px;
          }
        }
      `}</style>
    </div>
  );
}