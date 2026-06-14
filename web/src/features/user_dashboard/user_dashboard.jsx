"use client";

import { useState, useEffect } from "react";
import UserDashboardDesktop from "./user_dashboard_desktop/user_dashboard_desktop";
import UserDashboardMobile from "./user_dashboard_mobile/user_dashboard_mobile";
import "./user_dashboard.css";

export default function UserDashboard() {
  const [isMobile, setIsMobile] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  if (!mounted) return null;

  return isMobile ? <UserDashboardMobile /> : <UserDashboardDesktop />;
}
