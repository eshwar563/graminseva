import React, { useState } from "react";
import {
  Camera,
  CheckCircle2,
  DollarSign,
  Package,
  Plus,
  Store,
  Upload,
  X,
  Lock,
} from "lucide-react";
import { useApp } from "../context/AppContext";
import { ServiceCategoryId } from "../types";

export const SellerDashboard: React.FC = () => {
  const { user, products, addNewProduct, productOrders, speakText } = useApp();

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [name, setName] = useState("");
  const [teluguName, setTeluguName] = useState("");
  const [category, setCategory] = useState<ServiceCategoryId>("veggies");
  const [price, setPrice] = useState<number>(30);
  const [unit, setUnit] = useState("1 Kilogram");
  const [stock, setStock] = useState<number>(50);
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState<string>(
    "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=400&auto=format&fit=crop&q=80"
  );
  const [isCameraActive, setIsCameraActive] = useState(false);

  // Filter products by current user if they added, or show merchant items
  const myProducts = products.filter(
    (p) => p.sellerId === user.id || p.sellerName.includes(user.name.split(" ")[0])
  );
  const allMerchantProducts = myProducts.length > 0 ? myProducts : products.slice(0, 4);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setImageUrl(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handlePresetVeggies = (presetName: string, presetTe: string, presetPrice: number, presetImg: string) => {
    setName(presetName);
    setTeluguName(presetTe);
    setPrice(presetPrice);
    setImageUrl(presetImg);
  };

  const handleCreateProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name) return;

    addNewProduct({
      name,
      teluguName: teluguName || name,
      hindiName: name,
      category,
      price: Number(price),
      unit,
      stock: Number(stock),
      imageUrl,
      sellerId: user.id,
      sellerName: user.name,
      sellerPhone: user.phone,
      sellerWard: user.ward,
      isFresh: category === "veggies" || category === "dairy",
      description: description || `Local authentic goods from ${user.ward}`,
    });

    setIsAddModalOpen(false);
    setName("");
    setTeluguName("");
    setDescription("");
  };

  return (
    <div id="seller-dashboard-container" className="space-y-6 pb-12">
      {/* Header Banner */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-purple-900 via-purple-800 to-indigo-950 text-white shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="px-2.5 py-0.5 rounded-full bg-purple-700/80 border border-purple-500/40 text-xs font-semibold text-purple-200">
              Meesho-Style Reseller & Merchant Desk
            </span>
          </div>
          <h1 className="text-2xl font-black tracking-tight">Sell Your Products Locally</h1>
          <p className="text-xs text-purple-200 mt-1 max-w-xl">
            Any resident or farmer can list fresh vegetables, cow milk, stationery, or home crafts. Direct buyer connection with 100% UPI Escrow protection.
          </p>
        </div>

        <button
          id="add-new-product-btn"
          onClick={() => setIsAddModalOpen(true)}
          className="px-4 py-2.5 bg-amber-400 hover:bg-amber-300 text-stone-950 font-extrabold text-xs rounded-xl shadow-md flex items-center gap-2 transition-transform hover:scale-102"
        >
          <Plus className="w-4 h-4" />
          <span>List Product / ఫోటో తీసి అమ్మండి</span>
        </button>
      </div>

      {/* Quick stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
        <div className="p-4 bg-white rounded-2xl border border-stone-200">
          <span className="text-stone-500">Live Active Listings</span>
          <div className="text-xl font-bold text-stone-900 mt-1">{products.length} Items</div>
        </div>
        <div className="p-4 bg-white rounded-2xl border border-stone-200">
          <span className="text-stone-500">Orders Received</span>
          <div className="text-xl font-bold text-stone-900 mt-1">{productOrders.length} Orders</div>
        </div>
        <div className="p-4 bg-white rounded-2xl border border-stone-200">
          <span className="text-stone-500">Funds in Delivery Escrow</span>
          <div className="text-xl font-bold text-emerald-800 mt-1">₹680</div>
        </div>
        <div className="p-4 bg-purple-50 rounded-2xl border border-purple-200">
          <span className="text-purple-800 font-bold">Commission Rate</span>
          <div className="text-xl font-black text-purple-950 mt-1">0% Free Listing</div>
        </div>
      </div>

      {/* Active Listings Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-extrabold text-stone-900">Your Storefront & Catalog</h2>
          <span className="text-xs text-stone-500">Photos & stock captured by merchant</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {products.map((prod) => (
            <div
              key={prod.id}
              className="p-4 bg-white rounded-2xl border border-stone-200 shadow-2xs flex gap-3"
            >
              <img
                src={prod.imageUrl}
                alt={prod.name}
                className="w-24 h-24 rounded-xl object-cover shrink-0"
                referrerPolicy="no-referrer"
              />
              <div className="flex flex-col justify-between flex-1 text-xs">
                <div>
                  <h4 className="font-bold text-stone-900 text-sm">{prod.name}</h4>
                  <p className="text-[11px] text-stone-500">{prod.teluguName}</p>
                  <div className="text-stone-400 text-[10px] mt-0.5">
                    Category: <strong className="capitalize">{prod.category}</strong>
                  </div>
                  <div className="text-base font-extrabold text-stone-900 mt-1">
                    ₹{prod.price} <span className="text-[11px] text-stone-500 font-normal">/{prod.unit}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between text-[11px] pt-2 border-t border-stone-100">
                  <span className="text-emerald-700 font-bold">{prod.stock} in stock</span>
                  <span className="text-stone-400">📍 {prod.sellerWard}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Add Product Modal (With Image Capture & Preset Veggies) */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-in fade-in duration-200">
          <div className="w-full max-w-lg bg-white rounded-3xl p-6 shadow-2xl border border-stone-200 space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-stone-200">
              <div>
                <h3 className="text-lg font-bold text-stone-900">List New Item with Photo</h3>
                <p className="text-xs text-stone-500">Take photo of your vegetables, dairy, or stationery</p>
              </div>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="p-1 text-stone-400 hover:text-stone-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Photo capture banner */}
            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1.5">
                Product Image (Snap Live Camera or Upload)
              </label>
              <div className="flex items-center gap-4">
                <img
                  src={imageUrl}
                  alt="Product preview"
                  className="w-20 h-20 rounded-2xl object-cover border-2 border-dashed border-stone-300 shadow-xs"
                />
                <div className="space-y-1.5 text-xs">
                  <label className="cursor-pointer px-3 py-2 bg-stone-900 hover:bg-black text-white rounded-xl font-bold flex items-center gap-2 transition-colors">
                    <Camera className="w-4 h-4 text-amber-300" />
                    <span>Snap / Select Photo</span>
                    <input
                      type="file"
                      accept="image/*"
                      capture="environment"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                  </label>
                  <p className="text-[10px] text-stone-400">
                    Supports high-resolution camera capture for farm mandi items.
                  </p>
                </div>
              </div>
            </div>

            {/* Quick 1-click Preset Veggies & Goods */}
            <div>
              <label className="block text-[11px] font-bold text-stone-500 mb-1">
                Quick Presets (Tap to auto-fill item):
              </label>
              <div className="flex flex-wrap gap-1.5 text-xs">
                <button
                  type="button"
                  onClick={() =>
                    handlePresetVeggies(
                      "Country Tomatoes",
                      "నాటు టమాటాలు",
                      28,
                      "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=400&auto=format&fit=crop&q=80"
                    )
                  }
                  className="px-2.5 py-1 bg-stone-100 hover:bg-stone-200 rounded-lg text-stone-700"
                >
                  🍅 Tomatoes
                </button>
                <button
                  type="button"
                  onClick={() =>
                    handlePresetVeggies(
                      "Fresh Desi Cow Milk",
                      "దేశీ ఆవు పాలు",
                      65,
                      "https://images.unsplash.com/photo-1550583724-b2692b85b150?w=400&auto=format&fit=crop&q=80"
                    )
                  }
                  className="px-2.5 py-1 bg-stone-100 hover:bg-stone-200 rounded-lg text-stone-700"
                >
                  🥛 Cow Milk
                </button>
                <button
                  type="button"
                  onClick={() =>
                    handlePresetVeggies(
                      "Classmate Notebook",
                      "క్లాస్‌మేట్ పుస్తకం",
                      75,
                      "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400&auto=format&fit=crop&q=80"
                    )
                  }
                  className="px-2.5 py-1 bg-stone-100 hover:bg-stone-200 rounded-lg text-stone-700"
                >
                  📚 Notebook
                </button>
                <button
                  type="button"
                  onClick={() =>
                    handlePresetVeggies(
                      "10 Clothes Steam Ironing",
                      "10 బట్టల ఇస్త్రీ ప్యాక్",
                      110,
                      "https://images.unsplash.com/photo-1582735689369-4fe89db7114c?w=400&auto=format&fit=crop&q=80"
                    )
                  }
                  className="px-2.5 py-1 bg-stone-100 hover:bg-stone-200 rounded-lg text-stone-700"
                >
                  👔 Ironing Bundle
                </button>
              </div>
            </div>

            <form onSubmit={handleCreateProduct} className="space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-medium text-stone-700 mb-1">Product Name (English)</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Fresh Country Tomatoes"
                    className="w-full text-xs p-2.5 rounded-xl border border-stone-300"
                    required
                  />
                </div>
                <div>
                  <label className="block font-medium text-stone-700 mb-1">Vernacular Name (Telugu)</label>
                  <input
                    type="text"
                    value={teluguName}
                    onChange={(e) => setTeluguName(e.target.value)}
                    placeholder="తాజా నాటు టమాటాలు"
                    className="w-full text-xs p-2.5 rounded-xl border border-stone-300"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className="block font-medium text-stone-700 mb-1">Category</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as ServiceCategoryId)}
                    className="w-full text-xs p-2.5 rounded-xl border border-stone-300 bg-white"
                  >
                    <option value="veggies">Farm Veggies</option>
                    <option value="dairy">Dairy & Milk</option>
                    <option value="stationery">Stationery</option>
                    <option value="laundry">Laundry & Iron</option>
                  </select>
                </div>
                <div>
                  <label className="block font-medium text-stone-700 mb-1">Price (₹)</label>
                  <input
                    type="number"
                    value={price}
                    onChange={(e) => setPrice(Number(e.target.value))}
                    className="w-full text-xs p-2.5 rounded-xl border border-stone-300 font-bold"
                    required
                  />
                </div>
                <div>
                  <label className="block font-medium text-stone-700 mb-1">Unit</label>
                  <input
                    type="text"
                    value={unit}
                    onChange={(e) => setUnit(e.target.value)}
                    placeholder="1 Kg / 1 Litre"
                    className="w-full text-xs p-2.5 rounded-xl border border-stone-300"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block font-medium text-stone-700 mb-1">Stock Available</label>
                <input
                  type="number"
                  value={stock}
                  onChange={(e) => setStock(Number(e.target.value))}
                  className="w-full text-xs p-2.5 rounded-xl border border-stone-300"
                  required
                />
              </div>

              <div>
                <label className="block font-medium text-stone-700 mb-1">Short Description</label>
                <textarea
                  rows={2}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Morning harvest, no chemicals, hygienic..."
                  className="w-full text-xs p-2.5 rounded-xl border border-stone-300 resize-none"
                />
              </div>

              <div className="p-3 bg-purple-50 rounded-xl text-[11px] text-purple-900 border border-purple-200">
                Buyers in Ward 14 will see your product immediately. Payment will be received via UPI Escrow upon delivery.
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-stone-900 hover:bg-black text-white font-bold rounded-xl shadow-md transition-colors"
              >
                Publish Product to Marketplace
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
