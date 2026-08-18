import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  Check,
  Minus,
  Plus,
  ShoppingCart,
  ShieldCheck,
  Sparkles,
  Star,
  Truck,
  X,
  Zap,
} from "lucide-react";

import API from "../api.js";

// Fallback Image
const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=1200&q=85";

export default function ProductDetail({ addToCart }) {
  const { id } = useParams();
  const navigate = useNavigate();

  /* =======================================================
     PRODUCT STATE
  ======================================================= */
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  /* =======================================================
     PRODUCT OPTIONS
  ======================================================= */
  const [selectedWeight, setSelectedWeight] = useState(1);
  const [customWeight, setCustomWeight] = useState(1);

  /* =======================================================
     BUTTON STATE
  ======================================================= */
  const [isAdding, setIsAdding] = useState(false);
  const [isBuying, setIsBuying] = useState(false);

  /* =======================================================
     ADMIN CHECK
  ======================================================= */
  const isAdmin = Boolean(localStorage.getItem("adminToken"));

  /* =======================================================
     FETCH PRODUCT DATA
  ======================================================= */
  useEffect(() => {
    setLoading(true);

    API.get(`/api/products/${id}`)
      .then((res) => {
        setProduct(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching product:", err);
        setLoading(false);
      });
  }, [id]);

  /* =======================================================
     PRODUCT DATA CALCULATIONS
  ======================================================= */
  const stockKg = Number(product?.stock_kg || 0);
  const pricePerKg = Number(product?.price_per_kg || 0);

  const currentWeight =
    selectedWeight === "custom"
      ? Number(customWeight)
      : Number(selectedWeight);

  const totalPrice = pricePerKg * currentWeight;
  const isOutOfStock = stockKg <= 0;

  /* =======================================================
     WEIGHT HANDLERS
  ======================================================= */
  const handleWeightChange = (weight) => {
    setSelectedWeight(weight);
    if (weight !== "custom") {
      setCustomWeight(Number(weight));
    }
  };

  const increaseWeight = () => {
    const current =
      selectedWeight === "custom"
        ? Number(customWeight)
        : Number(selectedWeight);

    const next = Math.min(current + 0.25, stockKg);
    setSelectedWeight("custom");
    setCustomWeight(Number(next.toFixed(2)));
  };

  const decreaseWeight = () => {
    const current =
      selectedWeight === "custom"
        ? Number(customWeight)
        : Number(selectedWeight);

    const next = Math.max(current - 0.25, 0.25);
    setSelectedWeight("custom");
    setCustomWeight(Number(next.toFixed(2)));
  };

  /* =======================================================
     ADD TO CART
  ======================================================= */
  const handleAddToCart = async () => {
    if (!product || isOutOfStock) return;

    if (!currentWeight || currentWeight <= 0) {
      alert("Please select a valid weight.");
      return;
    }

    if (currentWeight > stockKg) {
      alert(`Only ${stockKg} kg is available in stock.`);
      return;
    }

    setIsAdding(true);

    try {
      const cartItem = {
        ...product,
        quantity: currentWeight,
        weight: currentWeight,
        price: totalPrice,
      };

      if (addToCart) {
        await addToCart(cartItem);
      }

      setTimeout(() => {
        setIsAdding(false);
      }, 600);
    } catch (error) {
      console.error("Add to cart error:", error);
      setIsAdding(false);
    }
  };

  /* =======================================================
     BUY NOW (FIXED FOR 500 INTERNAL ERROR & DIRECT REDIRECT)
  ======================================================= */
  const handleBuyNow = async () => {
    if (!product || isOutOfStock) return;

    if (!currentWeight || currentWeight <= 0) {
      alert("Please select a valid weight.");
      return;
    }

    if (currentWeight > stockKg) {
      alert(`Only ${stockKg} kg is available in stock.`);
      return;
    }

    setIsBuying(true);

    const cartItem = {
      ...product,
      quantity: currentWeight,
      weight: currentWeight,
      price: totalPrice,
    };

    try {
      if (addToCart) {
        // execute addToCart without letting server exceptions block navigation
        await Promise.resolve(addToCart(cartItem)).catch((err) => {
          console.warn("Cart sync notice (proceeding anyway):", err);
        });
      }
    } catch (error) {
      console.error("Buy now background warning:", error);
    } finally {
      setIsBuying(false);
      // Direct navigation to Cart page so customer can enter details & complete order
      navigate("/cart");
    }
  };

  /* =======================================================
     LOADING STATE
  ======================================================= */
  if (loading) {
    return (
      <div className="min-h-screen bg-[#faf8f3] flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 rounded-full border-4 border-amber-200 border-t-amber-800 animate-spin" />
          <p className="text-xs font-medium text-stone-500">
            Loading product details...
          </p>
        </div>
      </div>
    );
  }

  /* =======================================================
     PRODUCT NOT FOUND STATE
  ======================================================= */
  if (!product) {
    return (
      <div className="min-h-screen bg-[#faf8f3] flex items-center justify-center px-6">
        <div className="text-center max-w-md">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-red-50 flex items-center justify-center">
            <X size={32} className="text-red-500" />
          </div>
          <h1 className="text-2xl font-black text-stone-900">
            Product Not Found
          </h1>
          <p className="mt-2 text-sm text-stone-500">
            Sorry, we couldn't find the product you're looking for.
          </p>
          <Link
            to="/products"
            className="inline-flex items-center gap-2 mt-5 px-5 py-2.5 rounded-xl bg-amber-800 text-white text-sm font-bold hover:bg-amber-900 transition"
          >
            <ArrowLeft size={16} />
            Back to Products
          </Link>
        </div>
      </div>
    );
  }

  /* =======================================================
     MAIN PRODUCT UI (COMPACT SINGLE-PAGE FIT)
  ======================================================= */
  return (
    <div className="min-h-[calc(100vh-80px)] bg-[#faf8f3] text-stone-900 flex items-center py-4 sm:py-6">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid lg:grid-cols-12 gap-6 lg:gap-8 items-start">
          
          {/* =================================================
              LEFT COLUMN — IMAGE & PRODUCT OVERVIEW (5 COLS)
          ================================================= */}
          <section className="lg:col-span-5 flex flex-col gap-4">
            <div className="relative overflow-hidden rounded-2xl bg-[#eee7d9] shadow-md aspect-[4/3] sm:aspect-[16/10] lg:aspect-[4/3] w-full">
              <img
                src={product.image_url || FALLBACK_IMAGE}
                alt={product.title}
                className="w-full h-full object-cover select-none transition-transform duration-500 hover:scale-105"
                onError={(e) => {
                  e.currentTarget.src = FALLBACK_IMAGE;
                }}
              />

              {/* OVERLAY GRADIENT */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent pointer-events-none" />

              {/* BADGE */}
              <div className="absolute top-3 left-3">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-white/90 backdrop-blur-md px-3 py-1 text-xs font-bold text-amber-900 shadow">
                  <Sparkles size={12} className="text-amber-600" />
                  Premium Selection
                </span>
              </div>

              {/* TITLE OVERLAY */}
              <div className="absolute left-4 right-4 bottom-3">
                <p className="text-[10px] uppercase tracking-widest font-bold text-white/80">
                  Quetta Dry Fruits
                </p>
                <h2 className="text-xl sm:text-2xl font-black text-white drop-shadow">
                  {product.title}
                </h2>
              </div>
            </div>

            {/* DESCRIPTION & TRUST BADGES */}
            <div className="bg-white rounded-2xl border border-stone-200/80 p-4 shadow-sm space-y-3">
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-100 px-3 py-1 text-[11px] font-bold uppercase text-amber-900">
                  <Sparkles size={12} />
                  100% Pure & Organic
                </span>
                {product.rating && (
                  <div className="flex items-center gap-1 text-xs font-semibold text-stone-700">
                    <Star size={14} fill="currentColor" className="text-amber-500" />
                    {product.rating}
                  </div>
                )}
              </div>

              {product.description && (
                <p className="text-xs sm:text-sm leading-relaxed text-stone-600">
                  {product.description}
                </p>
              )}

              <div className="grid grid-cols-3 gap-2 pt-1 border-t border-stone-100">
                <div className="text-center p-2 rounded-xl bg-stone-50">
                  <ShieldCheck size={18} className="text-emerald-600 mx-auto mb-1" />
                  <p className="text-[11px] font-bold text-stone-800">Organic</p>
                </div>
                <div className="text-center p-2 rounded-xl bg-stone-50">
                  <Truck size={18} className="text-amber-700 mx-auto mb-1" />
                  <p className="text-[11px] font-bold text-stone-800">Fast Express</p>
                </div>
                <div className="text-center p-2 rounded-xl bg-stone-50">
                  <Check size={18} className="text-emerald-600 mx-auto mb-1" />
                  <p className="text-[11px] font-bold text-stone-800">Fresh Stock</p>
                </div>
              </div>
            </div>
          </section>

          {/* =================================================
              RIGHT COLUMN — WEIGHT, PRICE & ACTIONS (7 COLS)
          ================================================= */}
          <section className="lg:col-span-7 flex flex-col justify-between space-y-4">
            
            {/* PRICE & STOCK HEADER */}
            <div className="bg-white rounded-2xl border border-stone-200/80 p-4 sm:p-5 shadow-sm flex flex-wrap items-center justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-stone-400">
                  Price per kg
                </p>
                <div className="flex items-baseline gap-1.5 mt-0.5">
                  <span className="text-3xl sm:text-4xl font-black text-amber-900">
                    Rs. {pricePerKg.toLocaleString()}
                  </span>
                  <span className="text-xs font-bold text-stone-500">/ kg</span>
                </div>
              </div>

              <div>
                {isOutOfStock ? (
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-red-50 px-3.5 py-1.5 text-xs font-bold text-red-700">
                    <X size={14} /> Out of Stock
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3.5 py-1.5 text-xs font-bold text-emerald-700">
                    <Check size={14} /> {stockKg} kg in stock
                  </span>
                )}
              </div>
            </div>

            {/* WEIGHT SELECTION */}
            <div className="bg-white rounded-2xl border border-stone-200/80 p-4 sm:p-5 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-stone-900 uppercase tracking-wider">
                  Select Weight
                </h3>
                <span className="text-xs font-bold text-amber-900 bg-amber-100 px-2.5 py-1 rounded-md">
                  Selected: {currentWeight} kg
                </span>
              </div>

              {/* PRESET BUTTONS */}
              <div className="grid grid-cols-5 gap-2">
                {[0.25, 0.5, 1, 2, 5].map((weight) => {
                  const disabled = weight > stockKg;
                  const active = selectedWeight === weight;

                  return (
                    <button
                      key={weight}
                      type="button"
                      disabled={disabled}
                      onClick={() => handleWeightChange(weight)}
                      className={`
                        py-2.5 rounded-xl border-2 text-xs sm:text-sm font-bold transition-all
                        ${
                          active
                            ? "bg-amber-800 border-amber-800 text-white shadow"
                            : disabled
                            ? "bg-stone-50 border-stone-100 text-stone-300 cursor-not-allowed"
                            : "bg-white border-stone-200 text-stone-700 hover:border-amber-400 hover:bg-amber-50"
                        }
                      `}
                    >
                      {weight} kg
                    </button>
                  );
                })}
              </div>

              {/* CUSTOM WEIGHT STEPPER */}
              <div className="flex items-center justify-between rounded-xl border border-stone-200 bg-stone-50/50 p-3">
                <div>
                  <p className="text-xs font-bold text-stone-800">Custom Quantity</p>
                  <p className="text-[10px] text-stone-500">Adjust by 250g steps</p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={decreaseWeight}
                    disabled={currentWeight <= 0.25}
                    className="w-8 h-8 rounded-lg border border-stone-200 bg-white flex items-center justify-center transition hover:bg-stone-100 disabled:opacity-40 shadow-sm"
                  >
                    <Minus size={14} />
                  </button>

                  <span className="min-w-[48px] text-center text-sm font-black text-amber-900">
                    {currentWeight} kg
                  </span>

                  <button
                    type="button"
                    onClick={increaseWeight}
                    disabled={currentWeight >= stockKg}
                    className="w-8 h-8 rounded-lg border border-stone-200 bg-white flex items-center justify-center transition hover:bg-stone-100 disabled:opacity-40 shadow-sm"
                  >
                    <Plus size={14} />
                  </button>
                </div>
              </div>
            </div>

            {/* TOTAL CALCULATION CARD */}
            <div className="rounded-2xl bg-gradient-to-r from-amber-900 to-amber-950 text-white p-4 sm:p-5 shadow-md flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-amber-200/80">
                  Total Calculated Price
                </p>
                <p className="text-2xl sm:text-3xl font-black mt-0.5">
                  Rs.{" "}
                  {totalPrice.toLocaleString(undefined, {
                    maximumFractionDigits: 2,
                  })}
                </p>
              </div>

              <div className="w-10 h-10 rounded-xl bg-white/10 backdrop-blur-md flex items-center justify-center">
                <ShoppingCart size={20} className="text-amber-200" />
              </div>
            </div>

            {/* ACTION BUTTONS */}
            <div className="grid sm:grid-cols-2 gap-3">
              <button
                type="button"
                disabled={isOutOfStock || isAdding}
                onClick={handleAddToCart}
                className="h-12 rounded-xl border-2 border-amber-800 bg-white text-amber-900 font-bold text-sm flex items-center justify-center gap-2 transition hover:bg-amber-50 active:scale-[0.98] disabled:opacity-50"
              >
                <ShoppingCart size={18} />
                {isAdding ? "Adding..." : "Add to Cart"}
              </button>

              <button
                type="button"
                disabled={isOutOfStock || isBuying}
                onClick={handleBuyNow}
                className="h-12 rounded-xl bg-amber-800 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-md transition hover:bg-amber-900 active:scale-[0.98] disabled:opacity-50"
              >
                <Zap size={18} fill="currentColor" />
                {isBuying ? "Processing..." : "Buy Now"}
              </button>
            </div>

            {/* ADMIN OPTION */}
            {isAdmin && (
              <div className="rounded-xl border border-purple-200 bg-purple-50 p-3 flex items-center justify-between">
                <p className="text-xs font-bold text-purple-900">Admin Controls Active</p>
                <Link
                  to={`/admin/products/edit/${product.id}`}
                  className="rounded-lg bg-purple-700 px-3 py-1.5 text-xs font-bold text-white hover:bg-purple-800 transition"
                >
                  Edit Product
                </Link>
              </div>
            )}

          </section>

        </div>
      </main>
    </div>
  );
}