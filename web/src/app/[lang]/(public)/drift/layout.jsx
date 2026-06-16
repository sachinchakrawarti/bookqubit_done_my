"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import DesktopLayout from "@/components_drift/layout/desktop_layout/DesktopLayout";
import MobileLayout from "@/components_drift/layout/mobile_layout/MobileLayout";

export default function DriftLayout({ children }) {
  const [isMobile, setIsMobile] = useState(false);
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();

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

  // Check if current route should hide layouts (like messages page)
  const hideLayoutRoutes = ["/drift/messages"];
  const shouldHideLayout = hideLayoutRoutes.some(route => 
    pathname?.startsWith(route)
  );

  // If on messages page, render without layout
  if (shouldHideLayout) {
    return <>{children}</>;
  }

  // Render appropriate layout based on device
  return isMobile ? (
    <MobileLayout>{children}</MobileLayout>
  ) : (
    <DesktopLayout>{children}</DesktopLayout>
  );
}