"use client";

import AppLayout from "@/components/layout/AppLayout";
import LeadsView from "@/components/leads/LeadsView";
import { useLeads } from "@/context/LeadContext";
import { useAuth } from "@/context/AuthContext";

export default function EntranceLeadsPage() {
  const { leads, setLeads, showToast } = useLeads();
  const { user } = useAuth();

  const entranceLeads = leads.filter((l) => l.product === "entrance");
  const filteredLeads = user?.role === "staff"
    ? entranceLeads.filter((l) => l.assignedTo === user.id)
    : entranceLeads;

  return (
    <AppLayout title="Entrance Leads">
      <LeadsView
        leads={filteredLeads}
        setLeads={(updated) => {
          const otherLeads = leads.filter(
            (l) => l.product !== "entrance" || (user?.role === "staff" && l.assignedTo !== user.id)
          );
          setLeads([...otherLeads, ...updated]);
        }}
        showToast={showToast}
        title="Entrance Leads"
        showStaffFilter={user?.role === "admin"}
        showAssign={user?.role === "admin"}
      />
    </AppLayout>
  );
}
