import React, { useState } from "react";
import { Mic, MicOff, Sparkles, Volume2, X, Send } from "lucide-react";
import { useApp } from "../context/AppContext";

export const VoiceAssistantModal: React.FC = () => {
  const {
    isVoiceModalOpen,
    setIsVoiceModalOpen,
    isVoiceListening,
    startVoiceListening,
    stopVoiceListening,
    voiceTranscript,
    voiceFeedback,
    language,
    speakText,
  } = useApp();

  const [manualInput, setManualInput] = useState("");

  if (!isVoiceModalOpen) return null;

  const sampleVoiceCommands =
    language === "te"
      ? [
          "ప్లంబర్ కావాలి, బాత్‌రూమ్‌లో పైపు లీక్ అవుతోంది",
          "108 ఆసుపత్రి ఎమర్జెన్సీ లేదా క్లినిక్",
          "కరెంట్ వైరింగ్ మరియు ఫ్యాన్ రిపేర్",
          "తాజా దేశీ ఆవు పాలు ఆర్డర్ చేయండి",
          "కూరగాయలు అమ్మడానికి సెల్లర్ పేజీ తెరవండి",
          "నా ఆర్డర్లు చూపించండి",
        ]
      : language === "hi"
      ? [
          "नल ठीक करने वाला प्लंबर चाहिए",
          "108 अस्पताल इमरजेंसी या एम्बुलेंस",
          "बिजली मिस्त्री और पंखा रिपेयर",
          "ताजा देशी गाय का दूध चाहिए",
          "सब्जियां बेचने के लिए सेलर पेज खोलें",
          "मेरे पिछले ऑर्डर्स दिखाएं",
        ]
      : [
          "Need a plumber for leaking tap in bathroom",
          "Emergency hospital 108 ambulance",
          "Electrician for ceiling fan repair",
          "Order 1L fresh cow milk",
          "Open seller dashboard to sell veggies",
          "Show my active orders and bookings",
        ];

  const handleSimulatePrompt = (prompt: string) => {
    setManualInput(prompt);
    speakText(`Processing: ${prompt}`);
    // Simulate speech end trigger
    setTimeout(() => {
      const form = document.getElementById("voice-manual-submit-form") as HTMLFormElement;
      if (form) form.requestSubmit();
    }, 400);
  };

  const handleManualSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!manualInput.trim()) return;

    fetch("/api/ai/voice-intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ transcript: manualInput, language }),
    })
      .then((res) => res.json())
      .then((json) => {
        if (json?.data?.spokenResponse) {
          speakText(json.data.spokenResponse);
        }
      })
      .catch((err) => console.warn(err));

    setIsVoiceModalOpen(false);
    setManualInput("");
  };

  return (
    <div
      id="voice-assistant-overlay"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-in fade-in duration-200"
    >
      <div
        id="voice-assistant-modal"
        className="w-full max-w-md bg-white rounded-3xl shadow-2xl border border-stone-200 overflow-hidden"
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-emerald-800 to-teal-800 text-white p-6 relative">
          <button
            id="close-voice-modal-btn"
            onClick={() => {
              stopVoiceListening();
              setIsVoiceModalOpen(false);
            }}
            className="absolute top-4 right-4 p-2 rounded-full hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-2 mb-1">
            <Sparkles className="w-5 h-5 text-amber-300" />
            <h3 className="font-bold text-lg">Vernacular Voice Assistant</h3>
          </div>
          <p className="text-xs text-emerald-100">
            Speak naturally in Telugu, Hindi, or English to navigate and order anything.
          </p>
        </div>

        {/* Listening Circle / Visualizer */}
        <div className="p-8 flex flex-col items-center justify-center text-center">
          <div className="relative mb-6">
            {isVoiceListening && (
              <span className="absolute -inset-4 rounded-full bg-emerald-500/20 animate-ping" />
            )}
            <button
              id="voice-mic-toggle-btn"
              onClick={isVoiceListening ? stopVoiceListening : startVoiceListening}
              className={`relative z-10 w-24 h-24 rounded-full flex items-center justify-center transition-all shadow-lg ${
                isVoiceListening
                  ? "bg-red-600 text-white scale-105 shadow-red-500/30"
                  : "bg-emerald-600 text-white hover:bg-emerald-700 shadow-emerald-600/30"
              }`}
            >
              {isVoiceListening ? (
                <MicOff className="w-10 h-10 animate-pulse" />
              ) : (
                <Mic className="w-10 h-10" />
              )}
            </button>
          </div>

          <p className="text-sm font-semibold text-stone-800 mb-1">
            {isVoiceListening ? "Listening now... Speak your request" : "Tap the microphone to speak"}
          </p>
          <p className="text-xs text-stone-500 max-w-xs">
            {isVoiceListening
              ? "మీ వాయిస్ వినబడుతోంది... చెప్పండి"
              : "Works for bookings, orders, and emergency services."}
          </p>

          {/* Transcript / Feedback box */}
          {(voiceTranscript || voiceFeedback) && (
            <div className="w-full mt-4 p-3 bg-stone-50 border border-stone-200 rounded-xl text-left">
              {voiceTranscript && (
                <div className="text-xs text-stone-500 mb-1">
                  You said: <span className="font-medium text-stone-900">"{voiceTranscript}"</span>
                </div>
              )}
              {voiceFeedback && (
                <div className="flex items-start gap-2 text-xs text-emerald-800 font-medium">
                  <Volume2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>{voiceFeedback}</span>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Suggested Voice Commands */}
        <div className="px-6 py-3 bg-stone-50/80 border-t border-stone-200">
          <p className="text-xs font-semibold text-stone-600 mb-2">Try saying or tap to test:</p>
          <div className="flex flex-wrap gap-1.5 max-h-36 overflow-y-auto pr-1">
            {sampleVoiceCommands.map((cmd, i) => (
              <button
                key={i}
                type="button"
                onClick={() => handleSimulatePrompt(cmd)}
                className="text-xs text-left px-2.5 py-1.5 bg-white border border-stone-200 rounded-lg text-stone-700 hover:border-emerald-500 hover:text-emerald-800 hover:bg-emerald-50/50 transition-colors"
              >
                "{cmd}"
              </button>
            ))}
          </div>
        </div>

        {/* Fallback Text Input */}
        <form
          id="voice-manual-submit-form"
          onSubmit={handleManualSubmit}
          className="p-4 bg-white border-t border-stone-200 flex items-center gap-2"
        >
          <input
            id="voice-text-fallback-input"
            type="text"
            value={manualInput}
            onChange={(e) => setManualInput(e.target.value)}
            placeholder="Or type voice command in your language..."
            className="flex-1 text-xs px-3 py-2.5 rounded-xl border border-stone-300 focus:outline-hidden focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600"
          />
          <button
            type="submit"
            id="voice-text-send-btn"
            className="p-2.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl shadow-xs transition-colors"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
};
