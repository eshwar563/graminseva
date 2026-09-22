import express from "express";
import path from "path";
import dotenv from "dotenv";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json({ limit: "10mb" }));

// Lazy Gemini client helper
let aiClient: GoogleGenAI | null = null;
function getAi(): GoogleGenAI | null {
  if (!process.env.GEMINI_API_KEY) {
    return null;
  }
  if (!aiClient) {
    aiClient = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  }
  return aiClient;
}

// Health check
app.get("/api/health", (_req, res) => {
  res.json({
    status: "ok",
    service: "GraminSeva API",
    geminiConfigured: Boolean(process.env.GEMINI_API_KEY),
    timestamp: new Date().toISOString(),
  });
});

// AI Price Estimation endpoint
app.post("/api/ai/estimate", async (req, res) => {
  const { serviceType, problemDescription, townTier = "Tier-2" } = req.body;

  const ai = getAi();
  if (ai) {
    try {
      const prompt = `You are an upfront fair price estimation engine for local gig workers in Indian Tier-2/Tier-3 towns (GraminSeva platform).
Service Type: ${serviceType || "General repair"}
Issue description: ${problemDescription || "Standard maintenance"}
Town: ${townTier}

Estimate fair pricing in Indian Rupees (INR ₹) preventing customer price gouging while ensuring a fair wage for the local worker.
Respond ONLY with a JSON object matching this schema:
{
  "estimatedMin": number,
  "estimatedMax": number,
  "recommendedPrice": number,
  "laborCharge": number,
  "partsEstimateMin": number,
  "partsEstimateMax": number,
  "estimatedDurationMinutes": number,
  "commonPartsNeeded": [string],
  "fairPriceExplanation": string,
  "vernacularTip": string
}`;

      const response = await ai.models.generateContent({
        model: "gemini-3.8-flash",
        contents: prompt,
        config: {
          responseMimeType: "application/json",
        },
      });

      const text = response.text || "{}";
      const parsed = JSON.parse(text);
      return res.json({ success: true, data: parsed, source: "gemini" });
    } catch (err) {
      console.warn("Gemini estimate failed, fallback to local heuristic:", err);
    }
  }

  // Fallback realistic heuristic for Tier-2/3 Indian Towns
  const baselines: Record<string, { min: number; max: number; labor: number; parts: string[]; duration: number }> = {
    Plumbing: { min: 250, max: 600, labor: 200, parts: ["Teflon tape", "Washer", "PVC joint pipe", "Tap cartridge"], duration: 45 },
    Electrical: { min: 200, max: 700, labor: 180, parts: ["MCB switch", "Insulation tape", "Copper wire", "Socket"], duration: 40 },
    Cleaning: { min: 350, max: 900, labor: 350, parts: ["Disinfectant", "Microfiber cloths", "Degreaser"], duration: 90 },
    Appliance: { min: 350, max: 1200, labor: 300, parts: ["Capacitor", "Relay switch", "Thermostat", "Gas refill if needed"], duration: 60 },
    "Laundry & Iron": { min: 80, max: 300, labor: 80, parts: ["Starch", "Steam press", "Eco-packaging"], duration: 30 },
    Dairy: { min: 65, max: 350, labor: 30, parts: ["Insulated food-grade container", "Quality test slip"], duration: 15 },
    Stationery: { min: 50, max: 400, labor: 20, parts: ["Standard packaging"], duration: 10 },
  };

  const base = baselines[serviceType] || { min: 200, max: 500, labor: 180, parts: ["Standard consumables"], duration: 45 };
  const recommended = Math.round((base.min + base.max) / 2);

  return res.json({
    success: true,
    data: {
      estimatedMin: base.min,
      estimatedMax: base.max,
      recommendedPrice: recommended,
      laborCharge: base.labor,
      partsEstimateMin: base.min - base.labor > 0 ? base.min - base.labor : 50,
      partsEstimateMax: base.max - base.labor,
      estimatedDurationMinutes: base.duration,
      commonPartsNeeded: base.parts,
      fairPriceExplanation: `Upfront standardized benchmark for Tier-2/3 areas with 0% hidden surge fees. Provider receives 96%, platform takes only 4% escrow fee.`,
      vernacularTip: `గ్రామీణ సేవా కమిషన్ కేవలం 4% మాత్రమే. మోసాలు లేకుండా సురక్షితమైన UPI ఎస్క్రో పేమెంట్.`,
    },
    source: "local-benchmark",
  });
});

// Voice Intent Recognition endpoint
app.post("/api/ai/voice-intent", async (req, res) => {
  const { transcript, language = "te" } = req.body;

  const ai = getAi();
  if (ai && transcript) {
    try {
      const prompt = `The user spoke in ${language} (or Indian English): "${transcript}".
Identify the user intent in GraminSeva Local Services platform.
Respond ONLY with a JSON object:
{
  "category": "plumbing" | "electrical" | "cleaning" | "appliance" | "emergency" | "dairy" | "stationery" | "veggies" | "laundry" | "orders" | "account" | "seller",
  "action": "book" | "call_emergency" | "buy" | "view_orders" | "switch_role" | "help",
  "detectedIssue": string,
  "confidence": number,
  "spokenResponse": string
}`;

      const response = await ai.models.generateContent({
        model: "gemini-3.8-flash",
        contents: prompt,
        config: {
          responseMimeType: "application/json",
        },
      });

      const text = response.text || "{}";
      const parsed = JSON.parse(text);
      return res.json({ success: true, data: parsed, source: "gemini" });
    } catch (err) {
      console.warn("Voice intent fallback:", err);
    }
  }

  // Heuristic voice classifier
  const t = (transcript || "").toLowerCase();
  let category = "plumbing";
  let action = "book";
  let spokenResponse = "Opening requested service for you.";

  if (t.includes("emergency") || t.includes("hospital") || t.includes("ambulance") || t.includes("fire") || t.includes("flood") || t.includes("ఆసుపత్రి") || t.includes("అత్యవసరం") || t.includes("మంటలు")) {
    category = "emergency";
    action = "call_emergency";
    spokenResponse = "Opening Emergency SOS & Disaster Desk immediately.";
  } else if (t.includes("electric") || t.includes("current") || t.includes("fan") || t.includes("light") || t.includes("విద్యుత్") || t.includes("కరెంట్") || t.includes("बिजली")) {
    category = "electrical";
    spokenResponse = "Finding nearest verified electricians in your ward.";
  } else if (t.includes("clean") || t.includes("కలీనింగ్") || t.includes("సఫాయి") || t.includes("झाड़ू")) {
    category = "cleaning";
    spokenResponse = "Finding home and water tank cleaning professionals.";
  } else if (t.includes("milk") || t.includes("dairy") || t.includes("curd") || t.includes("పాలు") || t.includes("పెరుగు") || t.includes("दूध")) {
    category = "dairy";
    action = "buy";
    spokenResponse = "Showing fresh cow milk and dairy products from nearby farmers.";
  } else if (t.includes("veggie") || t.includes("tomato") || t.includes("కూరగాయలు") || t.includes("సబ్జీ") || t.includes("రైతు")) {
    category = "veggies";
    action = "buy";
    spokenResponse = "Showing fresh vegetables from local town mandi.";
  } else if (t.includes("iron") || t.includes("laundry") || t.includes("బట్టలు") || t.includes("ఇస్త్రీ") || t.includes("धोबी")) {
    category = "laundry";
    spokenResponse = "Booking local laundry and steam press service.";
  } else if (t.includes("book") || t.includes("stationery") || t.includes("xerox") || t.includes("పుస్తకాలు") || t.includes("జీరాక్స్")) {
    category = "stationery";
    spokenResponse = "Showing nearby stationery and xerox shops.";
  } else if (t.includes("order") || t.includes("నా ఆర్డర్లు") || t.includes("ऑर्डर")) {
    category = "orders";
    action = "view_orders";
    spokenResponse = "Showing your active service bookings and product orders.";
  } else if (t.includes("sell") || t.includes("supplier") || t.includes("అమ్మకం") || t.includes("బేచనా")) {
    category = "seller";
    action = "switch_role";
    spokenResponse = "Switching to Seller and Reseller dashboard.";
  }

  return res.json({
    success: true,
    data: {
      category,
      action,
      detectedIssue: transcript,
      confidence: 0.92,
      spokenResponse,
    },
    source: "heuristic",
  });
});

async function start() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`GraminSeva server running on http://localhost:${PORT}`);
  });
}

start();
