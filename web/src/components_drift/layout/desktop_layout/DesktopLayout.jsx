"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import SidebarLeft from './sidebarleft/SidebarLeft';
import SidebarRight from './sidebarright/SidebarRight';
import MiddleContent from './MiddleContent';
import './DesktopLayout.css';
import { useTheme } from "@/themes/useTheme";

export default function DesktopLayout({ children }) {
  const { themeName } = useTheme();
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isRightSidebarOpen, setIsRightSidebarOpen] = useState(false);

  // ONLY show right sidebar on the home page (/drift, /en/drift, /fr/drift, etc.)
  const isHomePage = 
    pathname === "/drift" || 
    pathname === "/drift/" || 
    pathname?.match(/^\/[a-z]{2}\/drift$/) !== null;

  const showRightSidebar = isHomePage;

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 1024) {
        setIsMobileMenuOpen(false);
        setIsRightSidebarOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className={`drift-desktop-layout ${themeName}`}>
      <div className="layout-container">
        <SidebarLeft isMobileOpen={isMobileMenuOpen} />
        <div className="middle-content-wrapper">
          <MiddleContent>
            {children}
          </MiddleContent>
        </div>
        {showRightSidebar && (
          <SidebarRight isOpen={isRightSidebarOpen} />
        )}
      </div>
    </div>
  );
}