"use client";

import { useState, useEffect } from "react";
import { useTheme } from "@/themes/useTheme";
import { useFont } from "@/contexts/FontContext";
import { useRTL } from "@/contexts/RTLContext";
import MessagesDesktop from "./MessagesDesktop";
import MessagesMobile from "./MessagesMobile";
import "./messages.css";

export default function MessagesPage() {
  const { theme, themeName } = useTheme();
  const { currentFont } = useFont();
  const { direction } = useRTL();
  const [isMobile, setIsMobile] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  if (!mounted) return null;

  const fontStyle = currentFont?.family
    ? { fontFamily: currentFont.family }
    : {};

  return (
    <div
      dir={direction}
      style={fontStyle}
      className={`messages-page ${themeName}`}
    >
      <div className="desktop-wrapper">
        <MessagesDesktop />
      </div>
      <div className="mobile-wrapper">
        <MessagesMobile />
      </div>
    </div>
  );
}
