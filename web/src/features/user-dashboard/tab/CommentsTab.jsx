"use client";

import { useTheme } from "@/themes/useTheme";
import { useUserDashboard } from "../hooks/useUserDashboard";
import CommentCard from "../ui/CommentCard";
import { useState } from "react";

export default function CommentsTab() {
  const { theme, themeName } = useTheme();
  const isDarkMode = themeName === 'dark' || themeName === 'midnight' || themeName === 'cyberpunk';
  const { comments, loading, addComment, deleteComment, editComment } = useUserDashboard();
  const [newComment, setNewComment] = useState('');

  const handleAddComment = () => {
    if (newComment.trim()) {
      addComment(null, newComment);
      setNewComment('');
    }
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="skeleton h-8 w-64"></div>
        <div className="space-y-4">
          {[1,2,3].map(i => <div key={i} className="skeleton h-32 rounded-xl"></div>)}
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6">
        <h1 className={`text-2xl font-bold ${theme?.textColors?.primary || (isDarkMode ? 'text-white' : 'text-gray-900')}`}>
          My Comments
        </h1>
        <p className={`${theme?.textColors?.secondary || (isDarkMode ? 'text-gray-400' : 'text-gray-600')} mt-1`}>
          Comments you've posted on books
        </p>
      </div>

      {/* Add Comment */}
      <div className={`mb-6 p-4 rounded-xl ${theme?.background?.section || (isDarkMode ? 'bg-gray-800' : 'bg-white')}`}>
        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Share your thoughts about a book..."
          className="w-full p-3 rounded-lg resize-none"
          rows="3"
          style={{
            backgroundColor: theme?.background?.input || (isDarkMode ? '#374151' : '#f9fafb'),
            color: theme?.textColors?.primary || (isDarkMode ? '#ffffff' : '#111827'),
            border: `1px solid ${theme?.border?.default || (isDarkMode ? '#4b5563' : '#e5e7eb')}`
          }}
        />
        <button
          onClick={handleAddComment}
          className="mt-3 px-4 py-2 bg-sky-600 text-white rounded-lg hover:bg-sky-700 transition"
        >
          Post Comment
        </button>
      </div>

      {/* Comments List */}
      {comments.length > 0 ? (
        <div className="space-y-4">
          {comments.map((comment) => (
            <CommentCard 
              key={comment.id} 
              comment={comment}
              isAuthor={true}
              onDelete={deleteComment}
              onEdit={editComment}
            />
          ))}
        </div>
      ) : (
        <div className={`text-center py-12 ${theme?.background?.section || (isDarkMode ? 'bg-gray-800' : 'bg-white')} rounded-xl`}>
          <p className={`text-lg ${theme?.textColors?.secondary || (isDarkMode ? 'text-gray-400' : 'text-gray-600')}`}>
            💬 No comments yet.
          </p>
          <p className={`mt-2 ${theme?.textColors?.secondary || (isDarkMode ? 'text-gray-400' : 'text-gray-600')}`}>
            Start commenting on books you read!
          </p>
        </div>
      )}
    </div>
  );
}