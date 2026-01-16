"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, ChevronDown, Globe, User, LogOut, Package, Download, FileText, BookOpen, Cpu, Shield } from 'lucide-react';
import { useSession, signOut } from 'next-auth/react';

interface SupportFile {
  id: string;
  filename: string;
  url: string;
  category: string;
  size: number;
  uploadedAt: string;
}

const SupportCenterPage = () => {
  const { data: session } = useSession();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [productDropdown, setProductDropdown] = useState(false);
  const [supportDropdown, setSupportDropdown] = useState(false);
  const [profileDropdown, setProfileDropdown] = useState(false);
  const [language, setLanguage] = useState('EN');
  const [loading, setLoading] = useState(true);
  const [files, setFiles] = useState<SupportFile[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = [
    { id: 'all', name: 'All Files', icon: <FileText className="w-5 h-5" /> },
    { id: 'datasheet', name: 'Datasheets', icon: <FileText className="w-5 h-5" /> },
    { id: 'manual', name: 'User Manuals', icon: <BookOpen className="w-5 h-5" /> },
    { id: 'firmware', name: 'Firmware', icon: <Cpu className="w-5 h-5" /> },
    { id: 'catalog', name: 'Product Catalog', icon: <FileText className="w-5 h-5" /> },
    { id: 'certificate', name: 'Certificates', icon: <Shield className="w-5 h-5" /> },
  ];

  useEffect(() => {
    fetchFiles();
  }, []);

  const fetchFiles = async () => {
    try {
      const response = await fetch('/api/support/files');
      if (response.ok) {
        const data = await response.json();
        setFiles(data);
      }
    } catch (error) {
      console.error('Error fetching files:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredFiles = selectedCategory === 'all' 
    ? files 
    : files.filter(f => f.category === selectedCategory);

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
  };

  const handleDownload = async (file: SupportFile) => {
    window.open(file.url, '_blank');
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center space-x-2">
              <img 
                src="/images/logo.png" 
                alt="Bitswaving Logo"
                className="w-10 h-10 object-contain"
              />
              <span className="text-xl font-semibold text-gray-900">BITSWAVING</span>
            </Link>

            <div className="hidden md:flex items-center space-x-2">
              <Link href="/" className="font-semibold text-gray-700 hover:bg-gray-100 px-3 py-2 rounded-lg transition">Home</Link>
              
              <div 
                className="relative"
                onMouseEnter={() => setProductDropdown(true)}
                onMouseLeave={() => setProductDropdown(false)}
              >
                <button className="flex items-center space-x-1 font-semibold text-gray-700 hover:bg-gray-100 px-3 py-2 rounded-lg transition">
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
                <button className="flex items-center space-x-1 font-semibold text-blue-600 bg-blue-50 px-3 py-2 rounded-lg">
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

              <Link href="#" className="font-semibold text-gray-700 hover:bg-gray-100 px-3 py-2 rounded-lg transition">Use Cases</Link>
              <Link href="#" className="font-semibold text-gray-700 hover:bg-gray-100 px-3 py-2 rounded-lg transition">About Us</Link>
            </div>

            <div className="hidden md:flex items-center space-x-4">
              <button 
                onClick={() => setLanguage(language === 'EN' ? 'ES' : 'EN')}
                className="flex items-center space-x-1 font-semibold text-gray-700 hover:bg-gray-100 px-3 py-2 rounded-lg transition"
              >
                <Globe className="w-4 h-4" />
                <span>{language}|{language === 'EN' ? 'ES' : 'EN'}</span>
              </button>
              
              {session ? (
                <div 
                  className="relative"
                  onMouseEnter={() => setProfileDropdown(true)}
                  onMouseLeave={() => setProfileDropdown(false)}
                >
                  <button className="flex items-center space-x-2">
                    {session.user?.image ? (
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
              ) : (
                <Link href="/login" className="px-5 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition font-medium">
                  Login
                </Link>
              )}
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

      {/* Support Center Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Support Center</h1>
          <p className="text-xl text-gray-600">
            Download product documentation, firmware, and certificates
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-3 mb-8 justify-center">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-xl font-medium transition ${
                selectedCategory === category.id
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {category.icon}
              <span>{category.name}</span>
            </button>
          ))}
        </div>

        {/* Files Grid */}
        {loading ? (
          <div className="text-center py-12">
            <div className="text-gray-600">Loading files...</div>
          </div>
        ) : filteredFiles.length === 0 ? (
          <div className="text-center py-12 bg-gray-50 rounded-3xl">
            <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-600">No files available in this category</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredFiles.map((file) => (
              <div 
                key={file.id}
                className="bg-white border border-gray-200 rounded-3xl p-6 hover:shadow-lg transition"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                    <FileText className="w-6 h-6 text-blue-600" />
                  </div>
                  <span className="px-3 py-1 bg-gray-100 text-gray-700 text-xs font-medium rounded-full">
                    {file.category}
                  </span>
                </div>

                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {file.filename}
                </h3>

                <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                  <span>{formatFileSize(file.size)}</span>
                  <span>{new Date(file.uploadedAt).toLocaleDateString()}</span>
                </div>

                <button
                  onClick={() => handleDownload(file)}
                  className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition font-medium"
                >
                  <Download className="w-5 h-5" />
                  <span>Download</span>
                </button>
              </div>
            ))}
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

export default SupportCenterPage;