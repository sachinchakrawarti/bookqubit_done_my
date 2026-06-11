"use client";

import { useState, useEffect } from "react";
import UserDashboardDesktop from "./user-dashboard-desktop/user-dashboard-desktop";
import UserDashboardMobile from "./user-dashboard-mobile/user-dashboard-mobile";

export default function UserDashboard() {
  const [isMobile, setIsMobile] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Check screen size for mobile view
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  if (!mounted) return null;

  // Render appropriate version based on screen size
  return isMobile ? <UserDashboardMobile /> : <UserDashboardDesktop />;
}