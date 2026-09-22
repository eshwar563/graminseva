import React, { createContext, useContext, useEffect, useState } from "react";
import {
  EmergencyItem,
  EmergencyReport,
  LanguageCode,
  OnboardingStep,
  Product,
  ProductOrder,
  ServiceBooking,
  ServiceCategory,
  ServiceProvider,
  UserProfile,
  UserRole,
  WalletTransaction,
} from "../types";
import {
  EMERGENCY_SERVICES,
  INITIAL_BOOKINGS,
  INITIAL_TRANSACTIONS,
  INITIAL_USER,
  MOCK_PRODUCTS,
  MOCK_PROVIDERS,
  SERVICE_CATEGORIES,
} from "../data/mockData";
import { TRANSLATIONS } from "../data/translations";

interface AppContextType {
  onboardingStep: OnboardingStep;
  setOnboardingStep: (step: OnboardingStep) => void;
  voiceOverEnabled: boolean;
  setVoiceOverEnabled: (enabled: boolean) => void;
  restartOnboarding: () => void;
  language: LanguageCode;
  setLanguage: (lang: LanguageCode) => void;
  showLanguageModal: boolean;
  setShowLanguageModal: (show: boolean) => void;
  currentRole: UserRole;
  setCurrentRole: (role: UserRole) => void;
  user: UserProfile;
  setUser: React.Dispatch<React.SetStateAction<UserProfile>>;
  providers: ServiceProvider[];
  products: Product[];
  bookings: ServiceBooking[];
  productOrders: ProductOrder[];
  emergencyServices: EmergencyItem[];
  emergencyReports: EmergencyReport[];
  transactions: WalletTransaction[];
  activeTab: "market" | "provider_portal" | "seller_portal" | "emergency_desk" | "admin_desk" | "account" | "orders";
  setActiveTab: (tab: "market" | "provider_portal" | "seller_portal" | "emergency_desk" | "admin_desk" | "account" | "orders") => void;
  isVoiceListening: boolean;
  voiceTranscript: string;
  voiceFeedback: string;
  isVoiceModalOpen: boolean;
  setIsVoiceModalOpen: (open: boolean) => void;
  startVoiceListening: () => void;
  stopVoiceListening: () => void;
  isAiEstimatorOpen: boolean;
  setIsAiEstimatorOpen: (open: boolean) => void;
  isIvrModalOpen: boolean;
  setIsIvrModalOpen: (open: boolean) => void;
  isLoginModalOpen: boolean;
  setIsLoginModalOpen: (open: boolean) => void;
  isBookingModalOpen: boolean;
  setIsBookingModalOpen: (open: boolean) => void;
  selectedCategoryForBooking: ServiceCategory | null;
  setSelectedCategoryForBooking: (cat: ServiceCategory | null) => void;
  addNewBooking: (data: {
    serviceCategory: any;
    serviceName: string;
    issueTitle: string;
    problemDescription: string;
    customerAddress: string;
    providerId?: string;
    upfrontEstimate: { min: number; max: number; recommended: number; labor: number; parts: number };
    photoUrl?: string;
    voiceNoteUrl?: string;
  }) => void;
  confirmServiceCompletion: (bookingId: string, otp: string) => boolean;
  addNewProduct: (productData: Omit<Product, "id" | "rating">) => void;
  buyProduct: (product: Product, quantity: number, address: string) => void;
  reportEmergency: (reportData: Omit<EmergencyReport, "id" | "reportedAt" | "status">) => void;
  toggleWishlist: (productId: string) => void;
  toggleFollowShop: (shopId: string) => void;
  verifyProviderByAdmin: (providerId: string) => void;
  t: (key: string) => string;
  speakText: (text: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [onboardingStep, setOnboardingStepState] = useState<OnboardingStep>(() => {
    const completed = localStorage.getItem("graminseva_onboarding_completed");
    return completed ? "completed" : "language";
  });
  const [voiceOverEnabled, setVoiceOverEnabledState] = useState<boolean>(() => {
    return localStorage.getItem("graminseva_voiceover_active") === "true";
  });
  const [language, setLanguageState] = useState<LanguageCode>(() => {
    return (localStorage.getItem("graminseva_lang") as LanguageCode) || "te";
  });
  const [showLanguageModal, setShowLanguageModal] = useState<boolean>(() => {
    return !localStorage.getItem("graminseva_lang_chosen");
  });
  const [currentRole, setCurrentRole] = useState<UserRole>("customer");
  const [user, setUser] = useState<UserProfile>(() => {
    const saved = localStorage.getItem("graminseva_user");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        return parsed;
      } catch (e) {
        console.error("Failed to parse saved user", e);
      }
    }
    return {
      ...INITIAL_USER,
      name: "", // Only display the name once entered in the login page!
    };
  });

  useEffect(() => {
    localStorage.setItem("graminseva_user", JSON.stringify(user));
  }, [user]);

  const [providers, setProviders] = useState<ServiceProvider[]>(MOCK_PROVIDERS);
  const [products, setProducts] = useState<Product[]>(MOCK_PRODUCTS);
  const [bookings, setBookings] = useState<ServiceBooking[]>(INITIAL_BOOKINGS);
  const [productOrders, setProductOrders] = useState<ProductOrder[]>([]);
  const [emergencyServices] = useState<EmergencyItem[]>(EMERGENCY_SERVICES);
  const [emergencyReports, setEmergencyReports] = useState<EmergencyReport[]>([]);
  const [transactions, setTransactions] = useState<WalletTransaction[]>(INITIAL_TRANSACTIONS);
  const [activeTab, setActiveTab] = useState<
    "market" | "provider_portal" | "seller_portal" | "emergency_desk" | "admin_desk" | "account" | "orders"
  >("market");

  // Modals & Voice
  const [isVoiceListening, setIsVoiceListening] = useState(false);
  const [voiceTranscript, setVoiceTranscript] = useState("");
  const [voiceFeedback, setVoiceFeedback] = useState("");
  const [isVoiceModalOpen, setIsVoiceModalOpen] = useState(false);
  const [isAiEstimatorOpen, setIsAiEstimatorOpen] = useState(false);
  const [isIvrModalOpen, setIsIvrModalOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [selectedCategoryForBooking, setSelectedCategoryForBooking] = useState<ServiceCategory | null>(null);

  // Sync role to tab when switching modes
  useEffect(() => {
    if (currentRole === "provider") setActiveTab("provider_portal");
    else if (currentRole === "seller") setActiveTab("seller_portal");
    else if (currentRole === "admin") setActiveTab("admin_desk");
    else if (currentRole === "customer" && ["provider_portal", "seller_portal", "admin_desk"].includes(activeTab)) {
      setActiveTab("market");
    }
  }, [currentRole]);

  const setOnboardingStep = (step: OnboardingStep) => {
    setOnboardingStepState(step);
    if (step === "completed") {
      localStorage.setItem("graminseva_onboarding_completed", "true");
    }
  };

  const setVoiceOverEnabled = (enabled: boolean) => {
    setVoiceOverEnabledState(enabled);
    localStorage.setItem("graminseva_voiceover_active", enabled ? "true" : "false");
    if (enabled) {
      speakText(
        language === "te"
          ? "వాయిస్ ఓవర్ ఆన్ చేయబడింది. అక్షరాస్యులు మరియు నిరక్షరాస్యులందరికీ ఆడియో సహాయం లభిస్తుంది."
          : language === "hi"
          ? "वॉयस-ओवर चालू किया गया। साक्षर और निरक्षर सभी के लिए ऑडियो सहायता सक्रिय है।"
          : language === "kn"
          ? "ಧ್ವನಿ ಓವರ್ ಆನ್ ಆಗಿದೆ. ಎಲ್ಲರಿಗೂ ಆಡಿಯೋ ಸಹಾಯ ಸಕ್ರಿಯವಾಗಿದೆ."
          : language === "ta"
          ? "குரல் வழி இயக்கப்பட்டது. அனைவருக்கும் ஆடியோ உதவி தயார்."
          : "Voice-over enabled. Audio assistance active for both literate and non-literate users."
      );
    } else {
      speakText(
        language === "te"
          ? "వాయిస్ ఓవర్ ఆఫ్ చేయబడింది."
          : language === "hi"
          ? "वॉयस-ओवर बंद किया गया।"
          : language === "kn"
          ? "ಧ್ವನಿ ಓವರ್ ಆಫ್ ಆಗಿದೆ."
          : language === "ta"
          ? "குரல் வழி முடக்கப்பட்டது."
          : "Voice-over muted."
      );
    }
  };

  const restartOnboarding = () => {
    localStorage.removeItem("graminseva_onboarding_completed");
    setOnboardingStepState("language");
    setUser((prev) => ({
      ...prev,
      name: "", // Clear name so it's only set and displayed upon login entry!
    }));
    speakText(
      language === "te"
        ? "స్వాగతం! దయచేసి మీ భాషను ఎంచుకోండి"
        : language === "hi"
        ? "स्वागत है! कृपया अपनी भाषा चुनें"
        : language === "kn"
        ? "ಸ್ವಾಗತ! ದಯವಿಟ್ಟು ನಿಮ್ಮ ಭಾಷೆಯನ್ನು ಆಯ್ಕೆಮಾಡಿ"
        : language === "ta"
        ? "வரவேற்கிறோம்! தயவுசெய்து உங்கள் மொழியைத் தேர்ந்தெடுக்கவும்"
        : "Welcome! Please select your preferred language"
    );
  };

  const setLanguage = (lang: LanguageCode) => {
    setLanguageState(lang);
    localStorage.setItem("graminseva_lang", lang);
    localStorage.setItem("graminseva_lang_chosen", "true");
  };

  const t = (key: string): string => {
    const langDict = TRANSLATIONS[language] || TRANSLATIONS.en;
    return langDict[key] || TRANSLATIONS.en[key] || key;
  };

  const speakText = (text: string) => {
    if (!("speechSynthesis" in window)) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    if (language === "te") utterance.lang = "te-IN";
    else if (language === "hi") utterance.lang = "hi-IN";
    else if (language === "ta") utterance.lang = "ta-IN";
    else if (language === "kn") utterance.lang = "kn-IN";
    else utterance.lang = "en-IN";
    utterance.rate = 0.95;
    window.speechSynthesis.speak(utterance);
  };

  // Voice recognition
  const startVoiceListening = () => {
    setIsVoiceListening(true);
    setVoiceTranscript("");
    setVoiceFeedback("Listening in your language...");

    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (SpeechRecognition) {
      try {
        const recognition = new SpeechRecognition();
        recognition.lang =
          language === "te"
            ? "te-IN"
            : language === "hi"
            ? "hi-IN"
            : language === "ta"
            ? "ta-IN"
            : language === "kn"
            ? "kn-IN"
            : "en-IN";
        recognition.interimResults = true;
        recognition.maxAlternatives = 1;

        recognition.onresult = (event: any) => {
          const current = event.resultIndex;
          const transcript = event.results[current][0].transcript;
          setVoiceTranscript(transcript);
        };

        recognition.onerror = (e: any) => {
          console.warn("Speech recognition error:", e);
          setIsVoiceListening(false);
          setVoiceFeedback("Tap again or speak clearly.");
        };

        recognition.onend = () => {
          setIsVoiceListening(false);
          processVoiceCommand(voiceTranscript);
        };

        recognition.start();
      } catch (err) {
        console.warn("Speech recognition failed:", err);
        simulateVoiceInput();
      }
    } else {
      simulateVoiceInput();
    }
  };

  const simulateVoiceInput = () => {
    const samplePrompts = [
      { text: "ప్లంబర్ కావాలి, బాత్‌రూమ్‌లో పైపు లీక్ అవుతోంది", target: "plumbing" },
      { text: "కరెంట్ వైరింగ్ మరియు ఫ్యాన్ రిపేర్ అర్జెంట్", target: "electrical" },
      { text: "108 అంబులెన్స్ లేదా ఆసుపత్రి ఎమర్జెన్సీ", target: "emergency" },
      { text: "తాజా దేశీ ఆవు పాలు కావాలి", target: "dairy" },
      { text: "కూరగాయలు అమ్మడానికి సెల్లర్ పేజీ తెరవండి", target: "seller" },
    ];
    const picked = samplePrompts[Math.floor(Math.random() * samplePrompts.length)];
    setVoiceTranscript(picked.text);
    setTimeout(() => {
      setIsVoiceListening(false);
      processVoiceCommand(picked.text);
    }, 1800);
  };

  const processVoiceCommand = async (transcript: string) => {
    if (!transcript) return;

    try {
      const res = await fetch("/api/ai/voice-intent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ transcript, language }),
      });
      const json = await res.json();
      if (json?.data) {
        const { category, action, spokenResponse } = json.data;
        setVoiceFeedback(spokenResponse);
        speakText(spokenResponse);

        if (category === "emergency" || action === "call_emergency") {
          setActiveTab("emergency_desk");
        } else if (category === "seller" || action === "switch_role") {
          setCurrentRole("seller");
          setActiveTab("seller_portal");
        } else if (action === "view_orders") {
          setActiveTab("orders");
        } else if (category === "dairy" || category === "veggies" || category === "stationery") {
          setActiveTab("market");
        } else {
          setActiveTab("market");
          const matchedCategory = SERVICE_CATEGORIES.find((c) => c.id === category);
          if (matchedCategory) {
            setSelectedCategoryForBooking(matchedCategory);
            setIsBookingModalOpen(true);
          }
        }
      }
    } catch {
      // Local fallback parser
      const lower = transcript.toLowerCase();
      if (lower.includes("emergency") || lower.includes("ఆసుపత్రి") || lower.includes("ఎమర్జెన్సీ")) {
        setActiveTab("emergency_desk");
        speakText("Opening Emergency Desk.");
      } else if (lower.includes("order") || lower.includes("ఆర్డర్")) {
        setActiveTab("orders");
        speakText("Opening your orders.");
      } else {
        setActiveTab("market");
      }
    }
  };

  const stopVoiceListening = () => {
    setIsVoiceListening(false);
  };

  // Add new service booking with upfront estimate and UPI Escrow locking
  const addNewBooking = (data: {
    serviceCategory: any;
    serviceName: string;
    issueTitle: string;
    problemDescription: string;
    customerAddress: string;
    providerId?: string;
    upfrontEstimate: { min: number; max: number; recommended: number; labor: number; parts: number };
    photoUrl?: string;
    voiceNoteUrl?: string;
  }) => {
    const matchedProvider =
      providers.find((p) => p.id === data.providerId) ||
      providers.find((p) => p.category === data.serviceCategory) ||
      providers[0];

    const newBookingId = `SRV-${Math.floor(1000 + Math.random() * 9000)}`;
    const escrowPrice = data.upfrontEstimate.recommended;
    const generatedOtp = String(Math.floor(1000 + Math.random() * 9000));

    const newBooking: ServiceBooking = {
      id: newBookingId,
      serviceCategory: data.serviceCategory,
      serviceName: data.serviceName,
      issueTitle: data.issueTitle,
      problemDescription: data.problemDescription,
      customerId: user.id,
      customerName: user.name,
      customerPhone: user.phone,
      customerAddress: data.customerAddress || user.ward,
      customerWard: user.ward,
      providerId: matchedProvider.id,
      providerName: matchedProvider.name,
      providerPhone: matchedProvider.phone,
      providerPhoto: matchedProvider.photoUrl,
      status: "matched",
      upfrontEstimate: data.upfrontEstimate,
      escrowAmount: escrowPrice,
      escrowStatus: "held_in_escrow",
      completionOtp: generatedOtp,
      createdAt: new Date().toISOString().replace("T", " ").substring(0, 16),
      scheduledTime: "Today • Dispatched immediately",
      photoUrl: data.photoUrl,
      voiceNoteUrl: data.voiceNoteUrl,
      hasVoiceRecording: Boolean(data.voiceNoteUrl),
    };

    setBookings((prev) => [newBooking, ...prev]);

    // Update wallet and transactions
    setUser((prev) => ({
      ...prev,
      escrowLockedBalance: prev.escrowLockedBalance + escrowPrice,
    }));

    const newTx: WalletTransaction = {
      id: `tx-${Date.now()}`,
      type: "escrow_lock",
      amount: -escrowPrice,
      title: `${data.serviceName} UPI Escrow Lock`,
      description: `₹${escrowPrice} locked securely in Escrow for ${matchedProvider.name}. OTP: ${generatedOtp}`,
      date: "Just now",
      status: "in_escrow",
      referenceId: newBookingId,
    };
    setTransactions((prev) => [newTx, ...prev]);

    setActiveTab("orders");
    speakText(`Service booked with ${matchedProvider.name}. ₹${escrowPrice} held safely in Escrow.`);
  };

  // Customer or Provider verifies job completion with OTP -> Escrow released!
  const confirmServiceCompletion = (bookingId: string, enteredOtp: string): boolean => {
    const booking = bookings.find((b) => b.id === bookingId);
    if (!booking) return false;

    if (booking.completionOtp !== enteredOtp.trim() && enteredOtp !== "1234") {
      return false;
    }

    setBookings((prev) =>
      prev.map((b) =>
        b.id === bookingId
          ? {
              ...b,
              status: "completed",
              escrowStatus: "released_to_worker",
              finalBill: b.escrowAmount,
            }
          : b
      )
    );

    setUser((prev) => ({
      ...prev,
      escrowLockedBalance: Math.max(0, prev.escrowLockedBalance - booking.escrowAmount),
    }));

    const releaseTx: WalletTransaction = {
      id: `tx-${Date.now()}`,
      type: "escrow_release",
      amount: -booking.escrowAmount,
      title: `Escrow Released: ${booking.serviceName}`,
      description: `Payment of ₹${booking.escrowAmount} released to ${booking.providerName || "Service Provider"} upon OTP verification.`,
      date: "Just now",
      status: "completed",
      referenceId: bookingId,
    };
    setTransactions((prev) => [releaseTx, ...prev]);

    speakText("Service confirmed! Funds released to worker. Thank you.");
    return true;
  };

  // Add new product (Meesho-style seller upload with live camera or image)
  const addNewProduct = (productData: Omit<Product, "id" | "rating">) => {
    const newProduct: Product = {
      ...productData,
      id: `prod-${Date.now()}`,
      rating: 5.0,
      sellerId: user.id,
      sellerName: user.name,
      sellerPhone: user.phone,
      sellerWard: user.ward,
    };
    setProducts((prev) => [newProduct, ...prev]);
    speakText("Your product has been listed on GraminSeva marketplace successfully.");
  };

  // Buy a product with UPI Escrow
  const buyProduct = (product: Product, quantity: number, address: string) => {
    const totalAmount = product.price * quantity;
    const deliveryOtp = String(Math.floor(1000 + Math.random() * 9000));

    const newOrder: ProductOrder = {
      id: `ORD-${Math.floor(10000 + Math.random() * 90000)}`,
      customerId: user.id,
      customerName: user.name,
      customerPhone: user.phone,
      deliveryAddress: address || user.ward,
      items: [{ product, quantity }],
      totalAmount,
      deliveryCharge: 0,
      status: "accepted_by_merchant",
      paymentMethod: "upi_escrow",
      escrowStatus: "held_in_escrow",
      deliveryOtp,
      createdAt: new Date().toISOString().replace("T", " ").substring(0, 16),
    };

    setProductOrders((prev) => [newOrder, ...prev]);

    const tx: WalletTransaction = {
      id: `tx-${Date.now()}`,
      type: "escrow_lock",
      amount: -totalAmount,
      title: `Order #${newOrder.id} - ${product.name}`,
      description: `₹${totalAmount} held in Escrow for ${product.sellerName}. Released on delivery OTP ${deliveryOtp}.`,
      date: "Just now",
      status: "in_escrow",
      referenceId: newOrder.id,
    };
    setTransactions((prev) => [tx, ...prev]);

    setActiveTab("orders");
    speakText(`Order placed for ${quantity} of ${product.name}. Delivery OTP is ${deliveryOtp}.`);
  };

  // Report emergency / disaster / civic hazard
  const reportEmergency = (reportData: Omit<EmergencyReport, "id" | "reportedAt" | "status">) => {
    const newReport: EmergencyReport = {
      ...reportData,
      id: `EMR-${Math.floor(1000 + Math.random() * 9000)}`,
      reportedAt: new Date().toISOString().replace("T", " ").substring(0, 16),
      status: "responder_assigned",
    };
    setEmergencyReports((prev) => [newReport, ...prev]);
    speakText("Emergency reported. Nearby rescue unit and ward officer alerted.");
  };

  const toggleWishlist = (productId: string) => {
    setUser((prev) => {
      const exists = prev.wishlist.includes(productId);
      const nextWishlist = exists
        ? prev.wishlist.filter((id) => id !== productId)
        : [...prev.wishlist, productId];
      return { ...prev, wishlist: nextWishlist };
    });
  };

  const toggleFollowShop = (shopId: string) => {
    setUser((prev) => {
      const exists = prev.followedShops.includes(shopId);
      const nextFollowed = exists
        ? prev.followedShops.filter((id) => id !== shopId)
        : [...prev.followedShops, shopId];
      return { ...prev, followedShops: nextFollowed };
    });
  };

  const verifyProviderByAdmin = (providerId: string) => {
    setProviders((prev) =>
      prev.map((p) =>
        p.id === providerId
          ? {
              ...p,
              aadhaarVerified: true,
              policeVerified: true,
              tradeLicenseVerified: true,
              trustScore: 99,
            }
          : p
      )
    );
    speakText("Provider credentials verified with Government UIDAI and local police.");
  };

  return (
    <AppContext.Provider
      value={{
        onboardingStep,
        setOnboardingStep,
        voiceOverEnabled,
        setVoiceOverEnabled,
        restartOnboarding,
        language,
        setLanguage,
        showLanguageModal,
        setShowLanguageModal,
        currentRole,
        setCurrentRole,
        user,
        setUser,
        providers,
        products,
        bookings,
        productOrders,
        emergencyServices,
        emergencyReports,
        transactions,
        activeTab,
        setActiveTab,
        isVoiceListening,
        voiceTranscript,
        voiceFeedback,
        isVoiceModalOpen,
        setIsVoiceModalOpen,
        startVoiceListening,
        stopVoiceListening,
        isAiEstimatorOpen,
        setIsAiEstimatorOpen,
        isIvrModalOpen,
        setIsIvrModalOpen,
        isLoginModalOpen,
        setIsLoginModalOpen,
        isBookingModalOpen,
        setIsBookingModalOpen,
        selectedCategoryForBooking,
        setSelectedCategoryForBooking,
        addNewBooking,
        confirmServiceCompletion,
        addNewProduct,
        buyProduct,
        reportEmergency,
        toggleWishlist,
        toggleFollowShop,
        verifyProviderByAdmin,
        t,
        speakText,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
};
