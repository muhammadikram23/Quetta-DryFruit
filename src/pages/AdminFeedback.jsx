import React, { useState, useEffect } from 'react';
import API from '../api'; // Use central API instance
import { MessageSquare, Star, Trash2, Mail, User, Calendar } from 'lucide-react';

export default function AdminFeedback() {
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFeedbacks();
  }, []);

  const fetchFeedbacks = async () => {
    try {
      // Relative path: /api/admin/feedback
      const res = await API.get('/api/admin/feedback', {
        headers: { Authorization: localStorage.getItem('adminToken') }
      });
      setFeedbacks(res.data);
    } catch (err) {
      console.error('Failed to fetch feedback:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this feedback entry?')) return;
    try {
      // Relative path: /api/admin/feedback/:id
      await API.delete(`/api/admin/feedback/${id}`, {
        headers: { Authorization: localStorage.getItem('adminToken') }
      });
      setFeedbacks(feedbacks.filter(item => item.id !== id));
    } catch (err) {
      alert('Failed to delete feedback: ' + err.message);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-6 py-4 sm:py-8 space-y-4 sm:space-y-6">
      
      {/* 🔝 HEADER SECTION */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-4 sm:p-6 rounded-2xl shadow-sm border border-amber-100">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-amber-950 flex items-center gap-2">
            <MessageSquare className="w-5 h-5 sm:w-6 sm:h-6 text-amber-800 shrink-0" />
            <span>Customer Feedback & Reviews</span>
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Review ratings, suggestions, and market feedback submitted by customers.
          </p>
        </div>
        <div className="self-start sm:self-auto">
          <span className="bg-amber-100 text-amber-900 text-xs font-bold px-3 py-1.5 rounded-full border border-amber-300 inline-block">
            Total Reviews: {feedbacks.length}
          </span>
        </div>
      </div>

      {/* 💬 FEEDBACKS GRID */}
      {loading ? (
        <div className="text-center py-12 text-slate-500 text-sm">Loading feedbacks...</div>
      ) : feedbacks.length === 0 ? (
        <div className="bg-white rounded-2xl p-8 sm:p-12 text-center text-slate-500 border border-slate-200 text-sm">
          No feedback received yet.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {feedbacks.map((fb) => (
            <div 
              key={fb.id} 
              className="bg-white rounded-2xl p-4 sm:p-6 shadow-sm border border-amber-100 flex flex-col justify-between hover:shadow-md transition gap-4"
            >
              <div className="space-y-3">
                {/* Rating Stars & Delete Action */}
                <div className="flex justify-between items-center gap-2">
                  <div className="flex items-center gap-1 text-amber-500 flex-wrap">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${
                          i < fb.rating ? 'fill-amber-400 text-amber-400' : 'text-slate-200'
                        }`} 
                      />
                    ))}
                    <span className="text-xs font-bold text-slate-600 ml-1">({fb.rating}/5)</span>
                  </div>
                  <button 
                    onClick={() => handleDelete(fb.id)} 
                    className="text-slate-400 hover:text-rose-500 transition p-1 rounded-lg hover:bg-rose-50"
                    title="Delete feedback"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                {/* Feedback Message */}
                <p className="text-slate-700 text-xs sm:text-sm italic bg-amber-50/50 p-3 rounded-xl border border-amber-100/60 leading-relaxed break-words">
                  "{fb.message}"
                </p>
              </div>

              {/* Author Details & Date Footer */}
              <div className="pt-3 border-t border-slate-100 text-xs space-y-1.5 text-slate-500">
                <div className="flex items-center gap-1.5 font-bold text-slate-800 truncate">
                  <User className="w-3.5 h-3.5 text-amber-800 shrink-0" />
                  <span className="truncate">{fb.name}</span>
                </div>
                {fb.email && (
                  <div className="flex items-center gap-1.5 text-slate-500 truncate">
                    <Mail className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span className="truncate">{fb.email}</span>
                  </div>
                )}
                <div className="flex items-center gap-1.5 text-[11px] text-slate-400 pt-0.5">
                  <Calendar className="w-3 h-3 shrink-0" />
                  <span>{new Date(fb.created_at).toLocaleDateString('en-US', { dateStyle: 'medium' })}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}