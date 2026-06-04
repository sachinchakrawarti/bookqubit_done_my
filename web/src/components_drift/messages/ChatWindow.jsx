"use client";

import { useState } from "react";
import { FaPaperPlane, FaImage, FaSmile, FaMicrophone, FaArrowLeft, FaUserCircle, FaCircle, FaEllipsisH, FaCheck, FaCheckDouble } from "react-icons/fa";
import { useTheme } from "@/themes/useTheme";

export default function ChatWindow({ chat, onBack, isMobile }) {
  const { theme } = useTheme();
  const [messageInput, setMessageInput] = useState("");
  const [messages, setMessages] = useState([
    { id: 1, text: "Hey! How are you?", sender: "other", timestamp: "10:30 AM", read: true },
    { id: 2, text: "I'm good, thanks! How about you?", sender: "me", timestamp: "10:32 AM", read: true },
  ]);

  const handleSendMessage = () => {
    if (!messageInput.trim()) return;
    
    const newMessage = {
      id: messages.length + 1,
      text: messageInput,
      sender: "me",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      read: false,
    };
    
    setMessages([...messages, newMessage]);
    setMessageInput("");
  };

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className={`p-4 border-b ${theme.border?.default || "border-gray-200 dark:border-gray-700"} flex items-center justify-between`}>
        <div className="flex items-center gap-3">
          {isMobile && (
            <button onClick={onBack} className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full">
              <FaArrowLeft className="text-gray-600 dark:text-gray-400" />
            </button>
          )}
          <div className="relative">
            <FaUserCircle className="w-10 h-10 text-gray-400" />
            {chat?.online && <FaCircle className="absolute bottom-0 right-0 text-green-500 text-xs" />}
          </div>
          <div>
            <h2 className="font-semibold text-gray-900 dark:text-white text-sm">{chat?.name}</h2>
            <p className="text-xs text-gray-500">{chat?.online ? "Online" : "Offline"} • {chat?.role}</p>
          </div>
        </div>
        <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full">
          <FaEllipsisH className="text-gray-500" />
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.map((message) => (
          <div key={message.id} className={`flex ${message.sender === "me" ? "justify-end" : "justify-start"}`}>
            <div className={`max-w-[70%] ${message.sender === "me" ? "order-2" : "order-1"}`}>
              <div className={`rounded-lg px-4 py-2 ${message.sender === "me" ? "bg-sky-500 text-white" : "bg-white dark:bg-gray-800"} shadow-sm`}>
                <p className="text-sm">{message.text}</p>
              </div>
              <div className="flex items-center gap-1 mt-1 text-xs text-gray-500">
                <span>{message.timestamp}</span>
                {message.sender === "me" && (
                  message.read ? <FaCheckDouble className="text-sky-500" /> : <FaCheck className="text-gray-400" />
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Input */}
      <div className={`p-4 border-t ${theme.border?.default || "border-gray-200 dark:border-gray-700"}`}>
        <div className="flex items-center gap-2">
          <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full">
            <FaImage className="text-gray-500 text-xl" />
          </button>
          <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full">
            <FaSmile className="text-gray-500 text-xl" />
          </button>
          <input
            type="text"
            value={messageInput}
            onChange={(e) => setMessageInput(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
            placeholder="Type a message..."
            className="flex-1 px-4 py-2 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 text-sm"
          />
          <button
            onClick={handleSendMessage}
            disabled={!messageInput.trim()}
            className="p-2 bg-sky-500 text-white rounded-full hover:bg-sky-600 disabled:opacity-50"
          >
            <FaPaperPlane className="text-sm" />
          </button>
          <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full">
            <FaMicrophone className="text-gray-500 text-xl" />
          </button>
        </div>
      </div>
    </div>
  );
}