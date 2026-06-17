// src/features_drift/messages/hooks/useChats.js

"use client";

import { useState, useEffect } from "react";
import { getChats } from "../data/chats";

export function useChats() {
  const [chats, setChats] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadChats = async () => {
      try {
        const data = await getChats();
        setChats(data);
      } catch (error) {
        console.error("Error loading chats:", error);
      } finally {
        setLoading(false);
      }
    };
    loadChats();
  }, []);

  return { chats, loading };
}