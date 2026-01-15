"use client";

import React, { useState, useEffect } from 'react';
import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Shield, Users, Package, LogOut, Search, Edit, X, Save } from 'lucide-react';

interface User {
  userId: number;
  email: string;
  username: string;
  companyName: string;
  createdAt: string;
}

interface Order {
  orderId: number;
  userId: number;
  userEmail: string;
  materialCode: string;
  quantity: number;
  discountCode: string | null;
  discountPercentage: number;
  orderStatus: string;
  trackingNumber: string | null;
  adminComments: string | null;
  specialRemarks: string | null;
  companyFullName: string | null;
  shippingAddress: string | null;
  contactInfo: string | null;
  createdAt: string;
}

const AdminDashboard = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'orders' | 'users'>('orders');
  
  // Data
  const [users, setUsers] = useState<User[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [filteredOrders, setFilteredOrders] = useState<Order[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  
  // Edit order modal
  const [editingOrder, setEditingOrder] = useState<Order | null>(null);
  const [orderStatus, setOrderStatus] = useState('');
  const [trackingNumber, setTrackingNumber] = useState('');
  const [adminComments, setAdminComments] = useState('');
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/admin');
    } else if (status === 'authenticated') {
      verifyAdmin();
    }
  }, [status, router]);

  const verifyAdmin = async () => {
    try {
      const response = await fetch('/api/admin/verify');
      const data = await response.json();
      
      if (!data.isAdmin) {
        router.push('/admin');
        return;
      }
      
      await fetchData();
    } catch (error) {
      console.error('Verification error:', error);
      router.push('/admin');
    }
  };

  const fetchData = async () => {
    try {
      const [usersRes, ordersRes] = await Promise.all([
        fetch('/api/admin/users'),
        fetch('/api/admin/orders')
      ]);

      if (usersRes.ok && ordersRes.ok) {
        const usersData = await usersRes.json();
        const ordersData = await ordersRes.json();
        setUsers(usersData);
        setOrders(ordersData);
        setFilteredOrders(ordersData);
      }
    } catch (error) {
      console.error('Fetch error:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (searchTerm) {
      const filtered = orders.filter(order => 
        order.orderId.toString().includes(searchTerm) ||
        order.userEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.materialCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.orderStatus.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredOrders(filtered);
    } else {
      setFilteredOrders(orders);
    }
  }, [searchTerm, orders]);

  const handleEditOrder = (order: Order) => {
    setEditingOrder(order);
    setOrderStatus(order.orderStatus);
    setTrackingNumber(order.trackingNumber || '');
    setAdminComments(order.adminComments || '');
  };

  const handleSaveOrder = async () => {
    if (!editingOrder) return;
    
    setSaving(true);
    try {
      const response = await fetch('/api/admin/orders', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          orderId: editingOrder.orderId,
          orderStatus,
          trackingNumber,
          adminComments
        })
      });

      if (response.ok) {
        await fetchData();
        setEditingOrder(null);
      }
    } catch (error) {
      console.error('Save error:', error);
    } finally {
      setSaving(false);
    }
  };

  if (status === 'loading' || loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-gray-600">Loading admin panel...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-800 rounded-lg flex items-center justify-center">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-lg font-bold text-gray-900">Admin Panel</h1>
                <p className="text-xs text-gray-500">Bitswaving Management</p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">{session?.user?.email}</span>
              <button
                onClick={() => signOut({ callbackUrl: '/' })}
                className="flex items-center space-x-2 px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition"
              >
                <LogOut className="w-4 h-4" />
                <span className="text-sm font-medium">Logout</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white border border-gray-200 rounded-2xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Total Users</p>
                <p className="text-3xl font-bold text-gray-900">{users.length}</p>
              </div>
              <Users className="w-12 h-12 text-blue-500" />
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-2xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Total Orders</p>
                <p className="text-3xl font-bold text-gray-900">{orders.length}</p>
              </div>
              <Package className="w-12 h-12 text-green-500" />
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-2xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Pending Orders</p>
                <p className="text-3xl font-bold text-gray-900">
                  {orders.filter(o => o.orderStatus === 'Pending').length}
                </p>
              </div>
              <Package className="w-12 h-12 text-yellow-500" />
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex space-x-4 mb-6 border-b border-gray-200">
          <button
            onClick={() => setActiveTab('orders')}
            className={`pb-4 px-2 font-semibold transition ${
              activeTab === 'orders'
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Orders Management
          </button>
          <button
            onClick={() => setActiveTab('users')}
            className={`pb-4 px-2 font-semibold transition ${
              activeTab === 'users'
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Users
          </button>
        </div>

        {/* Orders Tab */}
        {activeTab === 'orders' && (
          <div>
            {/* Search */}
            <div className="mb-6">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search orders by ID, email, material, or status..."
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* Orders Table */}
            <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700">Order ID</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700">User Email</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700">Material</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700">Qty</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700">Status</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700">Date</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {filteredOrders.length === 0 ? (
                      <tr>
                        <td colSpan={7} className="px-4 py-8 text-center text-gray-500">
                          No orders found
                        </td>
                      </tr>
                    ) : (
                      filteredOrders.map((order) => (
                        <tr key={order.orderId} className="hover:bg-gray-50">
                          <td className="px-4 py-3 text-sm font-medium text-gray-900">
                            #{order.orderId}
                          </td>
                          <td className="px-4 py-3 text-sm text-gray-700">{order.userEmail}</td>
                          <td className="px-4 py-3 text-sm text-gray-700">{order.materialCode}</td>
                          <td className="px-4 py-3 text-sm text-gray-700">{order.quantity}</td>
                          <td className="px-4 py-3">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                              order.orderStatus === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                              order.orderStatus === 'Processing' ? 'bg-blue-100 text-blue-800' :
                              order.orderStatus === 'Shipped' ? 'bg-green-100 text-green-800' :
                              'bg-gray-100 text-gray-800'
                            }`}>
                              {order.orderStatus}
                            </span>
                          </td>
                          <td className="px-4 py-3 text-sm text-gray-600">
                            {new Date(order.createdAt).toLocaleDateString()}
                          </td>
                          <td className="px-4 py-3">
                            <button
                              onClick={() => handleEditOrder(order)}
                              className="flex items-center space-x-1 text-blue-600 hover:text-blue-700 text-sm font-medium"
                            >
                              <Edit className="w-4 h-4" />
                              <span>Edit</span>
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Users Tab */}
        {activeTab === 'users' && (
          <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700">User ID</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700">Email</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700">Username</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700">Company</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700">Registered</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {users.map((user) => (
                    <tr key={user.userId} className="hover:bg-gray-50">
                      <td className="px-4 py-3 text-sm font-medium text-gray-900">#{user.userId}</td>
                      <td className="px-4 py-3 text-sm text-gray-700">{user.email}</td>
                      <td className="px-4 py-3 text-sm text-gray-700">{user.username || '-'}</td>
                      <td className="px-4 py-3 text-sm text-gray-700">{user.companyName || '-'}</td>
                      <td className="px-4 py-3 text-sm text-gray-600">
                        {new Date(user.createdAt).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* Edit Order Modal */}
      {editingOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto p-8">
            <div className="flex justify-between items-start mb-6">
              <h3 className="text-2xl font-bold text-gray-900">Edit Order #{editingOrder.orderId}</h3>
              <button
                onClick={() => setEditingOrder(null)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Order Details */}
            <div className="bg-gray-50 rounded-2xl p-6 mb-6">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-gray-500">User Email</p>
                  <p className="font-medium text-gray-900">{editingOrder.userEmail}</p>
                </div>
                <div>
                  <p className="text-gray-500">Material Code</p>
                  <p className="font-medium text-gray-900">{editingOrder.materialCode}</p>
                </div>
                <div>
                  <p className="text-gray-500">Quantity</p>
                  <p className="font-medium text-gray-900">{editingOrder.quantity}</p>
                </div>
                <div>
                  <p className="text-gray-500">Discount</p>
                  <p className="font-medium text-gray-900">
                    {editingOrder.discountPercentage > 0 
                      ? `${editingOrder.discountPercentage}% (${editingOrder.discountCode})`
                      : 'None'
                    }
                  </p>
                </div>
                {editingOrder.companyFullName && (
                  <div className="col-span-2">
                    <p className="text-gray-500">Company</p>
                    <p className="font-medium text-gray-900">{editingOrder.companyFullName}</p>
                  </div>
                )}
                {editingOrder.shippingAddress && (
                  <div className="col-span-2">
                    <p className="text-gray-500">Shipping Address</p>
                    <p className="font-medium text-gray-900">{editingOrder.shippingAddress}</p>
                  </div>
                )}
                {editingOrder.contactInfo && (
                  <div className="col-span-2">
                    <p className="text-gray-500">Contact Info</p>
                    <p className="font-medium text-gray-900">{editingOrder.contactInfo}</p>
                  </div>
                )}
                {editingOrder.specialRemarks && (
                  <div className="col-span-2">
                    <p className="text-gray-500">Special Remarks</p>
                    <p className="font-medium text-gray-900">{editingOrder.specialRemarks}</p>
                  </div>
                )}
              </div>
            </div>

            {/* Edit Form */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Order Status
                </label>
                <select
                  value={orderStatus}
                  onChange={(e) => setOrderStatus(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="Pending">Pending</option>
                  <option value="Processing">Processing</option>
                  <option value="SMT Processing">SMT Processing</option>
                  <option value="Shipped">Shipped</option>
                  <option value="Delivered">Delivered</option>
                  <option value="Cancelled">Cancelled</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tracking Number
                </label>
                <input
                  type="text"
                  value={trackingNumber}
                  onChange={(e) => setTrackingNumber(e.target.value)}
                  placeholder="DHL7636457"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Admin Comments
                </label>
                <textarea
                  value={adminComments}
                  onChange={(e) => setAdminComments(e.target.value)}
                  placeholder="Add internal notes or updates visible to the customer..."
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  onClick={handleSaveOrder}
                  disabled={saving}
                  className="flex-1 flex items-center justify-center space-x-2 px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition font-medium disabled:opacity-50"
                >
                  <Save className="w-5 h-5" />
                  <span>{saving ? 'Saving...' : 'Save Changes'}</span>
                </button>
                <button
                  onClick={() => setEditingOrder(null)}
                  className="px-6 py-3 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition font-medium"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;