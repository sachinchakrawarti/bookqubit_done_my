"use client";

import { useState } from "react";
import { FiSend, FiSmile, FiPaperclip } from "react-icons/fi";
import { useTheme } from "@/themes/useTheme";

export default function MessageInput({ onSend, onTyping, onStopTyping }) {
  const { theme, themeName } = useTheme();
  const [message, setMessage] = useState("");

  const handleSend = () => {
    if (message.trim()) {
      onSend(message);
      setMessage("");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className={`message-input-container ${themeName}`}>
      <div className="message-input-wrapper">
        <button className="input-action-btn">
          <FiSmile />
        </button>
        <button className="input-action-btn">
          <FiPaperclip />
        </button>
        <input
          type="text"
          placeholder="Type a message..."
          value={message}
          onChange={(e) => {
            setMessage(e.target.value);
            if (e.target.value) onTyping?.();
            else onStopTyping?.();
          }}
          onKeyPress={handleKeyPress}
          className="message-input"
        />
        <button
          className={`send-btn ${message.trim() ? "active" : ""}`}
          onClick={handleSend}
          disabled={!message.trim()}
        >
          <FiSend />
        </button>
      </div>
    </div>
  );
}
