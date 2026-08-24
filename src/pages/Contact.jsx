import React, { useState } from 'react';
import API from '../api'; // Central Axios Instance
import { MapPin, Phone, Mail, Send, CheckCircle2, MessageSquare } from 'lucide-react';

// Contact Page: Displays store location, contact info, and a feedback form for users to submit reviews or inquiries
export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    rating: '5',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  // Handle form submission to send feedback to the backend API
  const handleSubmit = (e) => {
    e.preventDefault(); // Stop standard form refresh
    e.stopPropagation();

    setLoading(true);

    API.post('/api/feedback', formData)
      .then((res) => {
        console.log('Server Response Received:', res.data);
        if (res.data && res.data.success) {
          setSubmitted(true);
          setFormData({ name: '', email: '', rating: '5', message: '' });
        } else {
          alert('Something went wrong on the server.');
        }
      })
      .catch((err) => {
        console.error('Submission Error:', err);
        alert('Error sending feedback: ' + (err.response?.data?.error || err.message));
      })
      .finally(() => {
        setLoading(false); // Guarantees button resets no matter what
      });
  };

  // Render the contact page with store info and feedback form
  return (
    <div className="max-w-5xl mx-auto px-4 py-12 space-y-10">
      
      {/* Store Location & Info Header */}
      <div className="bg-white rounded-3xl shadow-md p-8 border border-amber-100">
        <h2 className="text-3xl font-extrabold text-amber-950 mb-2">Get in Touch with Us</h2>
        <p className="text-slate-600 mb-8 text-sm">
          Have questions about bulk orders, wholesale rates, or seasonal dry fruit harvests? Visit our store or send us a message.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-4 bg-amber-50 rounded-2xl border border-amber-200 text-center space-y-2">
            <MapPin className="w-6 h-6 text-amber-800 mx-auto" />
            <h4 className="font-bold text-amber-950 text-sm">Shop Address</h4>
            <p className="text-xs text-slate-700">Suraj Ganj Bazaar, Near Kandahari Bazaar, Quetta</p>
          </div>
          <div className="p-4 bg-amber-50 rounded-2xl border border-amber-200 text-center space-y-2">
            <Phone className="w-6 h-6 text-amber-800 mx-auto" />
            <h4 className="font-bold text-amber-950 text-sm">Phone & WhatsApp</h4>
            <p className="text-xs text-slate-700">+92 343 0225504</p>
          </div>
          <div className="p-4 bg-amber-50 rounded-2xl border border-amber-200 text-center space-y-2">
            <Mail className="w-6 h-6 text-amber-800 mx-auto" />
            <h4 className="font-bold text-amber-950 text-sm">Email Inquiry</h4>
            <p className="text-xs text-slate-700">info@quettadryfruits.pk</p>
          </div>
        </div>
      </div>

      {/* 💬 USER FEEDBACK FORM */}
      <div className="bg-white rounded-3xl shadow-xl p-8 border border-amber-100 max-w-2xl mx-auto">
        <div className="flex items-center gap-3 mb-6 border-b pb-4">
          <div className="p-2.5 bg-amber-100 text-amber-900 rounded-xl">
            <MessageSquare className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-slate-800">Customer Feedback & Reviews</h3>
            <p className="text-xs text-slate-500">We value your opinion! Share your feedback with our team.</p>
          </div>
        </div>

        {submitted ? (
          <div className="bg-emerald-50 border border-emerald-200 p-6 rounded-2xl text-center space-y-3">
            <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
            <h4 className="text-lg font-bold text-emerald-900">Thank You for Your Feedback!</h4>
            <p className="text-xs text-emerald-700">Your message has been received. We appreciate your response!</p>
            <button 
              onClick={() => setSubmitted(false)} 
              className="mt-2 text-xs font-bold text-amber-900 underline hover:text-amber-800"
            >
              Send Another Feedback
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">Your Name</label>
                <input 
                  required 
                  type="text" 
                  value={formData.name} 
                  onChange={e => setFormData({ ...formData, name: e.target.value })} 
                  className="w-full text-sm p-3 border rounded-xl border-slate-300 focus:ring-2 focus:ring-amber-800 outline-none" 
                  placeholder="e.g. Muhammad Ikram" 
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">Email Address</label>
                <input 
                  type="email" 
                  value={formData.email} 
                  onChange={e => setFormData({ ...formData, email: e.target.value })} 
                  className="w-full text-sm p-3 border rounded-xl border-slate-300 focus:ring-2 focus:ring-amber-800 outline-none" 
                  placeholder="ikram@example.com" 
                />
              </div>
            </div>
            
            // Store Rating Dropdown
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">Store Rating</label>
              <select 
                value={formData.rating} 
                onChange={e => setFormData({ ...formData, rating: e.target.value })} 
                className="w-full text-sm p-3 border rounded-xl border-slate-300 focus:ring-2 focus:ring-amber-800 outline-none bg-white font-medium"
              >
                <option value="5">⭐⭐⭐⭐⭐ 5 - Excellent Quality & Service</option>
                <option value="4">⭐⭐⭐⭐ 4 - Good Experience</option>
                <option value="3">⭐⭐⭐ 3 - Average / Fair</option>
                <option value="2">⭐⭐ 2 - Needs Improvement</option>
                <option value="1">⭐ 1 - Poor Experience</option>
              </select>
            </div>

            // Feedback Message Textarea
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">Your Message / Feedback</label>
              <textarea 
                required 
                rows="4" 
                value={formData.message} 
                onChange={e => setFormData({ ...formData, message: e.target.value })} 
                className="w-full text-sm p-3 border rounded-xl border-slate-300 focus:ring-2 focus:ring-amber-800 outline-none" 
                placeholder="Tell us about the product quality, delivery speed, or market prices..." 
              />
            </div>

            // Submit Button with Loading State
            <button 
              type="submit" 
              disabled={loading}
              className="w-full bg-amber-900 hover:bg-amber-800 text-amber-100 font-bold py-3.5 rounded-xl shadow transition flex items-center justify-center gap-2 text-sm disabled:bg-slate-300"
            >
              <Send className="w-4 h-4" /> {loading ? 'Submitting...' : 'Submit Feedback'}
            </button>
          </form>
        )}
      </div>

    </div>
  );
}