import React from "react";
import { Link } from "react-router-dom";
import {
  ShieldCheck,
  Truck,
  Award,
  HeartHandshake,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  MapPin,
} from "lucide-react";

export default function About() {
  return (
    <div className="min-h-screen bg-[#faf8f3] text-stone-900 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-12">
        
        {/* =======================================================
            HERO BANNER
        ======================================================= */}
        <section className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-amber-900 via-amber-950 to-stone-900 text-white p-8 sm:p-12 lg:p-16 shadow-xl">
          <div className="relative z-10 max-w-2xl space-y-4">
            <span className="inline-flex items-center gap-2 rounded-full bg-amber-500/20 border border-amber-500/30 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-amber-300 backdrop-blur-md">
              <Sparkles size={14} /> Our Heritage & Story
            </span>
            <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
              Bringing Pure & Authentic Dry Fruits from Quetta
            </h1>
            <p className="text-stone-300 text-sm sm:text-base leading-relaxed">
              Quetta Dry Fruits brings you the finest selection of organic, premium-quality nuts and dried fruits straight from the heart of Balochistan to your doorstep across Pakistan.
            </p>
            <div className="pt-2">
              <Link
                to="/products"
                className="inline-flex items-center gap-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold px-6 py-3 text-sm transition shadow-lg active:scale-95"
              >
                Explore Catalog <ArrowRight size={16} />
              </Link>
            </div>
          </div>

          {/* BACKGROUND DECORATIVE GLOW */}
          <div className="absolute top-0 right-0 -mt-12 -mr-12 w-96 h-96 bg-amber-600/20 rounded-full blur-3xl pointer-events-none" />
        </section>

        {/* =======================================================
            OUR MISSION & VISION
        ======================================================= */}
        <section className="grid md:grid-cols-2 gap-8 items-center">
          <div className="bg-white p-8 rounded-3xl border border-stone-200/80 shadow-sm space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-amber-100 flex items-center justify-center text-amber-900">
              <Award size={26} />
            </div>
            <h2 className="text-2xl font-black text-stone-900">Our Mission</h2>
            <p className="text-stone-600 text-sm leading-relaxed">
              Our mission is to deliver unadulterated, farm-fresh, and 100% natural dry fruits at fair prices. We carefully handpick Chilgoza, Walnuts, Almonds, Pistachios, and Figs from local orchards to maintain unmatched taste and nutritional value.
            </p>
            <ul className="space-y-2 pt-2">
              {["Strict Quality Checks", "No Artificial Preservatives", "Handpicked Fresh Stocks"].map((item, idx) => (
                <li key={idx} className="flex items-center gap-2 text-xs font-bold text-stone-700">
                  <CheckCircle2 size={16} className="text-emerald-600" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-white p-8 rounded-3xl border border-stone-200/80 shadow-sm space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-amber-100 flex items-center justify-center text-amber-900">
              <MapPin size={26} />
            </div>
            <h2 className="text-2xl font-black text-stone-900">Rooted in Quetta</h2>
            <p className="text-stone-600 text-sm leading-relaxed">
              Quetta is known as the fruit basket of Balochistan. Its unique climate produces dry fruits that are rich in natural oils, aroma, and essential nutrients. We bridge the gap between local growers and health-conscious customers nationwide.
            </p>
            <ul className="space-y-2 pt-2">
              {["Directly Sourced from Farmers", "Supporting Local Community", "Fast Nationwide Delivery"].map((item, idx) => (
                <li key={idx} className="flex items-center gap-2 text-xs font-bold text-stone-700">
                  <CheckCircle2 size={16} className="text-emerald-600" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* =======================================================
            WHY CHOOSE US (STATS / BADGES)
        ======================================================= */}
        <section className="bg-amber-900/5 rounded-3xl p-8 border border-amber-900/10">
          <div className="text-center max-w-xl mx-auto mb-8 space-y-2">
            <h2 className="text-2xl sm:text-3xl font-black text-stone-900">
              Why Customers Trust Us
            </h2>
            <p className="text-stone-500 text-xs sm:text-sm">
              We focus on premium quality, hygienic packaging, and fast delivery.
            </p>
          </div>

          <div className="grid sm:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-2xl border border-stone-200/80 text-center shadow-sm space-y-2">
              <ShieldCheck size={32} className="text-emerald-600 mx-auto" />
              <h3 className="font-black text-stone-900 text-base">100% Organic</h3>
              <p className="text-stone-500 text-xs">
                Guaranteed pure and natural dry fruits without chemical treatment.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-stone-200/80 text-center shadow-sm space-y-2">
              <Truck size={32} className="text-amber-800 mx-auto" />
              <h3 className="font-black text-stone-900 text-base">Nationwide Express</h3>
              <p className="text-stone-500 text-xs">
                Safe and fresh delivery right to your doorstep across Pakistan.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-stone-200/80 text-center shadow-sm space-y-2">
              <HeartHandshake size={32} className="text-amber-800 mx-auto" />
              <h3 className="font-black text-stone-900 text-base">Customer Satisfaction</h3>
              <p className="text-stone-500 text-xs">
                Dedicated customer support to assist with orders and inquiries.
              </p>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}