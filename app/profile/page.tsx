"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, ChevronDown, Globe, User, LogOut, Package, Save } from 'lucide-react';
import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';

const ProfilePage = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [productDropdown, setProductDropdown] = useState(false);
  const [supportDropdown, setSupportDropdown] = useState(false);
  const [profileDropdown, setProfileDropdown] = useState(false);
  const [language, setLanguage] = useState('EN');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');
  
  const [profile, setProfile] = useState({
    userId: '',
    email: '',
    companyName: '',
    username: '',
    address: '',
    zipCode: '',
    mobileNumber: ''
  });

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login');
    } else if (status === 'authenticated') {
      fetchProfile();
    }
  }, [status, router]);

  const fetchProfile = async () => {
    try {
      const response = await fetch('/api/profile');
      if (response.ok) {
        const data = await response.json();
        setProfile(data);
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    setMessage('');
    
    try {
      const response = await fetch('/api/profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(profile),
      });

      if (response.ok) {
        setMessage('Profile updated successfully!');
        setTimeout(() => setMessage(''), 3000);
      } else {
        setMessage('Failed to update profile');
      }
    } catch (error) {
      setMessage('An error occurred');
    } finally {
      setSaving(false);
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
      {/* Navigation */}
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
                        className="flex items-center space-x-2 px-4 py-3 text-blue-600 bg-blue-50 rounded-t-lg font-medium"
                      >
                        <User className="w-4 h-4" />
                        <span>My Profile</span>
                      </Link>
                      <Link 
                        href="/orders" 
                        className="flex items-center space-x-2 px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600"
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

        {mobileMenuOpen && (
          <div className="md:hidden border-t border-gray-200 bg-white">
            <div className="px-4 py-3 space-y-3">
              <Link href="/" className="block text-gray-700">Home</Link>
              <a href="#" className="block text-gray-700">Product</a>
              <a href="#" className="block text-gray-700">Support</a>
              <a href="#" className="block text-gray-700">Use Cases</a>
              <a href="#" className="block text-gray-700">About Us</a>
            </div>
          </div>
        )}
      </nav>

      {/* Profile Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">My Profile</h1>

        {message && (
          <div className={`mb-6 p-4 rounded-xl ${
            message.includes('success') 
              ? 'bg-green-50 border border-green-200 text-green-700' 
              : 'bg-red-50 border border-red-200 text-red-700'
          }`}>
            {message}
          </div>
        )}

        <div className="bg-white border border-gray-200 rounded-3xl p-8">
          <div className="space-y-6">
            {/* User ID (Read-only) */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                User ID <span className="text-gray-500 text-xs">(Auto-generated, cannot be edited)</span>
              </label>
              <input
                type="text"
                value={profile.userId}
                disabled
                className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-xl text-gray-500 cursor-not-allowed"
              />
            </div>

            {/* Email (Read-only) */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <input
                type="email"
                value={profile.email}
                disabled
                className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-xl text-gray-500 cursor-not-allowed"
              />
            </div>

            {/* Company Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Company Name
              </label>
              <input
                type="text"
                value={profile.companyName}
                onChange={(e) => setProfile({ ...profile, companyName: e.target.value })}
                placeholder="Enter your company name"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Username */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Username
              </label>
              <input
                type="text"
                value={profile.username}
                onChange={(e) => setProfile({ ...profile, username: e.target.value })}
                placeholder="Enter your username"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Address */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Address
              </label>
              <textarea
                value={profile.address}
                onChange={(e) => setProfile({ ...profile, address: e.target.value })}
                placeholder="Enter your address"
                rows={3}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Zip Code */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Zip Code
              </label>
              <input
                type="text"
                value={profile.zipCode}
                onChange={(e) => setProfile({ ...profile, zipCode: e.target.value })}
                placeholder="Enter your zip code"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Mobile Number */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Mobile Number
              </label>
              <input
                type="tel"
                value={profile.mobileNumber}
                onChange={(e) => setProfile({ ...profile, mobileNumber: e.target.value })}
                placeholder="Enter your mobile number"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Save Button */}
            <div className="pt-4">
              <button
                onClick={handleSave}
                disabled={saving}
                className="w-full flex items-center justify-center space-x-2 px-6 py-3 bg-black text-white rounded-xl hover:bg-gray-800 transition font-medium disabled:opacity-50"
              >
                <Save className="w-5 h-5" />
                <span>{saving ? 'Saving...' : 'Save Changes'}</span>
              </button>
            </div>
          </div>
        </div>
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

export default ProfilePage;