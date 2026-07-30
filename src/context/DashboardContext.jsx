"use client";

import { createContext, useContext, useMemo } from "react";
import { useLeads } from "./LeadContext";
import { useAuth } from "./AuthContext";
import { getTodayString } from "@/utils";

const DashboardContext = createContext(null);

export function DashboardProvider({ children }) {
  const { leads, payments, followUps } = useLeads();
  const { user } = useAuth();
  const today = getTodayString();

  const adminStats = useMemo(() => {
    const academyLeads = leads.filter((l) => l.product === "academy" || !l.product);
    const entranceLeads = leads.filter((l) => l.product === "entrance");
    const totalLeads = leads.length;
    const newThisMonth = leads.filter(
      (l) => l.date >= "2026-06-01" && l.date <= "2026-06-30"
    ).length;
    const converted = leads.filter((l) => l.status === "Converted").length;
    const pending = leads.filter((l) => l.status === "New" || l.status === "Contacted").length;
    const lost = leads.filter((l) => l.status === "Lost" || l.status === "Rejected").length;
    const activeFollowUps = leads.filter((l) => l.status === "Follow-up").length;
    const followUpDueToday = leads.filter(
      (l) => l.followUpDate === today
    ).length;

    const totalRevenue = payments.reduce((acc, p) => acc + p.totalFee, 0);
    const collectedFees = payments.reduce((acc, p) => acc + p.paid, 0);
    const pendingFees = payments.reduce((acc, p) => acc + p.due, 0);
    const studentsWithDue = payments.filter((p) => p.due > 0).length;

    return {
      academyLeads: academyLeads.length,
      academyAdmissions: academyLeads.filter((l) => l.status === "Converted").length,
      academyFollowUps: academyLeads.filter((l) => l.status === "Follow-up").length,
      entranceLeads: entranceLeads.length,
      entranceRegistrations: entranceLeads.filter((l) => l.status === "Converted").length,
      entranceFollowUps: entranceLeads.filter((l) => l.status === "Follow-up").length,
      totalLeads,
      newThisMonth,
      converted,
      pending,
      lost,
      activeFollowUps,
      followUpDueToday,
      totalRevenue,
      collectedFees,
      pendingFees,
      studentsWithDue,
    };
  }, [leads, payments, today]);

  const staffStats = useMemo(() => {
    if (!user) return {};
    const myLeads = leads.filter((l) => l.assignedTo === user.id);
    const academyAssigned = myLeads.filter((l) => l.product === "academy" || !l.product);
    const entranceAssigned = myLeads.filter((l) => l.product === "entrance");
    const handled = myLeads.filter(
      (l) => l.status === "Converted" || l.status === "Closed" || l.status === "Lost"
    ).length;
    const converted = myLeads.filter((l) => l.status === "Converted").length;
    const pendingFollowUps = myLeads.filter((l) => l.status === "Follow-up").length;
    const todayFollowUps = myLeads.filter(
      (l) => l.followUpDate === today
    ).length;
    const overdueFollowUps = myLeads.filter(
      (l) => l.followUpDate && l.followUpDate < today && l.status !== "Converted" && l.status !== "Closed"
    ).length;
    const recentActivity = followUps
      .filter((f) => {
        const lead = myLeads.find((l) => l.id === f.leadId);
        return !!lead;
      })
      .sort((a, b) => new Date(b.date) - new Date(a.date))
      .slice(0, 5);
    const myStudentsWithDue = payments
      .filter((p) => p.assignedTo === user.id && p.due > 0)
      .map((p) => ({
        studentName: p.studentName,
        course: p.course,
        totalFee: p.totalFee,
        paid: p.paid,
        due: p.due,
        dueDate: p.dueDate,
        status: p.status,
      }));

    return {
      totalAssigned: myLeads.length,
      academyAssigned: academyAssigned.length,
      entranceAssigned: entranceAssigned.length,
      handled,
      converted,
      pendingFollowUps,
      todayFollowUps,
      overdueFollowUps,
      recentActivity,
      myStudentsWithDue,
      allLeads: myLeads,
    };
  }, [leads, user, followUps, payments, today]);

  const leadManagerStats = useMemo(() => {
    if (!user) return {};
    const myLeads = leads.filter((l) => l.assignedTo === user.id);
    const academyAssigned = myLeads.filter((l) => l.product === "academy" || !l.product);
    const entranceAssigned = myLeads.filter((l) => l.product === "entrance");
    const converted = myLeads.filter((l) => l.status === "Converted").length;
    const pendingFollowUps = myLeads.filter((l) => l.status === "Follow-up").length;
    const todayFollowUps = myLeads.filter((l) => l.followUpDate === today).length;
    const overdueFollowUps = myLeads.filter(
      (l) => l.followUpDate && l.followUpDate < today && l.status !== "Converted" && l.status !== "Closed"
    ).length;
    const recentActivity = followUps
      .filter((f) => myLeads.some((l) => l.id === f.leadId))
      .sort((a, b) => new Date(b.date) - new Date(a.date))
      .slice(0, 5);

    return {
      totalAssigned: myLeads.length,
      academyAssigned: academyAssigned.length,
      entranceAssigned: entranceAssigned.length,
      converted,
      pendingFollowUps,
      todayFollowUps,
      overdueFollowUps,
      recentActivity,
      allLeads: myLeads,
    };
  }, [leads, user, followUps, today]);

  const feeManagerStats = useMemo(() => {
    if (!user) return {};
    const totalRevenue = payments.reduce((acc, p) => acc + p.totalFee, 0);
    const collectedFees = payments.reduce((acc, p) => acc + p.paid, 0);
    const pendingFees = payments.reduce((acc, p) => acc + p.due, 0);
    const studentsWithDue = payments.filter((p) => p.due > 0).length;
    const studentsWithDueList = payments
      .filter((p) => p.due > 0)
      .map((p) => ({
        studentName: p.studentName,
        course: p.course,
        totalFee: p.totalFee,
        paid: p.paid,
        due: p.due,
        dueDate: p.dueDate,
        status: p.status,
      }));

    return {
      totalRevenue,
      collectedFees,
      pendingFees,
      studentsWithDue,
      studentsWithDueList,
    };
  }, [payments]);

  const stats = useMemo(() => {
    if (user?.role === "admin") return adminStats;
    if (user?.role === "lead_manager") return leadManagerStats;
    if (user?.role === "fee_manager") return feeManagerStats;
    return staffStats;
  }, [user, adminStats, staffStats, leadManagerStats, feeManagerStats]);

  return (
    <DashboardContext.Provider value={{ stats, adminStats, staffStats, leadManagerStats, feeManagerStats }}>
      {children}
    </DashboardContext.Provider>
  );
}

export function useDashboard() {
  const context = useContext(DashboardContext);
  if (!context) {
    throw new Error("useDashboard must be used within a DashboardProvider");
  }
  return context;
}
