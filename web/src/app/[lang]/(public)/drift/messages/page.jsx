"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  FaArrowLeft,
  FaSearch,
  FaUserCircle,
  FaPaperPlane,
  FaCircle,
  FaImage,
  FaSmile,
  FaMicrophone,
  FaEllipsisH,
  FaCheck,
  FaCheckDouble,
} from "react-icons/fa";
import { useTheme } from "@/themes/useTheme";
import { useFont } from "@/contexts/FontContext";

export default function DriftMessagesPage() {
  const { lang } = useParams();
  const router = useRouter();
  const { theme, themeName } = useTheme();
  const { currentFont } = useFont();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedChat, setSelectedChat] = useState(null);
  const [messageInput, setMessageInput] = useState("");
  const [isMobileView, setIsMobileView] = useState(false);
  const [showChat, setShowChat] = useState(false);

  // Check if mobile view
  useEffect(() => {
    const checkMobile = () => {
      setIsMobileView(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Mock chats data
  const chats = [
    {
      id: 1,
      name: "Priya Sharma",
      username: "@priya_writer",
      avatar: null,
      lastMessage: "Loved your latest story! When's the next chapter coming?",
      timestamp: "2 min ago",
      unread: 2,
      online: true,
      typing: false,
      role: "Writer",
    },
    {
      id: 2,
      name: "Amit Kumar",
      username: "@amit_reader",
      avatar: null,
      lastMessage: "Thanks for the recommendation! Just finished the book.",
      timestamp: "1 hour ago",
      unread: 0,
      online: false,
      typing: false,
      role: "Reader",
    },
    {
      id: 3,
      name: "Drift Comics",
      username: "@drift_comics",
      avatar: null,
      lastMessage: "Your comic submission has been reviewed!",
      timestamp: "3 hours ago",
      unread: 1,
      online: true,
      typing: false,
      role: "Artist",
    },
    {
      id: 4,
      name: "Neha Gupta",
      username: "@neha_author",
      avatar: null,
      lastMessage: "Are you coming to the book launch event?",
      timestamp: "Yesterday",
      unread: 0,
      online: false,
      typing: false,
      role: "Author",
    },
    {
      id: 5,
      name: "Book Club India",
      username: "@bookclub_india",
      avatar: null,
      lastMessage: "New discussion thread: Best books of 2024",
      timestamp: "Yesterday",
      unread: 3,
      online: true,
      typing: false,
      role: "Community",
    },
  ];

  // Mock messages for selected chat
  const getMessages = (chatId) => {
    const messagesData = {
      1: [
        { id: 1, text: "Hey! I really enjoyed your writing style.", sender: "other", timestamp: "10:30 AM", read: true },
        { id: 2, text: "Thank you! That means a lot 🙏", sender: "me", timestamp: "10:32 AM", read: true },
        { id: 3, text: "Loved your latest story! When's the next chapter coming?", sender: "other", timestamp: "10:35 AM", read: false },
      ],
      2: [
        { id: 1, text: "Have you read 'The Silent Patient'?", sender: "other", timestamp: "9:15 AM", read: true },
        { id: 2, text: "Yes! It's amazing. The twist was incredible.", sender: "me", timestamp: "9:20 AM", read: true },
        { id: 3, text: "Thanks for the recommendation! Just finished the book.", sender: "other", timestamp: "10:00 AM", read: true },
      ],
      3: [
        { id: 1, text: "Your comic artwork is fantastic!", sender: "other", timestamp: "2:00 PM", read: true },
        { id: 2, text: "Thank you! I've been practicing daily.", sender: "me", timestamp: "2:05 PM", read: true },
        { id: 3, text: "Your comic submission has been reviewed!", sender: "other", timestamp: "3:00 PM", read: false },
      ],
    };
    return messagesData[chatId] || [];
  };

  const [messages, setMessages] = useState([]);

  useEffect(() => {
    if (selectedChat) {
      setMessages(getMessages(selectedChat.id));
    }
  }, [selectedChat]);

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
    
    // Simulate typing indicator
    const chat = chats.find(c => c.id === selectedChat.id);
    if (chat) chat.typing = true;
    
    setTimeout(() => {
      if (chat) chat.typing = false;
      const reply = {
        id: messages.length + 2,
        text: "Thanks for your message! I'll get back to you soon.",
        sender: "other",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        read: false,
      };
      setMessages(prev => [...prev, reply]);
    }, 2000);
  };

  const filteredChats = chats.filter(chat =>
    chat.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    chat.username.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleChatSelect = (chat) => {
    setSelectedChat(chat);
    if (isMobileView) {
      setShowChat(true);
    }
  };

  const handleBackToChats = () => {
    setShowChat(false);
    setSelectedChat(null);
  };

  return (
    <div 
      className={`${theme.background?.section || "bg-gray-50 dark:bg-gray-900"} min-h-screen`}
      style={{ fontFamily: currentFont?.family }}
    >
      <div className="max-w-6xl mx-auto h-screen flex flex-col">
        {/* Header */}
        <div className={`${theme.background?.card || "bg-white dark:bg-gray-800"} border-b ${theme.border?.default || "border-gray-200 dark:border-gray-700"} px-4 py-3`}>
          <div className="flex items-center gap-3">
            <button
              onClick={() => router.back()}
              className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition"
            >
              <FaArrowLeft className={`${theme.iconColors?.primary || "text-gray-600 dark:text-gray-400"}`} />
            </button>
            <h1 className={`text-xl font-semibold ${theme.textColors?.primary || "text-gray-900 dark:text-white"}`}>
              Messages
            </h1>
          </div>
        </div>

        <div className="flex-1 flex overflow-hidden">
          {/* Chats Sidebar */}
          {( !isMobileView || (isMobileView && !showChat) ) && (
            <div className={`${isMobileView ? 'w-full' : 'w-96'} border-r ${theme.border?.default || "border-gray-200 dark:border-gray-700"} flex flex-col`}>
              {/* Search Bar */}
              <div className="p-4">
                <div className="relative">
                  <FaSearch className={`absolute left-3 top-1/2 -translate-y-1/2 ${theme.iconColors?.secondary || "text-gray-400"} text-sm`} />
                  <input
                    type="text"
                    placeholder="Search messages..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className={`w-full pl-10 pr-4 py-2 ${theme.background?.input || "bg-gray-100 dark:bg-gray-800"} ${theme.textColors?.primary || "text-gray-900 dark:text-white"} rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 text-sm`}
                  />
                </div>
              </div>

              {/* Chats List */}
              <div className="flex-1 overflow-y-auto">
                {filteredChats.map((chat) => (
                  <button
                    key={chat.id}
                    onClick={() => handleChatSelect(chat)}
                    className={`w-full p-4 flex items-start gap-3 hover:${theme.background?.hover || "bg-gray-50 dark:bg-gray-800/50"} transition-colors border-b ${theme.border?.default || "border-gray-100 dark:border-gray-800"} ${selectedChat?.id === chat.id && !isMobileView ? theme.background?.active || "bg-blue-50 dark:bg-gray-800" : ""}`}
                  >
                    {/* Avatar */}
                    <div className="relative flex-shrink-0">
                      {chat.avatar ? (
                        <img src={chat.avatar} alt={chat.name} className="w-12 h-12 rounded-full object-cover" />
                      ) : (
                        <FaUserCircle className="w-12 h-12 text-gray-400" />
                      )}
                      {chat.online && (
                        <FaCircle className="absolute bottom-0 right-0 text-green-500 text-sm" />
                      )}
                    </div>

                    {/* Chat Info */}
                    <div className="flex-1 min-w-0 text-left">
                      <div className="flex justify-between items-baseline">
                        <h3 className={`font-semibold ${theme.textColors?.primary || "text-gray-900 dark:text-white"} text-sm`}>
                          {chat.name}
                        </h3>
                        <span className={`text-xs ${theme.textColors?.secondary || "text-gray-500"}`}>
                          {chat.timestamp}
                        </span>
                      </div>
                      <p className={`text-xs ${theme.textColors?.secondary || "text-gray-500"} mb-0.5`}>
                        {chat.username} • {chat.role}
                      </p>
                      <div className="flex items-center gap-2">
                        {chat.typing ? (
                          <p className="text-xs text-sky-500">Typing...</p>
                        ) : (
                          <p className={`text-xs truncate ${chat.unread > 0 ? "font-semibold text-gray-900 dark:text-white" : theme.textColors?.secondary || "text-gray-500"}`}>
                            {chat.lastMessage}
                          </p>
                        )}
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
          )}

          {/* Chat Area */}
          {( !isMobileView || (isMobileView && showChat) ) && selectedChat && (
            <div className="flex-1 flex flex-col">
              {/* Chat Header */}
              <div className={`p-4 border-b ${theme.border?.default || "border-gray-200 dark:border-gray-700"} flex items-center justify-between`}>
                <div className="flex items-center gap-3">
                  {isMobileView && (
                    <button
                      onClick={handleBackToChats}
                      className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition"
                    >
                      <FaArrowLeft className={`${theme.iconColors?.primary || "text-gray-600 dark:text-gray-400"}`} />
                    </button>
                  )}
                  <div className="relative">
                    {selectedChat.avatar ? (
                      <img src={selectedChat.avatar} alt={selectedChat.name} className="w-10 h-10 rounded-full object-cover" />
                    ) : (
                      <FaUserCircle className="w-10 h-10 text-gray-400" />
                    )}
                    {selectedChat.online && (
                      <FaCircle className="absolute bottom-0 right-0 text-green-500 text-xs" />
                    )}
                  </div>
                  <div>
                    <h2 className={`font-semibold ${theme.textColors?.primary || "text-gray-900 dark:text-white"} text-sm`}>
                      {selectedChat.name}
                    </h2>
                    <p className={`text-xs ${theme.textColors?.secondary || "text-gray-500"}`}>
                      {selectedChat.online ? "Online" : "Offline"} • {selectedChat.role}
                    </p>
                  </div>
                </div>
                <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition">
                  <FaEllipsisH className={`${theme.iconColors?.secondary || "text-gray-500"}`} />
                </button>
              </div>

              {/* Messages Area */}
              <div className="flex-1 overflow-y-auto p-4 space-y-3">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.sender === "me" ? "justify-end" : "justify-start"}`}
                  >
                    <div className={`max-w-[70%] ${message.sender === "me" ? "order-2" : "order-1"}`}>
                      <div className={`rounded-lg px-4 py-2 ${message.sender === "me" ? "bg-sky-500 text-white" : theme.background?.card || "bg-white dark:bg-gray-800"} shadow-sm`}>
                        <p className="text-sm">{message.text}</p>
                      </div>
                      <div className={`flex items-center gap-1 mt-1 text-xs ${theme.textColors?.secondary || "text-gray-500"}`}>
                        <span>{message.timestamp}</span>
                        {message.sender === "me" && (
                          message.read ? <FaCheckDouble className="text-sky-500" /> : <FaCheck className="text-gray-400" />
                        )}
                      </div>
                    </div>
                  </div>
                ))}
                
                {/* Typing Indicator */}
                {selectedChat.typing && (
                  <div className="flex justify-start">
                    <div className={`${theme.background?.card || "bg-white dark:bg-gray-800"} rounded-lg px-4 py-2 shadow-sm`}>
                      <div className="flex gap-1">
                        <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></span>
                        <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></span>
                        <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0.4s" }}></span>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Message Input */}
              <div className={`p-4 border-t ${theme.border?.default || "border-gray-200 dark:border-gray-700"}`}>
                <div className="flex items-center gap-2">
                  <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition">
                    <FaImage className={`${theme.iconColors?.secondary || "text-gray-500"} text-xl`} />
                  </button>
                  <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition">
                    <FaSmile className={`${theme.iconColors?.secondary || "text-gray-500"} text-xl`} />
                  </button>
                  <input
                    type="text"
                    value={messageInput}
                    onChange={(e) => setMessageInput(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                    placeholder="Type a message..."
                    className={`flex-1 px-4 py-2 ${theme.background?.input || "bg-gray-100 dark:bg-gray-800"} ${theme.textColors?.primary || "text-gray-900 dark:text-white"} rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 text-sm`}
                  />
                  <button
                    onClick={handleSendMessage}
                    disabled={!messageInput.trim()}
                    className="p-2 bg-sky-500 text-white rounded-full transition hover:bg-sky-600 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <FaPaperPlane className="text-sm" />
                  </button>
                  <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition">
                    <FaMicrophone className={`${theme.iconColors?.secondary || "text-gray-500"} text-xl`} />
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* No Chat Selected */}
          {!selectedChat && !isMobileView && (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center">
                <FaUserCircle className="w-20 h-20 text-gray-300 mx-auto mb-4" />
                <h3 className={`text-lg font-semibold ${theme.textColors?.primary || "text-gray-900 dark:text-white"} mb-2`}>
                  Select a chat
                </h3>
                <p className={`text-sm ${theme.textColors?.secondary || "text-gray-500"}`}>
                  Choose a conversation to start messaging
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}