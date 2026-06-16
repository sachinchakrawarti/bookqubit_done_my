"use client";

import { useState, useEffect, useRef } from "react";
import { FaArrowLeft, FaPaperclip, FaSmile, FaEllipsisV } from "react-icons/fa";
import { format } from "date-fns";

export default function ChatWindow({ conversation, isDarkMode, onBack }) {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const messagesEndRef = useRef(null);

  // Mock messages - replace with actual API
  const mockMessages = [
    {
      id: 1,
      text: "Hey! Have you read the new book?",
      senderId: 2,
      timestamp: "2024-06-16T10:30:00Z",
      isRead: true,
    },
    {
      id: 2,
      text: "Not yet! Is it good?",
      senderId: 1,
      timestamp: "2024-06-16T10:32:00Z",
      isRead: true,
    },
    {
      id: 3,
      text: "Yes, it's amazing! You should definitely read it.",
      senderId: 2,
      timestamp: "2024-06-16T10:35:00Z",
      isRead: true,
    },
    {
      id: 4,
      text: "I'll add it to my reading list right away!",
      senderId: 1,
      timestamp: "2024-06-16T10:38:00Z",
      isRead: true,
    },
  ];

  useEffect(() => {
    if (conversation) {
      setMessages(mockMessages);
    }
  }, [conversation]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    const newMessage = {
      id: Date.now(),
      text: message,
      senderId: 1,
      timestamp: new Date().toISOString(),
      isRead: false,
    };
    setMessages([...messages, newMessage]);
    setMessage("");
  };

  if (!conversation) {
    return (
      <div className={`chat-window ${isDarkMode ? "dark" : ""}`}>
        <div className="no-chat-selected">
          <div className="no-chat-icon">💬</div>
          <h3>Select a conversation</h3>
          <p>Choose a conversation from the list to start messaging</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`chat-window ${isDarkMode ? "dark" : ""}`}>
      {/* Chat Header */}
      <div className="chat-header">
        <div className="chat-header-left">
          <button className="back-btn" onClick={onBack}>
            <FaArrowLeft />
          </button>
          <div className="chat-user-info">
            <img src={conversation.user.avatar} alt={conversation.user.name} />
            <div>
              <span className="chat-user-name">{conversation.user.name}</span>
              <span className="chat-user-status">
                {conversation.user.online ? "Online" : "Last seen recently"}
              </span>
            </div>
          </div>
        </div>
        <button className="chat-options-btn">
          <FaEllipsisV />
        </button>
      </div>

      {/* Messages */}
      <div className="chat-messages">
        {messages.map((msg, index) => {
          const isOwnMessage = msg.senderId === 1;
          const showDate = index === 0 || new Date(msg.timestamp).toDateString() !== new Date(messages[index - 1]?.timestamp).toDateString();

          return (
            <div key={msg.id}>
              {showDate && (
                <div className="chat-date-divider">
                  <span>{format(new Date(msg.timestamp), "MMMM d, yyyy")}</span>
                </div>
              )}
              <div className={`message-wrapper ${isOwnMessage ? "own" : "other"}`}>
                {!isOwnMessage && (
                  <img src={conversation.user.avatar} alt="" className="message-avatar" />
                )}
                <div className="message-bubble">
                  <p>{msg.text}</p>
                  <span className="message-time">
                    {format(new Date(msg.timestamp), "h:mm a")}
                    {isOwnMessage && (
                      <span className="message-status">
                        {msg.isRead ? "✓✓" : "✓"}
                      </span>
                    )}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
        <div ref={messagesEndRef} />
      </div>

      {/* Message Input */}
      <form className="message-input-wrapper" onSubmit={handleSendMessage}>
        <button type="button" className="attach-btn">
          <FaPaperclip />
        </button>
        <input
          type="text"
          placeholder="Type a message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="message-input"
        />
        <button type="button" className="emoji-btn">
          <FaSmile />
        </button>
        <button type="submit" className="send-btn">
          Send
        </button>
      </form>
    </div>
  );
}