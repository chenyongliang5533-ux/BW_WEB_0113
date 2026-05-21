"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, ChevronDown, Globe, User, LogOut, Package, Download, FileText, BookOpen, Cpu, Shield, Mail, MessageCircle, Copy, Check } from 'lucide-react';
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
  const [copiedField, setCopiedField] = useState<string | null>(null);

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

  const handleCopy = async (text: string, field: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedField(field);
      setTimeout(() => setCopiedField(null), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
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
                      <Link href="/product/accessories" className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-b-lg">Accessories</Link>
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
                      <Link href="/support#datasheet" className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-t-lg">Datasheet</Link>
                      <Link href="/support#manual" className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600">User Manual</Link>
                      <Link href="/support#firmware" className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600">Firmware</Link>
                      <Link href="/support#catalog" className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600">Catalog</Link>
                      <Link href="/support#certificate" className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-b-lg">Certificates</Link>
                    </div>
                  </div>
                )}
              </div>

              <Link href="/use-cases" className="font-semibold text-gray-700 hover:bg-gray-100 px-3 py-2 rounded-lg transition">Use Cases</Link>
              <Link href="/about" className="font-semibold text-gray-700 hover:bg-gray-100 px-3 py-2 rounded-lg transition">About Us</Link>
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

        {/* Contact Card */}
        <div className="max-w-4xl mx-auto mb-12">
          <div className="bg-gradient-to-br from-blue-50 to-white border border-gray-200 rounded-3xl p-8 shadow-sm">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
              {/* Photo */}
              <div className="flex-shrink-0">
                <img
                  src="/images/leon.jpg"
                  alt="Leon"
                  className="w-28 h-28 rounded-full object-cover border-4 border-white shadow-md"
                />
              </div>

              {/* Content */}
              <div className="flex-1 w-full">
                <h2 className="text-2xl font-bold text-gray-900 mb-2 text-center md:text-left">
                  Hello, I'm Leon
                </h2>
                <p className="text-gray-600 mb-6 text-center md:text-left">
                  I'm the person in charge at Bitswaving. Feel free to reach out — I'm here to help.
                </p>

                <div className="space-y-3">
                  {/* Email */}
                  <div className="flex items-center justify-between bg-white border border-gray-200 rounded-xl px-4 py-3">
                    <div className="flex items-center space-x-3 min-w-0">
                      <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Mail className="w-5 h-5 text-blue-600" />
                      </div>
                      <div className="min-w-0">
                        <div className="text-xs text-gray-500">For non-urgent support</div>
                        <a
                          href="mailto:leon@bitswaving.com"
                          className="text-gray-900 font-medium hover:text-blue-600 transition truncate block"
                        >
                          leon@bitswaving.com
                        </a>
                      </div>
                    </div>
                    <button
                      onClick={() => handleCopy('leon@bitswaving.com', 'email')}
                      className="flex-shrink-0 ml-3 flex items-center space-x-1 px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition text-sm font-medium"
                      title="Copy email"
                    >
                      {copiedField === 'email' ? (
                        <>
                          <Check className="w-4 h-4 text-green-600" />
                          <span className="text-green-600">Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-4 h-4" />
                          <span>Copy</span>
                        </>
                      )}
                    </button>
                  </div>

                  {/* WhatsApp */}
                  <div className="flex items-center justify-between bg-white border border-gray-200 rounded-xl px-4 py-3">
                    <div className="flex items-center space-x-3 min-w-0">
                      <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <MessageCircle className="w-5 h-5 text-green-600" />
                      </div>
                      <div className="min-w-0">
                        <div className="text-xs text-gray-500">For urgent support (WhatsApp)</div>
                        <a
                          href="https://wa.me/8618060917199"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gray-900 font-medium hover:text-green-600 transition truncate block"
                        >
                          +86 180 6091 7199
                        </a>
                      </div>
                    </div>
                    <button
                      onClick={() => handleCopy('+8618060917199', 'phone')}
                      className="flex-shrink-0 ml-3 flex items-center space-x-1 px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition text-sm font-medium"
                      title="Copy phone number"
                    >
                      {copiedField === 'phone' ? (
                        <>
                          <Check className="w-4 h-4 text-green-600" />
                          <span className="text-green-600">Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-4 h-4" />
                          <span>Copy</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
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
