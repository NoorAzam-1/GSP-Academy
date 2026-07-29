"use client";

const variants = {
  default: "bg-slate-100 text-slate-800",
  success: "bg-emerald-100 text-emerald-800",
  warning: "bg-amber-100 text-amber-800",
  danger: "bg-rose-100 text-rose-800",
  primary: "bg-blue-100 text-blue-800",
};

export default function Badge({ children, variant = "default" }) {
  return (
    <span
      className={`px-2.5 py-1 rounded-full text-xs font-medium ${variants[variant] || variants.default}`}
    >
      {children}
    </span>
  );
}
