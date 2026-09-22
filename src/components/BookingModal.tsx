import React, { useState } from "react";
import {
  Camera,
  CheckCircle2,
  Mic,
  MicOff,
  ShieldCheck,
  Upload,
  X,
  Lock,
  ArrowRight,
} from "lucide-react";
import { useApp } from "../context/AppContext";

export const BookingModal: React.FC = () => {
  const {
    isBookingModalOpen,
    setIsBookingModalOpen,
    selectedCategoryForBooking,
    user,
    providers,
    addNewBooking,
    speakText,
  } = useApp();

  const [issueTitle, setIssueTitle] = useState("");
  const [problemDescription, setProblemDescription] = useState("");
  const [address, setAddress] = useState(user.ward + ", Subedari");
  const [isRecordingVoice, setIsRecordingVoice] = useState(false);
  const [voiceNoteRecorded, setVoiceNoteRecorded] = useState(false);
  const [uploadedImageUrl, setUploadedImageUrl] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isBookingModalOpen || !selectedCategoryForBooking) return null;

  const relevantProviders = providers.filter(
    (p) => p.category === selectedCategoryForBooking.id
  );
  const assignedProvider = relevantProviders[0] || providers[0];

  const upfrontPrice = selectedCategoryForBooking.baseStartingPrice > 0
    ? selectedCategoryForBooking.baseStartingPrice + 120
    : 280;

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setUploadedImageUrl(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleVoiceToggle = () => {
    if (!isRecordingVoice) {
      setIsRecordingVoice(true);
      speakText("Recording your voice note. Explain your problem.");
      setTimeout(() => {
        setIsRecordingVoice(false);
        setVoiceNoteRecorded(true);
        if (!problemDescription) {
          setProblemDescription("Voice Note: 'బాత్‌రూమ్‌లో నీటి పైపు పగిలింది, వెంటనే రావాలి.'");
        }
      }, 3500);
    } else {
      setIsRecordingVoice(false);
      setVoiceNoteRecorded(true);
    }
  };

  const handleSubmitBooking = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    addNewBooking({
      serviceCategory: selectedCategoryForBooking.id,
      serviceName: selectedCategoryForBooking.name,
      issueTitle: issueTitle || `${selectedCategoryForBooking.name} Service Needed`,
      problemDescription: problemDescription || "Standard repair requested with upfront estimate.",
      customerAddress: address,
      providerId: assignedProvider.id,
      upfrontEstimate: {
        min: upfrontPrice - 80,
        max: upfrontPrice + 120,
        recommended: upfrontPrice,
        labor: Math.round(upfrontPrice * 0.65),
        parts: Math.round(upfrontPrice * 0.35),
      },
      photoUrl: uploadedImageUrl,
      voiceNoteUrl: voiceNoteRecorded ? "mock-voice-recording.webm" : undefined,
    });

    setIsSubmitting(false);
    setIsBookingModalOpen(false);
  };

  return (
    <div
      id="service-booking-modal-overlay"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-in fade-in duration-200"
    >
      <div
        id="service-booking-modal-card"
        className="w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-stone-200 overflow-hidden flex flex-col max-h-[90vh]"
      >
        {/* Header */}
        <div className="bg-emerald-800 text-white p-5 relative">
          <button
            id="close-booking-modal-btn"
            onClick={() => setIsBookingModalOpen(false)}
            className="absolute top-4 right-4 p-2 rounded-full hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xl">🛠️</span>
            <div>
              <h3 className="font-bold text-lg leading-tight">
                Book {selectedCategoryForBooking.name}
              </h3>
              <p className="text-xs text-emerald-200">{selectedCategoryForBooking.teluguName}</p>
            </div>
          </div>
          <p className="text-xs text-emerald-100 mt-1">
            Nearest verified professional matched automatically by GraminSeva dispatch engine.
          </p>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmitBooking} className="p-5 overflow-y-auto space-y-4 text-xs">
          {/* Assigned Provider preview */}
          {assignedProvider && (
            <div className="p-3 bg-stone-50 border border-stone-200 rounded-2xl flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img
                  src={assignedProvider.photoUrl}
                  alt={assignedProvider.name}
                  className="w-12 h-12 rounded-xl object-cover"
                  referrerPolicy="no-referrer"
                />
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="font-bold text-stone-900">{assignedProvider.name}</span>
                    <span className="px-1.5 py-0.5 bg-emerald-100 text-emerald-800 text-[10px] font-bold rounded-md flex items-center gap-0.5">
                      <ShieldCheck className="w-3 h-3" />
                      <span>{assignedProvider.trustScore}% Trust</span>
                    </span>
                  </div>
                  <div className="text-[11px] text-stone-500">
                    📍 {assignedProvider.distanceKm} km away • {assignedProvider.etaMinutes} mins ETA
                  </div>
                  <div className="text-[10px] text-emerald-700 font-semibold">
                    ✓ Aadhaar & Police Verified • {assignedProvider.completedJobs} jobs done
                  </div>
                </div>
              </div>
            </div>
          )}

          <div>
            <label className="block font-bold text-stone-700 mb-1">Issue Headline</label>
            <input
              type="text"
              value={issueTitle}
              onChange={(e) => setIssueTitle(e.target.value)}
              placeholder="E.g. Tap leaking continuously or switchboard smoking"
              className="w-full text-xs p-2.5 rounded-xl border border-stone-300 focus:outline-hidden focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600"
            />
          </div>

          <div>
            <label className="block font-bold text-stone-700 mb-1">
              Describe Problem (Or Record Voice Note)
            </label>
            <textarea
              rows={2}
              value={problemDescription}
              onChange={(e) => setProblemDescription(e.target.value)}
              placeholder="Brief description of the problem..."
              className="w-full text-xs p-2.5 rounded-xl border border-stone-300 focus:outline-hidden focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 resize-none"
            />

            {/* Voice Note Button for rural elders */}
            <div className="mt-2 flex items-center gap-2">
              <button
                type="button"
                onClick={handleVoiceToggle}
                className={`px-3 py-1.5 rounded-xl font-semibold flex items-center gap-1.5 transition-colors ${
                  isRecordingVoice
                    ? "bg-red-600 text-white animate-pulse"
                    : voiceNoteRecorded
                    ? "bg-emerald-100 text-emerald-800 border border-emerald-300"
                    : "bg-stone-100 text-stone-700 hover:bg-stone-200 border border-stone-300"
                }`}
              >
                {isRecordingVoice ? (
                  <>
                    <MicOff className="w-3.5 h-3.5" />
                    <span>Recording Voice Note...</span>
                  </>
                ) : voiceNoteRecorded ? (
                  <>
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700" />
                    <span>Voice Note Attached (3.5s)</span>
                  </>
                ) : (
                  <>
                    <Mic className="w-3.5 h-3.5 text-emerald-700" />
                    <span>Record Voice Note</span>
                  </>
                )}
              </button>
              <span className="text-[10px] text-stone-400">
                (Helpful if you prefer speaking instead of typing)
              </span>
            </div>
          </div>

          {/* Photo Capture / Upload */}
          <div>
            <label className="block font-bold text-stone-700 mb-1">
              Capture or Upload Photo of Problem
            </label>
            <div className="flex items-center gap-3">
              <label className="cursor-pointer px-3 py-2 bg-stone-100 hover:bg-stone-200 text-stone-700 rounded-xl border border-stone-300 flex items-center gap-1.5 font-medium transition-colors">
                <Camera className="w-4 h-4 text-stone-600" />
                <span>Take Photo / Upload</span>
                <input
                  type="file"
                  accept="image/*"
                  capture="environment"
                  onChange={handleImageChange}
                  className="hidden"
                />
              </label>

              {uploadedImageUrl && (
                <div className="relative">
                  <img
                    src={uploadedImageUrl}
                    alt="Problem attachment"
                    className="w-12 h-12 rounded-lg object-cover border border-stone-300"
                  />
                  <button
                    type="button"
                    onClick={() => setUploadedImageUrl("")}
                    className="absolute -top-1 -right-1 w-4 h-4 bg-red-600 text-white rounded-full text-[10px] flex items-center justify-center"
                  >
                    ×
                  </button>
                </div>
              )}
            </div>
          </div>

          <div>
            <label className="block font-bold text-stone-700 mb-1">Service Location / Address</label>
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full text-xs p-2.5 rounded-xl border border-stone-300 focus:outline-hidden focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600"
              required
            />
          </div>

          {/* Upfront Escrow Pricing Summary */}
          <div className="p-3.5 bg-emerald-50 border border-emerald-200 rounded-2xl space-y-2">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[10px] uppercase font-bold text-emerald-800">
                  Upfront Fair Benchmark
                </span>
                <div className="text-base font-extrabold text-stone-900">
                  ₹{upfrontPrice} <span className="text-[10px] text-stone-500 font-normal">(Locked in UPI Escrow)</span>
                </div>
              </div>
              <div className="text-right">
                <span className="text-[10px] text-stone-500 block">Platform Fee (4%)</span>
                <span className="text-xs font-bold text-emerald-800">₹{Math.round(upfrontPrice * 0.04)}</span>
              </div>
            </div>

            <div className="text-[11px] text-emerald-900 bg-white p-2.5 rounded-xl border border-emerald-100 flex items-start gap-2">
              <Lock className="w-3.5 h-3.5 text-emerald-700 shrink-0 mt-0.5" />
              <p>
                <strong>Escrow Guarantee:</strong> ₹{upfrontPrice} is locked in safe escrow. It is paid to {assignedProvider.name} ONLY after you enter the secret 4-digit completion OTP.
              </p>
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3 bg-emerald-700 hover:bg-emerald-800 text-white font-bold rounded-xl shadow-md transition-colors flex items-center justify-center gap-2"
          >
            <span>Confirm Booking & Lock ₹{upfrontPrice} Escrow</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
};
