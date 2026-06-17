// src/features_drift/messages/components/mobile/MobileChatWindow.jsx

"use client";

import { useState, useEffect, useRef } from "react";
import { useTheme } from "@/themes/useTheme";
import ChatHeader from "../shared/ChatHeader";
import MessageBubble from "../shared/MessageBubble";
import MessageInput from "../shared/MessageInput";
import TypingIndicator from "../shared/TypingIndicator";
import { useMessages } from "../../hooks/useMessages";
import "./MobileChatWindow.css";

export default function MobileChatWindow({ chat, onBack }) {
  const { theme, themeName } = useTheme();
  const { messages, sendMessage, loading } = useMessages(chat?.id);
  const [typing, setTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const messagesContainerRef = useRef(null);
  const [showScrollButton, setShowScrollButton] = useState(false);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleScroll = (e) => {
    const { scrollTop, scrollHeight, clientHeight } = e.target;
    setShowScrollButton(scrollHeight - scrollTop - clientHeight > 100);
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  if (!chat) {
    return <div className="mobile-chat-empty">Select a chat</div>;
  }

  return (
    <div className={`mobile-chat-window ${themeName}`}>
      {/* Header - Fixed */}
      <ChatHeader chat={chat} onBack={onBack} />

      {/* Messages Area - Scrollable */}
      <div
        className="chat-messages-container"
        ref={messagesContainerRef}
        onScroll={handleScroll}
      >
        <div className="chat-messages">
          {messages.length === 0 ? (
            <div className="no-messages">
              <div className="no-messages-icon">💬</div>
              <p>No messages yet</p>
              <span>Say hello to {chat.name}</span>
            </div>
          ) : (
            <>
              {/* Date Divider */}
              <div className="date-divider">
                <span>Today</span>
              </div>
              {messages.map((message) => (
                <MessageBubble key={message.id} message={message} />
              ))}
              {typing && <TypingIndicator />}
              <div ref={messagesEndRef} />
            </>
          )}
        </div>

        {/* Scroll to Bottom Button */}
        {showScrollButton && (
          <button className="scroll-to-bottom-btn" onClick={scrollToBottom}>
            <svg
              viewBox="0 0 24 24"
              width="20"
              height="20"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M12 5v14M5 12l7 7 7-7" />
            </svg>
          </button>
        )}
      </div>

      {/* Input Area - Fixed */}
      <MessageInput
        onSend={sendMessage}
        onTyping={() => setTyping(true)}
        onStopTyping={() => setTyping(false)}
      />
    </div>
  );
}
