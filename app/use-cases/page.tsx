"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { Menu, X, ChevronDown, Globe, User, LogOut, Package, Wifi, Shield, Sun, Droplets, Radio, ExternalLink, ArrowRight } from 'lucide-react';
import { useSession, signOut } from 'next-auth/react';

const UseCasesPage = () => {
  const { data: session } = useSession();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [productDropdown, setProductDropdown] = useState(false);
  const [supportDropdown, setSupportDropdown] = useState(false);
  const [profileDropdown, setProfileDropdown] = useState(false);
  const [language, setLanguage] = useState('EN');

  const useCases = [
    {
      id: 1,
      title: "MODBUS RTU to MQTT",
      tag: "Industrial IoT",
      icon: <Wifi className="w-8 h-8" />,
      image: "/images/case/case1.png",
      summary: "Use BWR_352 to actively poll a MODBUS RTU water meter and periodically report data to BW_CLOUD via MQTT — enabling real-time water usage monitoring without manual readings.",
      highlights: [
        "Active MODBUS RTU polling via BWR_352",
        "Timed MQTT reporting to BW_CLOUD",
        "Real-time water consumption monitoring",
        "Fully automated, zero manual intervention"
      ],
      bgColor: "bg-blue-50",
      accentColor: "text-blue-600",
      notionUrl: "https://www.notion.so/From-MODBUS-to-MQTT-3687b1b0ca598035a842f13255dc3499"  // ← Replace with your Notion link
    },
    {
      id: 2,
      title: "OpenVPN: SCADA & Remote PLC",
      tag: "Remote Access",
      icon: <Shield className="w-8 h-8" />,
      image: "/images/case/case2.png",
      summary: "BWR_352 establishes an OpenVPN tunnel between a SCADA server and the router's LAN — giving SCADA secure, remote access to PLCs for data acquisition and control over the internet.",
      highlights: [
        "OpenVPN tunnel between SCADA and BWR_352",
        "Remote access to LAN-side PLCs",
        "Supports data collection and control commands",
        "Secure encrypted communication"
      ],
      bgColor: "bg-cyan-50",
      accentColor: "text-cyan-600",
      notionUrl: "https://www.notion.so/From-MODBUS-to-MQTT-3687b1b0ca598035a842f13255dc3499"  // ← Replace with your Notion link
    },
    {
      id: 3,
      title: "CBRS Band 48 for Smart IP Cameras",
      tag: "Private LTE",
      icon: <Radio className="w-8 h-8" />,
      image: "/images/case/case3.png",
      summary: "In the US, BWR_352 with a CBRS-capable 4G module connects to your own private base station on the free Band 48 spectrum — ideal for campus-wide smart surveillance without carrier fees.",
      highlights: [
        "CBRS Band 48 (3.5 GHz) free spectrum",
        "Private LTE network on your own base station",
        "Campus-wide IP camera coverage",
        "No carrier subscription required"
      ],
      bgColor: "bg-violet-50",
      accentColor: "text-violet-600",
      notionUrl: "https://www.notion.so/From-MODBUS-to-MQTT-3687b1b0ca598035a842f13255dc3499"  // ← Replace with your Notion link
    },
    {
      id: 4,
      title: "Security First: ATM & IPsec VPN",
      tag: "Finance / Security",
      icon: <Shield className="w-8 h-8" />,
      image: "/images/case/case4.png",
      summary: "BWR_352 provides network connectivity to ATMs and establishes an IPsec VPN tunnel back to the bank's internal systems — ensuring every transaction travels over an encrypted, authenticated channel.",
      highlights: [
        "IPsec VPN to bank's internal network",
        "Encrypted ATM communications",
        "Dual-SIM failover for always-on uptime",
        "Meets financial-grade security standards"
      ],
      bgColor: "bg-gray-50",
      accentColor: "text-gray-700",
      notionUrl: "https://www.notion.so/From-MODBUS-to-MQTT-3687b1b0ca598035a842f13255dc3499"  // ← Replace with your Notion link
    },
    {
      id: 5,
      title: "Smart Solar Panel Control System",
      tag: "Renewable Energy",
      icon: <Sun className="w-8 h-8" />,
      image: "/images/case/case5.png",
      summary: "BWR_352 provides reliable connectivity for solar panel control systems — enabling remote efficiency monitoring, real-time performance data, and remote adjustment of panel angles for optimal yield.",
      highlights: [
        "Remote solar panel performance monitoring",
        "Real-time efficiency and output data",
        "Remote panel angle adjustment",
        "Connectivity for off-grid installations"
      ],
      bgColor: "bg-amber-50",
      accentColor: "text-amber-600",
      notionUrl: "https://www.notion.so/From-MODBUS-to-MQTT-3687b1b0ca598035a842f13255dc3499"  // ← Replace with your Notion link
    },
    {
      id: 6,
      title: "Smart Water Management: BWR_352 & RTU",
      tag: "Water / Utilities",
      icon: <Droplets className="w-8 h-8" />,
      image: "/images/case/case6.png",
      summary: "BWR_352's DI/DO ports directly control sluice gates and read field status, while simultaneously providing network connectivity for RTU devices — all in one compact industrial router.",
      highlights: [
        "DI ports for gate status monitoring",
        "DO ports for sluice gate control",
        "Cellular uplink for RTU connectivity",
        "Centralized management via BW_CLOUD"
      ],
      bgColor: "bg-teal-50",
      accentColor: "text-teal-600",
      notionUrl: "https://www.notion.so/From-MODBUS-to-MQTT-3687b1b0ca598035a842f13255dc3499"  // ← Replace with your Notion link
    }
  ];

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
              <Link href="/" className="text-gray-700 hover:bg-gray-100 px-3 py-2 rounded-lg transition">Home</Link>
              
              <div 
                className="relative"
                onMouseEnter={() => setProductDropdown(true)}
                onMouseLeave={() => setProductDropdown(false)}
              >
                <button className="flex items-center space-x-1 text-gray-700 hover:bg-gray-100 px-3 py-2 rounded-lg transition">
                  <span>Product</span>
                  <ChevronDown className="w-4 h-4" />
                </button>
                {productDropdown && (
                  <div className="absolute top-full left-0 pt-2 w-48">
                    <div className="bg-white border border-gray-200 rounded-lg shadow-lg">
                      <Link href="/product/bwr-352" className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-t-lg">BWR_352</Link>
                      <Link href="/product/bw-cloud" className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600">BW_Cloud</Link>
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
                <button className="flex items-center space-x-1 text-gray-700 hover:bg-gray-100 px-3 py-2 rounded-lg transition">
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

              <Link href="/use-cases" className="text-blue-600 bg-blue-50 px-3 py-2 rounded-lg">Use Cases</Link>
              <Link href="/about" className="text-gray-700 hover:bg-gray-100 px-3 py-2 rounded-lg transition">About Us</Link>
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

      {/* Hero Section */}
      <div className="mt-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					  <div className="bg-blue-100 rounded-3xl py-16 text-center">
						  <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-800">
              Use Cases
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Real-world deployment scenarios — from industrial protocol bridging to private LTE networks. Click any card to read the full guide on Notion.
            </p>
          </div>
        </div>
      </div>
      {/* Use Cases Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {useCases.map((useCase) => (
            <a 
              key={useCase.id}
              href={useCase.notionUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={`${useCase.bgColor} rounded-3xl overflow-hidden border border-gray-200 hover:shadow-xl transition-all hover:-translate-y-1 block group`}
            >
              {/* Image */}
              <div className="h-48 overflow-hidden relative">
                <img 
                  src={useCase.image} 
                  alt={useCase.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              {/* Content */}
              <div className="p-8">
                {/* Icon & Tag */}
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-12 h-12 bg-white rounded-xl flex items-center justify-center ${useCase.accentColor} shadow-sm`}>
                    {useCase.icon}
                  </div>
                  <span className="px-3 py-1 bg-white text-gray-700 text-sm font-medium rounded-full border border-gray-200">
                    {useCase.tag}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-2xl font-bold text-gray-900 mb-3">
                  {useCase.title}
                </h3>

                {/* Summary */}
                <p className="text-gray-700 leading-relaxed mb-6">
                  {useCase.summary}
                </p>

                {/* Highlights */}
                <ul className="space-y-2 mb-6">
                  {useCase.highlights.map((item, idx) => (
                    <li key={idx} className="flex items-start space-x-2">
                      <ArrowRight className={`w-5 h-5 mt-0.5 flex-shrink-0 ${useCase.accentColor}`} />
                      <span className="text-gray-700 text-sm">{item}</span>
                    </li>
                  ))}
                </ul>

                {/* Read More */}
                <div className={`flex items-center space-x-2 font-semibold text-sm ${useCase.accentColor}`}>
                  <span>Read full guide on Notion</span>
                  <ExternalLink className="w-4 h-4" />
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="px-4 sm:px-6 lg:px-8 pb-8">
        <footer className="max-w-7xl mx-auto bg-gray-100 rounded-3xl py-8 text-center">
          <p className="text-gray-600">© 2026 Bitswaving. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
};

export default UseCasesPage;