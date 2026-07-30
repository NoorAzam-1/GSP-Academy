"use client";

import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  GraduationCap,
  DoorOpen,
  UserCog,
  Settings,
  UserCheck,
  X,
} from "lucide-react";
import { SIDEBAR_ITEMS } from "@/constants";
import { useAuth } from "@/context/AuthContext";
import { getInitials } from "@/utils";
import Image from "next/image";

const iconMap = {
  LayoutDashboard,
  Users,
  GraduationCap,
  DoorOpen,
  UserCog,
  Settings,
  UserCheck,
};

export default function Sidebar({ isOpen, onClose }) {
  const pathname = usePathname();
  const router = useRouter();
  const { user } = useAuth();

  const role = user?.role || "admin";
  const navItems = SIDEBAR_ITEMS[role] || SIDEBAR_ITEMS.admin;

  const handleNavigate = (href) => {
    router.push(href);
    if (onClose) onClose();
  };

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-slate-900/50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`
          fixed lg:static inset-y-0 left-0 z-50
          w-64 bg-[#0f172a] text-slate-300 flex flex-col transition-transform duration-300 ease-in-out
          ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
        `}
      >
        <div className="p-6 flex items-center justify-between">
          <div className="flex flex-col justify-center items-center">
            <div className="w-full h-full">
              <Image
                src="/gsp-academy.jpg"
                alt="logo"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                height={200}
                width={200}
                className="h-full w-full object-cover"
              />
            </div>
            <p className="text-slate-500 text-sm mt-1">
              Manage Leads, Payments Seamlessly
            </p>
          </div>
          <button className="lg:hidden text-slate-400" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <nav className="flex-1 px-4 space-y-1 overflow-y-auto">
          {navItems.map((item) => {
            const Icon = iconMap[item.icon];
            const isActive =
              pathname === item.href ||
              (pathname.startsWith(item.href + "/") &&
                item.href !== "/dashboard");
            return (
              <button
                key={item.id}
                onClick={() => handleNavigate(item.href)}
                className={`
                  w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors
                  ${
                    isActive
                      ? "bg-blue-600 text-white"
                      : "text-slate-400 hover:bg-slate-800 hover:text-white"
                  }
                `}
              >
                {Icon && <Icon size={18} />}
                {item.label}
              </button>
            );
          })}
        </nav>

        <div className="p-4 border-t border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-sm font-bold text-white">
              {user ? getInitials(user.name) : "AD"}
            </div>
            <div>
              <p className="text-sm font-medium text-white">
                {user?.name || "Admin User"}
              </p>
              <p className="text-xs text-slate-400">
                {user?.title || (role === "admin" ? "Director" : "Staff")}
              </p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
