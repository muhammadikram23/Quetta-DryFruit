import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../api'; // Use central API instance
import { Lock } from 'lucide-react';

export default function AdminLogin() {
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      // Relative path: /api/admin/login
      const res = await API.post('/api/admin/login', credentials);
      if (res.data.success) {
        localStorage.setItem('adminToken', res.data.token);
        navigate('/admin');
      }
    } catch (err) {
      setError(err.response?.data?.error || 'Invalid credentials');
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <div className="bg-white p-8 rounded-2xl shadow-xl border border-amber-100 max-w-md w-full space-y-6">
        <div className="text-center space-y-2">
          <div className="inline-block p-3 bg-amber-100 rounded-full text-amber-900">
            <Lock className="w-6 h-6" />
          </div>
          <h2 className="text-2xl font-bold text-slate-800">Admin Store Portal</h2>
          <p className="text-sm text-slate-500">Sign in to manage inventory and view customer orders</p>
        </div>

        {error && <div className="bg-rose-50 text-rose-700 p-3 rounded-lg text-sm border border-rose-200 text-center">{error}</div>}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Username</label>
            <input 
              type="text" 
              required 
              value={credentials.username}
              onChange={e => setCredentials({ ...credentials, username: e.target.value })}
              className="w-full p-2.5 border rounded-lg border-slate-300 focus:ring-2 focus:ring-amber-800 outline-none" 
              placeholder="e.g. admin"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Password</label>
            <input 
              type="password" 
              required 
              value={credentials.password}
              onChange={e => setCredentials({ ...credentials, password: e.target.value })}
              className="w-full p-2.5 border rounded-lg border-slate-300 focus:ring-2 focus:ring-amber-800 outline-none" 
              placeholder="••••••••"
            />
          </div>
          <button type="submit" className="w-full bg-amber-900 hover:bg-amber-800 text-white font-bold py-3 rounded-lg transition">
            Login to Dashboard
          </button>
        </form>
      </div>
    </div>
  );
}