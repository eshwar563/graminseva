import React, { useState } from "react";
import {
  CheckCircle2,
  Lock,
  MapPin,
  Scale,
  ShieldAlert,
  ShieldCheck,
  UserCheck,
  Wrench,
  XCircle,
  Zap,
} from "lucide-react";
import { useApp } from "../context/AppContext";

export const AdminDashboard: React.FC = () => {
  const { providers, bookings, speakText } = useApp();

  const [pendingVerifications, setPendingVerifications] = useState([
    {
      id: "VERIF-901",
      name: "Chandraiah V.",
      category: "Electrician & Inverter Repair",
      aadhaarNumber: "XXXX-XXXX-6124",
      phone: "+91 97011 88442",
      ward: "Ward 14 (Subedari)",
      status: "pending",
      policeClearanceDoc: "TS-POLICE-VERIF-2025-4421.pdf",
    },
    {
      id: "VERIF-902",
      name: "Laxman Rao",
      category: "Gas Stove & Geyser Repair",
      aadhaarNumber: "XXXX-XXXX-8931",
      phone: "+91 98492 33118",
      ward: "Ward 12 (Naimnagar)",
      status: "pending",
      policeClearanceDoc: "TS-POLICE-VERIF-2025-9982.pdf",
    },
  ]);

  const handleApprove = (id: string, name: string) => {
    setPendingVerifications((prev) => prev.filter((p) => p.id !== id));
    speakText(`Worker ${name} verified and granted GraminSeva Trust Badge.`);
  };

  const handleReject = (id: string) => {
    setPendingVerifications((prev) => prev.filter((p) => p.id !== id));
  };

  return (
    <div id="admin-dashboard-container" className="space-y-6 pb-12">
      {/* Header Banner */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-stone-900 via-stone-800 to-zinc-900 text-white shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="px-2.5 py-0.5 rounded-full bg-stone-700 border border-stone-600 text-xs font-semibold text-stone-200">
              Ward Municipal & Platform Administration Desk
            </span>
          </div>
          <h1 className="text-2xl font-black tracking-tight">Trust & Dispatch Control Center</h1>
          <p className="text-xs text-stone-300 mt-1 max-w-xl">
            Identity verification audit, community trust score calibration, and algorithmic dispatch engine monitor.
          </p>
        </div>

        <div className="flex items-center gap-2 bg-stone-800/80 p-3 rounded-2xl border border-stone-700 text-xs">
          <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0" />
          <div>
            <div className="font-bold text-stone-100">Zero Fake Profile Guarantee</div>
            <div className="text-[11px] text-stone-400">100% Aadhaar & biometric linked</div>
          </div>
        </div>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
        <div className="p-4 bg-white rounded-2xl border border-stone-200">
          <span className="text-stone-500">Verified Local Pros</span>
          <div className="text-2xl font-black text-stone-900 mt-1">{providers.length + 42}</div>
          <span className="text-[10px] text-emerald-700 font-semibold">Active in Ward 14</span>
        </div>

        <div className="p-4 bg-white rounded-2xl border border-stone-200">
          <span className="text-stone-500">Total Escrow Volume</span>
          <div className="text-2xl font-black text-emerald-800 mt-1">₹84,320</div>
          <span className="text-[10px] text-stone-400">100% UPI Protected</span>
        </div>

        <div className="p-4 bg-white rounded-2xl border border-stone-200">
          <span className="text-stone-500">Dispatch Wait Time</span>
          <div className="text-2xl font-black text-blue-900 mt-1">9.4 mins</div>
          <span className="text-[10px] text-stone-400">Ward proximity routing</span>
        </div>

        <div className="p-4 bg-white rounded-2xl border border-stone-200">
          <span className="text-stone-500">Customer Dispute Rate</span>
          <div className="text-2xl font-black text-purple-900 mt-1">0.3%</div>
          <span className="text-[10px] text-emerald-700 font-semibold">Resolved via Escrow</span>
        </div>
      </div>

      {/* Pending Identity Verification Queue */}
      <div className="bg-white rounded-3xl border border-stone-200 p-6 space-y-4 shadow-2xs">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-stone-900">Worker Identity Verification Queue</h3>
            <p className="text-xs text-stone-500">
              Review government Aadhaar IDs and local police verification before granting Trust Badge
            </p>
          </div>
          <span className="px-2.5 py-1 bg-amber-100 text-amber-900 rounded-full text-xs font-bold">
            {pendingVerifications.length} Pending Approval
          </span>
        </div>

        <div className="space-y-3">
          {pendingVerifications.map((item) => (
            <div
              key={item.id}
              className="p-4 bg-stone-50 rounded-2xl border border-stone-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs"
            >
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-stone-900 text-sm">{item.name}</span>
                  <span className="text-[11px] font-semibold text-blue-800 bg-blue-50 px-2 py-0.5 rounded-md">
                    {item.category}
                  </span>
                </div>
                <div className="text-stone-500 mt-1 flex flex-wrap gap-3 text-[11px]">
                  <span>🆔 Aadhaar: {item.aadhaarNumber}</span>
                  <span>📞 {item.phone}</span>
                  <span>📍 {item.ward}</span>
                  <span className="text-emerald-700 font-medium">📄 {item.policeClearanceDoc}</span>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  type="button"
                  onClick={() => handleReject(item.id)}
                  className="px-3 py-1.5 border border-stone-300 hover:bg-stone-200 text-stone-700 rounded-xl font-semibold flex items-center gap-1"
                >
                  <XCircle className="w-3.5 h-3.5 text-stone-500" />
                  <span>Reject</span>
                </button>
                <button
                  type="button"
                  onClick={() => handleApprove(item.id, item.name)}
                  className="px-3 py-1.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl font-bold flex items-center gap-1 shadow-xs"
                >
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Approve & Grant Badge</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightweight Dispatch Engine Formula */}
      <div className="bg-white rounded-3xl border border-stone-200 p-6 space-y-3 shadow-2xs text-xs">
        <div className="flex items-center gap-2 text-stone-900 font-bold text-sm">
          <Zap className="w-4 h-4 text-amber-500" />
          <span>Algorithmic Dispatch Engine: Proximity & Trust Formula</span>
        </div>
        <p className="text-stone-600 leading-relaxed">
          GraminSeva prioritizes speed and reliability without exploiting workers. The dispatch score is evaluated as:
        </p>
        <div className="p-3 bg-stone-900 text-stone-100 rounded-xl font-mono text-xs overflow-x-auto">
          DispatchWeight = (0.50 × InverseDistance_km) + (0.30 × CommunityTrustScore) + (0.20 × CompletionRating)
        </div>
        <p className="text-stone-500 text-[11px]">
          Nearest verified workers receive instant push alerts on their low-bandwidth vernacular dashboard.
        </p>
      </div>
    </div>
  );
};
