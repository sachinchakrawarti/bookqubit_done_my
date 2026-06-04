"use client";

import { useState } from "react";
import SidebarLeft from './SidebarLeft';
import SidebarRight from './SidebarRight';
import MiddleContent from './MiddleContent';
import Navbar from './Navbar';
import './DesktopLayout.css';

export default function DesktopLayout({ children }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <div className="drift-desktop-layout">
      <Navbar onMenuClick={toggleMobileMenu} isMobileMenuOpen={isMobileMenuOpen} />
      
      <div className="layout-container">
        <SidebarLeft isMobileOpen={isMobileMenuOpen} />
        <MiddleContent>
          {children}
        </MiddleContent>
        <SidebarRight />
      </div>

      {/* MobileMenu component has been removed */}
    </div>
  );
}