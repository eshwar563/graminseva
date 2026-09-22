/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { AppProvider, useApp } from "./context/AppContext";
import { Navbar } from "./components/Navbar";
import { OnboardingFlow } from "./components/OnboardingFlow";
import { CustomerDashboard } from "./components/CustomerDashboard";
import { ProviderDashboard } from "./components/ProviderDashboard";
import { SellerDashboard } from "./components/SellerDashboard";
import { EmergencyDashboard } from "./components/EmergencyDashboard";
import { AdminDashboard } from "./components/AdminDashboard";
import { AccountDashboard } from "./components/AccountDashboard";
import { OrdersDashboard } from "./components/OrdersDashboard";
import { LanguageSelectorModal } from "./components/LanguageSelectorModal";
import { VoiceAssistantModal } from "./components/VoiceAssistantModal";
import { AiPriceEstimatorModal } from "./components/AiPriceEstimatorModal";
import { IvrWhatsappModal } from "./components/IvrWhatsappModal";
import { BookingModal } from "./components/BookingModal";
import { LoginModal } from "./components/LoginModal";
import { ShieldCheck, HeartHandshake, PhoneCall, Sparkles, Volume2, VolumeX } from "lucide-react";

function MainAppLayout() {
  const {
    onboardingStep,
    activeTab,
    voiceOverEnabled,
    setVoiceOverEnabled,
    speakText,
    language,
  } = useApp();

  // If user is currently in the requested onboarding flow:
  // 1. Language Select -> 2. Login -> 3. Voice-Over for Illiterate -> 4. Seperate Seller / Customer
  if (onboardingStep !== "completed") {
    return <OnboardingFlow />;
  }

  return (
    <div className="min-h-screen bg-[#f8f9fa] text-stone-900 flex flex-col font-sans selection:bg-emerald-100 selection:text-emerald-900">
      {/* Top Navigation */}
      <Navbar />

      {/* Illiterate Audio Assistant Banner (if enabled) */}
      {voiceOverEnabled && (
        <div
          id="voiceover-banner-ribbon"
          className="bg-amber-500 text-amber-950 px-4 py-2 border-b border-amber-600 flex items-center justify-between text-xs font-bold shadow-xs"
        >
          <div className="flex items-center gap-2">
            <Volume2 className="w-4 h-4 animate-bounce" />
            <span>
              {language === "te"
                ? "వాయిస్ ఓవర్ ఆన్: బటన్లు మరియు ధరలను తాకితే శబ్దం వినిపిస్తుంది"
                : language === "hi"
                ? "वॉयस-ओवर चालू है: किसी भी बटन या उत्पाद को छूकर विवरण सुनें"
                : "Voice-Over Mode Active: Tap any element to hear audio instructions"}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() =>
                speakText(
                  language === "te"
                    ? "గ్రామీణ సేవ హోమ్‌పేజీలో ఉన్నారు. సేవలను బుక్ చేయడానికి లేదా వస్తువులను అమ్మడానికి ఎంచుకోండి."
                    : "You are on the GraminSeva homepage. Tap any service or product to continue."
                )
              }
              className="px-2.5 py-0.5 bg-amber-950 text-amber-100 rounded-md text-[11px] hover:bg-amber-900 transition-colors"
            >
              పేజీ చదవండి 🔊
            </button>
            <button
              type="button"
              onClick={() => setVoiceOverEnabled(false)}
              className="text-amber-950 hover:text-black p-0.5"
              title="Turn Voice-Over Off"
            >
              <VolumeX className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 pt-6">
        {activeTab === "market" && <CustomerDashboard />}
        {activeTab === "provider_portal" && <ProviderDashboard />}
        {activeTab === "seller_portal" && <SellerDashboard />}
        {activeTab === "emergency_desk" && <EmergencyDashboard />}
        {activeTab === "admin_desk" && <AdminDashboard />}
        {activeTab === "account" && <AccountDashboard />}
        {activeTab === "orders" && <OrdersDashboard />}
      </main>

      {/* Trust & Rural Inclusion Footer */}
      <footer className="mt-auto border-t border-stone-200 bg-white text-xs text-stone-500 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-emerald-800 text-white flex items-center justify-center font-bold text-sm">
              గ్రా
            </div>
            <div>
              <p className="font-bold text-stone-900">GraminSeva Community Digital Marketplace</p>
              <p className="text-[11px] text-stone-400">
                Low-commission, trust-driven digital services for Tier-2 & Tier-3 towns
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4 text-xs font-medium">
            <span className="flex items-center gap-1 text-emerald-800">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>Flat 4% Commission</span>
            </span>
            <span>•</span>
            <span className="flex items-center gap-1 text-stone-700">
              <HeartHandshake className="w-3.5 h-3.5 text-blue-600" />
              <span>UPI Escrow Protection</span>
            </span>
            <span>•</span>
            <span className="flex items-center gap-1 text-amber-800">
              <PhoneCall className="w-3.5 h-3.5 text-amber-600" />
              <span>Toll-Free IVR: 1800-419-7382</span>
            </span>
          </div>
        </div>
      </footer>

      {/* Modals & Dialogs */}
      <LanguageSelectorModal />
      <VoiceAssistantModal />
      <AiPriceEstimatorModal />
      <IvrWhatsappModal />
      <BookingModal />
      <LoginModal />
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <MainAppLayout />
    </AppProvider>
  );
}
