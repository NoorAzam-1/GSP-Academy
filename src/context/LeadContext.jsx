"use client";

import { createContext, useContext, useState, useCallback } from "react";
import { INITIAL_LEADS, INITIAL_PAYMENTS, INITIAL_FOLLOW_UPS, MOCK_STAFF } from "@/constants";

const LeadContext = createContext(null);

export function LeadProvider({ children }) {
  const [leads, setLeads] = useState(INITIAL_LEADS);
  const [payments, setPayments] = useState(INITIAL_PAYMENTS);
  const [followUps, setFollowUps] = useState(INITIAL_FOLLOW_UPS);
  const [staff] = useState(MOCK_STAFF);
  const [toasts, setToasts] = useState([]);

  const showToast = useCallback((title, message, type = "success") => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, title, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  }, []);

  const addLead = useCallback((lead) => {
    const newLead = {
      id: Date.now(),
      ...lead,
      date: new Date().toISOString().split("T")[0],
      updatedAt: new Date().toISOString().split("T")[0],
    };
    setLeads((prev) => [newLead, ...prev]);
    return newLead;
  }, []);

  const updateLead = useCallback((leadId, updates) => {
    setLeads((prev) =>
      prev.map((l) =>
        l.id === leadId
          ? { ...l, ...updates, updatedAt: new Date().toISOString().split("T")[0] }
          : l
      )
    );
  }, []);

  const updateLeadStatus = useCallback((leadId, newStatus) => {
    setLeads((prev) =>
      prev.map((l) =>
        l.id === leadId
          ? { ...l, status: newStatus, updatedAt: new Date().toISOString().split("T")[0] }
          : l
      )
    );
  }, []);

  const assignLead = useCallback((leadId, staffId, staffName) => {
    setLeads((prev) =>
      prev.map((l) =>
        l.id === leadId
          ? { ...l, assignedTo: staffId, assignedToName: staffName, updatedAt: new Date().toISOString().split("T")[0] }
          : l
      )
    );
  }, []);

  const addFollowUp = useCallback((leadId, note, createdBy) => {
    const newFollowUp = {
      id: Date.now(),
      leadId,
      note,
      date: new Date().toISOString().split("T")[0],
      createdBy,
    };
    setFollowUps((prev) => [...prev, newFollowUp]);
    setLeads((prev) =>
      prev.map((l) =>
        l.id === leadId
          ? { ...l, status: "Follow-up", updatedAt: new Date().toISOString().split("T")[0] }
          : l
      )
    );
    return newFollowUp;
  }, []);

  return (
    <LeadContext.Provider
      value={{
        leads,
        setLeads,
        payments,
        setPayments,
        followUps,
        staff,
        toasts,
        showToast,
        addLead,
        updateLead,
        updateLeadStatus,
        assignLead,
        addFollowUp,
      }}
    >
      {children}
    </LeadContext.Provider>
  );
}

export function useLeads() {
  const context = useContext(LeadContext);
  if (!context) {
    throw new Error("useLeads must be used within a LeadProvider");
  }
  return context;
}
