"use client";
import React, { useState, useEffect, useMemo } from "react";
import {
  LayoutDashboard,
  Users,
  GraduationCap,
  CreditCard,
  Settings,
  Bell,
  Search,
  Plus,
  MoreVertical,
  PhoneCall,
  Mail,
  CheckCircle2,
  XCircle,
  AlertCircle,
  TrendingUp,
  Menu,
  X,
} from "lucide-react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const COURSES = [
  "6th-10th Foundation",
  "11th-12th Academics",
  "JEE Main & Advanced",
  "NEET UG",
  "NIMCET",
  "CUET",
  "CAT",
  "CLAT",
];

const INITIAL_LEADS = [
  {
    id: 1,
    name: "Rahul Sharma",
    phone: "+91 9876543210",
    course: "JEE Main & Advanced",
    status: "New",
    date: "2026-06-01",
  },
  {
    id: 2,
    name: "Priya Patel",
    phone: "+91 9876543211",
    course: "NEET UG",
    status: "Contacted",
    date: "2026-06-02",
  },
  {
    id: 3,
    name: "Amit Kumar",
    phone: "+91 9876543212",
    course: "11th-12th Academics",
    status: "Converted",
    date: "2026-05-28",
  },
  {
    id: 4,
    name: "Neha Singh",
    phone: "+91 9876543213",
    course: "CUET",
    status: "Lost",
    date: "2026-05-30",
  },
  {
    id: 5,
    name: "Vikram Gupta",
    phone: "+91 9876543214",
    course: "CAT",
    status: "New",
    date: "2026-06-04",
  },
];

const INITIAL_PAYMENTS = [
  {
    id: 101,
    studentName: "Amit Kumar",
    course: "11th-12th Academics",
    totalFee: 45000,
    paid: 25000,
    due: 20000,
    dueDate: "2026-06-15",
    status: "Pending",
  },
  {
    id: 102,
    studentName: "Rohan Das",
    course: "JEE Main & Advanced",
    totalFee: 85000,
    paid: 85000,
    due: 0,
    dueDate: "2026-05-10",
    status: "Paid",
  },
  {
    id: 103,
    studentName: "Sneha Roy",
    course: "NEET UG",
    totalFee: 80000,
    paid: 40000,
    due: 40000,
    dueDate: "2026-06-02",
    status: "Overdue",
  },
  {
    id: 104,
    studentName: "Karan Verma",
    course: "6th-10th Foundation",
    totalFee: 30000,
    paid: 10000,
    due: 20000,
    dueDate: "2026-06-20",
    status: "Pending",
  },
  {
    id: 105,
    studentName: "Pooja Iyer",
    course: "CLAT",
    totalFee: 50000,
    paid: 20000,
    due: 30000,
    dueDate: "2026-06-01",
    status: "Overdue",
  },
];

const REVENUE_DATA = [
  { month: "Jan", revenue: 120000 },
  { month: "Feb", revenue: 150000 },
  { month: "Mar", revenue: 180000 },
  { month: "Apr", revenue: 220000 },
  { month: "May", revenue: 280000 },
  { month: "Jun", revenue: 140000 }, // Current month partial
];

const COURSE_DISTRIBUTION = [
  { name: "Academics (6-12)", value: 400 },
  { name: "JEE/NEET", value: 300 },
  { name: "CUET/NIMCET", value: 150 },
  { name: "CAT/CLAT", value: 100 },
];
const COLORS = ["#3b82f6", "#10b981", "#f59e0b", "#8b5cf6"];

// Helper function for date differences
const getDaysDifference = (dateString) => {
  const today = new Date("2026-06-04"); // Using system current date context
  const targetDate = new Date(dateString);
  const diffTime = targetDate - today;
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
};

const Badge = ({ children, variant = "default" }) => {
  const variants = {
    default: "bg-slate-100 text-slate-800",
    success: "bg-emerald-100 text-emerald-800",
    warning: "bg-amber-100 text-amber-800",
    danger: "bg-rose-100 text-rose-800",
    primary: "bg-blue-100 text-blue-800",
  };
  return (
    <span
      className={`px-2.5 py-1 rounded-full text-xs font-medium ${variants[variant] || variants.default}`}
    >
      {children}
    </span>
  );
};

const Card = ({ children, className = "" }) => (
  <div
    className={`bg-white rounded-xl shadow-sm border border-slate-100 ${className}`}
  >
    {children}
  </div>
);

const Button = ({
  children,
  variant = "primary",
  size = "md",
  className = "",
  ...props
}) => {
  const variants = {
    primary: "bg-blue-600 hover:bg-blue-700 text-white shadow-sm",
    secondary:
      "bg-white hover:bg-slate-50 text-slate-700 border border-slate-200",
    danger: "bg-rose-600 hover:bg-rose-700 text-white shadow-sm",
    ghost: "bg-transparent hover:bg-slate-100 text-slate-700",
  };
  const sizes = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-sm",
    lg: "px-6 py-3 text-base",
  };
  return (
    <button
      className={`font-medium rounded-lg transition-colors flex items-center justify-center gap-2 ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

const StatCard = ({ title, value, trend, icon: Icon, trendUp }) => (
  <Card className="p-6">
    <div className="flex items-start justify-between">
      <div>
        <p className="text-sm font-medium text-slate-500 mb-1">{title}</p>
        <h3 className="text-2xl font-bold text-slate-900">{value}</h3>
      </div>
      <div className="p-3 bg-blue-50 rounded-lg text-blue-600">
        <Icon size={24} />
      </div>
    </div>
    <div
      className={`mt-4 flex items-center text-sm ${trendUp ? "text-emerald-600" : "text-rose-600"}`}
    >
      <TrendingUp size={16} className={`mr-1 ${!trendUp && "rotate-180"}`} />
      <span>{trend} vs last month</span>
    </div>
  </Card>
);

const DashboardView = ({ leads, payments }) => {
  const totalDue = payments.reduce((acc, curr) => acc + curr.due, 0);
  const overdueCount = payments.filter((p) => p.status === "Overdue").length;

  return (
    <div className="space-y-6">
      {/* Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Active Leads"
          value={leads.length}
          trend="+12%"
          icon={Users}
          trendUp={true}
        />
        <StatCard
          title="Total Students"
          value="850"
          trend="+5%"
          icon={GraduationCap}
          trendUp={true}
        />
        <StatCard
          title="Monthly Revenue"
          value="₹1,40,000"
          trend="-2%"
          icon={CreditCard}
          trendUp={false}
        />
        <StatCard
          title="Pending Dues"
          value={`₹${totalDue.toLocaleString()}`}
          trend={`${overdueCount} Overdue`}
          icon={AlertCircle}
          trendUp={false}
        />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="p-6 lg:col-span-2">
          <h3 className="text-lg font-bold text-slate-900 mb-6">
            Revenue Overview
          </h3>
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={REVENUE_DATA}
                margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
              >
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis
                  dataKey="month"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#64748b" }}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#64748b" }}
                  tickFormatter={(val) => `₹${val / 1000}k`}
                />
                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  stroke="#e2e8f0"
                />
                <Tooltip
                  contentStyle={{
                    borderRadius: "8px",
                    border: "none",
                    boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                  }}
                  formatter={(value) => [
                    `₹${value.toLocaleString()}`,
                    "Revenue",
                  ]}
                />
                <Area
                  type="monotone"
                  dataKey="revenue"
                  stroke="#3b82f6"
                  strokeWidth={3}
                  fillOpacity={1}
                  fill="url(#colorRevenue)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-bold text-slate-900 mb-6">
            Enrollment by Category
          </h3>
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={COURSE_DISTRIBUTION}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {COURSE_DISTRIBUTION.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    borderRadius: "8px",
                    border: "none",
                    boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-2">
            {COURSE_DISTRIBUTION.map((entry, index) => (
              <div
                key={entry.name}
                className="flex items-center text-xs text-slate-600"
              >
                <span
                  className="w-3 h-3 rounded-full mr-2"
                  style={{ backgroundColor: COLORS[index % COLORS.length] }}
                ></span>
                {entry.name}
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};

import { AreaChart, Area } from "recharts";

const LeadsView = ({ leads, setLeads, showToast }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const handleStatusChange = (leadId, newStatus) => {
    setLeads(
      leads.map((l) => (l.id === leadId ? { ...l, status: newStatus } : l)),
    );
    showToast(
      "Status Updated",
      `Lead status changed to ${newStatus}`,
      "success",
    );
  };

  const filteredLeads = leads.filter(
    (l) =>
      l.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      l.course.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const getStatusBadge = (status) => {
    switch (status) {
      case "New":
        return <Badge variant="primary">New</Badge>;
      case "Contacted":
        return <Badge variant="warning">Contacted</Badge>;
      case "Converted":
        return <Badge variant="success">Converted</Badge>;
      case "Lost":
        return <Badge variant="danger">Lost</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  const handleAddLead = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const newLead = {
      id: Date.now(),
      name: formData.get("name"),
      phone: formData.get("phone"),
      course: formData.get("course"),
      status: "New",
      date: new Date().toISOString().split("T")[0],
    };
    setLeads([newLead, ...leads]);
    setIsAddModalOpen(false);
    showToast("Success", "New lead added successfully!");
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Lead Management</h2>
          <p className="text-slate-500 text-sm">
            Track and manage student inquiries.
          </p>
        </div>
        <Button onClick={() => setIsAddModalOpen(true)}>
          <Plus size={18} /> Add New Lead
        </Button>
      </div>

      <Card className="overflow-hidden">
        <div className="p-4 border-b border-slate-100 flex items-center justify-between">
          <div className="relative w-full sm:w-72">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              size={18}
            />
            <input
              type="text"
              placeholder="Search leads..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow"
            />
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-600">
            <thead className="bg-slate-50 text-slate-500 font-medium border-b border-slate-100">
              <tr>
                <th className="px-6 py-4">Student Name</th>
                <th className="px-6 py-4">Contact</th>
                <th className="px-6 py-4">Course/Exam</th>
                <th className="px-6 py-4">Date</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredLeads.map((lead) => (
                <tr
                  key={lead.id}
                  className="hover:bg-slate-50/50 transition-colors"
                >
                  <td className="px-6 py-4 font-medium text-slate-900">
                    {lead.name}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <PhoneCall size={14} className="text-slate-400" />
                      {lead.phone}
                    </div>
                  </td>
                  <td className="px-6 py-4">{lead.course}</td>
                  <td className="px-6 py-4">{lead.date}</td>
                  <td className="px-6 py-4">{getStatusBadge(lead.status)}</td>
                  <td className="px-6 py-4 text-right">
                    <select
                      value={lead.status}
                      onChange={(e) =>
                        handleStatusChange(lead.id, e.target.value)
                      }
                      className="text-sm bg-white border border-slate-200 rounded-md px-2 py-1 focus:outline-none focus:border-blue-500"
                    >
                      <option value="New">New</option>
                      <option value="Contacted">Contacted</option>
                      <option value="Converted">Converted</option>
                      <option value="Lost">Lost</option>
                    </select>
                  </td>
                </tr>
              ))}
              {filteredLeads.length === 0 && (
                <tr>
                  <td
                    colSpan="6"
                    className="px-6 py-8 text-center text-slate-500"
                  >
                    No leads found matching your search.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Add Lead Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 bg-slate-900/50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-md">
            <div className="p-6 border-b border-slate-100 flex justify-between items-center">
              <h3 className="text-lg font-bold text-slate-900">Add New Lead</h3>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="text-slate-400 hover:text-slate-600"
              >
                <X size={20} />
              </button>
            </div>
            <form onSubmit={handleAddLead} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Student Name
                </label>
                <input
                  required
                  name="name"
                  type="text"
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g. John Doe"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Phone Number
                </label>
                <input
                  required
                  name="phone"
                  type="tel"
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="+91 XXXXXXXXXX"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Target Course/Exam
                </label>
                <select
                  name="course"
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {COURSES.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>
              <div className="pt-4 flex gap-3 justify-end">
                <Button
                  type="button"
                  variant="secondary"
                  onClick={() => setIsAddModalOpen(false)}
                >
                  Cancel
                </Button>
                <Button type="submit">Save Lead</Button>
              </div>
            </form>
          </Card>
        </div>
      )}
    </div>
  );
};

const PaymentsView = ({ payments, setPayments, showToast }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const filteredPayments = payments.filter((p) => {
    const matchesSearch =
      p.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.course.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "All" ? true : p.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleRemind = (studentName, emailSimulated) => {
    showToast(
      "Reminder Sent",
      `Payment reminder email sent to ${studentName}.`,
      "success",
    );
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case "Paid":
        return <Badge variant="success">Paid</Badge>;
      case "Pending":
        return <Badge variant="warning">Pending</Badge>;
      case "Overdue":
        return <Badge variant="danger">Overdue</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-slate-900">
          Fee & Payment Status
        </h2>
        <p className="text-slate-500 text-sm">
          Manage student fees and send reminders.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className="p-4 bg-blue-50/50 border-blue-100">
          <p className="text-sm font-medium text-blue-600 mb-1">
            Total Expected
          </p>
          <h3 className="text-xl font-bold text-slate-900">₹2,90,000</h3>
        </Card>
        <Card className="p-4 bg-emerald-50/50 border-emerald-100">
          <p className="text-sm font-medium text-emerald-600 mb-1">
            Total Collected
          </p>
          <h3 className="text-xl font-bold text-slate-900">₹1,80,000</h3>
        </Card>
        <Card className="p-4 bg-rose-50/50 border-rose-100">
          <p className="text-sm font-medium text-rose-600 mb-1">
            Total Overdue
          </p>
          <h3 className="text-xl font-bold text-slate-900">₹70,000</h3>
        </Card>
      </div>

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
            <span className="text-sm text-slate-500 font-medium">
              Filter Status:
            </span>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="All">All Statuses</option>
              <option value="Paid">Paid</option>
              <option value="Pending">Pending</option>
              <option value="Overdue">Overdue</option>
            </select>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-600">
            <thead className="bg-slate-50 text-slate-500 font-medium border-b border-slate-100">
              <tr>
                <th className="px-6 py-4">Student Info</th>
                <th className="px-6 py-4">Total Fee</th>
                <th className="px-6 py-4">Paid Amount</th>
                <th className="px-6 py-4">Due Amount</th>
                <th className="px-6 py-4">Due Date</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredPayments.map((payment) => {
                const daysUntilDue = getDaysDifference(payment.dueDate);
                const isNearingDue =
                  daysUntilDue > 0 &&
                  daysUntilDue <= 5 &&
                  payment.status !== "Paid";

                return (
                  <tr
                    key={payment.id}
                    className="hover:bg-slate-50/50 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <p className="font-medium text-slate-900">
                        {payment.studentName}
                      </p>
                      <p className="text-xs text-slate-500">{payment.course}</p>
                    </td>
                    <td className="px-6 py-4 font-medium">
                      ₹{payment.totalFee.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 text-emerald-600">
                      ₹{payment.paid.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 text-rose-600 font-medium">
                      ₹{payment.due.toLocaleString()}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={
                          payment.status === "Overdue"
                            ? "text-rose-600 font-medium flex items-center gap-1"
                            : ""
                        }
                      >
                        {payment.status === "Overdue" && (
                          <AlertCircle size={14} />
                        )}
                        {payment.dueDate}
                      </span>
                      {isNearingDue && (
                        <p className="text-xs text-amber-600 font-medium mt-1">
                          Due in {daysUntilDue} days
                        </p>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      {getStatusBadge(payment.status)}
                    </td>
                    <td className="px-6 py-4 text-right">
                      {payment.due > 0 ? (
                        <Button
                          size="sm"
                          variant={
                            payment.status === "Overdue" || isNearingDue
                              ? "primary"
                              : "secondary"
                          }
                          onClick={() => handleRemind(payment.studentName)}
                        >
                          <Mail size={14} /> Send Email
                        </Button>
                      ) : (
                        <span className="text-sm text-slate-400 italic px-4">
                          Settled
                        </span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};

const SettingsView = ({ showToast }) => {
  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h2 className="text-2xl font-bold text-slate-900">Platform Settings</h2>
        <p className="text-slate-500 text-sm">
          Manage your academy's preferences and automations.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="p-6">
          <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
            <Mail size={20} className="text-blue-500" /> Automated Reminders
          </h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg border border-slate-100">
              <div>
                <p className="font-medium text-slate-900 text-sm">
                  5-Day Pre-Due Email
                </p>
                <p className="text-xs text-slate-500">
                  Automatically send email 5 days before due date
                </p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="sr-only peer"
                  defaultChecked
                  onChange={() =>
                    showToast(
                      "Settings Updated",
                      "Automation preferences saved.",
                    )
                  }
                />
                <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>
            <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg border border-slate-100">
              <div>
                <p className="font-medium text-slate-900 text-sm">
                  Overdue SMS Alerts
                </p>
                <p className="text-xs text-slate-500">
                  Send SMS on the day payment is overdue
                </p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="sr-only peer"
                  onChange={() =>
                    showToast(
                      "Settings Updated",
                      "Automation preferences saved.",
                    )
                  }
                />
                <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
            <Settings size={20} className="text-slate-500" /> General Settings
          </h3>
          <form
            className="space-y-4"
            onSubmit={(e) => {
              e.preventDefault();
              showToast("Success", "Profile settings updated.");
            }}
          >
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Academy Name
              </label>
              <input
                type="text"
                defaultValue="GSP Academy"
                className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Support Email (Sender)
              </label>
              <input
                type="email"
                defaultValue="support@gspacademy.in"
                className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>
            <div className="pt-2">
              <Button type="submit">Save Changes</Button>
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default function HeroSection() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [leads, setLeads] = useState(INITIAL_LEADS);
  const [payments, setPayments] = useState(INITIAL_PAYMENTS);
  const [toasts, setToasts] = useState([]);

  const showToast = (title, message, type = "success") => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, title, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  };

  const navItems = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "leads", label: "Lead Management", icon: Users },
    { id: "payments", label: "Fees & Payments", icon: CreditCard },
    { id: "courses", label: "Academics & Courses", icon: GraduationCap },
    { id: "settings", label: "Settings", icon: Settings },
  ];

  return (
    <div className="h-screen bg-slate-50 flex font-sans text-slate-900">
      {/* Toast Notifications Container */}
      <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className="bg-slate-800 text-white px-4 py-3 rounded-lg shadow-lg flex items-center gap-3 animate-fade-in-up"
          >
            {toast.type === "success" ? (
              <CheckCircle2 className="text-emerald-400" size={20} />
            ) : (
              <AlertCircle className="text-rose-400" size={20} />
            )}
            <div>
              <p className="font-medium text-sm">{toast.title}</p>
              <p className="text-xs text-slate-300">{toast.message}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Mobile Sidebar Overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-slate-900/50 z-40 lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
        fixed lg:static inset-y-0 left-0 z-50
        w-64 bg-[#0f172a] text-slate-300 flex flex-col transition-transform duration-300 ease-in-out
        ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
      `}
      >
        <div className="p-6 flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white">
                G
              </div>
              GSP Academy
            </h1>
            <p className="text-xs text-slate-400 mt-1">
              Manage Leads, Payments Seamlessly
            </p>
          </div>
          <button
            className="lg:hidden text-slate-400"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <X size={20} />
          </button>
        </div>

        <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  setIsMobileMenuOpen(false);
                }}
                className={`
                  w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors
                  ${
                    isActive
                      ? "bg-blue-600 text-white"
                      : "text-slate-400 hover:bg-slate-800 hover:text-white"
                  }
                `}
              >
                <Icon size={18} />
                {item.label}
              </button>
            );
          })}
        </nav>

        <div className="p-4 border-t border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-sm font-bold text-white">
              AD
            </div>
            <div>
              <p className="text-sm font-medium text-white">Admin User</p>
              <p className="text-xs text-slate-400">Director</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top Header */}
        <header className="bg-white border-b border-slate-200 h-16 flex items-center justify-between px-4 sm:px-6 z-10 shrink-0">
          <div className="flex items-center gap-1 md:gap-4">
            <button
              className="lg:hidden text-slate-500 hover:text-slate-700"
              onClick={() => setIsMobileMenuOpen(true)}
            >
              <Menu size={24} />
            </button>
            <div className="hidden sm:flex items-center text-sm text-slate-500">
              <span className="font-medium text-slate-900 capitalize">
                {activeTab.replace("-", " ")}
              </span>
              <span className="mx-2">/</span>
              <span>Overview</span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="relative hidden sm:block">
              <Search
                className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400"
                size={16}
              />
              <input
                type="text"
                placeholder="Global search..."
                className="w-48 lg:w-64 pl-9 pr-4 py-1.5 bg-slate-100 border-transparent rounded-full text-sm focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all outline-none"
              />
            </div>
            <button className="relative p-2 text-slate-500 hover:bg-slate-100 rounded-full transition-colors">
              <Bell size={20} />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-rose-500 rounded-full border border-white"></span>
            </button>
          </div>
        </header>

        {/* Content Scroll Area */}
        <div className="flex-1 overflow-auto p-4 sm:p-6 lg:p-8">
          <div className="max-w-7xl mx-auto">
            {activeTab === "dashboard" && (
              <DashboardView leads={leads} payments={payments} />
            )}
            {activeTab === "leads" && (
              <LeadsView
                leads={leads}
                setLeads={setLeads}
                showToast={showToast}
              />
            )}
            {activeTab === "payments" && (
              <PaymentsView
                payments={payments}
                setPayments={setPayments}
                showToast={showToast}
              />
            )}
            {activeTab === "settings" && <SettingsView showToast={showToast} />}

            {activeTab === "courses" && (
              <div className="flex flex-col items-center justify-center h-64 text-center">
                <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center text-slate-400 mb-4">
                  <GraduationCap size={32} />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">
                  Module Coming Soon
                </h3>
                <p className="text-slate-500 max-w-sm">
                  The {activeTab} module is currently being built and will be
                  available in the next system update.
                </p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
