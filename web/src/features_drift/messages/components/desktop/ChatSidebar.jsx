// src/features_drift/messages/components/desktop/ChatSidebar.jsx

"use client";

import { useState, useEffect } from "react";
import { useTheme } from "@/themes/useTheme";
import { FiSearch, FiEdit2 } from "react-icons/fi";
import { useChats } from "../../hooks/useChats";
import "./ChatSidebar.css";

export default function ChatSidebar({ selectedChat, onSelectChat }) {
  const { theme, themeName } = useTheme();
  const { chats, loading } = useChats();
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredChats, setFilteredChats] = useState([]);

  useEffect(() => {
    if (searchTerm) {
      setFilteredChats(
        chats.filter(
          (chat) =>
            chat.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            chat.lastMessage?.toLowerCase().includes(searchTerm.toLowerCase()),
        ),
      );
    } else {
      setFilteredChats(chats);
    }
  }, [searchTerm, chats]);

  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diff = now - date;
    if (diff < 86400000) {
      return date.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });
    }
    return date.toLocaleDateString();
  };

  if (loading) {
    return (
      <div className={`chat-sidebar ${themeName}`}>
        <div className="loading-chats">Loading chats...</div>
      </div>
    );
  }

  return (
    <div className={`chat-sidebar ${themeName}`}>
      {/* Header */}
      <div className="chat-sidebar-header">
        <h2 className="chat-sidebar-title">Messages</h2>
        <button className="new-message-btn">
          <FiEdit2 />
        </button>
      </div>

      {/* Search */}
      <div className="chat-search">
        <FiSearch className="search-icon" />
        <input
          type="text"
          placeholder="Search messages..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
      </div>

      {/* Chat List */}
      <div className="chat-list">
        {filteredChats.map((chat) => (
          <div
            key={chat.id}
            className={`chat-item ${selectedChat?.id === chat.id ? "active" : ""}`}
            onClick={() => onSelectChat(chat)}
          >
            <div className="chat-avatar">
              <img src={chat.avatar} alt={chat.name} />
              {chat.online && <span className="online-dot" />}
            </div>
            <div className="chat-info">
              <div className="chat-name">{chat.name}</div>
              <div className="chat-last-message">{chat.lastMessage}</div>
            </div>
            <div className="chat-meta">
              <span className="chat-time">
                {formatTime(chat.lastMessageTime)}
              </span>
              {chat.unreadCount > 0 && (
                <span className="unread-badge">{chat.unreadCount}</span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
