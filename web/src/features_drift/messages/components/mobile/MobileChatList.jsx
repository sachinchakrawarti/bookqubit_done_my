// src/features_drift/messages/components/mobile/MobileChatList.jsx

"use client";

import { useState, useEffect } from "react";
import { useTheme } from "@/themes/useTheme";
import { FiSearch, FiArrowLeft } from "react-icons/fi";
import { useRouter } from "next/navigation";
import { useChats } from "../../hooks/useChats";
import "./MobileChatList.css";

export default function MobileChatList({ onSelectChat }) {
  const { theme, themeName } = useTheme();
  const router = useRouter();
  const { chats, loading } = useChats();
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredChats, setFilteredChats] = useState([]);

  useEffect(() => {
    if (searchTerm) {
      setFilteredChats(
        chats.filter((chat) =>
          chat.name.toLowerCase().includes(searchTerm.toLowerCase()),
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

  return (
    <div className={`mobile-chat-list ${themeName}`}>
      {/* Header */}
      <div className="mobile-header">
        <button className="back-btn" onClick={() => router.back()}>
          <FiArrowLeft />
        </button>
        <h1 className="mobile-title">Messages</h1>
      </div>

      {/* Search */}
      <div className="mobile-search">
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
      <div className="mobile-chat-list-scroll">
        {filteredChats.map((chat) => (
          <div
            key={chat.id}
            className="mobile-chat-item"
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
