"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, LogIn } from "lucide-react";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import { useAuth } from "@/context/AuthContext";
import { DEMO_CREDENTIALS } from "@/constants";
import Image from "next/image";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [selectedRole, setSelectedRole] = useState(null);
  const [error, setError] = useState("");
  const router = useRouter();
  const { login } = useAuth();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Please fill in all fields");
      return;
    }

    const result = login(email, password);
    if (result) {
      router.push("/dashboard");
    } else {
      setError("Invalid email or password");
    }
  };

  const fillCredentials = (email, password, role) => {
    setEmail(email);
    setPassword(password);
    setSelectedRole(role);
    setError("");
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <div className="p-8">
          <div className="text-center mb-4 flex flex-col justify-center items-center">
            <div className="w-60 h-full">
              <Image src="/gsp-academy.jpg" alt="logo" height={200} width={200} className="h-full w-full object-cover" />
            </div>
            <p className="text-slate-500 text-sm mt-1">
              Sign in to your account
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-900 placeholder:text-slate-400"
                placeholder="admin@gspacademy.in"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10 text-slate-900 placeholder:text-slate-400"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {error && (
              <p className="text-sm text-rose-600 bg-rose-50 px-3 py-2 rounded-lg">
                {error}
              </p>
            )}

            <Button type="submit" className="w-full">
              <LogIn size={18} /> Sign In
            </Button>
          </form>

          <div className="mt-6 space-y-3">
            <p className="text-xs text-slate-400 text-center">Quick Demo Login</p>
            <div className="grid grid-cols-3 gap-2">
              {DEMO_CREDENTIALS.map((cred) => (
                <button
                  key={cred.role}
                  type="button"
                  onClick={() => fillCredentials(cred.email, cred.password, cred.role)}
                  className={`flex flex-col items-center justify-center gap-1 px-2 py-2.5 rounded-lg text-xs font-medium transition-all border ${
                    selectedRole === cred.role
                      ? "bg-blue-600 text-white border-blue-600 ring-2 ring-blue-300"
                      : "bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200"
                  }`}
                >
                  {cred.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
