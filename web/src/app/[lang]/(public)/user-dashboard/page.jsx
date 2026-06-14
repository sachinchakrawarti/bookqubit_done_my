"use client";

import UserDashboard from "@/features/user_dashboard/user_dashboard";
import { Suspense } from "react";

// Loading component
function DashboardLoading() {
  return (
    <div className="dashboard-loading">
      <div className="loading-spinner"></div>
      <p>Loading your dashboard...</p>
    </div>
  );
}

export default function UserDashboardPage() {
  return (
    <Suspense fallback={<DashboardLoading />}>
      <UserDashboard />
    </Suspense>
  );
}
