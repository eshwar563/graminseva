import React, { useState } from "react";
import {
  AlertTriangle,
  Heart,
  MapPin,
  Mic,
  Phone,
  Search,
  ShieldCheck,
  Sparkles,
  Star,
  Store,
  Wrench,
  CheckCircle2,
  Lock,
  ArrowRight,
} from "lucide-react";
import { useApp } from "../context/AppContext";
import { SERVICE_CATEGORIES } from "../data/mockData";
import { Product, ServiceCategory, ServiceProvider } from "../types";

export const CustomerDashboard: React.FC = () => {
  const {
    language,
    user,
    providers,
    products,
    setSelectedCategoryForBooking,
    setIsBookingModalOpen,
    setIsAiEstimatorOpen,
    setIsIvrModalOpen,
    setIsVoiceModalOpen,
    buyProduct,
    toggleWishlist,
    setActiveTab,
    setCurrentRole,
    t,
    speakText,
  } = useApp();

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState<string>("all");
  const [buyingProduct, setBuyingProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState<number>(1);
  const [deliveryAddress, setDeliveryAddress] = useState<string>(user.ward);

  // Filter providers and products based on search & category
  const filteredCategories = SERVICE_CATEGORIES.filter((cat) => {
    if (selectedCategoryFilter === "all") return true;
    return cat.id === selectedCategoryFilter;
  });

  const filteredProviders = providers.filter((p) => {
    const matchesSearch =
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.specialization.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategoryFilter === "all" || p.category === selectedCategoryFilter;
    return matchesSearch && matchesCategory;
  });

  const filteredProducts = products.filter((prod) => {
    const matchesSearch =
      prod.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      prod.teluguName.includes(searchQuery) ||
      prod.hindiName.includes(searchQuery) ||
      prod.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategoryFilter === "all" || prod.category === selectedCategoryFilter;
    return matchesSearch && matchesCategory;
  });

  const handleCategoryClick = (cat: ServiceCategory) => {
    if (cat.id === "emergency") {
      setActiveTab("emergency_desk");
    } else {
      setSelectedCategoryForBooking(cat);
      setIsBookingModalOpen(true);
    }
  };

  const handleQuickBookProvider = (provider: ServiceProvider) => {
    const cat = SERVICE_CATEGORIES.find((c) => c.id === provider.category) || SERVICE_CATEGORIES[0];
    setSelectedCategoryForBooking(cat);
    setIsBookingModalOpen(true);
  };

  const handleConfirmProductBuy = (e: React.FormEvent) => {
    e.preventDefault();
    if (!buyingProduct) return;
    buyProduct(buyingProduct, quantity, deliveryAddress);
    setBuyingProduct(null);
    setQuantity(1);
  };

  return (
    <div id="customer-dashboard-container" className="space-y-8 pb-12">
      {/* Hero Vernacular Banner */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-900 via-emerald-800 to-teal-900 text-white p-6 sm:p-8 shadow-xl">
        <div className="relative z-10 max-w-2xl">
          {user.name && user.name.trim() ? (
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400 text-stone-950 text-xs font-black mb-3 shadow-xs">
              <span>
                {language === "te"
                  ? `నమస్కారం, ${user.name}!`
                  : language === "hi"
                  ? `नमस्ते, ${user.name}!`
                  : language === "kn"
                  ? `ನಮಸ್ಕಾರ, ${user.name}!`
                  : language === "ta"
                  ? `வணக்கம், ${user.name}!`
                  : `Welcome, ${user.name}!`}
              </span>
            </div>
          ) : (
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-700/60 border border-emerald-500/40 text-xs font-semibold text-emerald-200 mb-3">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-300" />
              <span>Tier-2 & Tier-3 Verified Local Network</span>
            </div>
          )}

          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight mb-2">
            {t("tagline")}
          </h1>
          <p className="text-xs sm:text-sm text-emerald-100 leading-relaxed mb-6">
            Connecting nearby verified plumbers, electricians, technicians, and local dairy/mandi sellers with 100% UPI Escrow protection and upfront fair price estimation.
          </p>

          <div className="flex flex-wrap items-center gap-2.5">
            <button
              id="hero-voice-search-btn"
              onClick={() => setIsVoiceModalOpen(true)}
              className="px-4 py-2.5 bg-amber-400 hover:bg-amber-300 text-stone-950 text-xs font-extrabold rounded-xl shadow-md flex items-center gap-2 transition-transform hover:scale-102"
            >
              <Mic className="w-4 h-4 text-stone-900" />
              <span>Voice Control / మాట్లాడండి</span>
            </button>

            <button
              id="hero-ai-estimate-btn"
              onClick={() => setIsAiEstimatorOpen(true)}
              className="px-4 py-2.5 bg-white/10 hover:bg-white/20 text-white text-xs font-bold rounded-xl border border-white/20 flex items-center gap-2 transition-colors"
            >
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span>AI Upfront Price Estimator</span>
            </button>

            <button
              id="hero-ivr-btn"
              onClick={() => setIsIvrModalOpen(true)}
              className="px-3 py-2.5 bg-emerald-950/70 hover:bg-emerald-950 text-emerald-200 text-xs font-semibold rounded-xl border border-emerald-700 flex items-center gap-2 transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-emerald-400" />
              <span>WhatsApp / IVR Mode</span>
            </button>
          </div>
        </div>

        {/* Decorative badge */}
        <div className="hidden lg:block absolute right-8 bottom-6 max-w-xs p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 text-xs">
          <div className="flex items-center gap-2 text-amber-300 font-bold mb-1">
            <Lock className="w-4 h-4" />
            <span>Escrow Guarantee</span>
          </div>
          <p className="text-[11px] text-stone-200">
            Payment is never released upfront. Funds remain locked until you share your secret 4-digit OTP after verified service.
          </p>
        </div>
      </section>

      {/* Search & Ward Filter Bar */}
      <section className="flex flex-col sm:flex-row items-center gap-3">
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-3.5" />
          <input
            id="market-search-input"
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search plumber, electrician, fresh cow milk, tomatoes, xerox, laundry..."
            className="w-full text-xs pl-10 pr-12 py-3 rounded-2xl bg-white border border-stone-200 shadow-2xs focus:outline-hidden focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600"
          />
          <button
            type="button"
            onClick={() => setIsVoiceModalOpen(true)}
            className="absolute right-3 top-2.5 p-1 rounded-lg text-emerald-700 hover:bg-emerald-50"
            title="Search with Voice"
          >
            <Mic className="w-4 h-4" />
          </button>
        </div>

        {/* Category quick filter pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
          <button
            onClick={() => setSelectedCategoryFilter("all")}
            className={`px-3 py-2 text-xs font-bold rounded-xl shrink-0 transition-colors ${
              selectedCategoryFilter === "all"
                ? "bg-stone-900 text-white"
                : "bg-white border border-stone-200 text-stone-700 hover:bg-stone-50"
            }`}
          >
            All Services & Goods
          </button>
          {SERVICE_CATEGORIES.slice(0, 5).map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategoryFilter(cat.id)}
              className={`px-3 py-2 text-xs font-semibold rounded-xl shrink-0 transition-colors ${
                selectedCategoryFilter === cat.id
                  ? "bg-emerald-700 text-white"
                  : "bg-white border border-stone-200 text-stone-700 hover:bg-stone-50"
              }`}
            >
              {cat.name.split(" ")[0]}
            </button>
          ))}
        </div>
      </section>

      {/* Categories Grid */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-lg font-extrabold text-stone-900">{t("categories")}</h2>
            <p className="text-xs text-stone-500">Tap to book instantly with nearby verified providers</p>
          </div>
          <button
            onClick={() => setIsAiEstimatorOpen(true)}
            className="text-xs font-bold text-emerald-700 hover:text-emerald-800 flex items-center gap-1"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>Check Fair Cost</span>
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5">
          {filteredCategories.map((cat) => (
            <button
              key={cat.id}
              id={`cat-card-${cat.id}`}
              onClick={() => handleCategoryClick(cat)}
              className="p-4 rounded-2xl bg-white border border-stone-200 hover:border-emerald-500 hover:shadow-md transition-all text-left group flex flex-col justify-between"
            >
              <div>
                <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold text-lg mb-3 group-hover:bg-emerald-700 group-hover:text-white transition-colors">
                  {cat.id === "plumbing" && "🔧"}
                  {cat.id === "electrical" && "⚡"}
                  {cat.id === "emergency" && "🚨"}
                  {cat.id === "cleaning" && "✨"}
                  {cat.id === "appliance" && "📺"}
                  {cat.id === "laundry" && "👔"}
                  {cat.id === "dairy" && "🥛"}
                  {cat.id === "stationery" && "📚"}
                  {cat.id === "veggies" && "🥦"}
                </div>
                <h3 className="font-bold text-stone-900 text-xs sm:text-sm line-clamp-1">{cat.name}</h3>
                <p className="text-[11px] text-stone-500 line-clamp-1 mt-0.5">{cat.teluguName}</p>
              </div>

              <div className="mt-3 pt-2.5 border-t border-stone-100 flex items-center justify-between text-[11px]">
                <span className="text-stone-400">
                  {cat.baseStartingPrice > 0 ? `From ₹${cat.baseStartingPrice}` : "Free 24x7"}
                </span>
                <span className="font-bold text-emerald-700 group-hover:translate-x-0.5 transition-transform">
                  Book →
                </span>
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* Verified Local Gig Workers (Plumbers, Electricians, Dhobis) */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-extrabold text-stone-900">{t("verifiedProviders")}</h2>
              <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 text-[10px] font-bold rounded-md">
                Near Ward 14
              </span>
            </div>
            <p className="text-xs text-stone-500">
              Matched by lightweight dispatch engine based on distance and community trust score
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredProviders.map((provider) => (
            <div
              key={provider.id}
              id={`provider-card-${provider.id}`}
              className="p-5 rounded-2xl bg-white border border-stone-200 hover:border-emerald-300 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="flex items-center gap-3">
                    <img
                      src={provider.photoUrl}
                      alt={provider.name}
                      className="w-14 h-14 rounded-2xl object-cover border border-stone-200"
                      referrerPolicy="no-referrer"
                    />
                    <div>
                      <div className="flex items-center gap-1.5">
                        <h4 className="font-bold text-stone-900 text-sm">{provider.name}</h4>
                      </div>
                      <p className="text-xs font-semibold text-emerald-700 capitalize">
                        {provider.category} Specialist
                      </p>
                      <div className="flex items-center gap-2 text-[11px] text-stone-500 mt-0.5">
                        <span className="flex items-center gap-0.5 text-amber-600 font-bold">
                          <Star className="w-3 h-3 fill-amber-500" />
                          <span>{provider.rating}</span>
                        </span>
                        <span>({provider.reviewCount} reviews)</span>
                        <span>•</span>
                        <span className="text-stone-700 font-medium">📍 {provider.distanceKm} km</span>
                      </div>
                    </div>
                  </div>

                  {/* Trust Score badge */}
                  <div className="text-right">
                    <span className="text-[10px] uppercase font-bold text-stone-400 block">Trust</span>
                    <span className="text-sm font-black text-emerald-700">{provider.trustScore}%</span>
                  </div>
                </div>

                <p className="text-xs text-stone-600 line-clamp-2 mb-3">
                  {provider.specialization}
                </p>

                {/* Identity Badges */}
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {provider.aadhaarVerified && (
                    <span className="text-[10px] px-2 py-0.5 rounded-md bg-stone-100 text-stone-700 font-medium flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                      <span>Govt ID Verified</span>
                    </span>
                  )}
                  {provider.policeVerified && (
                    <span className="text-[10px] px-2 py-0.5 rounded-md bg-stone-100 text-stone-700 font-medium flex items-center gap-1">
                      <ShieldCheck className="w-3 h-3 text-blue-600" />
                      <span>Police Cleared</span>
                    </span>
                  )}
                  <span className="text-[10px] px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-800 font-bold">
                    4% Low Commission
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-3 border-t border-stone-100 flex items-center gap-2">
                <a
                  href={`tel:${provider.phone}`}
                  className="p-2.5 rounded-xl border border-stone-300 hover:bg-stone-50 text-stone-700 transition-colors"
                  title="Call Directly"
                >
                  <Phone className="w-4 h-4" />
                </a>
                <button
                  type="button"
                  id={`book-prov-${provider.id}`}
                  onClick={() => handleQuickBookProvider(provider)}
                  className="flex-1 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs rounded-xl shadow-xs transition-colors flex items-center justify-center gap-1.5"
                >
                  <Wrench className="w-3.5 h-3.5" />
                  <span>Book with Escrow (₹{provider.hourlyRate})</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Local Merchant Marketplace (Meesho-Style: Any user can buy or sell) */}
      <section className="pt-4">
        <div className="flex items-center justify-between mb-4">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-extrabold text-stone-900">{t("localProducts")}</h2>
              <span className="px-2 py-0.5 bg-purple-100 text-purple-800 text-[10px] font-bold rounded-md">
                Meesho Model
              </span>
            </div>
            <p className="text-xs text-stone-500">
              Fresh farm vegetables, dairy cow milk, notebooks, xerox & local laundry directly from ward sellers
            </p>
          </div>

          <button
            onClick={() => {
              setCurrentRole("seller");
              setActiveTab("seller_portal");
            }}
            className="px-3 py-1.5 bg-purple-50 text-purple-800 hover:bg-purple-100 border border-purple-200 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors"
          >
            <Store className="w-3.5 h-3.5" />
            <span>Sell Your Goods / దుకాణం తెరవండి</span>
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredProducts.map((product) => {
            const isWishlisted = user.wishlist.includes(product.id);
            return (
              <div
                key={product.id}
                id={`product-card-${product.id}`}
                className="rounded-2xl bg-white border border-stone-200 overflow-hidden hover:shadow-md transition-all flex flex-col justify-between group"
              >
                <div className="relative">
                  <img
                    src={product.imageUrl}
                    alt={product.name}
                    className="w-full h-36 object-cover group-hover:scale-103 transition-transform duration-300"
                    referrerPolicy="no-referrer"
                  />
                  <button
                    type="button"
                    onClick={() => toggleWishlist(product.id)}
                    className="absolute top-2 right-2 p-1.5 rounded-full bg-white/80 hover:bg-white text-stone-700 shadow-xs transition-colors"
                  >
                    <Heart
                      className={`w-3.5 h-3.5 ${
                        isWishlisted ? "fill-red-500 text-red-500" : "text-stone-600"
                      }`}
                    />
                  </button>
                  {product.isFresh && (
                    <span className="absolute bottom-2 left-2 px-2 py-0.5 rounded-md bg-emerald-600 text-white text-[10px] font-bold shadow-xs">
                      Farm Fresh
                    </span>
                  )}
                </div>

                <div className="p-3.5 flex flex-col justify-between flex-1">
                  <div>
                    <h4 className="font-bold text-stone-900 text-xs sm:text-sm line-clamp-1">
                      {product.name}
                    </h4>
                    <p className="text-[11px] text-stone-500 line-clamp-1">{product.teluguName}</p>
                    <div className="text-[10px] text-stone-400 mt-1">
                      By {product.sellerName.split(" ")[0]} • {product.sellerWard}
                    </div>

                    <div className="mt-2 flex items-baseline gap-1.5">
                      <span className="text-base font-extrabold text-stone-900">₹{product.price}</span>
                      <span className="text-[10px] text-stone-500 font-medium">/{product.unit}</span>
                    </div>
                  </div>

                  <div className="mt-3 pt-2 border-t border-stone-100 flex items-center justify-between gap-2">
                    <span className="text-[10px] text-emerald-700 font-bold">
                      {product.stock > 0 ? `${product.stock} in stock` : "Out of stock"}
                    </span>
                    <button
                      type="button"
                      onClick={() => setBuyingProduct(product)}
                      className="px-3 py-1.5 bg-stone-900 hover:bg-black text-white text-xs font-bold rounded-lg transition-colors"
                    >
                      Buy Now
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Instant Product Checkout Modal */}
      {buyingProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-in fade-in duration-200">
          <div className="w-full max-w-sm bg-white rounded-3xl p-6 shadow-2xl border border-stone-200 space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-stone-100">
              <h3 className="font-bold text-base text-stone-900">Confirm Order</h3>
              <button
                onClick={() => setBuyingProduct(null)}
                className="p-1 rounded-full text-stone-400 hover:text-stone-700"
              >
                ✕
              </button>
            </div>

            <div className="flex items-center gap-3">
              <img
                src={buyingProduct.imageUrl}
                alt={buyingProduct.name}
                className="w-16 h-16 rounded-xl object-cover"
                referrerPolicy="no-referrer"
              />
              <div>
                <h4 className="font-bold text-xs text-stone-900">{buyingProduct.name}</h4>
                <p className="text-[11px] text-stone-500">{buyingProduct.teluguName}</p>
                <div className="text-xs font-extrabold text-emerald-800 mt-1">
                  ₹{buyingProduct.price} / {buyingProduct.unit}
                </div>
              </div>
            </div>

            <form onSubmit={handleConfirmProductBuy} className="space-y-3 text-xs">
              <div>
                <label className="block font-medium text-stone-600 mb-1">Quantity</label>
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="w-8 h-8 rounded-lg border border-stone-300 font-bold flex items-center justify-center"
                  >
                    -
                  </button>
                  <span className="font-bold text-sm">{quantity}</span>
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => q + 1)}
                    className="w-8 h-8 rounded-lg border border-stone-300 font-bold flex items-center justify-center"
                  >
                    +
                  </button>
                  <span className="text-stone-500">
                    Total: <strong className="text-stone-900">₹{buyingProduct.price * quantity}</strong>
                  </span>
                </div>
              </div>

              <div>
                <label className="block font-medium text-stone-600 mb-1">Delivery Address</label>
                <input
                  type="text"
                  value={deliveryAddress}
                  onChange={(e) => setDeliveryAddress(e.target.value)}
                  className="w-full text-xs p-2 rounded-lg border border-stone-300"
                  required
                />
              </div>

              <div className="p-3 bg-emerald-50 rounded-xl text-[11px] text-emerald-900 flex items-start gap-2 border border-emerald-200">
                <Lock className="w-3.5 h-3.5 text-emerald-700 shrink-0 mt-0.5" />
                <p>
                  ₹{buyingProduct.price * quantity} will be held safely in UPI Escrow until delivery OTP is verified.
                </p>
              </div>

              <button
                type="submit"
                className="w-full py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white font-bold rounded-xl shadow-xs transition-colors"
              >
                Pay via UPI Escrow & Confirm
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
