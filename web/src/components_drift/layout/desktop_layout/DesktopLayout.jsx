"use client";

import { useState, useEffect } from "react";
import SidebarLeft from './SidebarLeft';
import SidebarRight from './SidebarRight';
import MiddleContent from './MiddleContent';
import Navbar from './Navbar';
import './DesktopLayout.css';
import { useTheme } from "@/themes/useTheme";

export default function DesktopLayout({ children }) {
  const { themeName } = useTheme();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isRightSidebarOpen, setIsRightSidebarOpen] = useState(false);

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
      {/* <Navbar 
        onMenuClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} 
        onRightSidebarToggle={() => setIsRightSidebarOpen(!isRightSidebarOpen)}
        isMobileMenuOpen={isMobileMenuOpen}
      />
       */}
      <div className="layout-container">
        <SidebarLeft isMobileOpen={isMobileMenuOpen} />
        <MiddleContent>
          {children}
        </MiddleContent>
        <SidebarRight isOpen={isRightSidebarOpen} />
      </div>
    </div>
  );
}