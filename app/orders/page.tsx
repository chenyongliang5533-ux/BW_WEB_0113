"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, ChevronDown, Globe, User, LogOut, Package, Plus, Trash2, CheckCircle, XCircle, Search } from 'lucide-react';
import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';

interface OrderItem {
  materialCode: string;
  quantity: number;
}

interface Order {
  orderId: number;
  materialCode: string;
  quantity: number;
  discountCode: string | null;
  discountPercentage: number;
  orderStatus: string;
  createdAt: string;
  trackingNumber: string | null;
  adminComments: string | null;
}

const OrdersPage = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [productDropdown, setProductDropdown] = useState(false);
  const [supportDropdown, setSupportDropdown] = useState(false);
  const [profileDropdown, setProfileDropdown] = useState(false);
  const [language, setLanguage] = useState('EN');
  const [activeTab, setActiveTab] = useState<'new' | 'history'>('new');
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState('');
  
  // New Order Form
  const [orderItems, setOrderItems] = useState<OrderItem[]>([{ materialCode: '', quantity: 1 }]);
  const [discountCode, setDiscountCode] = useState('');
  const [discountVerification, setDiscountVerification] = useState<'none' | 'success' | 'failed'>('none');
  const [discountPercentage, setDiscountPercentage] = useState(0);
  const [specialRemarks, setSpecialRemarks] = useState('');
  const [companyFullName, setCompanyFullName] = useState('');
  const [shippingAddress, setShippingAddress] = useState('');
  const [contactInfo, setContactInfo] = useState('');
  
  // Materials list
  const [materials, setMaterials] = useState<any[]>([]);
  
  // Order History
  const [orders, setOrders] = useState<Order[]>([]);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login');
    } else if (status === 'authenticated') {
      fetchMaterials();
      fetchOrders();
    }
  }, [status, router]);

  const fetchMaterials = async () => {
    try {
      const response = await fetch('/api/materials');
      if (response.ok) {
        const data = await response.json();
        setMaterials(data);
      }
    } catch (error) {
      console.error('Error fetching materials:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchOrders = async () => {
    try {
      const response = await fetch('/api/orders');
      if (response.ok) {
        const data = await response.json();
        setOrders(data);
      }
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  const verifyDiscountCode = async () => {
    if (!discountCode.trim()) {
      setDiscountVerification('none');
      return;
    }

    try {
      const response = await fetch(`/api/discount/verify?code=${discountCode}`);
      const data = await response.json();
      
      if (data.valid) {
        setDiscountVerification('success');
        setDiscountPercentage(data.percentage);
      } else {
        setDiscountVerification('failed');
        setDiscountPercentage(0);
      }
    } catch (error) {
      setDiscountVerification('failed');
      setDiscountPercentage(0);
    }
  };

  const addOrderItem = () => {
    setOrderItems([...orderItems, { materialCode: '', quantity: 1 }]);
  };

  const removeOrderItem = (index: number) => {
    if (orderItems.length > 1) {
      setOrderItems(orderItems.filter((_, i) => i !== index));
    }
  };

  const updateOrderItem = (index: number, field: 'materialCode' | 'quantity', value: string | number) => {
    const updated = [...orderItems];
    updated[index] = { ...updated[index], [field]: value };
    setOrderItems(updated);
  };

  const handleSubmitOrder = async () => {
    setSubmitting(true);
    setMessage('');

    try {
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          orderItems,
          discountCode: discountCode || null,
          discountPercentage,
          specialRemarks,
          companyFullName,
          shippingAddress,
          contactInfo,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage('Order submitted successfully!');
        // Reset form
        setOrderItems([{ materialCode: '', quantity: 1 }]);
        setDiscountCode('');
        setDiscountVerification('none');
        setDiscountPercentage(0);
        setSpecialRemarks('');
        setCompanyFullName('');
        setShippingAddress('');
        setContactInfo('');
        // Refresh orders
        fetchOrders();
        setTimeout(() => {
          setActiveTab('history');
          setMessage('');
        }, 2000);
      } else {
        setMessage(data.error || 'Failed to submit order');
      }
    } catch (error) {
      setMessage('An error occurred');
    } finally {
      setSubmitting(false);
    }
  };

  if (status === 'loading' || loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-gray-600">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation - Same as Profile Page */}
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-blue-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">BW</span>
              </div>
              <span className="text-xl font-semibold text-gray-900">BITSWAVING</span>
            </Link>

            <div className="hidden md:flex items-center space-x-8">
              <Link href="/" className="font-semibold text-gray-700 hover:text-blue-600 transition">Home</Link>
              
              <div 
                className="relative"
                onMouseEnter={() => setProductDropdown(true)}
                onMouseLeave={() => setProductDropdown(false)}
              >
                <button className="flex items-center space-x-1 font-semibold text-gray-700 hover:text-blue-600 transition">
                  <span>Product</span>
                  <ChevronDown className="w-4 h-4" />
                </button>
                {productDropdown && (
                  <div className="absolute top-full left-0 pt-2 w-48">
                    <div className="bg-white border border-gray-200 rounded-lg shadow-lg">
                      <Link href="/product/bwr-352" className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-t-lg">BWR-352</Link>
                      <Link href="/product/bw-cloud" className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600">BW Cloud</Link>
                      <a href="#" className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-b-lg">Accessories</a>
                    </div>
                  </div>
                )}
              </div>

              <div 
                className="relative"
                onMouseEnter={() => setSupportDropdown(true)}
                onMouseLeave={() => setSupportDropdown(false)}
              >
                <button className="flex items-center space-x-1 font-semibold text-gray-700 hover:text-blue-600 transition">
                  <span>Support</span>
                  <ChevronDown className="w-4 h-4" />
                </button>
                {supportDropdown && (
                  <div className="absolute top-full left-0 pt-2 w-48">
                    <div className="bg-white border border-gray-200 rounded-lg shadow-lg">
                      <a href="#" className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-t-lg">Datasheet</a>
                      <a href="#" className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600">User Manual</a>
                      <a href="#" className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600">Firmware</a>
                      <a href="#" className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600">Catalog</a>
                      <a href="#" className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-b-lg">Certificates</a>
                    </div>
                  </div>
                )}
              </div>

              <a href="#" className="font-semibold text-gray-700 hover:text-blue-600 transition">Use Cases</a>
              <a href="#" className="font-semibold text-gray-700 hover:text-blue-600 transition">About Us</a>
            </div>

            <div className="hidden md:flex items-center space-x-4">
              <button 
                onClick={() => setLanguage(language === 'EN' ? 'ES' : 'EN')}
                className="flex items-center space-x-1 font-semibold text-gray-700 hover:text-blue-600 transition"
              >
                <Globe className="w-4 h-4" />
                <span>{language}|{language === 'EN' ? 'ES' : 'EN'}</span>
              </button>
              
              <div 
                className="relative"
                onMouseEnter={() => setProfileDropdown(true)}
                onMouseLeave={() => setProfileDropdown(false)}
              >
                <button className="flex items-center space-x-2">
                  {session?.user?.image ? (
                    <img 
                      src={session.user.image} 
                      alt="Profile"
                      className="w-10 h-10 rounded-full border-2 border-gray-200 hover:border-blue-500 transition"
                    />
                  ) : (
                    <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center border-2 border-gray-200 hover:border-blue-500 transition">
                      <User className="w-5 h-5 text-gray-600" />
                    </div>
                  )}
                </button>
                
                {profileDropdown && (
                  <div className="absolute top-full right-0 pt-2 w-48">
                    <div className="bg-white border border-gray-200 rounded-lg shadow-lg">
                      <Link 
                        href="/profile" 
                        className="flex items-center space-x-2 px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-t-lg"
                      >
                        <User className="w-4 h-4" />
                        <span>My Profile</span>
                      </Link>
                      <Link 
                        href="/orders" 
                        className="flex items-center space-x-2 px-4 py-3 text-blue-600 bg-blue-50 font-medium"
                      >
                        <Package className="w-4 h-4" />
                        <span>My Orders</span>
                      </Link>
                      <button 
                        onClick={() => signOut({ callbackUrl: '/' })}
                        className="w-full flex items-center space-x-2 px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-b-lg"
                      >
                        <LogOut className="w-4 h-4" />
                        <span>Logout</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <button 
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Orders Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">My Orders</h1>

        {/* Tabs */}
        <div className="flex space-x-4 mb-8 border-b border-gray-200">
          <button
            onClick={() => setActiveTab('new')}
            className={`pb-4 px-2 font-semibold transition ${
              activeTab === 'new'
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Submit New Order
          </button>
          <button
            onClick={() => setActiveTab('history')}
            className={`pb-4 px-2 font-semibold transition ${
              activeTab === 'history'
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Order History
          </button>
        </div>

        {message && (
          <div className={`mb-6 p-4 rounded-xl ${
            message.includes('success') 
              ? 'bg-green-50 border border-green-200 text-green-700' 
              : 'bg-red-50 border border-red-200 text-red-700'
          }`}>
            {message}
          </div>
        )}

        {/* New Order Tab */}
        {activeTab === 'new' && (
          <div className="bg-white border border-gray-200 rounded-3xl p-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Order Items</h2>
            
            {/* Order Items */}
            <div className="space-y-4 mb-6">
              {orderItems.map((item, index) => (
                <div key={index} className="flex gap-4">
                  <div className="flex-1">
                    <select
                      value={item.materialCode}
                      onChange={(e) => updateOrderItem(index, 'materialCode', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">Select Material</option>
                      {materials.map((mat) => (
                        <option key={mat.materialCode} value={mat.materialCode}>
                          {mat.materialCode} - {mat.materialName}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="w-32">
                    <input
                      type="number"
                      min="1"
                      value={item.quantity}
                      onChange={(e) => updateOrderItem(index, 'quantity', parseInt(e.target.value) || 1)}
                      placeholder="Qty"
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  {orderItems.length > 1 && (
                    <button
                      onClick={() => removeOrderItem(index)}
                      className="px-4 py-3 text-red-600 hover:bg-red-50 rounded-xl transition"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  )}
                </div>
              ))}
            </div>

            <button
              onClick={addOrderItem}
              className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 font-medium mb-6"
            >
              <Plus className="w-5 h-5" />
              <span>Add Another Item</span>
            </button>

            {/* Discount Code */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Discount Code (Optional)
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={discountCode}
                  onChange={(e) => {
                    setDiscountCode(e.target.value.toUpperCase());
                    setDiscountVerification('none');
                  }}
                  onBlur={verifyDiscountCode}
                  placeholder="Enter discount code"
                  className="flex-1 px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {discountVerification === 'success' && (
                  <div className="flex items-center space-x-2 px-4 py-3 bg-green-50 text-green-700 rounded-xl border border-green-200">
                    <CheckCircle className="w-5 h-5" />
                    <span className="text-sm font-medium">Code verified ({discountPercentage}% off)</span>
                  </div>
                )}
                {discountVerification === 'failed' && (
                  <div className="flex items-center space-x-2 px-4 py-3 bg-red-50 text-red-700 rounded-xl border border-red-200">
                    <XCircle className="w-5 h-5" />
                    <span className="text-sm font-medium">Invalid code</span>
                  </div>
                )}
              </div>
            </div>

            {/* Special Remarks */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Special Remarks
              </label>
              <textarea
                value={specialRemarks}
                onChange={(e) => setSpecialRemarks(e.target.value)}
                placeholder="Any special requirements or notes"
                rows={3}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Company Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Company Full Name
                </label>
                <input
                  type="text"
                  value={companyFullName}
                  onChange={(e) => setCompanyFullName(e.target.value)}
                  placeholder="Company name"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Contact Information
                </label>
                <input
                  type="text"
                  value={contactInfo}
                  onChange={(e) => setContactInfo(e.target.value)}
                  placeholder="Phone / Email"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* Shipping Address */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Shipping Address
              </label>
              <textarea
                value={shippingAddress}
                onChange={(e) => setShippingAddress(e.target.value)}
                placeholder="Full shipping address"
                rows={2}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Submit Button */}
            <button
              onClick={handleSubmitOrder}
              disabled={submitting || orderItems.some(item => !item.materialCode)}
              className="w-full px-6 py-3 bg-black text-white rounded-xl hover:bg-gray-800 transition font-medium disabled:opacity-50"
            >
              {submitting ? 'Submitting...' : 'Submit Order'}
            </button>
          </div>
        )}

        {/* Order History Tab */}
        {activeTab === 'history' && (
          <div>
            {orders.length === 0 ? (
              <div className="bg-white border border-gray-200 rounded-3xl p-12 text-center">
                <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-600">No orders yet</p>
              </div>
            ) : (
              <div className="bg-white border border-gray-200 rounded-3xl overflow-hidden">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Order ID</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Material</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Qty</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Discount</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Status</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Date</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {orders.map((order) => (
                      <tr key={order.orderId} className="hover:bg-gray-50">
                        <td className="px-6 py-4 text-sm text-gray-900">#{order.orderId}</td>
                        <td className="px-6 py-4 text-sm text-gray-900">{order.materialCode}</td>
                        <td className="px-6 py-4 text-sm text-gray-900">{order.quantity}</td>
                        <td className="px-6 py-4 text-sm text-gray-900">
                          {order.discountPercentage > 0 ? `${order.discountPercentage}%` : '-'}
                        </td>
                        <td className="px-6 py-4">
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                            order.orderStatus === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                            order.orderStatus === 'Processing' ? 'bg-blue-100 text-blue-800' :
                            order.orderStatus === 'Shipped' ? 'bg-green-100 text-green-800' :
                            'bg-gray-100 text-gray-800'
                          }`}>
                            {order.orderStatus}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-600">
                          {new Date(order.createdAt).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4">
                          <button
                            onClick={() => setSelectedOrder(order)}
                            className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                          >
                            View Details
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {/* Order Detail Modal */}
            {selectedOrder && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-8">
                  <div className="flex justify-between items-start mb-6">
                    <h3 className="text-2xl font-bold text-gray-900">Order #{selectedOrder.orderId}</h3>
                    <button
                      onClick={() => setSelectedOrder(null)}
                      className="text-gray-400 hover:text-gray-600"
                    >
                      <X className="w-6 h-6" />
                    </button>
                  </div>

                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-gray-500">Material Code</p>
                        <p className="font-medium text-gray-900">{selectedOrder.materialCode}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Quantity</p>
                        <p className="font-medium text-gray-900">{selectedOrder.quantity}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Status</p>
                        <p className="font-medium text-gray-900">{selectedOrder.orderStatus}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Order Date</p>
                        <p className="font-medium text-gray-900">
                          {new Date(selectedOrder.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                      {selectedOrder.discountCode && (
                        <>
                          <div>
                            <p className="text-sm text-gray-500">Discount Code</p>
                            <p className="font-medium text-gray-900">{selectedOrder.discountCode}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">Discount</p>
                            <p className="font-medium text-gray-900">{selectedOrder.discountPercentage}%</p>
                          </div>
                        </>
                      )}
                      {selectedOrder.trackingNumber && (
                        <div className="col-span-2">
                          <p className="text-sm text-gray-500">Tracking Number</p>
                          <p className="font-medium text-gray-900">{selectedOrder.trackingNumber}</p>
                        </div>
                      )}
                    </div>

                    {selectedOrder.adminComments && (
                      <div className="bg-blue-50 rounded-xl p-4 border border-blue-200">
                        <p className="text-sm font-medium text-blue-900 mb-2">Admin Comments</p>
                        <p className="text-sm text-blue-700 whitespace-pre-wrap">{selectedOrder.adminComments}</p>
                      </div>
                    )}
                  </div>

                  <button
                    onClick={() => setSelectedOrder(null)}
                    className="mt-6 w-full px-6 py-3 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition font-medium"
                  >
                    Close
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="px-4 sm:px-6 lg:px-8 pb-8 mt-16">
        <footer className="max-w-7xl mx-auto bg-gray-100 rounded-3xl py-8 text-center">
          <p className="text-gray-600">© 2026 Bitswaving. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
};

export default OrdersPage;