import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Store, 
  ShoppingCart, 
  LogOut, 
  ShieldCheck, 
  ShoppingBag, 
  TrendingUp, 
  MessageSquare 
} from 'lucide-react';

export default function Navbar({ cartCount }) {
  const navigate = useNavigate();
  const isAdmin = localStorage.getItem('adminToken');

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    navigate('/admin/login');
  };

  return (
    <nav className="bg-amber-900 text-amber-100 shadow-md sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        {/* Store Logo */}
        <Link to="/" className="flex items-center gap-2">
          <Store className="w-7 h-7 text-amber-400" />
          <h1 className="text-xl font-bold text-amber-100">Quetta Dry Fruits</h1>
        </Link>

        {/* Dynamic Navigation Links */}
        <div className="flex gap-6 items-center font-medium text-sm">
          <Link to="/" className="hover:text-amber-300">Home</Link>
          <Link to="/products" className="hover:text-amber-300">Products Catalog</Link>

          {isAdmin ? (
            <>
              {/* ADMIN MODE LINKS */}
              <Link to="/admin/orders" className="hover:text-amber-300 flex items-center gap-1 text-amber-200">
                <ShoppingBag className="w-4 h-4" /> Orders
              </Link>

              {/* 🟢 Added Profit & Feedback Links for Admin */}
              <Link to="/admin/profit" className="hover:text-amber-300 flex items-center gap-1 text-amber-200">
                <TrendingUp className="w-4 h-4" /> Profit
              </Link>

              <Link to="/admin/feedback" className="hover:text-amber-300 flex items-center gap-1 text-amber-200">
                <MessageSquare className="w-4 h-4" /> Feedback
              </Link>

              <div className="flex items-center gap-3 bg-amber-950 px-3 py-1.5 rounded-lg border border-amber-700">
                <Link to="/admin" className="text-amber-300 font-bold flex items-center gap-1">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" /> Dashboard
                </Link>
                <button 
                  onClick={handleLogout} 
                  title="Logout" 
                  className="text-rose-400 hover:text-rose-300 ml-1 transition"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            </>
          ) : (
            <>
              {/* CUSTOMER MODE LINKS */}
              <Link to="/contact" className="hover:text-amber-300">Contact</Link>
              <Link to="/admin/login" className="text-amber-300 hover:text-amber-200">Admin Login</Link>

              <Link to="/cart" className="relative bg-amber-800 hover:bg-amber-700 p-2 rounded-full transition">
                <ShoppingCart className="w-5 h-5 text-amber-200" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-emerald-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}