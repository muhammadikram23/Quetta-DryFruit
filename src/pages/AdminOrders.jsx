import React, { useState, useEffect } from 'react';
import API from '../api'; // Use central API instance
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

export default function AdminOrders() {
    const [orders, setOrders] = useState([]);

    // Fetch all orders
    const fetchOrders = () => {
        API.get('/api/admin/orders')
            .then(res => setOrders(res.data))
            .catch(err => console.error('Error fetching orders:', err));
    };

    useEffect(() => {
        fetchOrders();
    }, []);

    // Update status handler
    const handleStatusChange = (orderId, newStatus) => {
        API.put(`/api/admin/orders/${orderId}/status`, { status: newStatus })
            .then(() => {
                fetchOrders();
            })
            .catch(err => console.error('Error updating status:', err));
    };

    return (
        <div className="max-w-7xl mx-auto px-4 py-8 space-y-6">
            <div className="flex justify-between items-center">
                <Link to="/admin" className="text-amber-900 font-bold flex items-center gap-1 hover:underline">
                    <ArrowLeft className="w-4 h-4" /> Back to Overview
                </Link>
                <h2 className="text-2xl font-bold text-slate-800">Customer Orders Register</h2>
            </div>

            <div className="bg-white rounded-2xl shadow border border-amber-100 overflow-hidden">
                <table className="w-full text-left border-collapse text-sm">
                    <thead>
                        <tr className="bg-slate-800 text-white">
                            <th className="p-4">Order ID</th>
                            <th className="p-4">Customer Name</th>
                            <th className="p-4">Phone Number</th>
                            <th className="p-4">Delivery Address</th>
                            <th className="p-4 text-amber-300">Products Ordered</th> 
                            <th className="p-4 text-emerald-400">Total Bill</th>
                            <th className="p-4">Order Date</th>
                            <th className="p-4">Status</th>
                            <th className="p-4">Action</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {orders.length === 0 ? (
                            <tr>
                                <td colSpan="9" className="p-8 text-center text-slate-500 font-medium">
                                    No orders found.
                                </td>
                            </tr>
                        ) : (
                            orders.map((order) => (
                                <tr key={order.id} className="hover:bg-amber-50/40 transition">
                                    <td className="p-4 font-bold text-amber-900">#{order.id}</td>
                                    <td className="p-4 font-semibold text-slate-800">{order.customer_name}</td>
                                    <td className="p-4 text-slate-600">{order.customer_phone}</td>
                                    <td className="p-4 text-slate-600">{order.delivery_address}</td>

                                    <td className="p-4 font-medium text-slate-700">
                                        <div className="bg-amber-50/80 px-2.5 py-1.5 rounded-lg border border-amber-200 text-xs inline-block">
                                            {order.items_summary || 'No items specified'}
                                        </div>
                                    </td>

                                    <td className="p-4 font-bold text-emerald-700">
                                        PKR {Number(order.total_amount).toLocaleString()}
                                    </td>
                                    <td className="p-4 text-slate-500 text-xs">
                                        {new Date(order.created_at).toLocaleString()}
                                    </td>
                                    <td className="p-4">
                                        <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                                            order.status === 'Delivered'
                                                ? 'bg-emerald-100 text-emerald-800'
                                                : order.status === 'Cancelled'
                                                ? 'bg-rose-100 text-rose-800'
                                                : 'bg-amber-100 text-amber-800'
                                        }`}>
                                            {order.status}
                                        </span>
                                    </td>
                                    <td className="p-4">
                                        <select
                                            value={order.status}
                                            onChange={(e) => handleStatusChange(order.id, e.target.value)}
                                            className="border border-slate-300 rounded-lg p-1.5 text-xs font-semibold bg-white outline-none focus:ring-1 focus:ring-amber-500"
                                        >
                                            <option value="Pending">Pending</option>
                                            <option value="Delivered">Delivered</option>
                                            <option value="Cancelled">Cancelled</option>
                                        </select>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}