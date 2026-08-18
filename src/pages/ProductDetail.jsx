import React, { useEffect, useMemo, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import API from '../api';

import {
  ShoppingCart,
  ArrowLeft,
  ShieldCheck,
  Truck,
  CheckCircle2,
  Award,
  AlertCircle,
  ChevronLeft,
  ChevronRight,
  PackageCheck,
  Sparkles,
  Leaf,
  Minus,
  Plus,
} from 'lucide-react';

/* =========================================================
   PRODUCT IMAGE COLLECTION
   ========================================================= */

const PRODUCT_IMAGES = {
  'kala munaqa': [
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQnDBXIx1gRgc6Xyby3xnIQrWA6HJgKi8wBk_HSx4hXmA&s=10',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTTfYIiv5T8jtqIojbBg_urvgpaKceMEuJvhGBSANCKjg&s=10',
    'https://www.gosupps.com/media/catalog/product/cache/25/image/1500x/040ec09b1e35df139433887a97daa66f/6/1/613KFxNItwL._AC_SL1000_.jpg',
  ],

  akhrot: [
    'https://images.pexels.com/photos/5753023/pexels-photo-5753023.jpeg?_gl=1*1krqkja*_ga*MjE0NTA4NjI2Ny4xNzg2ODI4Mzcw*_ga_8JE65Q40S6*czE3ODcwNzE1MTYkbzMkZzEkdDE3ODcwNzMxODMkajU5JGwwJGgw',
    'https://images.pexels.com/photos/10111850/pexels-photo-10111850.jpeg?_gl=1*xz2se3*_ga*MjE0NTA4NjI2Ny4xNzg2ODI4Mzcw*_ga_8JE65Q40S6*czE3ODcwNzE1MTYkbzMkZzEkdDE3ODcwNzMxODMkajU5JGwwJGgw',
    'https://images.pexels.com/photos/15429025/pexels-photo-15429025.jpeg?_gl=1*xz2se3*_ga*MjE0NTA4NjI2Ny4xNzg2ODI4Mzcw*_ga_8JE65Q40S6*czE3ODcwNzE1MTYkbzMkZzEkdDE3ODcwNzMxODMkajU5JGwwJGgw',
  ],

  kishmish: [
    'https://images.pexels.com/photos/6086004/pexels-photo-6086004.jpeg?_gl=1*1eq850n*_ga*MjE0NTA4NjI2Ny4xNzg2ODI4Mzcw*_ga_8JE65Q40S6*czE3ODcwNzE1MTYkbzMkZzEkdDE3ODcwNzMzOTMkajYwJGwwJGgw',
    'https://media.istockphoto.com/id/1450325028/photo/raisin-dried-grapes-dry-fruit-food-golden-sultana-kishmish-sweet-indian-raisins-sultanas.jpg?b=1&s=612x612&w=0&k=20&c=676UGelEk2zpxbjZBMNTh0FpZ8jei5tCo6y3r__qA6k=',
    'https://media.istockphoto.com/id/813962728/photo/raisin-in-white-bowl.jpg?b=1&s=612x612&w=0&k=20&c=uD2EWPsIEzWr_CK6923K5ICejdk7DCCTeoB-vtSBeJA=',
  ],

  pista: [
    'https://images.pexels.com/photos/32268320/pexels-photo-32268320.jpeg?_gl=1*18xwlkv*_ga*MjE0NTA4NjI2Ny4xNzg2ODI4Mzcw*_ga_8JE65Q40S6*czE3ODcwNzE1MTYkbzMkZzEkdDE3ODcwNzM2MDAkajU5JGwwJGgw',
    'https://images.pexels.com/photos/35902113/pexels-photo-35902113.jpeg?_gl=1*18xwlkv*_ga*MjE0NTA4NjI2Ny4xNzg2ODI4Mzcw*_ga_8JE65Q40S6*czE3ODcwNzE1MTYkbzMkZzEkdDE3ODcwNzM2MDAkajU5JGwwJGgw',
    'https://images.pexels.com/photos/20346554/pexels-photo-20346554.jpeg?_gl=1*18xwlkv*_ga*MjE0NTA4NjI2Ny4xNzg2ODI4Mzcw*_ga_8JE65Q40S6*czE3ODcwNzE1MTYkbzMkZzEkdDE3ODcwNzM2MDAkajU5JGwwJGgw',
  ],

  anjeer: [
    'https://media.istockphoto.com/id/1270811423/photo/dried-figs-or-anjeer-fruit-from-india-is-a-healthy-nutritional-food.jpg?b=1&s=612x612&w=0&k=20&c=8fH9fmU3H6XgE7c60VVmt2bBN_yWt9Yw2wzKOjHBn2w=',
    'https://images.pexels.com/photos/13016473/pexels-photo-13016473.jpeg?_gl=1*hcr1ox*_ga*MjE0NTA4NjI2Ny4xNzg2ODI4Mzcw*_ga_8JE65Q40S6*czE3ODcwNzE1MTYkbzMkZzEkdDE3ODcwNzM2OTAkajYwJGwwJGgw',
    'https://images.pexels.com/photos/10112716/pexels-photo-10112716.jpeg?_gl=1*onqtem*_ga*MjE0NTA4NjI2Ny4xNzg2ODI4Mzcw*_ga_8JE65Q40S6*czE3ODcwNzE1MTYkbzMkZzEkdDE3ODcwNzM4MzUkajU5JGwwJGgw',
  ],

  chilghoza: [
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTtPVdReZ1WsbicczHyyS3YTmpKgiE07XeSS57sAukbmA&s=10',
    'https://images.pexels.com/photos/7132731/pexels-photo-7132731.png?_gl=1*utpqzb*_ga*MjE0NTA4NjI2Ny4xNzg2ODI4Mzcw*_ga_8JE65Q40S6*czE3ODcwNzE1MTYkbzMkZzEkdDE3ODcwNzM5OTckajUzJGwwJGgw',
    'https://images.pexels.com/photos/7132722/pexels-photo-7132722.png?_gl=1*1ogx9qy*_ga*MjE0NTA4NjI2Ny4xNzg2ODI4Mzcw*_ga_8JE65Q40S6*czE3ODcwNzE1MTYkbzMkZzEkdDE3ODcwNzM5OTckajUzJGwwJGgw',
  ],

  badam: [
    'https://images.pexels.com/photos/9811631/pexels-photo-9811631.jpeg?_gl=1*1yief0d*_ga*MjE0NTA4NjI2Ny4xNzg2ODI4Mzcw*_ga_8JE65Q40S6*czE3ODcwNzE1MTYkbzMkZzEkdDE3ODcwNzQyMTUkajU5JGwwJGgw',
    'https://images.pexels.com/photos/5908477/pexels-photo-5908477.jpeg?_gl=1*k70gmo*_ga*MjE0NTA4NjI2Ny4xNzg2ODI4Mzcw*_ga_8JE65Q40S6*czE3ODcwNzE1MTYkbzMkZzEkdDE3ODcwNzQyMTUkajU5JGwwJGgw',
    'https://images.pexels.com/photos/35339669/pexels-photo-35339669.jpeg?_gl=1*k70gmo*_ga*MjE0NTA4NjI2Ny4xNzg2ODI4Mzcw*_ga_8JE65Q40S6*czE3ODcwNzE1MTYkbzMkZzEkdDE3ODcwNzQyMTUkajU5JGwwJGgw',
  ],
};


/* =========================================================
   HELPER
   ========================================================= */

const normalizeProductName = (name = '') => {
  return name
    .toLowerCase()
    .trim()
    .replace(/[()]/g, '')
    .replace(/\s+/g, ' ');
};


export default function ProductDetail({ addToCart }) {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  const [weightType, setWeightType] = useState('preset');
  const [selectedWeight, setSelectedWeight] = useState(1);
  const [customInput, setCustomInput] = useState('');

  const [addedMessage, setAddedMessage] = useState(false);

  const [activeImage, setActiveImage] = useState(0);

  const isAdmin = localStorage.getItem('adminToken');

  /* =========================================================
     FETCH PRODUCT
     ========================================================= */

  useEffect(() => {
    setLoading(true);

    API.get(`/api/products/${id}`)
      .then((res) => {
        setProduct(res.data);
        setLoading(false);
        setActiveImage(0);
      })
      .catch((err) => {
        console.error('Error fetching product:', err);
        setLoading(false);
      });
  }, [id]);


  /* =========================================================
     MATCH PRODUCT WITH IMAGE COLLECTION
     ========================================================= */

  const productImages = useMemo(() => {
    if (!product?.title) {
      return [];
    }

    const productName = normalizeProductName(product.title);

    /*
      Exact match first
    */
    if (PRODUCT_IMAGES[productName]) {
      return PRODUCT_IMAGES[productName];
    }

    /*
      Partial match as fallback.
      Example:
      "Premium Badam" -> badam
      "Kala Munaqa Premium" -> kala munaqa
    */
    const matchedKey = Object.keys(PRODUCT_IMAGES).find((key) => {
      return (
        productName.includes(key) ||
        key.includes(productName)
      );
    });

    return matchedKey ? PRODUCT_IMAGES[matchedKey] : [];
  }, [product]);


  /* =========================================================
     IMAGE FALLBACK
     ========================================================= */

  const galleryImages =
    productImages.length > 0
      ? productImages
      : [
          product?.image_url ||
            'https://images.unsplash.com/photo-1596040033229-a9821ebd058d',
        ];


  /* =========================================================
     PRICE CALCULATION
     ========================================================= */

  const pricePerKg = Number(product?.price_per_kg || 0);

  const totalPrice = pricePerKg * selectedWeight;

  const stockKg = Number(product?.stock_kg || 0);

  const isExceedingStock = selectedWeight > stockKg;
  const isInvalidWeight = selectedWeight <= 0;

  const isOutOfStock = stockKg <= 0;


  /* =========================================================
     WEIGHT HANDLERS
     ========================================================= */

  const handleWeightChange = (e) => {
    const val = e.target.value;

    if (val === 'custom') {
      setWeightType('custom');
      setSelectedWeight(0);
      setCustomInput('');
    } else {
      const weight = parseFloat(val);

      setWeightType('preset');
      setSelectedWeight(weight);
    }
  };


  const handleCustomInputChange = (e) => {
    const val = e.target.value;

    setCustomInput(val);
    setSelectedWeight(parseFloat(val) || 0);
  };


  /* =========================================================
     SMALL WEIGHT CONTROLS
     ========================================================= */

  const increaseWeight = () => {
    const newWeight = Number((selectedWeight + 0.25).toFixed(2));

    if (newWeight <= stockKg) {
      setSelectedWeight(newWeight);
      setWeightType('custom');
      setCustomInput(newWeight.toString());
    }
  };


  const decreaseWeight = () => {
    const newWeight = Number(
      Math.max(0.25, selectedWeight - 0.25).toFixed(2)
    );

    setSelectedWeight(newWeight);
    setWeightType('custom');
    setCustomInput(newWeight.toString());
  };


  /* =========================================================
     CAROUSEL
     ========================================================= */

  const nextImage = () => {
    setActiveImage((current) =>
      current === galleryImages.length - 1 ? 0 : current + 1
    );
  };


  const previousImage = () => {
    setActiveImage((current) =>
      current === 0 ? galleryImages.length - 1 : current - 1
    );
  };


  /* =========================================================
     ADD TO CART
     ========================================================= */

  const handleAddToCart = () => {
    if (isExceedingStock || isInvalidWeight || isOutOfStock) {
      return;
    }

    addToCart(product, selectedWeight);

    setAddedMessage(true);

    setTimeout(() => {
      setAddedMessage(false);
    }, 3000);
  };


  /* =========================================================
     BUY NOW
     ========================================================= */

  const handleBuyNow = () => {
    if (isExceedingStock || isInvalidWeight || isOutOfStock) {
      return;
    }

    addToCart(product, selectedWeight);
    navigate('/cart');
  };


  /* =========================================================
     LOADING STATE
     ========================================================= */

  if (loading) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center bg-[#faf8f3]">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-amber-200 border-t-amber-900 rounded-full animate-spin mx-auto mb-4" />

          <p className="text-sm font-semibold text-slate-500">
            Preparing your product experience...
          </p>
        </div>
      </div>
    );
  }


  /* =========================================================
     NOT FOUND
     ========================================================= */

  if (!product) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center bg-[#faf8f3] px-4">
        <div className="text-center max-w-md">

          <div className="w-20 h-20 rounded-full bg-amber-100 flex items-center justify-center mx-auto mb-6">
            <PackageCheck className="w-9 h-9 text-amber-800" />
          </div>

          <h2 className="text-3xl font-black text-slate-900">
            Product Not Found
          </h2>

          <p className="text-sm text-slate-500 mt-3">
            We couldn't retrieve the product you're looking for.
          </p>

          <Link
            to="/products"
            className="mt-6 inline-flex items-center gap-2 bg-amber-900 text-white px-6 py-3 rounded-xl font-bold hover:bg-amber-800 transition"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Catalog
          </Link>

        </div>
      </div>
    );
  }


  return (
    <div className="min-h-screen bg-[#faf8f3]">

      {/* =====================================================
          TOP NAV / BREADCRUMB
          ===================================================== */}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">

        <Link
          to="/products"
          className="inline-flex items-center gap-2 text-sm font-bold text-amber-900 hover:text-amber-700 transition"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Catalog
        </Link>

      </div>


      {/* =====================================================
          MAIN PRODUCT SECTION
          ===================================================== */}

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-10">

        <div className="bg-white rounded-[2rem] shadow-[0_20px_70px_rgba(74,52,20,0.08)] border border-amber-100 overflow-hidden">

          <div className="grid lg:grid-cols-[1.05fr_0.95fr]">

            {/* =================================================
                LEFT SIDE - IMAGE CAROUSEL
                ================================================= */}

            <section className="p-4 sm:p-6 lg:p-8">

              <div className="relative">

                {/* Main Image */}

                <div className="relative h-[380px] sm:h-[500px] lg:h-[590px] rounded-[1.5rem] overflow-hidden bg-[#f6f0e4] group">

                  <img
                    key={galleryImages[activeImage]}
                    src={galleryImages[activeImage]}
                    alt={`${product.title} - image ${activeImage + 1}`}
                    className="w-full h-full object-cover transition-all duration-500 group-hover:scale-[1.02]"
                  />


                  {/* Gradient */}

                  <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black/30 to-transparent pointer-events-none" />


                  {/* Premium badge */}

                  <div className="absolute top-5 left-5">

                    <div className="flex items-center gap-2 bg-white/90 backdrop-blur-md px-4 py-2 rounded-full shadow-lg">

                      <Sparkles className="w-4 h-4 text-amber-700" />

                      <span className="text-xs font-black uppercase tracking-wider text-amber-950">
                        Premium Quality
                      </span>

                    </div>

                  </div>


                  {/* Stock Badge */}

                  <div className="absolute top-5 right-5">

                    <div
                      className={`px-4 py-2 rounded-full text-xs font-black shadow-lg backdrop-blur-md ${
                        stockKg > 10
                          ? 'bg-emerald-500/95 text-white'
                          : stockKg > 0
                          ? 'bg-orange-500/95 text-white'
                          : 'bg-red-500/95 text-white'
                      }`}
                    >
                      {stockKg > 0
                        ? `${stockKg} KG AVAILABLE`
                        : 'OUT OF STOCK'}
                    </div>

                  </div>


                  {/* Previous */}

                  {galleryImages.length > 1 && (
                    <button
                      onClick={previousImage}
                      aria-label="Previous image"
                      className="absolute left-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/90 backdrop-blur shadow-xl flex items-center justify-center text-slate-800 hover:bg-white hover:scale-105 transition"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                  )}


                  {/* Next */}

                  {galleryImages.length > 1 && (
                    <button
                      onClick={nextImage}
                      aria-label="Next image"
                      className="absolute right-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/90 backdrop-blur shadow-xl flex items-center justify-center text-slate-800 hover:bg-white hover:scale-105 transition"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  )}


                  {/* Image counter */}

                  <div className="absolute bottom-5 right-5 bg-black/60 backdrop-blur-md text-white text-xs font-bold px-3 py-1.5 rounded-full">
                    {activeImage + 1} / {galleryImages.length}
                  </div>

                </div>


                {/* =================================================
                    THUMBNAILS
                    ================================================= */}

                {galleryImages.length > 1 && (
                  <div className="grid grid-cols-3 gap-3 mt-4">

                    {galleryImages.map((image, index) => (

                      <button
                        key={image}
                        onClick={() => setActiveImage(index)}
                        className={`relative h-24 sm:h-28 rounded-xl overflow-hidden border-2 transition-all ${
                          activeImage === index
                            ? 'border-amber-800 ring-2 ring-amber-100 scale-[1.02]'
                            : 'border-transparent opacity-70 hover:opacity-100'
                        }`}
                      >

                        <img
                          src={image}
                          alt={`${product.title} thumbnail ${index + 1}`}
                          className="w-full h-full object-cover"
                        />

                        {activeImage === index && (
                          <div className="absolute inset-0 bg-amber-900/10" />
                        )}

                      </button>

                    ))}

                  </div>
                )}

              </div>

            </section>


            {/* =================================================
                RIGHT SIDE - PRODUCT INFORMATION
                ================================================= */}

            <section className="p-6 sm:p-8 lg:p-12 flex flex-col">

              {/* Category */}

              <div className="flex flex-wrap gap-2 mb-5">

                <span className="inline-flex items-center gap-1.5 bg-amber-100 text-amber-900 border border-amber-200 px-3 py-1.5 rounded-full text-[11px] font-black uppercase tracking-wider">

                  <Leaf className="w-3.5 h-3.5" />

                  {product.category || 'Dry Fruit'}

                </span>

                <span className="bg-slate-100 text-slate-700 px-3 py-1.5 rounded-full text-[11px] font-black uppercase tracking-wider">

                  {product.origin || 'Quetta'}

                </span>

              </div>


              {/* Product Name */}

              <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-slate-950 leading-[1.05]">
                {product.title}
              </h1>


              {/* Rating-style decorative line */}

              <div className="flex items-center gap-2 mt-5">

                <div className="flex gap-1">

                  {[1, 2, 3, 4, 5].map((star) => (
                    <Sparkles
                      key={star}
                      className="w-3.5 h-3.5 text-amber-600 fill-amber-200"
                    />
                  ))}

                </div>

                <span className="text-xs font-semibold text-slate-500">
                  Carefully selected premium dry fruit
                </span>

              </div>


              {/* Price */}

              <div className="mt-7 p-5 rounded-2xl bg-gradient-to-br from-amber-50 to-[#f8f2e6] border border-amber-100">

                <p className="text-xs uppercase tracking-[0.2em] font-black text-amber-800">
                  Current Price
                </p>

                <div className="flex items-end gap-2 mt-1">

                  <span className="text-4xl font-black text-amber-950">
                    PKR {pricePerKg.toLocaleString()}
                  </span>

                  <span className="text-sm font-semibold text-slate-500 pb-1">
                    / kg
                  </span>

                </div>

              </div>


              {/* Description */}

              <div className="mt-7">

                <h2 className="text-sm font-black uppercase tracking-wider text-slate-900 mb-3">
                  About this product
                </h2>

                <p className="text-[15px] leading-7 text-slate-600">
                  {product.description ||
                    `Hand-selected premium ${product.title} sourced for exceptional taste and quality. Carefully handled to preserve its natural flavor, texture and freshness.`}
                </p>

              </div>


              {/* Divider */}

              <div className="border-t border-slate-100 my-7" />


              {/* ADMIN */}

              {isAdmin ? (

                <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5">

                  <div className="flex items-center gap-2">

                    <ShieldCheck className="w-5 h-5 text-emerald-600" />

                    <h3 className="font-black text-slate-900">
                      Admin Preview Mode
                    </h3>

                  </div>

                  <p className="text-sm text-slate-500 mt-2">
                    Purchasing controls are disabled for administrator accounts.
                  </p>

                  <button
                    onClick={() => navigate('/admin/products')}
                    className="mt-4 w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-3 rounded-xl transition"
                  >
                    Manage Product Inventory
                  </button>

                </div>

              ) : (

                /* =================================================
                   CUSTOMER PURCHASE AREA
                   ================================================= */

                <div className="space-y-5">

                  <div>

                    <div className="flex items-center justify-between mb-2">

                      <label className="text-sm font-black text-slate-900">
                        Select Quantity
                      </label>

                      <span className="text-xs font-semibold text-slate-500">
                        Available: {stockKg} kg
                      </span>

                    </div>


                    <select
                      value={
                        weightType === 'custom'
                          ? 'custom'
                          : selectedWeight
                      }
                      onChange={handleWeightChange}
                      className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3.5 text-sm font-bold text-slate-800 outline-none focus:border-amber-600 focus:ring-4 focus:ring-amber-100 transition cursor-pointer"
                    >

                      <option value={0.25}>
                        250 grams — PKR {(pricePerKg * 0.25).toLocaleString()}
                      </option>

                      <option value={0.5}>
                        500 grams — PKR {(pricePerKg * 0.5).toLocaleString()}
                      </option>

                      <option value={1}>
                        1 kg — PKR {pricePerKg.toLocaleString()}
                      </option>

                      <option value={2}>
                        2 kg — PKR {(pricePerKg * 2).toLocaleString()}
                      </option>

                      <option value={5}>
                        5 kg — PKR {(pricePerKg * 5).toLocaleString()}
                      </option>

                      <option value="custom">
                        Custom Quantity
                      </option>

                    </select>

                  </div>


                  {/* Custom Quantity */}

                  {weightType === 'custom' && (

                    <div className="rounded-2xl bg-slate-50 border border-slate-200 p-4">

                      <label className="text-xs font-black uppercase tracking-wider text-slate-700">
                        Custom Weight
                      </label>

                      <div className="flex gap-2 mt-2">

                        <div className="relative flex-1">

                          <input
                            type="number"
                            step="0.05"
                            min="0.05"
                            max={stockKg}
                            value={customInput}
                            onChange={handleCustomInputChange}
                            placeholder={`Maximum ${stockKg} kg`}
                            className={`w-full bg-white border rounded-xl px-4 py-3 text-sm font-bold outline-none transition ${
                              isExceedingStock
                                ? 'border-red-400 focus:ring-4 focus:ring-red-100'
                                : 'border-slate-200 focus:border-amber-600 focus:ring-4 focus:ring-amber-100'
                            }`}
                          />

                        </div>

                        <span className="flex items-center px-4 rounded-xl bg-amber-100 text-amber-900 font-black text-sm">
                          KG
                        </span>

                      </div>


                      {/* +/- controls */}

                      <div className="flex items-center justify-between mt-3">

                        <span className="text-xs text-slate-500 font-semibold">
                          Adjust quantity
                        </span>

                        <div className="flex items-center border border-slate-200 rounded-lg overflow-hidden bg-white">

                          <button
                            onClick={decreaseWeight}
                            className="w-9 h-9 flex items-center justify-center hover:bg-slate-100 transition"
                          >
                            <Minus className="w-4 h-4" />
                          </button>

                          <span className="w-14 text-center text-xs font-black">
                            {selectedWeight || 0} kg
                          </span>

                          <button
                            onClick={increaseWeight}
                            className="w-9 h-9 flex items-center justify-center hover:bg-slate-100 transition"
                          >
                            <Plus className="w-4 h-4" />
                          </button>

                        </div>

                      </div>


                      {isExceedingStock && (

                        <p className="flex items-center gap-1.5 mt-3 text-xs font-bold text-red-600">

                          <AlertCircle className="w-4 h-4" />

                          Quantity exceeds available stock of {stockKg} kg.

                        </p>

                      )}

                    </div>

                  )}


                  {/* Selected Price */}

                  <div className="flex items-center justify-between bg-amber-950 text-white rounded-2xl px-5 py-4">

                    <div>

                      <p className="text-[10px] uppercase tracking-wider text-amber-200 font-bold">
                        Your total
                      </p>

                      <p className="text-sm text-amber-100 mt-0.5">
                        {selectedWeight || 0} kg
                      </p>

                    </div>

                    <p className="text-2xl font-black">
                      PKR {totalPrice.toLocaleString()}
                    </p>

                  </div>


                  {/* Success Message */}

                  {addedMessage && (

                    <div className="flex items-center gap-2 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl px-4 py-3 text-sm font-bold">

                      <CheckCircle2 className="w-5 h-5 text-emerald-600" />

                      {selectedWeight} kg successfully added to your cart.

                    </div>

                  )}


                  {/* Buttons */}

                  <div className="grid sm:grid-cols-2 gap-3">

                    <button
                      onClick={handleAddToCart}
                      disabled={
                        isOutOfStock ||
                        isExceedingStock ||
                        isInvalidWeight
                      }
                      className="group bg-amber-900 hover:bg-amber-800 disabled:bg-slate-300 text-white font-black py-4 rounded-xl flex items-center justify-center gap-2 transition shadow-lg shadow-amber-900/10 disabled:cursor-not-allowed"
                    >

                      <ShoppingCart className="w-5 h-5 group-hover:-translate-y-0.5 transition" />

                      Add to Cart

                    </button>


                    <button
                      onClick={handleBuyNow}
                      disabled={
                        isOutOfStock ||
                        isExceedingStock ||
                        isInvalidWeight
                      }
                      className="bg-emerald-700 hover:bg-emerald-600 disabled:bg-slate-300 text-white font-black py-4 rounded-xl transition shadow-lg shadow-emerald-900/10 disabled:cursor-not-allowed"
                    >
                      Buy Now
                    </button>

                  </div>

                </div>

              )}


              {/* =================================================
                  TRUST FEATURES
                  ================================================= */}

              <div className="grid grid-cols-3 gap-2 mt-8 pt-7 border-t border-slate-100">

                <div className="text-center">

                  <div className="w-10 h-10 rounded-full bg-amber-50 flex items-center justify-center mx-auto mb-2">
                    <Award className="w-5 h-5 text-amber-800" />
                  </div>

                  <p className="text-[10px] sm:text-xs font-black text-slate-700">
                    Premium Quality
                  </p>

                </div>


                <div className="text-center">

                  <div className="w-10 h-10 rounded-full bg-emerald-50 flex items-center justify-center mx-auto mb-2">
                    <Truck className="w-5 h-5 text-emerald-700" />
                  </div>

                  <p className="text-[10px] sm:text-xs font-black text-slate-700">
                    Fast Delivery
                  </p>

                </div>


                <div className="text-center">

                  <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center mx-auto mb-2">
                    <ShieldCheck className="w-5 h-5 text-blue-700" />
                  </div>

                  <p className="text-[10px] sm:text-xs font-black text-slate-700">
                    Freshness Promise
                  </p>

                </div>

              </div>

            </section>

          </div>

        </div>


        {/* =====================================================
            BOTTOM INFORMATION CARDS
            ===================================================== */}

        <section className="grid md:grid-cols-3 gap-4 mt-6">

          <div className="bg-white border border-amber-100 rounded-2xl p-5 flex gap-4">

            <div className="w-11 h-11 shrink-0 rounded-xl bg-amber-100 flex items-center justify-center">
              <Leaf className="w-5 h-5 text-amber-800" />
            </div>

            <div>
              <h3 className="font-black text-slate-900 text-sm">
                Carefully Selected
              </h3>

              <p className="text-xs text-slate-500 leading-5 mt-1">
                Selected for quality, natural taste and excellent texture.
              </p>
            </div>

          </div>


          <div className="bg-white border border-amber-100 rounded-2xl p-5 flex gap-4">

            <div className="w-11 h-11 shrink-0 rounded-xl bg-emerald-100 flex items-center justify-center">
              <PackageCheck className="w-5 h-5 text-emerald-700" />
            </div>

            <div>
              <h3 className="font-black text-slate-900 text-sm">
                Secure Packaging
              </h3>

              <p className="text-xs text-slate-500 leading-5 mt-1">
                Packed carefully to help preserve freshness during delivery.
              </p>
            </div>

          </div>


          <div className="bg-white border border-amber-100 rounded-2xl p-5 flex gap-4">

            <div className="w-11 h-11 shrink-0 rounded-xl bg-blue-100 flex items-center justify-center">
              <Truck className="w-5 h-5 text-blue-700" />
            </div>

            <div>
              <h3 className="font-black text-slate-900 text-sm">
                Quetta Delivery
              </h3>

              <p className="text-xs text-slate-500 leading-5 mt-1">
                Convenient delivery options for customers in Quetta.
              </p>
            </div>

          </div>

        </section>

      </main>

    </div>
  );
}