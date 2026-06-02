"use client";

import Link from "next/link";
import { useTheme } from "@/themes/useTheme";

export default function TagCloud({ tags, language = "en" }) {
  const { theme, themeName } = useTheme();
  const isDarkMode = themeName === 'dark' || themeName === 'midnight' || themeName === 'cyberpunk';

  // Calculate weight for tag cloud
  const getWeight = (count) => {
    const maxCount = Math.max(...tags.map(t => t.count));
    const minCount = Math.min(...tags.map(t => t.count));
    const range = maxCount - minCount;
    
    if (range === 0) return 3;
    
    const weight = Math.ceil((count - minCount) / range * 5);
    return Math.min(Math.max(weight, 1), 6);
  };

  const getSizeClass = (weight) => {
    const sizes = {
      1: "text-xs",
      2: "text-sm",
      3: "text-base",
      4: "text-lg",
      5: "text-xl",
      6: "text-2xl",
    };
    return sizes[weight] || "text-base";
  };

  const getColorClass = (weight) => {
    const colors = {
      1: "text-gray-400 dark:text-gray-600",
      2: "text-gray-500 dark:text-gray-500",
      3: "text-sky-500 dark:text-sky-400",
      4: "text-sky-600 dark:text-sky-300",
      5: "text-sky-700 dark:text-sky-200",
      6: "text-sky-800 dark:text-sky-100",
    };
    return colors[weight] || "text-sky-600 dark:text-sky-400";
  };

  return (
    <div className="flex flex-wrap gap-3 p-6">
      {tags.map((tag) => {
        const weight = getWeight(tag.count);
        return (
          <Link
            key={tag.name}
            href={`/${language}/tag/${encodeURIComponent(tag.name)}`}
            className={`inline-block transition-all duration-200 hover:scale-110 ${getSizeClass(weight)} ${getColorClass(weight)} hover:text-sky-700 dark:hover:text-sky-300 font-medium`}
            style={{
              opacity: 0.7 + (weight * 0.05),
            }}
          >
            {tag.name}
            <span className="text-xs ml-1 text-gray-400 dark:text-gray-600">
              ({tag.count})
            </span>
          </Link>
        );
      })}
    </div>
  );
}