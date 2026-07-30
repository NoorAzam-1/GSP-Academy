"use client";

import { useState } from "react";
import { UserCog, Shield, Users, X, Check, Plus, Mail, Key } from "lucide-react";
import AppLayout from "@/components/layout/AppLayout";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Modal from "@/components/ui/Modal";
import { useLeads } from "@/context/LeadContext";
import { MOCK_STAFF, STAFF_TYPES } from "@/constants";

export default function StaffManagementPage() {
  const { leads, assignLead, showToast } = useLeads();
  const [staffList, setStaffList] = useState(MOCK_STAFF);
  const [assigningStaff, setAssigningStaff] = useState(null);
  const [selectedLeads, setSelectedLeads] = useState([]);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newStaff, setNewStaff] = useState({ name: "", email: "", password: "", staffType: "lead_manager", status: "Active" });

  const getStaffStats = (staffId) => {
    const sid = String(staffId);
    const assigned = leads.filter((l) => l.assignedTo === sid);
    const academy = assigned.filter((l) => l.product === "academy" || !l.product);
    const entrance = assigned.filter((l) => l.product === "entrance");
    return { total: assigned.length, academy: academy.length, entrance: entrance.length };
  };

  const unassignedLeads = leads.filter((l) => !l.assignedTo);

  const handleAssignLeads = () => {
    if (!assigningStaff || selectedLeads.length === 0) return;
    const staffMember = MOCK_STAFF.find((s) => s.id === assigningStaff);
    selectedLeads.forEach((leadId) => {
      assignLead(leadId, String(assigningStaff), staffMember?.name);
    });
    showToast(
      "Leads Assigned",
      `${selectedLeads.length} leads assigned to ${staffMember?.name}`,
      "success"
    );
    setAssigningStaff(null);
    setSelectedLeads([]);
  };

  const handleCreateStaff = () => {
    if (!newStaff.name || !newStaff.email || !newStaff.password) return;
    const id = staffList.length + 1;
    const member = { ...newStaff, id, role: newStaff.staffType, assignedLeads: 0, assignedAcademyLeads: 0, assignedEntranceLeads: 0 };
    setStaffList((prev) => [...prev, member]);
    showToast("Staff Created", `${newStaff.name} added as ${newStaff.staffType.replace("_", " ")}`, "success");
    setShowCreateModal(false);
    setNewStaff({ name: "", email: "", password: "", staffType: "lead_manager", status: "Active" });
  };

  return (
    <AppLayout title="Staff Management">
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h2 className="text-2xl font-bold text-slate-900">Staff Management</h2>
            <p className="text-slate-500 text-sm">
              Manage your team members and their assigned leads.
            </p>
          </div>
          <Button onClick={() => setShowCreateModal(true)}>
            <Plus size={16} /> Add Staff Member
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="p-4 bg-blue-50/50 border-blue-100">
            <p className="text-sm font-medium text-blue-600 mb-1">Total Staff</p>
            <h3 className="text-xl font-bold text-slate-900">{staffList.length}</h3>
          </Card>
          <Card className="p-4 bg-emerald-50/50 border-emerald-100">
            <p className="text-sm font-medium text-emerald-600 mb-1">Active Now</p>
            <h3 className="text-xl font-bold text-slate-900">{staffList.filter((s) => s.status === "Active").length}</h3>
          </Card>
          <Card className="p-4 bg-amber-50/50 border-amber-100">
            <p className="text-sm font-medium text-amber-600 mb-1">Total Assigned Leads</p>
            <h3 className="text-xl font-bold text-slate-900">
              {leads.filter((l) => l.assignedTo).length}
            </h3>
          </Card>
          <Card className="p-4 bg-rose-50/50 border-rose-100">
            <p className="text-sm font-medium text-rose-600 mb-1">Unassigned Leads</p>
            <h3 className="text-xl font-bold text-slate-900">{unassignedLeads.length}</h3>
          </Card>
        </div>

        <Card className="overflow-hidden">
          <div className="p-4 border-b border-slate-100">
            <h3 className="font-bold text-slate-900 flex items-center gap-2">
              <Shield size={18} className="text-blue-500" />
              Staff Members
            </h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-600">
              <thead className="bg-slate-50 text-slate-500 font-medium border-b border-slate-100">
                <tr>
                  <th className="px-6 py-4">Name</th>
                  <th className="px-6 py-4">Email</th>
                  <th className="px-6 py-4">Role</th>
                  <th className="px-6 py-4">Academy Leads</th>
                  <th className="px-6 py-4">Entrance Leads</th>
                  <th className="px-6 py-4">Total Assigned</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {staffList.map((staff) => {
                  const stats = getStaffStats(staff.id);
                  const typeLabel = STAFF_TYPES.find((t) => t.value === staff.staffType)?.label || "Staff";
                  return (
                    <tr key={staff.id} className="hover:bg-slate-50/50 transition-colors">
                      <td className="px-6 py-4 font-medium text-slate-900 flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center text-xs font-bold text-slate-600">
                          {staff.name.split(" ").map((n) => n[0]).join("")}
                        </div>
                        {staff.name}
                      </td>
                      <td className="px-6 py-4">{staff.email}</td>
                      <td className="px-6 py-4">
                        <span className="px-2.5 py-1 rounded-full text-xs font-medium text-purple-800">
                          {typeLabel}
                        </span>
                      </td>
                      <td className="px-6 py-4">{stats.academy}</td>
                      <td className="px-6 py-4">{stats.entrance}</td>
                      <td className="px-6 py-4 font-medium">{stats.total}</td>
                      <td className="px-6 py-4">
                        <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                          staff.status === "Active" ? "bg-emerald-100 text-emerald-800" : "bg-slate-100 text-slate-500"
                        }`}>
                          {staff.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <Button
                          size="sm"
                          variant="secondary"
                          onClick={() => {
                            setAssigningStaff(staff.id);
                            setSelectedLeads([]);
                          }}
                          disabled={unassignedLeads.length === 0}
                        >
                          <Users size={14} /> Assign Leads
                        </Button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </Card>
      </div>

      {/* Assign Leads Modal */}
      <Modal
        isOpen={!!assigningStaff}
        onClose={() => { setAssigningStaff(null); setSelectedLeads([]); }}
        title={`Assign Leads to ${staffList.find((s) => s.id === assigningStaff)?.name || "Staff"}`}
      >
        <div className="p-6 space-y-4 max-h-96 overflow-y-auto">
          {unassignedLeads.length === 0 ? (
            <p className="text-sm text-slate-500">No unassigned leads available.</p>
          ) : (
            <>
              <div className="flex items-center justify-between">
                <p className="text-sm text-slate-600">
                  {unassignedLeads.length} unassigned lead{unassignedLeads.length !== 1 ? "s" : ""}
                </p>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => {
                    if (selectedLeads.length === unassignedLeads.length) {
                      setSelectedLeads([]);
                    } else {
                      setSelectedLeads(unassignedLeads.map((l) => l.id));
                    }
                  }}
                >
                  {selectedLeads.length === unassignedLeads.length ? "Deselect All" : "Select All"}
                </Button>
              </div>
              <div className="space-y-2">
                {unassignedLeads.map((lead) => (
                  <label
                    key={lead.id}
                    className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-colors ${
                      selectedLeads.includes(lead.id)
                        ? "border-blue-300 bg-blue-50"
                        : "border-slate-200 hover:bg-slate-50"
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={selectedLeads.includes(lead.id)}
                      onChange={() => {
                        setSelectedLeads((prev) =>
                          prev.includes(lead.id)
                            ? prev.filter((id) => id !== lead.id)
                            : [...prev, lead.id]
                        );
                      }}
                      className="rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-slate-900">{lead.name}</p>
                      <p className="text-xs text-slate-500">{lead.course} &middot; {lead.phone}</p>
                    </div>
                    <span className="text-xs text-slate-400 capitalize">{lead.product || "academy"}</span>
                  </label>
                ))}
              </div>
            </>
          )}
          <div className="pt-4 flex gap-3 justify-end border-t border-slate-100">
            <Button
              type="button"
              variant="secondary"
              onClick={() => { setAssigningStaff(null); setSelectedLeads([]); }}
            >
              Cancel
            </Button>
            <Button
              onClick={handleAssignLeads}
              disabled={selectedLeads.length === 0}
            >
              <Check size={16} /> Assign {selectedLeads.length > 0 && `(${selectedLeads.length})`}
            </Button>
          </div>
        </div>
      </Modal>

      {/* Create Staff Modal */}
      <Modal
        isOpen={showCreateModal}
        onClose={() => { setShowCreateModal(false); }}
        title="Create Staff Member"
      >
        <div className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Full Name</label>
            <input
              type="text"
              value={newStaff.name}
              onChange={(e) => setNewStaff({ ...newStaff, name: e.target.value })}
              className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter name"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
            <input
              type="email"
              value={newStaff.email}
              onChange={(e) => setNewStaff({ ...newStaff, email: e.target.value })}
              className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="email@example.com"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Password</label>
            <input
              type="text"
              value={newStaff.password}
              onChange={(e) => setNewStaff({ ...newStaff, password: e.target.value })}
              className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Set password"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Staff Type</label>
            <select
              value={newStaff.staffType}
              onChange={(e) => setNewStaff({ ...newStaff, staffType: e.target.value })}
              className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {STAFF_TYPES.map((t) => (
                <option key={t.value} value={t.value}>{t.label}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Status</label>
            <select
              value={newStaff.status}
              onChange={(e) => setNewStaff({ ...newStaff, status: e.target.value })}
              className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>
          <div className="pt-4 flex gap-3 justify-end border-t border-slate-100">
            <Button type="button" variant="secondary" onClick={() => setShowCreateModal(false)}>
              Cancel
            </Button>
            <Button onClick={handleCreateStaff} disabled={!newStaff.name || !newStaff.email || !newStaff.password}>
              <Check size={16} /> Create Staff
            </Button>
          </div>
        </div>
      </Modal>
    </AppLayout>
  );
}
