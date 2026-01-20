"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { Menu, X, ChevronDown, Globe, User, LogOut, Package, Factory, Store, Building2, Truck, ArrowRight } from 'lucide-react';
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
      title: "Smart Manufacturing Excellence",
      company: "Automotive Parts Manufacturer",
      industry: "Manufacturing",
      icon: <Factory className="w-8 h-8" />,
      image: "https://images.unsplash.com/photo-1565043589221-1a6fd9ae45c7?w=800&q=80",
      challenge: "A leading automotive parts manufacturer needed reliable connectivity across 50+ production lines in 3 factories. Frequent network downtime was causing production delays and quality issues.",
      solution: "Deployed 150 BWR-352 routers with dual SIM failover and BW Cloud management platform for centralized monitoring and rapid troubleshooting.",
      results: [
        "99.9% network uptime achieved",
        "Zero production delays due to connectivity",
        "Remote configuration saved 200+ hours annually",
        "$500K+ in prevented downtime costs"
      ],
      bgColor: "bg-blue-50"
    },
    {
      id: 2,
      title: "Retail Network Transformation",
      company: "National Retail Chain",
      industry: "Retail",
      icon: <Store className="w-8 h-8" />,
      image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&q=80",
      challenge: "A retail chain with 300+ stores struggled with inconsistent POS connectivity, slow payment processing, and difficulty managing network equipment across locations.",
      solution: "Implemented BWR-352 routers at all locations with BW Cloud for centralized management. Enabled automatic failover between primary fiber and 4G LTE backup.",
      results: [
        "Payment processing time reduced by 60%",
        "Zero checkout disruptions during peak hours",
        "Simplified IT management across all stores",
        "Enhanced customer satisfaction scores"
      ],
      bgColor: "bg-cyan-50"
    },
    {
      id: 3,
      title: "Smart City Infrastructure",
      company: "Metropolitan Municipality",
      industry: "Smart City",
      icon: <Building2 className="w-8 h-8" />,
      image: "https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=800&q=80",
      challenge: "City needed to connect 500+ IoT devices for traffic management, environmental monitoring, and public safety systems across a large metropolitan area.",
      solution: "Deployed BWR-352 routers with industrial-grade reliability for outdoor installations. BW Cloud enabled real-time monitoring and automated alerts for all connected systems.",
      results: [
        "500+ connected devices operating reliably",
        "Real-time traffic flow optimization",
        "30% reduction in response time for incidents",
        "Scalable infrastructure for future expansion"
      ],
      bgColor: "bg-pink-50"
    },
    {
      id: 4,
      title: "Remote Site Connectivity",
      company: "Construction & Mining Corp",
      industry: "Construction",
      icon: <Truck className="w-8 h-8" />,
      image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=80",
      challenge: "Construction sites in remote locations needed reliable internet for equipment monitoring, project management, and worker safety systems without access to wired infrastructure.",
      solution: "Installed BWR-352 routers with 5G connectivity and industrial temperature range capability. Remote management through BW Cloud eliminated need for on-site IT staff.",
      results: [
        "Reliable connectivity in extreme conditions",
        "Real-time equipment tracking and monitoring",
        "Improved worker safety with connected systems",
        "Reduced site visits by 80% through remote management"
      ],
      bgColor: "bg-gray-50"
    },
    {
      id: 5,
      title: "Healthcare Network Reliability",
      company: "Regional Healthcare Network",
      industry: "Healthcare",
      icon: <Building2 className="w-8 h-8" />,
      image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=800&q=80",
      challenge: "Healthcare network with 12 clinics required 24/7 reliable connectivity for patient records, telemedicine, and critical health monitoring systems.",
      solution: "Deployed BWR-352 routers with automatic LTE failover and VPN security. BW Cloud provided centralized visibility and instant notifications for any connectivity issues.",
      results: [
        "Zero downtime for critical health systems",
        "HIPAA-compliant secure connectivity",
        "Seamless telemedicine consultations",
        "Centralized monitoring across all locations"
      ],
      bgColor: "bg-blue-50"
    },
    {
      id: 6,
      title: "Agricultural IoT Innovation",
      company: "Smart Farming Solutions",
      industry: "Agriculture",
      icon: <Factory className="w-8 h-8" />,
      image: "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=800&q=80",
      challenge: "Large-scale farm operations needed connectivity for soil sensors, irrigation systems, and automated equipment across thousands of acres with no cellular coverage.",
      solution: "Implemented BWR-352 routers with long-range antennas and solar power systems. Created mesh network covering entire farm with centralized BW Cloud management.",
      results: [
        "Real-time monitoring of 1000+ acres",
        "40% water usage reduction through smart irrigation",
        "Increased crop yield by 25%",
        "Automated decision-making based on sensor data"
      ],
      bgColor: "bg-cyan-50"
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

              <Link href="/use-cases" className="font-semibold text-blue-600 bg-blue-50 px-3 py-2 rounded-lg">Use Cases</Link>
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

      {/* Hero Section */}
      <div className="bg-blue-100 mx-4 sm:mx-6 lg:mx-8 mt-8 rounded-3xl">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-20 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-800">
            Customer Success Stories
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover how leading organizations across industries rely on Bitswaving solutions for mission-critical connectivity
          </p>
        </div>
      </div>

      {/* Use Cases Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {useCases.map((useCase) => (
            <div 
              key={useCase.id}
              className={`${useCase.bgColor} rounded-3xl overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow`}
            >
              {/* Image */}
              <div className="h-48 overflow-hidden">
                <img 
                  src={useCase.image} 
                  alt={useCase.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Content */}
              <div className="p-8">
                {/* Icon & Industry */}
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-blue-600 shadow-sm">
                    {useCase.icon}
                  </div>
                  <span className="px-3 py-1 bg-white text-gray-700 text-sm font-medium rounded-full border border-gray-200">
                    {useCase.industry}
                  </span>
                </div>

                {/* Title & Company */}
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  {useCase.title}
                </h3>
                <p className="text-gray-600 font-medium mb-6">
                  {useCase.company}
                </p>

                {/* Challenge */}
                <div className="mb-6">
                  <h4 className="text-sm font-semibold text-gray-900 mb-2">Challenge</h4>
                  <p className="text-gray-700 leading-relaxed">
                    {useCase.challenge}
                  </p>
                </div>

                {/* Solution */}
                <div className="mb-6">
                  <h4 className="text-sm font-semibold text-gray-900 mb-2">Solution</h4>
                  <p className="text-gray-700 leading-relaxed">
                    {useCase.solution}
                  </p>
                </div>

                {/* Results */}
                <div>
                  <h4 className="text-sm font-semibold text-gray-900 mb-3">Results</h4>
                  <ul className="space-y-2">
                    {useCase.results.map((result, idx) => (
                      <li key={idx} className="flex items-start space-x-2">
                        <ArrowRight className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700">{result}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gray-900 text-white mx-4 sm:mx-6 lg:mx-8 mb-8 rounded-3xl">
        <div className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-12 py-16 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Transform Your Connectivity?
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Join hundreds of organizations already using Bitswaving solutions
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/orders"
              className="px-8 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition font-semibold"
            >
              Request a Quote
            </Link>
            <Link 
              href="/support"
              className="px-8 py-3 border-2 border-white text-white rounded-xl hover:bg-white hover:text-gray-900 transition font-semibold"
            >
              Download Resources
            </Link>
          </div>
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