import { INITIAL_LEADS } from "@/constants";

export function getLeads() {
  return Promise.resolve(INITIAL_LEADS);
}

export function getLeadsByProduct(product) {
  return Promise.resolve(INITIAL_LEADS.filter((l) => l.product === product));
}

export function createLead(leadData) {
  const newLead = {
    id: Date.now(),
    ...leadData,
    status: "New",
    date: new Date().toISOString().split("T")[0],
  };
  return Promise.resolve(newLead);
}

export function updateLeadStatus(leadId, newStatus) {
  return Promise.resolve({ id: leadId, status: newStatus });
}
