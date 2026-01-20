"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { Menu, X, ChevronDown, Globe, User, LogOut, Package, Target, Zap, Shield, Users, Award, TrendingUp } from 'lucide-react';
import { useSession, signOut } from 'next-auth/react';

const AboutUsPage = () => {
  const { data: session } = useSession();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [productDropdown, setProductDropdown] = useState(false);
  const [supportDropdown, setSupportDropdown] = useState(false);
  const [profileDropdown, setProfileDropdown] = useState(false);
  const [language, setLanguage] = useState('EN');

  const coreValues = [
    {
      icon: <Target className="w-8 h-8" />,
      title: "Innovation First",
      description: "We continuously push the boundaries of industrial connectivity technology to deliver cutting-edge solutions."
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Reliability",
      description: "Our products are built to deliver 99.9% uptime in the most demanding industrial environments."
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Customer Success",
      description: "Your success is our success. We're committed to providing exceptional support and service."
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Simplicity",
      description: "Complex technology made simple. We believe powerful solutions should be easy to deploy and manage."
    }
  ];

  const milestones = [
    {
      year: "2020",
      title: "Company Founded",
      description: "Bitswaving established with a vision to revolutionize industrial connectivity"
    },
    {
      year: "2022",
      title: "BWR Series Launch",
      description: "Released our flagship BWR industrial router series with 5G/4G capabilities"
    },
    {
      year: "2023",
      title: "BW Cloud Platform",
      description: "Launched cloud management platform for centralized device monitoring"
    },
    {
      year: "2024",
      title: "Global Expansion",
      description: "Expanded operations to serve customers across 30+ countries"
    },
    {
      year: "2025",
      title: "10,000+ Deployments",
      description: "Reached milestone of 10,000+ active device deployments worldwide"
    },
    {
      year: "2026",
      title: "Industry Recognition",
      description: "Awarded Best Industrial IoT Solution by leading industry associations"
    }
  ];

  const stats = [
    { number: "10,000+", label: "Active Deployments" },
    { number: "30+", label: "Countries Served" },
    { number: "99.9%", label: "Average Uptime" },
    { number: "500+", label: "Enterprise Customers" }
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

              <Link href="/use-cases" className="font-semibold text-gray-700 hover:bg-gray-100 px-3 py-2 rounded-lg transition">Use Cases</Link>
              <Link href="/about" className="font-semibold text-blue-600 bg-blue-50 px-3 py-2 rounded-lg">About Us</Link>
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
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-20">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-800">
              About Bitswaving
            </h1>
            <p className="text-xl text-gray-700 leading-relaxed">
              We're on a mission to connect the industrial world with reliable, intelligent, and secure networking solutions that power Industry 4.0 transformation.
            </p>
          </div>
        </div>
      </div>

      {/* Company Overview */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Who We Are</h2>
            <div className="space-y-4 text-gray-700 leading-relaxed">
              <p>
                Bitswaving is a leading provider of industrial-grade networking equipment and cloud management solutions. Founded in 2020, we've rapidly grown to serve over 500 enterprise customers across 30+ countries.
              </p>
              <p>
                Our focus is simple: deliver connectivity solutions that just work. Whether it's a manufacturing plant, retail network, smart city infrastructure, or remote worksite, our products are designed to provide reliable, secure connectivity in the most demanding environments.
              </p>
              <p>
                We combine cutting-edge hardware engineering with intelligent cloud software to create a complete ecosystem that makes network management effortless. From initial deployment to ongoing operations, we're with you every step of the way.
              </p>
            </div>
          </div>
          <div className="rounded-3xl overflow-hidden">
            <img 
              src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80"
              alt="About Bitswaving"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, idx) => (
            <div key={idx} className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-3xl p-6 text-center border border-gray-200">
              <div className="text-4xl font-bold text-blue-600 mb-2">{stat.number}</div>
              <div className="text-gray-700 font-medium">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Core Values */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Our Core Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {coreValues.map((value, idx) => (
              <div key={idx} className="bg-white border border-gray-200 rounded-3xl p-6 hover:shadow-lg transition">
                <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center text-blue-600 mb-4">
                  {value.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{value.title}</h3>
                <p className="text-gray-600 leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Timeline */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Our Journey</h2>
          <div className="max-w-4xl mx-auto">
            <div className="space-y-8">
              {milestones.map((milestone, idx) => (
                <div key={idx} className="flex gap-6">
                  <div className="flex flex-col items-center">
                    <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0">
                      {milestone.year}
                    </div>
                    {idx < milestones.length - 1 && (
                      <div className="w-0.5 h-full bg-blue-200 mt-2"></div>
                    )}
                  </div>
                  <div className="pb-8 flex-1">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">{milestone.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{milestone.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Mission & Vision */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-3xl p-8 border border-gray-200">
            <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center mb-4">
              <Target className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h3>
            <p className="text-gray-700 leading-relaxed">
              To empower businesses with industrial-grade connectivity solutions that are reliable, secure, and easy to manage—enabling digital transformation across all industries.
            </p>
          </div>
          <div className="bg-gradient-to-br from-pink-50 to-purple-50 rounded-3xl p-8 border border-gray-200">
            <div className="w-12 h-12 bg-purple-600 rounded-xl flex items-center justify-center mb-4">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Vision</h3>
            <p className="text-gray-700 leading-relaxed">
              To be the global leader in industrial IoT connectivity, recognized for innovation, reliability, and customer success—connecting millions of devices worldwide.
            </p>
          </div>
        </div>

        {/* CTA */}
        <div className="bg-gray-900 text-white rounded-3xl p-12 text-center">
          <h2 className="text-3xl font-bold mb-4">Join Our Journey</h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Whether you're looking for reliable connectivity solutions or want to partner with us, we'd love to hear from you.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/orders"
              className="px-8 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition font-semibold"
            >
              Get Started
            </Link>
            <Link 
              href="/support"
              className="px-8 py-3 border-2 border-white text-white rounded-xl hover:bg-white hover:text-gray-900 transition font-semibold"
            >
              Contact Us
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

export default AboutUsPage;