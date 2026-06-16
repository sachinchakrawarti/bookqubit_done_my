"use client";

import { useState } from "react";
import { FaSearch, FaPlus, FaCircle } from "react-icons/fa";
import { formatDistanceToNow } from "date-fns";

export default function MessagesList({ conversations, selectedChat, onSelectChat, isDarkMode }) {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredConversations = conversations.filter(conv =>
    conv.user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    conv.user.username.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    if (date.toDateString() === now.toDateString()) {
      return formatDistanceToNow(date, { addSuffix: true });
    }
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  return (
    <div className={`messages-list ${isDarkMode ? "dark" : ""}`}>
      <div className="messages-list-header">
        <h2>Messages</h2>
        <button className="new-message-btn">
          <FaPlus />
        </button>
      </div>

      <div className="messages-search">
        <FaSearch className="search-icon" />
        <input
          type="text"
          placeholder="Search conversations..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="messages-search-input"
        />
      </div>

      <div className="conversations-list">
        {filteredConversations.length === 0 ? (
          <div className="no-conversations">
            <p>No conversations found</p>
            <span>Start a new conversation</span>
          </div>
        ) : (
          filteredConversations.map((conversation) => (
            <div
              key={conversation.id}
              className={`conversation-item ${selectedChat?.id === conversation.id ? "active" : ""}`}
              onClick={() => onSelectChat(conversation)}
            >
              <div className="conversation-avatar">
                <img src={conversation.user.avatar} alt={conversation.user.name} />
                {conversation.user.online && (
                  <FaCircle className="online-indicator" />
                )}
              </div>
              <div className="conversation-info">
                <div className="conversation-header">
                  <span className="conversation-name">{conversation.user.name}</span>
                  <span className="conversation-time">
                    {formatTimestamp(conversation.lastMessage.timestamp)}
                  </span>
                </div>
                <div className="conversation-preview">
                  <span className="preview-text">
                    {conversation.lastMessage.senderId === 1 ? "You: " : ""}
                    {conversation.lastMessage.text}
                  </span>
                  {conversation.unreadCount > 0 && (
                    <span className="unread-badge">{conversation.unreadCount}</span>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}