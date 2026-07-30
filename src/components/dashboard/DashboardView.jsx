"use client";

import { useAuth } from "@/context/AuthContext";
import AdminDashboard from "./AdminDashboard";
import StaffDashboard from "./StaffDashboard";

export default function DashboardView() {
  const { user } = useAuth();

  if (user?.role === "lead_manager" || user?.role === "fee_manager" || user?.role === "staff") {
    return <StaffDashboard />;
  }

  return <AdminDashboard />;
}
