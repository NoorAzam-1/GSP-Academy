"use client";

import {Clock } from "lucide-react";
import DashboardCard from "./DashboardCard";
import Card from "@/components/ui/Card";
import { useDashboard } from "@/context/DashboardContext";
import { useAuth } from "@/context/AuthContext";

export default function StaffDashboard() {
  const { stats, feeManagerStats } = useDashboard();
  const { user } = useAuth();
  const isFeeManager = user?.role === "fee_manager";

  return (
    <div className="space-y-8">
      {isFeeManager ? (
        <>
          <h3 className="text-lg font-bold text-slate-900 mb-4">
            Welcome, {user?.name?.split(" ")[0] || "Staff"}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <DashboardCard title="Pending Fees" value={`₹${(feeManagerStats.pendingFees || 0).toLocaleString()}`} trend="-" icon="AlertCircle" trendUp={false} />
            <DashboardCard title="Students with Due" value={feeManagerStats.studentsWithDue || 0} trend="-" icon="Users" trendUp={true} />
             <DashboardCard title="My Assigned Leads" value={stats.totalAssigned || 0} trend="-" icon="Users" trendUp={true} />
              <DashboardCard title="Academy Leads" value={stats.academyAssigned || 0} trend="-" icon="GraduationCap" trendUp={true} />
              <DashboardCard title="Entrance Leads" value={stats.entranceAssigned || 0} trend="-" icon="FileText" trendUp={true} />
              <DashboardCard title="Converted" value={stats.converted || 0} trend="-" icon="CheckCircle2" trendUp={true} />
              <DashboardCard title="Pending Follow-ups" value={stats.pendingFollowUps || 0} trend="-" icon="PhoneCall" trendUp={true} />
              <DashboardCard title="Today's Follow-ups" value={stats.todayFollowUps || 0} trend="-" icon="Bell" trendUp={true} />
              <DashboardCard title="Overdue Follow-ups" value={stats.overdueFollowUps || 0} trend="-" icon="AlertCircle" trendUp={false} />
          </div>

          {feeManagerStats.studentsWithDueList?.length > 0 && (
            <div>
              <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                <Clock size={20} className="text-amber-500" /> Students with Due Payments
              </h3>
              <Card className="overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-sm text-slate-600">
                    <thead className="bg-slate-50 text-slate-500 font-medium border-b border-slate-100">
                      <tr>
                        <th className="px-6 py-4">Student</th>
                        <th className="px-6 py-4">Course</th>
                        <th className="px-6 py-4">Fee Status</th>
                        <th className="px-6 py-4">Amount Paid</th>
                        <th className="px-6 py-4">Amount Due</th>
                        <th className="px-6 py-4">Due Date</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {feeManagerStats.studentsWithDueList.map((s, i) => (
                        <tr key={i} className="hover:bg-slate-50/50">
                          <td className="px-6 py-4 font-medium text-slate-900">{s.studentName}</td>
                          <td className="px-6 py-4">{s.course}</td>
                          <td className="px-6 py-4">
                            <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                              s.status === "Paid" ? "bg-emerald-100 text-emerald-800" :
                              s.status === "Overdue" ? "bg-rose-100 text-rose-800" :
                              "bg-amber-100 text-amber-800"
                            }`}>{s.status}</span>
                          </td>
                          <td className="px-6 py-4 text-emerald-600 font-medium">
                            ₹{s.paid.toLocaleString()}
                          </td>
                          <td className="px-6 py-4 text-rose-600 font-medium">
                            ₹{s.due.toLocaleString()}
                          </td>
                          <td className="px-6 py-4">{s.dueDate}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </Card>
            </div>
          )}
        </>
      ) : (
        <>
          <div>
            <h3 className="text-lg font-bold text-slate-900 mb-4">
              Welcome, {user?.name?.split(" ")[0] || "Staff"}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <DashboardCard title="My Assigned Leads" value={stats.totalAssigned || 0} trend="-" icon="Users" trendUp={true} />
              <DashboardCard title="Academy Leads" value={stats.academyAssigned || 0} trend="-" icon="GraduationCap" trendUp={true} />
              <DashboardCard title="Entrance Leads" value={stats.entranceAssigned || 0} trend="-" icon="FileText" trendUp={true} />
              <DashboardCard title="Converted" value={stats.converted || 0} trend="-" icon="CheckCircle2" trendUp={true} />
              <DashboardCard title="Pending Follow-ups" value={stats.pendingFollowUps || 0} trend="-" icon="PhoneCall" trendUp={true} />
              <DashboardCard title="Today's Follow-ups" value={stats.todayFollowUps || 0} trend="-" icon="Bell" trendUp={true} />
              <DashboardCard title="Overdue Follow-ups" value={stats.overdueFollowUps || 0} trend="-" icon="AlertCircle" trendUp={false} />
            </div>
          </div>
        </>
      )}
    </div>
  );
}
