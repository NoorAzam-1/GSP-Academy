export const COURSES = [
  "6th-10th Foundation",
  "11th-12th Academics",
  "JEE Main & Advanced",
  "NEET UG",
  "NIMCET",
  "CUET",
  "CAT",
  "CLAT",
];

export const ENTRANCE_COURSES = [
  "B.Tech",
  "BBA",
  "BCA",
  "MBA",
  "MCA",
  "Law (LLB)",
  "Hotel Management",
  "Design",
];

export const LEAD_STATUSES = [
  "New",
  "Contacted",
  "Interested",
  "Follow-up",
  "Converted",
  "Rejected",
  "Closed",
  "Lost",
];

export const LEAD_SOURCES = [
  "Website",
  "Referral",
  "Social Media",
  "Walk-in",
  "Phone Inquiry",
  "Email Campaign",
  "Admission Fair",
  "Other",
];

export const PAYMENT_STATUSES = ["All", "Paid", "Pending", "Overdue"];

export const PRODUCTS = {
  ACADEMY: "academy",
  ENTRANCE: "entrance",
};

export const ROLES = {
  ADMIN: "admin",
  STAFF: "staff",
  LEAD_MANAGER: "lead_manager",
  FEE_MANAGER: "fee_manager",
};

export const STAFF_TYPES = [
  { value: "lead_manager", label: "Lead Manager" },
  { value: "fee_manager", label: "Fee Manager" },
];

export const DEMO_CREDENTIALS = [
  { label: "Login as Admin", role: "admin", email: "admin@gspacademy.in", password: "admin123", icon: "Shield", color: "blue" },
  { label: "Login as Lead Manager", role: "lead_manager", email: "lead@gspacademy.in", password: "lead123", icon: "UserCheck", color: "emerald" },
  { label: "Login as Fee Manager", role: "fee_manager", email: "fee@gspacademy.in", password: "fee123", icon: "CreditCard", color: "amber" },
];

export const MONTHS = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];

export const REVENUE_DATA = [
  { month: "Jan", revenue: 12000 },
  { month: "Feb", revenue: 15000 },
  { month: "Mar", revenue: 18000 },
  { month: "Apr", revenue: 22000 },
  { month: "May", revenue: 28000 },
  { month: "Jun", revenue: 14000 },
];

export const COURSE_DISTRIBUTION = [
  { name: "Academics (6-12)", value: 400 },
  { name: "JEE/NEET", value: 300 },
  { name: "CUET/NIMCET", value: 150 },
  { name: "CAT/CLAT", value: 100 },
];

export const CHART_COLORS = ["#3b82f6", "#10b981", "#f59e0b", "#8b5cf6"];

export const SIDEBAR_ITEMS = {
  admin: [
    { id: "dashboard", label: "Dashboard", icon: "LayoutDashboard", href: "/dashboard" },
    { id: "academy", label: "Academy Leads", icon: "GraduationCap", href: "/dashboard/academy" },
    { id: "entrance", label: "Entrance Leads", icon: "DoorOpen", href: "/dashboard/entrance" },
    { id: "leads", label: "All Leads", icon: "Users", href: "/dashboard/leads" },
    { id: "staff", label: "Staff Management", icon: "UserCog", href: "/dashboard/staff" },
    { id: "settings", label: "Settings", icon: "Settings", href: "/dashboard/settings" },
  ],
  lead_manager: [
    { id: "dashboard", label: "Dashboard", icon: "LayoutDashboard", href: "/dashboard" },
    { id: "academy", label: "Academy Leads", icon: "GraduationCap", href: "/dashboard/academy" },
    { id: "entrance", label: "Entrance Leads", icon: "DoorOpen", href: "/dashboard/entrance" },
    { id: "leads", label: "All Leads", icon: "Users", href: "/dashboard/leads" },
  ],
  fee_manager: [
    { id: "dashboard", label: "Dashboard", icon: "LayoutDashboard", href: "/dashboard" },
    { id: "academy", label: "Academy Leads", icon: "GraduationCap", href: "/dashboard/academy" },
    { id: "entrance", label: "Entrance Leads", icon: "DoorOpen", href: "/dashboard/entrance" },
    { id: "leads", label: "All Leads", icon: "Users", href: "/dashboard/leads" },
  ],
};

export const MOCK_STAFF = [
  { id: 1, name: "Rahul Verma", email: "rahul@gspacademy.in", role: "lead_manager", staffType: "lead_manager", assignedLeads: 12, assignedAcademyLeads: 7, assignedEntranceLeads: 5, status: "Active" },
  { id: 2, name: "Sneha Kapoor", email: "sneha@gspacademy.in", role: "fee_manager", staffType: "fee_manager", assignedLeads: 8, assignedAcademyLeads: 5, assignedEntranceLeads: 3, status: "Active" },
  { id: 3, name: "Amit Joshi", email: "amit@gspacademy.in", role: "lead_manager", staffType: "lead_manager", assignedLeads: 15, assignedAcademyLeads: 9, assignedEntranceLeads: 6, status: "Active" },
];

export const INITIAL_LEADS = [
  { id: 1, name: "Rahul Sharma", phone: "+91 9876543210", email: "rahul@email.com", course: "JEE Main & Advanced", status: "New", source: "Website", date: "2026-06-01", updatedAt: "2026-06-01", product: "academy", assignedTo: "1", assignedToName: "Rahul Verma" },
  { id: 2, name: "Priya Patel", phone: "+91 9876543211", email: "priya@email.com", course: "NEET UG", status: "Contacted", source: "Referral", date: "2026-06-02", updatedAt: "2026-06-03", product: "academy", assignedTo: "1", assignedToName: "Rahul Verma" },
  { id: 3, name: "Amit Kumar", phone: "+91 9876543212", email: "amit@email.com", course: "11th-12th Academics", status: "Converted", source: "Social Media", date: "2026-05-28", updatedAt: "2026-06-02", product: "academy", assignedTo: "2", assignedToName: "Sneha Kapoor" },
  { id: 4, name: "Neha Singh", phone: "+91 9876543213", email: "neha@email.com", course: "CUET", status: "Interested", source: "Walk-in", date: "2026-05-30", updatedAt: "2026-06-04", product: "entrance", assignedTo: "3", assignedToName: "Amit Joshi", followUpDate: "2026-06-10" },
  { id: 5, name: "Vikram Gupta", phone: "+91 9876543214", email: "vikram@email.com", course: "CAT", status: "New", source: "Phone Inquiry", date: "2026-06-04", updatedAt: "2026-06-04", product: "entrance" },
  { id: 6, name: "Ananya Reddy", phone: "+91 9876543215", email: "ananya@email.com", course: "NEET UG", status: "Follow-up", source: "Website", date: "2026-05-25", updatedAt: "2026-06-05", product: "academy", assignedTo: "3", assignedToName: "Amit Joshi", followUpDate: "2026-06-08" },
  { id: 7, name: "Rohit Mehta", phone: "+91 9876543216", email: "rohit@email.com", course: "B.Tech", status: "Contacted", source: "Email Campaign", date: "2026-06-03", updatedAt: "2026-06-05", product: "entrance", assignedTo: "1", assignedToName: "Rahul Verma" },
  { id: 8, name: "Sara Khan", phone: "+91 9876543217", email: "sara@email.com", course: "CLAT", status: "Rejected", source: "Admission Fair", date: "2026-05-20", updatedAt: "2026-05-28", product: "entrance" },
  { id: 9, name: "Arjun Nair", phone: "+91 9876543218", email: "arjun@email.com", course: "JEE Main & Advanced", status: "Converted", source: "Referral", date: "2026-05-15", updatedAt: "2026-06-01", product: "academy", assignedTo: "2", assignedToName: "Sneha Kapoor" },
  { id: 10, name: "Divya Joshi", phone: "+91 9876543219", email: "divya@email.com", course: "MBA", status: "New", source: "Website", date: "2026-06-06", updatedAt: "2026-06-06", product: "entrance" },
  { id: 11, name: "Karan Verma", phone: "+91 9876543220", email: "karan@email.com", course: "6th-10th Foundation", status: "Follow-up", source: "Walk-in", date: "2026-05-28", updatedAt: "2026-06-06", product: "academy", assignedTo: "1", assignedToName: "Rahul Verma", followUpDate: "2026-06-09" },
  { id: 12, name: "Pooja Iyer", phone: "+91 9876543221", email: "pooja@email.com", course: "NIMCET", status: "Interested", source: "Social Media", date: "2026-06-01", updatedAt: "2026-06-05", product: "entrance", assignedTo: "2", assignedToName: "Sneha Kapoor", followUpDate: "2026-06-12" },
  { id: 13, name: "Suresh Reddy", phone: "+91 9876543222", email: "suresh@email.com", course: "11th-12th Academics", status: "Closed", source: "Phone Inquiry", date: "2026-05-10", updatedAt: "2026-05-25", product: "academy" },
  { id: 14, name: "Lakshmi Devi", phone: "+91 9876543223", email: "lakshmi@email.com", course: "BBA", status: "Contacted", source: "Email Campaign", date: "2026-06-05", updatedAt: "2026-06-06", product: "entrance", assignedTo: "3", assignedToName: "Amit Joshi" },
  { id: 15, name: "Rajesh Kumar", phone: "+91 9876543224", email: "rajesh@email.com", course: "JEE Main & Advanced", status: "New", source: "Website", date: "2026-06-07", updatedAt: "2026-06-07", product: "academy" },
];

export const INITIAL_PAYMENTS = [
  { id: 101, studentName: "Amit Kumar", course: "11th-12th Academics", totalFee: 45000, paid: 25000, due: 20000, dueDate: "2026-06-15", status: "Pending", assignedTo: "2" },
  { id: 102, studentName: "Rohan Das", course: "JEE Main & Advanced", totalFee: 85000, paid: 85000, due: 0, dueDate: "2026-05-10", status: "Paid", assignedTo: "1" },
  { id: 103, studentName: "Sneha Roy", course: "NEET UG", totalFee: 80000, paid: 40000, due: 40000, dueDate: "2026-06-02", status: "Overdue", assignedTo: "3" },
  { id: 104, studentName: "Karan Verma", course: "6th-10th Foundation", totalFee: 30000, paid: 10000, due: 20000, dueDate: "2026-06-20", status: "Pending", assignedTo: "1" },
  { id: 105, studentName: "Pooja Iyer", course: "CLAT", totalFee: 50000, paid: 20000, due: 30000, dueDate: "2026-06-01", status: "Overdue", assignedTo: "2" },
  { id: 106, studentName: "Arjun Nair", course: "JEE Main & Advanced", totalFee: 85000, paid: 85000, due: 0, dueDate: "2026-05-20", status: "Paid", assignedTo: "2" },
  { id: 107, studentName: "Neha Singh", course: "CUET", totalFee: 50000, paid: 15000, due: 35000, dueDate: "2026-06-25", status: "Pending", assignedTo: "3" },
  { id: 108, studentName: "Sara Khan", course: "CLAT", totalFee: 50000, paid: 5000, due: 45000, dueDate: "2026-06-18", status: "Pending", assignedTo: "1" },
];

export const INITIAL_FOLLOW_UPS = [
  { id: 1, leadId: 2, note: "Called Priya, she is interested in NEET coaching. Will visit this weekend.", date: "2026-06-03", createdBy: "Rahul Verma" },
  { id: 2, leadId: 4, note: "Neha requested more information about CUET batches. Sent brochure via email.", date: "2026-06-04", createdBy: "Amit Joshi" },
  { id: 3, leadId: 6, note: "Ananya's parents want a demo class before enrolling.", date: "2026-06-05", createdBy: "Amit Joshi" },
  { id: 4, leadId: 11, note: "Discussed foundation program details. Karan will confirm by Friday.", date: "2026-06-06", createdBy: "Rahul Verma" },
  { id: 5, leadId: 12, note: "Pooja is comparing NIMCET coaching options. Shared success stories.", date: "2026-06-05", createdBy: "Sneha Kapoor" },
];
