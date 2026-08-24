import React, { useState, useEffect } from 'react';
import API from '../api'; // Use central API instance
import { Link } from 'react-router-dom';
import { ArrowLeft, ShoppingBag } from 'lucide-react';

// Admin Orders Page: Displays all customer orders for admin management
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

    // Render the orders table with status update functionality
    return (
        <div className="max-w-7xl mx-auto px-3 sm:px-6 py-4 sm:py-8 space-y-4 sm:space-y-6">
            
            {/* Top Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <Link to="/admin" className="text-amber-900 font-bold flex items-center gap-1 hover:underline text-xs sm:text-sm">
                    <ArrowLeft className="w-4 h-4" /> Back to Overview
                </Link>
                <h2 className="text-lg sm:text-2xl font-bold text-slate-800 flex items-center gap-2">
                    <ShoppingBag className="w-5 h-5 sm:w-6 sm:h-6 text-amber-900 shrink-0" />
                    <span>Customer Orders Register</span>
                </h2>
            </div>

            {/* Orders Table Container with Horizontal Scroll for Mobile */}
            <div className="bg-white rounded-2xl shadow border border-amber-100 overflow-x-auto">
                <table className="w-full text-left border-collapse text-xs sm:text-sm min-w-[800px]">
                    <thead>
                        <tr className="bg-slate-800 text-white">
                            <th className="p-3 sm:p-4 whitespace-nowrap">Order ID</th>
                            <th className="p-3 sm:p-4 whitespace-nowrap">Customer Name</th>
                            <th className="p-3 sm:p-4 whitespace-nowrap">Phone Number</th>
                            <th className="p-3 sm:p-4 whitespace-nowrap">Delivery Address</th>
                            <th className="p-3 sm:p-4 text-amber-300 whitespace-nowrap">Products Ordered</th> 
                            <th className="p-3 sm:p-4 text-emerald-400 whitespace-nowrap">Total Bill</th>
                            <th className="p-3 sm:p-4 whitespace-nowrap">Order Date</th>
                            <th className="p-3 sm:p-4 whitespace-nowrap">Status</th>
                            <th className="p-3 sm:p-4 whitespace-nowrap">Action</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {orders.length === 0 ? (
                            <tr>
                                <td colSpan="9" className="p-6 sm:p-8 text-center text-slate-500 font-medium">
                                    No orders found.
                                </td>
                            </tr>
                        ) : (
                            orders.map((order) => (
                                <tr key={order.id} className="hover:bg-amber-50/40 transition">
                                    <td className="p-3 sm:p-4 font-bold text-amber-900 whitespace-nowrap">#{order.id}</td>
                                    <td className="p-3 sm:p-4 font-semibold text-slate-800 whitespace-nowrap">{order.customer_name}</td>
                                    <td className="p-3 sm:p-4 text-slate-600 whitespace-nowrap">{order.customer_phone}</td>
                                    <td className="p-3 sm:p-4 text-slate-600 min-w-[180px] max-w-[250px] truncate" title={order.delivery_address}>
                                        {order.delivery_address}
                                    </td>

                                    <td className="p-3 sm:p-4 font-medium text-slate-700 min-w-[180px]">
                                        <div className="bg-amber-50/80 px-2.5 py-1.5 rounded-lg border border-amber-200 text-xs inline-block max-w-xs break-words">
                                            {order.items_summary || 'No items specified'}
                                        </div>
                                    </td>

                                    <td className="p-3 sm:p-4 font-bold text-emerald-700 whitespace-nowrap">
                                        PKR {Number(order.total_amount).toLocaleString()}
                                    </td>
                                    <td className="p-3 sm:p-4 text-slate-500 text-xs whitespace-nowrap">
                                        {new Date(order.created_at).toLocaleString()}
                                    </td>
                                    <td className="p-3 sm:p-4 whitespace-nowrap">
                                        <span className={`px-2.5 py-1 rounded-full text-xs font-bold inline-block ${
                                            order.status === 'Delivered'
                                                ? 'bg-emerald-100 text-emerald-800'
                                                : order.status === 'Cancelled'
                                                ? 'bg-rose-100 text-rose-800'
                                                : 'bg-amber-100 text-amber-800'
                                        }`}>
                                            {order.status}
                                        </span>
                                    </td>
                                    <td className="p-3 sm:p-4 whitespace-nowrap">
                                        <select
                                            value={order.status}
                                            onChange={(e) => handleStatusChange(order.id, e.target.value)}
                                            className="border border-slate-300 rounded-lg p-1.5 text-xs font-semibold bg-white outline-none focus:ring-1 focus:ring-amber-500 cursor-pointer"
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