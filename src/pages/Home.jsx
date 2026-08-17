import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
    ShieldCheck, Truck, Award, MapPin, Sparkles,
    HeartHandshake, CheckCircle2, ChevronLeft, ChevronRight
} from 'lucide-react';

export default function Home() {
    // Static presentation data
    const initialFruitsData = [
        {
            id: 'chilgoza',
            matchKeywords: ['chilgoza', 'pine nut'],
            title: "Premium Chilgoza (Pine Nuts)",
            defaultPrice: "PKR 8,500 / kg",
            generalInfo: "Hand-harvested directly from Torghar pine forests. Unpolished and rich in natural aromatic oils.",
            advantages: "High in healthy monounsaturated fats, protein, and antioxidants that boost energy and heart health.",
            quettaWeather: "Essential for surviving Quetta's freezing winter nights; provides immediate body warmth and sustained stamina.",
            origin: "Torghar & Zhob Valley"
        },
        {
            id: 'badam',
            matchKeywords: ['badam', 'almond'],
            title: "Quetta Kaghzi Badam (Almonds)",
            defaultPrice: "PKR 2,200 / kg",
            generalInfo: "Soft paper-shell almonds that crack easily by hand. Sourced directly from Loralai orchards.",
            advantages: "Packed with Vitamin E, Magnesium, and Fiber. Improves brain function and lowers cholesterol levels.",
            quettaWeather: "A staple morning snack during dry winter winds, preventing skin dryness and boosting immunity.",
            origin: "Loralai & Ziarat"
        },
        {
            id: 'anjeer',
            matchKeywords: ['anjeer', 'fig'],
            title: "Afghani White Anjeer (Dried Figs)",
            defaultPrice: "PKR 2,600 / kg",
            generalInfo: "Imported via Chaman border trade routes. Naturally sun-dried, garland-graded jumbo figs.",
            advantages: "Outstanding source of dietary fiber, Calcium, and Iron. Great for digestion and bone strength.",
            quettaWeather: "Eaten soaked or raw during chilly weather to maintain metabolic heat and soothe winter coughs.",
            origin: "Chaman Route / Kandahar"
        },
        {
            id: 'kishmish',
            matchKeywords: ['kishmish', 'raisin'],
            title: "Sundarkhani Golden Kishmish",
            defaultPrice: "PKR 1,800 / kg",
            generalInfo: "Long-grain golden raisins cured naturally under the sun without chemical processing.",
            advantages: "Rich in Iron and natural fruit fructose. Helps relieve fatigue, improves blood circulation, and aids digestion.",
            quettaWeather: "Pairs perfectly with green tea (Kahwa) in traditional Quetta winter gatherings.",
            origin: "Mastung & Pishin"
        }
    ];

    const [detailedFruits, setDetailedFruits] = useState(
        initialFruitsData.map(f => ({ ...f, price: f.defaultPrice }))
    );

    // Carousel slides data
    const carouselSlides = [
        {
            title: "Chilghoza (Pine Nuts)",
            subtitle: "The King of Balochistan's Harvest — Sourced directly from Torghar",
            image: "https://images.pexels.com/photos/11806634/pexels-photo-11806634.jpeg?_gl=1*1ydwe5f*_ga*MjE0NTA4NjI2Ny4xNzg2ODI4Mzcw*_ga_8JE65Q40S6*czE3ODY4MzA4MDkkbzIkZzEkdDE3ODY4MzE2NzUkajQwJGwwJGgw",
            tag: "Premium Grade"
        },
        {
            title: "Kaghzi Badam (Soft-Shell Almonds)",
            subtitle: "100% Organic, Paper-Shell Crisp from Loralai Orchards",
            image: "https://images.pexels.com/photos/33803616/pexels-photo-33803616.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
            tag: "Fresh Harvest"
        },
        {
            title: "Sunderkhani Kishmish (Golden Raisins)",
            subtitle: "Naturally Sun-Cured Long-Grain Seedless Delicacy",
            image: "https://images.pexels.com/photos/31508567/pexels-photo-31508567.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
            tag: "Sun-Dried"
        },
        {
            title: "Afghani Dried Figs (Anjeer)",
            subtitle: "Sun-Cured White Garland Grade Imported via Chaman Border",
            image: "https://images.pexels.com/photos/10112716/pexels-photo-10112716.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
            tag: "Natural Sweetness"
        }
    ];

    // Fetch Live Product Prices from backend API
    useEffect(() => {
        const fetchLivePrices = async () => {
            try {
                const rawBaseUrl = import.meta.env.VITE_API_BASE_URL || 'https://quetta-dry-fruit-backend.vercel.app';
                const API_BASE_URL = rawBaseUrl.replace(/\/$/, '');
                const endpoint = `${API_BASE_URL}/api/products`;

                const response = await fetch(endpoint);
                if (!response.ok) {
                    console.error("API Error status:", response.status);
                    return;
                }

                const products = await response.json();

                setDetailedFruits(prevFruits =>
                    prevFruits.map(fruit => {
                        const matchedProduct = products.find(p => {
                            const dbName = (p.title || p.name || '').toLowerCase();
                            return fruit.matchKeywords.some(keyword => dbName.includes(keyword.toLowerCase()));
                        });

                        if (matchedProduct) {
                            // Extract price_per_kg (or fall back to price)
                            const rawPrice = matchedProduct.price_per_kg ?? matchedProduct.price;
                            const numPrice = parseFloat(rawPrice);

                            return {
                                ...fruit,
                                price: !isNaN(numPrice)
                                    ? `PKR ${numPrice.toLocaleString()} / kg`
                                    : (rawPrice || fruit.defaultPrice)
                            };
                        }
                        return fruit;
                    })
                );
            } catch (error) {
                console.error("Failed to fetch live rates for home page:", error);
            }
        };

        fetchLivePrices();
    }, []);

    // Carousel Auto-slide State & Logic
    const [currentSlide, setCurrentSlide] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % carouselSlides.length);
        }, 4500);
        return () => clearInterval(timer);
    }, [carouselSlides.length]);

    const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % carouselSlides.length);
    const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + carouselSlides.length) % carouselSlides.length);

    return (
        <div className="max-w-7xl mx-auto px-4 py-8 space-y-16">

            {/* 1. Hero Banner */}
            <div className="bg-gradient-to-r from-amber-800 to-amber-950 text-white p-10 rounded-3xl shadow-xl flex flex-col md:flex-row items-center justify-between">
                <div className="space-y-4 max-w-2xl">
                    <span className="bg-amber-500/20 text-amber-300 text-xs font-bold uppercase px-3 py-1 rounded-full border border-amber-400/30">
                        100% Organic Balochistan Harvest
                    </span>
                    <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">
                        Fresh Local Dry Fruits Direct from Quetta Markets
                    </h1>
                    <p className="text-amber-200 text-lg">
                        Sourced directly from Suraj Ganj Bazaar & Kandahari Bazaar. Hand-selected Kaghzi Badam, Chilgoza, and Afghani Anjeer with live inventory tracking.
                    </p>
                    <div className="pt-2">
                        <Link to="/products" className="bg-amber-500 hover:bg-amber-400 text-amber-950 font-bold px-6 py-3 rounded-xl transition inline-block shadow-lg">
                            Browse Full Catalog
                        </Link>
                    </div>
                </div>
            </div>

            {/* 2. Business Story / Heritage Section */}
            <div className="bg-amber-50/60 border border-amber-200 rounded-3xl p-8 md:p-12 shadow-sm grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                <div className="space-y-4">
                    <div className="inline-flex items-center gap-2 text-amber-900 font-bold text-xs bg-amber-200/60 px-3 py-1 rounded-full">
                        <MapPin className="w-3.5 h-3.5 text-amber-700" />
                        Suraj Ganj & Kandahari Bazaar, Quetta
                    </div>
                    <h2 className="text-3xl font-extrabold text-amber-950 leading-snug">
                        Bringing Quetta's Historic Wholesale Markets Straight to Your Doorstep
                    </h2>
                    <p className="text-slate-700 text-sm md:text-base leading-relaxed">
                        Quetta has long been the heart of South Asia’s finest dry fruit trade. For generations, the vibrant lanes of <strong>Suraj Ganj Bazaar</strong> and <strong>Kandahari Bazaar</strong> have processed naturally harvested nuts and sun-dried fruits from Balochistan’s high-altitude orchards and neighboring trade routes.
                    </p>
                    <p className="text-slate-700 text-sm md:text-base leading-relaxed">
                        At <strong>Quetta Dry Fruits</strong>, we bypass conventional supply chain middlemen. We partner directly with primary growers and trusted market merchants to guarantee unadulterated freshness, authentic grading, and wholesale pricing.
                    </p>
                    <div className="pt-2 flex flex-wrap gap-4 text-xs font-bold text-amber-900">
                        <span className="flex items-center gap-1.5 bg-white px-3 py-2 rounded-lg border border-amber-200 shadow-xs">
                            <CheckCircle2 className="w-4 h-4 text-emerald-600" /> No Chemical Polishing
                        </span>
                        <span className="flex items-center gap-1.5 bg-white px-3 py-2 rounded-lg border border-amber-200 shadow-xs">
                            <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Hand-Graded Batches
                        </span>
                        <span className="flex items-center gap-1.5 bg-white px-3 py-2 rounded-lg border border-amber-200 shadow-xs">
                            <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Live Weight Selection
                        </span>
                    </div>
                </div>

                {/* Feature Visual Card */}
                <div className="bg-gradient-to-br from-amber-900 to-amber-950 text-white rounded-2xl p-8 space-y-6 shadow-xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 translate-x-4 -translate-y-4 w-32 h-32 bg-amber-500/10 rounded-full blur-2xl"></div>
                    <div className="flex items-center gap-3">
                        <Sparkles className="w-7 h-7 text-amber-400" />
                        <h3 className="text-xl font-bold">Why Quetta Dry Fruits Taste Better?</h3>
                    </div>
                    <ul className="space-y-4 text-sm text-amber-100/90">
                        <li className="flex items-start gap-3">
                            <span className="bg-amber-800 text-amber-300 font-bold rounded-full w-6 h-6 flex items-center justify-center text-xs flex-shrink-0 mt-0.5">1</span>
                            <span><strong>High Altitude Orchards:</strong> Crisp climate and dry mountain air yield denser oil profiles and natural sugars in nuts and fruits.</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <span className="bg-amber-800 text-amber-300 font-bold rounded-full w-6 h-6 flex items-center justify-center text-xs flex-shrink-0 mt-0.5">2</span>
                            <span><strong>Traditional Sun-Drying:</strong> Fruits are cured using centuries-old solar techniques without synthetic preservatives.</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <span className="bg-amber-800 text-amber-300 font-bold rounded-full w-6 h-6 flex items-center justify-center text-xs flex-shrink-0 mt-0.5">3</span>
                            <span><strong>Direct From Source:</strong> Minimal storage time ensures maximum crunch, moisture retention, and nutritional value.</span>
                        </li>
                    </ul>
                </div>
            </div>

            {/* 3. Visual Gallery Carousel */}
            <div className="space-y-4">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-2">
                    <div>
                        <span className="text-amber-800 text-xs font-bold uppercase tracking-wider">Visual Gallery</span>
                        <h2 className="text-3xl font-extrabold text-amber-950">Quetta Specialities Showcase</h2>
                    </div>
                    <p className="text-xs text-slate-500 font-medium">Auto-sliding preview of our flagship organic varieties</p>
                </div>

                <div className="relative h-80 sm:h-[420px] rounded-3xl overflow-hidden shadow-2xl group border border-amber-200">
                    {carouselSlides.map((slide, index) => (
                        <div
                            key={index}
                            className={`absolute inset-0 transition-all duration-1000 ease-in-out ${index === currentSlide ? 'opacity-100 scale-100 z-10' : 'opacity-0 scale-105 z-0'
                                }`}
                        >
                            <img
                                src={slide.image}
                                alt={slide.title}
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/50 to-transparent flex flex-col justify-end p-6 sm:p-10">
                                <div className="space-y-2 max-w-2xl transform transition duration-500">
                                    <span className="bg-amber-500 text-amber-950 font-bold text-xs px-3 py-1 rounded-full inline-block shadow-md">
                                        {slide.tag}
                                    </span>
                                    <h3 className="text-2xl sm:text-4xl font-extrabold text-white leading-tight drop-shadow-md">
                                        {slide.title}
                                    </h3>
                                    <p className="text-amber-200 text-sm sm:text-base font-medium drop-shadow">
                                        {slide.subtitle}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}

                    <button
                        onClick={prevSlide}
                        aria-label="Previous Slide"
                        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-amber-950/40 hover:bg-amber-600 text-white p-3 rounded-full backdrop-blur-md transition shadow-lg border border-white/20"
                    >
                        <ChevronLeft className="w-6 h-6" />
                    </button>
                    <button
                        onClick={nextSlide}
                        aria-label="Next Slide"
                        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-amber-950/40 hover:bg-amber-600 text-white p-3 rounded-full backdrop-blur-md transition shadow-lg border border-white/20"
                    >
                        <ChevronRight className="w-6 h-6" />
                    </button>

                    <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-20 flex gap-2.5 bg-slate-950/40 px-4 py-2 rounded-full backdrop-blur-md border border-white/10">
                        {carouselSlides.map((_, i) => (
                            <button
                                key={i}
                                onClick={() => setCurrentSlide(i)}
                                aria-label={`Go to slide ${i + 1}`}
                                className={`h-2.5 rounded-full transition-all duration-300 ${i === currentSlide ? 'w-8 bg-amber-400' : 'w-2.5 bg-white/50 hover:bg-white/80'
                                    }`}
                            />
                        ))}
                    </div>
                </div>
            </div>

            {/* 4. Detailed Fruit Cards (Live Rates Displayed) */}
            <div className="space-y-12">
                <div className="text-center max-w-2xl mx-auto space-y-2">
                    <span className="text-amber-800 text-xs font-bold uppercase tracking-widest">
                        Comprehensive Buyer Guide
                    </span>
                    <h2 className="text-3xl md:text-4xl font-extrabold text-amber-950">
                        Dry Fruit Spotlight & Live Rates
                    </h2>
                    <p className="text-slate-600 text-sm md:text-base">
                        Real-time prices directly synced with our database.
                    </p>
                </div>

                <div className="space-y-10">
                    {detailedFruits.map((fruit, index) => {
                        const isEven = index % 2 === 0;
                        const cardImage = carouselSlides[index % carouselSlides.length].image;

                        return (
                            <div
                                key={fruit.id}
                                className={`bg-white rounded-3xl border border-amber-200/80 shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col md:flex-row ${isEven ? '' : 'md:flex-row-reverse'
                                    }`}
                            >
                                <div className="relative md:w-1/2 h-72 md:h-auto min-h-[320px] overflow-hidden flex-shrink-0">
                                    <img
                                        src={cardImage}
                                        alt={fruit.title}
                                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                                    />
                                    <div className="absolute top-4 left-4 bg-amber-950/85 text-amber-300 text-xs font-bold px-3.5 py-1.5 rounded-full backdrop-blur-md shadow-md border border-amber-500/20">
                                        📍 {fruit.origin}
                                    </div>
                                    <div className="absolute bottom-4 right-4 bg-amber-500 text-amber-950 font-black text-sm px-4 py-2 rounded-xl shadow-lg">
                                        {fruit.price}
                                    </div>
                                </div>

                                <div className="md:w-1/2 p-6 sm:p-10 flex flex-col justify-between space-y-6">
                                    <div className="space-y-4">
                                        <div className="border-b border-amber-100 pb-3">
                                            <h3 className="text-2xl sm:text-3xl font-extrabold text-amber-950 tracking-tight">
                                                {fruit.title}
                                            </h3>
                                        </div>

                                        <p className="text-slate-700 text-sm sm:text-base leading-relaxed">
                                            {fruit.generalInfo}
                                        </p>

                                        <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                                            <span className="font-semibold text-amber-950">
                                                Health & Winter Value:
                                            </span>{' '}
                                            {fruit.advantages}{' '}
                                            <span className="text-slate-700 font-medium">
                                                {fruit.quettaWeather}
                                            </span>
                                        </p>
                                    </div>

                                    <div className="pt-2">
                                        <Link
                                            to="/products"
                                            className="w-full sm:w-auto inline-flex items-center justify-center bg-amber-950 hover:bg-amber-900 text-amber-300 font-bold text-sm py-3 px-7 rounded-xl transition-colors shadow-md hover:shadow-lg"
                                        >
                                            View Live Stock & Order
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* 5. Quality Guarantees */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-2xl shadow border border-amber-100 space-y-3 hover:border-amber-300 transition">
                    <Award className="w-9 h-9 text-amber-800" />
                    <h4 className="font-bold text-lg text-slate-800">100% Hand-Graded Quality</h4>
                    <p className="text-sm text-slate-600">
                        Every batch undergoes manual kernel size sorting, crispness evaluation, and moisture checks before dispatch.
                    </p>
                </div>

                <div className="bg-white p-6 rounded-2xl shadow border border-amber-100 space-y-3 hover:border-amber-300 transition">
                    <Truck className="w-9 h-9 text-amber-800" />
                    <h4 className="font-bold text-lg text-slate-800">Fresh Express Delivery</h4>
                    <p className="text-sm text-slate-600">
                        Nationwide delivery across Pakistan with fast same-day dispatch options.
                    </p>
                </div>

                <div className="bg-white p-6 rounded-2xl shadow border border-amber-100 space-y-3 hover:border-amber-300 transition">
                    <ShieldCheck className="w-9 h-9 text-amber-800" />
                    <h4 className="font-bold text-lg text-slate-800">Direct Market Sourcing</h4>
                    <p className="text-sm text-slate-600">
                        No middle distributors involved. Guaranteed genuine Quetta market wholesale rates with maximum fresh yield.
                    </p>
                </div>
            </div>

            {/* 6. Bottom CTA */}
            <div className="bg-gradient-to-r from-amber-900 via-amber-950 to-slate-900 text-white rounded-3xl p-8 md:p-12 text-center space-y-4 shadow-xl">
                <HeartHandshake className="w-12 h-12 text-amber-400 mx-auto" />
                <h2 className="text-3xl font-extrabold">Ready to Order Premium Quetta Harvest?</h2>
                <p className="text-amber-200 text-sm max-w-xl mx-auto">
                    Choose your exact desired weight with real-time stock availability and live updated prices.
                </p>
                <div className="pt-2">
                    <Link
                        to="/products"
                        className="bg-amber-500 hover:bg-amber-400 text-amber-950 font-bold px-8 py-3 rounded-xl transition inline-block shadow-lg"
                    >
                        Explore Product Catalog
                    </Link>
                </div>
            </div>

        </div>
    );
}