export type LanguageCode = "en" | "te" | "hi" | "ta" | "kn";

export interface LanguageOption {
  code: LanguageCode;
  label: string;
  nativeLabel: string;
  greeting: string;
}

export type OnboardingStep = "language" | "login" | "voice_over" | "role_choice" | "completed";

export type UserRole = "customer" | "provider" | "seller" | "admin";

export interface UserProfile {
  id: string;
  name: string;
  phone: string;
  role: UserRole;
  town: string;
  ward: string;
  upiId: string;
  bankAccount: {
    accountNumber: string;
    ifsc: string;
    bankName: string;
    accountHolder: string;
  };
  walletBalance: number;
  escrowLockedBalance: number;
  referralCode: string;
  referralEarnings: number;
  trustScore: number;
  isVerified: boolean;
  aadhaarNumber?: string;
  avatarUrl: string;
  followedShops: string[];
  wishlist: string[];
}

export type ServiceCategoryId =
  | "plumbing"
  | "electrical"
  | "cleaning"
  | "appliance"
  | "emergency"
  | "laundry"
  | "dairy"
  | "stationery"
  | "veggies";

export interface ServiceCategory {
  id: ServiceCategoryId;
  name: string;
  teluguName: string;
  hindiName: string;
  iconName: string;
  description: string;
  baseStartingPrice: number;
  popularItems: string[];
  isProductCategory?: boolean;
}

export interface ServiceProvider {
  id: string;
  name: string;
  photoUrl: string;
  phone: string;
  category: ServiceCategoryId;
  specialization: string;
  rating: number;
  reviewCount: number;
  distanceKm: number;
  etaMinutes: number;
  hourlyRate: number;
  isAvailable: boolean;
  aadhaarVerified: boolean;
  policeVerified: boolean;
  tradeLicenseVerified: boolean;
  trustScore: number; // 0 - 100
  completedJobs: number;
  localWard: string;
  platformCommissionPercent: number; // e.g. 4%
  recentFeedback: { user: string; comment: string; rating: number }[];
}

export interface Product {
  id: string;
  name: string;
  teluguName: string;
  hindiName: string;
  category: ServiceCategoryId;
  price: number;
  unit: string;
  imageUrl: string;
  sellerId: string;
  sellerName: string;
  sellerPhone: string;
  sellerWard: string;
  stock: number;
  rating: number;
  isFresh?: boolean;
  description: string;
}

export type BookingStatus =
  | "pending_dispatch"
  | "matched"
  | "on_way"
  | "in_progress"
  | "completed"
  | "disputed";

export interface ServiceBooking {
  id: string;
  serviceCategory: ServiceCategoryId;
  serviceName: string;
  issueTitle: string;
  problemDescription: string;
  customerId: string;
  customerName: string;
  customerPhone: string;
  customerAddress: string;
  customerWard: string;
  providerId?: string;
  providerName?: string;
  providerPhone?: string;
  providerPhoto?: string;
  status: BookingStatus;
  upfrontEstimate: {
    min: number;
    max: number;
    recommended: number;
    labor: number;
    parts: number;
  };
  finalBill?: number;
  escrowAmount: number;
  escrowStatus: "held_in_escrow" | "released_to_worker" | "refunded";
  completionOtp: string;
  createdAt: string;
  scheduledTime: string;
  voiceNoteUrl?: string;
  hasVoiceRecording?: boolean;
  photoUrl?: string;
  customerRating?: number;
}

export interface ProductOrder {
  id: string;
  customerId: string;
  customerName: string;
  customerPhone: string;
  deliveryAddress: string;
  items: {
    product: Product;
    quantity: number;
  }[];
  totalAmount: number;
  deliveryCharge: number;
  status: "placed" | "accepted_by_merchant" | "out_for_delivery" | "delivered";
  paymentMethod: "upi_escrow" | "cod";
  escrowStatus: "held_in_escrow" | "released_to_merchant";
  deliveryOtp: string;
  createdAt: string;
}

export interface EmergencyItem {
  id: string;
  type: "hospital" | "fire" | "flood" | "civic_hazard" | "police" | "snake_rescue";
  title: string;
  name: string;
  teluguTitle: string;
  phone: string;
  alternatePhone?: string;
  location: string;
  distanceKm: number;
  openHours: string;
  is24x7: boolean;
  bedsAvailable?: number;
  oxygenAvailable?: boolean;
  ambulanceAvailable?: boolean;
}

export interface EmergencyReport {
  id: string;
  type: "health" | "fire" | "flood" | "electrical_hazard" | "drainage_leak" | "other";
  title: string;
  locationAddress: string;
  ward: string;
  description: string;
  severity: "critical" | "high" | "medium";
  photoUrl?: string;
  reporterPhone: string;
  status: "reported" | "responder_assigned" | "resolved";
  reportedAt: string;
}

export interface WalletTransaction {
  id: string;
  type: "escrow_lock" | "escrow_release" | "payout" | "referral_reward" | "refund";
  amount: number;
  title: string;
  description: string;
  date: string;
  status: "completed" | "in_escrow" | "processing";
  referenceId?: string;
}
