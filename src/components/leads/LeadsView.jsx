"use client";

import { useState } from "react";
import { Plus, PhoneCall, Mail, MessageSquare, UserCheck } from "lucide-react";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { LeadStatusBadge } from "@/components/ui/StatusBadge";
import Table from "@/components/ui/Table";
import EmptyState from "@/components/ui/EmptyState";
import Modal from "@/components/ui/Modal";
import LeadFilters from "@/components/ui/LeadFilters";
import { COURSES, LEAD_STATUSES, MOCK_STAFF } from "@/constants";
import { useAuth } from "@/context/AuthContext";
import { useLeads } from "@/context/LeadContext";

export default function LeadsView({
  leads,
  setLeads,
  showToast,
  title = "Lead Management",
  showStaffFilter = true,
  showAssign = true,
  showAddLead = true,
  showFilters = true,
}) {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [staffFilter, setStaffFilter] = useState("");
  const [sourceFilter, setSourceFilter] = useState("");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isAssignModalOpen, setIsAssignModalOpen] = useState(false);
  const [isFollowUpModalOpen, setIsFollowUpModalOpen] = useState(false);
  const [selectedLead, setSelectedLead] = useState(null);
  const [followUpNote, setFollowUpNote] = useState("");
  const [selectedStaff, setSelectedStaff] = useState("");

  const { user } = useAuth();
  const { assignLead, addFollowUp, followUps } = useLeads();

  const filteredLeads = leads.filter((l) => {
    const matchesSearch =
      !searchTerm ||
      l.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      l.course.toLowerCase().includes(searchTerm.toLowerCase()) ||
      l.phone.includes(searchTerm);
    const matchesStatus = !statusFilter || l.status === statusFilter;
    const matchesStaff =
      !staffFilter ||
      staffFilter === "unassigned"
        ? !l.assignedTo
        : l.assignedTo === staffFilter;
    const matchesSource = !sourceFilter || l.source === sourceFilter;
    const matchesDateFrom = !dateFrom || l.date >= dateFrom;
    const matchesDateTo = !dateTo || l.date <= dateTo;
    return matchesSearch && matchesStatus && matchesStaff && matchesSource && matchesDateFrom && matchesDateTo;
  });

  const handleStatusChange = (leadId, newStatus) => {
    setLeads(
      leads.map((l) => (l.id === leadId ? { ...l, status: newStatus, updatedAt: new Date().toISOString().split("T")[0] } : l))
    );
    showToast("Status Updated", `Lead status changed to ${newStatus}`, "success");
  };

  const handleAddLead = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const newLead = {
      id: Date.now(),
      name: formData.get("name"),
      phone: formData.get("phone"),
      email: formData.get("email") || "",
      course: formData.get("course"),
      source: formData.get("source") || "Website",
      status: "New",
      date: new Date().toISOString().split("T")[0],
      updatedAt: new Date().toISOString().split("T")[0],
      product: formData.get("product") || "academy",
    };
    setLeads([newLead, ...leads]);
    setIsAddModalOpen(false);
    showToast("Success", "New lead added successfully!");
  };

  const handleAssign = () => {
    if (!selectedLead || !selectedStaff) return;
    const staffMember = MOCK_STAFF.find((s) => String(s.id) === selectedStaff);
    assignLead(selectedLead.id, selectedStaff, staffMember?.name || "Staff");
    setLeads(
      leads.map((l) =>
        l.id === selectedLead.id
          ? { ...l, assignedTo: selectedStaff, assignedToName: staffMember?.name }
          : l
      )
    );
    setIsAssignModalOpen(false);
    setSelectedLead(null);
    setSelectedStaff("");
    showToast("Lead Assigned", `Lead assigned to ${staffMember?.name}`, "success");
  };

  const handleFollowUp = () => {
    if (!selectedLead || !followUpNote) return;
    addFollowUp(selectedLead.id, followUpNote, user?.name || "Staff");
    setLeads(
      leads.map((l) =>
        l.id === selectedLead.id
          ? { ...l, status: "Follow-up", updatedAt: new Date().toISOString().split("T")[0] }
          : l
      )
    );
    setIsFollowUpModalOpen(false);
    setSelectedLead(null);
    setFollowUpNote("");
    showToast("Follow-up Added", "Follow-up note recorded successfully.", "success");
  };

  const getLeadFollowUps = (leadId) => {
    return followUps.filter((f) => f.leadId === leadId);
  };

  const headers = [
    { label: "Student" },
    { label: "Contact" },
    { label: "Course" },
    { label: "Status" },
    { label: "Assigned To" },
    { label: "Date" },
    { label: "Actions", align: "right" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">{title}</h2>
          <p className="text-slate-500 text-sm">
            Track and manage student inquiries. ({filteredLeads.length} leads)
          </p>
        </div>
        {showAddLead && (
          <Button onClick={() => setIsAddModalOpen(true)}>
            <Plus size={18} /> Add New Lead
          </Button>
        )}
      </div>

      {showFilters && (
        <Card className="p-4">
          <div className="flex flex-wrap items-center gap-3">
            <div className="relative w-full sm:w-48">
              <input
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-3 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm"
            >
              <option value="">All Statuses</option>
              {LEAD_STATUSES.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
            {showStaffFilter && (
              <select
                value={staffFilter}
                onChange={(e) => setStaffFilter(e.target.value)}
                className="px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm"
              >
                <option value="">All Staff</option>
                <option value="unassigned">Unassigned</option>
                {MOCK_STAFF.map((s) => (
                  <option key={s.id} value={String(s.id)}>{s.name}</option>
                ))}
              </select>
            )}
            <input
              type="date"
              value={dateFrom}
              onChange={(e) => setDateFrom(e.target.value)}
              className="px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm"
              title="From date"
            />
            <input
              type="date"
              value={dateTo}
              onChange={(e) => setDateTo(e.target.value)}
              className="px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm"
              title="To date"
            />
            {(searchTerm || statusFilter || staffFilter || dateFrom || dateTo) && (
              <button
                onClick={() => {
                  setSearchTerm("");
                  setStatusFilter("");
                  setStaffFilter("");
                  setDateFrom("");
                  setDateTo("");
                }}
                className="text-sm text-slate-500 hover:text-slate-700"
              >
                Clear
              </button>
            )}
          </div>
        </Card>
      )}

      <Card className="overflow-hidden">
        <Table headers={headers}>
          {filteredLeads.length === 0 ? (
            <EmptyState message="No leads found matching your filters." />
          ) : (
            filteredLeads.map((lead) => {
              const leadFollowUps = getLeadFollowUps(lead.id);
              return (
                <tr key={lead.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-6 py-4">
                    <p className="font-medium text-slate-900">{lead.name}</p>
                    {lead.email && (
                      <p className="text-xs text-slate-400">{lead.email}</p>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <PhoneCall size={14} className="text-slate-400" />
                      <span>{lead.phone}</span>
                    </div>
                    {lead.source && (
                      <p className="text-xs text-slate-400 mt-0.5">{lead.source}</p>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <p>{lead.course}</p>
                    {lead.product && (
                      <span className="text-xs text-slate-400 capitalize">{lead.product}</span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <select
                      value={lead.status}
                      onChange={(e) => handleStatusChange(lead.id, e.target.value)}
                      className="text-sm bg-white border border-slate-200 rounded-md px-2 py-1 focus:outline-none focus:border-blue-500"
                    >
                      {LEAD_STATUSES.map((s) => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                    {lead.followUpDate && (
                      <p className="text-xs text-amber-600 mt-1">
                        Follow-up: {lead.followUpDate}
                      </p>
                    )}
                    {leadFollowUps.length > 0 && (
                      <p className="text-xs text-blue-600 mt-0.5">
                        {leadFollowUps.length} follow-up{leadFollowUps.length > 1 ? "s" : ""}
                      </p>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm">
                      {lead.assignedToName || (
                        <span className="text-slate-400 italic">Unassigned</span>
                      )}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-500">
                    {lead.date}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      {showAssign && !lead.assignedTo && user?.role !== "fee_manager" && (
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => {
                            setSelectedLead(lead);
                            setIsAssignModalOpen(true);
                          }}
                        >
                          <UserCheck size={14} />
                        </Button>
                      )}
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => {
                          setSelectedLead(lead);
                          setFollowUpNote("");
                          setIsFollowUpModalOpen(true);
                        }}
                      >
                        <MessageSquare size={14} />
                      </Button>
                    </div>
                  </td>
                </tr>
              );
            })
          )}
        </Table>
      </Card>

      {/* Add Lead Modal */}
      <Modal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} title="Add New Lead">
        <form onSubmit={handleAddLead} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Student Name</label>
            <input required name="name" type="text" className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="e.g. John Doe" />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Phone Number</label>
            <input required name="phone" type="tel" className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="+91 XXXXXXXXXX" />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
            <input name="email" type="email" className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="student@email.com" />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Target Course/Exam</label>
            <select name="course" className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
              {COURSES.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Lead Source</label>
            <select name="source" className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option value="Website">Website</option>
              <option value="Referral">Referral</option>
              <option value="Social Media">Social Media</option>
              <option value="Walk-in">Walk-in</option>
              <option value="Phone Inquiry">Phone Inquiry</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div className="pt-4 flex gap-3 justify-end">
            <Button type="button" variant="secondary" onClick={() => setIsAddModalOpen(false)}>Cancel</Button>
            <Button type="submit">Save Lead</Button>
          </div>
        </form>
      </Modal>

      {/* Assign Lead Modal */}
      <Modal isOpen={isAssignModalOpen} onClose={() => { setIsAssignModalOpen(false); setSelectedLead(null); }} title="Assign Lead">
        <div className="p-6 space-y-4">
          <p className="text-sm text-slate-600">
            Assign <strong>{selectedLead?.name}</strong> to:
          </p>
          <select
            value={selectedStaff}
            onChange={(e) => setSelectedStaff(e.target.value)}
            className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select staff member...</option>
            {MOCK_STAFF.map((s) => (
              <option key={s.id} value={String(s.id)}>{s.name}</option>
            ))}
          </select>
          <div className="pt-4 flex gap-3 justify-end">
            <Button type="button" variant="secondary" onClick={() => { setIsAssignModalOpen(false); setSelectedLead(null); }}>Cancel</Button>
            <Button onClick={handleAssign} disabled={!selectedStaff}>Assign</Button>
          </div>
        </div>
      </Modal>

      {/* Follow-up Modal */}
      <Modal isOpen={isFollowUpModalOpen} onClose={() => { setIsFollowUpModalOpen(false); setSelectedLead(null); }} title="Add Follow-up">
        <div className="p-6 space-y-4">
          <p className="text-sm text-slate-600">
            Add follow-up note for <strong>{selectedLead?.name}</strong>:
          </p>
          <textarea
            value={followUpNote}
            onChange={(e) => setFollowUpNote(e.target.value)}
            className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[100px]"
            placeholder="Enter follow-up details..."
          />
          {selectedLead && getLeadFollowUps(selectedLead.id).length > 0 && (
            <div>
              <p className="text-sm font-medium text-slate-700 mb-2">Previous Follow-ups:</p>
              <div className="space-y-2 max-h-32 overflow-y-auto">
                {getLeadFollowUps(selectedLead.id).map((f) => (
                  <div key={f.id} className="p-2 bg-slate-50 rounded text-xs">
                    <p className="text-slate-600">{f.note}</p>
                    <p className="text-slate-400 mt-1">{f.date} by {f.createdBy}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
          <div className="pt-4 flex gap-3 justify-end">
            <Button type="button" variant="secondary" onClick={() => { setIsFollowUpModalOpen(false); setSelectedLead(null); }}>Cancel</Button>
            <Button onClick={handleFollowUp} disabled={!followUpNote}>Save Follow-up</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
