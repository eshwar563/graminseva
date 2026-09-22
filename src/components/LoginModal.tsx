import React, { useState } from "react";
import { CheckCircle2, Phone, ShieldCheck, UserCheck, Wrench, Store, Shield, X, ArrowRight, User } from "lucide-react";
import { useApp } from "../context/AppContext";
import { UserRole } from "../types";

export const LoginModal: React.FC = () => {
  const { isLoginModalOpen, setIsLoginModalOpen, user, setUser, currentRole, setCurrentRole, setActiveTab, speakText } = useApp();

  const [nameInput, setNameInput] = useState(user.name || "");
  const [phoneInput, setPhoneInput] = useState(user.phone || "+91 98480 22334");
  const [otpInput, setOtpInput] = useState("");
  const [step, setStep] = useState<"phone" | "otp">("phone");
  const [selectedRole, setSelectedRole] = useState<UserRole>(currentRole);
  const [loginFeedback, setLoginFeedback] = useState("");

  if (!isLoginModalOpen) return null;

  const handleSendOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!phoneInput || phoneInput.length < 10) {
      setLoginFeedback("Please enter a valid 10-digit mobile number");
      return;
    }
    setStep("otp");
    setOtpInput("5429"); // Auto-fill realistic demo OTP
    setLoginFeedback("OTP sent via SMS / WhatsApp: 5429");
  };

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (otpInput === "5429" || otpInput.length === 4) {
      setCurrentRole(selectedRole);
      const trimmedName = nameInput.trim();
      setUser((prev) => ({
        ...prev,
        name: trimmedName, // When user enters the name, then only display it!
        phone: phoneInput,
        role: selectedRole,
      }));
      if (selectedRole === "provider") setActiveTab("provider_portal");
      else if (selectedRole === "seller") setActiveTab("seller_portal");
      else if (selectedRole === "admin") setActiveTab("admin_desk");
      else setActiveTab("market");

      speakText(trimmedName ? `Welcome ${trimmedName}! Logged in as ${selectedRole}` : `Welcome! Logged in as ${selectedRole}`);
      setIsLoginModalOpen(false);
      setStep("phone");
    } else {
      setLoginFeedback("Invalid OTP. Try 5429 for demo.");
    }
  };

  const quickDemoLogin = (role: UserRole, demoName: string) => {
    setSelectedRole(role);
    setCurrentRole(role);
    setUser((prev) => ({
      ...prev,
      name: demoName,
      role: role,
    }));
    if (role === "provider") setActiveTab("provider_portal");
    else if (role === "seller") setActiveTab("seller_portal");
    else if (role === "admin") setActiveTab("admin_desk");
    else setActiveTab("market");

    speakText(`Logged in as ${demoName} (${role})`);
    setIsLoginModalOpen(false);
  };

  return (
    <div
      id="login-modal-overlay"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-in fade-in duration-200"
    >
      <div
        id="login-modal-card"
        className="w-full max-w-md bg-white rounded-3xl shadow-2xl border border-stone-200 overflow-hidden"
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-emerald-800 to-stone-900 text-white p-6 relative">
          <button
            id="close-login-modal-btn"
            onClick={() => setIsLoginModalOpen(false)}
            className="absolute top-4 right-4 p-2 rounded-full hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-2 mb-1">
            <ShieldCheck className="w-5 h-5 text-emerald-400" />
            <h3 className="text-xl font-bold">GraminSeva Login</h3>
          </div>
          <p className="text-xs text-stone-300">
            Secure OTP login for customers, local gig providers, merchants & ward officers.
          </p>
        </div>

        <div className="p-6">
          {/* Role Selector Cards */}
          <div className="mb-5">
            <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-2">
              Select Your Platform Role
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                id="role-select-customer"
                onClick={() => setSelectedRole("customer")}
                className={`p-3 rounded-xl border text-left flex items-start gap-2.5 transition-all ${
                  selectedRole === "customer"
                    ? "border-emerald-600 bg-emerald-50 text-emerald-900 ring-1 ring-emerald-600"
                    : "border-stone-200 hover:border-stone-300 text-stone-700"
                }`}
              >
                <UserCheck className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                <div>
                  <div className="text-xs font-bold">Customer</div>
                  <div className="text-[10px] text-stone-500">Book services & buy goods</div>
                </div>
              </button>

              <button
                type="button"
                id="role-select-provider"
                onClick={() => setSelectedRole("provider")}
                className={`p-3 rounded-xl border text-left flex items-start gap-2.5 transition-all ${
                  selectedRole === "provider"
                    ? "border-blue-600 bg-blue-50 text-blue-900 ring-1 ring-blue-600"
                    : "border-stone-200 hover:border-stone-300 text-stone-700"
                }`}
              >
                <Wrench className="w-4 h-4 text-blue-600 mt-0.5 shrink-0" />
                <div>
                  <div className="text-xs font-bold">Service Gig Worker</div>
                  <div className="text-[10px] text-stone-500">Plumber, electrician, etc.</div>
                </div>
              </button>

              <button
                type="button"
                id="role-select-seller"
                onClick={() => setSelectedRole("seller")}
                className={`p-3 rounded-xl border text-left flex items-start gap-2.5 transition-all ${
                  selectedRole === "seller"
                    ? "border-purple-600 bg-purple-50 text-purple-900 ring-1 ring-purple-600"
                    : "border-stone-200 hover:border-stone-300 text-stone-700"
                }`}
              >
                <Store className="w-4 h-4 text-purple-600 mt-0.5 shrink-0" />
                <div>
                  <div className="text-xs font-bold">Local Merchant</div>
                  <div className="text-[10px] text-stone-500">Sell milk, veggies & items</div>
                </div>
              </button>

              <button
                type="button"
                id="role-select-admin"
                onClick={() => setSelectedRole("admin")}
                className={`p-3 rounded-xl border text-left flex items-start gap-2.5 transition-all ${
                  selectedRole === "admin"
                    ? "border-stone-800 bg-stone-100 text-stone-900 ring-1 ring-stone-800"
                    : "border-stone-200 hover:border-stone-300 text-stone-700"
                }`}
              >
                <Shield className="w-4 h-4 text-stone-700 mt-0.5 shrink-0" />
                <div>
                  <div className="text-xs font-bold">Admin / Ward Desk</div>
                  <div className="text-[10px] text-stone-500">Verify IDs & dispatch</div>
                </div>
              </button>
            </div>
          </div>

          {/* Form Step */}
          {step === "phone" ? (
            <form onSubmit={handleSendOtp} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-stone-600 mb-1">
                  Your Full Name (పేరు నమోదు చేయండి)
                </label>
                <div className="relative">
                  <User className="w-4 h-4 absolute left-3 top-3 text-stone-400" />
                  <input
                    id="modal-name-input"
                    type="text"
                    value={nameInput}
                    onChange={(e) => setNameInput(e.target.value)}
                    placeholder="Enter your name (e.g. Ramesh Babu)"
                    className="w-full text-sm pl-9 pr-3 py-2.5 rounded-xl border border-stone-300 focus:outline-hidden focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600"
                  />
                </div>
                <div className="mt-1 flex items-center justify-between text-[11px]">
                  <span className="text-stone-400">Display Name:</span>
                  {nameInput.trim() ? (
                    <span className="font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                      ✓ {nameInput.trim()}
                    </span>
                  ) : (
                    <span className="text-amber-600 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                      Enter name to display in profile
                    </span>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-stone-600 mb-1">
                  Mobile Number (Vernacular OTP / WhatsApp)
                </label>
                <div className="relative">
                  <Phone className="w-4 h-4 absolute left-3 top-3 text-stone-400" />
                  <input
                    id="login-phone-input"
                    type="tel"
                    value={phoneInput}
                    onChange={(e) => setPhoneInput(e.target.value)}
                    placeholder="+91 98480 22334"
                    className="w-full text-sm pl-9 pr-3 py-2.5 rounded-xl border border-stone-300 focus:outline-hidden focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 font-mono"
                    required
                  />
                </div>
              </div>

              {loginFeedback && <p className="text-xs text-amber-700 font-medium">{loginFeedback}</p>}

              <button
                type="submit"
                id="send-otp-btn"
                className="w-full py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white text-sm font-semibold rounded-xl shadow-xs transition-colors flex items-center justify-center gap-2"
              >
                <span>Get Verification OTP</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          ) : (
            <form onSubmit={handleVerifyOtp} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-stone-600 mb-1">
                  Enter 4-Digit OTP (Demo: 5429)
                </label>
                <input
                  id="login-otp-input"
                  type="text"
                  maxLength={4}
                  value={otpInput}
                  onChange={(e) => setOtpInput(e.target.value)}
                  placeholder="5429"
                  className="w-full text-center text-lg tracking-widest font-mono py-2.5 rounded-xl border border-stone-300 focus:outline-hidden focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600"
                  required
                />
              </div>

              {loginFeedback && (
                <div className="p-2 bg-emerald-50 rounded-lg text-xs text-emerald-800 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>{loginFeedback}</span>
                </div>
              )}

              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setStep("phone")}
                  className="w-1/3 py-2.5 border border-stone-300 text-xs font-semibold rounded-xl text-stone-700 hover:bg-stone-50"
                >
                  Change No.
                </button>
                <button
                  type="submit"
                  id="verify-otp-btn"
                  className="w-2/3 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white text-sm font-semibold rounded-xl shadow-xs transition-colors"
                >
                  Verify & Continue
                </button>
              </div>
            </form>
          )}

          {/* Instant 1-Click Role Switcher for seamless test preview */}
          <div className="mt-6 pt-5 border-t border-stone-200">
            <p className="text-[11px] font-semibold text-stone-500 mb-2">
              ⚡ Instant 1-Click Demo Login as:
            </p>
            <div className="grid grid-cols-2 gap-1.5 text-xs">
              <button
                type="button"
                onClick={() => quickDemoLogin("customer", "Ramesh Babu (Resident)")}
                className="p-2 text-left bg-stone-50 hover:bg-emerald-50 hover:text-emerald-800 rounded-lg border border-stone-200 font-medium"
              >
                👤 Customer
              </button>
              <button
                type="button"
                onClick={() => quickDemoLogin("provider", "Srinivas Goud (Plumber)")}
                className="p-2 text-left bg-stone-50 hover:bg-blue-50 hover:text-blue-800 rounded-lg border border-stone-200 font-medium"
              >
                🛠️ Plumber Worker
              </button>
              <button
                type="button"
                onClick={() => quickDemoLogin("seller", "Mallanna (Mandi Farmer)")}
                className="p-2 text-left bg-stone-50 hover:bg-purple-50 hover:text-purple-800 rounded-lg border border-stone-200 font-medium"
              >
                🏪 Farmer / Merchant
              </button>
              <button
                type="button"
                onClick={() => quickDemoLogin("admin", "Ward Officer 14 (Govt)")}
                className="p-2 text-left bg-stone-50 hover:bg-stone-200 hover:text-stone-900 rounded-lg border border-stone-200 font-medium"
              >
                🛡️ Admin / Ward Desk
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
