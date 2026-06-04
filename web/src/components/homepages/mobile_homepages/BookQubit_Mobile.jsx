"use client";

import { useState, useEffect } from "react";
import {
  FaBook,
  FaShareAlt,
  FaTwitter,
  FaInstagram,
  FaFacebook,
  FaLinkedin,
  FaDiscord,
  FaGlobe,
  FaLanguage,
  FaUsers,
} from "react-icons/fa";
import { useTheme } from "@/themes/useTheme";
import { useFont } from "@/contexts/FontContext";

const BookQubit_Mobile = () => {
  const { theme, themeName } = useTheme();
  const { currentFont } = useFont();
  const [animatedText, setAnimatedText] = useState("");
  const [textIndex, setTextIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(true);

  // Check if current theme is dark mode
  const isDarkMode =
    themeName === "dark" ||
    themeName === "midnight" ||
    themeName === "cyberpunk";

  // Animated text options - India's First Book Discovery Platform
  const textOptions = [
    "India's First Book Discovery Platform 🇮🇳",
    "20+ Languages Supported 📖",
    "Drift Network for Readers & Writers 🤝",
    "Discover. Connect. Read. 🚀",
  ];

  // Typing animation
  useEffect(() => {
    let timeout;
    const currentText = textOptions[textIndex];
    
    if (isTyping) {
      if (animatedText.length < currentText.length) {
        timeout = setTimeout(() => {
          setAnimatedText(currentText.slice(0, animatedText.length + 1));
        }, 100);
      } else {
        timeout = setTimeout(() => {
          setIsTyping(false);
        }, 2000);
      }
    } else {
      if (animatedText.length > 0) {
        timeout = setTimeout(() => {
          setAnimatedText(animatedText.slice(0, -1));
        }, 50);
      } else {
        setTextIndex((prev) => (prev + 1) % textOptions.length);
        setIsTyping(true);
      }
    }
    
    return () => clearTimeout(timeout);
  }, [animatedText, isTyping, textIndex, textOptions]);

  const socialLinks = [
    { icon: <FaTwitter className="w-4 h-4" />, name: "Twitter", url: "https://twitter.com/bookqubit" },
    { icon: <FaInstagram className="w-4 h-4" />, name: "Instagram", url: "https://instagram.com/bookqubit" },
    { icon: <FaFacebook className="w-4 h-4" />, name: "Facebook", url: "https://facebook.com/bookqubit" },
    { icon: <FaLinkedin className="w-4 h-4" />, name: "LinkedIn", url: "https://linkedin.com/company/bookqubit" },
    { icon: <FaDiscord className="w-4 h-4" />, name: "Discord", url: "https://discord.gg/bookqubit" },
  ];

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: "BookQubit",
        text: "India's First Book Discovery Platform - Discover books in 20+ languages!",
        url: "https://bookqubit.com",
      });
    } else {
      navigator.clipboard.writeText("https://bookqubit.com");
      alert("Link copied!");
    }
  };

  return (
    <section
      className={`${theme.background?.section || "bg-gradient-to-br from-orange-50 to-red-50 dark:from-gray-900 dark:to-gray-800"} py-8 px-4`}
      style={{ fontFamily: currentFont?.family }}
    >
      <div className="max-w-md mx-auto">
        {/* Header with Animation */}
        <div className="text-center mb-6">
          <div className="flex items-center justify-center gap-2 mb-3">
            <div className="p-2 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg">
              <FaBook className="w-5 h-5 text-white" />
            </div>
            <h1 className={`text-2xl font-bold ${theme.textColors?.primary || "text-gray-900 dark:text-white"}`}>
              BookQubit
            </h1>
          </div>
          
          {/* Typing Animation - Simple Text Only */}
          <div className="h-14 flex items-center justify-center px-2">
            <p className={`text-sm md:text-base font-medium ${theme.textColors?.primary || "text-gray-800 dark:text-white"} text-center`}>
              {animatedText}
              <span className="inline-block w-0.5 h-4 bg-orange-500 animate-pulse ml-1"></span>
            </p>
          </div>
        </div>

        {/* Key Features Grid */}
        <div className="grid grid-cols-1 gap-3 mb-6">
          {/* India's First */}
          <div className={`${theme.background?.card || "bg-white/80 dark:bg-gray-800/80"} backdrop-blur-sm rounded-lg p-3 flex items-center gap-3 shadow-sm border ${theme.border?.default || "border-orange-200 dark:border-gray-700"}`}>
            <div className="p-2 bg-orange-100 dark:bg-orange-900/30 rounded-lg">
              <FaGlobe className="w-4 h-4 text-orange-600 dark:text-orange-400" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white">India's First</h3>
              <p className="text-xs text-gray-600 dark:text-gray-400">Book Discovery Platform</p>
            </div>
          </div>

          {/* 20+ Languages */}
          <div className={`${theme.background?.card || "bg-white/80 dark:bg-gray-800/80"} backdrop-blur-sm rounded-lg p-3 flex items-center gap-3 shadow-sm border ${theme.border?.default || "border-green-200 dark:border-gray-700"}`}>
            <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
              <FaLanguage className="w-4 h-4 text-green-600 dark:text-green-400" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white">20+ Languages</h3>
              <p className="text-xs text-gray-600 dark:text-gray-400">Books in your preferred language</p>
            </div>
          </div>

          {/* Drift Network */}
          <div className={`${theme.background?.card || "bg-white/80 dark:bg-gray-800/80"} backdrop-blur-sm rounded-lg p-3 flex items-center gap-3 shadow-sm border ${theme.border?.default || "border-purple-200 dark:border-gray-700"}`}>
            <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
              <FaUsers className="w-4 h-4 text-purple-600 dark:text-purple-400" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white">Drift Network</h3>
              <p className="text-xs text-gray-600 dark:text-gray-400">For Readers, Writers, Comic Artists</p>
            </div>
          </div>
        </div>

        {/* Social Links */}
        <div className="flex justify-center gap-4 mb-6">
          {socialLinks.map((social, idx) => (
            <a
              key={idx}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`p-2 rounded-full transition-all hover:scale-110 ${
                idx === 0 ? "bg-blue-400" :
                idx === 1 ? "bg-pink-500" :
                idx === 2 ? "bg-blue-600" :
                idx === 3 ? "bg-blue-700" :
                "bg-indigo-500"
              } text-white`}
            >
              {social.icon}
            </a>
          ))}
        </div>

        {/* Share Button */}
        <div className="flex justify-center">
          <button
            onClick={handleShare}
            className="flex items-center gap-2 px-6 py-2 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-lg shadow-md hover:shadow-lg transition-all"
          >
            <FaShareAlt className="w-4 h-4" />
            <span className="text-sm font-medium">Share</span>
          </button>
        </div>
      </div>
    </section>
  );
};

export default BookQubit_Mobile;