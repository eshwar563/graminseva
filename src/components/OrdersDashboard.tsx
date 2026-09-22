import React, { useState } from "react";
import {
  AlertCircle,
  CheckCircle2,
  Clock,
  Lock,
  Package,
  Phone,
  ShieldCheck,
  Wrench,
} from "lucide-react";
import { useApp } from "../context/AppContext";

export const OrdersDashboard: React.FC = () => {
  const { bookings, productOrders, confirmServiceCompletion, speakText } = useApp();

  const [filterType, setFilterType] = useState<
    "all" | "hospital" | "laundry" | "dairy" | "stationery" | "services"
  >("all");

  const filteredBookings = bookings.filter((b) => {
    if (filterType === "all") return true;
    if (filterType === "hospital") return b.serviceCategory === "emergency";
    if (filterType === "laundry") return b.serviceCategory === "laundry";
    if (filterType === "dairy") return b.serviceCategory === "dairy";
    if (filterType === "stationery") return b.serviceCategory === "stationery";
    if (filterType === "services")
      return b.serviceCategory === "plumbing" || b.serviceCategory === "electrical";
    return true;
  });

  const filteredProductOrders = productOrders.filter((po) => {
    if (filterType === "all") return true;
    const names = po.items.map((i) => i.product.name.toLowerCase()).join(" ");
    if (filterType === "dairy") return names.includes("milk") || names.includes("curd");
    if (filterType === "stationery") return names.includes("notebook") || names.includes("xerox");
    if (filterType === "laundry") return names.includes("iron") || names.includes("laundry");
    return true;
  });

  return (
    <div id="orders-dashboard-container" className="space-y-6 pb-12">
      {/* Header Banner */}
      <div className="p-6 rounded-3xl bg-emerald-900 text-white shadow-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <span className="px-2.5 py-0.5 rounded-full bg-emerald-800 text-emerald-200 text-xs font-semibold">
            Track Services & Deliveries
          </span>
          <h1 className="text-2xl font-black tracking-tight mt-1">My Bookings & Orders</h1>
          <p className="text-xs text-emerald-200 mt-1">
            Protected with UPI Escrow. Your money is only transferred after you share your 4-digit OTP.
          </p>
        </div>

        <div className="p-3 bg-emerald-950/80 rounded-2xl border border-emerald-700 text-xs">
          <div className="flex items-center gap-1.5 text-amber-300 font-bold">
            <Lock className="w-4 h-4" />
            <span>Escrow Protection Active</span>
          </div>
          <span className="text-[11px] text-emerald-100">
            {bookings.filter((b) => b.escrowStatus === "held_in_escrow").length} services currently locked
          </span>
        </div>
      </div>

      {/* Filter Tabs specifically for requested categories: Hospital/Clinics, Laundry & Iron, Dairy, Stationery */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs font-bold">
        <button
          onClick={() => setFilterType("all")}
          className={`px-3 py-2 rounded-xl shrink-0 transition-colors ${
            filterType === "all" ? "bg-stone-900 text-white" : "bg-white border border-stone-200 text-stone-700"
          }`}
        >
          All Activity ({bookings.length + productOrders.length})
        </button>
        <button
          onClick={() => setFilterType("hospital")}
          className={`px-3 py-2 rounded-xl shrink-0 transition-colors ${
            filterType === "hospital" ? "bg-red-700 text-white" : "bg-white border border-stone-200 text-stone-700"
          }`}
        >
          Hospital / Clinics
        </button>
        <button
          onClick={() => setFilterType("laundry")}
          className={`px-3 py-2 rounded-xl shrink-0 transition-colors ${
            filterType === "laundry" ? "bg-blue-700 text-white" : "bg-white border border-stone-200 text-stone-700"
          }`}
        >
          Laundry & Iron
        </button>
        <button
          onClick={() => setFilterType("dairy")}
          className={`px-3 py-2 rounded-xl shrink-0 transition-colors ${
            filterType === "dairy" ? "bg-amber-700 text-white" : "bg-white border border-stone-200 text-stone-700"
          }`}
        >
          Dairy (Milk & Curd)
        </button>
        <button
          onClick={() => setFilterType("stationery")}
          className={`px-3 py-2 rounded-xl shrink-0 transition-colors ${
            filterType === "stationery" ? "bg-purple-700 text-white" : "bg-white border border-stone-200 text-stone-700"
          }`}
        >
          Stationery & Xerox
        </button>
        <button
          onClick={() => setFilterType("services")}
          className={`px-3 py-2 rounded-xl shrink-0 transition-colors ${
            filterType === "services" ? "bg-emerald-700 text-white" : "bg-white border border-stone-200 text-stone-700"
          }`}
        >
          Plumber & Electrician
        </button>
      </div>

      {/* Service Bookings List */}
      <div className="space-y-4">
        <h3 className="text-sm font-bold text-stone-900">Service Professional Bookings</h3>
        {filteredBookings.length === 0 ? (
          <p className="text-xs text-stone-500 p-6 bg-white rounded-2xl border border-stone-200">
            No service bookings found in this category.
          </p>
        ) : (
          filteredBookings.map((b) => (
            <div
              key={b.id}
              className="p-5 bg-white rounded-3xl border border-stone-200 shadow-2xs space-y-3"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-black text-stone-900 px-2 py-0.5 bg-stone-100 rounded-md">
                      {b.id}
                    </span>
                    <span className="text-xs font-bold text-emerald-800">{b.serviceName}</span>
                    <span className="text-[10px] text-stone-400">{b.createdAt}</span>
                  </div>
                  <h4 className="font-bold text-stone-900 text-sm mt-1">{b.issueTitle}</h4>
                  <p className="text-xs text-stone-600 mt-0.5">{b.problemDescription}</p>
                </div>

                <div className="text-right">
                  <span className="text-base font-black text-stone-900">₹{b.escrowAmount}</span>
                  <span
                    className={`block text-[10px] font-bold uppercase ${
                      b.status === "completed" ? "text-emerald-700" : "text-amber-600"
                    }`}
                  >
                    {b.status === "completed" ? "Completed" : "In Escrow 🔒"}
                  </span>
                </div>
              </div>

              {/* Secret Escrow Completion OTP Box */}
              {b.status !== "completed" && (
                <div className="p-3 bg-amber-50 rounded-2xl border border-amber-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-amber-900 block">
                      Secret Completion OTP (Share only when work is done)
                    </span>
                    <span className="font-mono text-xl font-black text-amber-950 tracking-wider">
                      {b.completionOtp}
                    </span>
                  </div>
                  <p className="text-[11px] text-amber-800 max-w-xs">
                    Do not share this OTP until the worker finishes repairs satisfactorily.
                  </p>
                </div>
              )}

              {/* Provider details */}
              <div className="pt-2 border-t border-stone-100 flex items-center justify-between text-xs">
                <span className="text-stone-500">
                  Address: <strong className="text-stone-800">{b.customerAddress}</strong>
                </span>

                <div className="flex items-center gap-2">
                  <a
                    href="tel:+919848022334"
                    className="px-3 py-1.5 bg-stone-100 hover:bg-stone-200 text-stone-800 font-semibold rounded-xl flex items-center gap-1.5"
                  >
                    <Phone className="w-3.5 h-3.5 text-emerald-700" />
                    <span>Call Worker</span>
                  </a>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Product Deliveries (Meesho Merchant Orders) */}
      <div className="space-y-4 pt-4">
        <h3 className="text-sm font-bold text-stone-900">Local Merchant Orders (Dairy & Mandi)</h3>
        {filteredProductOrders.length === 0 ? (
          <p className="text-xs text-stone-500 p-6 bg-white rounded-2xl border border-stone-200">
            No merchant orders in this category.
          </p>
        ) : (
          filteredProductOrders.map((po) => {
            const firstItem = po.items[0];
            const title = firstItem?.product?.name || "Market Goods";
            const qty = firstItem?.quantity || 1;
            return (
              <div
                key={po.id}
                className="p-4 bg-white rounded-3xl border border-stone-200 shadow-2xs flex items-center justify-between text-xs"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-stone-900">{title}</span>
                    <span className="text-stone-400">Qty: {qty}</span>
                  </div>
                  <div className="text-[11px] text-stone-500 mt-0.5">
                    Ordered on {po.createdAt} • Delivery: {po.deliveryAddress}
                  </div>
                  <div className="text-[10px] text-emerald-700 font-bold mt-1">
                    Delivery OTP: {po.deliveryOtp} • Protected in Escrow
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-base font-black text-stone-900">₹{po.totalAmount}</span>
                  <span className="block text-[10px] uppercase font-bold text-emerald-700">
                    {po.status}
                  </span>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
