import React, { useState } from "react";
import {
  CreditCard,
  Gift,
  HelpCircle,
  Heart,
  Share2,
  Store,
  Globe,
  Settings,
  Shield,
  LogOut,
  ChevronRight,
  User,
  Lock,
  Phone,
  CheckCircle2,
  ExternalLink,
} from "lucide-react";
import { useApp } from "../context/AppContext";

export const AccountDashboard: React.FC = () => {
  const {
    language,
    user,
    setUser,
    setShowLanguageModal,
    setIsLoginModalOpen,
    setActiveTab,
    setCurrentRole,
    products,
    transactions,
    speakText,
  } = useApp();

  const [activeSection, setActiveSection] = useState<
    "payments" | "activity" | "help" | "refer" | "settings"
  >("payments");

  const [upiIdInput, setUpiIdInput] = useState(user.upiId || "ramesh.babu@oksbi");
  const [isEditingUpi, setIsEditingUpi] = useState(false);

  // Followed shops
  const followedShops = [
    {
      id: "shop-1",
      name: "Sri Lakshmi Narasimha Dairy Farm",
      owner: "Mallanna",
      ward: "Subedari Ward 14",
      rating: 4.9,
      productsCount: 4,
    },
    {
      id: "shop-2",
      name: "Subedari Farm Fresh Mandi",
      owner: "Ravi Kumar",
      ward: "Ward 12 Mandi",
      rating: 4.8,
      productsCount: 12,
    },
  ];

  const wishlistedProducts = products.filter((p) => user.wishlist.includes(p.id));

  const handleSaveUpi = (e: React.FormEvent) => {
    e.preventDefault();
    setUser((prev) => ({ ...prev, upiId: upiIdInput }));
    setIsEditingUpi(false);
    speakText(`UPI ID updated to ${upiIdInput}`);
  };

  const handleLogout = () => {
    setIsLoginModalOpen(true);
  };

  return (
    <div id="account-dashboard-container" className="space-y-6 pb-12">
      {/* Profile Header */}
      <div className="p-6 rounded-3xl bg-white border border-stone-200 shadow-2xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <img
            src={user.avatarUrl}
            alt={user.name}
            className="w-16 h-16 rounded-2xl object-cover border border-stone-200"
            referrerPolicy="no-referrer"
          />
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-black text-stone-900">
                {user.name && user.name.trim() ? (
                  user.name
                ) : (
                  <span className="text-stone-400 italic font-medium text-base">
                    {language === "te"
                      ? "పేరు నమోదు కాలేదు (గెస్ట్ యూజర్)"
                      : language === "hi"
                      ? "नाम दर्ज नहीं है (अतिथि)"
                      : language === "kn"
                      ? "ಹೆಸರು ನಮೂದಿಸಿಲ್ಲ"
                      : language === "ta"
                      ? "பெயர் உள்ளிடப்படவில்லை"
                      : "Name not entered (Guest User)"}
                  </span>
                )}
              </h1>
              <span className="px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-800 text-[10px] font-bold capitalize">
                {user.role}
              </span>
            </div>
            <p className="text-xs text-stone-500 mt-0.5">
              📞 {user.phone} • 📍 {user.ward}, {user.town}
            </p>
            <div className="text-[11px] text-emerald-700 font-semibold mt-1">
              ✓ Verified Community Member • Escrow Protected
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowLanguageModal(true)}
            className="px-3 py-2 bg-stone-100 hover:bg-stone-200 text-stone-800 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors"
          >
            <Globe className="w-3.5 h-3.5 text-emerald-600" />
            <span>Language</span>
          </button>
          <button
            onClick={handleLogout}
            className="px-3 py-2 border border-stone-300 hover:bg-stone-50 text-stone-700 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Switch Role / Logout</span>
          </button>
        </div>
      </div>

      {/* Main Sections Navigation Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 text-xs font-bold">
        <button
          onClick={() => setActiveSection("payments")}
          className={`p-3 rounded-2xl border transition-all text-left flex items-center gap-2 ${
            activeSection === "payments"
              ? "bg-emerald-800 text-white border-emerald-800 shadow-xs"
              : "bg-white text-stone-700 border-stone-200 hover:border-stone-300"
          }`}
        >
          <CreditCard className="w-4 h-4 shrink-0" />
          <span>My Payments & UPI</span>
        </button>

        <button
          onClick={() => setActiveSection("activity")}
          className={`p-3 rounded-2xl border transition-all text-left flex items-center gap-2 ${
            activeSection === "activity"
              ? "bg-emerald-800 text-white border-emerald-800 shadow-xs"
              : "bg-white text-stone-700 border-stone-200 hover:border-stone-300"
          }`}
        >
          <Heart className="w-4 h-4 shrink-0" />
          <span>My Activity</span>
        </button>

        <button
          onClick={() => setActiveSection("refer")}
          className={`p-3 rounded-2xl border transition-all text-left flex items-center gap-2 ${
            activeSection === "refer"
              ? "bg-emerald-800 text-white border-emerald-800 shadow-xs"
              : "bg-white text-stone-700 border-stone-200 hover:border-stone-300"
          }`}
        >
          <Gift className="w-4 h-4 shrink-0" />
          <span>Refer & Earn</span>
        </button>

        <button
          onClick={() => setActiveSection("help")}
          className={`p-3 rounded-2xl border transition-all text-left flex items-center gap-2 ${
            activeSection === "help"
              ? "bg-emerald-800 text-white border-emerald-800 shadow-xs"
              : "bg-white text-stone-700 border-stone-200 hover:border-stone-300"
          }`}
        >
          <HelpCircle className="w-4 h-4 shrink-0" />
          <span>Help Center</span>
        </button>

        <button
          onClick={() => setActiveSection("settings")}
          className={`p-3 rounded-2xl border transition-all text-left flex items-center gap-2 ${
            activeSection === "settings"
              ? "bg-stone-900 text-white border-stone-900 shadow-xs"
              : "bg-white text-stone-700 border-stone-200 hover:border-stone-300"
          }`}
        >
          <Settings className="w-4 h-4 shrink-0" />
          <span>Settings & Legal</span>
        </button>
      </div>

      {/* SECTION CONTENT */}
      {/* 1. PAYMENTS & BANK / UPI */}
      {activeSection === "payments" && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* UPI & Bank details */}
            <div className="p-5 bg-white rounded-3xl border border-stone-200 shadow-2xs space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-stone-100">
                <div className="flex items-center gap-2">
                  <CreditCard className="w-4 h-4 text-emerald-700" />
                  <h3 className="font-bold text-sm text-stone-900">Linked UPI & Bank Account</h3>
                </div>
                <button
                  type="button"
                  onClick={() => setIsEditingUpi(!isEditingUpi)}
                  className="text-xs font-bold text-emerald-700 hover:underline"
                >
                  {isEditingUpi ? "Cancel" : "Change"}
                </button>
              </div>

              {isEditingUpi ? (
                <form onSubmit={handleSaveUpi} className="space-y-3 text-xs">
                  <div>
                    <label className="block text-stone-600 mb-1">Enter UPI VPA / PhonePe / GPay</label>
                    <input
                      type="text"
                      value={upiIdInput}
                      onChange={(e) => setUpiIdInput(e.target.value)}
                      className="w-full text-xs p-2.5 rounded-xl border border-stone-300 font-mono"
                      required
                    />
                  </div>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-emerald-700 text-white rounded-xl font-bold"
                  >
                    Save UPI ID
                  </button>
                </form>
              ) : (
                <div className="space-y-2 text-xs">
                  <div className="p-3 bg-stone-50 rounded-2xl flex items-center justify-between">
                    <div>
                      <span className="text-[10px] text-stone-400 uppercase font-bold">UPI Virtual ID</span>
                      <div className="font-mono font-bold text-stone-900 text-sm">{user.upiId}</div>
                    </div>
                    <span className="text-[10px] px-2 py-0.5 bg-emerald-100 text-emerald-800 font-bold rounded-md">
                      Verified
                    </span>
                  </div>

                  <div className="p-3 bg-stone-50 rounded-2xl flex items-center justify-between">
                    <div>
                      <span className="text-[10px] text-stone-400 uppercase font-bold">Bank Name</span>
                      <div className="font-bold text-stone-900">State Bank of India (Subedari Br.)</div>
                      <span className="text-[10px] text-stone-500 font-mono">A/C: •••• •••• 4129</span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Escrow Vault Status */}
            <div className="p-5 bg-emerald-900 text-white rounded-3xl shadow-md space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Lock className="w-4 h-4 text-emerald-300" />
                  <h3 className="font-bold text-sm">Your Protected Escrow Vault</h3>
                </div>
                <span className="px-2 py-0.5 bg-emerald-800 text-emerald-200 text-[10px] font-bold rounded-md">
                  Active
                </span>
              </div>

              <div>
                <span className="text-xs text-emerald-200 block">Funds Currently Locked in Transit:</span>
                <div className="text-3xl font-black text-white mt-1">₹{user.escrowLockedBalance}</div>
                <p className="text-[11px] text-emerald-200 mt-2 leading-relaxed">
                  These funds will be credited to service providers or local merchants only when you share your secret completion OTP.
                </p>
              </div>
            </div>
          </div>

          {/* Transactions list */}
          <div className="bg-white rounded-3xl border border-stone-200 p-5 shadow-2xs space-y-3">
            <h3 className="font-bold text-stone-900 text-sm">Escrow Transaction History</h3>
            <div className="space-y-2 text-xs">
              {transactions.map((tx) => (
                <div
                  key={tx.id}
                  className="p-3 bg-stone-50 rounded-2xl flex items-center justify-between"
                >
                  <div>
                    <span className="font-bold text-stone-900">{tx.title}</span>
                    <p className="text-[11px] text-stone-500">{tx.description}</p>
                    <div className="text-[10px] text-stone-400 mt-0.5">
                      {tx.id} • {tx.date}
                    </div>
                  </div>
                  <div className="text-right">
                    <span
                      className={`font-black text-sm ${
                        tx.amount > 0 ? "text-emerald-700" : "text-stone-900"
                      }`}
                    >
                      {tx.amount > 0 ? "+" : ""}₹{Math.abs(tx.amount)}
                    </span>
                    <span className="block text-[10px] uppercase font-bold text-stone-500">
                      {tx.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 2. MY ACTIVITY (Wishlist, Shared, Followed Shops) */}
      {activeSection === "activity" && (
        <div className="space-y-6">
          {/* Wishlist */}
          <div className="bg-white rounded-3xl border border-stone-200 p-5 shadow-2xs space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Heart className="w-4 h-4 text-red-500" />
                <h3 className="font-bold text-sm text-stone-900">
                  Wishlist ({wishlistedProducts.length} Items)
                </h3>
              </div>
            </div>

            {wishlistedProducts.length === 0 ? (
              <p className="text-xs text-stone-500">No items saved yet. Browse market to add items.</p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {wishlistedProducts.map((p) => (
                  <div
                    key={p.id}
                    className="p-3 bg-stone-50 rounded-2xl border border-stone-200 flex items-center gap-3 text-xs"
                  >
                    <img src={p.imageUrl} alt={p.name} className="w-12 h-12 rounded-xl object-cover" />
                    <div>
                      <div className="font-bold text-stone-900">{p.name}</div>
                      <div className="text-emerald-800 font-extrabold">₹{p.price}</div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Followed Shops */}
          <div className="bg-white rounded-3xl border border-stone-200 p-5 shadow-2xs space-y-3">
            <div className="flex items-center gap-2">
              <Store className="w-4 h-4 text-purple-600" />
              <h3 className="font-bold text-sm text-stone-900">Followed Local Shops & Mandis</h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              {followedShops.map((shop) => (
                <div
                  key={shop.id}
                  className="p-4 bg-stone-50 rounded-2xl border border-stone-200 flex items-center justify-between"
                >
                  <div>
                    <h4 className="font-bold text-stone-900">{shop.name}</h4>
                    <span className="text-[11px] text-stone-500">
                      By {shop.owner} • {shop.ward}
                    </span>
                    <div className="text-[10px] text-purple-700 font-semibold mt-1">
                      ⭐ {shop.rating} • {shop.productsCount} catalog items
                    </div>
                  </div>
                  <button
                    onClick={() => setActiveTab("market")}
                    className="px-3 py-1.5 bg-white border border-stone-300 rounded-xl font-bold text-stone-700 hover:bg-stone-100"
                  >
                    Visit Shop
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 3. REFER & EARN */}
      {activeSection === "refer" && (
        <div className="bg-gradient-to-br from-amber-500 via-amber-600 to-emerald-700 text-white rounded-3xl p-6 shadow-xl space-y-4">
          <div className="max-w-md">
            <span className="px-2.5 py-0.5 rounded-full bg-white/20 text-xs font-bold text-amber-100 mb-2 inline-block">
              Vernacular Community Growth
            </span>
            <h2 className="text-2xl font-black">Refer Neighbors & Local Workers</h2>
            <p className="text-xs text-amber-100 mt-1 leading-relaxed">
              Earn ₹50 direct UPI cashback for each neighbor you invite or local technician (plumber, electrician) you onboard to GraminSeva.
            </p>
          </div>

          <div className="p-4 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 flex items-center justify-between max-w-sm">
            <div>
              <span className="text-[10px] uppercase font-bold text-amber-200 block">Your Referral Code</span>
              <span className="font-mono text-xl font-black text-white">GRAMIN50</span>
            </div>
            <button
              onClick={() => {
                navigator.clipboard?.writeText("GRAMIN50");
                speakText("Referral code copied! Share on WhatsApp.");
              }}
              className="px-4 py-2 bg-white text-stone-950 rounded-xl font-bold text-xs hover:bg-amber-100"
            >
              Copy Code
            </button>
          </div>

          <div className="pt-2">
            <button
              onClick={() => speakText("Opening WhatsApp to share referral code with neighbors.")}
              className="px-5 py-2.5 bg-emerald-950 text-white rounded-xl text-xs font-bold flex items-center gap-2 hover:bg-black"
            >
              <Share2 className="w-4 h-4 text-emerald-400" />
              <span>Share via WhatsApp to Ward Contacts</span>
            </button>
          </div>
        </div>
      )}

      {/* 4. HELP CENTER */}
      {activeSection === "help" && (
        <div className="bg-white rounded-3xl border border-stone-200 p-6 shadow-2xs space-y-6">
          <div>
            <h3 className="text-base font-bold text-stone-900">GraminSeva Help & Dispute Resolution</h3>
            <p className="text-xs text-stone-500">
              Immediate vernacular assistance for bookings, UPI Escrow releases, and service quality
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
            <div className="p-4 bg-stone-50 rounded-2xl border border-stone-200">
              <Phone className="w-4 h-4 text-emerald-700 mb-2" />
              <h4 className="font-bold text-stone-900">Ward Officer Support</h4>
              <p className="text-stone-500 text-[11px] mt-0.5">Toll-Free Helpline: 1800-419-7382</p>
            </div>
            <div className="p-4 bg-stone-50 rounded-2xl border border-stone-200">
              <Lock className="w-4 h-4 text-blue-700 mb-2" />
              <h4 className="font-bold text-stone-900">Escrow Dispute Protection</h4>
              <p className="text-stone-500 text-[11px] mt-0.5">Money safely held until OTP is confirmed</p>
            </div>
            <div className="p-4 bg-stone-50 rounded-2xl border border-stone-200">
              <CheckCircle2 className="w-4 h-4 text-amber-700 mb-2" />
              <h4 className="font-bold text-stone-900">4% Low Commission Rule</h4>
              <p className="text-stone-500 text-[11px] mt-0.5">Zero hidden fees for customers & workers</p>
            </div>
          </div>
        </div>
      )}

      {/* 5. SETTINGS & LEGAL */}
      {activeSection === "settings" && (
        <div className="bg-white rounded-3xl border border-stone-200 p-6 shadow-2xs space-y-4 text-xs">
          <h3 className="text-base font-bold text-stone-900">Settings, Policy & Legal</h3>

          <div className="space-y-3">
            <div className="p-4 bg-stone-50 rounded-2xl flex items-center justify-between">
              <div>
                <span className="font-bold text-stone-900">Change Application Language</span>
                <p className="text-[11px] text-stone-500">Telugu, Hindi, English, Kannada, Tamil</p>
              </div>
              <button
                onClick={() => setShowLanguageModal(true)}
                className="px-3 py-1.5 bg-white border border-stone-300 rounded-xl font-semibold"
              >
                Change
              </button>
            </div>

            <div className="p-4 bg-stone-50 rounded-2xl">
              <span className="font-bold text-stone-900">Terms & Conditions (Low-Commission Charter)</span>
              <p className="text-[11px] text-stone-500 mt-1 leading-relaxed">
                GraminSeva is legally committed to keeping the platform commission capped at 4% for local service providers, contrasting with 25-30% urban corporate platforms. All customer payments are processed strictly through UPI Escrow under RBI guidelines.
              </p>
            </div>

            <div className="p-4 bg-stone-50 rounded-2xl">
              <span className="font-bold text-stone-900">Privacy Policy (Identity Verification)</span>
              <p className="text-[11px] text-stone-500 mt-1 leading-relaxed">
                Aadhaar card details and police verification documents are encrypted end-to-end and stored in adherence to DPDP Act 2023. No private contact numbers are revealed to third parties.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
