"use client";

import { createContext, useContext, useState, useCallback, useEffect } from "react";
import { DEMO_CREDENTIALS } from "@/constants";

const AuthContext = createContext(null);

const MOCK_USERS = {
  admin: { id: "1", name: "Admin User", email: "admin@gspacademy.in", role: "admin", title: "Director" },
  lead_manager: { id: "2", name: "Lead Manager", email: "lead@gspacademy.in", role: "lead_manager", title: "Lead Manager" },
  fee_manager: { id: "3", name: "Fee Manager", email: "fee@gspacademy.in", role: "fee_manager", title: "Fee Manager" },
};

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem("gsp_user");
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setUser(parsed);
        setIsAuthenticated(true);
      } catch {
        localStorage.removeItem("gsp_user");
      }
    }
    setIsLoading(false);
  }, []);

  const login = useCallback((email, password) => {
    const credential = DEMO_CREDENTIALS.find((c) => c.email === email && c.password === password);
    if (!credential) return null;
    const userData = MOCK_USERS[credential.role];
    if (userData) {
      setUser(userData);
      setIsAuthenticated(true);
      localStorage.setItem("gsp_user", JSON.stringify(userData));
      document.cookie = "gsp_auth=true; path=/; max-age=86400";
      return userData;
    }
    return null;
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem("gsp_user");
    document.cookie = "gsp_auth=; path=/; max-age=0";
  }, []);

  const hasRole = useCallback(
    (roles) => {
      if (!user) return false;
      return roles.includes(user.role);
    },
    [user]
  );

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated, isLoading, login, logout, hasRole }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
