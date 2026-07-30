"use client";

import AppLayout from "@/components/layout/AppLayout";
import LeadsView from "@/components/leads/LeadsView";
import { useLeads } from "@/context/LeadContext";
import { useAuth } from "@/context/AuthContext";

export default function AcademyLeadsPage() {
  const { leads, setLeads, showToast } = useLeads();
  const { user } = useAuth();

  const academyLeads = leads.filter((l) => l.product === "academy" || !l.product);
  const filteredLeads = user?.role === "staff"
    ? academyLeads.filter((l) => l.assignedTo === user.id)
    : academyLeads;

  return (
    <AppLayout title="Academy Leads">
      <LeadsView
        leads={filteredLeads}
        setLeads={(updated) => {
          const otherLeads = leads.filter(
            (l) => (l.product !== "academy" && l.product) || (user?.role === "staff" && l.assignedTo !== user.id)
          );
          setLeads([...otherLeads, ...updated]);
        }}
        showToast={showToast}
        title="Academy Leads"
        showStaffFilter={user?.role === "admin"}
        showAssign={user?.role === "admin"}
      />
    </AppLayout>
  );
}
