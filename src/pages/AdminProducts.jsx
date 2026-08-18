import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import API from '../api'; // Use central API instance
import { Edit2, Save, X, Package, Plus, Trash2, Eye } from 'lucide-react';

export default function AdminProducts() {
    const [products, setProducts] = useState([]);
    const [editingId, setEditingId] = useState(null);
    const [showAddModal, setShowAddModal] = useState(false);

    // Edit form state
    const [editFormData, setEditFormData] = useState({
        title: '',
        category: '',
        price_per_kg: 0,
        cost_price_per_kg: 0,
        stock_kg: 0
    });

    // Add new product state
    const [newProduct, setNewProduct] = useState({
        title: '',
        category: 'Nuts',
        price_per_kg: '',
        cost_price_per_kg: '',
        stock_kg: '',
        image_url: '',
        description: ''
    });

    const fetchProducts = () => {
        API.get('/api/products')
            .then(res => setProducts(res.data))
            .catch(err => console.error('Error loading products:', err));
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    // Handle Edit Click
    const handleEditClick = (product) => {
        setEditingId(product.id);
        setEditFormData({
            title: product.title,
            category: product.category,
            price_per_kg: product.price_per_kg,
            cost_price_per_kg: product.cost_price_per_kg || 0,
            stock_kg: product.stock_kg
        });
    };

    // Save Edited Product
    const handleSave = (id) => {
        API.put(`/api/admin/products/${id}`, editFormData)
            .then(() => {
                setEditingId(null);
                fetchProducts();
            })
            .catch(err => console.error('Error saving product:', err));
    };

    // Delete Product
    const handleDelete = (id) => {
        if (window.confirm('Are you sure you want to delete this product?')) {
            API.delete(`/api/admin/products/${id}`)
                .then(() => fetchProducts())
                .catch(err => console.error('Error deleting product:', err));
        }
    };

    // Add New Product
    const handleAddProductSubmit = (e) => {
        e.preventDefault();
        API.post('/api/admin/products', newProduct)
            .then(() => {
                setShowAddModal(false);
                setNewProduct({
                    title: '',
                    category: 'Nuts',
                    price_per_kg: '',
                    cost_price_per_kg: '',
                    stock_kg: '',
                    image_url: '',
                    description: ''
                });
                fetchProducts();
            })
            .catch(err => console.error('Error adding product:', err));
    };

    return (
        <div className="max-w-7xl mx-auto px-3 sm:px-6 py-4 sm:py-8 space-y-4 sm:space-y-6">
            
            {/* Top Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                <h2 className="text-xl sm:text-2xl font-bold text-slate-800 flex items-center gap-2">
                    <Package className="w-5 h-5 sm:w-6 sm:h-6 text-amber-900 shrink-0" />
                    <span>Manage Products & Cost Prices</span>
                </h2>

                {/* Add New Product Button */}
                <button
                    onClick={() => setShowAddModal(true)}
                    className="w-full sm:w-auto flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-4 py-2.5 rounded-xl text-xs sm:text-sm transition shadow-md active:scale-95"
                >
                    <Plus className="w-4 h-4" /> Add New Product
                </button>
            </div>

            {/* Products Table Wrapper for Horizontal Scroll on Mobile */}
            <div className="bg-white rounded-2xl shadow border border-amber-100 overflow-x-auto">
                <table className="w-full text-left border-collapse text-xs sm:text-sm min-w-[650px]">
                    <thead>
                        <tr className="bg-slate-800 text-white">
                            <th className="p-3 sm:p-4 whitespace-nowrap">Product Name</th>
                            <th className="p-3 sm:p-4 whitespace-nowrap">Category</th>
                            <th className="p-3 sm:p-4 text-emerald-400 whitespace-nowrap">Selling Price (PKR/kg)</th>
                            <th className="p-3 sm:p-4 text-amber-300 whitespace-nowrap">Cost Price (Buying PKR/kg)</th>
                            <th className="p-3 sm:p-4 whitespace-nowrap">Stock (kg)</th>
                            <th className="p-3 sm:p-4 whitespace-nowrap">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {products.map(p => (
                            <tr key={p.id} className="hover:bg-amber-50/40 transition">
                                {editingId === p.id ? (
                                    /* EDIT MODE ROW */
                                    <>
                                        <td className="p-2.5 sm:p-3 min-w-[140px]">
                                            <input
                                                type="text"
                                                value={editFormData.title}
                                                onChange={e => setEditFormData({ ...editFormData, title: e.target.value })}
                                                className="border p-1.5 rounded w-full text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-amber-500"
                                            />
                                        </td>
                                        <td className="p-2.5 sm:p-3 min-w-[110px]">
                                            <input
                                                type="text"
                                                value={editFormData.category}
                                                onChange={e => setEditFormData({ ...editFormData, category: e.target.value })}
                                                className="border p-1.5 rounded w-full text-xs focus:outline-none focus:ring-1 focus:ring-amber-500"
                                            />
                                        </td>
                                        <td className="p-2.5 sm:p-3 min-w-[100px]">
                                            <input
                                                type="number"
                                                value={editFormData.price_per_kg}
                                                onChange={e => setEditFormData({ ...editFormData, price_per_kg: Number(e.target.value) })}
                                                className="border p-1.5 rounded w-full text-xs font-bold text-emerald-700 focus:outline-none focus:ring-1 focus:ring-amber-500"
                                            />
                                        </td>
                                        <td className="p-2.5 sm:p-3 min-w-[100px]">
                                            <input
                                                type="number"
                                                value={editFormData.cost_price_per_kg}
                                                onChange={e => setEditFormData({ ...editFormData, cost_price_per_kg: Number(e.target.value) })}
                                                className="border p-1.5 rounded w-full text-xs font-bold text-amber-800 bg-amber-50 focus:outline-none focus:ring-1 focus:ring-amber-500"
                                            />
                                        </td>
                                        <td className="p-2.5 sm:p-3 min-w-[80px]">
                                            <input
                                                type="number"
                                                value={editFormData.stock_kg}
                                                onChange={e => setEditFormData({ ...editFormData, stock_kg: Number(e.target.value) })}
                                                className="border p-1.5 rounded w-full text-xs focus:outline-none focus:ring-1 focus:ring-amber-500"
                                            />
                                        </td>
                                        <td className="p-2.5 sm:p-3 whitespace-nowrap">
                                            <div className="flex items-center gap-1.5">
                                                <button
                                                    onClick={() => handleSave(p.id)}
                                                    className="bg-emerald-600 text-white p-2 rounded-lg hover:bg-emerald-700 transition"
                                                    title="Save Changes"
                                                >
                                                    <Save className="w-4 h-4" />
                                                </button>
                                                <button
                                                    onClick={() => setEditingId(null)}
                                                    className="bg-slate-300 text-slate-700 p-2 rounded-lg hover:bg-slate-400 transition"
                                                    title="Cancel"
                                                >
                                                    <X className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </td>
                                    </>
                                ) : (
                                    /* VIEW MODE ROW */
                                    <>
                                        <td className="p-3 sm:p-4 font-bold text-slate-800">{p.title}</td>
                                        <td className="p-3 sm:p-4 text-slate-500">{p.category}</td>
                                        <td className="p-3 sm:p-4 font-bold text-emerald-700">
                                            PKR {Number(p.price_per_kg).toLocaleString()}
                                        </td>
                                        <td className="p-3 sm:p-4 font-bold text-amber-900 bg-amber-50/50">
                                            PKR {Number(p.cost_price_per_kg || 0).toLocaleString()}
                                        </td>
                                        <td className="p-3 sm:p-4 font-semibold">{p.stock_kg} kg</td>
                                        <td className="p-3 sm:p-4 whitespace-nowrap">
                                            <div className="flex items-center gap-1.5 sm:gap-2">
                                                {/* View Button */}
                                                <Link
                                                    to={`/products/${p.id}`}
                                                    className="flex items-center gap-1 bg-sky-600 text-white px-2 sm:px-2.5 py-1.5 rounded-lg text-xs font-semibold hover:bg-sky-700 transition"
                                                    title="View Single Product Page"
                                                >
                                                    <Eye className="w-3.5 h-3.5" />
                                                    <span className="hidden sm:inline">View</span>
                                                </Link>

                                                {/* Edit Button */}
                                                <button
                                                    onClick={() => handleEditClick(p)}
                                                    className="flex items-center gap-1 bg-amber-900 text-white px-2.5 sm:px-3 py-1.5 rounded-lg text-xs font-semibold hover:bg-amber-800 transition"
                                                    title="Edit Product"
                                                >
                                                    <Edit2 className="w-3.5 h-3.5" />
                                                    <span className="hidden sm:inline">Edit</span>
                                                </button>

                                                {/* Delete Button */}
                                                <button
                                                    onClick={() => handleDelete(p.id)}
                                                    className="flex items-center gap-1 bg-rose-600 text-white p-1.5 sm:px-2.5 sm:py-1.5 rounded-lg text-xs font-semibold hover:bg-rose-700 transition"
                                                    title="Delete Product"
                                                >
                                                    <Trash2 className="w-3.5 h-3.5" />
                                                </button>
                                            </div>
                                        </td>
                                    </>
                                )}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* ADD PRODUCT MODAL */}
            {showAddModal && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 z-50">
                    <div className="bg-white rounded-2xl max-w-md w-full p-4 sm:p-6 space-y-4 border border-amber-200 shadow-2xl relative max-h-[90vh] overflow-y-auto">
                        <div className="flex justify-between items-center border-b pb-3 sticky top-0 bg-white z-10">
                            <h3 className="text-base sm:text-lg font-bold text-slate-800">Add New Dry Fruit Product</h3>
                            <button onClick={() => setShowAddModal(false)} className="text-slate-400 hover:text-slate-600 p-1">
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        <form onSubmit={handleAddProductSubmit} className="space-y-3">
                            <div>
                                <label className="text-xs font-bold text-slate-600">Product Title</label>
                                <input
                                    type="text"
                                    required
                                    value={newProduct.title}
                                    onChange={e => setNewProduct({ ...newProduct, title: e.target.value })}
                                    className="w-full border p-2 rounded-lg text-xs font-semibold mt-1 outline-none focus:ring-1 focus:ring-amber-500"
                                    placeholder="e.g. Quetta Zafrani Badam"
                                />
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                <div>
                                    <label className="text-xs font-bold text-slate-600">Category</label>
                                    <select
                                        value={newProduct.category}
                                        onChange={e => setNewProduct({ ...newProduct, category: e.target.value })}
                                        className="w-full border p-2 rounded-lg text-xs mt-1 outline-none focus:ring-1 focus:ring-amber-500"
                                    >
                                        <option value="Nuts">Nuts</option>
                                        <option value="Dried Fruits">Dried Fruits</option>
                                        <option value="Gift Boxes">Gift Boxes</option>
                                        <option value="Mixes">Mixes</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="text-xs font-bold text-slate-600">Stock (kg)</label>
                                    <input
                                        type="number"
                                        required
                                        value={newProduct.stock_kg}
                                        onChange={e => setNewProduct({ ...newProduct, stock_kg: e.target.value })}
                                        className="w-full border p-2 rounded-lg text-xs mt-1 outline-none focus:ring-1 focus:ring-amber-500"
                                        placeholder="e.g. 50"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                <div>
                                    <label className="text-xs font-bold text-emerald-700">Selling Price (PKR/kg)</label>
                                    <input
                                        type="number"
                                        required
                                        value={newProduct.price_per_kg}
                                        onChange={e => setNewProduct({ ...newProduct, price_per_kg: e.target.value })}
                                        className="w-full border p-2 rounded-lg text-xs mt-1 outline-none focus:ring-1 focus:ring-amber-500"
                                        placeholder="e.g. 3500"
                                    />
                                </div>

                                <div>
                                    <label className="text-xs font-bold text-amber-800">Cost Price (Buying PKR/kg)</label>
                                    <input
                                        type="number"
                                        required
                                        value={newProduct.cost_price_per_kg}
                                        onChange={e => setNewProduct({ ...newProduct, cost_price_per_kg: e.target.value })}
                                        className="w-full border p-2 rounded-lg text-xs mt-1 outline-none focus:ring-1 focus:ring-amber-500"
                                        placeholder="e.g. 2800"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="text-xs font-bold text-slate-600">Image URL</label>
                                <input
                                    type="text"
                                    value={newProduct.image_url}
                                    onChange={e => setNewProduct({ ...newProduct, image_url: e.target.value })}
                                    className="w-full border p-2 rounded-lg text-xs mt-1 outline-none focus:ring-1 focus:ring-amber-500"
                                    placeholder="https://..."
                                />
                            </div>

                            <div>
                                <label className="text-xs font-bold text-slate-600">Description</label>
                                <textarea
                                    rows="2"
                                    value={newProduct.description}
                                    onChange={e => setNewProduct({ ...newProduct, description: e.target.value })}
                                    className="w-full border p-2 rounded-lg text-xs mt-1 outline-none resize-none focus:ring-1 focus:ring-amber-500"
                                    placeholder="Enter product details (optional)..."
                                ></textarea>
                            </div>

                            <div className="pt-2 flex justify-end gap-2">
                                <button
                                    type="button"
                                    onClick={() => setShowAddModal(false)}
                                    className="px-4 py-2 bg-slate-100 text-slate-700 rounded-xl text-xs font-semibold hover:bg-slate-200 transition"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-emerald-600 text-white rounded-xl text-xs font-bold hover:bg-emerald-700 transition shadow-md"
                                >
                                    Save Product
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}