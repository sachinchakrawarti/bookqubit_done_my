"use client";

import { useTheme } from "@/themes/useTheme";
import { useFont } from "@/contexts/FontContext";
import "./MiddleContent.css";

export default function MiddleContent({ children }) {
  const { theme, themeName } = useTheme();
  const { currentFont } = useFont();

  return (
    <main className={`drift-middle-content ${themeName}`} style={{ fontFamily: currentFont?.family }}>
      <div className="middle-content-container">
        {children}
      </div>
    </main>
  );
}