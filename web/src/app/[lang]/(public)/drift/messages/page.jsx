"use client";

import { useState } from "react";
import { useTheme } from "@/themes/useTheme";
import { useFont } from "@/contexts/FontContext";
import { useRTL } from "@/contexts/RTLContext";
import MessagesList from "@/components_drift/messages/MessagesList";
import ChatWindow from "@/components_drift/messages/ChatWindow";
import "@/components_drift/messages/messages.css";

export default function MessagesPage() {
  const { theme, themeName } = useTheme();
  const { currentFont } = useFont();
  const { direction } = useRTL();
  const [selectedChat, setSelectedChat] = useState(null);
  const [isMobileView, setIsMobileView] = useState(false);

  const isDarkMode =
    themeName === "dark" ||
    themeName === "midnight" ||
    themeName === "cyberpunk";

  // Mock conversations data
  const conversations = [
    {
      id: 1,
      user: {
        id: 1,
        name: "Priyal Shrivatava",
        username: "priyal._.shrivatava",
        avatar: "https://ui-avatars.com/api/?name=Priyal+Shrivatava&background=8b5cf6&color=fff",
        online: true,
      },
      lastMessage: {
        text: "Hey! Have you read the new book?",
        timestamp: "2024-06-16T10:30:00Z",
        isRead: true,
        senderId: 1,
      },
      unreadCount: 0,
    },
    {
      id: 2,
      user: {
        id: 2,
        name: "Sachin Chakrawarti",
        username: "sachin._.chakrawarti",
        avatar: "https://ui-avatars.com/api/?name=Sachin+Chakrawarti&background=3b82f6&color=fff",
        online: false,
        lastSeen: "2024-06-16T08:15:00Z",
      },
      lastMessage: {
        text: "I'll send you the link to that article",
        timestamp: "2024-06-15T22:45:00Z",
        isRead: false,
        senderId: 2,
      },
      unreadCount: 2,
    },
    {
      id: 3,
      user: {
        id: 3,
        name: "Shraddha Kapoor",
        username: "shraddha._.kapoor",
        avatar: "https://ui-avatars.com/api/?name=Shraddha+Kapoor&background=10b981&color=fff",
        online: true,
      },
      lastMessage: {
        text: "Loved your latest review!",
        timestamp: "2024-06-15T18:20:00Z",
        isRead: true,
        senderId: 3,
      },
      unreadCount: 0,
    },
    {
      id: 4,
      user: {
        id: 4,
        name: "Ishani Krishna",
        username: "ishani._.krishna",
        avatar: "https://ui-avatars.com/api/?name=Ishani+Krishna&background=ef4444&color=fff",
        online: false,
        lastSeen: "2024-06-15T14:30:00Z",
      },
      lastMessage: {
        text: "The mystery book club meeting is tomorrow",
        timestamp: "2024-06-14T09:00:00Z",
        isRead: true,
        senderId: 4,
      },
      unreadCount: 0,
    },
    {
      id: 5,
      user: {
        id: 5,
        name: "Hania Amir",
        username: "hania._.amir",
        avatar: "https://ui-avatars.com/api/?name=Hania+Amir&background=ec4899&color=fff",
        online: true,
      },
      lastMessage: {
        text: "Can't wait for the new fantasy series!",
        timestamp: "2024-06-13T16:45:00Z",
        isRead: true,
        senderId: 5,
      },
      unreadCount: 0,
    },
  ];

  const handleSelectChat = (conversation) => {
    setSelectedChat(conversation);
  };

  const fontStyle = currentFont?.family ? {
    fontFamily: currentFont.family
  } : {};

  return (
    <div
      dir={direction}
      style={fontStyle}
      className={`messages-page ${isDarkMode ? "dark" : ""}`}
    >
      <div className="messages-container">
        <MessagesList
          conversations={conversations}
          selectedChat={selectedChat}
          onSelectChat={handleSelectChat}
          isDarkMode={isDarkMode}
        />
        <ChatWindow
          conversation={selectedChat}
          isDarkMode={isDarkMode}
          onBack={() => setSelectedChat(null)}
        />
      </div>
    </div>
  );
}