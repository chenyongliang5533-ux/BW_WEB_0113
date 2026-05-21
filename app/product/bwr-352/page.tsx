"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { Menu, X, ChevronDown, Globe, Wifi, Shield, Zap, Settings, CheckCircle, Copy, Check } from 'lucide-react';
import Model3DViewer from '@/components/Model3DViewer';

const BWR352ProductPage = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [productDropdown, setProductDropdown] = useState(false);
  const [supportDropdown, setSupportDropdown] = useState(false);
  const [language, setLanguage] = useState('EN');
  const [showQuoteModal, setShowQuoteModal] = useState(false);
  const [emailCopied, setEmailCopied] = useState(false);

  const contactEmail = 'leon@bitswaving.com';

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(contactEmail);
      setEmailCopied(true);
      setTimeout(() => setEmailCopied(false), 2000);
    } catch (err) {
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = contactEmail;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setEmailCopied(true);
      setTimeout(() => setEmailCopied(false), 2000);
    }
  };



  const features = [
    {
      icon: <Wifi className="w-6 h-6" />,
      title: "4G LTE Connectivity",
      description: "Cat 4 mobile module with download speeds up to 150 Mbps and dual SIM failover for uninterrupted connectivity"
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
    "Supports edge computing for local data processing and automation logic",
    "Read Modbus RTU/TCP devices and upload data securely to MQTT broker",
    "Built-in IPsec VPN powered by strongSwan 6.0.6 for enterprise-grade connectivity",
    "Supports OpenVPN, WireGuard, ZeroTier, GRE, and other mainstream VPN technologies",
    "Remote device access without public IP via BW Cloud secure networking",
    "eSIM version available for simplified global deployment and carrier flexibility",
    "Dual SIM failover ensures reliable always-on cellular connectivity"
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-2">
              <img 
                src="/images/logo.png" 
                alt="Bitswaving Logo"
                className="w-10 h-10 object-contain"
              />
              <span className="text-xl font-semibold text-gray-900">BITSWAVING</span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-2">
              <Link href="/" className="font-semibold text-gray-700 hover:bg-gray-100 px-3 py-2 rounded-lg transition">Home</Link>
              
              {/* Product Dropdown */}
              <div 
                className="relative"
                onMouseEnter={() => setProductDropdown(true)}
                onMouseLeave={() => setProductDropdown(false)}
              >
                <button className="flex items-center space-x-1 font-semibold text-blue-600 bg-blue-50 px-3 py-2 rounded-lg">
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

              {/* Support Dropdown */}
              <div 
                className="relative"
                onMouseEnter={() => setSupportDropdown(true)}
                onMouseLeave={() => setSupportDropdown(false)}
              >
                <button className="flex items-center space-x-1 font-semibold text-gray-700 hover:bg-gray-100 px-3 py-2 rounded-lg transition">
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
          <span className="text-gray-900">BWR_352</span>
        </div>

        {/* Product Header - 3D viewer gets more space (3 cols), info gets less (2 cols) */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 mb-16">
          {/* Product 3D Viewer - Enlarged */}
          <div className="lg:col-span-3">
            <div className="relative w-full bg-gray-50 rounded-3xl overflow-hidden" style={{ minHeight: '400px' }}>
              <Model3DViewer />
            </div>
          </div>

          {/* Product Info - Compacted */}
          <div className="lg:col-span-2">
            <h1 className="text-3xl font-bold text-gray-900 mb-3">BWR_352</h1>
            <p className="text-base text-gray-600 mb-5">
              Industrial 4G LTE Router with Dual SIM Failover
            </p>
            
            <div className="bg-blue-50 rounded-2xl p-6 mb-5">
              <h3 className="font-semibold text-gray-900 mb-3">Key Highlights</h3>
              <ul className="space-y-3">
                {keyBenefits.map((benefit, idx) => (
                  <li key={idx} className="flex items-start space-x-2">
                    <CheckCircle className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700 text-sm">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <button
                onClick={() => setShowQuoteModal(true)}
                className="w-full px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition font-medium"
              >
                Request Quote
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

          <div className="space-y-3">
            {[
              { label: "CPU", value: "Mediatek MT7628AN: 580 MHz MIPS 24KEc" },
              { label: "RAM", value: "128 MB DDR2" },
              { label: "FLASH", value: "32 MB SPI FLASH" },
              { label: "Cellular Module", value: "Quectel CAT4/CAT1, Fibocom CAT4/CAT1 LTE module " },
              { label: "Ethernet Ports", value: "5 x 10/100 Mbps RJ45 ports(1 x WAN, 4 x LAN)" },
              { label: "Serial Ports", value: "1 X RS232 + 1 X RS485" },
              { label: "WiFi", value: "2T2R 802.11b/g/n 2.4 GHz (300 Mbps) WIFI4" },
              { label: "Power supply range", value: "9-48 VDC" },
              { label: "Digital I/O", value: "1 x Digital inputs, 1 x Digital output" },
              { label: "OS", value: "BWR_OS (based on OPENWRT 24.10)" },
              { label: "Kernel version", value: "Linux 6.6.122" },
              { label: "Front-end frameworks", value: "Vanilla JS SPA" },
              { label: "Back-end frameworks", value: "UCODE + RPCD + UBUS" },
              { label: "Mounting", value: "DIN rail, wall mount" },
              { label: "Dimensions", value: "108mmx37mmx97mm" },
            ].map((spec, idx) => (
              <div key={idx} className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div className="md:col-span-1 bg-gray-100 rounded-xl px-5 py-3 flex items-center">
                  <span className="font-semibold text-gray-900">{spec.label}</span>
                </div>
                <div className="md:col-span-2 bg-blue-50 rounded-xl px-5 py-3 flex items-center">
                  <span className="text-gray-700">{spec.value}</span>
                </div>
              </div>
            ))}
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

      {/* Request Quote Modal */}
      {showQuoteModal && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
          onClick={() => setShowQuoteModal(false)}
        >
          <div
            className="bg-white rounded-3xl max-w-md w-full p-8 shadow-2xl relative"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={() => setShowQuoteModal(false)}
              className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full transition"
              aria-label="Close"
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>

            {/* Modal content */}
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Wifi className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Request a Quote</h3>
              <p className="text-gray-600">
                Please send your project requirements to the email below, and we'll get back to you with a customized quote.
              </p>
            </div>

            {/* Email row with copy button */}
            <div className="bg-gray-50 rounded-2xl p-4 flex items-center justify-between gap-3 mb-4">
              <a
                href={`mailto:${contactEmail}`}
                className="text-blue-600 font-medium hover:underline truncate"
              >
                {contactEmail}
              </a>
              <button
                onClick={handleCopyEmail}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition flex-shrink-0 ${
                  emailCopied
                    ? 'bg-green-100 text-green-700'
                    : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-100'
                }`}
                aria-label="Copy email address"
              >
                {emailCopied ? (
                  <>
                    <Check className="w-4 h-4" />
                    Copied
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    Copy
                  </>
                )}
              </button>
            </div>

            <p className="text-xs text-gray-500 text-center">
              Please include product model, quantity, and your application scenario in your email.
            </p>
          </div>
        </div>
      )}

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
