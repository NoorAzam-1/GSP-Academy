"use client";

import { Search, X } from "lucide-react";
import { LEAD_STATUSES, LEAD_SOURCES } from "@/constants";
import { MOCK_STAFF } from "@/constants";

export default function LeadFilters({
  filters,
  onFilterChange,
  showStaffFilter = true,
  showSourceFilter = true,
}) {
  const handleChange = (key, value) => {
    onFilterChange({ ...filters, [key]: value });
  };

  const clearFilters = () => {
    onFilterChange({
      search: "",
      status: "",
      assignedTo: "",
      dateFrom: "",
      dateTo: "",
      source: "",
    });
  };

  const hasActiveFilters =
    filters?.status || filters?.assignedTo || filters?.dateFrom || filters?.dateTo || filters?.source;

  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 w-full">
      <div className="relative w-full sm:w-56">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
        <input
          type="text"
          placeholder="Search leads..."
          value={filters?.search || ""}
          onChange={(e) => handleChange("search", e.target.value)}
          className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <select
        value={filters?.status || ""}
        onChange={(e) => handleChange("status", e.target.value)}
        className="px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="">All Statuses</option>
        {LEAD_STATUSES.map((s) => (
          <option key={s} value={s}>{s}</option>
        ))}
      </select>

      {showStaffFilter && (
        <select
          value={filters?.assignedTo || ""}
          onChange={(e) => handleChange("assignedTo", e.target.value)}
          className="px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">All Staff</option>
          <option value="unassigned">Unassigned</option>
          {MOCK_STAFF.map((s) => (
            <option key={s.id} value={String(s.id)}>{s.name}</option>
          ))}
        </select>
      )}

      {showSourceFilter && (
        <select
          value={filters?.source || ""}
          onChange={(e) => handleChange("source", e.target.value)}
          className="px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">All Sources</option>
          {LEAD_SOURCES.map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
      )}

      <input
        type="date"
        value={filters?.dateFrom || ""}
        onChange={(e) => handleChange("dateFrom", e.target.value)}
        className="px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="From"
      />

      <input
        type="date"
        value={filters?.dateTo || ""}
        onChange={(e) => handleChange("dateTo", e.target.value)}
        className="px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="To"
      />

      {hasActiveFilters && (
        <button
          onClick={clearFilters}
          className="flex items-center gap-1 text-sm text-slate-500 hover:text-slate-700 px-2 py-1"
        >
          <X size={14} /> Clear
        </button>
      )}
    </div>
  );
}
