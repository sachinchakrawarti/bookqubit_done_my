"use client";

import { FiMessageSquare } from "react-icons/fi";
import { useTheme } from "@/themes/useTheme";

export default function EmptyChat() {
  const { theme, themeName } = useTheme();

  return (
    <div className={`empty-chat ${themeName}`}>
      <FiMessageSquare className="empty-icon" />
      <h3>Select a chat</h3>
      <p>Choose a conversation to start messaging</p>
    </div>
  );
}
