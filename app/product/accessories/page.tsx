"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { Menu, X, ChevronDown, Globe, User, LogOut, Package, ExternalLink } from 'lucide-react';
import { useSession, signOut } from 'next-auth/react';

const AccessoriesPage = () => {
  const { data: session } = useSession();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [productDropdown, setProductDropdown] = useState(false);
  const [supportDropdown, setSupportDropdown] = useState(false);
  const [profileDropdown, setProfileDropdown] = useState(false);
  const [language, setLanguage] = useState('EN');

  const accessories = [
    {
      id: 1,
      name: '4G/LTE Antenna',
      image: '/images/accessories/4g_antenna.png',
      driveLink: '#' // Replace with your Google Drive link
    },
    {
      id: 2,
      name: 'WiFi Antenna',
      image: '/images/accessories/wifi_antenna.png',
      driveLink: '#'
    },
    {
      id: 3,
      name: 'Power Supply 12V',
      image: '/images/accessories/power_adaptor2.png',
      driveLink: '#'
    },
    {
      id: 4,
      name: '1M Ethernet Cable Cat6',
      image: '/images/accessories/eth_cable.png',
      driveLink: '#'
    },
    {
      id: 5,
      name: 'DIN Rail Mounting Kit',
      image: '/images/accessories/din_rail.png',
      driveLink: '#'
    },
    {
      id: 6,
      name: 'RS232 Serial Cable',
      image: '/images/accessories/rs232_cable.png',
      driveLink: '#'
    },
    {
      id: 7,
      name: 'RS485 Serial Cable',
      image: '/images/accessories/rs485_cable.png',
      driveLink: '#'
    },
    {
      id: 8,
      name: 'GPS Antenna',
      image: '/images/accessories/gps_antenna.png',
      driveLink: '#'
    },
    {
      id: 9,
      name: 'PoE Injector',
      image: '/images/accessories/poe_adaptor.png',
      driveLink: '#'
    },
    {
      id: 10,
      name: 'SIM Card Adapter',
      image: '/images/accessories/sim_adaptor.png',
      driveLink: '#'
    },
    {
      id: 11,
      name: 'Mounting Bracket',
      image: '/images/accessories/mount.png',
      driveLink: '#'
    },
    {
      id: 12,
      name: 'Console Cable',
      image: '/images/accessories/console_cable.png',
      driveLink: '#'
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
              <span className="text-xl text-gray-900">BITSWAVING</span>
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

              <Link href="/use-cases" className="text-gray-700 hover:bg-gray-100 px-3 py-2 rounded-lg transition">Use Cases</Link>
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
      <div className="bg-blue-100 mx-4 sm:mx-6 lg:mx-8 mt-8 rounded-3xl">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-20 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-800">
            Accessories
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Browse our complete range of industrial networking accessories and components
          </p>
        </div>
      </div>

      {/* Accessories Grid - Teltonika Style */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {accessories.map((accessory) => (
            <a
              key={accessory.id}
              href={accessory.driveLink}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gray-100 rounded-2xl overflow-hidden hover:shadow-lg transition-all hover:-translate-y-1 group"
            >
              {/* Image Container */}
              <div className="aspect-square bg-white p-4 flex items-center justify-center">
                <img 
                  src={accessory.image} 
                  alt={accessory.name}
                  className="w-full h-full object-contain group-hover:scale-105 transition-transform"
                />
              </div>
              
              {/* Name */}
              <div className="p-4 bg-gray-100">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-semibold text-gray-900 group-hover:text-blue-600 transition">
                    {accessory.name}
                  </h3>
                  <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-blue-600 transition" />
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>

      {/* Info Section */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Need Help Finding the Right Accessory?
          </h2>
          <p className="text-gray-600 mb-8">
            Click on any accessory to view detailed specifications and compatibility information on our Google Drive
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/orders"
              className="px-8 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition font-semibold"
            >
              Request Quote
            </Link>
            <Link 
              href="/support"
              className="px-8 py-3 border-2 border-gray-300 text-gray-700 rounded-xl hover:bg-white transition font-semibold"
            >
              Contact Support
            </Link>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="px-4 sm:px-6 lg:px-8 pb-8">
			<footer className="max-w-7xl mx-auto py-8 text-center">
				<p className="text-gray-500">
				© 2026 Bitswaving. All rights reserved.
				</p>
			</footer>
		</div>
    </div>
  );
};

export default AccessoriesPage;