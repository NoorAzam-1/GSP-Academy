"use client";

import { CheckCircle2, AlertCircle } from "lucide-react";

export default function ToastContainer({ toasts }) {
  if (!toasts || toasts.length === 0) return null;

  return (
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
  );
}
