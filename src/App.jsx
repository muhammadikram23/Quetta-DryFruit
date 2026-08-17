import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';
import ChatBotWidget from './components/ChatBotWidget'; // 🤖 AI Chatbot Widget

import Home from './pages/Home';
import Products from './pages/Products';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Contact from './pages/Contact';

import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import AdminProducts from './pages/AdminProducts';
import AdminOrders from './pages/AdminOrders';
import AdminFeedback from './pages/AdminFeedback';
import AdminProfit from './pages/AdminProfit';

export default function App() {
  const [cart, setCart] = useState([]);

  const handleAddToCart = (product, weightKg) => {
    const existingIndex = cart.findIndex(item => item.product_id === product.id);
    const subtotal = weightKg * product.price_per_kg;

    if (existingIndex > -1) {
      const newCart = [...cart];
      newCart[existingIndex].weight_kg += weightKg;
      newCart[existingIndex].subtotal += subtotal;
      setCart(newCart);
    } else {
      setCart([...cart, {
        product_id: product.id,
        title: product.title,
        price_per_kg: product.price_per_kg,
        weight_kg: weightKg,
        subtotal: subtotal
      }]);
    }
  };

  return (
    <div className="min-h-screen bg-amber-50 text-slate-800 font-sans relative">
      <Navbar cartCount={cart.length} />

      <Routes>
        {/* Public Customer Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products addToCart={handleAddToCart} />} />
        <Route path="/products/:id" element={<ProductDetail addToCart={handleAddToCart} />} />
        <Route path="/cart" element={<Cart cart={cart} setCart={setCart} />} />
        <Route path="/contact" element={<Contact />} />

        {/* Admin Authentication & Protected Routes */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
        <Route path="/admin/products" element={<ProtectedRoute><AdminProducts /></ProtectedRoute>} />
        <Route path="/admin/orders" element={<ProtectedRoute><AdminOrders /></ProtectedRoute>} />
        <Route path="/admin/profit" element={<ProtectedRoute><AdminProfit /></ProtectedRoute>} />
        <Route path="/admin/feedback" element={<ProtectedRoute><AdminFeedback /></ProtectedRoute>} />

        {/* Fallback Route */}
        <Route path="*" element={<Home />} />
      </Routes>

      {/* 🟢 Floating AI Chatbot Widget (Bottom-Left) */}
      <ChatBotWidget />
    </div>
  );
}