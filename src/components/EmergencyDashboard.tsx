import React, { useState } from "react";
import {
  AlertOctagon,
  Flame,
  HeartPulse,
  MapPin,
  Phone,
  PhoneCall,
  Radio,
  ShieldAlert,
  Zap,
} from "lucide-react";
import { useApp } from "../context/AppContext";
import { EMERGENCY_SERVICES } from "../data/mockData";

export const EmergencyDashboard: React.FC = () => {
  const { user, speakText } = useApp();
  const [sosTriggered, setSosTriggered] = useState(false);
  const [selectedType, setSelectedType] = useState<"all" | "hospital" | "fire" | "flood" | "civic_hazard" | "snake_rescue">("all");
  const [sosStatusText, setSosStatusText] = useState("");

  const filteredContacts = EMERGENCY_SERVICES.filter((c) => {
    if (selectedType === "all") return true;
    return c.type === selectedType;
  });

  const handleTriggerSos = () => {
    setSosTriggered(true);
    const msg = `EMERGENCY ALERT: SOS broadcast dispatched for ${user.ward}. Nearby 108 Ambulance & Ward Disaster Team notified!`;
    setSosStatusText(msg);
    speakText(msg);
  };

  return (
    <div id="emergency-dashboard-container" className="space-y-6 pb-12">
      {/* High Alert Banner */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-red-700 via-rose-800 to-red-950 text-white shadow-xl relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2.5 py-0.5 rounded-full bg-red-900/80 border border-red-400 text-xs font-bold text-red-100 flex items-center gap-1">
                <AlertOctagon className="w-3.5 h-3.5 animate-pulse text-amber-300" />
                <span>24x7 Toll-Free Emergency Dispatch</span>
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight">
              Emergency & Disaster Response Hub
            </h1>
            <p className="text-xs text-red-100 mt-1 max-w-xl leading-relaxed">
              Immediate connection to Govt 108 Ambulance, Fire & Rescue, Local Ward PHC, Snake Catchers, and Electricity pole hazard teams.
            </p>
          </div>

          {/* Big SOS Button */}
          <button
            id="emergency-sos-broadcast-btn"
            onClick={handleTriggerSos}
            className={`px-6 py-4 rounded-2xl font-black text-sm uppercase tracking-wider shadow-2xl transition-all flex items-center gap-2 shrink-0 ${
              sosTriggered
                ? "bg-amber-400 text-stone-950 ring-4 ring-white animate-pulse"
                : "bg-white text-red-700 hover:bg-red-50 hover:scale-105"
            }`}
          >
            <Radio className="w-5 h-5 text-red-600 animate-spin" />
            <span>{sosTriggered ? "SOS Active • Help Dispatched" : "One-Tap SOS Broadcast"}</span>
          </button>
        </div>

        {sosTriggered && (
          <div className="mt-4 p-3 bg-red-950/80 rounded-2xl border border-red-500 text-xs text-red-200">
            <strong>Active Broadcast:</strong> {sosStatusText}
            <div className="text-[11px] text-amber-300 mt-0.5">
              Live GPS Location shared: 17.9689° N, 79.5941° E ({user.ward}, {user.town})
            </div>
          </div>
        )}
      </div>

      {/* Filter Categories */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs font-bold">
        <button
          onClick={() => setSelectedType("all")}
          className={`px-3 py-2 rounded-xl shrink-0 transition-colors ${
            selectedType === "all" ? "bg-stone-900 text-white" : "bg-white border border-stone-200 text-stone-700 hover:bg-stone-50"
          }`}
        >
          All Helplines (108, 101, 1912)
        </button>
        <button
          onClick={() => setSelectedType("hospital")}
          className={`px-3 py-2 rounded-xl shrink-0 transition-colors flex items-center gap-1.5 ${
            selectedType === "hospital" ? "bg-red-700 text-white" : "bg-white border border-stone-200 text-stone-700 hover:bg-stone-50"
          }`}
        >
          <HeartPulse className="w-3.5 h-3.5" />
          <span>Health & Ambulance</span>
        </button>
        <button
          onClick={() => setSelectedType("fire")}
          className={`px-3 py-2 rounded-xl shrink-0 transition-colors flex items-center gap-1.5 ${
            selectedType === "fire" ? "bg-orange-700 text-white" : "bg-white border border-stone-200 text-stone-700 hover:bg-stone-50"
          }`}
        >
          <Flame className="w-3.5 h-3.5" />
          <span>Fire & Gas Leak</span>
        </button>
        <button
          onClick={() => setSelectedType("civic_hazard")}
          className={`px-3 py-2 rounded-xl shrink-0 transition-colors flex items-center gap-1.5 ${
            selectedType === "civic_hazard" ? "bg-amber-700 text-white" : "bg-white border border-stone-200 text-stone-700 hover:bg-stone-50"
          }`}
        >
          <Zap className="w-3.5 h-3.5" />
          <span>Electricity Wire & Snake</span>
        </button>
      </div>

      {/* Emergency Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredContacts.map((contact) => (
          <div
            key={contact.id}
            id={`emergency-card-${contact.id}`}
            className="p-5 bg-white rounded-2xl border border-stone-200 shadow-2xs hover:border-red-400 hover:shadow-md transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-start justify-between gap-3 mb-2">
                <div>
                  <h3 className="font-extrabold text-stone-900 text-base">{contact.name}</h3>
                  <p className="text-xs text-red-700 font-semibold">{contact.teluguTitle}</p>
                </div>
                <span className="px-2 py-0.5 bg-red-100 text-red-800 text-[10px] font-bold rounded-md">
                  {contact.distanceKm ? `${contact.distanceKm} km away` : "24x7"}
                </span>
              </div>

              <div className="text-xs text-stone-600 space-y-1 mb-4">
                <div className="flex items-center gap-1 text-stone-500">
                  <MapPin className="w-3.5 h-3.5 text-stone-400" />
                  <span>{contact.location}</span>
                </div>
                <p className="text-[11px] text-stone-500">{contact.openHours}</p>
                {contact.bedsAvailable !== undefined && (
                  <p className="text-[11px] text-emerald-700 font-semibold">
                    ✓ ICU Beds Available: {contact.bedsAvailable} • Oxygen Active
                  </p>
                )}
              </div>
            </div>

            <div className="pt-3 border-t border-stone-100 flex items-center justify-between">
              <div>
                <span className="text-[10px] uppercase font-bold text-stone-400 block">Dial Helpline</span>
                <span className="text-base font-black text-stone-900 font-mono">{contact.phone}</span>
              </div>
              <a
                href={`tel:${contact.phone}`}
                id={`call-${contact.id}`}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-bold text-xs rounded-xl shadow-xs flex items-center gap-1.5 transition-colors"
              >
                <PhoneCall className="w-3.5 h-3.5" />
                <span>Call Now</span>
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
