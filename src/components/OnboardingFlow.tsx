import React, { useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  CheckCircle2,
  Globe,
  Headphones,
  HeartHandshake,
  Mic,
  Phone,
  PhoneCall,
  ShieldCheck,
  Sparkles,
  Store,
  UserCheck,
  User,
  Volume2,
  VolumeX,
  Wrench,
  AlertCircle,
} from "lucide-react";
import { useApp } from "../context/AppContext";
import { SUPPORTED_LANGUAGES } from "../data/translations";
import { ONBOARDING_TRANSLATIONS } from "../data/onboardingTranslations";
import { LanguageCode, UserRole } from "../types";

export const OnboardingFlow: React.FC = () => {
  const {
    language,
    setLanguage,
    onboardingStep,
    setOnboardingStep,
    voiceOverEnabled,
    setVoiceOverEnabled,
    currentRole,
    setCurrentRole,
    setActiveTab,
    user,
    setUser,
    speakText,
  } = useApp();

  const tOnboarding = ONBOARDING_TRANSLATIONS[language] || ONBOARDING_TRANSLATIONS.te;

  // Local state for Login step
  const [nameInput, setNameInput] = useState(user.name || "");
  const [phoneInput, setPhoneInput] = useState(user.phone || "+91 98480 22334");
  const [otpInput, setOtpInput] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [loginError, setLoginError] = useState("");
  const [selectedDemoRole, setSelectedDemoRole] = useState<UserRole>("customer");

  const currentLang = SUPPORTED_LANGUAGES.find((l) => l.code === language) || SUPPORTED_LANGUAGES[0];

  const handleSelectLanguage = (code: LanguageCode, greeting: string) => {
    setLanguage(code);
    speakText(greeting);
  };

  const handleNextFromLanguage = () => {
    setOnboardingStep("login");
    speakText(
      language === "te"
        ? "లాగిన్ పేజీకి స్వాగతం. దయచేసి మీ పేరు మరియు మొబైల్ నంబర్ నమోదు చేయండి"
        : language === "hi"
        ? "लॉगिन पेज में आपका स्वागत है। कृपया अपना नाम और मोबाइल नंबर दर्ज करें"
        : language === "kn"
        ? "ಲಾಗಿನ್ ಪುಟಕ್ಕೆ ಸ್ವಾಗತ. ದಯವಿಟ್ಟು ನಿಮ್ಮ ಹೆಸರು ಮತ್ತು ಮೊಬೈಲ್ ಸಂಖ್ಯೆ ನಮೂದಿಸಿ"
        : language === "ta"
        ? "உள்நுழைவு பக்கத்திற்கு வரவேற்கிறோம். உங்கள் பெயர் மற்றும் மொபைல் எண்ணை உள்ளிடவும்"
        : "Welcome to Login. Please enter your name and mobile number"
    );
  };

  const handleSendOtp = () => {
    if (!phoneInput || phoneInput.length < 10) {
      setLoginError(tOnboarding.loginStep.invalidPhone);
      return;
    }
    setOtpSent(true);
    setOtpInput("5429");
    setLoginError("");
    speakText(
      language === "te"
        ? "మీ నంబర్‌కు ఓటీపీ పంపబడింది. డెమో ఓటీపీ: 5 4 2 9"
        : language === "hi"
        ? "आपके नंबर पर ओटीपी भेजा गया है। डेमो कोड: 5 4 2 9"
        : language === "kn"
        ? "ನಿಮ್ಮ ಸಂಖ್ಯೆಗೆ OTP ಕಳುಹಿಸಲಾಗಿದೆ. ಡೆಮೊ: 5 4 2 9"
        : language === "ta"
        ? "உங்கள் எண்ணிற்கு OTP அனுப்பப்பட்டது. டெமோ: 5 4 2 9"
        : "OTP sent to your number. Demo OTP is 5429"
    );
  };

  const handleVerifyOtpAndProceed = () => {
    if (otpInput === "5429" || otpInput.length === 4) {
      const trimmedName = nameInput.trim();
      setUser((prev) => ({
        ...prev,
        name: trimmedName, // When entered in login page, then only display the name!
        phone: phoneInput,
        role: selectedDemoRole,
      }));
      setOnboardingStep("voice_over");
      speakText(
        language === "te"
          ? `${trimmedName ? trimmedName + " గారు, " : ""}లాగిన్ అయ్యారు. అక్షరాస్యులు మరియు నిరక్షరాస్యులందరి కోసం మా వాయిస్ ఓవర్ ఆడియో గైడ్ చూడండి.`
          : language === "hi"
          ? `${trimmedName ? trimmedName + ", " : ""}लॉगिन सफल रहा। साक्षर और निरक्षर सभी के लिए वॉयस-ओवर गाइड देखें।`
          : language === "kn"
          ? `${trimmedName ? trimmedName + ", " : ""}ಲಾಗಿನ್ ಆಗಿದೆ. ಎಲ್ಲರಿಗೂ ಧ್ವನಿ ಓವರ್ ಗೈಡ್ ನೋಡಿ.`
          : language === "ta"
          ? `${trimmedName ? trimmedName + ", " : ""}உள்நுழைவு முடிந்தது. அனைவருக்கும் குரல் வழி வழிகாட்டியைப் பாருங்கள்.`
          : `${trimmedName ? "Welcome " + trimmedName + "! " : ""}Login verified. Voice-over guide active for both literate and non-literate users.`
      );
    } else {
      setLoginError(tOnboarding.loginStep.invalidOtp);
    }
  };

  const handleQuickDemoLogin = (role: UserRole, demoName: string, demoPhone: string) => {
    setSelectedDemoRole(role);
    setCurrentRole(role);
    setNameInput(demoName);
    setPhoneInput(demoPhone);
    setUser((prev) => ({
      ...prev,
      name: demoName,
      phone: demoPhone,
      role: role,
    }));
    setOnboardingStep("voice_over");
    speakText(
      language === "te"
        ? `${demoName} గా లాగిన్ అయ్యారు. అక్షరాస్యులు మరియు నిరక్షరాస్యులందరి కోసం మా ఆడియో సదుపాయం ఇదిగో`
        : language === "hi"
        ? `${demoName} के रूप में लॉगिन किया गया। सभी के लिए ऑडियो सुविधा देखें`
        : language === "kn"
        ? `${demoName} ಎಂದು ಲಾಗಿನ್ ಆಗಿದೆ. ಎಲ್ಲರಿಗೂ ಧ್ವನಿ ಸೌಲಭ್ಯ ಇಲ್ಲಿದೆ`
        : language === "ta"
        ? `${demoName} ஆக உள்நுழைந்தது. அனைவருக்கும் குரல் உதவி இதோ`
        : `Logged in as ${demoName}. Welcome to the voice-over guide for both reading and non-reading users.`
    );
  };

  const handleNextFromVoiceOver = () => {
    setOnboardingStep("role_choice");
    speakText(
      language === "te"
        ? "మీరు దేని కోసం వచ్చారు? సేవలు పొందడానికి కస్టమర్ పేజీ లేదా సరుకులు అమ్మడానికి సెల్లర్ పేజీ ఎంచుకోండి"
        : language === "hi"
        ? "आप क्या करना चाहते हैं? ग्राहक पेज या विक्रेता पोर्टल चुनें"
        : language === "kn"
        ? "ನೀವು ಯಾವುದನ್ನು ಬಯಸುತ್ತೀರಿ? ಗ್ರಾಹಕ ಪೇಜ್ ಅಥವಾ ಮಾರಾಟಗಾರರ ಪೋರ್ಟಲ್ ಆಯ್ಕೆಮಾಡಿ"
        : language === "ta"
        ? "வாடிக்கையாளர் சந்தை அல்லது விற்பனையாளர் தளம் தேர்வு செய்யவும்"
        : "Choose your portal: Customer Market Page or Seller Merchant Page"
    );
  };

  const handleChooseCustomerPortal = () => {
    setCurrentRole("customer");
    setActiveTab("market");
    setOnboardingStep("completed");
    speakText(
      language === "te"
        ? "కస్టమర్ పేజీకి స్వాగతం! ప్లంబర్, కరెంట్ సేవలు, పాలు, కూరగాయలు మరియు ఎమర్జెన్సీ ఇక్కడ లభిస్తాయి"
        : language === "hi"
        ? "ग्राहक बाज़ार में आपका स्वागत है! सभी सेवाएं और उत्पाद उपलब्ध हैं"
        : language === "kn"
        ? "ಗ್ರಾಹಕ ಮಾರುಕಟ್ಟೆಗೆ ಸ್ವಾಗತ! ಸೇವೆಗಳು ಮತ್ತು ಉತ್ಪನ್ನಗಳು ಇಲ್ಲಿ ಲಭ್ಯವಿದೆ"
        : language === "ta"
        ? "வாடிக்கையாளர் சந்தைக்கு வரவேற்கிறோம்! அனைத்து சேவைகளும் இங்கு கிடைக்கும்"
        : "Welcome to Customer Market Page. Book verified services and local goods"
    );
  };

  const handleChooseSellerPortal = () => {
    setCurrentRole("seller");
    setActiveTab("seller_portal");
    setOnboardingStep("completed");
    speakText(
      language === "te"
        ? "సెల్లర్ పేజీకి స్వాగతం! మీ కూరగాయలు, పాలు, లేదా సేవలను సులభంగా అమ్మండి. కేవలం 4% కమీషన్"
        : language === "hi"
        ? "विक्रेता पोर्टल में आपका स्वागत है! अपने उत्पाद बेचें, केवल 4% कमीशन"
        : language === "kn"
        ? "ಮಾರಾಟಗಾರರ ಪೋರ್ಟಲ್‌ಗೆ ಸ್ವಾಗತ! ಉತ್ಪನ್ನಗಳನ್ನು ಮಾರಾಟ ಮಾಡಿ, ಕೇವಲ 4% ಕಮಿಷನ್"
        : language === "ta"
        ? "விற்பனையாளர் தளத்திற்கு வரவேற்கிறோம்! பொருட்களை விற்க வெறும் 4% கமிஷன்"
        : "Welcome to Seller & Merchant Portal. Sell produce with 4% low commission"
    );
  };

  return (
    <div id="onboarding-flow-container" className="min-h-screen bg-[#f7f8fa] flex flex-col justify-between py-6 px-4 sm:px-6 font-sans">
      <div className="max-w-3xl w-full mx-auto">
        {/* Top Progress Bar & Step Navigation */}
        <div className="mb-6 bg-white p-4 rounded-2xl border border-stone-200 shadow-2xs flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-emerald-700 text-white flex items-center justify-center font-black text-base shadow-xs">
              {language === "te" ? "గ్రా" : language === "hi" ? "ग्रा" : language === "kn" ? "ಗ್ರಾ" : language === "ta" ? "கி" : "GS"}
            </div>
            <div>
              <span className="font-extrabold text-stone-900 text-sm tracking-tight block">
                GraminSeva Digital Hub
              </span>
              <span className="text-[11px] text-stone-500 font-medium">
                {tOnboarding.stepper.stepPrefix}{" "}
                {onboardingStep === "language" ? "1" : onboardingStep === "login" ? "2" : onboardingStep === "voice_over" ? "3" : "4"}{" "}
                {tOnboarding.stepper.ofPrefix} 4:{" "}
                {onboardingStep === "language" && tOnboarding.stepper.step1}
                {onboardingStep === "login" && tOnboarding.stepper.step2}
                {onboardingStep === "voice_over" && tOnboarding.stepper.step3}
                {onboardingStep === "role_choice" && tOnboarding.stepper.step4}
              </span>
            </div>
          </div>

          {/* Stepper Dots with dynamic translated labels */}
          <div className="flex items-center gap-2">
            {[
              { id: "language", label: tOnboarding.stepper.step1 },
              { id: "login", label: tOnboarding.stepper.step2 },
              { id: "voice_over", label: tOnboarding.stepper.step3 },
              { id: "role_choice", label: tOnboarding.stepper.step4 },
            ].map((st, idx) => {
              const stepsOrder = ["language", "login", "voice_over", "role_choice"];
              const currentIdx = stepsOrder.indexOf(onboardingStep);
              const thisIdx = idx;
              const isActive = thisIdx === currentIdx;
              const isPassed = thisIdx < currentIdx;

              return (
                <div key={st.id} className="flex items-center gap-1.5">
                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                      isActive
                        ? "bg-emerald-700 text-white ring-4 ring-emerald-100"
                        : isPassed
                        ? "bg-emerald-100 text-emerald-800"
                        : "bg-stone-100 text-stone-400"
                    }`}
                  >
                    {isPassed ? <Check className="w-3.5 h-3.5" /> : idx + 1}
                  </div>
                  <span
                    className={`hidden md:inline text-xs font-semibold ${
                      isActive ? "text-stone-900" : isPassed ? "text-emerald-800" : "text-stone-400"
                    }`}
                  >
                    {st.label}
                  </span>
                  {idx < 3 && <div className="w-4 h-0.5 bg-stone-200 hidden sm:block" />}
                </div>
              );
            })}
          </div>
        </div>

        {/* ========================================================
            STEP 1: SELECT LANGUAGE (భాష ఎంపిక)
            Clicking ANY language immediately updates the whole app!
           ======================================================== */}
        {onboardingStep === "language" && (
          <div id="step-language-screen" className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-sm animate-in fade-in duration-300">
            <div className="max-w-xl mx-auto text-center mb-8">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-xs font-bold text-emerald-800 mb-3">
                <Globe className="w-3.5 h-3.5 text-emerald-600" />
                <span>{tOnboarding.languageStep.badge}</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-stone-900 tracking-tight mb-2">
                {tOnboarding.languageStep.title}
              </h2>
              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                {tOnboarding.languageStep.subtitle}
              </p>
            </div>

            {/* Language Selection Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 mb-8">
              {SUPPORTED_LANGUAGES.map((lang) => {
                const isSelected = language === lang.code;
                return (
                  <button
                    key={lang.code}
                    id={`lang-card-${lang.code}`}
                    onClick={() => handleSelectLanguage(lang.code, lang.greeting)}
                    className={`p-5 rounded-2xl border-2 text-left transition-all relative overflow-hidden group flex flex-col justify-between ${
                      isSelected
                        ? "border-emerald-700 bg-emerald-50/50 shadow-md ring-2 ring-emerald-200"
                        : "border-stone-200 bg-stone-50/60 hover:border-emerald-300 hover:bg-emerald-50/20"
                    }`}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <span className="text-2xl font-black text-stone-900 block tracking-tight">
                          {lang.nativeLabel}
                        </span>
                        <span className="text-xs font-semibold text-stone-500 uppercase tracking-wider">
                          {lang.label}
                        </span>
                      </div>
                      {isSelected ? (
                        <div className="w-6 h-6 rounded-full bg-emerald-700 text-white flex items-center justify-center shadow-xs">
                          <Check className="w-3.5 h-3.5" />
                        </div>
                      ) : (
                        <div className="w-6 h-6 rounded-full border border-stone-300 group-hover:border-emerald-400" />
                      )}
                    </div>

                    <div className="mt-2 pt-2 border-t border-stone-200/70 flex items-center justify-between text-[11px]">
                      <span className="text-stone-600 truncate max-w-[170px]">
                        "{lang.greeting.slice(0, 30)}..."
                      </span>
                      <span className="text-emerald-700 font-bold shrink-0">🔊 Preview</span>
                    </div>

                    {isSelected && (
                      <div className="absolute top-0 right-0 bg-emerald-700 text-white text-[9px] font-black px-2 py-0.5 rounded-bl-lg">
                        {tOnboarding.languageStep.selectedBadge}
                      </div>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Audio Greeting Banner for selected language */}
            <div className="mb-6 p-4 rounded-2xl bg-amber-50 border border-amber-200 flex items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-amber-500 text-amber-950 flex items-center justify-center font-bold shrink-0">
                  <Volume2 className="w-4 h-4" />
                </div>
                <div>
                  <span className="font-extrabold text-amber-950 block">
                    {currentLang.greeting}
                  </span>
                  <span className="text-[11px] text-amber-800">
                    {tOnboarding.languageStep.listenGreeting}
                  </span>
                </div>
              </div>
              <button
                type="button"
                onClick={() => speakText(currentLang.greeting)}
                className="px-3 py-1.5 bg-amber-900 text-amber-100 rounded-xl font-bold hover:bg-amber-950 transition-colors text-xs shrink-0"
              >
                🔊 Play
              </button>
            </div>

            {/* Next Button */}
            <div className="flex justify-end">
              <button
                id="next-to-login-btn"
                onClick={handleNextFromLanguage}
                className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-emerald-700 hover:bg-emerald-800 text-white font-black text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2"
              >
                <span>{tOnboarding.languageStep.nextBtn}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* ========================================================
            STEP 2: LOGIN PAGE (మొబైల్ లాగిన్ & పేరు నమోదు)
            When enter the name then only display the name!
           ======================================================== */}
        {onboardingStep === "login" && (
          <div id="step-login-screen" className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-sm animate-in fade-in duration-300">
            <div className="max-w-xl mx-auto text-center mb-6">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-xs font-bold text-emerald-800 mb-3">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>{tOnboarding.loginStep.badge}</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-stone-900 tracking-tight mb-2">
                {tOnboarding.loginStep.title}
              </h2>
              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                {tOnboarding.loginStep.subtitle}
              </p>
            </div>

            {/* Voice Audio Helper button for Login */}
            <div className="mb-6 p-3.5 bg-emerald-50 rounded-2xl border border-emerald-200 flex items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-2.5">
                <Volume2 className="w-4 h-4 text-emerald-700 shrink-0" />
                <span className="text-emerald-950 font-medium">
                  {language === "te"
                    ? "ఆడియో సహాయం: మీ పేరు మరియు 10 అంకెల మొబైల్ నంబర్ ఇక్కడ నమోదు చేయండి"
                    : language === "hi"
                    ? "ऑडियो सहायता: अपना नाम और 10 अंकों का मोबाइल नंबर दर्ज करें"
                    : language === "kn"
                    ? "ಆಡಿಯೋ ಸಹಾಯ: ನಿಮ್ಮ ಹೆಸರು ಮತ್ತು ಮೊಬೈಲ್ ಸಂಖ್ಯೆ ಇಲ್ಲಿ ನಮೂದಿಸಿ"
                    : language === "ta"
                    ? "ஆடியோ உதவி: உங்கள் பெயர் மற்றும் 10 இலக்க மொபைல் எண்ணை உள்ளிடவும்"
                    : "Audio guide: Enter your full name and 10-digit phone number"}
                </span>
              </div>
              <button
                type="button"
                onClick={() =>
                  speakText(
                    language === "te"
                      ? "దయచేసి మీ పేరు మరియు మొబైల్ నంబర్ నమోదు చేయండి. పేరు నమోదు చేసిన తర్వాత మాత్రమే ప్రొఫైల్‌లో కనిపిస్తుంది."
                      : language === "hi"
                      ? "कृपया अपना नाम और मोबाइल नंबर दर्ज करें। नाम दर्ज करने के बाद ही स्क्रीन पर प्रदर्शित होगा।"
                      : "Please enter your name and mobile number. Your name will only be displayed after you enter it."
                  )
                }
                className="px-2.5 py-1 bg-emerald-800 text-white rounded-lg font-bold text-[11px] shrink-0 hover:bg-emerald-900"
              >
                {tOnboarding.loginStep.audioHelpBtn}
              </button>
            </div>

            <div className="max-w-md mx-auto space-y-5">
              {/* NAME INPUT FIELD - Critical user requirement: "when enter the name then only display the name" */}
              <div>
                <label className="block text-xs font-extrabold text-stone-800 mb-1.5">
                  {tOnboarding.loginStep.nameLabel}
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-stone-400 absolute left-3.5 top-3.5" />
                  <input
                    id="login-name-input"
                    type="text"
                    value={nameInput}
                    onChange={(e) => setNameInput(e.target.value)}
                    placeholder={tOnboarding.loginStep.namePlaceholder}
                    className="w-full pl-10 pr-4 py-2.5 bg-stone-50 border border-stone-300 rounded-xl text-sm font-semibold text-stone-900 placeholder:text-stone-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:border-emerald-600 transition-all"
                  />
                </div>

                {/* Live Name Display Preview badge */}
                <div className="mt-2 flex items-center justify-between text-[11px]">
                  <span className="text-stone-500 font-medium">
                    {tOnboarding.loginStep.namePreviewLabel}
                  </span>
                  {nameInput.trim() ? (
                    <span className="font-bold px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-800 border border-emerald-300">
                      ✓ {nameInput.trim()}
                    </span>
                  ) : (
                    <span className="font-medium text-amber-700 px-2 py-0.5 rounded-md bg-amber-50 border border-amber-200">
                      {tOnboarding.loginStep.noNameEntered}
                    </span>
                  )}
                </div>
                <p className="text-[10px] text-stone-500 mt-1">
                  {tOnboarding.loginStep.nameNotice}
                </p>
              </div>

              {/* PHONE INPUT FIELD */}
              <div>
                <label className="block text-xs font-extrabold text-stone-800 mb-1.5">
                  {tOnboarding.loginStep.phoneLabel}
                </label>
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <Phone className="w-4 h-4 text-stone-400 absolute left-3.5 top-3.5" />
                    <input
                      id="login-phone-input"
                      type="tel"
                      value={phoneInput}
                      onChange={(e) => setPhoneInput(e.target.value)}
                      placeholder={tOnboarding.loginStep.phonePlaceholder}
                      className="w-full pl-10 pr-4 py-2.5 bg-stone-50 border border-stone-300 rounded-xl text-sm font-semibold text-stone-900 placeholder:text-stone-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:border-emerald-600 transition-all"
                    />
                  </div>
                  <button
                    type="button"
                    id="send-otp-btn"
                    onClick={handleSendOtp}
                    className="px-4 py-2.5 bg-stone-900 hover:bg-stone-800 text-white rounded-xl text-xs font-bold transition-colors shrink-0"
                  >
                    {otpSent ? tOnboarding.loginStep.resendOtpBtn : tOnboarding.loginStep.getOtpBtn}
                  </button>
                </div>
              </div>

              {/* OTP INPUT FIELD */}
              {otpSent && (
                <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200 animate-in fade-in duration-200">
                  <label className="block text-xs font-extrabold text-emerald-950 mb-1.5">
                    {tOnboarding.loginStep.otpLabel}
                  </label>
                  <input
                    id="login-otp-input"
                    type="text"
                    maxLength={4}
                    value={otpInput}
                    onChange={(e) => setOtpInput(e.target.value)}
                    className="w-full text-center tracking-[0.5em] py-2 bg-white border-2 border-emerald-500 rounded-xl text-lg font-black text-emerald-950 focus:outline-none focus:ring-2 focus:ring-emerald-600"
                    placeholder="5429"
                  />
                  <p className="text-[11px] text-emerald-800 mt-2 font-medium">
                    {tOnboarding.loginStep.otpSentMsg}
                  </p>
                </div>
              )}

              {loginError && (
                <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-semibold flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{loginError}</span>
                </div>
              )}

              {/* Quick Demo Accounts Selection */}
              <div className="pt-3 border-t border-stone-200">
                <span className="block text-[11px] font-bold text-stone-500 uppercase tracking-wider mb-2 text-center">
                  {tOnboarding.loginStep.quickDemoTitle}
                </span>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => handleQuickDemoLogin("customer", "రమేష్ గౌడ్", "+91 98480 22334")}
                    className="p-2.5 rounded-xl border border-stone-200 bg-stone-50 hover:bg-emerald-50 hover:border-emerald-300 text-left transition-all"
                  >
                    <span className="block text-xs font-bold text-stone-900">
                      {tOnboarding.loginStep.demoCustomer}
                    </span>
                    <span className="block text-[10px] text-stone-500">
                      {language === "te" ? "పౌరుడు / సేవలు బుక్ చేసుకోండి" : "Resident / Book Services"}
                    </span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleQuickDemoLogin("seller", "లక్ష్మమ్మ", "+91 94401 55667")}
                    className="p-2.5 rounded-xl border border-stone-200 bg-stone-50 hover:bg-amber-50 hover:border-amber-300 text-left transition-all"
                  >
                    <span className="block text-xs font-bold text-stone-900">
                      {tOnboarding.loginStep.demoSeller}
                    </span>
                    <span className="block text-[10px] text-stone-500">
                      {language === "te" ? "రైతు / కూరగాయలు & పాలు విక్రేత" : "Farmer / Produce & Milk Seller"}
                    </span>
                  </button>
                </div>
              </div>
            </div>

            {/* Navigation Buttons */}
            <div className="mt-8 pt-4 border-t border-stone-200 flex flex-col sm:flex-row items-center justify-between gap-3">
              <button
                type="button"
                onClick={() => setOnboardingStep("language")}
                className="w-full sm:w-auto px-4 py-2.5 text-stone-600 hover:text-stone-900 text-xs font-bold flex items-center justify-center gap-1.5"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>{tOnboarding.loginStep.backBtn}</span>
              </button>

              <button
                type="button"
                id="verify-login-next-btn"
                onClick={handleVerifyOtpAndProceed}
                className="w-full sm:w-auto px-7 py-3 rounded-2xl bg-emerald-700 hover:bg-emerald-800 text-white font-black text-xs shadow-md transition-all flex items-center justify-center gap-2"
              >
                <span>{tOnboarding.loginStep.verifyNextBtn}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* ========================================================
            STEP 3: VOICE-OVER GUIDE (FOR BOTH LITERATES & ILLITERATES)
            "not only for illiterates for literates also"
           ======================================================== */}
        {onboardingStep === "voice_over" && (
          <div id="step-voiceover-screen" className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-sm animate-in fade-in duration-300">
            <div className="max-w-xl mx-auto text-center mb-6">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 border border-amber-300 text-xs font-extrabold text-amber-950 mb-3">
                <Volume2 className="w-3.5 h-3.5 text-amber-700 animate-bounce" />
                <span>{tOnboarding.voiceOverStep.badge}</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-stone-900 tracking-tight mb-2">
                {tOnboarding.voiceOverStep.title}
              </h2>
              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                {tOnboarding.voiceOverStep.subtitle}
              </p>
            </div>

            {/* Test Voice Audio Banner */}
            <div className="mb-6 p-4 rounded-2xl bg-amber-500 text-amber-950 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-950 text-amber-100 flex items-center justify-center font-black shrink-0">
                  <Headphones className="w-5 h-5" />
                </div>
                <div>
                  <span className="font-extrabold text-sm block">
                    {language === "te"
                      ? "ఆడియో సహాయకుడు: అక్షరాస్యులు & నిరక్షరాస్యులందరి కోసం"
                      : language === "hi"
                      ? "ऑडियो गाइड: साक्षर और निरक्षर सभी नागरिकों के लिए"
                      : language === "kn"
                      ? "ಆಡಿಯೋ ಮಾರ್ಗದರ್ಶಿ: ಸಾಕ್ಷರರು ಮತ್ತು ಅನಕ್ಷರಸ್ಥರು ಎಲ್ಲರಿಗೂ"
                      : language === "ta"
                      ? "குரல் வழிகாட்டி: அனைவருக்கும் எளிய ஆடியோ உதவி"
                      : "Audio Assistant: For Both Reading & Non-Reading Users"}
                  </span>
                  <span className="text-[11px] text-amber-900 font-medium">
                    {tOnboarding.voiceOverStep.qualityBadge}
                  </span>
                </div>
              </div>
              <button
                type="button"
                id="voice-test-audio-btn"
                onClick={() =>
                  speakText(
                    language === "te"
                      ? "నమస్కారం! గ్రామీణ సేవ వాయిస్ ఓవర్ ఆన్ చేయబడింది. అక్షరాస్యులకు వేగవంతమైన వాయిస్ ఆర్డర్లు, మరియు నిరక్షరాస్యులకు ఏ బటన్ లేదా వస్తువును తాకినా స్పష్టమైన ఆడియో వినిపిస్తుంది."
                      : language === "hi"
                      ? "नमस्ते! ग्रामीण सेवा में वॉयस-ओवर चालू है। साक्षर लोगों के लिए हैंड्स-फ्री वॉयस सर्च और निरक्षर लोगों के लिए टच-टू-स्पीक ऑडियो सुविधा उपलब्ध है।"
                      : language === "kn"
                      ? "ನಮಸ್ಕಾರ! ಗ್ರಾಮೀಣ ಸೇವೆಗೆ ಸ್ವಾಗತ. ಸಾಕ್ಷರರು ಮತ್ತು ಅನಕ್ಷರಸ್ಥರಿಗೆ ಧ್ವನಿ ಸೌಲಭ್ಯ ಲಭ್ಯವಿದೆ."
                      : language === "ta"
                      ? "வணக்கம்! கிராமின் சேவா குரல் உதவி தயார். தொட்டால் பேசும் ஆடியோ வசதி அனைவருக்கும் கிடைக்கிறது."
                      : "Welcome to GraminSeva! Voice-over audio assistance is active for both literate users multitasking hands-free and non-reading users tapping for spoken feedback."
                  )
                }
                className="px-4 py-2 bg-amber-950 text-amber-100 hover:bg-black rounded-xl font-black text-xs transition-colors shrink-0 shadow-xs"
              >
                {tOnboarding.voiceOverStep.testAudioBtn}
              </button>
            </div>

            {/* 3 Balanced Pillars: Literates, Non-Literates, Voice Mic & IVR */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              {/* Pillar 1: Literate Users */}
              <div className="p-4 rounded-2xl bg-blue-50/70 border border-blue-200 flex flex-col justify-between">
                <div>
                  <div className="w-8 h-8 rounded-xl bg-blue-600 text-white flex items-center justify-center mb-2.5 shadow-xs">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <h4 className="text-xs font-black text-blue-950 mb-0.5">
                    {tOnboarding.voiceOverStep.card1Title}
                  </h4>
                  <span className="text-[11px] font-bold text-blue-700 block mb-1.5">
                    {tOnboarding.voiceOverStep.card1Subtitle}
                  </span>
                  <p className="text-[11px] text-blue-900 leading-relaxed">
                    {tOnboarding.voiceOverStep.card1Desc}
                  </p>
                </div>
                <div className="mt-3 pt-2 border-t border-blue-200/80 text-[10px] text-blue-700 font-semibold">
                  ✓ Hands-Free Convenience
                </div>
              </div>

              {/* Pillar 2: Non-Literates & Elderly */}
              <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-300 flex flex-col justify-between ring-1 ring-amber-200">
                <div>
                  <div className="w-8 h-8 rounded-xl bg-amber-500 text-amber-950 flex items-center justify-center mb-2.5 shadow-xs">
                    <Volume2 className="w-4 h-4" />
                  </div>
                  <h4 className="text-xs font-black text-amber-950 mb-0.5">
                    {tOnboarding.voiceOverStep.card2Title}
                  </h4>
                  <span className="text-[11px] font-bold text-amber-800 block mb-1.5">
                    {tOnboarding.voiceOverStep.card2Subtitle}
                  </span>
                  <p className="text-[11px] text-amber-950 leading-relaxed">
                    {tOnboarding.voiceOverStep.card2Desc}
                  </p>
                </div>
                <div className="mt-3 pt-2 border-t border-amber-200 text-[10px] text-amber-800 font-semibold">
                  ✓ 100% Audio Inclusion
                </div>
              </div>

              {/* Pillar 3: Voice Mic & Toll-Free Phone IVR */}
              <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200 flex flex-col justify-between">
                <div>
                  <div className="w-8 h-8 rounded-xl bg-emerald-700 text-white flex items-center justify-center mb-2.5 shadow-xs">
                    <PhoneCall className="w-4 h-4" />
                  </div>
                  <h4 className="text-xs font-black text-emerald-950 mb-0.5">
                    {tOnboarding.voiceOverStep.card3Title}
                  </h4>
                  <span className="text-[11px] font-bold text-emerald-700 block mb-1.5">
                    {tOnboarding.voiceOverStep.card3Subtitle}
                  </span>
                  <p className="text-[11px] text-emerald-900 leading-relaxed">
                    {tOnboarding.voiceOverStep.card3Desc}
                  </p>
                </div>
                <div className="mt-3 pt-2 border-t border-emerald-200 text-[10px] text-emerald-700 font-semibold">
                  ✓ Toll-Free 1800-419-7382
                </div>
              </div>
            </div>

            {/* Permanent Voice-Over Switch Toggle */}
            <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 flex items-center justify-between gap-4">
              <div>
                <span className="text-xs font-extrabold text-stone-900 block">
                  {tOnboarding.voiceOverStep.toggleLabel}
                </span>
                <span className="text-[11px] text-stone-500">
                  {tOnboarding.voiceOverStep.toggleDesc}
                </span>
              </div>
              <button
                type="button"
                id="toggle-voice-assistant-mode"
                onClick={() => setVoiceOverEnabled(!voiceOverEnabled)}
                className={`px-4 py-2 rounded-xl text-xs font-black transition-all flex items-center gap-1.5 shrink-0 ${
                  voiceOverEnabled
                    ? "bg-amber-500 text-amber-950 shadow-xs ring-2 ring-amber-300"
                    : "bg-stone-200 text-stone-700 hover:bg-stone-300"
                }`}
              >
                {voiceOverEnabled ? (
                  <>
                    <Volume2 className="w-4 h-4" />
                    <span>{tOnboarding.voiceOverStep.toggleActive}</span>
                  </>
                ) : (
                  <>
                    <VolumeX className="w-4 h-4" />
                    <span>{tOnboarding.voiceOverStep.toggleMuted}</span>
                  </>
                )}
              </button>
            </div>

            {/* Navigation Buttons */}
            <div className="mt-8 pt-4 border-t border-stone-200 flex flex-col sm:flex-row items-center justify-between gap-3">
              <button
                type="button"
                onClick={() => setOnboardingStep("login")}
                className="w-full sm:w-auto px-4 py-2.5 text-stone-600 hover:text-stone-900 text-xs font-bold flex items-center justify-center gap-1.5"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>{tOnboarding.voiceOverStep.backBtn}</span>
              </button>

              <button
                type="button"
                id="next-to-portals-btn"
                onClick={handleNextFromVoiceOver}
                className="w-full sm:w-auto px-7 py-3 rounded-2xl bg-emerald-700 hover:bg-emerald-800 text-white font-black text-xs shadow-md transition-all flex items-center justify-center gap-2"
              >
                <span>{tOnboarding.voiceOverStep.nextBtn}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* ========================================================
            STEP 4: SEPARATE CUSTOMER & SELLER PORTALS
           ======================================================== */}
        {onboardingStep === "role_choice" && (
          <div id="step-portals-screen" className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-sm animate-in fade-in duration-300">
            <div className="max-w-xl mx-auto text-center mb-6">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-xs font-bold text-emerald-800 mb-3">
                <HeartHandshake className="w-3.5 h-3.5 text-emerald-600" />
                <span>{tOnboarding.portalsStep.badge}</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-stone-900 tracking-tight mb-2">
                {tOnboarding.portalsStep.title}
              </h2>
              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                {tOnboarding.portalsStep.subtitle}
              </p>
            </div>

            {/* Side-by-side Portals Selection */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              {/* Customer Portal Card */}
              <div
                id="card-customer-portal"
                className="p-6 rounded-3xl border-2 border-emerald-600 bg-gradient-to-b from-emerald-50/50 to-white flex flex-col justify-between shadow-md hover:shadow-lg transition-all"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-2xl bg-emerald-700 text-white flex items-center justify-center shadow-xs">
                      <UserCheck className="w-6 h-6" />
                    </div>
                    <span className="px-2.5 py-1 rounded-md bg-emerald-100 text-emerald-800 text-[10px] font-black uppercase">
                      100% Escrow Protected
                    </span>
                  </div>

                  <h3 className="text-xl font-black text-stone-900 mb-1">
                    {tOnboarding.portalsStep.customerTitle}
                  </h3>
                  <p className="text-xs text-stone-600 font-medium mb-4">
                    {tOnboarding.portalsStep.customerSubtitle}
                  </p>

                  <ul className="space-y-2.5 text-xs text-stone-700 mb-6">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{tOnboarding.portalsStep.custF1}</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{tOnboarding.portalsStep.custF2}</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{tOnboarding.portalsStep.custF3}</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{tOnboarding.portalsStep.custF4}</span>
                    </li>
                  </ul>
                </div>

                <button
                  type="button"
                  id="choose-customer-page-btn"
                  onClick={handleChooseCustomerPortal}
                  className="w-full py-3.5 px-4 rounded-2xl bg-emerald-700 hover:bg-emerald-800 text-white font-black text-xs shadow-md transition-all flex items-center justify-center gap-2"
                >
                  <span>{tOnboarding.portalsStep.openCustomerBtn}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              {/* Seller / Merchant Portal Card */}
              <div
                id="card-seller-portal"
                className="p-6 rounded-3xl border-2 border-amber-500 bg-gradient-to-b from-amber-50/50 to-white flex flex-col justify-between shadow-md hover:shadow-lg transition-all"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-2xl bg-amber-500 text-amber-950 flex items-center justify-center shadow-xs">
                      <Store className="w-6 h-6" />
                    </div>
                    <span className="px-2.5 py-1 rounded-md bg-amber-100 text-amber-900 text-[10px] font-black uppercase">
                      Fair 4% Flat Fee
                    </span>
                  </div>

                  <h3 className="text-xl font-black text-stone-900 mb-1">
                    {tOnboarding.portalsStep.sellerTitle}
                  </h3>
                  <p className="text-xs text-stone-600 font-medium mb-4">
                    {tOnboarding.portalsStep.sellerSubtitle}
                  </p>

                  <ul className="space-y-2.5 text-xs text-stone-700 mb-6">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                      <span>{tOnboarding.portalsStep.sellerF1}</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                      <span>{tOnboarding.portalsStep.sellerF2}</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                      <span>{tOnboarding.portalsStep.sellerF3}</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                      <span>{tOnboarding.portalsStep.sellerF4}</span>
                    </li>
                  </ul>
                </div>

                <button
                  type="button"
                  id="choose-seller-page-btn"
                  onClick={handleChooseSellerPortal}
                  className="w-full py-3.5 px-4 rounded-2xl bg-amber-500 hover:bg-amber-400 text-amber-950 font-black text-xs shadow-md transition-all flex items-center justify-center gap-2"
                >
                  <span>{tOnboarding.portalsStep.openSellerBtn}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Back Button */}
            <div className="pt-2 flex justify-start">
              <button
                type="button"
                onClick={() => setOnboardingStep("voice_over")}
                className="px-4 py-2 text-stone-600 hover:text-stone-900 text-xs font-bold flex items-center gap-1.5"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>{tOnboarding.voiceOverStep.backBtn}</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
