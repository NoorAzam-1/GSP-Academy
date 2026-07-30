"use client";

import { useState } from "react";
import { Mail, AlertCircle, Search } from "lucide-react";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { PaymentStatusBadge } from "@/components/ui/StatusBadge";
import Table from "@/components/ui/Table";
import EmptyState from "@/components/ui/EmptyState";
import { getDaysDifference, formatCurrency } from "@/utils";
import { PAYMENT_STATUSES } from "@/constants";
import { useAuth } from "@/context/AuthContext";
import { useLeads } from "@/context/LeadContext";

export default function PaymentsView({ payments: propPayments, showToast }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const { user } = useAuth();
  const { payments: allPayments } = useLeads();

  const payments = propPayments || allPayments;
  const isStaff = user?.role === "staff";

  const visiblePayments = isStaff
    ? payments.filter((p) => p.assignedTo === user.id)
    : payments;

  const filteredPayments = visiblePayments.filter((p) => {
    const matchesSearch =
      p.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.course.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "All" ? true : p.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleRemind = (studentName) => {
    showToast(
      "Reminder Sent",
      `Payment reminder email sent to ${studentName}.`,
      "success"
    );
  };

  const totalExpected = visiblePayments.reduce((acc, p) => acc + p.totalFee, 0);
  const totalCollected = visiblePayments.reduce((acc, p) => acc + p.paid, 0);
  const totalOverdue = visiblePayments.reduce(
    (acc, p) => (p.status === "Overdue" ? acc + p.due : acc),
    0
  );

  const tableHeaders = [
    { label: "Student Info" },
    { label: "Total Fee" },
    { label: "Paid Amount" },
    { label: "Due Amount" },
    { label: "Due Date" },
    { label: "Status" },
    { label: "Actions", align: "right" },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-slate-900">
          Fee & Payment Status
        </h2>
        <p className="text-slate-500 text-sm">
          {isStaff ? "View payment status for your assigned students." : "Manage student fees and send reminders."}
        </p>
      </div>

      {!isStaff && (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Card className="p-4 bg-blue-50/50 border-blue-100">
            <p className="text-sm font-medium text-blue-600 mb-1">Total Expected</p>
            <h3 className="text-xl font-bold text-slate-900">{formatCurrency(totalExpected)}</h3>
          </Card>
          <Card className="p-4 bg-emerald-50/50 border-emerald-100">
            <p className="text-sm font-medium text-emerald-600 mb-1">Total Collected</p>
            <h3 className="text-xl font-bold text-slate-900">{formatCurrency(totalCollected)}</h3>
          </Card>
          <Card className="p-4 bg-rose-50/50 border-rose-100">
            <p className="text-sm font-medium text-rose-600 mb-1">Total Overdue</p>
            <h3 className="text-xl font-bold text-slate-900">{formatCurrency(totalOverdue)}</h3>
          </Card>
        </div>
      )}

      <Card className="overflow-hidden">
        <div className="p-4 border-b border-slate-100 flex flex-col sm:flex-row items-center gap-4 justify-between">
          <div className="relative w-full sm:w-72">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              size={18}
            />
            <input
              type="text"
              placeholder="Search student or course..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="w-full sm:w-auto flex items-center gap-2">
            <span className="text-sm text-slate-500 font-medium">Filter Status:</span>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {PAYMENT_STATUSES.map((s) => (
                <option key={s} value={s}>{s === "All" ? "All Statuses" : s}</option>
              ))}
            </select>
          </div>
        </div>
        <Table headers={tableHeaders}>
          {filteredPayments.length === 0 ? (
            <EmptyState message="No payments found." />
          ) : (
            filteredPayments.map((payment) => {
              const daysUntilDue = getDaysDifference(payment.dueDate);
              const isNearingDue = daysUntilDue > 0 && daysUntilDue <= 5 && payment.status !== "Paid";

              return (
                <tr key={payment.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-6 py-4">
                    <p className="font-medium text-slate-900">{payment.studentName}</p>
                    <p className="text-xs text-slate-500">{payment.course}</p>
                  </td>
                  <td className="px-6 py-4 font-medium">{formatCurrency(payment.totalFee)}</td>
                  <td className="px-6 py-4 text-emerald-600">{formatCurrency(payment.paid)}</td>
                  <td className="px-6 py-4 text-rose-600 font-medium">{formatCurrency(payment.due)}</td>
                  <td className="px-6 py-4">
                    <span className={payment.status === "Overdue" ? "text-rose-600 font-medium flex items-center gap-1" : ""}>
                      {payment.status === "Overdue" && <AlertCircle size={14} />}
                      {payment.dueDate}
                    </span>
                    {isNearingDue && (
                      <p className="text-xs text-amber-600 font-medium mt-1">Due in {daysUntilDue} days</p>
                    )}
                  </td>
                  <td className="px-6 py-4"><PaymentStatusBadge status={payment.status} /></td>
                  <td className="px-6 py-4 text-right">
                    {payment.due > 0 ? (
                      <Button
                        size="sm"
                        variant={payment.status === "Overdue" || isNearingDue ? "primary" : "secondary"}
                        onClick={() => handleRemind(payment.studentName)}
                      >
                        <Mail size={14} /> Send Email
                      </Button>
                    ) : (
                      <span className="text-sm text-slate-400 italic px-4">Settled</span>
                    )}
                  </td>
                </tr>
              );
            })
          )}
        </Table>
      </Card>
    </div>
  );
}
