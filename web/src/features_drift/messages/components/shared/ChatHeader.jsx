// src/features_drift/messages/components/shared/ChatHeader.jsx

"use client";

import { FiArrowLeft, FiMoreVertical, FiPhone, FiVideo } from "react-icons/fi";
import { useTheme } from "@/themes/useTheme";

export default function ChatHeader({ chat, onBack }) {
  const { theme, themeName } = useTheme();

  if (!chat) return null;

  return (
    <div className={`chat-header ${themeName}`}>
      <div className="chat-header-left">
        {onBack && (
          <button className="back-btn" onClick={onBack}>
            <FiArrowLeft />
          </button>
        )}
        <div className="chat-avatar-small">
          <img
            src={chat.avatar || "/avatars/default.jpg"}
            alt={chat.name}
            onError={(e) => {
              e.target.src = "/avatars/default.jpg";
            }}
          />
          {chat.online && <span className="online-dot-small" />}
        </div>
        <div className="chat-user-info">
          <div className="chat-user-name">{chat.name}</div>
          <div className="chat-user-status">
            {chat.online ? "● Online" : "Offline"}
          </div>
        </div>
      </div>
      <div className="chat-header-right">
        <button className="header-action-btn" title="Call">
          <FiPhone />
        </button>
        <button className="header-action-btn" title="Video Call">
          <FiVideo />
        </button>
        <button className="header-action-btn" title="More">
          <FiMoreVertical />
        </button>
      </div>
    </div>
  );
}
