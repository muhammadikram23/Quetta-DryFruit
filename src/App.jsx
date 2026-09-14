import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';
import ChatBotWidget from './components/ChatBotWidget'; 

import Home from './pages/Home';
import Products from './pages/Products';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Contact from './pages/Contact';
import About from './pages/About'; 

import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import AdminProducts from './pages/AdminProducts';
import AdminOrders from './pages/AdminOrders';
import AdminFeedback from './pages/AdminFeedback';
import AdminProfit from './pages/AdminProfit';

export default function App() {
  const [cart, setCart] = useState([]);

  {/*Handle adding products to the cart with weight and subtotal calculations*/}
  const handleAddToCart = (product, weightKg) => {
    if (!product) return;

    // Safely determine the weight from weightKg or properties on the product object
    const rawWeight = (typeof weightKg === 'number' && !isNaN(weightKg))
      ? weightKg
      : Number(product?.weight_kg || product?.weight || product?.quantity || 1);
    const weight = Number(rawWeight.toFixed(2));

    const pricePerKg = Number(product?.price_per_kg || 0);
    const productId = product?.id || product?.product_id;

    const existingIndex = cart.findIndex(item => item.product_id === productId);

    if (existingIndex > -1) {
      const newCart = [...cart];
      const updatedWeight = Number((newCart[existingIndex].weight_kg + weight).toFixed(2));
      newCart[existingIndex].weight_kg = updatedWeight;
      newCart[existingIndex].subtotal = Number((updatedWeight * pricePerKg).toFixed(2));
      setCart(newCart);
    } else {
      const subtotal = Number((weight * pricePerKg).toFixed(2));
      setCart([...cart, {
        product_id: productId,
        title: product.title,
        price_per_kg: pricePerKg,
        weight_kg: weight,
        subtotal: subtotal
      }]);
    }
  };

  {/*Render the main application with routing for public and admin pages, including a floating AI chatbot widget*/}
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
        <Route path="/about" element={<About />} /> 

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

      {/* Floating AI Chatbot Widget (Bottom-Left) */}
      <ChatBotWidget />
    </div>
  );
}