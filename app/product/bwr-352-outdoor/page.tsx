"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Menu,
  X,
  ChevronDown,
  Globe,
  Wifi,
  Shield,
  Zap,
  Radio,
  Droplets,
  Cable,
  Plug,
  Wrench,
  Cpu,
  CheckCircle,
  Copy,
  Check,
  Box,
  Rotate3d,
} from 'lucide-react';
import Model3DViewer from '@/components/Model3DViewer';
import ProductDropdown from '@/components/ProductDropdown';

const galleryImages = [
  {
    src: '/images/products/bwr-352-outdoor-kit.jpg',
    alt: 'BWR_352_Outdoor IPX6 enclosure with BWR_352 board, 4G and Wi-Fi antennas and PoE input cable',
  },
  {
    src: '/images/products/bwr-352-outdoor-enclosure.png',
    alt: 'BWR_352_Outdoor sealed ABS enclosure with waterproof cable glands',
  },
  {
    src: '/images/products/bwr-352-outdoor-open.jpg',
    alt: 'BWR_352_Outdoor enclosure shown open with IPX6 gasket seal and mounting bosses',
  },
];

const BWR352OutdoorProductPage = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [productDropdown, setProductDropdown] = useState(false);
  const [supportDropdown, setSupportDropdown] = useState(false);
  const [language, setLanguage] = useState('EN');
  const [showQuoteModal, setShowQuoteModal] = useState(false);
  const [emailCopied, setEmailCopied] = useState(false);
  const [activeView, setActiveView] = useState<'photos' | '3d'>('photos');
  const [activeImage, setActiveImage] = useState(0);

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

  const keyBenefits = [
    'Outdoor-ready IPX6 waterproof enclosure, built from UV-stabilised ABS (148 × 148 × 65 mm)',
    'Drop your existing BWR_352 board straight in — same firmware, same features, no redesign',
    '3 × waterproof cable glands: 4G antenna, Wi-Fi antenna, power / serial / Ethernet cables',
    'PoE adapter option — run power and data over a single Ethernet cable when no DC source is on site',
    'Wall-mount bracket and pole clamp mounting (band clamp) for cabinets, poles and street furniture',
  ];

  const features = [
    {
      icon: <Droplets className="w-6 h-6" />,
      title: 'IPX6 Outdoor Enclosure',
      description:
        'Sealed IPX6 ABS housing with a moulded gasket keeps rain, hose spray and dust away from the router board, so BWR_352 can be deployed where cabinets are not available.',
    },
    {
      icon: <Cable className="w-6 h-6" />,
      title: '3 × Waterproof Cable Glands',
      description:
        'Three glands provide watertight entries for the 4G suction antenna, the Wi-Fi suction antenna and the power, serial or Ethernet cable run — with strain relief on every cable.',
    },
    {
      icon: <Plug className="w-6 h-6" />,
      title: 'PoE Adapter Option',
      description:
        'Where a local DC source is inconvenient, add a PoE adapter and feed the router over the Ethernet cable itself — single-cable installation that reaches up to 100 m.',
    },
    {
      icon: <Cpu className="w-6 h-6" />,
      title: 'BWR_352 Board Inside',
      description:
        'The same Cat 4 / Cat 1 LTE board, dual SIM failover, 5 × Ethernet, RS232/RS485 and DI/DO ports — only the mechanical envelope changes.',
    },
    {
      icon: <Wrench className="w-6 h-6" />,
      title: 'Wall & Pole Mounting',
      description:
        'Four internal mounting bosses plus reinforced corner holes support wall-mount brackets and band clamps, so the unit fixes to walls, masts and poles.',
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: 'Same Industrial Features',
      description:
        'BWR_OS on OpenWrt 24.10, IPsec / OpenVPN / WireGuard, Modbus RTU polling, MQTT reporting and BW Cloud remote management all carry over unchanged.',
    },
  ];

  const boardSpecs = [
    { label: 'CPU', value: 'Mediatek MT7628AN: 580 MHz MIPS 24KEc' },
    { label: 'RAM', value: '128 MB DDR2' },
    { label: 'FLASH', value: '32 MB SPI FLASH' },
    { label: 'Cellular Module', value: 'Quectel CAT4/CAT1, Fibocom CAT4/CAT1 LTE module ' },
    { label: 'Ethernet Ports', value: '5 x 10/100 Mbps RJ45 ports (1 x WAN, 4 x LAN)' },
    { label: 'Serial Ports', value: '1 X RS232 + 1 X RS485' },
    { label: 'WiFi', value: '2T2R 802.11b/g/n 2.4 GHz (300 Mbps) WIFI4' },
    { label: 'Power supply range', value: '9-48 VDC, or PoE via the Ethernet cable with the PoE adapter' },
    { label: 'Digital I/O', value: '1 x Digital inputs, 1 x Digital output' },
    { label: 'OS', value: 'BWR_OS (based on OPENWRT 24.10)' },
    { label: 'Kernel version', value: 'Linux 6.6.122' },
    { label: 'Front-end frameworks', value: 'Vanilla JS SPA' },
    { label: 'Back-end frameworks', value: 'UCODE + RPCD + UBUS' },
  ];

  const enclosureSpecs = [
    { label: 'Model', value: 'BWR_352_Outdoor (BWR_352 board + outdoor enclosure kit)' },
    { label: 'Enclosure material', value: 'ABS' },
    { label: 'Ingress protection', value: 'IPX6' },
    { label: 'Dimensions', value: '148 mm (L) x 148 mm (W) x 65 mm (H)' },
    { label: 'Cable entries', value: '3 x waterproof cable glands (4G antenna, Wi-Fi antenna, cable run)' },
    { label: 'Power options', value: '9-48 VDC input, or PoE adapter for power-over-Ethernet' },
    { label: 'Mounting', value: 'Wall mount and pole mount (band clamp)' },
    { label: 'Antennas', value: 'External 4G and Wi-Fi suction antennas with magnetic bases' },
  ];

  const specRow = (spec: { label: string; value: string }, idx: number) => (
    <div key={idx} className="grid grid-cols-1 md:grid-cols-3 gap-3">
      <div className="md:col-span-1 bg-gray-100 rounded-xl px-5 py-3 flex items-center">
        <span className="font-semibold text-gray-900">{spec.label}</span>
      </div>
      <div className="md:col-span-2 bg-blue-50 rounded-xl px-5 py-3 flex items-center">
        <span className="text-gray-700">{spec.value}</span>
      </div>
    </div>
  );

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
                  <ProductDropdown show={productDropdown} />
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
              <Link href="/product/bwr-352" className="block text-gray-700">BWR_352</Link>
              <Link href="/product/bwr-352-outdoor" className="block text-gray-700">BWR_352_Outdoor</Link>
              <Link href="/support" className="block text-gray-700">Support</Link>
              <Link href="/use-cases" className="block text-gray-700">Use Cases</Link>
              <Link href="/about" className="block text-gray-700">About Us</Link>
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
          <span className="text-gray-900">Industrial 4G Router</span>
          <span className="mx-2">/</span>
          <span className="text-gray-900">BWR_352_Outdoor</span>
        </div>

        {/* Product Header */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 mb-16">
          {/* Product media */}
          <div className="lg:col-span-3">
            <div className="relative w-full bg-gray-50 rounded-3xl overflow-hidden" style={{ minHeight: '400px' }}>
              <div className="flex items-center justify-between px-4 pt-4">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-600 text-white text-xs font-semibold px-3 py-1">
                  <Droplets className="w-3.5 h-3.5" />
                  IPX6 Outdoor Kit
                </span>
                <div className="flex rounded-full bg-white border border-gray-200 p-1 shadow-sm">
                  <button
                    onClick={() => setActiveView('photos')}
                    className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold transition ${
                      activeView === 'photos' ? 'bg-blue-600 text-white' : 'text-gray-600 hover:text-blue-600'
                    }`}
                  >
                    <Box className="w-3.5 h-3.5" />
                    Photos
                  </button>
                  <button
                    onClick={() => setActiveView('3d')}
                    className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold transition ${
                      activeView === '3d' ? 'bg-blue-600 text-white' : 'text-gray-600 hover:text-blue-600'
                    }`}
                  >
                    <Rotate3d className="w-3.5 h-3.5" />
                    3D View
                  </button>
                </div>
              </div>

              {activeView === 'photos' ? (
                <div className="relative">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={galleryImages[activeImage].src}
                    alt={galleryImages[activeImage].alt}
                    className="w-full h-auto"
                    style={{ maxHeight: '620px', objectFit: 'contain' }}
                  />
                  <div className="flex justify-center gap-3 px-4 pb-4 pt-2">
                    {galleryImages.map((image, idx) => (
                      <button
                        key={image.src}
                        onClick={() => setActiveImage(idx)}
                        className={`h-16 w-16 overflow-hidden rounded-xl border-2 bg-white transition ${
                          activeImage === idx ? 'border-blue-600' : 'border-gray-200 hover:border-blue-300'
                        }`}
                        aria-label={image.alt}
                      >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={image.src} alt="" className="h-full w-full object-cover" />
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                <Model3DViewer key="bwr352-outdoor-3d" modelPath="/models/BWR352.glb" />
              )}
            </div>
            {activeView === '3d' && (
              <p className="text-xs text-gray-500 mt-3">
                The 3D model shows the BWR_352 board and housing that ships inside the BWR_352_Outdoor enclosure kit.
              </p>
            )}
          </div>

          {/* Product Info */}
          <div className="lg:col-span-2">
            <h1 className="text-3xl font-bold text-gray-900 mb-3">BWR_352_Outdoor</h1>
            <p className="text-base text-gray-600 mb-5">
              Outdoor IPX6 Enclosure Kit for the BWR_352 Industrial 4G Router
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

            <div className="bg-white border border-gray-200 rounded-2xl p-5 mb-5">
              <h3 className="font-semibold text-gray-900 mb-3">At a Glance</h3>
              <dl className="grid grid-cols-2 gap-3 text-sm">
                <div>
                  <dt className="text-gray-500">Material</dt>
                  <dd className="font-semibold text-gray-900">ABS</dd>
                </div>
                <div>
                  <dt className="text-gray-500">Waterproof</dt>
                  <dd className="font-semibold text-gray-900">IPX6</dd>
                </div>
                <div>
                  <dt className="text-gray-500">Size (L×W×H)</dt>
                  <dd className="font-semibold text-gray-900">148 × 148 × 65 mm</dd>
                </div>
                <div>
                  <dt className="text-gray-500">Cable glands</dt>
                  <dd className="font-semibold text-gray-900">3 × waterproof</dd>
                </div>
                <div>
                  <dt className="text-gray-500">Mounting</dt>
                  <dd className="font-semibold text-gray-900">Wall / pole clamp</dd>
                </div>
                <div>
                  <dt className="text-gray-500">Power</dt>
                  <dd className="font-semibold text-gray-900">DC or PoE adapter</dd>
                </div>
              </dl>
            </div>

            <div className="space-y-3">
              <button
                onClick={() => setShowQuoteModal(true)}
                className="w-full px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition font-medium"
              >
                Request Quote
              </button>
              <Link
                href="/product/bwr-352"
                className="block w-full px-6 py-3 text-center bg-white border border-gray-300 text-gray-800 rounded-xl hover:bg-gray-50 transition font-medium"
              >
                See the BWR_352 board specs
              </Link>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Features &amp; Benefits</h2>
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

        {/* Outdoor deployment / power note */}
        <div className="mb-16 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-cyan-50 rounded-3xl p-6">
            <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-cyan-600 mb-4">
              <Radio className="w-6 h-6" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-3">Antennas Outside the Box</h3>
            <p className="text-gray-700 text-sm">
              The magnetic-base 4G and Wi-Fi suction antennas mount on the outside of the enclosure and
              connect through dedicated glands, keeping RF performance while the board stays sealed.
            </p>
          </div>
          <div className="bg-pink-50 rounded-3xl p-6">
            <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-pink-600 mb-4">
              <Zap className="w-6 h-6" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-3">PoE When DC Is Hard</h3>
            <p className="text-gray-700 text-sm">
              If there is no convenient DC outlet on site, add the PoE adapter and power the router
              through the same Ethernet cable that carries the data — one cable, one gland.
            </p>
          </div>
          <div className="bg-gray-50 rounded-3xl p-6">
            <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-gray-600 mb-4">
              <Wifi className="w-6 h-6" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-3">Cable Routing</h3>
            <p className="text-gray-700 text-sm">
              One gland for the 4G antenna, one for the Wi-Fi antenna and one for the cable run —
              9-48 VDC power, RS232/RS485 serial or the Ethernet/PoE link, all watertight.
            </p>
          </div>
        </div>

        {/* Technical Specifications */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Technical Specifications</h2>

          <h3 className="text-xl font-semibold text-gray-900 mb-4">Outdoor Enclosure Kit</h3>
          <div className="space-y-3 mb-10">
            {enclosureSpecs.map(specRow)}
          </div>

          <h3 className="text-xl font-semibold text-gray-900 mb-4">BWR_352 Board (supplied in the kit)</h3>
          <div className="space-y-3">
            {boardSpecs.map(specRow)}
          </div>
        </div>

        {/* Software Features */}
        <div>
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Software Features</h2>
          <p className="text-gray-600 mb-6">
            BWR_352_Outdoor runs the same BWR_OS build as the standard BWR_352, so every routing,
            VPN, telemetry and management feature is available out of the box.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-cyan-50 rounded-3xl p-6">
              <h3 className="font-semibold text-gray-900 mb-3">Security</h3>
              <ul className="space-y-2 text-gray-700 text-sm">
                <li>• OpenVPN, IPsec, GRE, L2TP</li>
                <li>• WireGuard &amp; ZeroTier support</li>
                <li>• Firewall with custom rules</li>
                <li>• VLAN support</li>
                <li>• MAC filtering</li>
                <li>• DDNS support</li>
              </ul>
            </div>
            <div className="bg-pink-50 rounded-3xl p-6">
              <h3 className="font-semibold text-gray-900 mb-3">Networking</h3>
              <ul className="space-y-2 text-gray-700 text-sm">
                <li>• Static &amp; dynamic routing</li>
                <li>• Load balancing &amp; WAN failover</li>
                <li>• QoS traffic management</li>
                <li>• DHCP server/client</li>
                <li>• Port forwarding &amp; NAT</li>
                <li>• Modbus RTU/TCP to MQTT</li>
              </ul>
            </div>
            <div className="bg-gray-50 rounded-3xl p-6">
              <h3 className="font-semibold text-gray-900 mb-3">Management</h3>
              <ul className="space-y-2 text-gray-700 text-sm">
                <li>• BW Cloud remote management</li>
                <li>• SMS control &amp; alerts</li>
                <li>• SNMP monitoring</li>
                <li>• Event logging</li>
                <li>• Scheduled reboot</li>
                <li>• Remote firmware update</li>
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
                <Droplets className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Request a Quote</h3>
              <p className="text-gray-600">
                Tell us about your outdoor site — we will confirm the enclosure kit, antenna leads and
                whether a PoE adapter fits your installation.
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
              Please include product model (BWR_352_Outdoor), quantity, mounting type and your
              application scenario in your email.
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

export default BWR352OutdoorProductPage;
