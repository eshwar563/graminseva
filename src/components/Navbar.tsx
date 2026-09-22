import React from "react";
import {
  AlertTriangle,
  Globe,
  Lock,
  MapPin,
  Mic,
  Package,
  RotateCcw,
  ShieldCheck,
  Store,
  User,
  Volume2,
  VolumeX,
  Wrench,
  Sparkles,
  PhoneCall,
  UserCheck,
} from "lucide-react";
import { useApp } from "../context/AppContext";
import { SUPPORTED_LANGUAGES } from "../data/translations";

export const Navbar: React.FC = () => {
  const {
    language,
    setShowLanguageModal,
    currentRole,
    setCurrentRole,
    activeTab,
    setActiveTab,
    user,
    setIsVoiceModalOpen,
    setIsAiEstimatorOpen,
    setIsIvrModalOpen,
    setIsLoginModalOpen,
    voiceOverEnabled,
    setVoiceOverEnabled,
    restartOnboarding,
    speakText,
    t,
  } = useApp();

  const currentLangObj = SUPPORTED_LANGUAGES.find((l) => l.code === language) || SUPPORTED_LANGUAGES[0];

  const handleSwitchToCustomer = () => {
    setCurrentRole("customer");
    setActiveTab("market");
    speakText(
      language === "te"
        ? "కస్టమర్ పేజీకి మారారు. ఇక్కడ గృహ సేవలు మరియు నిత్యావసరాలు లభిస్తాయి"
        : "Switched to Customer Market Page"
    );
  };

  const handleSwitchToSeller = () => {
    setCurrentRole("seller");
    setActiveTab("seller_portal");
    speakText(
      language === "te"
        ? "సెల్లర్ పేజీకి మారారు. మీ వ్యవసాయ ఉత్పత్తులు మరియు వస్తువులను అమ్మండి. కేవలం 4 శాతం కమీషన్"
        : "Switched to Seller Portal with 4 percent commission"
    );
  };

  return (
    <>
      <header
        id="main-app-header"
        className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-stone-200 shadow-xs"
      >
        {/* Top utility ribbon */}
        <div className="bg-stone-900 text-stone-300 text-xs px-4 py-1.5 flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1 text-emerald-400 font-medium">
              <MapPin className="w-3.5 h-3.5" />
              <span>{user.town} • {user.ward}</span>
            </span>
            <span className="hidden md:inline-block text-stone-600">|</span>
            <span className="hidden md:inline-flex items-center gap-1 text-amber-300">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Govt ID Verified Platform • 4% Flat Commission</span>
            </span>
          </div>

          <div className="flex items-center gap-3">
            {/* Restart Tour button */}
            <button
              id="restart-tour-top-btn"
              onClick={restartOnboarding}
              className="px-2 py-0.5 rounded-md bg-stone-800 hover:bg-stone-700 text-amber-300 text-[11px] font-bold flex items-center gap-1 transition-colors border border-stone-700"
              title="Restart Onboarding Sequence (Language -> Login -> Voice-Over -> Customer/Seller)"
            >
              <RotateCcw className="w-3 h-3" />
              <span>🔄 ప్రారంభ టూర్ (Restart Tour)</span>
            </button>

            <button
              id="ivr-whatsapp-trigger-btn"
              onClick={() => setIsIvrModalOpen(true)}
              className="hover:text-emerald-400 text-stone-200 flex items-center gap-1 transition-colors"
            >
              <PhoneCall className="w-3 h-3 text-emerald-400" />
              <span>IVR / WhatsApp Mode</span>
            </button>

            <button
              id="ai-price-estimator-top-btn"
              onClick={() => setIsAiEstimatorOpen(true)}
              className="hover:text-amber-300 text-amber-200 flex items-center gap-1 font-semibold transition-colors"
            >
              <Sparkles className="w-3 h-3 text-amber-400" />
              <span>AI Price Estimator</span>
            </button>

            {/* Escrow Lock status pill */}
            <div className="flex items-center gap-1.5 bg-emerald-950/80 text-emerald-300 px-2 py-0.5 rounded-full border border-emerald-800">
              <Lock className="w-3 h-3" />
              <span>UPI Escrow: ₹{user.escrowLockedBalance}</span>
            </div>
          </div>
        </div>

        {/* Main Navbar */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between gap-4">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <button
              id="brand-home-btn"
              onClick={handleSwitchToCustomer}
              className="flex items-center gap-2.5 text-left group"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-600 to-teal-700 text-white flex items-center justify-center font-black text-xl shadow-md group-hover:scale-105 transition-transform">
                గ్రా
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="text-xl font-extrabold tracking-tight text-stone-900">GraminSeva</span>
                  <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-md bg-emerald-100 text-emerald-800">
                    Tier 2/3
                  </span>
                </div>
                <p className="text-[11px] text-stone-500 font-medium line-clamp-1">{t("tagline")}</p>
              </div>
            </button>
          </div>

          {/* Center Navigation Tabs (Featuring SEPARATE CUSTOMER PAGE and SELLER PAGE) */}
          <nav id="role-navigation-tabs" className="hidden lg:flex items-center gap-1 bg-stone-100 p-1.5 rounded-2xl border border-stone-200">
            {/* SEPARATE CUSTOMER PAGE BUTTON */}
            <button
              id="nav-tab-customer"
              onClick={handleSwitchToCustomer}
              className={`px-3.5 py-2 text-xs font-black rounded-xl transition-all flex items-center gap-2 ${
                currentRole === "customer" && activeTab === "market"
                  ? "bg-emerald-700 text-white shadow-md scale-102"
                  : "text-stone-700 hover:text-stone-900 hover:bg-stone-200/60"
              }`}
            >
              <UserCheck className="w-4 h-4" />
              <div className="text-left">
                <span className="block leading-none">కస్టమర్ పేజీ</span>
                <span className={`text-[10px] font-medium leading-none ${currentRole === "customer" && activeTab === "market" ? "text-emerald-200" : "text-stone-500"}`}>
                  Customer Page
                </span>
              </div>
            </button>

            {/* SEPARATE SELLER PAGE BUTTON */}
            <button
              id="nav-tab-seller"
              onClick={handleSwitchToSeller}
              className={`px-3.5 py-2 text-xs font-black rounded-xl transition-all flex items-center gap-2 ${
                currentRole === "seller" || activeTab === "seller_portal"
                  ? "bg-purple-800 text-white shadow-md scale-102"
                  : "text-stone-700 hover:text-stone-900 hover:bg-stone-200/60"
              }`}
            >
              <Store className="w-4 h-4 text-purple-400" />
              <div className="text-left">
                <span className="block leading-none">సెల్లర్ పేజీ (4%)</span>
                <span className={`text-[10px] font-medium leading-none ${currentRole === "seller" || activeTab === "seller_portal" ? "text-purple-200" : "text-stone-500"}`}>
                  Seller & Merchant
                </span>
              </div>
            </button>

            <div className="h-6 w-px bg-stone-300 mx-1" />

            <button
              id="nav-tab-provider"
              onClick={() => {
                setCurrentRole("provider");
                setActiveTab("provider_portal");
              }}
              className={`px-3 py-1.5 text-xs font-semibold rounded-xl transition-all flex items-center gap-1.5 ${
                currentRole === "provider" || activeTab === "provider_portal"
                  ? "bg-white text-blue-800 shadow-xs"
                  : "text-stone-600 hover:text-stone-900"
              }`}
            >
              <Wrench className="w-3.5 h-3.5 text-blue-600" />
              <span>Gig Worker Hub</span>
            </button>

            <button
              id="nav-tab-emergency"
              onClick={() => setActiveTab("emergency_desk")}
              className={`px-3 py-1.5 text-xs font-semibold rounded-xl transition-all flex items-center gap-1.5 ${
                activeTab === "emergency_desk"
                  ? "bg-red-600 text-white shadow-xs"
                  : "text-red-700 hover:bg-red-50"
              }`}
            >
              <AlertTriangle className="w-3.5 h-3.5 text-red-500 animate-pulse" />
              <span>Emergency 108</span>
            </button>

            <button
              id="nav-tab-admin"
              onClick={() => {
                setCurrentRole("admin");
                setActiveTab("admin_desk");
              }}
              className={`px-3 py-1.5 text-xs font-semibold rounded-xl transition-all flex items-center gap-1.5 ${
                currentRole === "admin" || activeTab === "admin_desk"
                  ? "bg-white text-stone-900 shadow-xs"
                  : "text-stone-600 hover:text-stone-900"
              }`}
            >
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>Admin Desk</span>
            </button>
          </nav>

          {/* Right Action Icons & Profile */}
          <div className="flex items-center gap-2">
            {/* Dedicated Voice-Over Mode Toggle (for everyone: literates & illiterates) */}
            <button
              id="voiceover-accessibility-btn"
              onClick={() => setVoiceOverEnabled(!voiceOverEnabled)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-black transition-all ${
                voiceOverEnabled
                  ? "bg-amber-500 text-amber-950 border-amber-600 shadow-sm"
                  : "bg-stone-50 text-stone-600 border-stone-300 hover:bg-amber-50 hover:text-amber-900"
              }`}
              title="Voice-Over Audio Assistant for Everyone"
            >
              {voiceOverEnabled ? (
                <>
                  <Volume2 className="w-4 h-4 animate-bounce" />
                  <span>
                    {language === "te"
                      ? "వాయిస్: ఆన్"
                      : language === "hi"
                      ? "वॉयस: चालू"
                      : language === "kn"
                      ? "ಧ್ವನಿ: ಆನ್"
                      : language === "ta"
                      ? "குரல்: இயக்கம்"
                      : "Voice: ON"}
                  </span>
                </>
              ) : (
                <>
                  <VolumeX className="w-4 h-4" />
                  <span>
                    {language === "te"
                      ? "వాయిస్ ఓవర్"
                      : language === "hi"
                      ? "वॉयस-ओवर"
                      : language === "kn"
                      ? "ಧ್ವನಿ ಓವರ್"
                      : language === "ta"
                      ? "குரல் வழி"
                      : "Voice-Over"}
                  </span>
                </>
              )}
            </button>

            {/* Language Switcher Button */}
            <button
              id="language-picker-btn"
              onClick={() => setShowLanguageModal(true)}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl border border-stone-300 text-stone-700 hover:border-emerald-600 hover:text-emerald-700 transition-colors text-xs font-semibold"
              title="Change Language"
            >
              <Globe className="w-4 h-4 text-emerald-600" />
              <span>{currentLangObj.nativeLabel}</span>
            </button>

            {/* Voice Assistant Mic Button */}
            <button
              id="header-voice-btn"
              onClick={() => setIsVoiceModalOpen(true)}
              className="p-2 rounded-xl bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-200 transition-colors relative"
              title="Voice Assistant Mic"
            >
              <Mic className="w-4 h-4" />
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-emerald-500 rounded-full animate-ping" />
            </button>

            {/* My Orders Button */}
            <button
              id="nav-my-orders-btn"
              onClick={() => setActiveTab("orders")}
              className={`p-2 rounded-xl border transition-colors relative ${
                activeTab === "orders"
                  ? "bg-emerald-700 text-white border-emerald-700"
                  : "bg-white text-stone-700 border-stone-200 hover:bg-stone-50"
              }`}
              title="My Orders & Bookings"
            >
              <Package className="w-4 h-4" />
            </button>

            {/* Account Dashboard Button - ONLY display name when entered! */}
            <button
              id="nav-account-btn"
              onClick={() => setActiveTab("account")}
              className={`flex items-center gap-2 p-1.5 pr-2.5 rounded-xl border transition-colors ${
                activeTab === "account"
                  ? "bg-stone-900 text-white border-stone-900"
                  : "bg-white text-stone-700 border-stone-200 hover:bg-stone-50"
              }`}
            >
              {user.name && user.name.trim() ? (
                <>
                  <img
                    src={user.avatarUrl}
                    alt={user.name}
                    className="w-6 h-6 rounded-lg object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <span className="hidden sm:inline-block text-xs font-bold max-w-[90px] truncate text-emerald-950">
                    {user.name.split(" ")[0]}
                  </span>
                </>
              ) : (
                <>
                  <div className="w-6 h-6 rounded-lg bg-stone-100 text-stone-600 flex items-center justify-center">
                    <User className="w-3.5 h-3.5" />
                  </div>
                  <span className="hidden sm:inline-block text-xs font-semibold text-stone-600">
                    {language === "te"
                      ? "లాగిన్"
                      : language === "hi"
                      ? "लॉगिन"
                      : language === "kn"
                      ? "ಲಾಗಿನ್"
                      : language === "ta"
                      ? "உள்நுழை"
                      : "Login"}
                  </span>
                </>
              )}
            </button>

            {/* Login / Switch Account Button */}
            <button
              id="nav-login-modal-btn"
              onClick={() => setIsLoginModalOpen(true)}
              className="hidden sm:flex items-center gap-1 text-xs text-stone-500 hover:text-stone-900 font-medium px-2 py-1"
            >
              <User className="w-3.5 h-3.5" />
              <span>
                {user.name && user.name.trim()
                  ? language === "te"
                    ? "ఖాతా మార్చు"
                    : "Switch Role"
                  : language === "te"
                  ? "పేరు / లాగిన్"
                  : "Enter Name / Login"}
              </span>
            </button>
          </div>
        </div>

        {/* Mobile Navigation bar */}
        <div className="lg:hidden border-t border-stone-200 px-3 py-2 flex items-center justify-around bg-stone-50 text-[11px] font-medium overflow-x-auto">
          <button
            onClick={() => {
              setCurrentRole("customer");
              setActiveTab("market");
            }}
            className={`px-2 py-1 rounded-md shrink-0 ${
              currentRole === "customer" && activeTab === "market"
                ? "bg-emerald-700 text-white font-bold"
                : "text-stone-700"
            }`}
          >
            Market
          </button>
          <button
            onClick={() => {
              setCurrentRole("provider");
              setActiveTab("provider_portal");
            }}
            className={`px-2 py-1 rounded-md shrink-0 ${
              currentRole === "provider" || activeTab === "provider_portal"
                ? "bg-blue-700 text-white font-bold"
                : "text-stone-700"
            }`}
          >
            Provider Hub
          </button>
          <button
            onClick={() => {
              setCurrentRole("seller");
              setActiveTab("seller_portal");
            }}
            className={`px-2 py-1 rounded-md shrink-0 ${
              currentRole === "seller" || activeTab === "seller_portal"
                ? "bg-purple-700 text-white font-bold"
                : "text-stone-700"
            }`}
          >
            Sell (Meesho)
          </button>
          <button
            onClick={() => setActiveTab("emergency_desk")}
            className={`px-2 py-1 rounded-md shrink-0 flex items-center gap-1 ${
              activeTab === "emergency_desk" ? "bg-red-600 text-white font-bold" : "text-red-700"
            }`}
          >
            <AlertTriangle className="w-3 h-3" />
            <span>Emergency</span>
          </button>
          <button
            onClick={() => {
              setCurrentRole("admin");
              setActiveTab("admin_desk");
            }}
            className={`px-2 py-1 rounded-md shrink-0 ${
              currentRole === "admin" || activeTab === "admin_desk"
                ? "bg-stone-900 text-white font-bold"
                : "text-stone-700"
            }`}
          >
            Admin
          </button>
        </div>
      </header>

      {/* Floating Universal Voice Button at Bottom Right */}
      <div className="fixed bottom-6 right-6 z-40">
        <button
          id="floating-voice-assistant-trigger"
          onClick={() => setIsVoiceModalOpen(true)}
          className="group relative flex items-center justify-center w-14 h-14 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white shadow-xl hover:scale-105 transition-all"
          aria-label="Activate Voice Assistant"
        >
          <span className="absolute -inset-1 rounded-full bg-emerald-500/30 animate-ping group-hover:block" />
          <Mic className="w-6 h-6 relative z-10" />
          <span className="absolute -top-8 right-0 bg-stone-900 text-white text-[10px] px-2 py-0.5 rounded-md shadow-xs opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
            Voice Control (Anywhere)
          </span>
        </button>
      </div>
    </>
  );
};
