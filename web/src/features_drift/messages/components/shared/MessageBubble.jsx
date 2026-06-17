"use client";

import { useTheme } from "@/themes/useTheme";

export default function MessageBubble({ message }) {
  const { theme, themeName } = useTheme();
  const isOwn = message.sender === "me";

  return (
    <div className={`message-bubble ${isOwn ? "own" : "other"} ${themeName}`}>
      {!isOwn && <img src={message.avatar} alt="" className="message-avatar" />}
      <div className={`message-content ${isOwn ? "own" : "other"}`}>
        <p className="message-text">{message.text}</p>
        <span className="message-time">{message.time}</span>
      </div>
    </div>
  );
}
