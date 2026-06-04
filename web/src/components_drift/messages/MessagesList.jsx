"use client";

import { useState } from "react";
import { FaSearch, FaUserCircle, FaCircle } from "react-icons/fa";
import { useTheme } from "@/themes/useTheme";

export default function MessagesList({ onSelectChat, selectedChatId }) {
  const { theme } = useTheme();
  const [searchTerm, setSearchTerm] = useState("");

  const chats = [
    {
      id: 1,
      name: "Priya Sharma",
      username: "@priya_writer",
      lastMessage: "Loved your latest story!",
      timestamp: "2 min ago",
      unread: 2,
      online: true,
      role: "Writer",
    },
    {
      id: 2,
      name: "Amit Kumar",
      username: "@amit_reader",
      lastMessage: "Thanks for the recommendation!",
      timestamp: "1 hour ago",
      unread: 0,
      online: false,
      role: "Reader",
    },
  ];

  const filteredChats = chats.filter(chat =>
    chat.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="h-full flex flex-col">
      <div className="p-4">
        <div className="relative">
          <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
          <input
            type="text"
            placeholder="Search messages..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 text-sm"
          />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        {filteredChats.map((chat) => (
          <button
            key={chat.id}
            onClick={() => onSelectChat(chat)}
            className={`w-full p-4 flex items-start gap-3 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors border-b border-gray-100 dark:border-gray-800 ${selectedChatId === chat.id ? "bg-blue-50 dark:bg-gray-800" : ""}`}
          >
            <div className="relative flex-shrink-0">
              <FaUserCircle className="w-12 h-12 text-gray-400" />
              {chat.online && (
                <FaCircle className="absolute bottom-0 right-0 text-green-500 text-sm" />
              )}
            </div>
            
            <div className="flex-1 min-w-0 text-left">
              <div className="flex justify-between items-baseline">
                <h3 className="font-semibold text-gray-900 dark:text-white text-sm">
                  {chat.name}
                </h3>
                <span className="text-xs text-gray-500">{chat.timestamp}</span>
              </div>
              <p className="text-xs text-gray-500 mb-0.5">
                {chat.username} • {chat.role}
              </p>
              <div className="flex items-center gap-2">
                <p className="text-xs truncate text-gray-500">
                  {chat.lastMessage}
                </p>
                {chat.unread > 0 && (
                  <span className="flex-shrink-0 w-5 h-5 bg-sky-500 text-white text-xs rounded-full flex items-center justify-center">
                    {chat.unread}
                  </span>
                )}
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}