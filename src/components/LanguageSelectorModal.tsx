import React from "react";
import { Check, Globe, Volume2, X } from "lucide-react";
import { useApp } from "../context/AppContext";
import { SUPPORTED_LANGUAGES } from "../data/translations";
import { LanguageCode } from "../types";

export const LanguageSelectorModal: React.FC = () => {
  const { language, setLanguage, showLanguageModal, setShowLanguageModal, speakText } = useApp();

  if (!showLanguageModal) return null;

  const handleSelect = (code: LanguageCode, greeting: string) => {
    setLanguage(code);
    speakText(greeting);
    setShowLanguageModal(false);
  };

  return (
    <div
      id="language-selector-overlay"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-in fade-in duration-200"
    >
      <div
        id="language-selector-card"
        className="w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-stone-200 overflow-hidden"
      >
        {/* Header */}
        <div className="bg-emerald-700 text-white p-6 relative">
          <button
            id="close-language-modal-btn"
            onClick={() => setShowLanguageModal(false)}
            className="absolute top-4 right-4 p-2 rounded-full hover:bg-emerald-800 transition-colors"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2.5 bg-emerald-600 rounded-xl">
              <Globe className="w-6 h-6 text-emerald-100" />
            </div>
            <div>
              <h2 className="text-xl font-bold tracking-tight">Select Your Language</h2>
              <p className="text-sm text-emerald-100">మీ ప్రాంతీయ భాషను ఎంచుకోండి / अपनी भाषा चुनें</p>
            </div>
          </div>
          <p className="text-xs text-emerald-200 mt-2">
            GraminSeva is fully accessible in your vernacular tongue with full voice navigation.
          </p>
        </div>

        {/* Language Grid */}
        <div className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          {SUPPORTED_LANGUAGES.map((lang) => {
            const isSelected = language === lang.code;
            return (
              <button
                key={lang.code}
                id={`lang-btn-${lang.code}`}
                onClick={() => handleSelect(lang.code, lang.greeting)}
                className={`relative flex items-center justify-between p-4 rounded-xl border-2 text-left transition-all ${
                  isSelected
                    ? "border-emerald-600 bg-emerald-50/80 shadow-xs"
                    : "border-stone-200 hover:border-emerald-300 hover:bg-stone-50"
                }`}
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-lg font-bold text-stone-900">{lang.nativeLabel}</span>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        speakText(lang.greeting);
                      }}
                      className="p-1 rounded-full text-emerald-700 hover:bg-emerald-100 transition-colors"
                      title="Audio Preview"
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <span className="text-xs font-medium text-stone-500">{lang.label}</span>
                </div>
                {isSelected && (
                  <div className="w-6 h-6 rounded-full bg-emerald-600 text-white flex items-center justify-center">
                    <Check className="w-4 h-4 stroke-[2.5]" />
                  </div>
                )}
              </button>
            );
          })}
        </div>

        {/* Footer info */}
        <div className="px-6 py-4 bg-stone-50 border-t border-stone-200 flex items-center justify-between text-xs text-stone-600">
          <span>You can change language anytime in settings.</span>
          <button
            id="continue-lang-btn"
            onClick={() => setShowLanguageModal(false)}
            className="px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white font-semibold rounded-lg shadow-xs transition-colors"
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
};
