export type LeadStatus =
  | "New"
  | "Contacted"
  | "Interested"
  | "Follow-up"
  | "Converted"
  | "Rejected"
  | "Closed"
  | "Lost";

export type PaymentStatus = "Paid" | "Pending" | "Overdue";

export type UserRole = "admin" | "staff" | "lead_manager" | "fee_manager";

export type ProductType = "academy" | "entrance";

export interface Lead {
  id: number;
  name: string;
  phone: string;
  email?: string;
  course: string;
  status: LeadStatus;
  source?: string;
  notes?: string;
  date: string;
  updatedAt?: string;
  followUpDate?: string;
  product?: ProductType;
  assignedTo?: string;
  assignedToName?: string;
  feeStatus?: PaymentStatus;
  feeDue?: number;
  feeDueDate?: string;
}

export interface AcademyLead extends Lead {
  product: "academy";
}

export interface EntranceLead extends Lead {
  product: "entrance";
}

export interface Payment {
  id: number;
  studentName: string;
  course: string;
  totalFee: number;
  paid: number;
  due: number;
  dueDate: string;
  status: PaymentStatus;
  assignedTo?: string;
}

export interface DashboardCardData {
  title: string;
  value: string | number;
  trend: string;
  trendUp: boolean;
  icon: string;
}

export interface RevenueData {
  month: string;
  revenue: number;
}

export interface CourseDistribution {
  name: string;
  value: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  title?: string;
}

export interface StaffMember extends User {
  role: "staff";
  assignedLeads: number;
  assignedAcademyLeads?: number;
  assignedEntranceLeads?: number;
}

export interface SidebarItem {
  id: string;
  label: string;
  icon: string;
  href: string;
}

export interface NavItem {
  id: string;
  label: string;
  icon: string;
  href: string;
  roles: UserRole[];
}

export interface Toast {
  id: number;
  title: string;
  message: string;
  type: "success" | "error" | "info";
}

export interface LeadFilters {
  status?: string;
  assignedTo?: string;
  dateFrom?: string;
  dateTo?: string;
  search?: string;
  product?: string;
  source?: string;
}

export interface FollowUp {
  id: number;
  leadId: number;
  note: string;
  date: string;
  createdBy: string;
}
