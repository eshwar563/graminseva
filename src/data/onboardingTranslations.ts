import { LanguageCode } from "../types";

export interface OnboardingTranslation {
  stepper: {
    step1: string;
    step2: string;
    step3: string;
    step4: string;
    stepPrefix: string;
    ofPrefix: string;
  };
  languageStep: {
    badge: string;
    title: string;
    subtitle: string;
    listenGreeting: string;
    selectedBadge: string;
    nextBtn: string;
  };
  loginStep: {
    badge: string;
    title: string;
    subtitle: string;
    nameLabel: string;
    namePlaceholder: string;
    nameNotice: string;
    namePreviewLabel: string;
    noNameEntered: string;
    phoneLabel: string;
    phonePlaceholder: string;
    getOtpBtn: string;
    resendOtpBtn: string;
    otpLabel: string;
    otpSentMsg: string;
    quickDemoTitle: string;
    demoCustomer: string;
    demoSeller: string;
    audioHelpBtn: string;
    backBtn: string;
    verifyNextBtn: string;
    invalidPhone: string;
    invalidOtp: string;
  };
  voiceOverStep: {
    badge: string;
    title: string;
    subtitle: string;
    testAudioBtn: string;
    qualityBadge: string;
    card1Title: string;
    card1Subtitle: string;
    card1Desc: string;
    card2Title: string;
    card2Subtitle: string;
    card2Desc: string;
    card3Title: string;
    card3Subtitle: string;
    card3Desc: string;
    toggleLabel: string;
    toggleDesc: string;
    toggleActive: string;
    toggleMuted: string;
    backBtn: string;
    nextBtn: string;
  };
  portalsStep: {
    badge: string;
    title: string;
    subtitle: string;
    customerTitle: string;
    customerSubtitle: string;
    custF1: string;
    custF2: string;
    custF3: string;
    custF4: string;
    openCustomerBtn: string;
    sellerTitle: string;
    sellerSubtitle: string;
    sellerF1: string;
    sellerF2: string;
    sellerF3: string;
    sellerF4: string;
    openSellerBtn: string;
  };
}

export const ONBOARDING_TRANSLATIONS: Record<LanguageCode, OnboardingTranslation> = {
  te: {
    stepper: {
      step1: "1. భాష ఎంపిక",
      step2: "2. మొబైల్ లాగిన్",
      step3: "3. వాయిస్ ఓవర్ గైడ్",
      step4: "4. పోర్టల్స్ ఎంపిక",
      stepPrefix: "దశ",
      ofPrefix: "/",
    },
    languageStep: {
      badge: "భాష ఎంపిక & ఆడియో • Instant Vernacular Switch",
      title: "మీ ప్రాంతీయ భాషను ఎంచుకోండి",
      subtitle:
        "క్రింద ఉన్న ఏదైనా భాషను ఎంచుకోండి. యాప్ స్క్రీన్, బటన్లు, మరియు వాయిస్ రీడింగ్ అన్నీ వెంటనే ఆ భాషలోకి మారుతాయి.",
      listenGreeting: "ఈ భాషలో స్వాగతం వినండి 🔊",
      selectedBadge: "ఎంపిక చేయబడింది ✓",
      nextBtn: "తదుపరి: మొబైల్ లాగిన్ (Next: Login)",
    },
    loginStep: {
      badge: "సురక్షిత లాగిన్ • Secure Name & OTP Login",
      title: "గ్రామీణ సేవా ఖాతా లాగిన్",
      subtitle:
        "మీ పూర్తి పేరు మరియు మొబైల్ నంబర్ నమోదు చేయండి. మీరు పేరు నమోదు చేసిన తర్వాత మాత్రమే మీ పేరు యాప్‌లో ప్రదర్శించబడుతుంది.",
      nameLabel: "మీ పూర్తి పేరు (Full Name) *",
      namePlaceholder: "ఉదా: రమేష్ గౌడ్ లేదా Eshwar",
      nameNotice: "ℹ️ గమనిక: మీరు ఇక్కడ పేరు నమోదు చేసిన తర్వాత మాత్రమే హోమ్‌పేజీ & ప్రొఫైల్‌లో మీ పేరు కనిపిస్తుంది.",
      namePreviewLabel: "ప్రదర్శించబడే పేరు (Display Name):",
      noNameEntered: "పేరు ఇంకా నమోదు చేయలేదు (గెస్ట్ గా ఉంటారు)",
      phoneLabel: "మొబైల్ ఫోన్ నంబర్ (Mobile Number) *",
      phonePlaceholder: "10 అంకెల మొబైల్ నంబర్ (ఉదా: 98480 22334)",
      getOtpBtn: "ఓటీపీ పంపండి (Get OTP)",
      resendOtpBtn: "మళ్ళీ పంపండి",
      otpLabel: "4 అంకెల ఓటీపీ కోడ్ (డెమో: 5429)",
      otpSentMsg: "మీ నంబర్‌కు SMS & WhatsApp ద్వారా OTP పంపబడింది. డెమో కోడ్: 5429",
      quickDemoTitle: "లేదా 1-క్లిక్ డెమో ప్రొఫైల్ ఎంచుకోండి:",
      demoCustomer: "రమేష్ గౌడ్ (కస్టమర్)",
      demoSeller: "లక్ష్మమ్మ (రైతు & విక్రేత)",
      audioHelpBtn: "ఆడియో సహాయం వినండి 🔊",
      backBtn: "వెనుకకు: భాష ఎంపిక",
      verifyNextBtn: "లాగిన్ చేయండి & వాయిస్ ఓవర్ గైడ్‌కి వెళ్ళండి",
      invalidPhone: "దయచేసి సరైన 10 అంకెల మొబైల్ నంబర్ ఇవ్వండి",
      invalidOtp: "తప్పుడు ఓటీపీ. దయచేసి 5429 నమోదు చేయండి",
    },
    voiceOverStep: {
      badge: "Inclusive Digital Design • అక్షరాస్యులు & నిరక్షరాస్యులందరి కోసం",
      title: "వాయిస్ ఓవర్ & ఆడియో సహాయకుడు (అందరి కోసం)",
      subtitle:
        "అక్షరాస్యులకు వేగవంతమైన హ్యాండ్స్-ఫ్రీ వాయిస్ సహాయం, అలాగే చదవడం రాని నిరక్షరాస్యులు మరియు వృద్ధులకు ప్రతి బటన్ మరియు ధరను స్పష్టంగా చదివి వినిపించే సదుపాయం.",
      testAudioBtn: "వాయిస్ ఆడియో టెస్ట్ చేయండి 🔊",
      qualityBadge: "హై-క్లారిటీ నేచురల్ వాయిస్",
      card1Title: "1. అక్షరాస్యుల కోసం (For Literate Users)",
      card1Subtitle: "హ్యాండ్స్-ఫ్రీ వాయిస్ శోధన & ఆడియో సారాంశం",
      card1Desc:
        "పనుల్లో ఉన్నప్పుడు స్క్రీన్ చూడకుండానే వాయిస్ ద్వారా ధరలు వినవచ్చు, వేగంగా శోధించవచ్చు మరియు ఆర్డర్ చేయవచ్చు.",
      card2Title: "2. నిరక్షరాస్యుల & పెద్దల కోసం (For Non-Readers & Elderly)",
      card2Subtitle: "చదవాల్సిన పనిలేదు • టచ్-టు-స్పీక్ సదుపాయం",
      card2Desc:
        "యాప్‌లోని ఏ బటన్, సర్వీస్ లేదా వస్తువును తాకినా, ధర మరియు వివరాలు మీ భాషలోనే స్పష్టంగా చదివి వినిపిస్తాయి.",
      card3Title: "3. వాయిస్ మైక్ & ఉచిత IVR ఫోన్ కాల్",
      card3Subtitle: "నోటి మాటతో బుకింగ్ & 1800 ఫోన్ లైన్",
      card3Desc:
        "మైక్ నొక్కి నేరుగా మీ భాషలో మాట్లాడండి లేదా 1800-419-7382 కి ఉచిత కాల్ చేసి ఫోన్‌లోనే సేవలు పొందండి.",
      toggleLabel: "వాయిస్ ఓవర్ ఆటో రీడర్ (Voice-Over Auto Reader)",
      toggleDesc: "బటన్లు, ధరలు మరియు నిర్ధారణలను స్వయంచాలకంగా వినడానికి దీన్ని ఆన్‌లో ఉంచండి.",
      toggleActive: "వాయిస్ ఆన్ (Active)",
      toggleMuted: "వాయిస్ ఆఫ్ (Muted)",
      backBtn: "వెనుకకు: లాగిన్",
      nextBtn: "తదుపరి: కస్టమర్ లేదా సెల్లర్ ఎంపిక",
    },
    portalsStep: {
      badge: "పోర్టల్ ఎంపిక • Dedicated Customer & Seller Portals",
      title: "మీరు ఏ పోర్టల్‌లోకి ప్రవేశించాలనుకుంటున్నారు?",
      subtitle:
        "కస్టమర్‌గా సేవలు పొందడానికి లేదా సెల్లర్‌గా సరుకులు అమ్మడానికి క్రింద ఉన్న పోర్టల్‌ను ఎంచుకోండి.",
      customerTitle: "కస్టమర్ మార్కెట్ పేజీ",
      customerSubtitle: "గృహ సేవలు, స్థానిక వస్తువులు & 108 ఎమర్జెన్సీ",
      custF1: "ధృవీకరించబడిన ప్లంబర్, కరెంట్, వాషింగ్ మెషీన్ రిపేర్లు",
      custF2: "తాజా ఆవు పాలు, తోట కూరగాయలు & జెరాక్స్ సేవలు",
      custF3: "108 అంబులెన్స్ & 24x7 అత్యవసర సేవలు",
      custF4: "UPI ఎస్క్రో రక్షణ: పని పూర్తయ్యాకే చెల్లింపు విడుదల",
      openCustomerBtn: "కస్టమర్ పేజీ తెరవండి (Open Customer Page)",
      sellerTitle: "సెల్లర్ & వ్యాపార కేంద్రం",
      sellerSubtitle: "కూరగాయలు, పాలు, చేతి పనుల అమ్మకాలు (కేవలం 4% ఫీజు)",
      sellerF1: "తోట కూరగాయలు, ఆవు పాలు, చేతి పనుల ప్రత్యక్ష అమ్మకాలు",
      sellerF2: "మొబైల్ కెమెరాతో ఫోటో తీసి 1 నిమిషంలో సులభంగా లిస్ట్ చేయండి",
      sellerF3: "కేవలం 4% తక్కువ కమీషన్ (నగరాల 25% దోపిడీ లేదు)",
      sellerF4: "డెలివరీ OTP నమోదు చేయగానే నేరుగా మీ బ్యాంక్/UPI లో నగదు",
      openSellerBtn: "సెల్లర్ పేజీ తెరవండి (Open Seller Page)",
    },
  },
  hi: {
    stepper: {
      step1: "1. भाषा चयन",
      step2: "2. मोबाइल लॉगिन",
      step3: "3. वॉयस-ओवर गाइड",
      step4: "4. पोर्टल चयन",
      stepPrefix: "चरण",
      ofPrefix: "/",
    },
    languageStep: {
      badge: "मातृभाषा चयन • Instant Vernacular Switch",
      title: "अपनी स्थानीय भाषा चुनें",
      subtitle:
        "नीचे दी गई किसी भी भाषा पर क्लिक करें। स्क्रीन के सभी शब्द, बटन और वॉयस रीडिंग तुरंत उस भाषा में बदल जाएंगे।",
      listenGreeting: "इस भाषा में स्वागत सुनें 🔊",
      selectedBadge: "चयनित ✓",
      nextBtn: "आगे बढ़ें: मोबाइल लॉगिन (Next: Login)",
    },
    loginStep: {
      badge: "सुरक्षित लॉगिन • Secure Name & OTP Login",
      title: "ग्रामीण सेवा खाता लॉगिन",
      subtitle:
        "कृपया अपना पूरा नाम और मोबाइल नंबर दर्ज करें। नाम दर्ज करने के बाद ही आपका नाम स्क्रीन पर प्रदर्शित होगा।",
      nameLabel: "आपका पूरा नाम (Full Name) *",
      namePlaceholder: "उदा: रमेश कुमार या ईश्वर",
      nameNotice: "ℹ️ ध्यान दें: आप यहां नाम दर्ज करेंगे तभी होमपेज और प्रोफाइल पर आपका नाम दिखाई देगा।",
      namePreviewLabel: "प्रदर्शित होने वाला नाम (Display Name):",
      noNameEntered: "अभी नाम दर्ज नहीं है (अतिथि रहेंगे)",
      phoneLabel: "मोबाइल नंबर (Mobile Phone Number) *",
      phonePlaceholder: "10 अंकों का मोबाइल नंबर (उदा: 98480 22334)",
      getOtpBtn: "ओटीपी भेजें (Get OTP)",
      resendOtpBtn: "पुनः भेजें",
      otpLabel: "4 अंकों का OTP कोड (डेमो: 5429)",
      otpSentMsg: "आपके नंबर पर SMS और WhatsApp द्वारा OTP भेजा गया है। डेमो कोड: 5429",
      quickDemoTitle: "या 1-क्लिक डेमो प्रोफाइल चुनें:",
      demoCustomer: "रमेश गौड़ (ग्राहक)",
      demoSeller: "लक्ष्मी देवी (विक्रेता)",
      audioHelpBtn: "ऑडियो निर्देश सुनें 🔊",
      backBtn: "पीछे: भाषा चयन",
      verifyNextBtn: "लॉगिन करें और वॉयस-ओवर गाइड पर जाएं",
      invalidPhone: "कृपया 10 अंकों का मान्य मोबाइल नंबर दर्ज करें",
      invalidOtp: "अमान्य OTP। कृपया डेमो कोड 5429 दर्ज करें",
    },
    voiceOverStep: {
      badge: "Inclusive Digital Design • साक्षर एवं निरक्षर सभी के लिए",
      title: "वॉयस-ओवर एवं ऑडियो सहायक (सभी के लिए)",
      subtitle:
        "साक्षर लोगों के लिए त्वरित हैंड्स-फ्री वॉयस सुविधा, और निरक्षर व बुजुर्गों के लिए हर बटन और कीमत को बोलकर सुनाने की सुविधा।",
      testAudioBtn: "वॉयस ऑडियो टेस्ट करें 🔊",
      qualityBadge: "उच्च स्पष्टता वाली प्राकृतिक आवाज",
      card1Title: "1. साक्षर उपयोगकर्ताओं के लिए (For Literates)",
      card1Subtitle: "हैंड्स-फ्री वॉयस सर्च एवं ऑडियो सारांश",
      card1Desc:
        "काम करते समय बिना स्क्रीन देखे भी बोलकर ऑर्डर कर सकते हैं, कीमतें सुन सकते हैं और त्वरित खोज कर सकते हैं।",
      card2Title: "2. निरक्षर एवं बुजुर्गों के लिए (For Non-Readers & Elderly)",
      card2Subtitle: "पढ़ने की जरूरत नहीं • टच-टू-स्पीक सुविधा",
      card2Desc:
        "ऐप के किसी भी बटन, सेवा या उत्पाद को छूते ही पूरी जानकारी और कीमत आपकी भाषा में बोलकर सुनाई जाएगी।",
      card3Title: "3. वॉयस माइक और टोल-फ्री IVR फोन कॉल",
      card3Subtitle: "सीधी बातचीत और 1800 फोन लाइन",
      card3Desc:
        "माइक दबाकर बोलें या 1800-419-7382 पर मुफ्त कॉल करके फोन पर ही सेवाएं पाएं।",
      toggleLabel: "वॉयस-ओवर ऑटो रीडर (Voice-Over Auto Reader)",
      toggleDesc: "बटन, कीमतें और पुष्टि अपने आप सुनने के लिए इसे चालू रखें।",
      toggleActive: "वॉयस चालू (Active)",
      toggleMuted: "वॉयस बंद (Muted)",
      backBtn: "पीछे: लॉगिन",
      nextBtn: "आगे बढ़ें: ग्राहक या विक्रेता पोर्टल चयन",
    },
    portalsStep: {
      badge: "पोर्टल चयन • Dedicated Customer & Seller Portals",
      title: "आप किस पोर्टल में प्रवेश करना चाहते हैं?",
      subtitle:
        "ग्राहक के रूप में सेवाएं लेने या विक्रेता के रूप में सामान बेचने के लिए नीचे दिए गए पोर्टल को चुनें।",
      customerTitle: "ग्राहक बाज़ार पेज (Customer Market)",
      customerSubtitle: "घरेलू सेवाएं, स्थानीय सामान और 108 इमरजेंसी",
      custF1: "सत्यापित प्लंबर, बिजली व उपकरण मरम्मत पेशेवर",
      custF2: "ताजा दूध, खेत की सब्जियां और स्थानीय किराना",
      custF3: "108 एम्बुलेंस और 24x7 आपातकालीन सहायता",
      custF4: "UPI एस्क्रो सुरक्षा: काम पूरा होने के बाद ही भुगतान",
      openCustomerBtn: "ग्राहक पेज खोलें (Open Customer Page)",
      sellerTitle: "विक्रेता एवं व्यापार केंद्र (Seller Hub)",
      sellerSubtitle: "सब्जियां, दूध व हस्तशिल्प बेचें (केवल 4% शुल्क)",
      sellerF1: "सब्जियों, दूध और हस्तशिल्प की सीधी बिक्री",
      sellerF2: "कैमरे से फोटो खींचकर 1 मिनट में आसानी से लिस्ट करें",
      sellerF3: "केवल 4% न्यूनतम कमीशन (शहरी 25% कमीशन से मुक्ति)",
      sellerF4: "डिलीवरी OTP दर्ज करते ही तुरंत बैंक/UPI में पैसा",
      openSellerBtn: "विक्रेता पेज खोलें (Open Seller Page)",
    },
  },
  en: {
    stepper: {
      step1: "1. Language",
      step2: "2. Mobile Login",
      step3: "3. Voice-Over Guide",
      step4: "4. Portals",
      stepPrefix: "Step",
      ofPrefix: "of",
    },
    languageStep: {
      badge: "Vernacular Selection • Instant Multi-lingual Switch",
      title: "Select Your Preferred Language",
      subtitle:
        "Click any language below. All screens, buttons, and voice reading will instantly switch to that language.",
      listenGreeting: "Listen Audio Greeting 🔊",
      selectedBadge: "Selected ✓",
      nextBtn: "Next: Mobile & OTP Login",
    },
    loginStep: {
      badge: "Secure Login • Name & OTP Verification",
      title: "GraminSeva Account Login",
      subtitle:
        "Please enter your full name and mobile number. Your name will only be displayed across the app once you enter it here.",
      nameLabel: "Your Full Name *",
      namePlaceholder: "e.g. Ramesh Babu or Eshwar Rao",
      nameNotice: "ℹ️ Note: Your name will only be displayed across the header and profile once entered here.",
      namePreviewLabel: "Display Name Preview:",
      noNameEntered: "No name entered yet (will appear as Guest)",
      phoneLabel: "Mobile Phone Number *",
      phonePlaceholder: "10-digit mobile number (e.g. 98480 22334)",
      getOtpBtn: "Get OTP",
      resendOtpBtn: "Resend OTP",
      otpLabel: "4-Digit OTP Code (Demo: 5429)",
      otpSentMsg: "OTP sent via SMS & WhatsApp. Demo code is 5429",
      quickDemoTitle: "Or Choose a 1-Click Demo Profile:",
      demoCustomer: "Ramesh Goud (Customer)",
      demoSeller: "Laxmamma (Farmer & Seller)",
      audioHelpBtn: "Listen Voice Help 🔊",
      backBtn: "Back to Language",
      verifyNextBtn: "Verify & Proceed to Voice-Over Guide",
      invalidPhone: "Please enter a valid 10-digit mobile number",
      invalidOtp: "Invalid OTP. Please enter demo code 5429",
    },
    voiceOverStep: {
      badge: "Inclusive Digital Design • For Literates & Non-Literates",
      title: "Voice-Over & Audio Guide (For Everyone)",
      subtitle:
        "Designed for literate users seeking quick hands-free voice assistance, as well as illiterate and elderly citizens who rely on spoken audio for every button and price.",
      testAudioBtn: "Test Audio Voice Now 🔊",
      qualityBadge: "High-Clarity Natural Speech",
      card1Title: "1. For Literate Users (Hands-Free Voice)",
      card1Subtitle: "Voice Search Commands & Quick Audio Quotes",
      card1Desc:
        "Hear instant price breakdowns, search rapidly, and place bookings hands-free without staring at the screen.",
      card2Title: "2. For Non-Readers & Elderly (Touch-to-Speak)",
      card2Subtitle: "No Reading Required • Everything Read Aloud",
      card2Desc:
        "Tap any button, service card, or price tag to instantly hear it spoken aloud clearly in your native language.",
      card3Title: "3. Voice Mic & Toll-Free Phone Booking",
      card3Subtitle: "Natural Speech & 1800 Phone Line",
      card3Desc:
        "Speak naturally into the mic or dial 1800-419-7382 toll-free to book verified services over a regular phone call.",
      toggleLabel: "Voice-Over Auto Reader (For Everyone)",
      toggleDesc: "Keep this ON to hear buttons, prices, and confirmations read aloud automatically.",
      toggleActive: "Voice Active (ON)",
      toggleMuted: "Voice Muted (OFF)",
      backBtn: "Back to Login",
      nextBtn: "Next: Customer vs Seller Portal",
    },
    portalsStep: {
      badge: "Portal Selection • Separate Customer & Seller Portals",
      title: "Which portal would you like to enter?",
      subtitle:
        "Select whether you want to book services & buy goods as a Customer, or sell produce & provide services as a Merchant.",
      customerTitle: "Customer Market Page",
      customerSubtitle: "Home Services, Local Goods & 108 Emergency",
      custF1: "Verified plumbers, electricians & technicians",
      custF2: "Fresh dairy milk, vegetables & local goods",
      custF3: "108 Ambulance, Fire & 24x7 Emergency Desk",
      custF4: "UPI Escrow Protection: Funds released only after confirmed work",
      openCustomerBtn: "Open Customer Market Page",
      sellerTitle: "Seller & Merchant Hub",
      sellerSubtitle: "Sell Veggies, Dairy & Crafts with Fair 4% Low Fee",
      sellerF1: "Sell fresh mandi vegetables, dairy milk & handcrafts",
      sellerF2: "Snap photo with camera & list items in under 1 minute",
      sellerF3: "Fair 4% flat platform fee (Avoid 25% predatory urban markups)",
      sellerF4: "Instant UPI payout directly upon customer delivery OTP",
      openSellerBtn: "Open Seller & Merchant Page",
    },
  },
  kn: {
    stepper: {
      step1: "1. ಭಾಷೆ",
      step2: "2. ಮೊಬೈಲ್ ಲಾಗಿನ್",
      step3: "3. ಧ್ವನಿ ಓವರ್ ಗೈಡ್",
      step4: "4. ಪೋರ್ಟಲ್ಸ್",
      stepPrefix: "ಹಂತ",
      ofPrefix: "/",
    },
    languageStep: {
      badge: "ಮಾತೃಭಾಷೆ ಆಯ್ಕೆ • Instant Vernacular Switch",
      title: "ನಿಮ್ಮ ಸ್ಥಳೀಯ ಭಾಷೆಯನ್ನು ಆಯ್ಕೆಮಾಡಿ",
      subtitle:
        "ಕೆಳಗಿನ ಯಾವುದೇ ಭಾಷೆಯನ್ನು ಆಯ್ಕೆಮಾಡಿ. ಇಡೀ ಆ್ಯಪ್ ಮತ್ತು ಆಡಿಯೋ ತಕ್ಷಣವೇ ಆ ಭಾಷೆಗೆ ಬದಲಾಗುತ್ತದೆ.",
      listenGreeting: "ಈ ಭಾಷೆಯಲ್ಲಿ ಸ್ವಾಗತ ಸಂದೇಶ ಕೇಳಿ 🔊",
      selectedBadge: "ಆಯ್ಕೆಮಾಡಲಾಗಿದೆ ✓",
      nextBtn: "ಮುಂದೆ: ಮೊಬೈಲ್ ಲಾಗಿನ್ (Next: Login)",
    },
    loginStep: {
      badge: "ಸುರಕ್ಷಿತ ಲಾಗಿನ್ • Secure Name & OTP Login",
      title: "ಗ್ರಾಮೀಣ ಸೇವಾ ಖಾತೆ ಲಾಗಿನ್",
      subtitle:
        "ದಯವಿಟ್ಟು ನಿಮ್ಮ ಹೆಸರು ಮತ್ತು ಮೊಬೈಲ್ ಸಂಖ್ಯೆಯನ್ನು ನಮೂದಿಸಿ. ಇಲ್ಲಿ ಹೆಸರು ನಮೂದಿಸಿದ ನಂತರವೇ ನಿಮ್ಮ ಹೆಸರು ಪರದೆಯ ಮೇಲೆ ಕಾಣಿಸುತ್ತದೆ.",
      nameLabel: "ನಿಮ್ಮ ಪೂರ್ಣ ಹೆಸರು (Full Name) *",
      namePlaceholder: "ಉದಾ: ರಮೇಶ್ ಗೌಡ ಅಥವಾ ಈಶ್ವರ್",
      nameNotice: "ℹ️ ಗಮನಿಸಿ: ನೀವು ಇಲ್ಲಿ ಹೆಸರು ನಮೂದಿಸಿದ ನಂತರವೇ ಮುಖಪುಟ ಮತ್ತು ಪ್ರೊಫೈಲ್‌ನಲ್ಲಿ ನಿಮ್ಮ ಹೆಸರು ಕಾಣಿಸುತ್ತದೆ.",
      namePreviewLabel: "ಪ್ರದರ್ಶನಗೊಳ್ಳುವ ಹೆಸರು (Display Name):",
      noNameEntered: "ಇನ್ನೂ ಹೆಸರು ನಮೂದಿಸಿಲ್ಲ (ಅತಿಥಿಯಾಗಿರುತ್ತೀರಿ)",
      phoneLabel: "ಮೊಬೈಲ್ ಸಂಖ್ಯೆ (Mobile Number) *",
      phonePlaceholder: "10 ಅಂಕಿಯ ಮೊಬೈಲ್ ಸಂಖ್ಯೆ",
      getOtpBtn: "OTP ಕಳುಹಿಸಿ (Get OTP)",
      resendOtpBtn: "ಮತ್ತೆ ಕಳುಹಿಸಿ",
      otpLabel: "4 ಅಂಕಿಯ OTP ಕೋಡ್ (ಡೆಮೊ: 5429)",
      otpSentMsg: "ನಿಮ್ಮ ಸಂಖ್ಯೆಗೆ SMS & WhatsApp ಮೂಲಕ OTP ಕಳುಹಿಸಲಾಗಿದೆ. ಡೆಮೊ ಕೋಡ್: 5429",
      quickDemoTitle: "ಅಥವಾ 1-ಕ್ಲಿಕ್ ಡೆಮೊ ಪ್ರೊಫೈಲ್ ಆಯ್ಕೆಮಾಡಿ:",
      demoCustomer: "ರಮೇಶ್ ಗೌಡ (ಗ್ರಾಹಕ)",
      demoSeller: "ಲಕ್ಷ್ಮಮ್ಮ (ರೈತ ಮತ್ತು ಮಾರಾಟಗಾರ)",
      audioHelpBtn: "ಧ್ವನಿ ಸೂಚನೆ ಕೇಳಿ 🔊",
      backBtn: "ಹಿಂದೆ: ಭಾಷೆ ಆಯ್ಕೆ",
      verifyNextBtn: "ದೃಢೀಕರಿಸಿ ಮತ್ತು ಧ್ವನಿ ಓವರ್ ಗೈಡ್‌ಗೆ ಹೋಗಿ",
      invalidPhone: "ದಯವಿಟ್ಟು ಮಾನ್ಯವಾದ 10 ಅಂಕಿಯ ಮೊಬೈಲ್ ಸಂಖ್ಯೆ ನಮೂದಿಸಿ",
      invalidOtp: "ತಪ್ಪು OTP. ಡೆಮೊ ಕೋಡ್ 5429 ಬಳಸಿ",
    },
    voiceOverStep: {
      badge: "Inclusive Digital Design • ಎಲ್ಲರಿಗೂ ಸುಲಭವಾದ ಧ್ವನಿ ಸೌಲಭ್ಯ",
      title: "ಧ್ವನಿ ಓವರ್ ಮತ್ತು ಆಡಿಯೋ ಮಾರ್ಗದರ್ಶಿ (ಎಲ್ಲರಿಗೂ)",
      subtitle:
        "ಸಾಕ್ಷರರಿಗೆ ತ್ವರಿತ ಹ್ಯಾಂಡ್ಸ್-ಫ್ರೀ ಧ್ವನಿ ಸೌಲಭ್ಯ, ಮತ್ತು ಓದಲು ಬಾರದವರಿಗೆ ಪ್ರತಿಯೊಂದು ಬಟನ್ ಮತ್ತು ಬೆಲೆಯನ್ನು ಓದಿ ಹೇಳುವ ಸೌಲಭ್ಯ.",
      testAudioBtn: "ಧ್ವನಿ ಆಡಿಯೋ ಪರೀಕ್ಷಿಸಿ 🔊",
      qualityBadge: "ಸ್ಪಷ್ಟ ನೈಸರ್ಗಿಕ ಧ್ವನಿ",
      card1Title: "1. ಸಾಕ್ಷರರಿಗಾಗಿ (For Literate Users)",
      card1Subtitle: "ಹ್ಯಾಂಡ್ಸ್-ಫ್ರೀ ಧ್ವನಿ ಹುಡುಕಾಟ ಮತ್ತು ಬೆಲೆ ವಿವರ",
      card1Desc:
        "ಸ್ಕ್ರೀನ್ ನೋಡದೆ ಧ್ವನಿಯ ಮೂಲಕ ಬೆಲೆಗಳನ್ನು ಆಲಿಸಬಹುದು, ವೇಗವಾಗಿ ಹುಡುಕಬಹುದು ಮತ್ತು ಬುಕ್ ಮಾಡಬಹುದು.",
      card2Title: "2. ಅನಕ್ಷರಸ್ಥರು ಮತ್ತು ಹಿರಿಯರಿಗಾಗಿ (For Non-Readers)",
      card2Subtitle: "ಓದುವ ಅಗತ್ಯವಿಲ್ಲ • ಮುಟ್ಟಿದರೆ ಧ್ವನಿ ಕೇಳಿಸುತ್ತದೆ",
      card2Desc:
        "ಆ್ಯಪ್‌ನ ಯಾವುದೇ ಬಟನ್, ಸೇವೆ ಅಥವಾ ವಸ್ತುವನ್ನು ಮುಟ್ಟಿದರೂ ವಿವರಗಳು ನಿಮ್ಮ ಭಾಷೆಯಲ್ಲೇ ಸ್ಪಷ್ಟವಾಗಿ ಕೇಳಿಸುತ್ತವೆ.",
      card3Title: "3. ಧ್ವನಿ ಮೈಕ್ & ಉಚಿತ IVR ಫೋನ್ ಕರೆ",
      card3Subtitle: "ಮಾತಿನ ಮೂಲಕ ಬುಕಿಂಗ್ ಮತ್ತು 1800 ಫೋನ್ ಲೈನ್",
      card3Desc:
        "ಮೈಕ್ ಒತ್ತಿ ನೇರವಾಗಿ ಮಾತನಾಡಿ ಅಥವಾ 1800-419-7382 ಗೆ ಕರೆ ಮಾಡಿ ಫೋನ್‌ನಲ್ಲೇ ಸೇವೆ ಪಡೆಯಿರಿ.",
      toggleLabel: "ಧ್ವನಿ ಓವರ್ ಆಟೋ ರೀಡರ್ (Voice-Over Reader)",
      toggleDesc: "ಬಟನ್‌ಗಳು ಮತ್ತು ಬೆಲೆಗಳನ್ನು ಸ್ವಯಂಚಾಲಿತವಾಗಿ ಕೇಳಲು ಆನ್‌ನಲ್ಲಿಡಿ.",
      toggleActive: "ಧ್ವನಿ ಆನ್ (Active)",
      toggleMuted: "ಧ್ವನಿ ಆಫ್ (Muted)",
      backBtn: "ಹಿಂದೆ: ಲಾಗಿನ್",
      nextBtn: "ಮುಂದೆ: ಗ್ರಾಹಕ ಅಥವಾ ಮಾರಾಟಗಾರ ಪೋರ್ಟಲ್ ಆಯ್ಕೆ",
    },
    portalsStep: {
      badge: "ಪೋರ್ಟಲ್ ಆಯ್ಕೆ • Dedicated Customer & Seller Portals",
      title: "ನೀವು ಯಾವ ಪೋರ್ಟಲ್ ಪ್ರವೇಶಿಸಲು ಬಯಸುತ್ತೀರಿ?",
      subtitle:
        "ಗ್ರಾಹಕರಾಗಿ ಸೇವೆಗಳನ್ನು ಪಡೆಯಲು ಅಥವಾ ಮಾರಾಟಗಾರರಾಗಿ ಉತ್ಪನ್ನ ಮಾರಾಟ ಮಾಡಲು ಆಯ್ಕೆಮಾಡಿ.",
      customerTitle: "ಗ್ರಾಹಕ ಮಾರುಕಟ್ಟೆ ಪೇಜ್",
      customerSubtitle: "ಮನೆ ಸೇವೆಗಳು, ಸ್ಥಳೀಯ ವಸ್ತುಗಳು & 108 ತುರ್ತು ಸೇವೆ",
      custF1: "ಪರಿಶೀಲಿಸಿದ ಪ್ಲಂಬರ್, ಎಲೆಕ್ಟ್ರಿಷಿಯನ್, ರಿಪೇರಿ ತಜ್ಞರು",
      custF2: "ತಾಜಾ ಹಾಲು, ತರಕಾರಿ ಮತ್ತು ದಿನಸಿ ವಸ್ತುಗಳು",
      custF3: "108 ಆಂಬ್ಯುಲೆನ್ಸ್ ಮತ್ತು 24x7 ತುರ್ತು ನೆರವು",
      custF4: "UPI ಎಸ್ಕ್ರೋ ರಕ್ಷಣೆ: ಕೆಲಸ ಮುಗಿದ ನಂತರವೇ ಹಣ ಬಿಡುಗಡೆ",
      openCustomerBtn: "ಗ್ರಾಹಕ ಪೇಜ್ ತೆರೆಯಿರಿ (Open Customer Page)",
      sellerTitle: "ಮಾರಾಟಗಾರರ ವ್ಯಾಪಾರ ಕೇಂದ್ರ",
      sellerSubtitle: "ತರಕಾರಿ, ಹಾಲು ಮತ್ತು ಕರಕುಶಲ ಮಾರಾಟ (ಕೇವಲ 4% ಶುಲ್ಕ)",
      sellerF1: "ತರಕಾರಿ, ಹಾಲು ಮತ್ತು ಕರಕುಶಲ ವಸ್ತುಗಳ ನೇರ ಮಾರಾಟ",
      sellerF2: "ಕ್ಯಾಮೆರಾದಿಂದ ಫೋಟೋ ತೆಗೆದು 1 ನಿಮಿಷದಲ್ಲಿ ಲಿಸ್ಟ್ ಮಾಡಿ",
      sellerF3: "ಕೇವಲ 4% ಕಡಿಮೆ ಕಮಿಷನ್ (ನಗರಗಳ ಶೋಷಣೆಯಿಂದ ಮುಕ್ತಿ)",
      sellerF4: "ಡೆಲಿವರಿ OTP ದಾಖಲಿಸಿದ ನಂತರ ತಕ್ಷಣವೇ UPI/ಬ್ಯಾಂಕ್ ಖಾತೆಗೆ ಹಣ",
      openSellerBtn: "ಮಾರಾಟಗಾರರ ಪೇಜ್ ತೆರೆಯಿರಿ (Open Seller Page)",
    },
  },
  ta: {
    stepper: {
      step1: "1. மொழி",
      step2: "2. மொபைல் உள்நுழைவு",
      step3: "3. குரல் வழி வழிகாட்டி",
      step4: "4. தளங்கள்",
      stepPrefix: "படி",
      ofPrefix: "/",
    },
    languageStep: {
      badge: "தாய்மொழி தேர்வு • Instant Vernacular Switch",
      title: "உங்கள் விருப்ப மொழியைத் தேர்ந்தெடுக்கவும்",
      subtitle:
        "கீழேயுள்ள ஏதேனும் மொழியைக் கிளிக் செய்க. திரையின் அனைத்து விவரங்களும் ஆடியோவும் உடனடியாக அந்த மொழிக்கு மாறும்.",
      listenGreeting: "இந்த மொழியில் வரவேற்பை கேளுங்கள் 🔊",
      selectedBadge: "தேர்ந்தெடுக்கப்பட்டது ✓",
      nextBtn: "அடுத்து: மொபைல் உள்நுழைவு (Next: Login)",
    },
    loginStep: {
      badge: "பாதுகாப்பான உள்நுழைவு • Secure Name & OTP Login",
      title: "கிராமின் சேவா கணக்கு உள்நுழைவு",
      subtitle:
        "தயவுசெய்து உங்கள் முழுப் பெயர் மற்றும் மொபைல் எண்ணை உள்ளிடவும். பெயரை உள்ளிட்ட பின்னரே உங்கள் பெயர் திரையில் காட்டப்படும்.",
      nameLabel: "உங்கள் முழுப் பெயர் (Full Name) *",
      namePlaceholder: "எ.கா: ரமேஷ் கவுட் அல்லது ஈஸ்வர்",
      nameNotice: "ℹ️ குறிப்பு: நீங்கள் இங்கு பெயர் உள்ளிட்ட பின்னரே முகப்பு பக்கத்திலும் சுயவிவரத்திலும் உங்கள் பெயர் தோன்றும்.",
      namePreviewLabel: "காட்டப்படும் பெயர் (Display Name):",
      noNameEntered: "இன்னும் பெயர் உள்ளிடவில்லை (விருந்தினராக இருப்பீர்கள்)",
      phoneLabel: "மொபைல் எண் (Mobile Number) *",
      phonePlaceholder: "10 இலக்க மொபைல் எண்",
      getOtpBtn: "OTP பெறுக (Get OTP)",
      resendOtpBtn: "மீண்டும் பெறுக",
      otpLabel: "4 இலக்க OTP குறியீடு (டெமோ: 5429)",
      otpSentMsg: "உங்கள் எண்ணிற்கு SMS & WhatsApp மூலம் OTP அனுப்பப்பட்டது. டெமோ: 5429",
      quickDemoTitle: "அல்லது 1-தட்டு டெமோ சுயவிவரத்தைத் தேர்ந்தெடுக்கவும்:",
      demoCustomer: "ரமேஷ் கவுட் (வாடிக்கையாளர்)",
      demoSeller: "லட்சுமியம்மாள் (விவசாயி & விற்பனையாளர்)",
      audioHelpBtn: "குரல் வழிகாட்டுதல் கேளுங்கள் 🔊",
      backBtn: "பின்செல்: மொழி தேர்வு",
      verifyNextBtn: "சரிபார்த்து குரல் வழிக்கு செல்க",
      invalidPhone: "தயவுசெய்து 10 இலக்க மொபைல் எண்ணை உள்ளிடவும்",
      invalidOtp: "தவறான OTP. டெமோ குறியீடு 5429 பயன்படுத்தவும்",
    },
    voiceOverStep: {
      badge: "Inclusive Digital Design • அனைவருக்கும் குரல் உதவி வசதி",
      title: "குரல் வழி மற்றும் ஆடியோ வழிகாட்டி (அனைவருக்கும்)",
      subtitle:
        "எழுத்தறிவு உள்ளவர்களுக்கு விரைவான ஹேண்ட்ஸ்-ஃப்ரீ குரல் வசதி, மற்றும் படிக்க இயலாதவர்களுக்கு ஒவ்வொரு பட்டனையும் விலையையும் வாசித்துக் காட்டும் வசதி.",
      testAudioBtn: "குரல் ஆடியோவை சோதிக்க 🔊",
      qualityBadge: "தெளிவான இயற்கை குரல்",
      card1Title: "1. எழுத்தறிவு உள்ளவர்களுக்கு (For Literates)",
      card1Subtitle: "ஹேண்ட்ஸ்-ஃப்ரீ குரல் தேடல் மற்றும் ஆடியோ சுருக்கம்",
      card1Desc:
        "வேலையில் இருக்கும் போது திரையை பார்க்காமலேயே குரல் மூலம் விலைகளை கேட்டு விரைவாக பதிவு செய்யலாம்.",
      card2Title: "2. படிக்க இயலாதவர்கள் மற்றும் முதியவர்களுக்கு (For Non-Readers)",
      card2Subtitle: "படிக்க தேவையில்லை • தொட்டால் பேசும் வசதி",
      card2Desc:
        "பயன்பாட்டின் எந்த பட்டன் அல்லது பொருளை தொட்டாலும் அதன் விவரங்களும் விலையும் உங்கள் தாய்மொழியிலேயே பேசிக் காட்டும்.",
      card3Title: "3. குரல் மைக் & இலவச தொலைபேசி அழைப்பு",
      card3Subtitle: "பேசி பதிவு செய்தல் மற்றும் 1800 இலவச எண்",
      card3Desc:
        "மைக்கை அழுத்தி பேசலாம் அல்லது 1800-419-7382 எண்ணிற்கு இலவசமாக அழைத்து சேவைகளை பெறலாம்.",
      toggleLabel: "குரல் வழி தானியங்கி வாசிப்பாளர் (Voice-Over Reader)",
      toggleDesc: "பட்டன்கள் மற்றும் விலைகளை தானாக கேட்க இதனை ஆன் செய்து வைக்கவும்.",
      toggleActive: "குரல் இயக்கம் (Active)",
      toggleMuted: "குரல் முடக்கம் (Muted)",
      backBtn: "பின்செல்: உள்நுழைவு",
      nextBtn: "அடுத்து: வாடிக்கையாளர் அல்லது விற்பனையாளர் தளம் தேர்வு",
    },
    portalsStep: {
      badge: "தளங்கள் தேர்வு • Dedicated Customer & Seller Portals",
      title: "நீங்கள் எந்த தளத்திற்கு செல்ல விரும்புகிறீர்கள்?",
      subtitle:
        "சேவைகளைப் பெற வாடிக்கையாளராகவா அல்லது பொருட்களை விற்க விற்பனையாளராகவா என்பதை தேர்வு செய்யவும்.",
      customerTitle: "வாடிக்கையாளர் சந்தை பக்கம் (Customer Market)",
      customerSubtitle: "வீட்டு சேவைகள், பொருட்கள் & 108 அவசர உதவி",
      custF1: "சரிபார்க்கப்பட்ட பிளம்பர், எலக்ட்ரீசியன் பழுதுபார்ப்பு",
      custF2: "பண்ணை பால், காய்கறிகள் மற்றும் உள்ளூர் பொருட்கள்",
      custF3: "108 ஆம்புலன்ஸ் & 24x7 அவசர உதவி",
      custF4: "UPI எஸ்க்ரோ பாதுகாப்பு: பணி முடிந்த பிறகே பணம்",
      openCustomerBtn: "வாடிக்கையாளர் பக்கம் திறக்க (Open Customer Page)",
      sellerTitle: "விற்பனையாளர் வணிக மையம் (Seller Hub)",
      sellerSubtitle: "காய்கறிகள், பால், கைவினைப் பொருட்கள் விற்பனை (வெறும் 4% கட்டணம்)",
      sellerF1: "காய்கறிகள், பால், கைவினைப் பொருட்கள் நேரடி விற்பனை",
      sellerF2: "கேமரா படம் எடுத்து 1 நிமிடத்தில் எளிதாக பதிவிடலாம்",
      sellerF3: "வெறும் 4% குறைந்த கமிஷன் (நகரங்களின் கொள்ளை இல்லை)",
      sellerF4: "டெலிவரி OTP சரிபார்த்தவுடன் உடனடி வங்கி/UPI பணம்",
      openSellerBtn: "விற்பனையாளர் பக்கம் திறக்க (Open Seller Page)",
    },
  },
};
