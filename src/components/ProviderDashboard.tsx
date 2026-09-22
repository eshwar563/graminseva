import React, { useState } from "react";
import {
  CheckCircle2,
  Clock,
  DollarSign,
  MapPin,
  Phone,
  ShieldCheck,
  Star,
  UserCheck,
  Wrench,
  AlertCircle,
  Lock,
} from "lucide-react";
import { useApp } from "../context/AppContext";

export const ProviderDashboard: React.FC = () => {
  const { bookings, confirmServiceCompletion, user, speakText } = useApp();

  const [activeTabSub, setActiveTabSub] = useState<"jobs" | "earnings" | "verification">("jobs");
  const [enteredOtp, setEnteredOtp] = useState<Record<string, string>>({});
  const [otpError, setOtpError] = useState<string>("");
  const [isOnline, setIsOnline] = useState<boolean>(true);

  // Active bookings for this provider
  const assignedJobs = bookings.filter((b) => b.status !== "completed");
  const completedJobs = bookings.filter((b) => b.status === "completed");

  const totalEarned = completedJobs.reduce((sum, b) => sum + (b.finalBill || b.escrowAmount), 0);
  const platformFee = Math.round(totalEarned * 0.04);
  const netEarnings = totalEarned - platformFee;
  const corporateUrbanLoss = Math.round(totalEarned * 0.28); // 28% urban commission

  const handleVerifyJobCompletion = (bookingId: string) => {
    const otp = enteredOtp[bookingId] || "";
    if (!otp) {
      setOtpError("Please enter the 4-digit OTP from the customer.");
      return;
    }

    const success = confirmServiceCompletion(bookingId, otp);
    if (success) {
      setOtpError("");
      setEnteredOtp((prev) => ({ ...prev, [bookingId]: "" }));
    } else {
      setOtpError("Invalid OTP! Ask customer to check their app or SMS (Demo OTP: check job card).");
    }
  };

  return (
    <div id="provider-dashboard-container" className="space-y-6 pb-12">
      {/* Top Banner */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-blue-900 via-blue-800 to-indigo-950 text-white shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="px-2.5 py-0.5 rounded-full bg-blue-700/80 border border-blue-500/40 text-xs font-semibold text-blue-200">
              Gig Worker Portal • Subedari Ward 14
            </span>
            <div className="flex items-center gap-1.5 bg-emerald-900/60 px-2.5 py-0.5 rounded-full text-xs text-emerald-300 border border-emerald-700">
              <span className={`w-2 h-2 rounded-full ${isOnline ? "bg-emerald-400" : "bg-stone-400"}`} />
              <span>{isOnline ? "Available for Dispatch" : "Offline"}</span>
            </div>
          </div>
          <h1 className="text-2xl font-black tracking-tight">Service Professional Desk</h1>
          <p className="text-xs text-blue-200 mt-1">
            Empowering local plumbers, electricians & technicians with 96% direct earnings and instant UPI Escrow settlement.
          </p>
        </div>

        <button
          onClick={() => {
            setIsOnline(!isOnline);
            speakText(isOnline ? "Status set to Offline." : "Status set to Available for nearby jobs.");
          }}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-colors ${
            isOnline ? "bg-white text-blue-900 hover:bg-blue-50" : "bg-emerald-600 text-white"
          }`}
        >
          {isOnline ? "Pause Incoming Dispatches" : "Go Online Now"}
        </button>
      </div>

      {/* Trust & Low Commission Highlight Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* Trust Score */}
        <div className="p-4 bg-white rounded-2xl border border-stone-200 shadow-2xs">
          <div className="flex items-center justify-between text-xs text-stone-500 mb-1">
            <span>Community Trust Score</span>
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-2xl font-black text-stone-900">98 / 100</div>
          <div className="text-[11px] text-emerald-700 font-semibold mt-1">
            ✓ Aadhaar Verified • Police Clearance Active
          </div>
        </div>

        {/* Total Earned */}
        <div className="p-4 bg-white rounded-2xl border border-stone-200 shadow-2xs">
          <div className="flex items-center justify-between text-xs text-stone-500 mb-1">
            <span>Net Paid to Your UPI</span>
            <DollarSign className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-2xl font-black text-stone-900">₹{netEarnings + 1200}</div>
          <div className="text-[11px] text-stone-500 mt-1">
            Flat 4% platform fee: ₹{platformFee + 48}
          </div>
        </div>

        {/* Savings vs Corporate App */}
        <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-200 shadow-2xs">
          <div className="flex items-center justify-between text-xs text-emerald-800 mb-1 font-bold">
            <span>Your Commission Savings</span>
            <span className="text-xs">💰</span>
          </div>
          <div className="text-2xl font-black text-emerald-900">
            ₹{corporateUrbanLoss + 336} saved
          </div>
          <p className="text-[10px] text-emerald-700 mt-1">
            Urban apps charge 25-30% commission. GraminSeva keeps money with workers!
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-stone-200 pb-2 text-xs font-bold">
        <button
          onClick={() => setActiveTabSub("jobs")}
          className={`px-3 py-1.5 rounded-lg transition-colors ${
            activeTabSub === "jobs" ? "bg-stone-900 text-white" : "text-stone-600 hover:text-stone-900"
          }`}
        >
          Active Job Dispatches ({assignedJobs.length})
        </button>
        <button
          onClick={() => setActiveTabSub("earnings")}
          className={`px-3 py-1.5 rounded-lg transition-colors ${
            activeTabSub === "earnings" ? "bg-stone-900 text-white" : "text-stone-600 hover:text-stone-900"
          }`}
        >
          Completed History & Escrow
        </button>
      </div>

      {/* Job Cards */}
      {activeTabSub === "jobs" ? (
        <div className="space-y-4">
          {assignedJobs.length === 0 ? (
            <div className="p-8 text-center bg-white rounded-3xl border border-stone-200 text-stone-500">
              <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto mb-2" />
              <p className="text-sm font-bold text-stone-900">All current jobs completed!</p>
              <p className="text-xs text-stone-500 mt-1">
                You are on standby for nearby dispatch calls in Ward 14.
              </p>
            </div>
          ) : (
            assignedJobs.map((job) => (
              <div
                key={job.id}
                id={`job-card-${job.id}`}
                className="p-5 bg-white rounded-2xl border border-stone-200 shadow-sm space-y-4"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-black text-blue-900 px-2 py-0.5 bg-blue-100 rounded-md">
                        {job.id}
                      </span>
                      <span className="text-xs font-bold text-stone-900">{job.serviceName}</span>
                      <span className="text-[10px] text-stone-500">{job.createdAt}</span>
                    </div>
                    <h3 className="font-bold text-stone-900 text-base mt-1">{job.issueTitle}</h3>
                    <p className="text-xs text-stone-600 mt-0.5">{job.problemDescription}</p>
                  </div>

                  <div className="text-right">
                    <span className="text-[10px] uppercase font-bold text-stone-400 block">Locked in Escrow</span>
                    <span className="text-lg font-black text-emerald-800">₹{job.escrowAmount}</span>
                  </div>
                </div>

                {/* Customer Details */}
                <div className="p-3 bg-stone-50 rounded-xl border border-stone-200 flex flex-wrap items-center justify-between gap-3 text-xs">
                  <div>
                    <span className="text-stone-400 block text-[10px]">Customer:</span>
                    <strong className="text-stone-900">{job.customerName}</strong>
                    <span className="text-stone-500 block text-[11px]">📍 {job.customerAddress}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <a
                      href={`tel:${job.customerPhone}`}
                      className="px-3 py-1.5 bg-white border border-stone-300 rounded-lg font-semibold text-stone-700 flex items-center gap-1.5 hover:bg-stone-50"
                    >
                      <Phone className="w-3.5 h-3.5 text-emerald-700" />
                      <span>Call Customer</span>
                    </a>
                  </div>
                </div>

                {/* Attachments if any */}
                {(job.photoUrl || job.voiceNoteUrl) && (
                  <div className="flex items-center gap-3 text-xs">
                    {job.photoUrl && (
                      <div className="flex items-center gap-1.5 text-stone-600">
                        <img src={job.photoUrl} alt="Inspection" className="w-10 h-10 rounded-lg object-cover" />
                        <span className="text-[11px]">Inspection Photo</span>
                      </div>
                    )}
                    {job.voiceNoteUrl && (
                      <div className="p-2 bg-stone-100 rounded-lg text-[11px] font-medium text-stone-700">
                        🎤 Customer voice note attached
                      </div>
                    )}
                  </div>
                )}

                {/* Work Completion & Escrow Release Form */}
                <div className="p-4 bg-emerald-50/70 border border-emerald-200 rounded-xl space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-900">
                      <Lock className="w-4 h-4 text-emerald-700" />
                      <span>Release ₹{job.escrowAmount} Escrow: Enter Customer OTP</span>
                    </div>
                    <span className="text-[10px] text-stone-400">
                      (Demo OTP is: <strong>{job.completionOtp}</strong>)
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      maxLength={4}
                      value={enteredOtp[job.id] || ""}
                      onChange={(e) =>
                        setEnteredOtp((prev) => ({ ...prev, [job.id]: e.target.value }))
                      }
                      placeholder="4-digit OTP"
                      className="w-36 text-center text-sm font-mono font-bold p-2 bg-white rounded-xl border border-stone-300 focus:outline-hidden focus:border-emerald-600"
                    />
                    <button
                      type="button"
                      onClick={() => handleVerifyJobCompletion(job.id)}
                      className="px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold rounded-xl shadow-xs transition-colors"
                    >
                      Confirm Work & Collect ₹{job.escrowAmount}
                    </button>
                  </div>

                  {otpError && <p className="text-xs text-red-600 font-semibold">{otpError}</p>}
                </div>
              </div>
            ))
          )}
        </div>
      ) : (
        /* Completed History */
        <div className="space-y-3">
          {completedJobs.map((b) => (
            <div
              key={b.id}
              className="p-4 bg-white rounded-2xl border border-stone-200 flex items-center justify-between text-xs"
            >
              <div>
                <span className="font-bold text-stone-900 text-sm">{b.issueTitle}</span>
                <p className="text-stone-500 mt-0.5">
                  Customer: {b.customerName} • {b.scheduledTime}
                </p>
                <div className="text-[10px] text-emerald-700 font-bold mt-1">
                  ✓ Escrow Released to UPI • Verified with OTP {b.completionOtp}
                </div>
              </div>
              <div className="text-right">
                <span className="text-base font-black text-stone-900">₹{b.escrowAmount}</span>
                <span className="text-[10px] text-stone-400 block">4% fee: -₹{Math.round(b.escrowAmount * 0.04)}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
