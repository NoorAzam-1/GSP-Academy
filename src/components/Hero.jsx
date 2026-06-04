"use client";
import React, { useState, useMemo, useEffect, useRef } from "react";
import {
  LayoutDashboard,
  Users,
  Phone,
  MessageSquare,
  Instagram,
  Facebook,
  Globe,
  Smartphone,
  UserCheck,
  PlusCircle,
  Search,
  Filter,
  Calendar,
  TrendingUp,
  Layers,
  FileText,
  Settings,
  Bell,
  ChevronRight,
  ChevronLeft,
  CheckCircle,
  Clock,
  AlertTriangle,
  X,
  Send,
  Check,
  ShoppingBag,
  UserPlus,
  BarChart3,
  MapPin,
  Sparkles,
  Info,
  MessageCircle,
  Wifi,
  Cpu,
  Zap,
  RefreshCw,
  Sliders,
  Database,
  CheckCheck,
  Megaphone,
  Upload,
  AlertCircle,
  Play,
  Pause,
  SlidersHorizontal,
  ChevronDown,
  ShieldAlert,
  ShieldCheck,
  Download,
  HelpCircle,
} from "lucide-react";

const customStyles = `
@keyframes pulseGlow {
  0%, 100% { box-shadow: 0 0 0 0 rgba(16, 185, 129, 0.4); }
  50% { box-shadow: 0 0 0 8px rgba(16, 185, 129, 0); }
}
@keyframes pulseGlowBlue {
  0%, 100% { box-shadow: 0 0 0 0 rgba(59, 130, 246, 0.4); }
  50% { box-shadow: 0 0 0 8px rgba(59, 130, 246, 0); }
}
@keyframes slideInRight {
  from { transform: translateX(100%); }
  to { transform: translateX(0); }
}
@keyframes modalScaleUp {
  from { transform: scale(0.95); opacity: 0; }
  to { transform: scale(1); opacity: 1; }
}
@keyframes shakeBell {
  0%, 100% { transform: rotate(0deg); }
  25% { transform: rotate(15deg); }
  75% { transform: rotate(-15deg); }
}
@keyframes shimmer {
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
}
@keyframes typingDot {
  0%, 100% { opacity: 0.2; transform: translateY(0); }
  50% { opacity: 1; transform: translateY(-4px); }
}
@keyframes progressStripes {
  from { background-position: 1rem 0; }
  to { background-position: 0 0; }
}
.animate-pulse-glow { animation: pulseGlow 2s infinite; }
.animate-pulse-glow-blue { animation: pulseGlowBlue 2.5s infinite; }
.animate-slide-in-right { animation: slideInRight 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
.animate-modal-scale { animation: modalScaleUp 0.25s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
.animate-shake { animation: shakeBell 0.5s ease-in-out; }
.progress-bar-stripes {
  background-image: linear-gradient(45deg, rgba(255, 255, 255, 0.15) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, 0.15) 50%, rgba(255, 255, 255, 0.15) 75%, transparent 75%, transparent);
  background-size: 1rem 1rem;
  animation: progressStripes 1s linear infinite;
}
.typing-dot {
  animation: typingDot 1.4s infinite;
  width: 6px;
  height: 6px;
  background-color: #475569;
  border-radius: 50%;
  display: inline-block;
  margin: 0 1.5px;
}
.typing-dot:nth-child(2) { animation-delay: 0.2s; }
.typing-dot:nth-child(3) { animation-delay: 0.4s; }
`;

const INITIAL_LEADS = [
  {
    id: "LD-2026-001",
    name: "Suresh Radhakrishnan",
    mobile: "+91 98765 43210",
    whatsapp: "+91 98765 43210",
    alternateMobile: "+91 98765 00112",
    address: "Flat 402, Oakwood Towers, Juhu",
    city: "Mumbai",
    product: "Premium Solid Wood Dining Table (6-Seater)",
    budget: 85000,
    source: "Instagram",
    socialUsername: "@suresh_radha",
    message:
      "Saw your post about premium oak dining tables. Need customization for teak polish.",
    assignedTo: "Amit Sharma",
    followUpDate: "2026-05-27",
    priority: "Hot",
    status: "Negotiation",
    notes:
      "Wants premium velvet upholstery for chairs. Sending quote tomorrow morning.",
    tags: ["High-Budget", "Living Room"],
    timeline: [
      {
        date: "2026-05-25 10:30 AM",
        user: "System",
        text: "Lead captured from Instagram ad campaign.",
      },
      {
        date: "2026-05-25 11:15 AM",
        user: "Amit Sharma",
        text: "Called client. Expressed high interest. Sent catalogue.",
      },
      {
        date: "2026-05-26 03:00 PM",
        user: "Amit Sharma",
        text: "Requested customized polish sample details.",
      },
    ],
  },
  {
    id: "LD-2026-002",
    name: "Aditi Rao",
    mobile: "+91 91234 56789",
    whatsapp: "+91 91234 56789",
    alternateMobile: "",
    address: "Villa 22, Green Meadows Layout",
    city: "Bengaluru",
    product: "Nilkamal Novella Premium Lounger Sofas",
    budget: 120000,
    source: "Walk-in Customers",
    socialUsername: "",
    message:
      "Visited Indiranagar showroom. Checked out L-shaped leatherette lounge sets.",
    assignedTo: "Priya Nair",
    followUpDate: "2026-05-26",
    priority: "Hot",
    status: "Interested",
    notes:
      "Requires home layout inspection before shipping. Floor planner needs to visit.",
    tags: ["Luxury Sofa", "Showroom Guest"],
    timeline: [
      {
        date: "2026-05-24 02:00 PM",
        user: "System",
        text: "Walk-in registration at Bangalore South Branch.",
      },
      {
        date: "2026-05-24 04:30 PM",
        user: "Priya Nair",
        text: "Showed live samples. She preferred modern tan layout.",
      },
    ],
  },
  {
    id: "LD-2026-003",
    name: "Rajesh Malhotra",
    mobile: "+91 93456 78901",
    whatsapp: "+91 93456 78901",
    alternateMobile: "+91 93322 11004",
    address: "B-104, Regency Park, DLF Phase 4",
    city: "Gurugram",
    product: "Ergonomic Mesh Office Chairs (Bulk 15 Units)",
    budget: 180000,
    source: "Website Inquiry",
    socialUsername: "",
    message:
      "Inquiry from Corporate Office for brand new seating arrangement setup.",
    assignedTo: "Vikram Rathore",
    followUpDate: "2026-05-28",
    priority: "Warm",
    status: "Contacted",
    notes: "Requested corporate discount and warranty terms certificate.",
    tags: ["Bulk Purchase", "Office Mesh"],
    timeline: [
      {
        date: "2026-05-23 09:12 AM",
        user: "System",
        text: "B2B contact form submitted on website.",
      },
      {
        date: "2026-05-24 11:00 AM",
        user: "Vikram Rathore",
        text: "Corporate pitch document emailed.",
      },
    ],
  },
  {
    id: "LD-2026-004",
    name: "Komal Deshmukh",
    mobile: "+91 98111 22233",
    whatsapp: "+91 98111 22233",
    alternateMobile: "",
    address: "Apt 9C, Sea Breeze Heights, Bandra",
    city: "Mumbai",
    product: "Nilkamal Freedom Plastic Wardrobe Set",
    budget: 15000,
    source: "Phone Calls",
    socialUsername: "",
    message:
      "Enquiring about lightweight, heavy-duty weather-proof bedroom cabinet.",
    assignedTo: "Riya Sen",
    followUpDate: "2026-05-25",
    priority: "Cold",
    status: "Follow-up Pending",
    notes:
      "Wants home delivery. Follow-up today missed. High priority to reschedule.",
    tags: ["Plastic Cabinet", "Home Storage"],
    timeline: [
      {
        date: "2026-05-22 05:40 PM",
        user: "Riya Sen",
        text: "Call received. Explained warranty structure of resin series.",
      },
    ],
  },
  {
    id: "LD-2026-005",
    name: "Dr. Anand Sen",
    mobile: "+91 95432 10987",
    whatsapp: "+91 95432 10987",
    alternateMobile: "",
    address: "Senior Housing Block B, Salt Lake",
    city: "Kolkata",
    product: "Motorized Premium Recliner Chair",
    budget: 45000,
    source: "Referral Leads",
    socialUsername: "",
    message:
      "Referred by Dr. Bannerjee. Prefers automatic leather recliner with orthopaedic foam support.",
    assignedTo: "Priya Nair",
    followUpDate: "2026-05-29",
    priority: "Hot",
    status: "Converted",
    notes:
      "Ordered & advanced payment finalized! Preparing shipment documentation.",
    tags: ["Recliner Chair", "Referral High Value"],
    timeline: [
      {
        date: "2026-05-21 11:00 AM",
        user: "Priya Nair",
        text: "Client demo arranged via Zoom.",
      },
      {
        date: "2026-05-23 04:00 PM",
        user: "Priya Nair",
        text: "Advanced payment of INR 15,000 received. Marked Converted.",
      },
    ],
  },
  {
    id: "LD-2026-006",
    name: "Nikhil Mehra",
    mobile: "+91 99991 88882",
    whatsapp: "+91 99991 88882",
    alternateMobile: "",
    address: "H-401, Golf Links Extension",
    city: "New Delhi",
    product: "Modular King-Size Teakwood Bed with Storage",
    budget: 95000,
    source: "Facebook",
    socialUsername: "nikhil.mehra.fb",
    message:
      "Interested in Nilkamal Premium bedroom setups. Needs custom hydraulic lifters.",
    assignedTo: "Amit Sharma",
    followUpDate: "2026-05-30",
    priority: "Warm",
    status: "New",
    notes: "Sent price catalogue and custom design sheets. Waiting response.",
    tags: ["Teak Wood Bed", "Storage Beds"],
    timeline: [
      {
        date: "2026-05-26 09:30 AM",
        user: "System",
        text: "Lead imported from Facebook Lead Form (Bedroom campaign).",
      },
    ],
  },
];

const INITIAL_EMPLOYEES = [
  {
    id: "EMP-001",
    name: "Amit Sharma",
    role: "Sales Executive",
    activeLeads: 12,
    convertedLeads: 34,
    target: 450000,
    currentSales: 380000,
    status: "Active",
    avatar: "AS",
  },
  {
    id: "EMP-002",
    name: "Priya Nair",
    role: "Manager",
    activeLeads: 8,
    convertedLeads: 42,
    target: 600000,
    currentSales: 590000,
    status: "Active",
    avatar: "PN",
  },
  {
    id: "EMP-003",
    name: "Vikram Rathore",
    role: "Sales Executive",
    activeLeads: 15,
    convertedLeads: 28,
    target: 400000,
    currentSales: 290000,
    status: "Active",
    avatar: "VR",
  },
  {
    id: "EMP-004",
    name: "Riya Sen",
    role: "Telecaller",
    activeLeads: 22,
    convertedLeads: 19,
    target: 200000,
    currentSales: 165000,
    status: "Active",
    avatar: "RS",
  },
];

const INITIAL_NOTIFICATIONS = [
  {
    id: 1,
    title: "Overdue Follow-up",
    msg: "Komal Deshmukh's phone follow-up is overdue.",
    time: "2 hrs ago",
    unread: true,
    category: "warning",
  },
  {
    id: 2,
    title: "New Lead Assigned",
    msg: "New Lead 'Nikhil Mehra' assigned to Amit Sharma via Facebook API.",
    time: "4 hrs ago",
    unread: true,
    category: "info",
  },
  {
    id: 3,
    title: "Campaign Completed",
    msg: "Pre-Monsoon Dining Campaign reached 4,500 contacts successfully.",
    time: "1 day ago",
    unread: false,
    category: "success",
  },
];

const INITIAL_CAMPAIGNS = [
  {
    id: "CMP-001",
    name: "Monsoon Sofa Discount Blast",
    createdBy: "Priya Nair",
    sentDate: "2026-05-15",
    audienceSize: 4500,
    status: "Completed",
    sent: 4500,
    delivered: 4420,
    read: 3850,
    replied: 890,
    failed: 80,
    clicked: 1205,
    template: "Promotional Sofa Offer",
    media: "Sofa_Discount_Banner.jpg",
    deliveryPercent: 98.2,
    replyRate: 19.7,
  },
  {
    id: "CMP-002",
    name: "Teakwood Bed Exclusive Invite",
    createdBy: "Amit Sharma",
    sentDate: "2026-05-20",
    audienceSize: 3200,
    status: "Completed",
    sent: 3200,
    delivered: 3110,
    read: 2900,
    replied: 512,
    failed: 90,
    clicked: 814,
    template: "Luxury Bed Invitation",
    media: "Teakwood_Bed_Catalog.pdf",
    deliveryPercent: 97.1,
    replyRate: 16.0,
  },
  {
    id: "CMP-003",
    name: "Plastic Storage Solutions Campaign",
    createdBy: "Riya Sen",
    sentDate: "2026-05-24",
    audienceSize: 1850,
    status: "Completed",
    sent: 1850,
    delivered: 1812,
    read: 1540,
    replied: 245,
    failed: 38,
    clicked: 322,
    template: "Cabinet Clearance Offer",
    media: "Freedom_Cabinet_PriceList.png",
    deliveryPercent: 97.9,
    replyRate: 13.2,
  },
  {
    id: "CMP-004",
    name: "Active Hydration - Recliner VIP Followup",
    createdBy: "Vikram Rathore",
    sentDate: "2026-05-27",
    audienceSize: 4010,
    status: "Draft",
    sent: 0,
    delivered: 0,
    read: 0,
    replied: 0,
    failed: 0,
    clicked: 0,
    template: "Premium Recliner Auto-Drip",
    media: "None",
    deliveryPercent: 0,
    replyRate: 0,
  },
];

const REUSABLE_TEMPLATES = [
  {
    id: "TMP-01",
    name: "Promotional Sofa Offer",
    category: "Promotional",
    language: "English (en_US)",
    status: "Approved",
    body: "Hello {{customer_name}}, Nilkamal Furniture brings special premium living room collections for you! Enjoy a flat 15% OFF on our best-selling sofa sets. Click below to view catalog: {{catalog_link}}",
    buttons: ["View Collection 🛋️", "Stop Promos"],
  },
  {
    id: "TMP-02",
    name: "Teakwood Bed Exclusive Invite",
    category: "New Arrival",
    language: "English (en_US)",
    status: "Approved",
    body: "Dear {{customer_name}}, explore pure elegance. Nilkamal introduces our finest seasoned solid teakwood beds. Comes with 10-years factory warranty. Reserve a free showroom demo slot in {{city}} today!",
    buttons: ["Book Demo Slot 📅", "Talk to Designer"],
  },
  {
    id: "TMP-03",
    name: "Follow-Up & Maintenance Reminder",
    category: "Utility",
    language: "English (en_US)",
    status: "Approved",
    body: "Hi {{customer_name}}, this is {{sales_executive}} from Nilkamal. We noticed you checked out our ergonomic mesh chairs last week. Need custom lumber-support sizing or bulk discounts? Text us back anytime!",
    buttons: ["Connect with Agent 🤝", "Maybe Later"],
  },
  {
    id: "TMP-04",
    name: "Festival Greetings Blast",
    category: "Marketing",
    language: "English (en_US)",
    status: "Approved",
    body: "Warm greetings {{customer_name}}! May this seasonal holiday bring peace to your home. Enjoy exclusive pre-access holiday markdowns of 20% on all Nilkamal home furnishings. Safe shipping guaranteed.",
    buttons: ["Unlock VIP Discount 🔓", "Unsubscribe"],
  },
];

const INITIAL_WHATSAPP_CHATS = [
  {
    id: "WA-101",
    name: "Nitin Singhania",
    phone: "+91 98888 77777",
    unread: true,
    typing: false,
    assignedTo: "Amit Sharma",
    product: "Premium Novella Accent Chairs",
    budget: 45000,
    priority: "Hot",
    status: "Interested",
    tags: ["High Budget", "Living Room"],
    messages: [
      {
        sender: "customer",
        text: "Hello! Saw your WhatsApp ad. Do you have premium lounge armchairs in green velvet option?",
        time: "11:15 AM",
      },
      {
        sender: "agent",
        text: "Hi Nitin! Yes, we have our Novella Armchair in premium velvet green. It comes with mahogany support legs. Shall I send photos?",
        time: "11:20 AM",
      },
      {
        sender: "customer",
        text: "Yes please, also share the warranty details and estimated price with shipping to Bandra, Mumbai.",
        time: "11:25 AM",
      },
    ],
  },
  {
    id: "WA-102",
    name: "Meera Patel",
    phone: "+91 97777 66666",
    unread: false,
    typing: false,
    assignedTo: "Priya Nair",
    product: "Modular Hydraulic King Bed",
    budget: 110000,
    priority: "Hot",
    status: "Negotiation",
    tags: ["Bedroom", "Premium Teak"],
    messages: [
      {
        sender: "customer",
        text: "Can you provide custom dimensions of 6x6.5 feet for the storage bed?",
        time: "09:40 AM",
      },
      {
        sender: "agent",
        text: "Hi Meera, absolutely! We can customize the frame layout size at our factory. It takes 10 working days.",
        time: "09:45 AM",
      },
      {
        sender: "customer",
        text: "Excellent. Let me discuss the fabric shades with my interior planner and get back.",
        time: "10:02 AM",
      },
    ],
  },
];

const QUICK_REPLIES = [
  "Hi! Thanks for reaching out to Nilkamal Furniture. How can we help you today?",
  "Sure! Here is our latest digital product brochure with specifications: https://nilkamal.com/catalogue",
  "We offer a 3-Year warranty on all premium wooden collections with doorstep service.",
  "Our store executive can visit your layout site tomorrow for dimension checks.",
];

export default function Hero() {
  const [leads, setLeads] = useState(INITIAL_LEADS);
  const [employees, setEmployees] = useState(INITIAL_EMPLOYEES);
  const [notifications, setNotifications] = useState(INITIAL_NOTIFICATIONS);
  const [activeTab, setActiveTab] = useState("campaigns"); // Defaulting to the brand-new powerful campaign feature
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [toasts, setToasts] = useState([]);

  // Modals & Drawer States
  const [isAddLeadOpen, setIsAddLeadOpen] = useState(false);
  const [selectedLeadForDetail, setSelectedLeadForDetail] = useState(null);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [isAddEmployeeOpen, setIsAddEmployeeOpen] = useState(false);
  const [selectedEmployeeForDetail, setSelectedEmployeeForDetail] =
    useState(null);
  const [isInvoiceOpen, setIsInvoiceOpen] = useState(null);

  // Filter States
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [priorityFilter, setPriorityFilter] = useState("All");
  const [sourceFilter, setSourceFilter] = useState("All");

  // WhatsApp States
  const [whatsappChats, setWhatsappChats] = useState(INITIAL_WHATSAPP_CHATS);
  const [activeChatId, setActiveChatId] = useState("WA-101");
  const [typedMessage, setTypedMessage] = useState("");
  const [isTypingSimulated, setIsTypingSimulated] = useState(false);
  const [chatSearchText, setChatSearchText] = useState("");
  const [chatFilterType, setChatFilterType] = useState("all");

  // NEW BULK WHATSAPP CAMPAIGN SYSTEM STATES
  const [campaigns, setCampaigns] = useState(INITIAL_CAMPAIGNS);
  const [selectedCampaignForDetail, setSelectedCampaignForDetail] =
    useState(null);
  const [campaignTab, setCampaignTab] = useState("overview"); // overview, builder, templates, analytics, limits
  const [campaignWizardStep, setCampaignWizardStep] = useState(1);
  const [templates, setTemplates] = useState(REUSABLE_TEMPLATES);
  const [isCreatingNewTemplate, setIsCreatingNewTemplate] = useState(false);

  // Drag & drop file simulator state
  const [draggedFile, setDraggedFile] = useState(null);
  const [isDragging, setIsDragging] = useState(false);

  // Custom Campaign Builder State
  const [newCampaignForm, setNewCampaignForm] = useState({
    name: "Summer High-Back Chair Clearance",
    targetType: "all", // all, segment, upload
    selectedSegmentFilter: "All",
    selectedTemplateId: "TMP-01",
    attachedMedia: "Nilkamal_Corporate_Offers.pdf",
    scheduledTime: "Send Immediately",
    sendingDelay: "3-5 Seconds (Antispam Guard Enabled)",
    abTestEnabled: false,
    smartDripFollowup: true,
  });

  // Real-time sending queue engine state
  const [liveSendingState, setLiveSendingState] = useState({
    active: false,
    campaignId: null,
    totalCount: 4320,
    sentCount: 0,
    deliveredCount: 0,
    readCount: 0,
    repliedCount: 0,
    failedCount: 0,
    batchProgress: 0,
    currentStatus: "Idle",
  });

  const sendingIntervalRef = useRef(null);

  const showToast = (message, type = "success") => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  };

  const startLiveCampaignSending = (campaignId, size = 4320) => {
    if (liveSendingState.active) {
      showToast(
        "Another WhatsApp campaign is actively processing queues right now.",
        "error",
      );
      return;
    }

    setCampaigns((prev) =>
      prev.map((c) => {
        if (c.id === campaignId) {
          return { ...c, status: "Sending", audienceSize: size };
        }
        return c;
      }),
    );

    setLiveSendingState({
      active: true,
      campaignId: campaignId,
      totalCount: size,
      sentCount: 0,
      deliveredCount: 0,
      readCount: 0,
      repliedCount: 0,
      failedCount: 0,
      batchProgress: 0,
      currentStatus: "Queue Initializing",
    });

    showToast(
      "⚡ WhatsApp Gateway Connected. Anti-Spam throttling engaged.",
      "success",
    );

    let count = 0;
    sendingIntervalRef.current = setInterval(() => {
      count += Math.floor(Math.random() * 85) + 40;
      if (count >= size) {
        count = size;
        clearInterval(sendingIntervalRef.current);

        // Finalize completed campaign state
        setLiveSendingState((prev) => {
          const finalDelivered = Math.floor(size * 0.98);
          const finalRead = Math.floor(size * 0.88);
          const finalReplied = Math.floor(size * 0.19);
          const finalFailed = size - finalDelivered;

          setCampaigns((oldCampaigns) =>
            oldCampaigns.map((c) => {
              if (c.id === campaignId) {
                return {
                  ...c,
                  status: "Completed",
                  sent: size,
                  delivered: finalDelivered,
                  read: finalRead,
                  replied: finalReplied,
                  failed: finalFailed,
                  clicked: Math.floor(size * 0.25),
                  deliveryPercent: Number(
                    ((finalDelivered / size) * 100).toFixed(1),
                  ),
                  replyRate: Number(((finalReplied / size) * 100).toFixed(1)),
                };
              }
              return c;
            }),
          );

          return {
            ...prev,
            sentCount: size,
            deliveredCount: finalDelivered,
            readCount: finalRead,
            repliedCount: finalReplied,
            failedCount: finalFailed,
            batchProgress: 100,
            active: false,
            currentStatus: "Campaign Finished",
          };
        });

        // Trigger notifications and toasts
        setNotifications((prevNotif) => [
          {
            id: Date.now(),
            title: "📢 Bulk WhatsApp Campaign Successful",
            msg: `Delivered message packages safely to ${size} contacts via automated Meta-compliance API.`,
            time: "Just now",
            unread: true,
            category: "success",
          },
          ...prevNotif,
        ]);
        showToast("Campaign fully sent! Safe limits held.", "success");
      } else {
        // Increment live mock data counts
        setLiveSendingState((prev) => {
          const sentVal = count;
          const delVal = Math.floor(sentVal * (0.97 + Math.random() * 0.02));
          const readVal = Math.floor(delVal * (0.82 + Math.random() * 0.05));
          const repVal = Math.floor(readVal * (0.15 + Math.random() * 0.05));
          const failVal = sentVal - delVal;
          const progVal = Math.round((sentVal / size) * 100);

          return {
            ...prev,
            sentCount: sentVal,
            deliveredCount: delVal,
            readCount: readVal,
            repliedCount: repVal,
            failedCount: failVal,
            batchProgress: progVal,
            currentStatus: `Processing Batch ${Math.floor(sentVal / 100)} of ${Math.ceil(size / 100)}`,
          };
        });
      }
    }, 400);
  };

  const stopLiveCampaignSending = () => {
    if (sendingIntervalRef.current) {
      clearInterval(sendingIntervalRef.current);
    }
    setLiveSendingState((prev) => ({
      ...prev,
      active: false,
      currentStatus: "Paused by Executive",
    }));
    setCampaigns((prev) =>
      prev.map((c) => {
        if (c.id === liveSendingState.campaignId) {
          return { ...c, status: "Paused" };
        }
        return c;
      }),
    );
    showToast("Bulk sending safely paused.", "warning");
  };

  const [newTemplateForm, setNewTemplateForm] = useState({
    name: "New Arrivals Discount Template",
    category: "Promotional",
    body: "Hi {{customer_name}}, Nilkamal is back with the brand new Premium Sofa line! Buy today and get {{discount_pct}} discount code at checkout.",
  });

  const createTemplate = (e) => {
    e.preventDefault();
    const newTmp = {
      id: `TMP-0${templates.length + 1}`,
      name: newTemplateForm.name,
      category: newTemplateForm.category,
      language: "English (en_US)",
      status: "Approved", // Approved immediately in simulator
      body: newTemplateForm.body,
      buttons: ["Redeem Coupon 🧧", "Stop Alerts"],
    };
    setTemplates([...templates, newTmp]);
    setIsCreatingNewTemplate(false);
    showToast(
      "Template registered successfully and approved by Meta API!",
      "success",
    );
  };

  const onDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const onDragLeave = () => {
    setIsDragging(false);
  };

  const onDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      setDraggedFile(files[0]);
      showToast(
        `Parsed spreadsheet: ${files[0].name} (Found 4,320 validated Indian phone contacts)`,
        "success",
      );
    }
  };

  const stats = useMemo(() => {
    const total = leads.length;
    const newLeads = leads.filter((l) => l.status === "New").length;
    const hotLeads = leads.filter((l) => l.priority === "Hot").length;
    const convertedLeads = leads.filter((l) => l.status === "Converted").length;
    const pendingFollowups = leads.filter(
      (l) => l.status === "Follow-up Pending",
    ).length;

    const todayStr = new Date().toISOString().split("T")[0];
    const missedFollowups = leads.filter(
      (l) =>
        l.followUpDate &&
        l.followUpDate < todayStr &&
        l.status !== "Converted" &&
        l.status !== "Lost",
    ).length;

    const totalRevenue = leads
      .filter((l) => l.status === "Converted")
      .reduce((sum, l) => sum + (l.budget || 0), 0);

    const whatsappLeads = leads.filter((l) => l.source === "WhatsApp").length;
    const unreadWaChats = whatsappChats.filter((c) => c.unread).length;

    // Campaigns aggregations
    const campaignsCount = campaigns.length;
    const totalSentCampaigns = campaigns.reduce(
      (acc, curr) => acc + curr.sent,
      0,
    );
    const totalDeliveredCampaigns = campaigns.reduce(
      (acc, curr) => acc + curr.delivered,
      0,
    );
    const totalReadCampaigns = campaigns.reduce(
      (acc, curr) => acc + curr.read,
      0,
    );
    const totalRepliedCampaigns = campaigns.reduce(
      (acc, curr) => acc + curr.replied,
      0,
    );

    return {
      total,
      newLeads,
      hotLeads,
      convertedLeads,
      pendingFollowups,
      missedFollowups,
      totalRevenue,
      whatsappLeads,
      unreadWaChats,
      campaignsCount,
      totalSentCampaigns,
      totalDeliveredCampaigns,
      totalReadCampaigns,
      totalRepliedCampaigns,
    };
  }, [leads, whatsappChats, campaigns]);

  const [newLeadForm, setNewLeadForm] = useState({
    name: "",
    mobile: "",
    whatsapp: "",
    alternateMobile: "",
    address: "",
    city: "Mumbai",
    product: "Nilkamal Premium Sofa Set",
    budget: "",
    source: "Phone Calls",
    socialUsername: "",
    message: "",
    assignedTo: "Amit Sharma",
    followUpDate: "",
    priority: "Warm",
    status: "New",
    notes: "",
  });

  const handleCreateLead = (e) => {
    e.preventDefault();
    if (!newLeadForm.name || !newLeadForm.mobile) {
      showToast("Please provide Customer Name and Mobile Number", "error");
      return;
    }
    const createdId = `LD-2026-0${leads.length + 1}`;
    const newLead = {
      ...newLeadForm,
      id: createdId,
      budget: Number(newLeadForm.budget) || 0,
      timeline: [
        {
          date: new Date().toLocaleString(),
          user: "System",
          text: `Lead manually added via CRM. Assigned to ${newLeadForm.assignedTo}.`,
        },
      ],
    };

    setLeads([newLead, ...leads]);
    setIsAddLeadOpen(false);
    showToast(`Lead for ${newLead.name} created and assigned!`, "success");
    setNotifications([
      {
        id: Date.now(),
        title: "Lead Created",
        msg: `${newLead.name} assigned to ${newLeadForm.assignedTo}`,
        time: "Just now",
        unread: true,
        category: "success",
      },
      ...notifications,
    ]);
    setNewLeadForm({
      name: "",
      mobile: "",
      whatsapp: "",
      alternateMobile: "",
      address: "",
      city: "Mumbai",
      product: "Nilkamal Premium Sofa Set",
      budget: "",
      source: "Phone Calls",
      socialUsername: "",
      message: "",
      assignedTo: "Amit Sharma",
      followUpDate: "",
      priority: "Warm",
      status: "New",
      notes: "",
    });
  };

  const simulateIncomingWhatsApp = () => {
    try {
      const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      const oscillator = audioCtx.createOscillator();
      const gainNode = audioCtx.createGain();
      oscillator.connect(gainNode);
      gainNode.connect(audioCtx.destination);
      oscillator.type = "sine";
      oscillator.frequency.setValueAtTime(587.33, audioCtx.currentTime);
      gainNode.gain.setValueAtTime(0.15, audioCtx.currentTime);
      oscillator.start();
      oscillator.stop(audioCtx.currentTime + 0.15);
    } catch (e) {
      console.log("Web Audio Context initialize delay bypassed.");
    }

    const simNames = [
      "Neha Kapoor",
      "Rahul Jaiswal",
      "Sneha Chawla",
      "Devendra Dixit",
    ];
    const simPhones = [
      "+91 90512 88123",
      "+91 93122 77411",
      "+91 98111 65332",
      "+91 94123 99882",
    ];
    const simProducts = [
      "Nilkamal Goa Sofa Set with Cushion",
      "Nilkamal Akin Queen Bed",
      "Nilkamal Freedom Cabinet",
      "Nilkamal Rippon Sofa Unit",
    ];
    const simBudgets = [31850, 13990, 7860, 22890];
    const simMsg = [
      "Hello! Interested in the Goa Sofa set. Is home delivery free to Bangalore?",
      "Saw the Akin Bed promo on WhatsApp! Can you customize it with hydraulic lifters?",
      "Interested in the Freedom Storage Cabinet. I want to buy 4 units for my kids classroom. Discounts?",
      "Are there any EMI options for Rippon 3 Seater Sofa?",
    ];

    const randIdx = Math.floor(Math.random() * simNames.length);
    const randomName = simNames[randIdx];
    const randomPhone = simPhones[randIdx];
    const randomProduct = simProducts[randIdx];
    const randomBudget = simBudgets[randIdx];
    const randomInquiry = simMsg[randIdx];

    const availableEmps = [
      "Amit Sharma",
      "Priya Nair",
      "Vikram Rathore",
      "Riya Sen",
    ];
    const randomEmp =
      availableEmps[Math.floor(Math.random() * availableEmps.length)];

    const newChatId = `WA-${Date.now()}`;
    const newChat = {
      id: newChatId,
      name: randomName,
      phone: randomPhone,
      unread: true,
      typing: false,
      assignedTo: randomEmp,
      product: randomProduct,
      budget: randomBudget,
      priority: randomBudget > 20000 ? "Hot" : "Warm",
      status: "New",
      tags: ["Campaign Lead", "High Intent"],
      messages: [
        {
          sender: "customer",
          text: randomInquiry,
          time: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
        },
      ],
    };

    setWhatsappChats((prev) => [newChat, ...prev]);
    setActiveChatId(newChatId);

    const newLead = {
      id: `LD-2026-${Math.floor(Math.random() * 900) + 100}`,
      name: randomName,
      mobile: randomPhone,
      whatsapp: randomPhone,
      alternateMobile: "",
      address:
        "Address verified automatically over WhatsApp webhook integration",
      city: "Mumbai",
      product: randomProduct,
      budget: randomBudget,
      source: "WhatsApp",
      socialUsername: "",
      message: randomInquiry,
      assignedTo: randomEmp,
      followUpDate: new Date(Date.now() + 86400000).toISOString().split("T")[0],
      priority: randomBudget > 20000 ? "Hot" : "Warm",
      status: "New",
      notes: "Auto-ingested from customer response to WhatsApp Kampaign blast.",
      timeline: [
        {
          date: new Date().toLocaleString(),
          user: "System (Webhook)",
          text: `Customer replied to Campaign. Automated lead registered and assigned to ${randomEmp}.`,
        },
      ],
    };

    setLeads((prev) => [newLead, ...prev]);
    setNotifications((prev) => [
      {
        id: Date.now(),
        title: "⚡ Instant Webhook Auto-Reply",
        msg: `Interactive Campaign hit reply from ${randomName}. Transferred to ${randomEmp}'s desk.`,
        time: "Just now",
        unread: true,
        category: "success",
      },
      ...prev,
    ]);

    showToast(
      `⚡ Response captured: Lead '${randomName}' assigned!`,
      "success",
    );
  };

  const handleSendWhatsappMessage = (e) => {
    e.preventDefault();
    if (!typedMessage.trim()) return;

    setWhatsappChats((prev) =>
      prev.map((chat) => {
        if (chat.id === activeChatId) {
          return {
            ...chat,
            messages: [
              ...chat.messages,
              {
                sender: "agent",
                text: typedMessage,
                time: new Date().toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                }),
              },
            ],
          };
        }
        return chat;
      }),
    );

    setTypedMessage("");
    showToast("Message sent to client device", "success");
  };

  const filteredLeads = useMemo(() => {
    return leads.filter((lead) => {
      const matchesSearch =
        lead.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        lead.mobile.includes(searchQuery) ||
        lead.product.toLowerCase().includes(searchQuery.toLowerCase()) ||
        lead.city.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStatus =
        statusFilter === "All" || lead.status === statusFilter;
      const matchesPriority =
        priorityFilter === "All" || lead.priority === priorityFilter;
      const matchesSource =
        sourceFilter === "All" || lead.source === sourceFilter;
      return matchesSearch && matchesStatus && matchesPriority && matchesSource;
    });
  }, [leads, searchQuery, statusFilter, priorityFilter, sourceFilter]);

  const filteredChats = useMemo(() => {
    return whatsappChats.filter((chat) => {
      const matchesSearch =
        chat.name.toLowerCase().includes(chatSearchText.toLowerCase()) ||
        chat.phone.includes(chatSearchText) ||
        chat.product.toLowerCase().includes(chatSearchText.toLowerCase());

      const matchesFilter =
        chatFilterType === "all"
          ? true
          : chatFilterType === "unread"
            ? chat.unread
            : chatFilterType === "mine"
              ? chat.assignedTo === "Amit Sharma"
              : true;

      return matchesSearch && matchesFilter;
    });
  }, [whatsappChats, chatSearchText, chatFilterType]);

  const activeChat = useMemo(() => {
    return (
      whatsappChats.find((chat) => chat.id === activeChatId) || whatsappChats[0]
    );
  }, [whatsappChats, activeChatId]);

  const updateLeadStatus = (leadId, newStatus) => {
    setLeads((prev) =>
      prev.map((lead) => {
        if (lead.id === leadId) {
          const timeStr = new Date().toLocaleString();
          return {
            ...lead,
            status: newStatus,
            timeline: [
              ...lead.timeline,
              {
                date: timeStr,
                user: "CRM User",
                text: `Status updated to ${newStatus}`,
              },
            ],
          };
        }
        return lead;
      }),
    );
    showToast(`Lead status updated to ${newStatus}`, "info");
  };

  const assignLeadEmployee = (leadId, employeeName) => {
    setLeads((prev) =>
      prev.map((lead) => {
        if (lead.id === leadId) {
          const timeStr = new Date().toLocaleString();
          return {
            ...lead,
            assignedTo: employeeName,
            timeline: [
              ...lead.timeline,
              {
                date: timeStr,
                user: "CRM User",
                text: `Assigned to employee: ${employeeName}`,
              },
            ],
          };
        }
        return lead;
      }),
    );
    showToast(`Lead assigned to ${employeeName}`, "info");
  };

  const assignChatEmployee = (chatId, employeeName) => {
    setWhatsappChats((prev) =>
      prev.map((c) => {
        if (c.id === chatId) {
          return { ...c, assignedTo: employeeName };
        }
        return c;
      }),
    );
    showToast(`Chat conversation assigned to ${employeeName}`, "success");
  };

  const updateChatPriority = (chatId, priority) => {
    setWhatsappChats((prev) =>
      prev.map((c) => {
        if (c.id === chatId) {
          return { ...c, priority };
        }
        return c;
      }),
    );
    showToast(`Priority adjusted to ${priority}`, "info");
  };

  const convertChatToOrder = (chat) => {
    setLeads((prev) =>
      prev.map((l) => {
        if (l.whatsapp === chat.phone) {
          return { ...l, status: "Converted" };
        }
        return l;
      }),
    );
    showToast(
      `Converted WhatsApp Lead ${chat.name} into closed sale!`,
      "success",
    );
  };

  const triggerCommunication = (clientName, platform) => {
    showToast(
      `Initiating outbound direct message path via ${platform} to ${clientName}!`,
      "success",
    );
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex font-sans antialiased overflow-x-hidden selection:bg-blue-600 selection:text-white">
      <style>{customStyles}</style>

      {/* Floating Toast Notification Engine */}
      <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2 pointer-events-none">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className="pointer-events-auto bg-white border border-slate-100 shadow-xl rounded-xl p-4 flex items-center gap-3 animate-slide-in-right max-w-sm transition-all"
          >
            <div
              className={`w-2 h-10 rounded-full ${
                toast.type === "success"
                  ? "bg-emerald-500"
                  : toast.type === "error"
                    ? "bg-rose-500"
                    : "bg-sky-500"
              }`}
            />
            <div>
              <p className="font-semibold text-sm text-slate-900">
                {toast.message}
              </p>
              <span className="text-xs text-slate-400">
                Nilkamal CRM Live Feed
              </span>
            </div>
          </div>
        ))}
      </div>

      <aside
        className={`bg-white border-r border-slate-100 flex flex-col transition-all duration-300 ease-in-out shrink-0 z-30 ${
          isSidebarCollapsed ? "w-20" : "w-64"
        }`}
      >
        {/* Brand Header */}
        <div className="p-5 border-b border-slate-100 flex items-center justify-between">
          {!isSidebarCollapsed && (
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 bg-gradient-to-tr from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center text-white shadow-md shadow-blue-200">
                <Sparkles className="w-5 h-5 text-white animate-pulse" />
              </div>
              <div>
                <h1 className="font-bold text-slate-900 tracking-tight leading-none text-[15px]">
                  Nilkamal
                </h1>
                <span className="text-[10px] font-semibold tracking-wider text-blue-600 uppercase">
                  Furniture CRM
                </span>
              </div>
            </div>
          )}
          {isSidebarCollapsed && (
            <div className="mx-auto w-10 h-10 bg-gradient-to-tr from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center text-white shadow-md">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
          )}
          <button
            onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
            className="p-1.5 hover:bg-slate-100 rounded-lg text-slate-400 hover:text-slate-600 transition-colors"
          >
            {isSidebarCollapsed ? (
              <ChevronRight className="w-4 h-4" />
            ) : (
              <ChevronLeft className="w-4 h-4" />
            )}
          </button>
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 p-3 space-y-1">
          {[
            {
              id: "campaigns",
              label: "Bulk Campaigns",
              icon: Megaphone,
              badge: 1,
              specialGlow: true,
            },
            { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
            {
              id: "leads",
              label: "Lead Manager",
              icon: Users,
              badge: leads.length,
            },
            {
              id: "whatsapp",
              label: "WhatsApp Chat",
              icon: MessageSquare,
              badge: stats.unreadWaChats,
            },
            { id: "employees", label: "Employees", icon: UserCheck },
            {
              id: "followups",
              label: "Follow-Ups",
              icon: Calendar,
              badge: stats.pendingFollowups + stats.missedFollowups,
            },
            { id: "analytics", label: "Analytics Hub", icon: BarChart3 },
            { id: "orders", label: "Converted Sales", icon: ShoppingBag },
            { id: "settings", label: "CRM Settings", icon: Settings },
          ].map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  if (item.id === "whatsapp" && activeChat) {
                    activeChat.unread = false;
                  }
                }}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-medium transition-all group relative ${
                  isActive
                    ? "bg-gradient-to-r from-blue-50 to-indigo-50/50 text-blue-600 font-semibold"
                    : item.specialGlow
                      ? "text-emerald-600 hover:bg-emerald-50/40"
                      : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
                }`}
              >
                <div
                  className={`p-1 rounded-lg transition-transform group-hover:scale-110 ${
                    isActive
                      ? "text-blue-600"
                      : item.specialGlow
                        ? "text-emerald-500 animate-pulse"
                        : "text-slate-400 group-hover:text-slate-600"
                  }`}
                >
                  <Icon className="w-5 h-5" />
                </div>
                {!isSidebarCollapsed && (
                  <span className="flex-1 text-left">{item.label}</span>
                )}
                {!isSidebarCollapsed && item.badge > 0 && (
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      item.id === "campaigns"
                        ? "bg-emerald-500 text-white animate-pulse"
                        : item.id === "followups" && stats.missedFollowups > 0
                          ? "bg-rose-100 text-rose-600"
                          : "bg-blue-100 text-blue-600"
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
                {item.specialGlow && !isSidebarCollapsed && (
                  <span className="absolute right-2 top-2 flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Sidebar Footer */}
        {!isSidebarCollapsed && (
          <div className="p-4 bg-gradient-to-tr from-slate-50 to-blue-50/30 border border-slate-100 rounded-2xl">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white text-xs font-bold shadow-sm">
                N
              </div>
              <div className="truncate">
                <p className="text-xs font-semibold text-slate-900">
                  Noor Azam
                </p>
                <p className="text-[10px] text-slate-400 truncate">
                  Store Admin Manager
                </p>
              </div>
            </div>
          </div>
        )}
      </aside>

      {/* Main Workspace Frame */}
      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto h-screen">
        <header className="sticky top-0 bg-white/80 backdrop-blur-md border-b border-slate-100 px-6 py-3.5 flex items-center justify-between z-20">
          <div className="flex items-center gap-4">
            <div>
              <div className="flex items-center gap-1.5 text-xs text-slate-400">
                <span>Nilkamal CRM Portal</span>
                <ChevronRight className="w-3 h-3" />
                <span className="capitalize">{activeTab}</span>
              </div>
              <h2 className="text-lg font-bold text-slate-900 capitalize tracking-tight mt-0.5">
                {activeTab === "campaigns"
                  ? "WhatsApp Bulk Campaigns Engine"
                  : `${activeTab}space`}
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-3.5">
            {/* Meta status connector */}
            <div className="hidden lg:flex items-center gap-2 bg-emerald-50 text-emerald-700 px-3 py-1.5 rounded-full text-xs font-semibold">
              <span className="w-2 h-2 bg-emerald-500 rounded-full animate-ping" />
              <span>Meta Cloud API: Connected</span>
            </div>

            {/* Quick Global Search */}
            <div className="relative max-w-xs hidden md:block">
              <Search className="w-4.5 h-4.5 absolute left-3 top-2.5 text-slate-400" />
              <input
                type="text"
                placeholder="Search leads, campaigns..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  if (activeTab !== "leads" && activeTab !== "campaigns")
                    setActiveTab("leads");
                }}
                className="pl-9 pr-4 py-2 text-xs w-64 bg-slate-50 border border-slate-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:bg-white transition-all text-slate-700"
              />
            </div>

            {/* Quick Action Button */}
            <button
              onClick={() => setIsAddLeadOpen(true)}
              className="px-3.5 py-2 text-xs font-semibold bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-xl shadow-lg shadow-blue-500/10 flex items-center gap-1.5 transition-all transform hover:scale-[1.02]"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Create Lead</span>
            </button>

            {/* Notification Bell with animated drop overlay */}
            <div className="relative">
              <button
                onClick={() => setIsNotificationOpen(!isNotificationOpen)}
                className={`p-2 bg-slate-50 hover:bg-slate-100 rounded-xl transition-all relative ${
                  notifications.some((n) => n.unread)
                    ? "text-slate-800"
                    : "text-slate-500"
                }`}
              >
                <Bell
                  className={`w-5 h-5 ${notifications.some((n) => n.unread) ? "animate-shake text-indigo-600" : ""}`}
                />
                {notifications.some((n) => n.unread) && (
                  <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-rose-500 rounded-full border-2 border-white animate-ping" />
                )}
              </button>

              {isNotificationOpen && (
                <div className="absolute right-0 mt-3 w-80 bg-white border border-slate-100 shadow-xl rounded-2xl p-4 z-50 animate-modal-scale">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-50">
                    <h3 className="font-bold text-sm text-slate-900">
                      Notifications
                    </h3>
                    <button
                      onClick={() =>
                        setNotifications(
                          notifications.map((n) => ({ ...n, unread: false })),
                        )
                      }
                      className="text-[10px] font-semibold text-blue-600 hover:underline"
                    >
                      Mark all read
                    </button>
                  </div>
                  <div className="mt-3 space-y-2.5 max-h-60 overflow-y-auto">
                    {notifications.map((notif) => (
                      <div
                        key={notif.id}
                        className={`p-2.5 rounded-xl transition-all ${notif.unread ? "bg-blue-50/40" : "hover:bg-slate-50"}`}
                      >
                        <div className="flex justify-between items-start gap-1">
                          <span className="font-bold text-xs text-slate-800 block leading-tight">
                            {notif.title}
                          </span>
                          <span className="text-[9px] text-slate-400 shrink-0">
                            {notif.time}
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-500 mt-1 leading-snug">
                          {notif.msg}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="h-9 w-[1px] bg-slate-100" />
            <div className="flex items-center gap-2">
              <div className="w-8.5 h-8.5 rounded-full bg-indigo-50 border border-indigo-100 flex items-center justify-center text-xs font-extrabold text-indigo-600">
                SA
              </div>
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 p-6 space-y-6">
          {}
          {activeTab === "campaigns" && (
            <div className="space-y-6">
              {/* Campaign Header banner */}
              <div className="bg-gradient-to-r from-emerald-500/10 via-teal-500/5 to-transparent border border-emerald-500/20 p-5 rounded-3xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 font-extrabold text-[9px] uppercase rounded">
                      Enterprise
                    </span>
                    <span className="text-xs text-slate-500">
                      Official Meta WhatsApp API Portal
                    </span>
                  </div>
                  <h3 className="text-xl font-extrabold text-slate-900 tracking-tight">
                    Safely Reach 4000+ Verified Buyers Instantly
                  </h3>
                  <p className="text-xs text-slate-500">
                    A/B Testing, dynamic customer personalization fields, and
                    live delivery webhook graphs.
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      setCampaignTab("builder");
                      setCampaignWizardStep(1);
                    }}
                    className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl flex items-center gap-1.5 transition-all shadow-md active:scale-95"
                  >
                    <Megaphone className="w-4.5 h-4.5 text-emerald-400" />
                    Launch Bulk Campaign
                  </button>
                  <button
                    onClick={simulateIncomingWhatsApp}
                    className="px-3 py-2 bg-white border border-slate-200 text-slate-700 font-bold text-xs rounded-xl hover:bg-slate-50 flex items-center gap-1.5"
                  >
                    <Zap className="w-4 h-4 text-amber-500 animate-bounce" />
                    Simulate Inbound Response
                  </button>
                </div>
              </div>

              {/* Sub tabs row selector */}
              <div className="flex gap-3 bg-white p-1.5 border border-slate-100 rounded-2xl text-xs font-bold text-slate-500 max-w-2xl">
                {[
                  {
                    id: "overview",
                    label: "Campaign Dashboard",
                    icon: LayoutDashboard,
                  },
                  {
                    id: "builder",
                    label: "Interactive Campaign Builder",
                    icon: Sliders,
                  },
                  {
                    id: "templates",
                    label: "Meta Approved Templates",
                    icon: MessageSquare,
                  },
                  {
                    id: "analytics",
                    label: "Deep Flow Analytics",
                    icon: BarChart3,
                  },
                  {
                    id: "limits",
                    label: "API Throttling & Limits",
                    icon: ShieldCheck,
                  },
                ].map((ctb) => {
                  const Icon = ctb.icon;
                  const isCtbActive = campaignTab === ctb.id;
                  return (
                    <button
                      key={ctb.id}
                      onClick={() => setCampaignTab(ctb.id)}
                      className={`flex-1 flex items-center justify-center gap-2 p-2 rounded-xl transition-all ${
                        isCtbActive
                          ? "bg-slate-900 text-white shadow"
                          : "hover:bg-slate-50 hover:text-slate-900"
                      }`}
                    >
                      <Icon className="w-6 h-6" />
                      <span className="hidden sm:inline">{ctb.label}</span>
                    </button>
                  );
                })}
              </div>

              {/* LIVE CAMPAIGN SENDING TRACKER DRAWER WIDGET (Displays if active) */}
              {liveSendingState.active && (
                <div className="bg-slate-900 text-white p-5 rounded-3xl border border-slate-800 shadow-xl space-y-4 animate-pulse-glow">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div className="p-3 bg-emerald-500 text-white rounded-2xl animate-spin">
                        <RefreshCw className="w-6 h-6" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="font-black text-sm text-white">
                            AUTOPILOT SENDING:{" "}
                            {
                              campaigns.find(
                                (c) => c.id === liveSendingState.campaignId,
                              )?.name
                            }
                          </h4>
                          <span className="w-2 h-2 bg-emerald-500 rounded-full animate-ping" />
                        </div>
                        <p className="text-xs text-slate-400">
                          Meta API rate-limit delays in process: 1 message per
                          2.5s.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={stopLiveCampaignSending}
                        className="px-3.5 py-1.5 bg-rose-600 hover:bg-rose-700 text-white font-extrabold text-xs rounded-xl flex items-center gap-1.5"
                      >
                        <Pause className="w-3.5 h-3.5" />
                        Pause Sending Queue
                      </button>
                    </div>
                  </div>

                  {/* Sending progress stats row */}
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-3 pt-3 border-t border-slate-800 text-xs">
                    <div className="bg-slate-800/40 p-3 rounded-2xl border border-slate-800">
                      <span className="text-slate-400 font-bold block text-[9px] uppercase">
                        Sent Bulk Packages
                      </span>
                      <strong className="text-white text-lg mt-0.5 block">
                        {liveSendingState.sentCount}{" "}
                        <span className="text-slate-500 text-xs">
                          / {liveSendingState.totalCount}
                        </span>
                      </strong>
                    </div>
                    <div className="bg-slate-800/40 p-3 rounded-2xl border border-slate-800">
                      <span className="text-emerald-400 font-bold block text-[9px] uppercase">
                        API Delivered
                      </span>
                      <strong className="text-emerald-400 text-lg mt-0.5 block">
                        {liveSendingState.deliveredCount}
                      </strong>
                    </div>
                    <div className="bg-slate-800/40 p-3 rounded-2xl border border-slate-800">
                      <span className="text-sky-400 font-bold block text-[9px] uppercase">
                        Read Rate
                      </span>
                      <strong className="text-sky-400 text-lg mt-0.5 block">
                        {liveSendingState.readCount}
                      </strong>
                    </div>
                    <div className="bg-slate-800/40 p-3 rounded-2xl border border-slate-800">
                      <span className="text-amber-400 font-bold block text-[9px] uppercase">
                        Client Replied
                      </span>
                      <strong className="text-amber-400 text-lg mt-0.5 block">
                        {liveSendingState.repliedCount}
                      </strong>
                    </div>
                    <div className="bg-slate-800/40 p-3 rounded-2xl border border-slate-800">
                      <span className="text-rose-400 font-bold block text-[9px] uppercase">
                        Meta Failed / Rejected
                      </span>
                      <strong className="text-rose-400 text-lg mt-0.5 block">
                        {liveSendingState.failedCount}
                      </strong>
                    </div>
                  </div>

                  {/* Queue progress line */}
                  <div className="space-y-1.5">
                    <div className="flex justify-between items-center text-xs font-semibold text-slate-400">
                      <span>{liveSendingState.currentStatus}</span>
                      <span>{liveSendingState.batchProgress}%</span>
                    </div>
                    <div className="w-full bg-slate-800 h-3 rounded-full overflow-hidden">
                      <div
                        className="bg-gradient-to-r from-emerald-500 to-teal-500 h-full rounded-full transition-all duration-300 progress-bar-stripes"
                        style={{ width: `${liveSendingState.batchProgress}%` }}
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* SUB TAB PAGE 1: CAMPAIGN OVERVIEW */}
              {campaignTab === "overview" && (
                <>
                  {/* Metric Cards Grid */}
                  <div className="grid grid-cols-2 lg:grid-cols-6 gap-4">
                    {[
                      {
                        title: "Active Campaigns",
                        val: campaigns.length,
                        percent: "Bulk Broadcasts",
                        color: "blue",
                        icon: Megaphone,
                      },
                      {
                        title: "API Outbox Blasts",
                        val: stats.totalSentCampaigns,
                        percent: "Messages Sent",
                        color: "indigo",
                        icon: Send,
                      },
                      {
                        title: "Delivered Webhook",
                        val: stats.totalDeliveredCampaigns,
                        percent: "98.2% avg success",
                        color: "emerald",
                        icon: CheckCheck,
                      },
                      {
                        title: "Reads Detected",
                        val: stats.totalReadCampaigns,
                        percent: "88% avg open rate",
                        color: "sky",
                        icon: MessageSquare,
                      },
                      {
                        title: "Customer Replies",
                        val: stats.totalRepliedCampaigns,
                        percent: "High client response",
                        color: "amber",
                        icon: Zap,
                      },
                      {
                        title: "Meta Rejected",
                        val: 208,
                        percent: "Invalid numbers",
                        color: "red",
                        icon: AlertTriangle,
                      },
                    ].map((card, index) => {
                      const Icon = card.icon;
                      return (
                        <div
                          key={index}
                          className="bg-white border border-slate-100 p-4 rounded-2xl shadow-sm transition-all hover:shadow-md"
                        >
                          <div className="flex justify-between items-center">
                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                              {card.title}
                            </span>
                            <div
                              className={`p-1 rounded-lg ${
                                card.color === "emerald"
                                  ? "bg-emerald-50 text-emerald-600"
                                  : card.color === "sky"
                                    ? "bg-sky-50 text-sky-600"
                                    : card.color === "amber"
                                      ? "bg-amber-50 text-amber-600"
                                      : card.color === "red"
                                        ? "bg-rose-50 text-rose-600"
                                        : "bg-blue-50 text-blue-600"
                              }`}
                            >
                              <Icon className="w-4 h-4" />
                            </div>
                          </div>
                          <strong className="text-xl font-black text-slate-900 mt-2 block">
                            {card.val.toLocaleString()}
                          </strong>
                          <span className="text-[10px] text-slate-400 block mt-1">
                            {card.percent}
                          </span>
                        </div>
                      );
                    })}
                  </div>

                  {/* Interactive Campaigns Data Table */}
                  <div className="bg-white border border-slate-100 rounded-3xl overflow-hidden shadow-sm">
                    <div className="p-5 border-b border-slate-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                      <div>
                        <h4 className="font-extrabold text-slate-900 text-sm">
                          Campaign Blasting Registers
                        </h4>
                        <p className="text-xs text-slate-400">
                          Past and active bulk message records dispatched from
                          this branch.
                        </p>
                      </div>
                    </div>

                    <div className="overflow-x-auto">
                      <table className="w-full text-left">
                        <thead>
                          <tr className="bg-slate-50 border-b border-slate-100 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                            <th className="p-4 pl-6">Campaign Info</th>
                            <th className="p-4">Meta Template Code</th>
                            <th className="p-4">Media Attachment</th>
                            <th className="p-4">Audience Size</th>
                            {/* <th className="p-4">Delivery Rate</th> */}
                            <th className="p-4">Inbox Response</th>
                            <th className="p-4">Status</th>
                            <th className="p-4 pr-6 text-right">Actions</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100/50 text-xs text-slate-600">
                          {campaigns.map((cmp) => (
                            <tr
                              key={cmp.id}
                              className="hover:bg-slate-50/40 transition-colors"
                            >
                              <td className="p-4 pl-6">
                                <span className="font-bold text-slate-900 text-sm block">
                                  {cmp.name}
                                </span>
                                <span className="text-[10px] text-slate-400 block mt-0.5">
                                  Dispatched: {cmp.sentDate} • By{" "}
                                  {cmp.createdBy}
                                </span>
                              </td>
                              <td className="p-4">
                                <span className="font-semibold text-slate-700 block">
                                  {cmp.template}
                                </span>
                                <span className="text-[9px] bg-slate-100 px-1 py-0.5 rounded text-slate-500 inline-block mt-1">
                                  META_APPROVED_SANDBOX
                                </span>
                              </td>
                              <td className="p-4">
                                <span className="text-slate-500 font-semibold">
                                  {cmp.media}
                                </span>
                              </td>
                              <td className="p-4 font-bold text-slate-800">
                                {cmp.audienceSize.toLocaleString()} Leads
                              </td>
                              {/* <td className="p-4">
                                  <div className="flex items-center gap-2">
                                    <span className="font-bold text-emerald-600">{cmp.deliveryPercent || 0}%</span>
                                    <span className="text-[10px] text-slate-400">({cmp.delivered} success)</span>
                                  </div>
                                </td> */}
                              <td className="p-4">
                                <div className="flex items-center gap-2">
                                  <span className="font-bold text-sky-600">
                                    {cmp.replyRate || 0}%
                                  </span>
                                  <span className="text-[10px] text-slate-400">
                                    ({cmp.replied} chats back)
                                  </span>
                                </div>
                              </td>
                              <td className="p-4">
                                <span
                                  className={`inline-flex px-2 py-0.5 rounded-full text-[10px] font-bold ${
                                    cmp.status === "Completed"
                                      ? "bg-emerald-50 text-emerald-700"
                                      : cmp.status === "Sending"
                                        ? "bg-blue-50 text-blue-700 animate-pulse"
                                        : cmp.status === "Paused"
                                          ? "bg-amber-50 text-amber-700"
                                          : "bg-slate-100 text-slate-500"
                                  }`}
                                >
                                  {cmp.status}
                                </span>
                              </td>
                              <td className="p-4 pr-6 text-right">
                                <div className="flex justify-end gap-1.5">
                                  {cmp.status === "Draft" && (
                                    <button
                                      onClick={() =>
                                        startLiveCampaignSending(
                                          cmp.id,
                                          cmp.audienceSize || 4320,
                                        )
                                      }
                                      className="px-2.5 py-1.5 bg-slate-900 hover:bg-slate-800 text-white font-bold text-[10px] rounded-lg"
                                    >
                                      Launch Now
                                    </button>
                                  )}
                                  <button
                                    onClick={() =>
                                      setSelectedCampaignForDetail(cmp)
                                    }
                                    className="p-1 px-2 hover:bg-slate-100 border border-slate-100 rounded-lg text-slate-600 text-[10px] font-bold"
                                  >
                                    View Report
                                  </button>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </>
              )}

              {/* SUB TAB PAGE 2: INTERACTIVE 6-STEP CAMPAIGN BUILDER */}
              {campaignTab === "builder" && (
                <div className="bg-white border border-slate-100 rounded-3xl p-6 shadow-sm max-w-4xl mx-auto">
                  <div className="flex justify-between items-center pb-4 border-b border-slate-100 mb-6">
                    <div>
                      <h3 className="font-bold text-slate-900 text-base">
                        Step-by-Step Meta Bulk Campaign Builder
                      </h3>
                      <p className="text-xs text-slate-400">
                        Personalize variables, configure limits, choose channels
                        and blast instantly.
                      </p>
                    </div>
                    <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-100">
                      Step {campaignWizardStep} of 6
                    </span>
                  </div>

                  {/* Progress Line */}
                  <div className="flex gap-1 mb-6">
                    {[1, 2, 3, 4, 5, 6].map((st) => (
                      <div
                        key={st}
                        className={`h-1.5 flex-1 rounded-full transition-all duration-300 ${
                          st <= campaignWizardStep
                            ? "bg-emerald-500"
                            : "bg-slate-100"
                        }`}
                      />
                    ))}
                  </div>

                  {/* Builder step switch */}
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      if (campaignWizardStep === 6) {
                        // Trigger launch final simulation
                        const nextId = `CMP-00${campaigns.length + 1}`;
                        const newCmp = {
                          id: nextId,
                          name: newCampaignForm.name,
                          createdBy: "Store Admin",
                          sentDate: new Date().toISOString().split("T")[0],
                          audienceSize:
                            newCampaignForm.targetType === "all" ? 4320 : 1850,
                          status: "Sending",
                          sent: 0,
                          delivered: 0,
                          read: 0,
                          replied: 0,
                          failed: 0,
                          clicked: 0,
                          template:
                            templates.find(
                              (t) =>
                                t.id === newCampaignForm.selectedTemplateId,
                            )?.name || "Clearance Sofa Promo",
                          media: newCampaignForm.attachedMedia,
                          deliveryPercent: 0,
                          replyRate: 0,
                        };
                        setCampaigns([newCmp, ...campaigns]);
                        setCampaignTab("overview");
                        startLiveCampaignSending(nextId, newCmp.audienceSize);
                      }
                    }}
                    className="space-y-6"
                  >
                    {/* STEP 1: Select Audience */}
                    {campaignWizardStep === 1 && (
                      <div className="space-y-4 text-xs">
                        <h4 className="font-extrabold text-slate-800 text-sm">
                          Target Audience Definition
                        </h4>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          {[
                            {
                              id: "all",
                              label: "Broadcast All Customers (4,320 contacts)",
                              desc: "Blasts every contact registered inside Nilkamal repository.",
                            },
                            {
                              id: "segment",
                              label: "Dynamic Segmentation Criteria",
                              desc: "Filter by city, product tags or recent walk-in events.",
                            },
                            {
                              id: "upload",
                              label: "Upload Customer CSV Spreadsheet",
                              desc: "Instantly drop Excel datasets with contact numbers.",
                            },
                          ].map((t) => (
                            <div
                              key={t.id}
                              onClick={() =>
                                setNewCampaignForm({
                                  ...newCampaignForm,
                                  targetType: t.id,
                                })
                              }
                              className={`p-4 border rounded-2xl cursor-pointer text-left transition-all ${
                                newCampaignForm.targetType === t.id
                                  ? "border-emerald-500 bg-emerald-50/30"
                                  : "border-slate-100 bg-slate-50 hover:bg-slate-100"
                              }`}
                            >
                              <strong className="text-slate-900 block font-bold">
                                {t.label}
                              </strong>
                              <span className="text-slate-400 block mt-1.5 leading-snug">
                                {t.desc}
                              </span>
                            </div>
                          ))}
                        </div>

                        {newCampaignForm.targetType === "segment" && (
                          <div className="bg-slate-50 border border-slate-100 p-4 rounded-2xl space-y-3">
                            <h5 className="font-bold text-slate-800">
                              Filter Segment Parameters
                            </h5>
                            <div className="grid grid-cols-2 gap-3">
                              <div>
                                <label className="text-slate-400 font-semibold block mb-1">
                                  Filter by Showroom Location
                                </label>
                                <select
                                  value={newCampaignForm.selectedSegmentFilter}
                                  onChange={(e) =>
                                    setNewCampaignForm({
                                      ...newCampaignForm,
                                      selectedSegmentFilter: e.target.value,
                                    })
                                  }
                                  className="w-full bg-white border border-slate-200 p-2 rounded-lg"
                                >
                                  <option value="All">All Cities</option>
                                  <option value="Mumbai">Mumbai Only</option>
                                  <option value="Bengaluru">
                                    Bengaluru Only
                                  </option>
                                  <option value="Kolkata">Kolkata Only</option>
                                </select>
                              </div>
                              <div>
                                <label className="text-slate-400 font-semibold block mb-1">
                                  Lead Segment Filter Status
                                </label>
                                <select className="w-full bg-white border border-slate-200 p-2 rounded-lg">
                                  <option value="All">All Leads</option>
                                  <option value="Hot">Hot Priority Only</option>
                                  <option value="Warm">
                                    Warm Priority Only
                                  </option>
                                </select>
                              </div>
                            </div>
                          </div>
                        )}

                        {newCampaignForm.targetType === "upload" && (
                          <div
                            onDragOver={onDragOver}
                            onDragLeave={onDragLeave}
                            onDrop={onDrop}
                            className={`border-2 border-dashed rounded-3xl p-8 text-center transition-all ${
                              isDragging
                                ? "border-emerald-500 bg-emerald-50/20"
                                : "border-slate-200 bg-slate-50/50"
                            }`}
                          >
                            <Upload className="w-8 h-8 text-slate-400 mx-auto mb-2" />
                            <strong className="text-slate-700 block font-bold text-xs">
                              Drag and Drop Customer Database .CSV File Here
                            </strong>
                            <span className="text-slate-400 block text-[10px] mt-1">
                              Accepts CSV, XLSX files with mobile columns
                              (Limit: 10,000 records)
                            </span>

                            {draggedFile ? (
                              <div className="mt-4 p-2.5 bg-emerald-50 border border-emerald-100 inline-block rounded-xl text-[11px] font-bold text-emerald-800">
                                Selected: {draggedFile.name} (4,320 Contacts
                                parsed)
                              </div>
                            ) : (
                              <button
                                type="button"
                                onClick={() =>
                                  showToast(
                                    "Simulating file chooser window click.",
                                    "info",
                                  )
                                }
                                className="mt-3 px-3 py-1.5 bg-white border border-slate-200 hover:bg-slate-100 text-slate-700 font-bold text-[10px] rounded-lg"
                              >
                                Select File Manually
                              </button>
                            )}
                          </div>
                        )}
                      </div>
                    )}

                    {/* STEP 2: Choose Message Template */}
                    {campaignWizardStep === 2 && (
                      <div className="space-y-4 text-xs">
                        <h4 className="font-extrabold text-slate-800 text-sm">
                          Message Content Template Selection
                        </h4>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {templates.map((tmp) => {
                            const isSelected =
                              newCampaignForm.selectedTemplateId === tmp.id;
                            return (
                              <div
                                key={tmp.id}
                                onClick={() =>
                                  setNewCampaignForm({
                                    ...newCampaignForm,
                                    selectedTemplateId: tmp.id,
                                  })
                                }
                                className={`p-4 border rounded-2xl cursor-pointer text-left transition-all ${
                                  isSelected
                                    ? "border-emerald-500 bg-emerald-50/10 shadow-sm"
                                    : "border-slate-100 bg-slate-50 hover:bg-slate-100"
                                }`}
                              >
                                <div className="flex justify-between items-start pb-2 border-b border-slate-100 mb-2">
                                  <div>
                                    <strong className="text-slate-950 font-bold text-xs">
                                      {tmp.name}
                                    </strong>
                                    <span className="text-slate-400 block text-[9px] mt-0.5">
                                      {tmp.category} • {tmp.language}
                                    </span>
                                  </div>
                                  <span className="bg-emerald-100 text-emerald-800 font-black text-[9px] px-1.5 py-0.5 rounded">
                                    Approved
                                  </span>
                                </div>
                                <p className="text-slate-600 leading-relaxed text-[11px] font-medium bg-white/70 p-2 rounded-lg border border-slate-100">
                                  {tmp.body}
                                </p>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}

                    {/* STEP 3: Attach Media */}
                    {campaignWizardStep === 3 && (
                      <div className="space-y-4 text-xs">
                        <h4 className="font-extrabold text-slate-800 text-sm">
                          Multi-Media Brochures Selection
                        </h4>
                        <p className="text-slate-400">
                          Meta API supports attaching high-res PDF catalogues,
                          sofa clearance offer graphics, or videos.
                        </p>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                          {[
                            {
                              name: "Nilkamal_Sofa_Sale_Banner.png",
                              size: "1.2 MB",
                              type: "Image",
                            },
                            {
                              name: "Premium_Teakwood_Catalog_2026.pdf",
                              size: "4.8 MB",
                              type: "PDF Document",
                            },
                            {
                              name: "Freedom_Resin_Cupboard_Showreel.mp4",
                              size: "12.4 MB",
                              type: "Video",
                            },
                            {
                              name: "None (Text Only Broadcast)",
                              size: "0 KB",
                              type: "Plain Text",
                            },
                          ].map((med, i) => {
                            const isSelected =
                              newCampaignForm.attachedMedia === med.name;
                            return (
                              <div
                                key={i}
                                onClick={() =>
                                  setNewCampaignForm({
                                    ...newCampaignForm,
                                    attachedMedia: med.name,
                                  })
                                }
                                className={`p-4 border rounded-2xl cursor-pointer text-center transition-all ${
                                  isSelected
                                    ? "border-emerald-500 bg-emerald-50/30 font-bold"
                                    : "border-slate-100 bg-slate-50 hover:bg-slate-100"
                                }`}
                              >
                                <FileText className="w-8 h-8 text-slate-400 mx-auto mb-2" />
                                <strong className="text-slate-800 block truncate">
                                  {med.name}
                                </strong>
                                <span className="text-slate-400 block text-[10px] mt-1">
                                  {med.type} • {med.size}
                                </span>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}

                    {/* STEP 4: Schedule or Send Now */}
                    {campaignWizardStep === 4 && (
                      <div className="space-y-4 text-xs">
                        <h4 className="font-extrabold text-slate-800 text-sm">
                          Anti-Spam & Delivery Safeguard Settings
                        </h4>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="bg-slate-50 border border-slate-100 p-4 rounded-2xl space-y-3">
                            <h5 className="font-bold text-slate-800">
                              Dispatch Calendar Options
                            </h5>
                            <div className="space-y-2">
                              <label className="flex items-center gap-2 cursor-pointer font-semibold text-slate-700">
                                <input
                                  type="radio"
                                  name="sched"
                                  checked={
                                    newCampaignForm.scheduledTime ===
                                    "Send Immediately"
                                  }
                                  onChange={() =>
                                    setNewCampaignForm({
                                      ...newCampaignForm,
                                      scheduledTime: "Send Immediately",
                                    })
                                  }
                                  className="accent-emerald-500"
                                />
                                Send Now (Simulate direct queue blast)
                              </label>
                              <label className="flex items-center gap-2 cursor-pointer font-semibold text-slate-700">
                                <input
                                  type="radio"
                                  name="sched"
                                  checked={
                                    newCampaignForm.scheduledTime ===
                                    "Schedule Later"
                                  }
                                  onChange={() =>
                                    setNewCampaignForm({
                                      ...newCampaignForm,
                                      scheduledTime: "Schedule Later",
                                    })
                                  }
                                  className="accent-emerald-500"
                                />
                                Schedule Later (Drip release scheduler)
                              </label>
                            </div>

                            {newCampaignForm.scheduledTime ===
                              "Schedule Later" && (
                              <input
                                type="datetime-local"
                                className="w-full bg-white border border-slate-200 p-2 rounded-lg mt-2 font-bold"
                                defaultValue="2026-05-28T10:00"
                              />
                            )}
                          </div>

                          <div className="bg-slate-50 border border-slate-100 p-4 rounded-2xl space-y-3">
                            <h5 className="font-bold text-slate-800">
                              Meta API Sending Rate Limiter
                            </h5>
                            <div>
                              <label className="text-slate-400 font-semibold block mb-1">
                                Delay interval between message packets
                              </label>
                              <select
                                value={newCampaignForm.sendingDelay}
                                onChange={(e) =>
                                  setNewCampaignForm({
                                    ...newCampaignForm,
                                    sendingDelay: e.target.value,
                                  })
                                }
                                className="w-full bg-white border border-slate-200 p-2 rounded-lg"
                              >
                                <option value="3-5 Seconds (Antispam Guard Enabled)">
                                  3-5 Seconds (Antispam Guard Enabled)
                                </option>
                                <option value="Instant Blast (Danger: Meta Spam Alert Risk)">
                                  Instant Blast (Danger: Meta Spam Risk)
                                </option>
                              </select>
                            </div>

                            <div className="p-3 bg-amber-50 border border-amber-100 text-amber-800 rounded-xl leading-normal text-[10px]">
                              <strong>Anti-Spam Shield:</strong> Nilkamal CRM
                              auto-throttles requests into staggered batches of
                              100/minute to protect your official Meta API
                              credentials from suspensions.
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* STEP 5: Preview Campaign */}
                    {campaignWizardStep === 5 && (
                      <div className="space-y-4 text-xs">
                        <h4 className="font-extrabold text-slate-800 text-sm">
                          Campaign Pre-Flight Compliance Checks
                        </h4>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          {/* Left: Message preview bubble */}
                          <div className="space-y-2">
                            <span className="text-slate-400 font-bold block uppercase text-[10px]">
                              What Customers Will See
                            </span>
                            <div className="bg-emerald-50 border border-emerald-100 p-4 rounded-3xl max-w-sm relative shadow-sm">
                              <div className="bg-white border border-slate-100 p-2 rounded-2xl mb-2 text-[10px] flex items-center gap-2">
                                <FileText className="w-5 h-5 text-indigo-500" />
                                <div className="truncate">
                                  <strong className="block text-slate-800">
                                    {newCampaignForm.attachedMedia}
                                  </strong>
                                  <span className="text-slate-400 block text-[9px]">
                                    Ingested PDF Catalogue Attach
                                  </span>
                                </div>
                              </div>
                              <p className="text-xs text-slate-800 leading-relaxed font-medium">
                                {templates
                                  .find(
                                    (t) =>
                                      t.id ===
                                      newCampaignForm.selectedTemplateId,
                                  )
                                  ?.body.replace(
                                    "{{customer_name}}",
                                    "Suresh Radhakrishnan",
                                  )
                                  .replace(
                                    "{{catalog_link}}",
                                    "nilkamal.com/promo-sale",
                                  )
                                  .replace("{{city}}", "Mumbai")
                                  .replace(
                                    "{{sales_executive}}",
                                    "Amit Sharma",
                                  )}
                              </p>

                              <div className="mt-3 pt-2 border-t border-emerald-200/50 flex flex-wrap gap-1.5 justify-end">
                                <span className="bg-white px-2 py-1 border border-slate-100 text-slate-700 text-[10px] font-bold rounded-lg shadow-sm">
                                  View Collection 🛋️
                                </span>
                              </div>
                            </div>
                          </div>

                          {/* Right: Meta Compliance Checklist */}
                          <div className="bg-slate-50 border border-slate-100 p-4 rounded-3xl space-y-3">
                            <h5 className="font-bold text-slate-800 text-sm flex items-center gap-1.5">
                              <ShieldCheck className="w-5 h-5 text-emerald-500" />
                              Meta Policy Compliance Shield
                            </h5>

                            <div className="space-y-2 text-[11px] font-medium text-slate-600">
                              <div className="flex items-center gap-2">
                                <CheckCircle className="w-4.5 h-4.5 text-emerald-500 shrink-0" />
                                <span>
                                  Variables fully mapped to existing Lead
                                  properties.
                                </span>
                              </div>
                              <div className="flex items-center gap-2">
                                <CheckCircle className="w-4.5 h-4.5 text-emerald-500 shrink-0" />
                                <span>
                                  Unsubscribe button / STOP button option
                                  included in template.
                                </span>
                              </div>
                              <div className="flex items-center gap-2">
                                <CheckCircle className="w-4.5 h-4.5 text-emerald-500 shrink-0" />
                                <span>
                                  Media file formats compliant with Meta Cloud
                                  parameters.
                                </span>
                              </div>
                              <div className="flex items-center gap-2">
                                <CheckCircle className="w-4.5 h-4.5 text-emerald-500 shrink-0" />
                                <span>
                                  Daily limit parameters hold safely within Tier
                                  2 margins.
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* STEP 6: Review & Launch Campaign */}
                    {campaignWizardStep === 6 && (
                      <div className="space-y-4 text-xs text-center py-6">
                        <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto animate-bounce">
                          <Megaphone className="w-8 h-8 text-emerald-600" />
                        </div>
                        <div>
                          <h4 className="font-extrabold text-slate-900 text-base">
                            You are Ready to Launch!
                          </h4>
                          <p className="text-xs text-slate-500 mt-1">
                            This will safely initiate bulk broadcast pipelines
                            across your filtered recipient databases.
                          </p>
                        </div>

                        <div className="bg-slate-50 border border-slate-100 p-4 rounded-3xl max-w-md mx-auto grid grid-cols-2 gap-4 text-left font-medium text-slate-600">
                          <div>
                            <span className="text-slate-400 block uppercase font-bold text-[9px]">
                              Campaign Target Name
                            </span>
                            <strong className="text-slate-900 text-xs block mt-0.5">
                              {newCampaignForm.name}
                            </strong>
                          </div>
                          <div>
                            <span className="text-slate-400 block uppercase font-bold text-[9px]">
                              Audience Blast Reach
                            </span>
                            <strong className="text-slate-900 text-xs block mt-0.5">
                              {newCampaignForm.targetType === "all"
                                ? "4,320 Verified Customers"
                                : "1,850 Segmented Leads"}
                            </strong>
                          </div>
                          <div>
                            <span className="text-slate-400 block uppercase font-bold text-[9px]">
                              API Endpoint Code
                            </span>
                            <strong className="text-emerald-600 font-bold block mt-0.5">
                              META_LIVE_OUTBOX
                            </strong>
                          </div>
                          <div>
                            <span className="text-slate-400 block uppercase font-bold text-[9px]">
                              Antispam Throttling
                            </span>
                            <strong className="text-slate-800 text-xs block mt-0.5">
                              Staggered (Delay engaged)
                            </strong>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Navigation Buttons inside wizard form */}
                    <div className="pt-4 border-t border-slate-100 flex justify-between items-center text-xs">
                      <button
                        type="button"
                        disabled={campaignWizardStep === 1}
                        onClick={() =>
                          setCampaignWizardStep(campaignWizardStep - 1)
                        }
                        className="px-4 py-2 border border-slate-200 text-slate-500 rounded-xl hover:bg-slate-50 disabled:opacity-50"
                      >
                        Previous Step
                      </button>

                      {campaignWizardStep < 6 ? (
                        <button
                          type="button"
                          onClick={() => {
                            if (
                              campaignWizardStep === 1 &&
                              newCampaignForm.targetType === "upload" &&
                              !draggedFile
                            ) {
                              showToast(
                                "Please drag & drop your Excel or CSV customer spreadsheet first.",
                                "error",
                              );
                              return;
                            }
                            setCampaignWizardStep(campaignWizardStep + 1);
                          }}
                          className="px-5 py-2 bg-emerald-500 hover:bg-emerald-600 text-white font-bold rounded-xl shadow"
                        >
                          Continue Next
                        </button>
                      ) : (
                        <button
                          type="submit"
                          className="px-6 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-black rounded-xl shadow-lg"
                        >
                          Dispatach Meta Blast ⚡
                        </button>
                      )}
                    </div>
                  </form>
                </div>
              )}

              {/* SUB TAB PAGE 3: MESSAGE TEMPLATES */}
              {campaignTab === "templates" && (
                <div className="space-y-6">
                  <div className="flex justify-between items-center">
                    <div>
                      <h4 className="font-extrabold text-slate-900 text-sm">
                        Meta Custom Inbound & Outbound Templates
                      </h4>
                      <p className="text-xs text-slate-400">
                        Pre-approved interactive formats to prevent spam filters
                        on customer chats.
                      </p>
                    </div>
                    <button
                      // onClick={() => setIsCreatingNewTemplate(true)}
                      className="px-3.5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl flex items-center gap-1.5 shadow"
                    >
                      <PlusCircle className="w-4 h-4" />
                      Create New Template
                    </button>
                  </div>

                  {/* Templates List Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {templates.map((tmp) => (
                      <div
                        key={tmp.id}
                        className="bg-white border border-slate-100 p-5 rounded-3xl space-y-4 shadow-sm relative overflow-hidden"
                      >
                        <div className="flex justify-between items-start">
                          <div>
                            <span className="px-2 py-0.5 bg-slate-100 text-slate-600 font-bold text-[9px] uppercase rounded">
                              {tmp.category}
                            </span>
                            <h5 className="font-extrabold text-slate-900 text-sm mt-1">
                              {tmp.name}
                            </h5>
                            <span className="text-[10px] text-slate-400">
                              ID: {tmp.id} • Language: {tmp.language}
                            </span>
                          </div>
                          <span className="bg-emerald-50 text-emerald-700 font-extrabold border border-emerald-100 px-2 py-0.5 rounded-full text-[10px] flex items-center gap-1">
                            <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-ping" />
                            Meta Active
                          </span>
                        </div>

                        <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100">
                          <p className="text-xs text-slate-600 leading-relaxed whitespace-pre-wrap">
                            {tmp.body}
                          </p>
                        </div>

                        <div className="flex flex-wrap gap-2 pt-2 border-t border-slate-50">
                          {tmp.buttons.map((btn, bIdx) => (
                            <span
                              key={bIdx}
                              className="text-[10px] bg-white border border-slate-200 px-3 py-1.5 rounded-xl font-bold text-slate-700 shadow-xs"
                            >
                              Button: {btn}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Add Template Modal */}
                  {isCreatingNewTemplate && (
                    <div className="fixed inset-0 bg-slate-950/20 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                      <div className="bg-white w-full max-w-md rounded-3xl p-6 shadow-2xl space-y-5 animate-modal-scale">
                        <div className="flex justify-between items-center pb-3 border-b border-slate-100">
                          <h4 className="font-extrabold text-slate-900">
                            Create Custom Template
                          </h4>
                          <button
                            onClick={() => setIsCreatingNewTemplate(false)}
                            className="p-1 hover:bg-slate-100 rounded-lg text-slate-400"
                          >
                            <X className="w-5 h-5" />
                          </button>
                        </div>

                        <form
                          onSubmit={createTemplate}
                          className="space-y-4 text-xs"
                        >
                          <div className="space-y-1">
                            <label className="text-slate-400 font-bold block">
                              Template Registry Name
                            </label>
                            <input
                              type="text"
                              value={newTemplateForm.name}
                              onChange={(e) =>
                                setNewTemplateForm({
                                  ...newTemplateForm,
                                  name: e.target.value,
                                })
                              }
                              placeholder="e.g. Festival Bed Sale Blast"
                              className="w-full bg-slate-50 border border-slate-100 rounded-xl p-2.5"
                            />
                          </div>
                          <div className="space-y-1">
                            <label className="text-slate-400 font-bold block">
                              Meta Category Class
                            </label>
                            <select
                              value={newTemplateForm.category}
                              onChange={(e) =>
                                setNewTemplateForm({
                                  ...newTemplateForm,
                                  category: e.target.value,
                                })
                              }
                              className="w-full bg-slate-50 border border-slate-100 rounded-xl p-2.5"
                            >
                              <option value="Promotional">
                                Promotional Blast
                              </option>
                              <option value="Utility">Utility Updates</option>
                              <option value="Transactional">
                                Transactional Alert
                              </option>
                            </select>
                          </div>
                          <div className="space-y-1">
                            <label className="text-slate-400 font-bold block">
                              Message Body Content
                            </label>
                            <textarea
                              rows={4}
                              value={newTemplateForm.body}
                              onChange={(e) =>
                                setNewTemplateForm({
                                  ...newTemplateForm,
                                  body: e.target.value,
                                })
                              }
                              className="w-full bg-slate-50 border border-slate-100 rounded-xl p-2.5 font-medium leading-relaxed"
                              placeholder="Insert variables like {{customer_name}} or {{product}}..."
                            />
                          </div>

                          <div className="p-3 bg-blue-50 text-blue-700 rounded-2xl leading-normal text-[10px]">
                            <strong>Variable Guidance:</strong> Use double curly
                            braces `{{ variable_name }}` to dynamically insert
                            customer specifics during send-time execution.
                          </div>

                          <div className="pt-4 border-t border-slate-100 flex justify-end gap-2 text-xs">
                            <button
                              type="button"
                              onClick={() => setIsCreatingNewTemplate(false)}
                              className="px-4 py-2 bg-slate-100 text-slate-600 rounded-xl"
                            >
                              Cancel
                            </button>
                            <button
                              type="submit"
                              className="px-4 py-2 bg-emerald-500 text-white font-bold rounded-xl"
                            >
                              Submit for Meta API Approval
                            </button>
                          </div>
                        </form>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* SUB TAB PAGE 4: DEEP FLOW ANALYTICS */}
              {campaignTab === "analytics" && (
                <div className="space-y-6">
                  {/* Performance Chart Layouts */}
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* SVG Funnel Analysis */}
                    <div className="bg-white border border-slate-100 p-5 rounded-3xl shadow-sm space-y-4">
                      <div>
                        <h4 className="font-extrabold text-slate-900 text-sm">
                          Conversion Funnel Heatmap
                        </h4>
                        <p className="text-xs text-slate-400">
                          Tracking aggregate drop-offs from bulk broadcasts.
                        </p>
                      </div>

                      {/* Pure beautiful drawing representing conversion funnels */}
                      <div className="space-y-3.5 pt-4">
                        {[
                          {
                            step: "Sent Broadcast",
                            count: "100%",
                            width: "w-full",
                            color: "bg-blue-600",
                          },
                          {
                            step: "Delivered Webhook",
                            count: "98.2%",
                            width: "w-[98%]",
                            color: "bg-teal-500",
                          },
                          {
                            step: "Reads Detected",
                            count: "88.4%",
                            width: "w-[88%]",
                            color: "bg-indigo-500",
                          },
                          {
                            step: "Chats Back/Replied",
                            count: "19.7%",
                            width: "w-[20%]",
                            color: "bg-emerald-500",
                          },
                          {
                            step: "Closed Converted Sale",
                            count: "4.2%",
                            width: "w-[8%]",
                            color: "bg-purple-600",
                          },
                        ].map((fn, idx) => (
                          <div key={idx} className="space-y-1 text-xs">
                            <div className="flex justify-between items-center text-[11px] font-bold text-slate-500">
                              <span>{fn.step}</span>
                              <span className="font-black text-slate-900">
                                {fn.count}
                              </span>
                            </div>
                            <div className="w-full bg-slate-100 h-6 rounded-lg overflow-hidden relative">
                              <div
                                className={`${fn.color} h-full ${fn.width} rounded-lg`}
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Meta Daily API Usage Graph */}
                    <div className="bg-white border border-slate-100 p-5 rounded-3xl shadow-sm space-y-4 lg:col-span-2">
                      <div>
                        <h4 className="font-extrabold text-slate-900 text-sm">
                          Real-time Webhook Response Heatmap
                        </h4>
                        <p className="text-xs text-slate-400">
                          Hourly response pingbacks over the last 24 hours.
                        </p>
                      </div>

                      <div className="h-44 w-full relative">
                        <svg
                          className="w-full h-full overflow-visible"
                          viewBox="0 0 500 120"
                        >
                          {/* Grid Lines */}
                          <line
                            x1="0"
                            y1="90"
                            x2="500"
                            y2="90"
                            stroke="#f1f5f9"
                            strokeDasharray="3"
                          />
                          <line
                            x1="0"
                            y1="50"
                            x2="500"
                            y2="50"
                            stroke="#f1f5f9"
                            strokeDasharray="3"
                          />

                          {/* Line graphics representing webhook load */}
                          <path
                            d="M 10,95 Q 60,80 120,40 T 240,65 T 360,20 T 490,50"
                            fill="none"
                            stroke="#10b981"
                            strokeWidth="3.5"
                            strokeLinecap="round"
                          />

                          <circle
                            cx="120"
                            cy="40"
                            r="5"
                            fill="#10b981"
                            stroke="#ffffff"
                            strokeWidth="2"
                          />
                          <circle
                            cx="360"
                            cy="20"
                            r="5"
                            fill="#10b981"
                            stroke="#ffffff"
                            strokeWidth="2"
                          />

                          <text x="10" y="115" fill="#94a3b8" fontSize="10px">
                            09:00 AM
                          </text>
                          <text x="150" y="115" fill="#94a3b8" fontSize="10px">
                            01:00 PM
                          </text>
                          <text x="300" y="115" fill="#94a3b8" fontSize="10px">
                            05:00 PM
                          </text>
                          <text x="450" y="115" fill="#94a3b8" fontSize="10px">
                            09:00 PM
                          </text>
                        </svg>
                      </div>
                    </div>
                  </div>

                  {/* Pipeline architecture diagram */}
                  <div className="bg-slate-900 text-white p-5 rounded-3xl space-y-4">
                    <div>
                      <h4 className="font-extrabold text-sm">
                        Automated Real-Time Pipeline Diagram
                      </h4>
                      <p className="text-xs text-slate-400">
                        How message dispatch handles Meta cloud webhooks and
                        assigns active responders.
                      </p>
                    </div>

                    <div className="flex flex-col md:flex-row items-center justify-between gap-4 p-4 bg-slate-800/40 rounded-2xl border border-dashed border-slate-700 text-xs font-bold text-center">
                      <div className="flex-1 bg-slate-800 p-3 rounded-xl border border-slate-700 space-y-1 text-xs">
                        <Database className="w-5 h-5 text-indigo-400 mx-auto" />
                        <span className="text-white block">
                          1. Segment Filter Ingest
                        </span>
                        <p className="text-[10px] text-slate-400 font-medium">
                          Auto-filtering matching contacts based on purchase
                          history.
                        </p>
                      </div>
                      <span className="text-emerald-500 font-extrabold rotate-90 md:rotate-0">
                        ➔
                      </span>
                      <div className="flex-1 bg-slate-800 p-3 rounded-xl border border-slate-700 space-y-1 text-xs">
                        <SlidersHorizontal className="w-5 h-5 text-sky-400 mx-auto animate-pulse" />
                        <span className="text-white block">
                          2. Batch Throttling (Redis)
                        </span>
                        <p className="text-[10px] text-slate-400 font-medium">
                          Staggering package dispatches to avoid Meta anti-spam
                          flags.
                        </p>
                      </div>
                      <span className="text-emerald-500 font-extrabold rotate-90 md:rotate-0">
                        ➔
                      </span>
                      <div className="flex-1 bg-slate-800 p-3 rounded-xl border border-slate-700 space-y-1 text-xs">
                        <Wifi className="w-5 h-5 text-emerald-400 mx-auto" />
                        <span className="text-white block">
                          3. Meta Cloud APIs
                        </span>
                        <p className="text-[10px] text-slate-400 font-medium">
                          Meta dispatches messages directly to verified client
                          devices.
                        </p>
                      </div>
                      <span className="text-emerald-500 font-extrabold rotate-90 md:rotate-0">
                        ➔
                      </span>
                      <div className="flex-1 bg-slate-800 p-3 rounded-xl border border-slate-700 space-y-1 text-xs">
                        <MessageSquare className="w-5 h-5 text-amber-400 mx-auto" />
                        <span className="text-white block">
                          4. Hook Responder Sync
                        </span>
                        <p className="text-[10px] text-slate-400 font-medium">
                          Incoming responses auto-route straight into active
                          agent chat desks.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* SUB TAB PAGE 5: API LIMITS & THROTTLING CONFIG */}
              {campaignTab === "limits" && (
                <div className="bg-white border border-slate-100 p-6 rounded-3xl shadow-sm max-w-4xl mx-auto space-y-6 text-xs text-slate-600">
                  <div>
                    <h4 className="font-extrabold text-slate-900 text-base">
                      Meta Cloud API Operational Limits
                    </h4>
                    <p className="text-xs text-slate-400">
                      Maintain high API status and quality ratings by matching
                      guidelines.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-slate-50 border border-slate-100 p-4 rounded-3xl space-y-3">
                      <h5 className="font-bold text-slate-800 text-sm flex items-center gap-1">
                        <ShieldAlert className="w-4.5 h-4.5 text-blue-500" />
                        Official Sandbox Rate Tiers
                      </h5>
                      <div className="space-y-2">
                        <div className="flex justify-between border-b border-slate-200 pb-1.5 font-medium">
                          <span>Current Rate Tier Status:</span>
                          <strong className="text-slate-900">
                            Tier 2 (10,000 Messages/Day)
                          </strong>
                        </div>
                        <div className="flex justify-between border-b border-slate-200 pb-1.5 font-medium">
                          <span>Active Quality Score:</span>
                          <strong className="text-emerald-600 font-extrabold">
                            High (99.8% Approval)
                          </strong>
                        </div>
                        <div className="flex justify-between font-medium">
                          <span>Registered Meta ID:</span>
                          <strong className="text-slate-700">
                            WABA-MUMBAI-OFFICE-8812
                          </strong>
                        </div>
                      </div>
                    </div>

                    <div className="bg-slate-50 border border-slate-100 p-4 rounded-3xl space-y-3">
                      <h5 className="font-bold text-slate-800 text-sm flex items-center gap-1">
                        <Sliders className="w-4.5 h-4.5 text-indigo-500" />
                        Dynamic Admin Throttlers
                      </h5>
                      <div>
                        <label className="text-slate-400 font-bold block mb-1">
                          Store Daily Send-out Safeguard Cap
                        </label>
                        <select className="w-full bg-white border border-slate-200 p-2 rounded-lg font-bold">
                          <option value="5000">
                            Limit to 5,000 Messages/day
                          </option>
                          <option value="10000">
                            Limit to 10,000 Messages/day (No cap)
                          </option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Campaign detailed historical statistics drawer (if selected) */}
              {selectedCampaignForDetail && (
                <div className="fixed inset-0 bg-slate-950/20 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                  <div className="bg-white w-full max-w-xl rounded-3xl p-6 shadow-2xl space-y-5 animate-modal-scale max-h-[90vh] overflow-y-auto text-xs text-slate-600">
                    <div className="flex justify-between items-center pb-3 border-b border-slate-100">
                      <div>
                        <span className="text-[9px] font-extrabold text-blue-600 uppercase">
                          Campaign Audit Report
                        </span>
                        <h4 className="font-black text-slate-900 text-base mt-1">
                          {selectedCampaignForDetail.name}
                        </h4>
                      </div>
                      <button
                        onClick={() => setSelectedCampaignForDetail(null)}
                        className="p-1 hover:bg-slate-100 rounded-lg text-slate-400"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </div>

                    <div className="grid grid-cols-2 gap-4 bg-slate-50/50 p-4 rounded-2xl border border-slate-100 font-medium">
                      <div>
                        <span className="text-slate-400 block text-[9px] uppercase font-bold">
                          Sender Executive
                        </span>
                        <strong className="text-slate-800 block mt-0.5">
                          {selectedCampaignForDetail.createdBy}
                        </strong>
                      </div>
                      <div>
                        <span className="text-slate-400 block text-[9px] uppercase font-bold">
                          Execution Date
                        </span>
                        <strong className="text-slate-800 block mt-0.5">
                          {selectedCampaignForDetail.sentDate}
                        </strong>
                      </div>
                      <div>
                        <span className="text-slate-400 block text-[9px] uppercase font-bold">
                          Core Template Template Used
                        </span>
                        <strong className="text-slate-800 block mt-0.5">
                          {selectedCampaignForDetail.template}
                        </strong>
                      </div>
                      <div>
                        <span className="text-slate-400 block text-[9px] uppercase font-bold">
                          Audience Reach
                        </span>
                        <strong className="text-slate-900 font-black block mt-0.5">
                          {selectedCampaignForDetail.audienceSize.toLocaleString()}{" "}
                          Recipient Leads
                        </strong>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <h5 className="font-bold text-slate-800 text-xs">
                        Meta Cloud Delivery Breakdown
                      </h5>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                        <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-100">
                          <span className="text-slate-400 text-[9px] font-bold block uppercase">
                            Delivered
                          </span>
                          <strong className="text-slate-950 block text-sm font-black">
                            {selectedCampaignForDetail.delivered.toLocaleString()}
                          </strong>
                        </div>
                        <div className="p-2.5 bg-emerald-50 rounded-xl border border-emerald-100">
                          <span className="text-emerald-600 text-[9px] font-bold block uppercase">
                            Delivery %
                          </span>
                          <strong className="text-emerald-600 block text-sm font-black">
                            {selectedCampaignForDetail.deliveryPercent || 0}%
                          </strong>
                        </div>
                        <div className="p-2.5 bg-sky-50 rounded-xl border border-sky-100">
                          <span className="text-sky-600 text-[9px] font-bold block uppercase">
                            Read Rate
                          </span>
                          <strong className="text-sky-600 block text-sm font-black">
                            {selectedCampaignForDetail.read.toLocaleString()}
                          </strong>
                        </div>
                        <div className="p-2.5 bg-amber-50 rounded-xl border border-amber-100">
                          <span className="text-amber-600 text-[9px] font-bold block uppercase">
                            Replies back
                          </span>
                          <strong className="text-amber-600 block text-sm font-black">
                            {selectedCampaignForDetail.replied.toLocaleString()}
                          </strong>
                        </div>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-slate-100 flex justify-end gap-2">
                      <button
                        onClick={() => {
                          showToast(
                            "Exporting XLS audit logs to executive downloads.",
                            "success",
                          );
                          setSelectedCampaignForDetail(null);
                        }}
                        className="px-4 py-2 border border-slate-200 text-slate-700 font-bold rounded-lg flex items-center gap-1"
                      >
                        <Download className="w-4 h-4" />
                        Download Detailed Audit Log
                      </button>
                      <button
                        onClick={() => setSelectedCampaignForDetail(null)}
                        className="px-4 py-2 bg-slate-900 text-white font-bold rounded-lg"
                      >
                        Close Report
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {}
          {activeTab === "dashboard" && (
            <>
              {/* Premium Dashboard Headline */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <h1 className="text-2xl font-black text-slate-900 tracking-tight">
                    Overview Dashboard
                  </h1>
                  <p className="text-sm text-slate-500 mt-0.5">
                    Real-time stats from walk-ins, phone calls, social media &
                    WhatsApp integration.
                  </p>
                </div>
                {/* Simulated live indicators */}
                <div className="flex items-center gap-4 text-xs font-semibold text-slate-500 bg-white border border-slate-100 px-4 py-2.5 rounded-2xl shadow-sm">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 bg-emerald-500 rounded-full animate-ping" />
                    <span>Auto-Sync Active</span>
                  </div>
                  <div className="w-[1px] h-4 bg-slate-200" />
                  <span>Update: Just now</span>
                </div>
              </div>

              {/* Quick WhatsApp Automation Alert Widget */}
              <div className="bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-100 rounded-2xl p-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-sm animate-pulse-glow">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-emerald-500 text-white rounded-xl">
                    <MessageCircle className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm">
                      Real-time WhatsApp Leads Activated
                    </h4>
                    <p className="text-xs text-slate-600">
                      Your Webhook endpoint is currently active. Automatically
                      capturing and assigning leads.
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2 self-start md:self-auto">
                  <button
                    onClick={() => setActiveTab("whatsapp")}
                    className="px-3 py-1.5 bg-white border border-emerald-200 text-emerald-700 hover:bg-emerald-100/50 rounded-xl text-xs font-bold transition-all"
                  >
                    Open Live Inbox ({stats.unreadWaChats} Unread)
                  </button>
                  <button
                    onClick={simulateIncomingWhatsApp}
                    className="px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition-all flex items-center gap-1.5"
                  >
                    <Zap className="w-3.5 h-3.5" />
                    Simulate WhatsApp Ping
                  </button>
                </div>
              </div>

              {/* Metric Statistic Grid */}
              <div className="grid grid-cols-2 lg:grid-cols-6 gap-4">
                {[
                  {
                    title: "Total CRM Leads",
                    val: stats.total,
                    percent: "+12% vs last week",
                    desc: "All incoming channels",
                    color: "blue",
                    icon: Users,
                  },
                  {
                    title: "New Enquiries",
                    val: stats.newLeads,
                    percent: "Pending initial call",
                    desc: "Needs assignment",
                    color: "indigo",
                    icon: Sparkles,
                  },
                  {
                    title: "Hot / Active",
                    val: stats.hotLeads,
                    percent: "High conversion prob.",
                    desc: "Follow-up priority",
                    color: "rose",
                    icon: AlertTriangle,
                    glow: true,
                  },
                  {
                    title: "Converted Deals",
                    val: stats.convertedLeads,
                    percent: "Successfully sold",
                    desc: "Invoiced furniture",
                    color: "emerald",
                    icon: CheckCircle,
                  },
                  {
                    title: "WhatsApp Leads",
                    val: stats.whatsappLeads,
                    percent: "Real-time API",
                    desc: "Auto-synced contacts",
                    color: "green",
                    icon: MessageCircle,
                  },
                  {
                    title: "Missed Follow-ups",
                    val: stats.missedFollowups,
                    percent: "Attention needed!",
                    desc: "Overdue schedule list",
                    color: "red",
                    icon: Info,
                    pulse: stats.missedFollowups > 0,
                  },
                ].map((card, idx) => {
                  const IconComponent = card.icon;
                  return (
                    <div
                      key={idx}
                      className={`bg-white border border-slate-100 rounded-2xl p-4 shadow-sm relative overflow-hidden transition-all duration-300 hover:shadow-md hover:scale-[1.02] ${
                        card.glow
                          ? "border-rose-100 bg-gradient-to-br from-white to-rose-50/20"
                          : ""
                      } ${card.pulse ? "border-red-100 animate-pulse-glow" : ""}`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                          {card.title}
                        </span>
                        <div
                          className={`p-1.5 rounded-lg ${
                            card.color === "emerald"
                              ? "bg-emerald-50 text-emerald-600"
                              : card.color === "green"
                                ? "bg-emerald-50 text-emerald-600"
                                : card.color === "rose"
                                  ? "bg-rose-50 text-rose-600"
                                  : card.color === "amber"
                                    ? "bg-amber-50 text-amber-600"
                                    : card.color === "red"
                                      ? "bg-rose-50 text-rose-600"
                                      : "bg-blue-50 text-blue-600"
                          }`}
                        >
                          <IconComponent className="w-4 h-4" />
                        </div>
                      </div>
                      <div className="mt-2.5 flex items-baseline gap-2">
                        <span className="text-2xl font-black text-slate-950 tracking-tight">
                          {card.val}
                        </span>
                        {card.pulse && (
                          <span className="text-[10px] font-bold text-rose-600">
                            Urgent!
                          </span>
                        )}
                      </div>
                      <p className="text-[10px] text-slate-500 mt-1">
                        {card.desc}
                      </p>
                      <div className="mt-2 pt-2 border-t border-slate-50 flex items-center justify-between">
                        <span className="text-[9px] font-semibold text-slate-400">
                          {card.percent}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Graphic Analytics & Charts Display (Pure beautiful SVG) */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Monthly Sales Revenue Area Chart */}
                <div className="bg-white border border-slate-100 p-5 rounded-2xl shadow-sm lg:col-span-2">
                  <div className="flex items-center justify-between pb-4 border-b border-slate-50">
                    <div>
                      <h3 className="font-bold text-slate-900 text-sm">
                        Revenue Generated & Projection
                      </h3>
                      <p className="text-xs text-slate-400">
                        Total revenue generated from successfully converted
                        leads
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-slate-400 font-semibold">
                        Total Revenue
                      </p>
                      <p className="text-lg font-black text-blue-600">
                        ₹{stats.totalRevenue.toLocaleString("en-IN")}
                      </p>
                    </div>
                  </div>

                  {/* High Quality Render of SVG Graph Area */}
                  <div className="mt-6 relative h-48 w-full">
                    <svg
                      className="w-full h-full overflow-visible"
                      viewBox="0 0 500 150"
                    >
                      <defs>
                        <linearGradient
                          id="chartGradient"
                          x1="0"
                          y1="0"
                          x2="0"
                          y2="1"
                        >
                          <stop
                            offset="0%"
                            stopColor="#3b82f6"
                            stopOpacity="0.2"
                          />
                          <stop
                            offset="100%"
                            stopColor="#3b82f6"
                            stopOpacity="0"
                          />
                        </linearGradient>
                      </defs>
                      {/* Grid Lines */}
                      <line
                        x1="0"
                        y1="120"
                        x2="500"
                        y2="120"
                        stroke="#f1f5f9"
                        strokeDasharray="4"
                      />
                      <line
                        x1="0"
                        y1="80"
                        x2="500"
                        y2="80"
                        stroke="#f1f5f9"
                        strokeDasharray="4"
                      />
                      <line
                        x1="0"
                        y1="40"
                        x2="500"
                        y2="40"
                        stroke="#f1f5f9"
                        strokeDasharray="4"
                      />

                      {/* Area Path */}
                      <path
                        d="M 10,130 Q 80,110 150,70 T 300,90 T 450,40 L 490,40 L 490,140 L 10,140 Z"
                        fill="url(#chartGradient)"
                      />
                      {/* Line Path */}
                      <path
                        d="M 10,130 Q 80,110 150,70 T 300,90 T 450,40"
                        fill="none"
                        stroke="#3b82f6"
                        strokeWidth="3.5"
                        strokeLinecap="round"
                      />

                      {/* Interactive Data Dots */}
                      <circle
                        cx="150"
                        cy="70"
                        r="5"
                        fill="#3b82f6"
                        stroke="#ffffff"
                        strokeWidth="2"
                        className="cursor-pointer hover:scale-125 transition-transform"
                      />
                      <circle
                        cx="450"
                        cy="40"
                        r="5"
                        fill="#10b981"
                        stroke="#ffffff"
                        strokeWidth="2"
                      />

                      {/* Month Text Labeling */}
                      <text x="10" y="145" fill="#94a3b8" fontSize="10px">
                        Jan
                      </text>
                      <text x="110" y="145" fill="#94a3b8" fontSize="10px">
                        Feb
                      </text>
                      <text x="210" y="145" fill="#94a3b8" fontSize="10px">
                        Mar
                      </text>
                      <text x="310" y="145" fill="#94a3b8" fontSize="10px">
                        Apr
                      </text>
                      <text x="410" y="145" fill="#94a3b8" fontSize="10px">
                        May (Live)
                      </text>
                    </svg>
                  </div>
                </div>

                {/* Lead Sources Distribution Pie Chart Widget */}
                <div className="bg-white border border-slate-100 p-5 rounded-2xl shadow-sm flex flex-col justify-between">
                  <div>
                    <h3 className="font-bold text-slate-900 text-sm">
                      Inquiry Lead Sources
                    </h3>
                    <p className="text-xs text-slate-400">
                      Manual registration channels
                    </p>
                  </div>

                  <div className="flex items-center justify-around my-4">
                    {/* SVG Pie Representation */}
                    <div className="relative w-28 h-28">
                      <svg
                        className="w-full h-full transform -rotate-90"
                        viewBox="0 0 36 36"
                      >
                        <circle
                          cx="18"
                          cy="18"
                          r="15.915"
                          fill="none"
                          stroke="#f1f5f9"
                          strokeWidth="3.5"
                        />
                        {/* Instagram 25% */}
                        <circle
                          cx="18"
                          cy="18"
                          r="15.915"
                          fill="none"
                          stroke="#ec4899"
                          strokeWidth="3.5"
                          strokeDasharray="25 75"
                          strokeDashoffset="0"
                        />
                        {/* Walk-in 20% */}
                        <circle
                          cx="18"
                          cy="18"
                          r="15.915"
                          fill="none"
                          stroke="#10b981"
                          strokeWidth="3.5"
                          strokeDasharray="20 80"
                          strokeDashoffset="-25"
                        />
                        {/* WhatsApp 35% */}
                        <circle
                          cx="18"
                          cy="18"
                          r="15.915"
                          fill="none"
                          stroke="#10b981"
                          strokeWidth="3.5"
                          strokeDasharray="35 65"
                          strokeDashoffset="-45"
                        />
                        {/* Web & Calls 20% */}
                        <circle
                          cx="18"
                          cy="18"
                          r="15.915"
                          fill="none"
                          stroke="#3b82f6"
                          strokeWidth="3.5"
                          strokeDasharray="20 80"
                          strokeDashoffset="-80"
                        />
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center flex-col">
                        <span className="text-xs font-bold text-slate-400">
                          Top
                        </span>
                        <span className="text-xs font-black text-emerald-600">
                          WhatsApp
                        </span>
                      </div>
                    </div>

                    <div className="space-y-1.5 text-xs">
                      <div className="flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-[#10b981]" />
                        <span className="text-slate-500 font-medium">
                          WhatsApp (35%)
                        </span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-[#ec4899]" />
                        <span className="text-slate-500 font-medium">
                          Instagram (25%)
                        </span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-[#10b981]" />
                        <span className="text-slate-500 font-medium">
                          Walk-ins (20%)
                        </span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-[#3b82f6]" />
                        <span className="text-slate-500 font-medium">
                          Web / Calls (20%)
                        </span>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => setActiveTab("analytics")}
                    className="w-full text-center py-2 text-xs font-semibold bg-slate-50 hover:bg-slate-100 rounded-xl text-slate-600 transition-colors"
                  >
                    View Source Analytics
                  </button>
                </div>
              </div>

              {/* Row: Recent Activities Timeline & Top Performing Employees */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Timeline UI */}
                <div className="bg-white border border-slate-100 p-5 rounded-2xl shadow-sm lg:col-span-2">
                  <div className="flex items-center justify-between pb-3.5 border-b border-slate-50">
                    <div>
                      <h3 className="font-bold text-slate-900 text-sm">
                        Real-time Timeline Logs
                      </h3>
                      <p className="text-xs text-slate-400">
                        Activity & action updates by your desk employees
                      </p>
                    </div>
                  </div>

                  <div className="mt-4 space-y-4 max-h-[290px] overflow-y-auto pr-1">
                    {leads
                      .flatMap((l) =>
                        l.timeline.map((t) => ({
                          ...t,
                          leadName: l.name,
                          leadId: l.id,
                        })),
                      )
                      .slice(0, 5)
                      .map((act, idx) => (
                        <div key={idx} className="flex gap-3 text-xs">
                          <div className="flex flex-col items-center">
                            <div className="w-2 h-2 bg-blue-500 rounded-full ring-4 ring-blue-50" />
                            <div className="w-[1px] flex-1 bg-slate-100 my-1" />
                          </div>
                          <div className="flex-1 bg-slate-50/55 border border-slate-100 p-2.5 rounded-xl">
                            <div className="flex justify-between items-center mb-1">
                              <span className="font-bold text-slate-900 text-xs">
                                {act.user}
                              </span>
                              <span className="text-[10px] text-slate-400">
                                {act.date}
                              </span>
                            </div>
                            <p className="text-slate-600 leading-normal">
                              {act.text}
                            </p>
                            <div className="mt-2 flex items-center justify-between">
                              <span className="text-[10px] bg-white border border-slate-100 px-2 py-0.5 rounded text-slate-400">
                                Lead:{" "}
                                <strong className="text-slate-700">
                                  {act.leadName}
                                </strong>
                              </span>
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>

                {/* Employee Performance Leaderboard */}
                <div className="bg-white border border-slate-100 p-5 rounded-2xl shadow-sm">
                  <div className="flex items-center justify-between pb-3.5 border-b border-slate-50">
                    <div>
                      <h3 className="font-bold text-slate-900 text-sm">
                        Sales Executives Target
                      </h3>
                      <p className="text-xs text-slate-400">
                        May 2026 performance metrics
                      </p>
                    </div>
                  </div>

                  <div className="mt-4 space-y-4">
                    {employees.map((emp) => {
                      const percentage = Math.round(
                        (emp.currentSales / emp.target) * 100,
                      );
                      return (
                        <div key={emp.id} className="space-y-1.5">
                          <div className="flex justify-between items-center text-xs">
                            <div className="flex items-center gap-2">
                              <span className="w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center font-bold text-[10px] text-slate-600">
                                {emp.avatar}
                              </span>
                              <span className="font-bold text-slate-800">
                                {emp.name}
                              </span>
                            </div>
                            <span className="font-semibold text-slate-500 font-mono">
                              ₹{emp.currentSales.toLocaleString("en-IN")} /{" "}
                              {percentage}%
                            </span>
                          </div>

                          <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                            <div
                              className="bg-gradient-to-r from-blue-500 to-indigo-500 h-full rounded-full transition-all duration-1000"
                              style={{ width: `${Math.min(percentage, 100)}%` }}
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </>
          )}

          {activeTab === "whatsapp" && (
            <div className="space-y-6">
              {/* WhatsApp Live chat UI split frames */}
              <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 bg-white border border-slate-100 rounded-3xl overflow-hidden shadow-sm h-[680px]">
                {/* LEFT: Conversation selectors */}
                <div className="lg:col-span-1 border-r border-slate-100 flex flex-col h-full bg-slate-50/30">
                  <div className="p-4 border-b border-slate-100 space-y-3">
                    <div className="relative">
                      <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
                      <input
                        type="text"
                        placeholder="Search active chat list..."
                        value={chatSearchText}
                        onChange={(e) => setChatSearchText(e.target.value)}
                        className="pl-9 pr-3 py-2 text-xs w-full bg-white border border-slate-100 rounded-xl focus:outline-none"
                      />
                    </div>

                    <div className="flex gap-1 bg-slate-100 p-1 rounded-lg text-xs font-semibold">
                      {[
                        { id: "all", label: "All Chats" },
                        { id: "unread", label: "Unread" },
                        { id: "mine", label: "Mine" },
                      ].map((tab) => (
                        <button
                          key={tab.id}
                          onClick={() => setChatFilterType(tab.id)}
                          className={`flex-1 text-center py-1 rounded-md transition-all ${
                            chatFilterType === tab.id
                              ? "bg-white text-slate-900 shadow-sm font-bold"
                              : "text-slate-500 hover:text-slate-800"
                          }`}
                        >
                          {tab.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="flex-1 overflow-y-auto divide-y divide-slate-100/50">
                    {filteredChats.map((chat) => {
                      const isActive = activeChatId === chat.id;
                      const lastMsg = chat.messages[chat.messages.length - 1];
                      return (
                        <div
                          key={chat.id}
                          onClick={() => {
                            setActiveChatId(chat.id);
                            chat.unread = false;
                          }}
                          className={`p-4 cursor-pointer transition-all flex items-start gap-3 relative ${
                            isActive
                              ? "bg-emerald-50/30 border-l-4 border-emerald-500"
                              : "hover:bg-slate-50"
                          }`}
                        >
                          <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-sm shrink-0">
                            {chat.name.charAt(0)}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex justify-between items-baseline mb-1">
                              <h4 className="font-bold text-xs text-slate-900 truncate">
                                {chat.name}
                              </h4>
                              <span className="text-[9px] text-slate-400 shrink-0 font-mono">
                                {lastMsg ? lastMsg.time : "Now"}
                              </span>
                            </div>
                            <p className="text-[11px] text-slate-500 truncate mt-0.5 leading-snug">
                              {lastMsg ? lastMsg.text : "Inquiry registered."}
                            </p>
                          </div>
                          {chat.unread && (
                            <span className="absolute right-4 bottom-4 w-2.5 h-2.5 bg-emerald-500 rounded-full animate-pulse" />
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* MIDDLE: Chat Screen feeds */}
                <div className="lg:col-span-2 flex flex-col h-full">
                  {activeChat ? (
                    <>
                      <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-emerald-500 text-white flex items-center justify-center font-bold text-sm">
                            {activeChat.name.charAt(0)}
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <h3 className="font-bold text-sm text-slate-900">
                                {activeChat.name}
                              </h3>
                              <span className="text-[9px] bg-emerald-100 text-emerald-800 font-extrabold px-1.5 py-0.5 rounded-full">
                                WhatsApp Live
                              </span>
                            </div>
                            <span className="text-xs text-slate-400 block mt-0.5">
                              Contact: {activeChat.phone}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-slate-50/20">
                        {activeChat.messages.map((msg, idx) => {
                          const isAgent = msg.sender === "agent";
                          return (
                            <div
                              key={idx}
                              className={`flex ${isAgent ? "justify-end" : "justify-start"}`}
                            >
                              <div
                                className={`max-w-[75%] rounded-2xl p-3.5 shadow-sm text-xs ${
                                  isAgent
                                    ? "bg-slate-900 text-white rounded-tr-none"
                                    : "bg-white text-slate-800 border border-slate-100 rounded-tl-none"
                                }`}
                              >
                                <p className="leading-relaxed">{msg.text}</p>
                                <span className="text-[9px] block text-right mt-1.5 text-slate-400 font-mono">
                                  {msg.time}{" "}
                                  {isAgent && (
                                    <CheckCheck className="w-3.5 h-3.5 text-emerald-400 inline ml-0.5" />
                                  )}
                                </span>
                              </div>
                            </div>
                          );
                        })}
                      </div>

                      {/* QUICK REPLIES Shortcode picker */}
                      <div className="px-4 py-2 border-t border-slate-50 flex items-center gap-1.5 bg-slate-50/40 overflow-x-auto">
                        <span className="text-[10px] font-bold text-slate-400 uppercase shrink-0">
                          Quick Reply:
                        </span>
                        {QUICK_REPLIES.map((reply, idx) => (
                          <button
                            key={idx}
                            onClick={() => setTypedMessage(reply)}
                            className="text-[11px] font-semibold text-slate-600 bg-white hover:bg-slate-50 border border-slate-100 px-3 py-1 rounded-full whitespace-nowrap transition-colors"
                          >
                            {reply.substring(0, 20)}...
                          </button>
                        ))}
                      </div>

                      <form
                        onSubmit={handleSendWhatsappMessage}
                        className="p-4 border-t border-slate-100 flex gap-2 items-center bg-white"
                      >
                        <input
                          type="text"
                          value={typedMessage}
                          onChange={(e) => setTypedMessage(e.target.value)}
                          placeholder="Type response message..."
                          className="flex-1 p-3 bg-slate-50 border border-slate-100 rounded-xl text-xs focus:outline-none"
                        />
                        <button
                          type="submit"
                          className="p-3 bg-slate-900 text-white rounded-xl"
                        >
                          <Send className="w-4.5 h-4.5" />
                        </button>
                      </form>
                    </>
                  ) : (
                    <div className="flex-1 flex flex-col items-center justify-center text-slate-400">
                      <MessageSquare className="w-12 h-12 text-slate-200" />
                      <p className="text-xs mt-2">
                        Choose an active client queue to start chat.
                      </p>
                    </div>
                  )}
                </div>

                {/* RIGHT: Conversational details cards */}
                <div className="lg:col-span-1 border-l border-slate-100 p-4 space-y-4">
                  {activeChat ? (
                    <div className="space-y-4 text-xs">
                      <div>
                        <span className="text-slate-400 font-bold block mb-1 uppercase text-[9px]">
                          Interest Product
                        </span>
                        <span className="text-slate-800 font-bold block bg-slate-50 p-2 rounded-lg border border-slate-100">
                          {activeChat.product}
                        </span>
                      </div>
                      <div>
                        <span className="text-slate-400 font-bold block mb-1 uppercase text-[9px]">
                          Budget
                        </span>
                        <strong className="text-slate-900 block text-sm font-mono">
                          ₹{activeChat.budget.toLocaleString("en-IN")}
                        </strong>
                      </div>
                      <div>
                        <span className="text-slate-400 font-bold block mb-1 uppercase text-[9px]">
                          Assign Special Desk
                        </span>
                        <select
                          value={activeChat.assignedTo}
                          onChange={(e) =>
                            assignChatEmployee(activeChat.id, e.target.value)
                          }
                          className="w-full bg-slate-50 border border-slate-100 rounded-lg p-2 font-semibold text-slate-700 text-xs focus:outline-none cursor-pointer"
                        >
                          {employees.map((emp) => (
                            <option key={emp.id} value={emp.name}>
                              {emp.name}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <span className="text-slate-400 font-bold block mb-1 uppercase text-[9px]">
                          Lead Priority
                        </span>
                        <div className="flex gap-2">
                          {["Hot", "Warm", "Cold"].map((p) => (
                            <button
                              key={p}
                              onClick={() =>
                                updateChatPriority(activeChat.id, p)
                              }
                              className={`flex-1 text-center py-1 rounded-md text-[10px] font-bold transition-all border ${
                                activeChat.priority === p
                                  ? "bg-slate-900 text-white border-slate-900"
                                  : "bg-slate-50 hover:bg-slate-100 text-slate-600 border-slate-100"
                              }`}
                            >
                              {p}
                            </button>
                          ))}
                        </div>
                      </div>

                      <button
                        onClick={() => convertChatToOrder(activeChat)}
                        className="w-full py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-lg mt-4"
                      >
                        Convert to Converted Order
                      </button>
                    </div>
                  ) : (
                    <p className="text-slate-400">No context available.</p>
                  )}
                </div>
              </div>
            </div>
          )}

          {activeTab === "leads" && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h1 className="text-2xl font-black text-slate-900 tracking-tight">
                    Lead Repository
                  </h1>
                  <p className="text-sm text-slate-500">
                    Search, filter, assign and edit incoming Nilkamal leads
                    instantly.
                  </p>
                </div>
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => {
                      setStatusFilter("All");
                      setPriorityFilter("All");
                      setSourceFilter("All");
                      setSearchQuery("");
                    }}
                    className="px-3.5 py-2 text-xs font-semibold border border-slate-200 bg-white hover:bg-slate-50 text-slate-600 rounded-xl flex items-center gap-1.5"
                  >
                    Clear Filters
                  </button>
                </div>
              </div>

              {/* Filter Row Controls */}
              <div className="bg-white border border-slate-100 p-4 rounded-2xl shadow-sm flex flex-col md:flex-row gap-3 items-center">
                <div className="relative flex-1 w-full">
                  <Search className="w-4.5 h-4.5 absolute left-3 top-3.5 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Search customer name, contact, product city..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 pr-4 py-2.5 text-xs w-full bg-slate-50 border border-slate-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:bg-white transition-all text-slate-700"
                  />
                </div>

                <div className="flex flex-wrap gap-2 w-full md:w-auto">
                  <div className="flex items-center gap-1 bg-slate-50 px-2 py-1.5 rounded-xl border border-slate-100 text-xs w-full sm:w-auto">
                    <span className="text-slate-400 font-medium pl-1 shrink-0">
                      Status:
                    </span>
                    <select
                      value={statusFilter}
                      onChange={(e) => setStatusFilter(e.target.value)}
                      className="bg-transparent font-semibold text-slate-700 focus:outline-none cursor-pointer text-xs"
                    >
                      <option value="All">All Statuses</option>
                      <option value="New">New</option>
                      <option value="Contacted">Contacted</option>
                      <option value="Interested">Interested</option>
                      <option value="Follow-up Pending">
                        Follow-up Pending
                      </option>
                      <option value="Negotiation">Negotiation</option>
                      <option value="Converted">Converted</option>
                      <option value="Lost">Lost</option>
                    </select>
                  </div>

                  <div className="flex items-center gap-1 bg-slate-50 px-2 py-1.5 rounded-xl border border-slate-100 text-xs w-full sm:w-auto">
                    <span className="text-slate-400 font-medium pl-1 shrink-0">
                      Priority:
                    </span>
                    <select
                      value={priorityFilter}
                      onChange={(e) => setPriorityFilter(e.target.value)}
                      className="bg-transparent font-semibold text-slate-700 focus:outline-none cursor-pointer text-xs"
                    >
                      <option value="All">All Priority</option>
                      <option value="Hot">Hot</option>
                      <option value="Warm">Warm</option>
                      <option value="Cold">Cold</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Leads Content Table Grid */}
              <div className="bg-white border border-slate-100 rounded-2xl shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-slate-50/75 border-b border-slate-100 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                        <th className="p-4 pl-6">Customer & Source</th>
                        <th className="p-4">Furniture Interest</th>
                        <th className="p-4">Assigned Desk</th>
                        <th className="p-4">Priority & Status</th>
                        <th className="p-4">Follow Up</th>
                        <th className="p-4 text-center pr-6">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50 text-xs text-slate-600">
                      {filteredLeads.map((lead) => (
                        <tr
                          key={lead.id}
                          className="hover:bg-slate-50/40 transition-colors"
                        >
                          <td className="p-4 pl-6">
                            <div className="flex items-center gap-3">
                              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-500/10 to-indigo-500/10 flex items-center justify-center text-blue-600 font-extrabold">
                                {lead.name.charAt(0)}
                              </div>
                              <div>
                                <button
                                  onClick={() => setSelectedLeadForDetail(lead)}
                                  className="font-bold text-slate-900 text-sm hover:underline hover:text-blue-600 text-left block"
                                >
                                  {lead.name}
                                </button>
                                <span className="text-xs text-slate-400 block mt-0.5">
                                  {lead.mobile}
                                </span>
                              </div>
                            </div>
                          </td>

                          <td className="p-4">
                            <span className="font-semibold text-slate-800 block">
                              {lead.product}
                            </span>
                            <span className="text-slate-400 text-[11px] block mt-0.5">
                              Budget: ₹{lead.budget.toLocaleString("en-IN")}
                            </span>
                          </td>

                          <td className="p-4">
                            <select
                              value={lead.assignedTo}
                              onChange={(e) =>
                                assignLeadEmployee(lead.id, e.target.value)
                              }
                              className="bg-slate-50 border border-slate-100 rounded-lg px-2 py-1 font-semibold text-slate-700 text-[11px]"
                            >
                              {employees.map((emp) => (
                                <option key={emp.id} value={emp.name}>
                                  {emp.name}
                                </option>
                              ))}
                            </select>
                          </td>

                          <td className="p-4 space-y-1">
                            <span
                              className={`inline-flex px-2 py-0.5 rounded-full text-[10px] font-bold ${
                                lead.priority === "Hot"
                                  ? "bg-rose-50 text-rose-600"
                                  : "bg-amber-50 text-amber-600"
                              }`}
                            >
                              {lead.priority}
                            </span>
                          </td>

                          <td className="p-4 font-mono font-semibold">
                            {lead.followUpDate}
                          </td>

                          <td className="p-4 text-center pr-6">
                            <div className="flex items-center justify-center gap-2">
                              <button
                                onClick={() =>
                                  triggerCommunication(lead.name, "WhatsApp")
                                }
                                className="p-1.5 hover:bg-emerald-50 text-emerald-600 rounded-lg"
                              >
                                <MessageCircle className="w-4.5 h-4.5" />
                              </button>
                              <button
                                onClick={() => setSelectedLeadForDetail(lead)}
                                className="p-1.5 hover:bg-slate-100 text-slate-500 rounded-lg"
                              >
                                <ChevronRight className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {activeTab === "employees" && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h1 className="text-2xl font-black text-slate-900 tracking-tight">
                    CRM Desk Executives
                  </h1>
                  <p className="text-sm text-slate-500">
                    Monitor sales performance targets and manage employee roles.
                  </p>
                </div>
                <button
                  onClick={() => setIsAddEmployeeOpen(true)}
                  className="px-4 py-2 text-xs font-bold bg-slate-950 text-white rounded-xl shadow"
                >
                  Add Desk Executive
                </button>
              </div>

              {/* Employee grid cards */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {employees.map((emp) => {
                  const percentage = Math.round(
                    (emp.currentSales / emp.target) * 100,
                  );
                  return (
                    <div
                      key={emp.id}
                      className="bg-white border border-slate-100 rounded-2xl p-5 shadow-sm space-y-4 hover:shadow-md cursor-pointer"
                      onClick={() => setSelectedEmployeeForDetail(emp)}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-gradient-to-tr from-blue-500 to-indigo-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                            {emp.avatar}
                          </div>
                          <div>
                            <h3 className="font-bold text-slate-900 text-sm">
                              {emp.name}
                            </h3>
                            <span className="text-[10px] bg-slate-100 text-slate-600 font-bold px-1.5 py-0.5 rounded mt-1 inline-block">
                              {emp.role}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-1 pt-2 border-t border-slate-50">
                        <div className="flex justify-between items-center text-[10px] font-bold text-slate-400">
                          <span>Progress</span>
                          <span className="text-slate-800 font-mono">
                            {percentage}%
                          </span>
                        </div>
                        <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                          <div
                            className="bg-indigo-600 h-full rounded-full"
                            style={{ width: `${Math.min(percentage, 100)}%` }}
                          />
                        </div>
                        <div className="flex justify-between text-[11px] text-slate-500 font-semibold mt-1 font-mono">
                          <span>
                            ₹{(emp.currentSales / 1000).toFixed(0)}k Done
                          </span>
                          <span>Target ₹{(emp.target / 1000).toFixed(0)}k</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {activeTab === "followups" && (
            <div className="space-y-6">
              <div>
                <h1 className="text-2xl font-black text-slate-900 tracking-tight">
                  Follow-Up Schedules
                </h1>
                <p className="text-sm text-slate-500">
                  Track pending calls and missed callbacks to maximize sales
                  conversions.
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="bg-white border border-slate-100 p-5 rounded-2xl shadow-sm space-y-4">
                  <div className="pb-3 border-b border-slate-50">
                    <h3 className="font-bold text-slate-900 text-sm">
                      Overdue Reminders
                    </h3>
                  </div>

                  <div className="space-y-3 max-h-[400px] overflow-y-auto">
                    {leads
                      .filter((l) => {
                        const todayStr = new Date().toISOString().split("T")[0];
                        return (
                          l.followUpDate &&
                          l.followUpDate < todayStr &&
                          l.status !== "Converted"
                        );
                      })
                      .map((lead) => (
                        <div
                          key={lead.id}
                          className="p-3 bg-rose-50/50 border border-rose-100 rounded-xl space-y-2 text-xs"
                        >
                          <div className="flex justify-between items-start">
                            <div>
                              <span className="font-bold text-slate-900 block">
                                {lead.name}
                              </span>
                              <span className="text-[10px] text-slate-500">
                                {lead.product}
                              </span>
                            </div>
                          </div>
                          <div className="flex gap-2 justify-end pt-1">
                            <button
                              onClick={() =>
                                triggerCommunication(lead.name, "WhatsApp")
                              }
                              className="p-1 px-2.5 bg-white border border-slate-100 hover:bg-emerald-50 text-emerald-600 rounded-lg text-[10px] font-bold"
                            >
                              WhatsApp
                            </button>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>

                <div className="bg-white border border-slate-100 p-5 rounded-2xl shadow-sm lg:col-span-2 space-y-4">
                  <div className="pb-3 border-b border-slate-50">
                    <h3 className="font-bold text-slate-900 text-sm">
                      Upcoming Calendared Leads
                    </h3>
                  </div>

                  <div className="space-y-3.5 text-xs">
                    {leads
                      .filter((l) => {
                        const todayStr = new Date().toISOString().split("T")[0];
                        return l.followUpDate && l.followUpDate >= todayStr;
                      })
                      .map((lead) => (
                        <div
                          key={lead.id}
                          className="flex items-center justify-between p-3 hover:bg-slate-50 border border-slate-100/50 rounded-xl"
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold font-mono">
                              {lead.followUpDate.slice(-2)}
                            </div>
                            <div>
                              <h4 className="font-bold text-slate-800">
                                {lead.name}
                              </h4>
                              <p className="text-[11px] text-slate-500">
                                {lead.product}
                              </p>
                            </div>
                          </div>

                          <div className="flex items-center gap-4">
                            <span className="text-xs font-semibold text-slate-700 font-mono">
                              {lead.followUpDate}
                            </span>
                            <button
                              onClick={() => setSelectedLeadForDetail(lead)}
                              className="p-1.5 hover:bg-slate-100 rounded-lg text-slate-400"
                            >
                              <ChevronRight className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "analytics" && (
            <div className="space-y-6">
              <div>
                <h1 className="text-2xl font-black text-slate-900 tracking-tight">
                  Analytics Hub
                </h1>
                <p className="text-sm text-slate-500">
                  Review employee performance ratios, conversion rates, and
                  revenue.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs">
                <div className="bg-white border border-slate-100 p-5 rounded-2xl shadow-sm space-y-4">
                  <h3 className="font-bold text-slate-900 text-sm">
                    Lead Conversion Funnel
                  </h3>
                  {[
                    {
                      step: "1. Raw Leads Captured",
                      count: stats.total,
                      pct: 100,
                      color: "bg-blue-600",
                    },
                    {
                      step: "2. Contacted / Interested",
                      count: leads.filter((l) =>
                        ["Contacted", "Interested", "Negotiation"].includes(
                          l.status,
                        ),
                      ).length,
                      pct: 80,
                      color: "bg-indigo-600",
                    },
                    {
                      step: "3. In Negotiation Process",
                      count: leads.filter((l) => l.status === "Negotiation")
                        .length,
                      pct: 45,
                      color: "bg-purple-600",
                    },
                    {
                      step: "4. Final Sales Converted",
                      count: stats.convertedLeads,
                      pct: 25,
                      color: "bg-emerald-600",
                    },
                  ].map((step, idx) => (
                    <div key={idx} className="space-y-1">
                      <div className="flex justify-between font-semibold text-slate-700">
                        <span>{step.step}</span>
                        <span>
                          {step.count} ({step.pct}%)
                        </span>
                      </div>
                      <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                        <div
                          className={`${step.color} h-full`}
                          style={{ width: `${step.pct}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>

                <div className="bg-white border border-slate-100 p-5 rounded-2xl shadow-sm space-y-4">
                  <h3 className="font-bold text-slate-900 text-sm">
                    Revenue Share by Source
                  </h3>
                  {[
                    {
                      label: "WhatsApp Campaigns",
                      revenue: "₹4,10,000",
                      pct: 41,
                    },
                    {
                      label: "Walk-in Showroom",
                      revenue: "₹2,40,000",
                      pct: 24,
                    },
                    { label: "Instagram Ads", revenue: "₹1,80,000", pct: 18 },
                    {
                      label: "Phone & B2B Inquiry",
                      revenue: "₹1,70,000",
                      pct: 17,
                    },
                  ].map((source, idx) => (
                    <div
                      key={idx}
                      className="flex justify-between items-center"
                    >
                      <div>
                        <span className="font-bold text-slate-800 block">
                          {source.label}
                        </span>
                        <span className="text-slate-400 text-[10px]">
                          {source.pct}% Contribution
                        </span>
                      </div>
                      <span className="font-extrabold text-slate-900 font-mono">
                        {source.revenue}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === "orders" && (
            <div className="space-y-6">
              <div>
                <h1 className="text-2xl font-black text-slate-900 tracking-tight">
                  Successfully Converted Sales
                </h1>
                <p className="text-sm text-slate-500">
                  List of converted leads that resulted in premium Nilkamal
                  orders.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-5 text-xs">
                {leads
                  .filter((l) => l.status === "Converted")
                  .map((lead) => (
                    <div
                      key={lead.id}
                      className="bg-white border border-slate-100 rounded-2xl p-5 shadow-sm space-y-4 relative overflow-hidden"
                    >
                      <span className="absolute top-0 right-0 bg-emerald-500 text-white text-[9px] font-bold px-2 py-1 rounded-bl-lg">
                        Paid
                      </span>
                      <div>
                        <span className="text-slate-400 font-bold block text-[9px]">
                          Order Reference ID
                        </span>
                        <strong className="text-slate-900 text-sm mt-0.5 block">
                          {lead.name}
                        </strong>
                        <p className="text-slate-500 mt-1">{lead.product}</p>
                      </div>

                      <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-50 font-mono font-bold">
                        <div>
                          <span className="text-slate-400 text-[9px] block">
                            Order Value
                          </span>
                          <span>₹{lead.budget.toLocaleString("en-IN")}</span>
                        </div>
                        <div>
                          <span className="text-slate-400 text-[9px] block">
                            Executive Desk
                          </span>
                          <span>{lead.assignedTo}</span>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          )}

          {activeTab === "settings" && (
            <div className="bg-white border border-slate-100 p-6 rounded-2xl shadow-sm space-y-6 max-w-4xl text-xs">
              <div>
                <h2 className="text-xl font-black text-slate-900 tracking-tight">
                  Nilkamal CRM Config
                </h2>
                <p className="text-slate-400">
                  Configure parameters, role permissions, and customized lead
                  source hooks.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="font-bold text-slate-800 text-sm">
                    General Details
                  </h3>
                  <div className="space-y-2">
                    <label className="text-slate-400 font-semibold block">
                      Store Location Branch ID
                    </label>
                    <input
                      type="text"
                      className="w-full p-2.5 bg-slate-50 border border-slate-100 rounded-lg text-slate-700 font-semibold"
                      value="NK-WEST-MUM-01"
                      readOnly
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="font-bold text-slate-800 text-sm">
                    Connected API Gateway Key
                  </h3>
                  <div className="space-y-2">
                    <label className="text-slate-400 font-semibold block">
                      Meta Sandbox API Access Token
                    </label>
                    <input
                      type="password"
                      value="••••••••••••••••••••••••••••••••"
                      className="w-full p-2.5 bg-slate-50 border border-slate-100 rounded-lg text-slate-400"
                      readOnly
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* Slide drawer lead detail views */}
      {selectedLeadForDetail && (
        <div className="fixed inset-0 bg-slate-950/20 backdrop-blur-sm z-50 flex justify-end">
          <div className="w-full max-w-lg bg-white h-full shadow-2xl p-6 overflow-y-auto flex flex-col justify-between animate-slide-in-right">
            <div className="space-y-6">
              {/* Header */}
              <div className="flex justify-between items-start pb-4 border-b border-slate-100">
                <div>
                  <span className="text-[10px] font-bold text-blue-600 uppercase tracking-wide">
                    LEAD DETAILS MODULE
                  </span>
                  <h3 className="text-xl font-black text-slate-950 tracking-tight mt-1">
                    {selectedLeadForDetail.name}
                  </h3>
                  <span className="text-xs text-slate-400">
                    ID: {selectedLeadForDetail.id}
                  </span>
                </div>
                <button
                  onClick={() => setSelectedLeadForDetail(null)}
                  className="p-1.5 hover:bg-slate-100 rounded-lg text-slate-400 hover:text-slate-600 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Status Chips Selector */}
              <div className="space-y-1.5">
                <span className="text-[10px] font-bold text-slate-400 uppercase">
                  Change Current Lead Status
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {[
                    "New",
                    "Contacted",
                    "Interested",
                    "Follow-up Pending",
                    "Negotiation",
                    "Converted",
                    "Lost",
                  ].map((statusVal) => {
                    const isActive = selectedLeadForDetail.status === statusVal;
                    return (
                      <button
                        key={statusVal}
                        onClick={() => {
                          updateLeadStatus(selectedLeadForDetail.id, statusVal);
                          setSelectedLeadForDetail((prev) => ({
                            ...prev,
                            status: statusVal,
                          }));
                        }}
                        className={`px-3 py-1.5 rounded-lg text-[11px] font-bold transition-all ${
                          isActive
                            ? "bg-blue-600 text-white shadow-sm"
                            : "bg-slate-50 hover:bg-slate-100 text-slate-600"
                        }`}
                      >
                        {statusVal}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Lead Field Values */}
              <div className="grid grid-cols-2 gap-4 bg-slate-50/50 p-4 rounded-2xl border border-slate-100 text-xs">
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase font-bold">
                    Contact Mobile
                  </span>
                  <span className="text-slate-800 font-bold block mt-0.5">
                    {selectedLeadForDetail.mobile}
                  </span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase font-bold">
                    WhatsApp Channel
                  </span>
                  <span className="text-slate-800 font-bold block mt-0.5">
                    {selectedLeadForDetail.whatsapp}
                  </span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase font-bold">
                    Interested Furniture
                  </span>
                  <span className="text-slate-800 font-bold block mt-0.5">
                    {selectedLeadForDetail.product}
                  </span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase font-bold">
                    Product Budget
                  </span>
                  <span className="text-slate-900 font-black block mt-0.5">
                    ₹{selectedLeadForDetail.budget.toLocaleString("en-IN")}
                  </span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase font-bold">
                    Location City
                  </span>
                  <span className="text-slate-800 font-semibold block mt-0.5">
                    {selectedLeadForDetail.city}
                  </span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase font-bold">
                    Lead Source Code
                  </span>
                  <span className="text-slate-800 font-semibold block mt-0.5">
                    {selectedLeadForDetail.source}
                  </span>
                </div>
              </div>

              {/* Client Note edit text */}
              <div className="space-y-2">
                <span className="text-[10px] font-bold text-slate-400 uppercase">
                  Interaction Note & Requirements
                </span>
                <textarea
                  rows={2}
                  className="w-full bg-slate-50 border border-slate-100 p-2.5 rounded-xl text-xs text-slate-700 focus:outline-none focus:bg-white transition-all"
                  value={selectedLeadForDetail.notes}
                  onChange={(e) => {
                    const txt = e.target.value;
                    setLeads((prev) =>
                      prev.map((l) =>
                        l.id === selectedLeadForDetail.id
                          ? { ...l, notes: txt }
                          : l,
                      ),
                    );
                    setSelectedLeadForDetail((prev) => ({
                      ...prev,
                      notes: txt,
                    }));
                  }}
                />
              </div>

              {/* Reschedule Calendar direct inside drawer */}
              <div className="space-y-2 bg-blue-50/20 border border-blue-100/40 p-4 rounded-2xl">
                <span className="text-[10px] font-bold text-blue-600 uppercase block">
                  Set Callback Calendar Deadline
                </span>
                <div className="flex gap-2">
                  <input
                    type="date"
                    value={selectedLeadForDetail.followUpDate || ""}
                    onChange={(e) => {
                      const dt = e.target.value;
                      setLeads((prev) =>
                        prev.map((l) =>
                          l.id === selectedLeadForDetail.id
                            ? { ...l, followUpDate: dt }
                            : l,
                        ),
                      );
                      setSelectedLeadForDetail((prev) => ({
                        ...prev,
                        followUpDate: dt,
                      }));
                      showToast(`Follow-up call updated to ${dt}`, "success");
                    }}
                    className="flex-1 bg-white border border-slate-100 rounded-lg p-2 text-xs font-semibold text-slate-700 focus:outline-none"
                  />
                </div>
              </div>

              {/* History Timeline */}
              <div className="space-y-3">
                <span className="text-[10px] font-bold text-slate-400 uppercase block">
                  Interaction History Log
                </span>
                <div className="space-y-3 pl-1 max-h-[160px] overflow-y-auto">
                  {selectedLeadForDetail.timeline.map((item, idx) => (
                    <div key={idx} className="flex gap-2.5 text-xs">
                      <div className="flex flex-col items-center">
                        <div className="w-2 h-2 bg-blue-500 rounded-full" />
                        <div className="w-[1px] flex-1 bg-slate-100 my-0.5" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <strong className="text-slate-800 text-[11px]">
                            {item.user}
                          </strong>
                          <span className="text-[9px] text-slate-400">
                            {item.date}
                          </span>
                        </div>
                        <p className="text-slate-500 text-[11px] mt-0.5">
                          {item.text}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Quick outbound channel message buttons */}
            <div className="pt-4 border-t border-slate-100 space-y-3">
              <span className="text-[10px] font-bold text-slate-400 uppercase block">
                Instant Outbound Desk Contact
              </span>
              <div className="grid grid-cols-3 gap-2">
                <button
                  onClick={() => {
                    // Navigate directly to WhatsApp Automation Tab
                    const matchingChat = whatsappChats.find(
                      (chat) => chat.phone === selectedLeadForDetail.whatsapp,
                    );
                    if (matchingChat) {
                      setActiveChatId(matchingChat.id);
                    } else {
                      // Dynamically create a chat thread
                      const customId = `WA-${Date.now()}`;
                      const tempChat = {
                        id: customId,
                        name: selectedLeadForDetail.name,
                        phone: selectedLeadForDetail.whatsapp,
                        unread: false,
                        typing: false,
                        assignedTo: selectedLeadForDetail.assignedTo,
                        product: selectedLeadForDetail.product,
                        budget: selectedLeadForDetail.budget,
                        priority: selectedLeadForDetail.priority,
                        status: selectedLeadForDetail.status,
                        tags: ["Direct-Message Initiative"],
                        messages: [
                          {
                            sender: "agent",
                            text: "Hello! Initiating chat from sales desk CRM regarding your furniture query.",
                            time: "Now",
                          },
                        ],
                      };
                      setWhatsappChats((prev) => [tempChat, ...prev]);
                      setActiveChatId(customId);
                    }
                    setSelectedLeadForDetail(null);
                    setActiveTab("whatsapp");
                    showToast(
                      "Redirected to Live WhatsApp Automation workspace!",
                      "info",
                    );
                  }}
                  className="p-2.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-600 rounded-xl font-bold text-xs flex flex-col items-center justify-center gap-1 transition-colors"
                >
                  <MessageCircle className="w-5 h-5" />
                  Live Chat
                </button>
                <button
                  onClick={() =>
                    triggerCommunication(
                      selectedLeadForDetail.name,
                      "Call Dialler",
                    )
                  }
                  className="p-2.5 bg-blue-50 hover:bg-blue-100 text-blue-600 rounded-xl font-bold text-xs flex flex-col items-center justify-center gap-1 transition-colors"
                >
                  <Phone className="w-5 h-5" />
                  Call
                </button>
                <button
                  onClick={() =>
                    triggerCommunication(
                      selectedLeadForDetail.name,
                      "Sms Portal",
                    )
                  }
                  className="p-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-bold text-xs flex flex-col items-center justify-center gap-1 transition-colors"
                >
                  <Smartphone className="w-5 h-5" />
                  SMS
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modals placeholders */}
      {isAddLeadOpen && (
        <div className="fixed inset-0 bg-slate-950/20 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-lg rounded-3xl p-6 shadow-2xl space-y-5 animate-modal-scale max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center pb-3 border-b border-slate-100">
              <h3 className="text-base font-extrabold text-slate-900">
                Add Nilkamal CRM Lead
              </h3>
              <button
                onClick={() => setIsAddLeadOpen(false)}
                className="p-1 hover:bg-slate-100 rounded-lg text-slate-400"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form
              onSubmit={handleCreateLead}
              className="space-y-4 text-xs text-slate-600"
            >
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-slate-500 font-semibold">
                    Customer Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={newLeadForm.name}
                    onChange={(e) =>
                      setNewLeadForm({ ...newLeadForm, name: e.target.value })
                    }
                    placeholder="e.g. Anand Gupte"
                    className="w-full p-2 bg-slate-50 border border-slate-100 rounded-lg text-slate-800 focus:outline-none"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-slate-500 font-semibold">
                    Mobile Number *
                  </label>
                  <input
                    type="text"
                    required
                    value={newLeadForm.mobile}
                    onChange={(e) =>
                      setNewLeadForm({ ...newLeadForm, mobile: e.target.value })
                    }
                    placeholder="e.g. +91 91122 33445"
                    className="w-full p-2 bg-slate-50 border border-slate-100 rounded-lg text-slate-800 focus:outline-none"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-slate-500 font-semibold">
                    WhatsApp Number
                  </label>
                  <input
                    type="text"
                    value={newLeadForm.whatsapp}
                    onChange={(e) =>
                      setNewLeadForm({
                        ...newLeadForm,
                        whatsapp: e.target.value,
                      })
                    }
                    placeholder="Same as mobile"
                    className="w-full p-2 bg-slate-50 border border-slate-100 rounded-lg text-slate-800 focus:outline-none"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-slate-500 font-semibold">
                    Interested Product
                  </label>
                  <input
                    type="text"
                    value={newLeadForm.product}
                    onChange={(e) =>
                      setNewLeadForm({
                        ...newLeadForm,
                        product: e.target.value,
                      })
                    }
                    placeholder="e.g. Nilkamal Dining Table"
                    className="w-full p-2 bg-slate-50 border border-slate-100 rounded-lg text-slate-800"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-slate-500 font-semibold">
                    Budget Range (INR)
                  </label>
                  <input
                    type="number"
                    value={newLeadForm.budget}
                    onChange={(e) =>
                      setNewLeadForm({ ...newLeadForm, budget: e.target.value })
                    }
                    placeholder="e.g. 45000"
                    className="w-full p-2 bg-slate-50 border border-slate-100 rounded-lg text-slate-800"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-slate-500 font-semibold">
                    Lead Channel Source
                  </label>
                  <select
                    value={newLeadForm.source}
                    onChange={(e) =>
                      setNewLeadForm({ ...newLeadForm, source: e.target.value })
                    }
                    className="w-full p-2 bg-slate-50 border border-slate-100 rounded-lg text-slate-800"
                  >
                    <option value="Phone Calls">Phone Calls</option>
                    <option value="WhatsApp">WhatsApp</option>
                    <option value="Instagram">Instagram</option>
                    <option value="Facebook">Facebook</option>
                    <option value="Website Inquiry">Website Inquiry</option>
                    <option value="Walk-in Customers">Walk-in Customers</option>
                    <option value="SMS">SMS</option>
                    <option value="Referral Leads">Referral Leads</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="text-slate-500 font-semibold">
                    Assigned Sales Executive
                  </label>
                  <select
                    value={newLeadForm.assignedTo}
                    onChange={(e) =>
                      setNewLeadForm({
                        ...newLeadForm,
                        assignedTo: e.target.value,
                      })
                    }
                    className="w-full p-2 bg-slate-50 border border-slate-100 rounded-lg text-slate-800"
                  >
                    {employees.map((emp) => (
                      <option key={emp.id} value={emp.name}>
                        {emp.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="text-slate-500 font-semibold">
                    Follow-Up Date
                  </label>
                  <input
                    type="date"
                    value={newLeadForm.followUpDate}
                    onChange={(e) =>
                      setNewLeadForm({
                        ...newLeadForm,
                        followUpDate: e.target.value,
                      })
                    }
                    className="w-full p-2 bg-slate-50 border border-slate-100 rounded-lg text-slate-800"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-slate-500 font-semibold">
                  Client Inquiry Note
                </label>
                <textarea
                  rows={2}
                  value={newLeadForm.notes}
                  onChange={(e) =>
                    setNewLeadForm({ ...newLeadForm, notes: e.target.value })
                  }
                  placeholder="Additional customer details, home layout inspect requests..."
                  className="w-full p-2.5 bg-slate-50 border border-slate-100 rounded-lg text-slate-800 focus:outline-none"
                />
              </div>

              <div className="pt-4 border-t border-slate-100 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsAddLeadOpen(false)}
                  className="px-4 py-2 bg-slate-50 hover:bg-slate-100 rounded-lg text-slate-600 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold rounded-lg shadow-md"
                >
                  Create Lead
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {isAddEmployeeOpen && (
        <div className="fixed inset-0 bg-slate-950/20 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-md rounded-3xl p-6 shadow-2xl space-y-4 animate-modal-scale text-xs text-slate-600">
            <div className="flex justify-between items-center pb-3 border-b border-slate-100">
              <h3 className="text-base font-extrabold text-slate-900">
                Add Sales Executive
              </h3>
              <button
                onClick={() => setIsAddEmployeeOpen(false)}
                className="p-1 hover:bg-slate-100 rounded-lg text-slate-400"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3.5">
              <div className="space-y-1">
                <label className="text-slate-400 font-semibold">
                  Full Name
                </label>
                <input
                  id="newEmpName"
                  type="text"
                  placeholder="e.g. Suresh Kumar"
                  className="w-full p-2.5 bg-slate-50 border border-slate-100 rounded-lg"
                />
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 flex justify-end gap-2 text-xs">
              <button
                onClick={() => setIsAddEmployeeOpen(false)}
                className="px-4 py-2 bg-slate-100 text-slate-600 rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  const name = document.getElementById("newEmpName")?.value;
                  if (!name) return;
                  const newEmp = {
                    id: `EMP-0${employees.length + 1}`,
                    name,
                    role: "Sales Executive",
                    activeLeads: 0,
                    convertedLeads: 0,
                    target: 400000,
                    currentSales: 0,
                    status: "Active",
                    avatar: "SK",
                  };
                  setEmployees([...employees, newEmp]);
                  setIsAddEmployeeOpen(false);
                  showToast(`${name} added as Executive!`, "success");
                }}
                className="px-4 py-2 bg-slate-900 text-white font-bold rounded-lg"
              >
                Add Member
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
