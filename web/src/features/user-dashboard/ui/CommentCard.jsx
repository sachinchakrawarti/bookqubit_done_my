"use client";

import { useTheme } from "@/themes/useTheme";
import { useState } from "react";
import { formatDistanceToNow } from "date-fns";

export default function CommentCard({ 
  comment, 
  onLike, 
  onReply, 
  onDelete, 
  onEdit,
  isAuthor = false 
}) {
  const { theme, themeName } = useTheme();
  const isDarkMode = themeName === 'dark' || themeName === 'midnight' || themeName === 'cyberpunk';
  const [isLiked, setIsLiked] = useState(comment.isLiked || false);
  const [likesCount, setLikesCount] = useState(comment.likes || 0);
  const [showReplyForm, setShowReplyForm] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editContent, setEditContent] = useState(comment.content);

  const handleLike = () => {
    if (onLike) {
      onLike(comment.id);
    }
    setIsLiked(!isLiked);
    setLikesCount(prev => isLiked ? prev - 1 : prev + 1);
  };

  const handleEdit = () => {
    if (onEdit && editContent.trim() !== comment.content) {
      onEdit(comment.id, editContent);
    }
    setIsEditing(false);
  };

  const timeAgo = comment.createdAt 
    ? formatDistanceToNow(new Date(comment.createdAt), { addSuffix: true })
    : comment.time || "Just now";

  return (
    <div className="comment-card" style={{
      borderBottom: `1px solid ${theme?.border?.default || (isDarkMode ? '#374151' : '#f3f4f6')}`
    }}>
      <div className="comment-avatar">
        {comment.userAvatar ? (
          <img src={comment.userAvatar} alt={comment.userName} className="avatar-image" />
        ) : (
          <div className="avatar-placeholder" style={{
            backgroundColor: theme?.buttonColors?.primaryButton?.background || '#0284c7'
          }}>
            <span>{comment.userName?.charAt(0) || 'U'}</span>
          </div>
        )}
      </div>

      <div className="comment-content">
        <div className="comment-header">
          <div className="comment-user">
            <span className="user-name" style={{
              color: theme?.textColors?.primary || (isDarkMode ? '#ffffff' : '#111827')
            }}>
              {comment.userName}
            </span>
            {comment.isVerified && (
              <span className="verified-badge" title="Verified Reader">✓</span>
            )}
            <span className="comment-time" style={{
              color: theme?.textColors?.secondary || (isDarkMode ? '#9ca3af' : '#6b7280')
            }}>
              {timeAgo}
            </span>
          </div>
          
          {isAuthor && !isEditing && (
            <div className="comment-actions">
              <button 
                className="action-icon"
                onClick={() => setIsEditing(true)}
                title="Edit"
              >
                ✏️
              </button>
              <button 
                className="action-icon"
                onClick={() => onDelete && onDelete(comment.id)}
                title="Delete"
              >
                🗑️
              </button>
            </div>
          )}
        </div>

        {isEditing ? (
          <div className="edit-form">
            <textarea
              value={editContent}
              onChange={(e) => setEditContent(e.target.value)}
              className="edit-textarea"
              rows="3"
              style={{
                backgroundColor: theme?.background?.input || (isDarkMode ? '#374151' : '#f9fafb'),
                color: theme?.textColors?.primary || (isDarkMode ? '#ffffff' : '#111827'),
                border: `1px solid ${theme?.border?.default || (isDarkMode ? '#4b5563' : '#e5e7eb')}`
              }}
            />
            <div className="edit-actions">
              <button 
                onClick={handleEdit}
                className="save-btn"
                style={{
                  backgroundColor: '#10b981',
                  color: '#ffffff'
                }}
              >
                Save
              </button>
              <button 
                onClick={() => setIsEditing(false)}
                className="cancel-btn"
                style={{
                  backgroundColor: '#6b7280',
                  color: '#ffffff'
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <p className="comment-text" style={{
            color: theme?.textColors?.primary || (isDarkMode ? '#ffffff' : '#111827')
          }}>
            {comment.content}
          </p>
        )}

        {comment.bookTitle && (
          <p className="comment-book" style={{
            color: theme?.textColors?.secondary || (isDarkMode ? '#9ca3af' : '#6b7280')
          }}>
            on "{comment.bookTitle}"
          </p>
        )}

        <div className="comment-footer">
          <button 
            className={`like-btn ${isLiked ? 'liked' : ''}`}
            onClick={handleLike}
            style={{
              color: isLiked ? '#ef4444' : (theme?.textColors?.secondary || (isDarkMode ? '#9ca3af' : '#6b7280'))
            }}
          >
            ❤️ {likesCount > 0 && <span>{likesCount}</span>}
          </button>
          
          {onReply && (
            <button 
              className="reply-btn"
              onClick={() => setShowReplyForm(!showReplyForm)}
              style={{
                color: theme?.textColors?.secondary || (isDarkMode ? '#9ca3af' : '#6b7280')
              }}
            >
              💬 Reply
            </button>
          )}
        </div>

        {showReplyForm && (
          <div className="reply-form">
            <textarea
              placeholder="Write a reply..."
              className="reply-textarea"
              rows="2"
              style={{
                backgroundColor: theme?.background?.input || (isDarkMode ? '#374151' : '#f9fafb'),
                color: theme?.textColors?.primary || (isDarkMode ? '#ffffff' : '#111827'),
                border: `1px solid ${theme?.border?.default || (isDarkMode ? '#4b5563' : '#e5e7eb')}`
              }}
            />
            <div className="reply-actions">
              <button 
                onClick={() => onReply(comment.id, "Reply content")}
                className="submit-reply-btn"
                style={{
                  backgroundColor: theme?.buttonColors?.primaryButton?.background || '#0284c7',
                  color: '#ffffff'
                }}
              >
                Post Reply
              </button>
              <button 
                onClick={() => setShowReplyForm(false)}
                className="cancel-reply-btn"
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        {/* Render replies if any */}
        {comment.replies && comment.replies.length > 0 && (
          <div className="comment-replies">
            {comment.replies.map((reply) => (
              <CommentCard 
                key={reply.id}
                comment={reply}
                onLike={onLike}
                onReply={onReply}
                onDelete={onDelete}
                isAuthor={isAuthor}
              />
            ))}
          </div>
        )}
      </div>

      <style jsx>{`
        .comment-card {
          display: flex;
          gap: 12px;
          padding: 16px 0;
        }
        
        .comment-avatar {
          flex-shrink: 0;
        }
        
        .avatar-image {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          object-fit: cover;
        }
        
        .avatar-placeholder {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 600;
          font-size: 18px;
          color: white;
        }
        
        .comment-content {
          flex: 1;
        }
        
        .comment-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 8px;
          flex-wrap: wrap;
          gap: 8px;
        }
        
        .comment-user {
          display: flex;
          align-items: center;
          gap: 6px;
          flex-wrap: wrap;
        }
        
        .user-name {
          font-size: 0.875rem;
          font-weight: 600;
        }
        
        .verified-badge {
          color: #3b82f6;
          font-size: 12px;
        }
        
        .comment-time {
          font-size: 0.75rem;
        }
        
        .comment-actions {
          display: flex;
          gap: 8px;
        }
        
        .action-icon {
          background: none;
          border: none;
          cursor: pointer;
          font-size: 14px;
          padding: 4px;
          transition: opacity 0.2s;
        }
        
        .action-icon:hover {
          opacity: 0.7;
        }
        
        .comment-text {
          font-size: 0.875rem;
          line-height: 1.5;
          margin: 0 0 8px 0;
        }
        
        .comment-book {
          font-size: 0.813rem;
          margin: 0 0 8px 0;
        }
        
        .comment-footer {
          display: flex;
          gap: 16px;
          margin-top: 8px;
        }
        
        .like-btn, .reply-btn {
          background: none;
          border: none;
          cursor: pointer;
          font-size: 0.813rem;
          padding: 4px 8px;
          border-radius: 6px;
          transition: all 0.2s;
          display: flex;
          align-items: center;
          gap: 4px;
        }
        
        .like-btn:hover, .reply-btn:hover {
          opacity: 0.7;
        }
        
        .edit-form, .reply-form {
          margin-top: 12px;
        }
        
        .edit-textarea, .reply-textarea {
          width: 100%;
          padding: 8px;
          border-radius: 8px;
          font-size: 0.875rem;
          resize: vertical;
        }
        
        .edit-actions, .reply-actions {
          display: flex;
          gap: 8px;
          margin-top: 8px;
        }
        
        .save-btn, .submit-reply-btn {
          padding: 6px 12px;
          border: none;
          border-radius: 6px;
          cursor: pointer;
          font-size: 0.813rem;
        }
        
        .cancel-btn, .cancel-reply-btn {
          padding: 6px 12px;
          background: none;
          border: none;
          cursor: pointer;
          font-size: 0.813rem;
          color: #6b7280;
        }
        
        .comment-replies {
          margin-top: 16px;
          padding-left: 24px;
          border-left: 2px solid #e5e7eb;
        }
        
        .dark .comment-replies {
          border-left-color: #374151;
        }
        
        @media (max-width: 640px) {
          .comment-header {
            flex-direction: column;
            align-items: flex-start;
          }
          
          .comment-replies {
            padding-left: 12px;
          }
        }
      `}</style>
    </div>
  );
}