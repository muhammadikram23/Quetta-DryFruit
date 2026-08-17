import React, { useState, useEffect } from 'react';
import API from '../api'; // Central Axios Instance
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, Edit, ShieldCheck, Eye, AlertCircle } from 'lucide-react';

export default function Products({ addToCart }) {
  const [products, setProducts] = useState([]);
  
  // Weights structure: { [productId]: { type: 'preset' | 'custom', value: number, customInput: string } }
  const [productWeights, setProductWeights] = useState({});
  const navigate = useNavigate();

  // Check if the user is currently an Admin
  const isAdmin = localStorage.getItem('adminToken');

  useEffect(() => {
    API.get('/api/products')
      .then(res => setProducts(res.data))
      .catch(err => console.error(err));
  }, []);

  // Handle dropdown changes for weight
  const handleWeightChange = (productId, val) => {
    if (val === 'custom') {
      setProductWeights(prev => ({
        ...prev,
        [productId]: { type: 'custom', value: 0, customInput: '' }
      }));
    } else {
      setProductWeights(prev => ({
        ...prev,
        [productId]: { type: 'preset', value: parseFloat(val), customInput: '' }
      }));
    }
  };

  // Handle manual input typing for custom weight
  const handleCustomInputChange = (productId, inputValue) => {
    const parsedVal = parseFloat(inputValue) || 0;
    setProductWeights(prev => ({
      ...prev,
      [productId]: { type: 'custom', value: parsedVal, customInput: inputValue }
    }));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <div>
          <h2 className="text-3xl font-extrabold text-amber-950">Our Full Product Catalog</h2>
          <p className="text-sm text-slate-600 mt-1">
            {isAdmin 
              ? 'Previewing catalog in Admin Mode. Direct purchasing controls are hidden.' 
              : 'Hand-picked organic dry fruits directly from Quetta wholesale markets.'}
          </p>
        </div>

        {isAdmin && (
          <div className="bg-amber-100 text-amber-900 border border-amber-300 px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-600" /> Admin Mode Active
          </div>
        )}
      </div>

      {/* Product Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map(p => {
          // Weight selection data for current product
          const weightState = productWeights[p.id] || { type: 'preset', value: 1, customInput: '' };
          const selectedWeightKg = weightState.value;
          const isCustom = weightState.type === 'custom';

          // Validation checks
          const isExceedingStock = selectedWeightKg > Number(p.stock_kg);
          const isInvalidWeight = selectedWeightKg <= 0;

          return (
            <div 
              key={p.id} 
              className="bg-white rounded-xl shadow-md border border-amber-100 overflow-hidden hover:shadow-lg transition flex flex-col justify-between"
            >
              
              {/* Image & Stock Badge */}
              <div className="relative group">
                <Link to={`/products/${p.id}`}>
                  <img 
                    src={p.image_url || 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d'} 
                    alt={p.title} 
                    className="w-full h-48 object-cover group-hover:scale-105 transition duration-300 cursor-pointer" 
                  />
                  <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
                    <span className="bg-white/90 text-slate-800 text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-1 shadow">
                      <Eye className="w-3.5 h-3.5 text-amber-800" /> View Details
                    </span>
                  </div>
                </Link>

                <span className={`absolute top-2 right-2 text-xs font-bold px-2.5 py-1 rounded shadow-sm ${
                  p.stock_kg > 10 ? 'bg-emerald-100 text-emerald-800 border border-emerald-300' : 'bg-rose-100 text-rose-800 border border-rose-300'
                }`}>
                  {p.stock_kg > 0 ? `${p.stock_kg} kg left` : 'Out of Stock'}
                </span>
              </div>

              {/* Product Info */}
              <div className="p-4 flex-grow flex flex-col justify-between">
                <div>
                  <span className="text-xs font-semibold text-amber-700 uppercase tracking-wider">{p.category} • {p.origin}</span>
                  <Link to={`/products/${p.id}`} className="block hover:text-amber-800 transition">
                    <h4 className="text-lg font-bold text-slate-800 mt-1">{p.title}</h4>
                  </Link>
                  <p className="text-xl font-extrabold text-amber-900 mt-2">
                    PKR {Number(p.price_per_kg).toLocaleString()} <span className="text-xs text-slate-500 font-normal">/ kg</span>
                  </p>
                </div>

                {/* CUSTOMER CONTROLS: Weight Selector & Custom Amount Input */}
                {!isAdmin && (
                  <div className="mt-4 space-y-2 bg-amber-50/70 p-2.5 rounded-lg border border-amber-200">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-amber-900">Select Weight:</span>
                      <select 
                        value={isCustom ? 'custom' : selectedWeightKg} 
                        onChange={(e) => handleWeightChange(p.id, e.target.value)}
                        className="bg-white text-xs font-bold text-amber-950 border border-amber-300 rounded px-2 py-1 focus:outline-none cursor-pointer"
                      >
                        <option value={0.25}>250 grams</option>
                        <option value={0.5}>500 grams</option>
                        <option value={1}>1.00 kg</option>
                        <option value={2}>2.00 kg</option>
                        <option value={5}>5.00 kg</option>
                        <option value="custom">-- Custom Amount --</option>
                      </select>
                    </div>

                    {/* Custom Input Field with MAX limit */}
                    {isCustom && (
                      <div className="space-y-1 pt-1">
                        <div className="flex items-center gap-1.5">
                          <input
                            type="number"
                            step="0.05"
                            min="0.05"
                            max={p.stock_kg}
                            placeholder={`Max ${p.stock_kg} kg`}
                            value={weightState.customInput}
                            onChange={(e) => handleCustomInputChange(p.id, e.target.value)}
                            className={`w-full bg-white text-xs font-semibold p-1.5 rounded border outline-none ${
                              isExceedingStock ? 'border-red-500 bg-red-50 text-red-900' : 'border-amber-300 focus:border-amber-500'
                            }`}
                          />
                          <span className="text-xs font-bold text-amber-900">KG</span>
                        </div>

                        {/* Error Message if amount exceeds stock */}
                        {isExceedingStock && (
                          <p className="text-[10px] text-red-600 font-bold flex items-center gap-0.5">
                            <AlertCircle className="w-3 h-3" /> Max available: {p.stock_kg} kg
                          </p>
                        )}
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* ACTION BUTTONS (Differentiated for Admin vs Customer) */}
              <div className="p-4 pt-0">
                {isAdmin ? (
                  /* ADMIN ACTION: Edit Inventory Directly */
                  <button 
                    onClick={() => navigate('/admin/products')}
                    className="w-full bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold py-2.5 rounded-lg flex items-center justify-center gap-2 transition"
                  >
                    <Edit className="w-3.5 h-3.5 text-amber-400" /> Manage Item in Admin
                  </button>
                ) : (
                  /* CUSTOMER ACTION: Add to Cart */
                  <button 
                    onClick={() => addToCart(p, selectedWeightKg)} 
                    disabled={p.stock_kg <= 0 || isExceedingStock || isInvalidWeight}
                    className="w-full bg-amber-900 hover:bg-amber-800 disabled:bg-slate-300 text-amber-100 font-semibold py-2.5 rounded-lg flex items-center justify-center gap-2 transition shadow-sm disabled:cursor-not-allowed"
                  >
                    <ShoppingCart className="w-4 h-4" /> Add to Cart
                  </button>
                )}
              </div>

            </div>
          );
        })}
      </div>
    </div>
  );
}