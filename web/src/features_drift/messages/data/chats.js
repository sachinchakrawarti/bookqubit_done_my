// src/features_drift/messages/data/chats.js

export const getChats = async () => {
  // Mock data - replace with API call
  return [
    {
      id: 1,
      name: "Rahul Sharma",
      avatar: "/avatars/rahul.jpg",
      online: true,
      lastMessage: "See you tomorrow!",
      lastMessageTime: new Date().toISOString(),
      unreadCount: 2,
    },
    {
      id: 2,
      name: "Priya Patel",
      avatar: "/avatars/priya.jpg",
      online: false,
      lastMessage: "Thanks for the book recommendation!",
      lastMessageTime: new Date(Date.now() - 3600000).toISOString(),
      unreadCount: 0,
    },
    // ... more chats
  ];
};