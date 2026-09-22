import React, { useState } from "react";
import { AlertCircle, CheckCircle2, ShieldCheck, Sparkles, Wrench, X, ArrowRight, Loader2 } from "lucide-react";
import { useApp } from "../context/AppContext";
import { SERVICE_CATEGORIES } from "../data/mockData";
import { ServiceCategory } from "../types";

export const AiPriceEstimatorModal: React.FC = () => {
  const {
    isAiEstimatorOpen,
    setIsAiEstimatorOpen,
    setSelectedCategoryForBooking,
    setIsBookingModalOpen,
    speakText,
  } = useApp();

  const [selectedCategory, setSelectedCategory] = useState<ServiceCategory>(SERVICE_CATEGORIES[0]);
  const [problemDescription, setProblemDescription] = useState(
    "Tap leaking continuously and low pressure in bathroom pipe line."
  );
  const [isLoading, setIsLoading] = useState(false);
  const [estimateResult, setEstimateResult] = useState<{
    estimatedMin: number;
    estimatedMax: number;
    recommendedPrice: number;
    laborCharge: number;
    partsEstimateMin: number;
    partsEstimateMax: number;
    estimatedDurationMinutes: number;
    commonPartsNeeded: string[];
    fairPriceExplanation: string;
    vernacularTip: string;
    source?: string;
  } | null>({
    estimatedMin: 250,
    estimatedMax: 450,
    recommendedPrice: 320,
    laborCharge: 180,
    partsEstimateMin: 70,
    partsEstimateMax: 200,
    estimatedDurationMinutes: 45,
    commonPartsNeeded: ["Teflon tape", "Brass spindle / washer", "PVC connector pipe"],
    fairPriceExplanation:
      "Calculated using Tier-2 standardized labor rates. No predatory 30% urban markups. Worker receives 96% of the fee.",
    vernacularTip: "గ్రామీణ సేవా కమిషన్ కేవలం 4% మాత్రమే. మోసాలు లేకుండా సురక్షితమైన UPI ఎస్క్రో పేమెంట్.",
    source: "local-benchmark",
  });

  if (!isAiEstimatorOpen) return null;

  const handleCalculateEstimate = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const res = await fetch("/api/ai/estimate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          serviceType: selectedCategory.name,
          problemDescription,
          townTier: "Tier-2",
        }),
      });
      const json = await res.json();
      if (json?.data) {
        setEstimateResult(json.data);
        speakText(
          `Estimated fair cost for ${selectedCategory.name} is ₹${json.data.recommendedPrice}.`
        );
      }
    } catch (err) {
      console.warn("Estimator error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleBookWithEstimate = () => {
    setSelectedCategoryForBooking(selectedCategory);
    setIsAiEstimatorOpen(false);
    setIsBookingModalOpen(true);
  };

  return (
    <div
      id="ai-price-estimator-overlay"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-in fade-in duration-200"
    >
      <div
        id="ai-price-estimator-card"
        className="w-full max-w-xl bg-white rounded-3xl shadow-2xl border border-stone-200 overflow-hidden max-h-[90vh] flex flex-col"
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-amber-700 via-emerald-800 to-teal-900 text-white p-6 relative">
          <button
            id="close-ai-estimator-btn"
            onClick={() => setIsAiEstimatorOpen(false)}
            className="absolute top-4 right-4 p-2 rounded-full hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-2 mb-1">
            <Sparkles className="w-5 h-5 text-amber-300" />
            <h3 className="text-xl font-bold">AI Upfront Price Estimator</h3>
          </div>
          <p className="text-xs text-amber-100">
            Transparent Tier-2 town price benchmarking. Prevents customer price gouging & guarantees fair gig wages.
          </p>
        </div>

        {/* Content body */}
        <div className="p-6 overflow-y-auto space-y-6">
          <form onSubmit={handleCalculateEstimate} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-2">
                1. Select Service Type
              </label>
              <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                {SERVICE_CATEGORIES.slice(0, 6).map((cat) => (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => {
                      setSelectedCategory(cat);
                      setProblemDescription(`Repairs and service needed for ${cat.name}`);
                    }}
                    className={`p-2.5 rounded-xl border text-center transition-all ${
                      selectedCategory.id === cat.id
                        ? "border-emerald-600 bg-emerald-50 text-emerald-900 font-bold shadow-xs ring-1 ring-emerald-600"
                        : "border-stone-200 hover:border-stone-300 text-stone-700 text-xs"
                    }`}
                  >
                    <div className="text-xs">{cat.name.split(" ")[0]}</div>
                    <div className="text-[10px] text-stone-500 font-normal">{cat.teluguName.split(" ")[0]}</div>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                2. Describe the Issue
              </label>
              <textarea
                rows={2}
                value={problemDescription}
                onChange={(e) => setProblemDescription(e.target.value)}
                placeholder="E.g. Tap leaking continuously, ceiling fan regulator not changing speed..."
                className="w-full text-xs p-3 rounded-xl border border-stone-300 focus:outline-hidden focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 resize-none"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold rounded-xl shadow-xs transition-colors flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Calculating Standard Tier-2 Benchmark...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 text-amber-300" />
                  <span>Calculate Upfront Fair Price</span>
                </>
              )}
            </button>
          </form>

          {/* Results display */}
          {estimateResult && (
            <div className="p-5 bg-stone-50 border border-emerald-200 rounded-2xl space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-stone-200">
                <div>
                  <span className="text-xs font-semibold text-stone-500">Fair Upfront Benchmark</span>
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl font-black text-stone-900">
                      ₹{estimateResult.recommendedPrice}
                    </span>
                    <span className="text-xs text-stone-500">
                      (Range: ₹{estimateResult.estimatedMin} - ₹{estimateResult.estimatedMax})
                    </span>
                  </div>
                </div>
                <div className="px-3 py-1 bg-emerald-100 text-emerald-800 text-xs font-bold rounded-full flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Escrow Locked</span>
                </div>
              </div>

              {/* Breakdown */}
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="p-3 bg-white rounded-xl border border-stone-200">
                  <span className="text-stone-500 block">Worker Labor Wage</span>
                  <span className="text-sm font-bold text-stone-900">₹{estimateResult.laborCharge}</span>
                  <span className="text-[10px] text-stone-400 block mt-0.5">
                    Est. {estimateResult.estimatedDurationMinutes} mins work
                  </span>
                </div>

                <div className="p-3 bg-white rounded-xl border border-stone-200">
                  <span className="text-stone-500 block">Estimated Parts & Spares</span>
                  <span className="text-sm font-bold text-stone-900">
                    ₹{estimateResult.partsEstimateMin} - ₹{estimateResult.partsEstimateMax}
                  </span>
                  <span className="text-[10px] text-stone-400 block mt-0.5">Verified MRP only</span>
                </div>
              </div>

              {/* Common Spares */}
              {estimateResult.commonPartsNeeded?.length > 0 && (
                <div>
                  <span className="text-[11px] font-bold text-stone-600 block mb-1">
                    Standard Parts Expected:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {estimateResult.commonPartsNeeded.map((part, idx) => (
                      <span
                        key={idx}
                        className="text-[11px] px-2.5 py-1 bg-white border border-stone-200 text-stone-700 rounded-lg"
                      >
                        {part}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Vernacular trust guarantee */}
              <div className="p-3 bg-emerald-50/70 border border-emerald-200 rounded-xl text-xs text-emerald-900 flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                <p className="leading-relaxed">
                  <strong>Zero Price Gouging Policy:</strong> Platform fee is only 4%. The full ₹
                  {estimateResult.recommendedPrice} is kept safely in your UPI Escrow account and released only when you share your secret completion OTP.
                </p>
              </div>

              {/* Action Button */}
              <button
                type="button"
                id="book-estimate-now-btn"
                onClick={handleBookWithEstimate}
                className="w-full py-3 bg-stone-900 hover:bg-black text-white text-xs font-bold rounded-xl shadow-md transition-colors flex items-center justify-center gap-2"
              >
                <span>Book {selectedCategory.name} with this Estimate</span>
                <ArrowRight className="w-4 h-4 text-amber-300" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
