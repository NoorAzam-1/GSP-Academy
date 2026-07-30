"use client";

import dynamic from "next/dynamic";
import DashboardCard from "./DashboardCard";
import { useDashboard } from "@/context/DashboardContext";
import { formatCurrency } from "@/utils";

const RevenueChart = dynamic(() => import("./RevenueChart"), { ssr: false });
const EnrollmentChart = dynamic(() => import("./EnrollmentChart"), { ssr: false });

export default function AdminDashboard() {
  const { stats } = useDashboard();

  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-bold text-slate-900 mb-4">Lead Analytics</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <DashboardCard title="Total Leads" value={stats.totalLeads} trend="+18%" icon="Users" trendUp={true} />
          <DashboardCard title="New This Month" value={stats.newThisMonth} trend="+8%" icon="Users" trendUp={true} />
          <DashboardCard title="Total Academy Leads" value={stats.academyLeads} trend="+12%" icon="GraduationCap" trendUp={true} />
          <DashboardCard title="Total Entrance Leads" value={stats.entranceLeads} trend="+15%" icon="FileText" trendUp={true} />
          <DashboardCard title="Converted" value={stats.converted} trend="+10%" icon="CheckCircle2" trendUp={true} />
          <DashboardCard title="Pending" value={stats.pending} trend="+5%" icon="AlertCircle" trendUp={false} />
          <DashboardCard title="Rejected / Lost" value={stats.lost} trend="-2%" icon="XCircle" trendUp={false} />
          <DashboardCard title="Active Follow-ups" value={stats.activeFollowUps} trend="+7%" icon="PhoneCall" trendUp={true} />
        </div>
      </div>

      <div>
        <h3 className="text-lg font-bold text-slate-900 mb-4">Revenue Analytics</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <DashboardCard title="Total Revenue" value={formatCurrency(stats.totalRevenue)} trend="+12%" icon="CreditCard" trendUp={true} />
          <DashboardCard title="Pending Fees" value={formatCurrency(stats.pendingFees)} trend="+3%" icon="AlertCircle" trendUp={false} />
          <DashboardCard title="Students with Due" value={stats.studentsWithDue} trend="+2%" icon="Users" trendUp={false} />
          <DashboardCard title="Follow-ups Due Today" value={stats.followUpDueToday} trend="-" icon="Bell" trendUp={true} />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <RevenueChart />
        <EnrollmentChart />
      </div>
    </div>
  );
}
