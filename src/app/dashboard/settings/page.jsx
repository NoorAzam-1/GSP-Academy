"use client";

import AppLayout from "@/components/layout/AppLayout";
import SettingsView from "@/components/settings/SettingsView";
import { useLeads } from "@/context/LeadContext";

export default function SettingsPage() {
  const { showToast } = useLeads();

  return (
    <AppLayout title="Settings">
      <SettingsView showToast={showToast} />
    </AppLayout>
  );
}
