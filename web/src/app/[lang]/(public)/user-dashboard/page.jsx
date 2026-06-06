"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import UserDashboard from "@/features/user-dashboard/user-dashboard";
import MobileMenuPage from "@/features/user-dashboard/components/MobileMenuPage";

export default function DashboardPage() {
  const [isMobile, setIsMobile] = useState(false);
  const searchParams = useSearchParams();
  const tab = searchParams?.get('tab');

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // On mobile: if no tab selected, show menu page
  if (isMobile && !tab) {
    return <MobileMenuPage />;
  }

  // On mobile with tab selected OR desktop, show dashboard
  return <UserDashboard />;
}