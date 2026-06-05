"use client";

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { useTheme } from '@/themes/useTheme';
import { useFont } from '@/contexts/FontContext';

// Dynamically import layouts with no SSR
const DesktopLayout = dynamic(() => import('./desktop_layout/DesktopLayout'), {
  ssr: false,
});

const MobileLayout = dynamic(() => import('./mobile_layout/MobileLayout'), {
  ssr: false,
});

export default function ResponsiveLayout({ children }) {
  const { theme, themeName } = useTheme();
  const { currentFont } = useFont();
  const [isMobile, setIsMobile] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Check if component is mounted (to avoid hydration mismatch)
  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Apply theme class to body
  useEffect(() => {
    if (mounted) {
      document.body.className = `theme-${themeName}`;
      document.body.setAttribute('data-theme', themeName);
      document.body.style.fontFamily = currentFont?.family || 'inherit';
      
      return () => {
        document.body.className = '';
        document.body.removeAttribute('data-theme');
        document.body.style.fontFamily = '';
      };
    }
  }, [themeName, currentFont, mounted]);

  // Don't render anything on server to avoid hydration mismatch
  if (!mounted) {
    return (
      <div className={`responsive-layout ${themeName}`}>
        <div className="loading-container">
          <div className="loading-spinner"></div>
        </div>
      </div>
    );
  }

  return (
    <div 
      className={`responsive-layout ${themeName}`}
      style={{ 
        fontFamily: currentFont?.family,
        minHeight: '100vh',
      }}
    >
      {/* Cyberpunk Grid Overlay */}
      {themeName === 'cyberpunk' && (
        <div className="cyberpunk-grid-overlay"></div>
      )}
      
      {/* Theme-specific background effects */}
      {themeName === 'midnight' && (
        <div className="midnight-stars"></div>
      )}
      
      {isMobile ? (
        <MobileLayout>{children}</MobileLayout>
      ) : (
        <DesktopLayout>{children}</DesktopLayout>
      )}
    </div>
  );
}