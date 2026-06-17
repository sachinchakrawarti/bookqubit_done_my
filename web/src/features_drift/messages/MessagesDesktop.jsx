"use client";

import { useState } from "react";
import { useTheme } from "@/themes/useTheme";
import ChatSidebar from "./components/desktop/ChatSidebar";
import ChatWindow from "./components/desktop/ChatWindow";
import "./messages.css";

export default function MessagesDesktop() {
  const { theme, themeName } = useTheme();
  const [selectedChat, setSelectedChat] = useState(null);

  return (
    <div className={`messages-desktop ${themeName}`}>
      <ChatSidebar selectedChat={selectedChat} onSelectChat={setSelectedChat} />
      <ChatWindow chat={selectedChat} onBack={() => setSelectedChat(null)} />
    </div>
  );
}
