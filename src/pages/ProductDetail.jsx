import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ShoppingCart, ArrowLeft, ShieldCheck, Truck, CheckCircle2, Award } from 'lucide-react';

export default function ProductDetail({ addToCart }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedWeight, setSelectedWeight] = useState(1);
  const [addedMessage, setAddedMessage] = useState(false);

  const isAdmin = localStorage.getItem('adminToken');

  useEffect(() => {
    axios.get(`http://localhost:5000/api/products/${id}`)
      .then(res => {
        setProduct(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center text-slate-500">
        Loading product details...
      </div>
    );
  }

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center space-y-4">
        <h2 className="text-2xl font-bold text-slate-800">Product Not Found</h2>
        <Link to="/products" className="text-amber-900 font-bold hover:underline inline-flex items-center gap-1">
          <ArrowLeft className="w-4 h-4" /> Back to Catalog
        </Link>
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart(product, selectedWeight);
    setAddedMessage(true);
    setTimeout(() => setAddedMessage(false), 3000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
      {/* Back Button */}
      <Link to="/products" className="text-amber-900 font-bold hover:underline inline-flex items-center gap-2 text-sm">
        <ArrowLeft className="w-4 h-4" /> Back to Full Catalog
      </Link>

      {/* Main Detail Grid */}
      <div className="bg-white rounded-3xl shadow-lg border border-amber-100 overflow-hidden grid grid-cols-1 md:grid-cols-2 gap-8 p-6 md:p-10">
        
        {/* Left: Product Image */}
        <div className="relative rounded-2xl overflow-hidden border border-amber-200 bg-amber-50">
          <img 
            src={product.image_url || 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d'} 
            alt={product.title} 
            className="w-full h-96 object-cover"
          />
          <span className={`absolute top-4 right-4 text-xs font-bold px-3 py-1.5 rounded-full shadow-md ${
            product.stock_kg > 10 ? 'bg-emerald-100 text-emerald-800 border border-emerald-300' : 'bg-rose-100 text-rose-800 border border-rose-300'
          }`}>
            {product.stock_kg > 0 ? `${product.stock_kg} kg in stock` : 'Out of Stock'}
          </span>
        </div>

        {/* Right: Product Details & Controls */}
        <div className="space-y-6 flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex justify-between items-start">
              <span className="text-xs font-bold text-amber-800 uppercase tracking-wider bg-amber-100 px-3 py-1 rounded-full border border-amber-200">
                {product.category} • {product.origin}
              </span>
            </div>

            <h1 className="text-3xl font-extrabold text-slate-900">{product.title}</h1>
            
            <p className="text-3xl font-black text-amber-950">
              PKR {Number(product.price_per_kg).toLocaleString()} <span className="text-sm font-normal text-slate-500">/ kg</span>
            </p>

            <p className="text-slate-600 text-sm leading-relaxed border-t border-b py-4 border-slate-100">
              {product.description || `Hand-selected premium ${product.title} direct from Quetta local orchards. Naturally processed and free from artificial preservatives.`}
            </p>
          </div>

          {/* Purchasing Controls / Admin Notice */}
          {!isAdmin ? (
            <div className="space-y-4">
              <div className="flex items-center justify-between bg-amber-50 p-3 rounded-xl border border-amber-200">
                <span className="text-sm font-bold text-amber-950">Select Quantity / Weight:</span>
                <select 
                  value={selectedWeight} 
                  onChange={(e) => setSelectedWeight(parseFloat(e.target.value))}
                  className="bg-white text-sm font-bold text-amber-950 border border-amber-300 rounded-lg px-3 py-2 focus:outline-none"
                >
                  <option value={0.25}>250 grams (PKR {(product.price_per_kg * 0.25).toLocaleString()})</option>
                  <option value={0.5}>500 grams (PKR {(product.price_per_kg * 0.5).toLocaleString()})</option>
                  <option value={1}>1.00 kg (PKR {(product.price_per_kg * 1).toLocaleString()})</option>
                  <option value={2}>2.00 kg (PKR {(product.price_per_kg * 2).toLocaleString()})</option>
                  <option value={5}>5.00 kg (PKR {(product.price_per_kg * 5).toLocaleString()})</option>
                </select>
              </div>

              {addedMessage && (
                <div className="bg-emerald-50 text-emerald-800 p-3 rounded-xl text-xs font-bold flex items-center gap-2 border border-emerald-200">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Added {selectedWeight} kg to your cart!
                </div>
              )}

              <div className="flex gap-4">
                <button 
                  onClick={handleAddToCart}
                  disabled={product.stock_kg <= 0}
                  className="flex-1 bg-amber-900 hover:bg-amber-800 disabled:bg-slate-300 text-amber-100 font-bold py-3.5 rounded-xl flex items-center justify-center gap-2 transition shadow-md"
                >
                  <ShoppingCart className="w-5 h-5" /> Add to Cart
                </button>
                <button 
                  onClick={() => { handleAddToCart(); navigate('/cart'); }}
                  disabled={product.stock_kg <= 0}
                  className="flex-1 bg-emerald-700 hover:bg-emerald-600 disabled:bg-slate-300 text-white font-bold py-3.5 rounded-xl transition shadow-md"
                >
                  Buy Now
                </button>
              </div>
            </div>
          ) : (
            <div className="bg-slate-100 border border-slate-300 p-4 rounded-2xl space-y-2">
              <span className="text-xs font-bold text-slate-700 flex items-center gap-1">
                <ShieldCheck className="w-4 h-4 text-emerald-600" /> Admin Preview Mode
              </span>
              <p className="text-xs text-slate-500">Purchasing controls are disabled for admin accounts.</p>
              <button 
                onClick={() => navigate('/admin/products')} 
                className="w-full bg-slate-800 text-white font-bold text-xs py-2 rounded-lg"
              >
                Manage Product Inventory
              </button>
            </div>
          )}

          {/* Value Badges */}
          <div className="grid grid-cols-3 gap-3 border-t pt-4 text-center">
            <div className="p-2 bg-amber-50/50 rounded-lg">
              <Award className="w-5 h-5 text-amber-800 mx-auto mb-1" />
              <p className="text-[10px] font-bold text-slate-700">Graded Quality</p>
            </div>
            <div className="p-2 bg-amber-50/50 rounded-lg">
              <Truck className="w-5 h-5 text-amber-800 mx-auto mb-1" />
              <p className="text-[10px] font-bold text-slate-700">Same-day Quetta Delivery</p>
            </div>
            <div className="p-2 bg-amber-50/50 rounded-lg">
              <ShieldCheck className="w-5 h-5 text-amber-800 mx-auto mb-1" />
              <p className="text-[10px] font-bold text-slate-700">Fresh Harvest Guarantee</p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}