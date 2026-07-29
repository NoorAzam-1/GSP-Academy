"use client";

import { AuthProvider } from "@/context/AuthContext";
import { LeadProvider } from "@/context/LeadContext";
import { DashboardProvider } from "@/context/DashboardContext";

export default function Providers({ children }) {
  return (
    <AuthProvider>
      <LeadProvider>
        <DashboardProvider>
          {children}
        </DashboardProvider>
      </LeadProvider>
    </AuthProvider>
  );
}
