"use client";

import Badge from "./Badge";

const leadStatusMap = {
  New: { label: "New", variant: "primary" },
  Contacted: { label: "Contacted", variant: "warning" },
  Converted: { label: "Converted", variant: "success" },
  Lost: { label: "Lost", variant: "danger" },
};

const paymentStatusMap = {
  Paid: { label: "Paid", variant: "success" },
  Pending: { label: "Pending", variant: "warning" },
  Overdue: { label: "Overdue", variant: "danger" },
};

export function LeadStatusBadge({ status }) {
  const config = leadStatusMap[status] || { label: status, variant: "default" };
  return <Badge variant={config.variant}>{config.label}</Badge>;
}

export function PaymentStatusBadge({ status }) {
  const config = paymentStatusMap[status] || { label: status, variant: "default" };
  return <Badge variant={config.variant}>{config.label}</Badge>;
}
