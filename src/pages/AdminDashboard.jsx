import React, { useState, useEffect } from 'react';
import API from '../api';
import { Link } from 'react-router-dom';
import { Package, AlertTriangle, ShoppingBag, ArrowRight } from 'lucide-react';

export default function AdminDashboard() {
  const [products, setProducts] = useState([]);
  const [lowStockItems, setLowStockItems] = useState([]);
  const [orders, setOrders] = useState([]);

  // Fetch products, low stock items, and orders on component mount
  useEffect(() => {
    API.get('/api/products')
      .then(res => setProducts(res.data))
      .catch(err => console.error('Error fetching products:', err));

    API.get('/api/products/alerts/low-stock?threshold=10')
      .then(res => setLowStockItems(res.data.low_stock_items))
      .catch(err => console.error('Error fetching low stock items:', err));

    //  fetch /api/admin/orders
    API.get('/api/admin/orders')
      .then(res => {
        // Handle array response or object wrapper if applicable
        const orderData = Array.isArray(res.data) ? res.data : (res.data.orders || []);
        setOrders(orderData);
      })
      .catch(err => console.error('Error fetching admin orders:', err));
  }, []);

  // Render the dashboard with product, low stock, and order information
  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
      <h2 className="text-3xl font-extrabold text-slate-800">Store Management Overview</h2>

      {/* Low Stock Banner */}
      {lowStockItems.length > 0 && (
        <div className="bg-rose-50 border-l-4 border-rose-500 p-4 rounded-r-xl shadow">
          <div className="flex items-center gap-3">
            <AlertTriangle className="w-6 h-6 text-rose-600 flex-shrink-0" />
            <div>
              <h4 className="text-lg font-bold text-rose-900">
                Low Stock Warning ({lowStockItems.length} items short)
              </h4>
              <p className="text-sm text-rose-700">Inventory levels are at or below 10 kg:</p>
            </div>
          </div>
          <div className="mt-3 flex flex-wrap gap-2">
            {lowStockItems.map(item => (
              <span key={item.id} className="bg-rose-100 text-rose-800 text-xs font-semibold px-3 py-1 rounded-full border border-rose-200">
                ⚠️ {item.title}: {item.stock_kg} kg left
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Quick Navigation Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Link to="/admin/products" className="bg-white p-6 rounded-2xl shadow border border-amber-100 hover:shadow-lg transition flex justify-between items-center">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-amber-100 text-amber-900 rounded-xl"><Package className="w-8 h-8" /></div>
            <div>
              <p className="text-sm text-slate-500">Products Inventory</p>
              <h3 className="text-2xl font-bold text-slate-800">{products.length} Items Listed</h3>
            </div>
          </div>
          <ArrowRight className="w-6 h-6 text-amber-800" />
        </Link>

        // Quick Navigation Metrics
        <Link to="/admin/orders" className="bg-white p-6 rounded-2xl shadow border border-amber-100 hover:shadow-lg transition flex justify-between items-center">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-emerald-100 text-emerald-900 rounded-xl"><ShoppingBag className="w-8 h-8" /></div>
            <div>
              <p className="text-sm text-slate-500">Customer Orders</p>
              <h3 className="text-2xl font-bold text-slate-800">{orders.length} Received</h3>
            </div>
          </div>
          <ArrowRight className="w-6 h-6 text-amber-800" />
        </Link>
      </div>
    </div>
  );
}