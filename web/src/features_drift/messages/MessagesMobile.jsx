// src/features_drift/messages/MessagesMobile.jsx

"use client";

import { useState, useEffect } from "react";
import { useTheme } from "@/themes/useTheme";
import MobileChatList from "./components/mobile/MobileChatList";
import MobileChatWindow from "./components/mobile/MobileChatWindow";
import "./MessagesMobile.css";

export default function MessagesMobile() {
  const { theme, themeName } = useTheme();
  const [selectedChat, setSelectedChat] = useState(null);
  const [showChat, setShowChat] = useState(false);

  // Hide navbar when chat is open
  useEffect(() => {
    if (showChat) {
      document.body.classList.add("hide-navbar");
    } else {
      document.body.classList.remove("hide-navbar");
    }
    return () => {
      document.body.classList.remove("hide-navbar");
    };
  }, [showChat]);

  const handleSelectChat = (chat) => {
    setSelectedChat(chat);
    setShowChat(true);
  };

  const handleBack = () => {
    setShowChat(false);
    setSelectedChat(null);
  };

  return (
    <div
      className={`messages-mobile ${themeName} ${showChat ? "hide-navbar" : ""}`}
    >
      {!showChat ? (
        <MobileChatList onSelectChat={handleSelectChat} />
      ) : (
        <MobileChatWindow chat={selectedChat} onBack={handleBack} />
      )}
    </div>
  );
}
