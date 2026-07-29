import { REVENUE_DATA, COURSE_DISTRIBUTION } from "@/constants";

export function getRevenueData() {
  return Promise.resolve(REVENUE_DATA);
}

export function getCourseDistribution() {
  return Promise.resolve(COURSE_DISTRIBUTION);
}

export function getDashboardStats(leads, payments) {
  const academyLeads = leads.filter((l) => l.product === "academy");
  const entranceLeads = leads.filter((l) => l.product === "entrance");

  return Promise.resolve({
    academyLeads: academyLeads.length,
    academyAdmissions: academyLeads.filter((l) => l.status === "Converted").length,
    academyFollowUps: academyLeads.filter((l) => l.status === "Contacted").length,
    entranceLeads: entranceLeads.length,
    entranceRegistrations: entranceLeads.filter((l) => l.status === "Converted").length,
    entranceFollowUps: entranceLeads.filter((l) => l.status === "Contacted").length,
  });
}
