import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import {
  Store,
  ShoppingCart,
  LogOut,
  ShieldCheck,
  ShoppingBag,
  TrendingUp,
  MessageSquare,
  PackageCheck,
  Info
} from 'lucide-react';

// Import the About page component
import About from '../pages/About';

export default function Navbar({ cartCount }) {
  const navigate = useNavigate();
  const location = useLocation();

  // Dynamically track admin authentication state
  const [isAdmin, setIsAdmin] = useState(() => !!localStorage.getItem('adminToken'));

  // Re-evaluate admin token whenever route changes
  useEffect(() => {
    setIsAdmin(!!localStorage.getItem('adminToken'));
  }, [location]);

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    setIsAdmin(false);
    navigate('/admin/login');
  };

  return (
    <nav className="bg-amber-900 text-amber-100 shadow-md sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">

        {/* Store Logo & Branding */}
        <Link to={isAdmin ? "/admin" : "/"} className="flex items-center gap-2">
          <Store className="w-7 h-7 text-amber-400" />
          <div>
            <h1 className="text-xl font-bold text-amber-100 leading-none">Quetta Dry Fruits</h1>
            {isAdmin && (
              <span className="text-[10px] text-emerald-400 font-bold uppercase tracking-wider">
                Admin Control Panel
              </span>
            )}
          </div>
        </Link>

        {/* Dynamic Navigation Links */}
        <div className="flex gap-6 items-center font-medium text-sm">

          {/* ================= ADMIN VIEW ================= */}
          {isAdmin ? (
            <div className="flex items-center gap-5">

              <Link
                to="/products"
                className={`hover:text-amber-300 flex items-center gap-1.5 transition ${
                  location.pathname === '/products' ? 'text-amber-300 font-bold' : ''
                }`}
              >
                <PackageCheck className="w-4 h-4 text-amber-400" /> Catalog Preview
              </Link>

              <Link
                to="/admin/orders"
                className={`hover:text-amber-300 flex items-center gap-1.5 transition ${
                  location.pathname === '/admin/orders' ? 'text-amber-300 font-bold' : ''
                }`}
              >
                <ShoppingBag className="w-4 h-4 text-amber-400" /> Orders
              </Link>

              <Link
                to="/admin/profit"
                className={`hover:text-amber-300 flex items-center gap-1.5 transition ${
                  location.pathname === '/admin/profit' ? 'text-amber-300 font-bold' : ''
                }`}
              >
                <TrendingUp className="w-4 h-4 text-amber-400" /> Profit & Analytics
              </Link>

              <Link
                to="/admin/feedback"
                className={`hover:text-amber-300 flex items-center gap-1.5 transition ${
                  location.pathname === '/admin/feedback' ? 'text-amber-300 font-bold' : ''
                }`}
              >
                <MessageSquare className="w-4 h-4 text-amber-400" /> Feedback
              </Link>

              {/* Admin Badge & Logout */}
              <div className="flex items-center gap-3 bg-amber-950 px-3 py-1.5 rounded-xl border border-amber-700/80 shadow-inner">
                <Link to="/admin" className="text-amber-300 font-bold flex items-center gap-1 text-xs">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" /> Dashboard
                </Link>

                <button
                  onClick={handleLogout}
                  title="Logout Admin"
                  className="text-rose-400 hover:text-rose-300 transition pl-1 border-l border-amber-800"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>

            </div>
          ) : (
            /* ================= CUSTOMER VIEW ================= */
            <div className="flex items-center gap-6">

              {/* Home Link */}
              <Link
                to="/"
                className={`hover:text-amber-300 transition ${
                  location.pathname === '/' ? 'text-amber-300 font-bold' : ''
                }`}
              >
                Home
              </Link>

              {/* Products Catalog Link */}
              <Link
                to="/products"
                className={`hover:text-amber-300 transition ${
                  location.pathname.startsWith('/products') ? 'text-amber-300 font-bold' : ''
                }`}
              >
                Products Catalog
              </Link>

              {/* Contact Us Link */}
              <Link
                to="/contact"
                className={`hover:text-amber-300 transition ${
                  location.pathname === '/contact' ? 'text-amber-300 font-bold' : ''
                }`}
              >
                Contact Us
              </Link>

              {/* About Us Link */}
              <Link
                to="/about"
                className={`hover:text-amber-300 transition ${
                  location.pathname === '/about' ? 'text-amber-300 font-bold' : ''
                }`}
              >
                About Us
              </Link>

              {/* Admin Portal Link */}
              <Link
                to="/admin/login"
                className="text-amber-300/80 hover:text-amber-200 text-xs font-semibold bg-amber-950/60 px-2.5 py-1 rounded-md border border-amber-800"
              >
                Admin Portal
              </Link>

              {/* Customer Shopping Cart Badge */}
              <Link
                to="/cart"
                className="relative bg-amber-800 hover:bg-amber-700 p-2 rounded-full transition flex items-center justify-center shadow-sm"
                aria-label="Shopping Cart"
              >
                <ShoppingCart className="w-5 h-5 text-amber-200" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-emerald-500 text-white text-[11px] font-black rounded-full w-5 h-5 flex items-center justify-center shadow-md animate-pulse">
                    {cartCount}
                  </span>
                )}
              </Link>

            </div>
          )}

        </div>
      </div>
    </nav>
  );
}