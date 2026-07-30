"use client";

import { useRouter } from "next/navigation";
import { Bell, Menu, LogOut } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

export default function Header({ title, onMenuClick }) {
  const router = useRouter();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  return (
    <header className="bg-white border-b border-slate-200 h-16 flex items-center justify-between px-4 sm:px-6 z-10 shrink-0">
      <div className="flex items-center gap-1 md:gap-4">
        <button
          className="lg:hidden text-slate-500 hover:text-slate-700"
          onClick={onMenuClick}
        >
          <Menu size={24} />
        </button>
        <div className="hidden sm:flex items-center text-sm text-slate-500">
          <span className="font-medium text-slate-900 capitalize">
            {title || "Dashboard"}
          </span>
          <span className="mx-2">/</span>
          <span>Overview</span>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <button className="relative p-2 text-slate-500 hover:bg-slate-100 rounded-full transition-colors">
          <Bell size={20} />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-rose-500 rounded-full border border-white"></span>
        </button>

        <button
          onClick={handleLogout}
          className="flex items-center gap-2 px-3 py-2 text-sm text-slate-600 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
        >
          <LogOut size={16} />
          <span className="hidden sm:inline">Logout</span>
        </button>
      </div>
    </header>
  );
}
