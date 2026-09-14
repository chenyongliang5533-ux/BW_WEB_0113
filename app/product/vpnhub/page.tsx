"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { Menu, X, ChevronDown, Globe, Server, Shield, Lock, RefreshCw, Terminal, Route, QrCode, Smartphone, KeyRound, Gauge, Webhook } from 'lucide-react';
import ProductDropdown from '@/components/ProductDropdown';

const VPNHubPage = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [productDropdown, setProductDropdown] = useState(false);
  const [supportDropdown, setSupportDropdown] = useState(false);
  const [language, setLanguage] = useState('EN');

  const coreFeatures = [
    {
      icon: <QrCode className="w-6 h-6" />,
      title: "Peer Management",
      description: "Create, edit, enable, or disable WireGuard peers from a clean web interface. New users are activated without disturbing existing VPN connections"
    },
    {
      icon: <Smartphone className="w-6 h-6" />,
      title: "Zero-Touch Onboarding",
      description: "Every client receives a QR code and a ready-to-import wg-quick configuration file, delivered automatically by email"
    },
    {
      icon: <Terminal className="w-6 h-6" />,
      title: "Built on wgctrl",
      description: "Drives WireGuard's official wgctrl library, so it works with your existing WireGuard setup and manages multiple interfaces side by side"
    },
    {
      icon: <KeyRound className="w-6 h-6" />,
      title: "Enterprise Authentication",
      description: "Authenticate against a database, OAuth/OIDC, or LDAP (Active Directory, OpenLDAP), with passkey support for passwordless login"
    },
    {
      icon: <Server className="w-6 h-6" />,
      title: "Self-Hosted, Single Binary",
      description: "The whole application ships as one binary and is Docker ready. Your private keys and peer data never leave your own infrastructure"
    },
    {
      icon: <Gauge className="w-6 h-6" />,
      title: "Monitoring & Automation",
      description: "Exposes Prometheus metrics for monitoring and alerting, a REST API for client deployment, and webhooks for custom actions"
    }
  ];

  const capabilities = [
    {
      icon: <Route className="w-5 h-5" />,
      category: "Network & Addressing",
      items: [
        "Automatic IP selection from the client network pool",
        "Handles route and DNS settings the same way wg-quick does",
        "Support for multiple WireGuard interfaces",
        "IPv6 ready",
        "Pluggable backends: wgctrl, MikroTik, or pfSense"
      ]
    },
    {
      icon: <Lock className="w-5 h-5" />,
      category: "Access Control",
      items: [
        "Peer expiry for time-limited access",
        "Seamless enable / disable without dropping live tunnels",
        "User profiles sourced from your identity provider",
        "Role separation between administrators and end users",
        "Auditable peer and interface lifecycle"
      ]
    },
    {
      icon: <RefreshCw className="w-5 h-5" />,
      category: "Operations",
      items: [
        "Responsive multi-language interface with dark mode",
        "On-demand generation of wg-quick (wgX.conf) files",
        "Email delivery of QR codes and client configurations",
        "REST API for automated client deployment",
        "Single binary or container deployment"
      ]
    },
    {
      icon: <Webhook className="w-5 h-5" />,
      category: "Integration",
      items: [
        "Webhooks on peer, interface, or user updates",
        "Prometheus metrics for monitoring and alerting",
        "Database backends: SQLite, MySQL, MsSQL, or PostgreSQL",
        "Compatible with existing WireGuard deployments",
        "Customisable mail templates for client provisioning"
      ]
    }
  ];

  const useCases = [
    {
      title: "Remote Workforce",
      description: "Give employees secure access to internal resources without exposing services to the public internet or maintaining a hardware VPN concentrator",
      color: "bg-blue-50"
    },
    {
      title: "Site-to-Site Links",
      description: "Connect branch offices, warehouses, and remote industrial sites to headquarters over encrypted WireGuard tunnels",
      color: "bg-cyan-50"
    },
    {
      title: "Field Devices",
      description: "Provision and revoke VPN access for BWR routers, gateways, and field equipment from one central portal",
      color: "bg-pink-50"
    },
    {
      title: "Managed Service Providers",
      description: "Operate VPN access for multiple customers, using peer expiry and webhooks to automate provisioning and lifecycle management",
      color: "bg-gray-50"
    }
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
                  <ProductDropdown show={productDropdown} />
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
                     <Link href="/support#datasheet" className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-t-lg">Datasheet</Link>
                      <Link href="/support#manual" className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600">User Manual</Link>
                      <Link href="/support#firmware" className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600">Firmware</Link>
                      <Link href="/support#catalog" className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600">Catalog</Link>
                      <Link href="/support#certificate" className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-b-lg">Certificates</Link>
                    </div>
                  </div>
                )}
              </div>

              <Link href="/use-cases" className="text-gray-700 hover:bg-gray-100 px-3 py-2 rounded-lg transition">Use Cases</Link>
              <Link href="/about" className="text-gray-700 hover:bg-gray-100 px-3 py-2 rounded-lg transition">About Us</Link>
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

      {/* Hero Section */}
      <div className="bg-blue-100 mx-10 sm:mx-20 lg:mx-36 mt-6 rounded-3xl">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-12">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <Shield className="w-10 h-10 text-blue-600" />
              <h1 className="text-5xl md:text-6xl font-bold text-gray-800 tracking-tight">VPNHUB: WG Portal</h1>
            </div>
            <p className="text-xl md:text-2xl text-gray-700 mb-6">
              Web-Based WireGuard VPN Management
            </p>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed max-w-3xl mx-auto">
              A beautiful and simple UI to manage your WireGuard peers and interfaces. Create, monitor, and revoke VPN access from one self-hosted portal — no command line required. Built on WireGuard&apos;s official wgctrl library.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://vpnhub.bitswaving.com"
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition shadow-sm text-center"
              >
                Get started
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Core Features */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
          Everything You Need to Run WireGuard at Scale
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {coreFeatures.map((feature, idx) => (
            <div key={idx} className="bg-white border border-gray-200 rounded-3xl p-6 hover:shadow-lg transition">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600 mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Detailed Capabilities */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
          Comprehensive VPN Management Capabilities
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {capabilities.map((capability, idx) => (
            <div key={idx} className="bg-gradient-to-br from-gray-50 to-white border border-gray-200 rounded-3xl p-8">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600">
                  {capability.icon}
                </div>
                <h3 className="text-2xl font-semibold text-gray-900">{capability.category}</h3>
              </div>
              <ul className="space-y-3">
                {capability.items.map((item, itemIdx) => (
                  <li key={itemIdx} className="flex items-start space-x-2">
                    <span className="text-blue-600 font-bold">•</span>
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Use Cases */}
      <div className="bg-blue-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
            Where Teams Deploy WG Portal
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {useCases.map((useCase, idx) => (
              <div key={idx} className={`${useCase.color} rounded-3xl p-8 border border-gray-200`}>
                <h3 className="text-2xl font-semibold text-gray-900 mb-4">{useCase.title}</h3>
                <p className="text-gray-700 leading-relaxed">{useCase.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Call To Action */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-gray-900 rounded-3xl px-8 py-12 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to manage your WireGuard network?
          </h2>
          <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
            Sign in to our hosted VPNHUB portal and hand out your first VPN configuration in minutes.
          </p>
          <a
            href="https://vpnhub.bitswaving.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-8 py-3 bg-white text-gray-900 rounded-xl font-semibold hover:bg-gray-100 transition shadow-sm"
          >
            Get started
          </a>
        </div>
      </div>

      {/* Footer */}
      <div className="px-4 sm:px-6 lg:px-8 pb-8">
        <footer className="max-w-7xl mx-auto bg-gray-100 rounded-3xl py-8 text-center">
          <p className="text-gray-600">© 2026 Bitswaving. All rights reserved.</p>
          <p className="text-sm text-gray-500 mt-3">
            WireGuard Portal is an open source project. WireGuard® is a registered trademark of Jason A. Donenfeld.
          </p>
        </footer>
      </div>
    </div>
  );
};

export default VPNHubPage;
