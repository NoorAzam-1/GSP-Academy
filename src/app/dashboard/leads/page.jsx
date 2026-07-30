"use client";

import AppLayout from "@/components/layout/AppLayout";
import LeadsView from "@/components/leads/LeadsView";
import { useLeads } from "@/context/LeadContext";
import { useAuth } from "@/context/AuthContext";

export default function AllLeadsPage() {
  const { leads, setLeads, showToast } = useLeads();
  const { user } = useAuth();

  const filteredLeads = user?.role === "staff"
    ? leads.filter((l) => l.assignedTo === user.id)
    : leads;

  return (
    <AppLayout title={user?.role === "staff" ? "My Leads" : "All Leads"}>
      <LeadsView
        leads={filteredLeads}
        setLeads={(updated) => {
          if (user?.role === "staff") {
            const otherLeads = leads.filter((l) => l.assignedTo !== user.id);
            setLeads([...otherLeads, ...updated]);
          } else {
            setLeads(updated);
          }
        }}
        showToast={showToast}
        title={user?.role === "staff" ? "My Leads" : "All Leads"}
        showStaffFilter={user?.role === "admin"}
        showAssign={user?.role === "admin"}
        showAddLead={true}
      />
    </AppLayout>
  );
}
