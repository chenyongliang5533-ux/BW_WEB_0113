"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { Menu, X, ChevronDown, Globe, Wifi, Shield, Zap, Settings, CheckCircle } from 'lucide-react';

const BWR352ProductPage = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [productDropdown, setProductDropdown] = useState(false);
  const [supportDropdown, setSupportDropdown] = useState(false);
  const [language, setLanguage] = useState('EN');
  const [selectedImage, setSelectedImage] = useState(0);

  const productImages = [
    "https://images.bitswaving.com/photo-1606904825846-647eb07f5be2?w=800&q=80",
    "https://images.bitswaving.com/photo-1545259742-24f497fbbde7?w=800&q=80",
    "https://images.bitswaving.com/photo-1563013544-824ae1b704d3?w=800&q=80"
  ];

  const features = [
    {
      icon: <Wifi className="w-6 h-6" />,
      title: "5G & 4G LTE Connectivity",
      description: "Cat 6 mobile module with download speeds up to 300 Mbps and dual SIM failover for uninterrupted connectivity"
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Industrial-Grade Security",
      description: "Enterprise VPN support, firewall protection, and secure remote access for mission-critical deployments"
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Automatic Failover",
      description: "Smart WAN failover automatically switches between cellular, Ethernet, and Wi-Fi connections"
    },
    {
      icon: <Settings className="w-6 h-6" />,
      title: "Remote Management",
      description: "BW Cloud platform enables centralized monitoring, configuration, and firmware updates from anywhere"
    }
  ];

  const keyBenefits = [
    "99.9% uptime with multi-WAN redundancy",
    "Industrial temperature range: -40°C to 75°C",
    "Compact design: 85 x 30 x 78 mm",
    "DIN rail & wall mounting options",
    "Digital I/O for automation scenarios",
    "Easy integration with existing systems"
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-blue-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">BW</span>
              </div>
              <span className="text-xl font-semibold text-gray-900">BITSWAVING</span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <Link href="/" className="font-semibold text-gray-700 hover:text-blue-600 transition">Home</Link>
              
              {/* Product Dropdown */}
              <div 
                className="relative"
                onMouseEnter={() => setProductDropdown(true)}
                onMouseLeave={() => setProductDropdown(false)}
              >
                <button className="flex items-center space-x-1 font-semibold text-blue-600">
                  <span>Product</span>
                  <ChevronDown className="w-4 h-4" />
                </button>
                {productDropdown && (
                  <div className="absolute top-full left-0 pt-2 w-48">
                    <div className="bg-white border border-gray-200 rounded-lg shadow-lg">
                      <a href="#" className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-t-lg">BWR-352</a>
                      <a href="#" className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600">BW Cloud</a>
                      <a href="#" className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-b-lg">Accessories</a>
                    </div>
                  </div>
                )}
              </div>

              {/* Support Dropdown */}
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

            {/* Right Side */}
            <div className="hidden md:flex items-center space-x-4">
              <button 
                onClick={() => setLanguage(language === 'EN' ? 'ES' : 'EN')}
                className="flex items-center space-x-1 font-semibold text-gray-700 hover:text-blue-600 transition"
              >
                <Globe className="w-4 h-4" />
                <span>{language}|{language === 'EN' ? 'ES' : 'EN'}</span>
              </button>
              <Link href="/login" className="px-5 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition font-medium">
                Login
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button 
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-gray-200 bg-white">
            <div className="px-4 py-3 space-y-3">
              <Link href="/" className="block text-gray-700">Home</Link>
              <a href="#" className="block text-gray-700">Product</a>
              <a href="#" className="block text-gray-700">Support</a>
              <a href="#" className="block text-gray-700">Use Cases</a>
              <a href="#" className="block text-gray-700">About Us</a>
              <button className="w-full px-4 py-2 bg-black text-white rounded-lg">
                <Link href="/login" className="block">Login</Link>
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* Product Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Breadcrumb */}
        <div className="text-sm text-gray-500 mb-6">
          <Link href="/" className="hover:text-blue-600">Home</Link>
          <span className="mx-2">/</span>
          <span className="text-gray-900">BWR-352</span>
        </div>

        {/* Product Header */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Product Images */}
          <div>
            <div className="bg-gray-50 rounded-3xl p-8 mb-4">
              <img 
                src={productImages[selectedImage]} 
                alt="BWR-352 Router"
                className="w-full h-96 object-contain"
              />
            </div>
            <div className="flex gap-3">
              {productImages.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(idx)}
                  className={`flex-1 bg-gray-50 rounded-xl p-3 hover:bg-gray-100 transition ${
                    selectedImage === idx ? 'ring-2 ring-blue-500' : ''
                  }`}
                >
                  <img src={img} alt={`View ${idx + 1}`} className="w-full h-20 object-contain" />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">BWR-352</h1>
            <p className="text-xl text-gray-600 mb-6">
              Industrial 5G/4G LTE Router with Dual SIM Failover
            </p>
            
            <div className="bg-blue-50 rounded-3xl p-6 mb-6">
              <h3 className="font-semibold text-gray-900 mb-3">Key Highlights</h3>
              <ul className="space-y-2">
                {keyBenefits.map((benefit, idx) => (
                  <li key={idx} className="flex items-start space-x-2">
                    <CheckCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex gap-4">
              <button className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition font-medium">
                Request Quote
              </button>
              <button className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition font-medium">
                Technical Support
              </button>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Features & Benefits</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {features.map((feature, idx) => (
              <div key={idx} className="bg-gray-50 rounded-3xl p-6">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600 mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Technical Specifications */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Technical Specifications</h2>
          
          <div className="bg-white border border-gray-200 rounded-3xl overflow-hidden">
            <table className="w-full">
              <tbody>
                <tr className="border-b border-gray-200">
                  <td className="px-6 py-4 font-semibold text-gray-900 bg-gray-50 w-1/3">Mobile Connectivity</td>
                  <td className="px-6 py-4 text-gray-700">5G NR, 4G LTE Cat 6 (300/50 Mbps), 3G HSPA+, 2G EDGE/GPRS</td>
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="px-6 py-4 font-semibold text-gray-900 bg-gray-50">SIM Cards</td>
                  <td className="px-6 py-4 text-gray-700">Dual SIM (2 x Mini-SIM) with automatic failover</td>
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="px-6 py-4 font-semibold text-gray-900 bg-gray-50">Wi-Fi</td>
                  <td className="px-6 py-4 text-gray-700">802.11 b/g/n, 2.4 GHz, Access Point & Station modes</td>
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="px-6 py-4 font-semibold text-gray-900 bg-gray-50">Ethernet Ports</td>
                  <td className="px-6 py-4 text-gray-700">2 x 10/100 Mbps (1 x WAN, 1 x LAN)</td>
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="px-6 py-4 font-semibold text-gray-900 bg-gray-50">CPU</td>
                  <td className="px-6 py-4 text-gray-700">Dual-core ARM Cortex-A7 @ 880 MHz</td>
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="px-6 py-4 font-semibold text-gray-900 bg-gray-50">Memory</td>
                  <td className="px-6 py-4 text-gray-700">256 MB RAM, 16 MB Flash</td>
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="px-6 py-4 font-semibold text-gray-900 bg-gray-50">Digital I/O</td>
                  <td className="px-6 py-4 text-gray-700">2 x Digital inputs, 1 x Digital output</td>
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="px-6 py-4 font-semibold text-gray-900 bg-gray-50">Power Supply</td>
                  <td className="px-6 py-4 text-gray-700">9-30 VDC, reverse polarity protection, max 10W</td>
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="px-6 py-4 font-semibold text-gray-900 bg-gray-50">Operating Temperature</td>
                  <td className="px-6 py-4 text-gray-700">-40°C to +75°C (-40°F to +167°F)</td>
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="px-6 py-4 font-semibold text-gray-900 bg-gray-50">Dimensions</td>
                  <td className="px-6 py-4 text-gray-700">85 x 30 x 78 mm (3.35 x 1.18 x 3.07 inches)</td>
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="px-6 py-4 font-semibold text-gray-900 bg-gray-50">Weight</td>
                  <td className="px-6 py-4 text-gray-700">180g (0.40 lbs)</td>
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="px-6 py-4 font-semibold text-gray-900 bg-gray-50">Mounting</td>
                  <td className="px-6 py-4 text-gray-700">DIN rail, wall mount</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 font-semibold text-gray-900 bg-gray-50">Certifications</td>
                  <td className="px-6 py-4 text-gray-700">CE, FCC, RoHS, IC</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Software Features */}
        <div>
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Software Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-cyan-50 rounded-3xl p-6">
              <h3 className="font-semibold text-gray-900 mb-3">Security</h3>
              <ul className="space-y-2 text-gray-700 text-sm">
                <li>• OpenVPN, IPsec, GRE, L2TP</li>
                <li>• Firewall with custom rules</li>
                <li>• VLAN support</li>
                <li>• MAC filtering</li>
                <li>• DDNS support</li>
              </ul>
            </div>
            <div className="bg-pink-50 rounded-3xl p-6">
              <h3 className="font-semibold text-gray-900 mb-3">Networking</h3>
              <ul className="space-y-2 text-gray-700 text-sm">
                <li>• Static & dynamic routing</li>
                <li>• Load balancing</li>
                <li>• QoS traffic management</li>
                <li>• DHCP server/client</li>
                <li>• Port forwarding & NAT</li>
              </ul>
            </div>
            <div className="bg-gray-50 rounded-3xl p-6">
              <h3 className="font-semibold text-gray-900 mb-3">Management</h3>
              <ul className="space-y-2 text-gray-700 text-sm">
                <li>• BW Cloud remote management</li>
                <li>• SMS control & alerts</li>
                <li>• SNMP monitoring</li>
                <li>• Event logging</li>
                <li>• Scheduled reboot</li>
              </ul>
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

export default BWR352ProductPage;