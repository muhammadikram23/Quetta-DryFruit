import React, { useState } from 'react';
import API from '../api'; // Central Axios Instance
import { ShoppingCart, Trash2, CheckCircle, Printer } from 'lucide-react';

// Cart Page: Displays selected items, allows checkout, and generates a printable invoice
export default function Cart({ cart, setCart }) {
  const [customer, setCustomer] = useState({ name: '', phone: '', address: '' });
  const [generatedBill, setGeneratedBill] = useState(null);

  const cartTotal = cart.reduce((sum, item) => sum + Number(item.subtotal), 0);

  const removeFromCart = (id) => {
    setCart(cart.filter(item => item.product_id !== id));
  };

  // Handle checkout and order submission
  const handleCheckout = async (e) => {
    e.preventDefault();
    if (cart.length === 0) return alert('Your cart is empty!');

    const orderPayload = {
      customer_name: customer.name,
      customer_phone: customer.phone,
      delivery_address: customer.address,
      total_amount: cartTotal + 200,
      items: cart
    };

    try {
      const res = await API.post('/api/orders', orderPayload);
      setGeneratedBill({
        order_id: res.data.order_id,
        customer,
        items: cart,
        subtotal: cartTotal,
        delivery_fee: 200,
        total: cartTotal + 200,
        date: new Date().toLocaleString()
      });
      setCart([]);
      setCustomer({ name: '', phone: '', address: '' });
    } catch (err) {
      alert('Order processing failed: ' + (err.response?.data?.message || err.message));
    }
  };

  // Render the cart page with itemization, delivery form, and printable invoice modal
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold text-amber-950 mb-6 flex items-center gap-2">
        <ShoppingCart /> Shopping Cart & Checkout
      </h2>

      {cart.length === 0 && !generatedBill ? (
        <div className="bg-white p-8 rounded-2xl text-center shadow border border-amber-100">
          <p className="text-slate-500">Your cart is currently empty.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Cart Itemization */}
          <div className="bg-white p-6 rounded-2xl shadow border border-amber-100 space-y-4">
            <h3 className="font-bold text-lg text-slate-800 border-b pb-2">Selected Items</h3>
            {cart.map(item => (
              <div key={item.product_id} className="flex justify-between items-center bg-amber-50 p-3 rounded-lg border border-amber-200">
                <div>
                  <h5 className="font-bold text-slate-800">{item.title}</h5>
                  <p className="text-xs text-slate-600">{item.weight_kg} kg × PKR {item.price_per_kg}</p>
                  <p className="text-sm font-extrabold text-amber-900 mt-1">PKR {item.subtotal.toLocaleString()}</p>
                </div>
                <button onClick={() => removeFromCart(item.product_id)} className="text-rose-600 p-2 hover:bg-rose-100 rounded">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
            <div className="border-t pt-4 text-sm space-y-1">
              <div className="flex justify-between text-slate-600"><span>Items Subtotal</span><span>PKR {cartTotal.toLocaleString()}</span></div>
              <div className="flex justify-between text-slate-600"><span>Quetta Delivery</span><span>PKR 200</span></div>
              <div className="flex justify-between font-bold text-lg text-amber-950 border-t pt-2"><span>Grand Total</span><span>PKR {(cartTotal + 200).toLocaleString()}</span></div>
            </div>
          </div>

          {/* Delivery Form */}
          <div className="bg-white p-6 rounded-2xl shadow border border-amber-100">
            <h3 className="font-bold text-lg text-slate-800 border-b pb-2 mb-4">Customer Delivery Details</h3>
            <form onSubmit={handleCheckout} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Full Name</label>
                <input required type="text" value={customer.name} onChange={e => setCustomer({ ...customer, name: e.target.value })} className="w-full text-sm p-2.5 border rounded-lg border-slate-300" placeholder="e.g. Muhammad Ikram" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Phone Number</label>
                <input required type="text" value={customer.phone} onChange={e => setCustomer({ ...customer, phone: e.target.value })} className="w-full text-sm p-2.5 border rounded-lg border-slate-300" placeholder="0300 1234567" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Delivery Address</label>
                <textarea required rows="3" value={customer.address} onChange={e => setCustomer({ ...customer, address: e.target.value })} className="w-full text-sm p-2.5 border rounded-lg border-slate-300" placeholder="House/Street address, Quetta" />
              </div>
              <button type="submit" className="w-full bg-emerald-700 hover:bg-emerald-600 text-white font-bold py-3 rounded-xl transition">
                Confirm Order & Generate Bill
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Printable Invoice Modal */}
      {generatedBill && (
        <div className="fixed inset-0 bg-slate-900/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full p-6 border border-amber-200">
            <div className="flex items-center gap-2 text-emerald-700 font-bold mb-4">
              <CheckCircle className="w-6 h-6" /> Order Placed Successfully!
            </div>
            <div className="text-center mb-6">
              <h3 className="text-2xl font-extrabold text-amber-950">Quetta Dry Fruits & Co.</h3>
              <p className="text-xs text-slate-500">Suraj Ganj Bazaar, Quetta, Balochistan</p>
              <div className="mt-2 bg-amber-50 py-1 px-3 rounded-full text-xs font-bold text-amber-900 inline-block">
                Invoice Order #{generatedBill.order_id} • {generatedBill.date}
              </div>
            </div>
            <div className="bg-slate-50 p-3 rounded-lg text-xs space-y-1 mb-4 border">
              <p><strong>Customer:</strong> {generatedBill.customer.name}</p>
              <p><strong>Phone:</strong> {generatedBill.customer.phone}</p>
              <p><strong>Address:</strong> {generatedBill.customer.address}</p>
            </div>
            <div className="border-t pt-3 text-sm space-y-1">
              <div className="flex justify-between font-extrabold text-base text-amber-950"><span>Total Paid</span><span>PKR {generatedBill.total.toLocaleString()}</span></div>
            </div>
            <div className="mt-6 flex gap-3">
              <button onClick={() => window.print()} className="flex-1 bg-amber-900 hover:bg-amber-800 text-amber-100 font-bold py-2 rounded-lg flex items-center justify-center gap-2">
                <Printer className="w-4 h-4" /> Print / Save PDF
              </button>
              <button onClick={() => setGeneratedBill(null)} className="bg-slate-200 text-slate-800 font-bold px-4 py-2 rounded-lg">Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}