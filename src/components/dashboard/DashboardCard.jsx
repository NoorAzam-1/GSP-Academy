"use client";

import { TrendingUp } from "lucide-react";
import Card from "@/components/ui/Card";

import {
  Users,
  GraduationCap,
  CreditCard,
  AlertCircle,
  PhoneCall,
  FileText,
  CheckCircle2,
  XCircle,
  TrendingUp as TrendingUpIcon,
  Wallet,
  Bell,
  IndianRupee,
} from "lucide-react";

const iconComponents = {
  Users,
  GraduationCap,
  CreditCard,
  AlertCircle,
  PhoneCall,
  FileText,
  CheckCircle2,
  XCircle,
  TrendingUp: TrendingUpIcon,
  Wallet,
  Bell,
  IndianRupee,
};

export default function DashboardCard({ title, value, trend, trendUp, icon }) {
  const Icon = iconComponents[icon];

  return (
    <Card className="p-6">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-slate-500 mb-1">{title}</p>
          <h3 className="text-2xl font-bold text-slate-900">{value}</h3>
        </div>
        <div className="p-3 bg-blue-50 rounded-lg text-blue-600">
          {Icon && <Icon size={24} />}
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
}
