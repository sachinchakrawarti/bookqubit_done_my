"use client";

import { useState, useEffect } from "react";
import { getMessages } from "../data/messages";

export function useMessages(chatId) {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!chatId) {
      setMessages([]);
      setLoading(false);
      return;
    }

    const loadMessages = async () => {
      setLoading(true);
      try {
        const data = await getMessages(chatId);
        setMessages(data);
      } catch (error) {
        console.error("Error loading messages:", error);
      } finally {
        setLoading(false);
      }
    };
    loadMessages();
  }, [chatId]);

  const sendMessage = async (text) => {
    const newMessage = {
      id: Date.now(),
      sender: "me",
      text,
      time: new Date().toLocaleTimeString([], { 
        hour: '2-digit', 
        minute: '2-digit' 
      }),
      avatar: "/avatars/me.jpg",
    };
    setMessages(prev => [...prev, newMessage]);
    
    // Simulate reply after 1-2 seconds
    setTimeout(() => {
      const reply = {
        id: Date.now() + 1,
        sender: "other",
        text: "Thanks for your message! I'll get back to you soon.",
        time: new Date().toLocaleTimeString([], { 
          hour: '2-digit', 
          minute: '2-digit' 
        }),
        avatar: "/avatars/other.jpg",
      };
      setMessages(prev => [...prev, reply]);
    }, 1000 + Math.random() * 1000);
  };

  return { messages, sendMessage, loading };
}