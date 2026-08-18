import React, { useEffect, useState } from 'react';
import API from '../api'; // Central Axios Instance
import { Calendar, TrendingUp, DollarSign, Package, RefreshCw } from 'lucide-react';

export default function AdminProfit() {
  const [data, setData] = useState({ summary: {}, products: [] });
  const [timeframe, setTimeframe] = useState('all');
  const [loading, setLoading] = useState(false);

  // Fetch updated profit stats from DB
  const loadProfitAnalytics = () => {
    setLoading(true);
    API.get('/api/admin/analytics/profit-details')
      .then(res => {
        setData(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error loading profit stats:', err);
        setLoading(false);
      });
  };

  useEffect(() => {
    loadProfitAnalytics();
  }, []);

  const summary = data.summary || {};
  const products = data.products || [];

  return (
    <div className="p-3 sm:p-6 max-w-7xl mx-auto space-y-6 sm:space-y-8">
      
      {/* 🔝 HEADER SECTION */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-amber-950">Delivered Profit Analytics</h2>
          <p className="text-xs text-slate-500 mt-0.5">Real-time daily, weekly, and monthly calculations for delivered orders.</p>
        </div>
        <button 
          onClick={loadProfitAnalytics} 
          className="self-start sm:self-auto flex items-center gap-2 bg-amber-900 text-white px-3.5 py-2 rounded-xl text-xs font-bold hover:bg-amber-800 transition active:scale-95"
        >
          <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} /> Refresh Data
        </button>
      </div>

      {/* 📊 1. DYNAMIC COMBINED PROFIT CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {/* Today's Delivered Profit */}
        <div className="bg-white p-4 sm:p-6 rounded-2xl border border-amber-200 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-[11px] sm:text-xs font-bold uppercase text-slate-400">Today's Profit</p>
            <h3 className="text-2xl sm:text-3xl font-black text-emerald-600 mt-1">
              PKR {Number(summary.daily_profit || 0).toLocaleString()}
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              Revenue: PKR {Number(summary.daily_revenue || 0).toLocaleString()}
            </p>
          </div>
          <div className="p-3 bg-emerald-100 text-emerald-800 rounded-xl shrink-0">
            <Calendar className="w-5 h-5 sm:w-6 sm:h-6" />
          </div>
        </div>

        {/* Weekly Delivered Profit */}
        <div className="bg-white p-4 sm:p-6 rounded-2xl border border-amber-200 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-[11px] sm:text-xs font-bold uppercase text-slate-400">This Week's Profit</p>
            <h3 className="text-2xl sm:text-3xl font-black text-emerald-600 mt-1">
              PKR {Number(summary.weekly_profit || 0).toLocaleString()}
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              Revenue: PKR {Number(summary.weekly_revenue || 0).toLocaleString()}
            </p>
          </div>
          <div className="p-3 bg-amber-100 text-amber-800 rounded-xl shrink-0">
            <TrendingUp className="w-5 h-5 sm:w-6 sm:h-6" />
          </div>
        </div>

        {/* Monthly Delivered Profit */}
        <div className="bg-white p-4 sm:p-6 rounded-2xl border border-amber-200 shadow-sm flex items-center justify-between sm:col-span-2 lg:col-span-1">
          <div>
            <p className="text-[11px] sm:text-xs font-bold uppercase text-slate-400">This Month's Profit</p>
            <h3 className="text-2xl sm:text-3xl font-black text-emerald-600 mt-1">
              PKR {Number(summary.monthly_profit || 0).toLocaleString()}
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              Revenue: PKR {Number(summary.monthly_revenue || 0).toLocaleString()}
            </p>
          </div>
          <div className="p-3 bg-blue-100 text-blue-800 rounded-xl shrink-0">
            <DollarSign className="w-5 h-5 sm:w-6 sm:h-6" />
          </div>
        </div>
      </div>

      {/* 📦 2. PRODUCT PROFIT BREAKDOWN TABLE */}
      <div className="bg-white rounded-2xl shadow-md border border-slate-200 overflow-hidden">
        
        {/* Table Controls & Filter Tabs */}
        <div className="p-4 sm:p-6 border-b border-slate-100 flex flex-col sm:flex-row justify-between sm:items-center gap-4">
          <div className="flex items-center gap-2">
            <Package className="w-5 h-5 text-amber-800 shrink-0" />
            <h3 className="font-bold text-slate-800 text-sm sm:text-base">Delivered Product Breakdown</h3>
          </div>
          
          <div className="flex bg-slate-100 p-1 rounded-xl text-xs font-semibold overflow-x-auto no-scrollbar max-w-full">
            {['all', 'daily', 'weekly', 'monthly'].map((type) => (
              <button
                key={type}
                onClick={() => setTimeframe(type)}
                className={`px-3 py-1.5 rounded-lg capitalize transition whitespace-nowrap ${
                  timeframe === type ? 'bg-amber-900 text-white shadow' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {type === 'all' ? 'Lifetime' : type}
              </button>
            ))}
          </div>
        </div>

        {/* Scrollable Table View */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm text-slate-600 min-w-[650px]">
            <thead className="bg-slate-50 text-slate-700 uppercase text-[11px] sm:text-xs font-bold border-b border-slate-200">
              <tr>
                <th className="p-3 sm:p-4">Product Name</th>
                <th className="p-3 sm:p-4">Category</th>
                <th className="p-3 sm:p-4">Sold (kg)</th>
                <th className="p-3 sm:p-4">Delivered Revenue</th>
                <th className="p-3 sm:p-4 text-emerald-700">Net Profit</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {products.length === 0 ? (
                <tr>
                  <td colSpan="5" className="p-6 text-center text-slate-400 font-medium">
                    No profit records available.
                  </td>
                </tr>
              ) : (
                products.map((item) => {
                  let displayedProfit = item.product_net_profit;
                  if (timeframe === 'daily') displayedProfit = item.daily_profit;
                  if (timeframe === 'weekly') displayedProfit = item.weekly_profit;
                  if (timeframe === 'monthly') displayedProfit = item.monthly_profit;

                  return (
                    <tr key={item.product_id} className="hover:bg-amber-50/50 transition">
                      <td className="p-3 sm:p-4 font-bold text-slate-800 whitespace-nowrap">{item.product_name}</td>
                      <td className="p-3 sm:p-4 whitespace-nowrap">
                        <span className="bg-slate-100 text-slate-700 px-2.5 py-1 rounded-full text-xs font-medium">
                          {item.category}
                        </span>
                      </td>
                      <td className="p-3 sm:p-4 whitespace-nowrap">{item.total_kg_sold} kg</td>
                      <td className="p-3 sm:p-4 whitespace-nowrap">PKR {Number(item.total_revenue).toLocaleString()}</td>
                      <td className="p-3 sm:p-4 font-black text-emerald-600 whitespace-nowrap">
                        PKR {Number(displayedProfit).toLocaleString()}
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}