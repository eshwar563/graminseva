import React, { useState } from "react";
import { MessageSquare, Phone, Volume2, X, Check, Send, Sparkles } from "lucide-react";
import { useApp } from "../context/AppContext";

export const IvrWhatsappModal: React.FC = () => {
  const { isIvrModalOpen, setIsIvrModalOpen, language, speakText } = useApp();

  const [activeChannel, setActiveChannel] = useState<"whatsapp" | "ivr">("whatsapp");
  const [chatMessages, setChatMessages] = useState<
    { sender: "bot" | "user"; text: string; time: string }[]
  >([
    {
      sender: "bot",
      text:
        language === "te"
          ? "నమస్కారం! గ్రామీణ సేవా వాట్సాప్ సహాయకుడికి స్వాగతం. మీకు ఏ సేవ కావాలి? (ప్లంబింగ్, కరెంట్, ఆసుపత్రి లేదా పాల ఆర్డర్? మీ వాయిస్ మెసేజ్ కూడా పంపవచ్చు)."
          : language === "hi"
          ? "नमस्ते! ग्रामीण सेवा व्हाट्सएप में आपका स्वागत है। आपको किस सेवा की आवश्यकता है? (प्लंबर, बिजली, अस्पताल, या दूध? वॉइस मैसेज भी भेज सकते हैं)।"
          : "Namaste! Welcome to GraminSeva WhatsApp Desk. What service do you need today? (Plumbing, Electrical, Hospital, or Milk Delivery? You can also send voice notes).",
      time: "10:00 AM",
    },
  ]);
  const [chatInput, setChatInput] = useState("");
  const [ivrDialStep, setIvrDialStep] = useState<number>(1);
  const [ivrAudioLog, setIvrAudioLog] = useState<string>(
    "Calling Toll-Free 1800-419-7382... Connected. 'గ్రామీణ సేవా కు స్వాగతం. తెలుగు కొరకు 1 నొక్కండి. हिंदी के लिए 2 दबाएं.'"
  );

  if (!isIvrModalOpen) return null;

  const handleSendChat = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    const userMsg = chatInput;
    const now = "10:02 AM";
    setChatMessages((prev) => [...prev, { sender: "user", text: userMsg, time: now }]);
    setChatInput("");

    setTimeout(() => {
      const reply =
        language === "te"
          ? `మీ అభ్యర్థన "${userMsg}" నమోదైంది. సమీప నిపుణుడు శ్రీనివాస్ గౌడ్ (1.1 కి.మీ దూరంలో) మీ వార్డుకు బయలుదేరారు. ఎస్క్రో కోడ్: 5429.`
          : `Your request "${userMsg}" has been booked. Nearest verified professional Srinivas Goud (1.1 km away) is assigned to Ward 14. Escrow OTP: 5429.`;
      setChatMessages((prev) => [...prev, { sender: "bot", text: reply, time: "10:03 AM" }]);
      speakText(reply);
    }, 700);
  };

  const handleIvrKeyPress = (key: string) => {
    if (ivrDialStep === 1) {
      setIvrDialStep(2);
      const text =
        key === "1"
          ? "తెలుగు ఎంపిక చేయబడింది. ప్లంబింగ్ కోసం 1 నొక్కండి, కరెంట్ రిపేర్ కోసం 2, అత్యవసర వైద్యం కోసం 9 నొక్కండి."
          : "Hindi Selected. प्लंबिंग के लिए 1 दबाएं, बिजली के लिए 2 दबाएं, इमरजेंसी के लिए 9 दबाएं.";
      setIvrAudioLog(`[User Pressed ${key}] -> IVR: "${text}"`);
      speakText(text);
    } else if (ivrDialStep === 2) {
      setIvrDialStep(3);
      const text =
        "ధన్యవాదాలు! మీ ఆర్డర్ నమోదైంది. మీ ఫోన్ నంబరుకు SMS ద్వారా ప్రొవైడర్ నంబర్ మరియు OTP పంపబడింది. ఎస్క్రో భద్రతతో మీ డబ్బు సురక్షితం.";
      setIvrAudioLog(`[User Pressed ${key}] -> IVR: "${text}"`);
      speakText(text);
    }
  };

  return (
    <div
      id="ivr-whatsapp-modal-overlay"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-in fade-in duration-200"
    >
      <div
        id="ivr-whatsapp-modal-card"
        className="w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-stone-200 overflow-hidden flex flex-col max-h-[90vh]"
      >
        {/* Header */}
        <div className="bg-emerald-800 text-white p-5 relative">
          <button
            id="close-ivr-modal-btn"
            onClick={() => setIsIvrModalOpen(false)}
            className="absolute top-4 right-4 p-2 rounded-full hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-2 mb-1">
            <Sparkles className="w-5 h-5 text-amber-300" />
            <h3 className="font-bold text-lg">Vernacular WhatsApp & IVR Booking Desk</h3>
          </div>
          <p className="text-xs text-emerald-100">
            For senior citizens, rural residents, and users without smartphones or digital literacy.
          </p>

          {/* Channel Tabs */}
          <div className="flex gap-2 mt-4">
            <button
              id="channel-tab-whatsapp"
              onClick={() => setActiveChannel("whatsapp")}
              className={`flex-1 py-2 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all ${
                activeChannel === "whatsapp"
                  ? "bg-white text-emerald-900 shadow-xs"
                  : "bg-emerald-900/60 text-white hover:bg-emerald-900"
              }`}
            >
              <MessageSquare className="w-4 h-4 text-emerald-600" />
              <span>WhatsApp Chatbot</span>
            </button>

            <button
              id="channel-tab-ivr"
              onClick={() => setActiveChannel("ivr")}
              className={`flex-1 py-2 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all ${
                activeChannel === "ivr"
                  ? "bg-white text-emerald-900 shadow-xs"
                  : "bg-emerald-900/60 text-white hover:bg-emerald-900"
              }`}
            >
              <Phone className="w-4 h-4 text-emerald-600" />
              <span>Toll-Free IVR Call (1800)</span>
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-5 overflow-y-auto flex-1 bg-stone-50">
          {activeChannel === "whatsapp" ? (
            <div className="flex flex-col h-[380px]">
              {/* WhatsApp Chat simulation window */}
              <div className="flex-1 bg-[#efeae2] p-4 rounded-2xl overflow-y-auto space-y-3 border border-stone-300">
                {chatMessages.map((msg, index) => (
                  <div
                    key={index}
                    className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[80%] p-3 rounded-2xl text-xs shadow-xs ${
                        msg.sender === "user"
                          ? "bg-[#d9fdd3] text-stone-900 rounded-tr-xs"
                          : "bg-white text-stone-900 rounded-tl-xs"
                      }`}
                    >
                      <p className="leading-relaxed">{msg.text}</p>
                      <span className="text-[10px] text-stone-400 block text-right mt-1">
                        {msg.time}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Chat Input */}
              <form onSubmit={handleSendChat} className="mt-3 flex gap-2">
                <input
                  type="text"
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  placeholder="Type in Telugu/Hindi: 'ప్లంబర్ కావాలి'..."
                  className="flex-1 text-xs px-3 py-2.5 bg-white border border-stone-300 rounded-xl focus:outline-hidden focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600"
                />
                <button
                  type="submit"
                  className="p-2.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl shadow-xs transition-colors"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </div>
          ) : (
            /* IVR Toll-Free Phone Simulation */
            <div className="p-4 bg-white rounded-2xl border border-stone-200 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-stone-200">
                <div>
                  <span className="text-[10px] uppercase font-bold text-stone-400">Toll-Free Helpline</span>
                  <div className="text-lg font-black text-stone-900">1800-419-7382</div>
                </div>
                <div className="px-2.5 py-1 bg-green-100 text-green-800 text-xs font-bold rounded-full flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-green-600 animate-ping" />
                  <span>Call Active</span>
                </div>
              </div>

              {/* IVR Voice Output box */}
              <div className="p-3 bg-stone-100 rounded-xl border border-stone-200 text-xs text-stone-800 flex items-start gap-2">
                <Volume2 className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                <p className="font-mono text-[11px] leading-relaxed">{ivrAudioLog}</p>
              </div>

              {/* Keypad */}
              <div className="grid grid-cols-3 gap-2 max-w-[240px] mx-auto pt-2">
                {["1", "2", "3", "4", "5", "6", "7", "8", "9", "*", "0", "#"].map((key) => (
                  <button
                    key={key}
                    type="button"
                    onClick={() => handleIvrKeyPress(key)}
                    className="h-12 bg-stone-50 hover:bg-emerald-50 hover:text-emerald-800 hover:border-emerald-400 border border-stone-200 rounded-xl font-bold text-base text-stone-800 flex items-center justify-center shadow-2xs transition-colors"
                  >
                    {key}
                  </button>
                ))}
              </div>

              <p className="text-[10px] text-center text-stone-500">
                Users dial toll-free without internet or smartphone. IVR guides through voice options in Telugu/Hindi and dispatches nearest worker.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
