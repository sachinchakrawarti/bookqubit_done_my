// src/features_drift/messages/components/desktop/ChatWindow.jsx

"use client";

import { useState, useEffect, useRef } from "react";
import { useTheme } from "@/themes/useTheme";
import ChatHeader from "../shared/ChatHeader";
import MessageBubble from "../shared/MessageBubble";
import MessageInput from "../shared/MessageInput";
import TypingIndicator from "../shared/TypingIndicator";
import EmptyChat from "../shared/EmptyChat";
import { useMessages } from "../../hooks/useMessages";
import "./ChatWindow.css";

export default function ChatWindow({ chat, onBack }) {
  const { theme, themeName } = useTheme();
  const { messages, sendMessage, loading } = useMessages(chat?.id);
  const [typing, setTyping] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  if (!chat) {
    return (
      <div className={`chat-window ${themeName}`}>
        <EmptyChat />
      </div>
    );
  }

  return (
    <div className={`chat-window ${themeName}`}>
      <ChatHeader chat={chat} onBack={onBack} />

      <div className="chat-messages">
        {messages.map((message) => (
          <MessageBubble key={message.id} message={message} />
        ))}
        {typing && <TypingIndicator />}
        <div ref={messagesEndRef} />
      </div>

      <MessageInput
        onSend={sendMessage}
        onTyping={() => setTyping(true)}
        onStopTyping={() => setTyping(false)}
      />
    </div>
  );
}
