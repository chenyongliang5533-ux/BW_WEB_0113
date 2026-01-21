"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { Menu, X, ChevronDown, Globe, User, LogOut, Package, ShoppingCart } from 'lucide-react';
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
      id: 'ACC-ANT-4G',
      name: '4G Cellular Antenna',
      category: 'Antenna',
      description: 'High-gain 4G LTE antenna with omnidirectional coverage. Supports 700-2700 MHz frequency bands. 3 meters cable with SMA connector.',
      image: 'https://images.unsplash.com/photo-1606904825846-647eb07f5be2?w=400&q=80',
      specs: [
        'Frequency: 700-2700 MHz',
        'Gain: 5 dBi',
        'Cable: 3m RG174',
        'Connector: SMA Male',
        'IP67 Waterproof'
      ],
      price: '$45.00',
      bgColor: 'bg-blue-50'
    },
    {
      id: 'ACC-ANT-WIFI',
      name: 'WiFi Antenna',
      category: 'Antenna',
      description: 'Dual-band WiFi antenna for 2.4GHz and 5GHz. Omnidirectional pattern with flexible mounting options. Suitable for indoor and outdoor use.',
      image: 'https://images.unsplash.com/photo-1545259742-24f497fbbde7?w=400&q=80',
      specs: [
        'Frequency: 2.4GHz & 5GHz',
        'Gain: 3 dBi (2.4GHz), 5 dBi (5GHz)',
        'Cable: 2m',
        'Connector: RP-SMA',
        'Weather Resistant'
      ],
      price: '$35.00',
      bgColor: 'bg-cyan-50'
    },
    {
      id: 'ACC-PWR-24V',
      name: 'Power Adapter 24V 2A',
      category: 'Power Supply',
      description: 'Industrial-grade switching power adapter with wide input voltage range. Includes overload and short-circuit protection. Global safety certifications.',
      image: 'https://images.unsplash.com/photo-1591290619762-d77d4eb01aef?w=400&q=80',
      specs: [
        'Input: 100-240V AC',
        'Output: 24V DC 2A',
        'Connector: 5.5x2.1mm DC',
        'Protection: OVP, OCP, SCP',
        'Certifications: CE, UL, FCC'
      ],
      price: '$29.00',
      bgColor: 'bg-pink-50'
    },
    {
      id: 'ACC-ETH-CAT6',
      name: 'Ethernet Cable Cat6',
      category: 'Cable',
      description: 'Industrial-grade Cat6 Ethernet cable with shielded design. UV-resistant jacket for outdoor installation. Available in multiple lengths.',
      image: 'https://images.unsplash.com/photo-1629654291663-b91ad427698f?w=400&q=80',
      specs: [
        'Category: Cat6 STP',
        'Length: 5 meters',
        'Connector: RJ45',
        'Speed: Up to 10 Gbps',
        'UV Resistant Jacket'
      ],
      price: '$15.00',
      bgColor: 'bg-gray-50'
    },
    {
      id: 'ACC-DIN-RAIL',
      name: 'DIN Rail Mounting Kit',
      category: 'Mounting',
      description: 'Universal DIN rail mounting bracket for BWR series routers. Easy snap-on installation with secure locking mechanism. Corrosion-resistant metal construction.',
      image: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=400&q=80',
      specs: [
        'Material: Galvanized Steel',
        'Compatible: BWR Series',
        'Standard: DIN EN 50022',
        'Dimensions: 85 x 30 mm',
        'Includes Mounting Screws'
      ],
      price: '$12.00',
      bgColor: 'bg-blue-50'
    },
    {
      id: 'ACC-RS232-CABLE',
      name: 'RS232 Serial Cable',
      category: 'Cable',
      description: 'DB9 to terminal block RS232 serial cable for industrial automation. Shielded twisted pair construction. Screw terminal connections for easy wiring.',
      image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80',
      specs: [
        'Connector: DB9 Male',
        'Terminal: Screw Block',
        'Length: 2 meters',
        'Shielded: Yes',
        'Wire Gauge: 24 AWG'
      ],
      price: '$18.00',
      bgColor: 'bg-cyan-50'
    },
    {
      id: 'ACC-RS485-CABLE',
      name: 'RS485 Serial Cable',
      category: 'Cable',
      description: 'Industrial RS485 communication cable with twisted pair design. Suitable for long-distance data transmission. Terminal block connections for field installation.',
      image: 'https://images.unsplash.com/photo-1588508065123-287b28e013da?w=400&q=80',
      specs: [
        'Type: RS485 Twisted Pair',
        'Terminal: Screw Block',
        'Length: 3 meters',
        'Impedance: 120 Ohm',
        'Max Distance: 1200m'
      ],
      price: '$22.00',
      bgColor: 'bg-pink-50'
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
            Accessories & Add-ons
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Complete your industrial connectivity solution with our range of high-quality accessories
          </p>
        </div>
      </div>

      {/* Accessories Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {accessories.map((accessory) => (
            <div 
              key={accessory.id}
              className={`${accessory.bgColor} rounded-3xl overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow`}
            >
              {/* Image */}
              <div className="h-48 bg-white overflow-hidden">
                <img 
                  src={accessory.image} 
                  alt={accessory.name}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Content */}
              <div className="p-6">
                {/* Category Badge */}
                <span className="inline-block px-3 py-1 bg-white text-gray-700 text-xs font-medium rounded-full border border-gray-200 mb-3">
                  {accessory.category}
                </span>

                {/* Product Name */}
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {accessory.name}
                </h3>

                {/* SKU */}
                <p className="text-sm text-gray-500 mb-3 font-mono">
                  {accessory.id}
                </p>

                {/* Description */}
                <p className="text-gray-700 text-sm mb-4 leading-relaxed">
                  {accessory.description}
                </p>

                {/* Specifications */}
                <div className="mb-4">
                  <h4 className="text-xs font-semibold text-gray-900 mb-2">Specifications:</h4>
                  <ul className="space-y-1">
                    {accessory.specs.map((spec, idx) => (
                      <li key={idx} className="text-xs text-gray-600">
                        • {spec}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Price & Action */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                  <div className="text-2xl font-bold text-gray-900">
                    {accessory.price}
                  </div>
                  <Link
                    href="/orders"
                    className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition font-medium text-sm"
                  >
                    <ShoppingCart className="w-4 h-4" />
                    <span>Order</span>
                  </Link>
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
            Need Help Choosing Accessories?
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Our technical team can help you select the right accessories for your deployment
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
              className="px-8 py-3 border-2 border-white text-white rounded-xl hover:bg-white hover:text-gray-900 transition font-semibold"
            >
              Technical Support
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

export default AccessoriesPage;