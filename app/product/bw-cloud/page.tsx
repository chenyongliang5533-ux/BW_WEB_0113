"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { Menu, X, ChevronDown, Globe, Cloud, Shield, Zap, BarChart3, Bell, Terminal, Lock, RefreshCw, Map, Activity } from 'lucide-react';

const BWCloudPage = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [productDropdown, setProductDropdown] = useState(false);
  const [supportDropdown, setSupportDropdown] = useState(false);
  const [language, setLanguage] = useState('EN');

  const coreFeatures = [
    {
      icon: <Cloud className="w-6 h-6" />,
      title: "Centralized Management",
      description: "Monitor and control your entire fleet of BWR routers from a single web-based interface, accessible from anywhere"
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Bulk Configuration",
      description: "Deploy configurations and firmware updates to multiple devices simultaneously, saving time and reducing costs"
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Secure Connectivity",
      description: "All communications encrypted via HTTPS and OpenVPN tunnel, ensuring your data stays protected"
    },
    {
      icon: <Bell className="w-6 h-6" />,
      title: "Real-time Alerts",
      description: "Receive instant notifications via email or SMS when devices go offline or thresholds are exceeded"
    },
    {
      icon: <BarChart3 className="w-6 h-6" />,
      title: "Advanced Analytics",
      description: "Comprehensive reporting tools provide insights into device performance, availability, and network health"
    },
    {
      icon: <Terminal className="w-6 h-6" />,
      title: "Remote Access",
      description: "Connect to devices via SSH, HTTP, Telnet, RDP, and VNC without requiring public IP addresses"
    }
  ];

  const capabilities = [
    {
      icon: <Map className="w-5 h-5" />,
      category: "Device Monitoring",
      items: [
        "Real-time status and location tracking",
        "Signal strength and connection quality",
        "Temperature and hardware health",
        "Data usage statistics",
        "Event logs and system diagnostics"
      ]
    },
    {
      icon: <RefreshCw className="w-5 h-5" />,
      category: "Configuration Management",
      items: [
        "Multi-device configuration templates",
        "Over-the-air firmware updates",
        "Automatic backup and restore",
        "Password management for device fleet",
        "Scheduled maintenance windows"
      ]
    },
    {
      icon: <Lock className="w-5 h-5" />,
      category: "Security & Access",
      items: [
        "Role-based access control",
        "Two-factor authentication",
        "API key management",
        "Audit logs and compliance reporting",
        "VPN tunneling for secure access"
      ]
    },
    {
      icon: <Activity className="w-5 h-5" />,
      category: "Network Operations",
      items: [
        "Remote device reboot and control",
        "Traffic monitoring and QoS",
        "Network topology visualization",
        "Custom alert rules and triggers",
        "Integration with third-party systems"
      ]
    }
  ];

  const useCases = [
    {
      title: "Smart Manufacturing",
      description: "Monitor production line connectivity, receive alerts on connection failures, and remotely troubleshoot equipment across multiple factory locations",
      color: "bg-blue-50"
    },
    {
      title: "Retail Networks",
      description: "Manage point-of-sale systems, digital signage, and store networks from a central dashboard with real-time health monitoring",
      color: "bg-cyan-50"
    },
    {
      title: "Smart Cities",
      description: "Oversee thousands of IoT devices for traffic management, environmental monitoring, and public infrastructure with automated alerts",
      color: "bg-pink-50"
    },
    {
      title: "Remote Worksites",
      description: "Maintain connectivity for construction sites, mining operations, and field offices without on-site IT staff",
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
                      <Link href="/product/bwr-352" className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-t-lg">BWR-352</Link>
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

      {/* Hero Section */}
      <div className="bg-blue-100 mx-4 sm:mx-6 lg:mx-8 mt-8 rounded-3xl">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-20">
          <div className="max-w-3xl">
            <div className="flex items-center space-x-2 mb-4">
              <Cloud className="w-10 h-10 text-blue-600" />
              <h1 className="text-5xl font-bold text-gray-800">BW Cloud</h1>
            </div>
            <p className="text-2xl text-gray-700 mb-8">
              Enterprise Cloud Management Platform for Industrial IoT Networks
            </p>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              Monitor, configure, and manage your entire fleet of BWR routers from anywhere. No public IP required. Secure by design. Built for scale.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="px-8 py-3 bg-white text-blue-600 rounded-xl font-semibold hover:bg-gray-50 transition shadow-sm">
                Start Free Trial
              </button>
              <button className="px-8 py-3 border-2 border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-white transition">
                Watch Demo
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Core Features */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
          Everything You Need to Manage Your Network
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

      {/* Platform Screenshot/Demo */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Intuitive Dashboard, Powerful Insights
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Get a complete overview of your network health, device status, and performance metrics at a glance
            </p>
          </div>
          
          <div className="bg-white rounded-3xl shadow-lg p-8 border border-gray-200">
            <img 
              src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&q=80" 
              alt="BW Cloud Dashboard"
              className="w-full rounded-xl"
            />
          </div>
        </div>
      </div>

      {/* Detailed Capabilities */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
          Comprehensive Management Capabilities
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
            Trusted Across Industries
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

      {/* Pricing Preview */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Flexible Pricing for Every Scale
          </h2>
          <p className="text-xl text-gray-600">
            Start with 5 devices free. Only pay for what you use.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <div className="bg-white border border-gray-200 rounded-3xl p-8 text-center">
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Free Trial</h3>
            <div className="text-4xl font-bold text-blue-600 mb-4">5 Devices</div>
            <p className="text-gray-600 mb-6">Perfect for testing and small deployments</p>
            <ul className="space-y-2 text-gray-700 text-sm mb-6">
              <li>• 5 GB data included</li>
              <li>• Basic monitoring</li>
              <li>• Email support</li>
            </ul>
            <button className="w-full py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition font-medium">
              Start Free
            </button>
          </div>

          <div className="bg-gradient-to-br from-blue-600 to-blue-700 text-white border-2 border-blue-600 rounded-3xl p-8 text-center transform scale-105 shadow-xl">
            <div className="inline-block px-4 py-1 bg-white text-blue-600 rounded-full text-sm font-semibold mb-2">
              Most Popular
            </div>
            <h3 className="text-2xl font-bold mb-2">Pro</h3>
            <div className="text-4xl font-bold mb-4">Custom</div>
            <p className="text-blue-100 mb-6">For growing businesses and fleets</p>
            <ul className="space-y-2 text-sm mb-6">
              <li>• Unlimited devices</li>
              <li>• 150 GB data packages</li>
              <li>• Advanced analytics</li>
              <li>• Priority support</li>
            </ul>
            <button className="w-full py-3 bg-white text-blue-600 rounded-xl hover:bg-gray-50 transition font-medium">
              Contact Sales
            </button>
          </div>

          <div className="bg-white border border-gray-200 rounded-3xl p-8 text-center">
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Enterprise</h3>
            <div className="text-4xl font-bold text-blue-600 mb-4">Custom</div>
            <p className="text-gray-600 mb-6">For large-scale deployments</p>
            <ul className="space-y-2 text-gray-700 text-sm mb-6">
              <li>• White-label options</li>
              <li>• Dedicated support</li>
              <li>• Custom integrations</li>
              <li>• SLA guarantee</li>
            </ul>
            <button className="w-full py-3 border-2 border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition font-medium">
              Contact Sales
            </button>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gray-900 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6">
            Ready to Transform Your Network Management?
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Join hundreds of companies already using BW Cloud to manage their industrial networks
          </p>
          <button className="px-10 py-4 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition font-semibold text-lg">
            Start Your Free Trial Today
          </button>
        </div>
      </div>

      {/* Footer */}
      <div className="px-4 sm:px-6 lg:px-8 pb-8 pt-16">
        <footer className="max-w-7xl mx-auto bg-gray-100 rounded-3xl py-8 text-center">
          <p className="text-gray-600">© 2026 Bitswaving. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
};

export default BWCloudPage;